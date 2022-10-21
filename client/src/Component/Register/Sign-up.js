import React,{useState,useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Style from './Style.css'
import axios from 'axios'
import 'react-router-dom'
import swal from 'sweetalert';
import { Link, Navigate, NavLink, useNavigate,useLocation } from "react-router-dom";
import {useForm} from 'react-hook-form'

const Register = () =>{
    const navigate = useNavigate();
    // const {state} = useLocation();
    // console.log("state",state)
    const [username, setName] = useState('');
    const [email , setMail] = useState('');
    const [phone, setPhone] = useState(''); 
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');

    const {
        register,
        handleSubmit,
        formState : {errors},
        reset,
        trigger,   
    } = useForm();
   

    const signup = async(details) =>{
        console.log('details',details)
        let data = {
            username: details.name,
            phone : details.phone,
            email : details.mail,
            password : details.password,
        }
        console.log('datas',data)
       await axios.post('http://localhost:8080/user/Register',data).then(userData=>{
        console.log("data",userData)
        console.log('result',JSON.stringify(userData));
        console.log('status',userData.data.status);
        if(userData.data.status =='success'){
            swal({
                title: "REGISTER SUCCESS!",
                text: "welcome",
                icon: "success",
                button: "OK",
              });
           }else{
            swal("user alredy exist!");
           }
           localStorage.setItem("role",userData.data.result.role);
           localStorage.setItem('name',userData.data.result.username);
           localStorage.setItem('id',userData.data.result.uuid)
           localStorage.setItem('mail',userData.data.result.email);
           navigate('/home',{state:userData.data})

           
       }).catch(err=>{
        console.log('err',err.message)
        swal("user alredy exist!");
       })
    

    }
 


    
      
    return(
        <>
        <div className='con'>
        <div className=' center'>
            <div className='container aline'>
                <div className='img'>
                    <img src='https://images.theconversation.com/files/433956/original/file-20211125-23-vzbjao.jpeg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop'/ >
                </div>
                
            <div className='right'>
                <br></br>
            <h4>SIGN-UP</h4>
            <form onSubmit={handleSubmit(signup)}> 
            
                <input type="text" className='form-control' placeholder='username' name = "name"  onChange={(p)=>setName(p.target.value)} 
                {...register('name',{
                    required : 'Name is required!',
                    pattern : {
                        // value : /^[\D]{3,8}$/,
                        value : /^[A-Z][a-zA-z '.-]*$/,
                        message : 'Fist Letter should have captial latter!',
                    },
                    minLength:{
                        value:3,
                        message : "minimum should have 3 letter"
                    },
                    maxLength:{
                        value:16,
                        message : "maximum 16 letter allowed!"
                    }
                })}
                onKeyUp = {()=>{
                    trigger('name')
                }}
                />
                {errors.name  && (<small className='user-err' >{errors.name.message}</small>)}
                <input type="email" id='username' className='form-control' placeholder='Email' name = 'mail' onChange={(p)=>setMail(p.target.value)}
                {...register('mail',{
                    required :'mail id is required!',
                    pattern : {
                        value : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                        message : 'Example : examplemail123@gmail.com'
                    }
                })}
                onKeyUp = {()=>{
                    trigger('mail')
                }}
                />
                {errors.mail && (<small className='user-err'>{errors.mail.message}</small>)}
                <input type="text" className='form-control' placeholder='Mobile Number' name = 'phone' onChange={(p)=>setPhone(p.target.value)} 
                {...register('phone',{
                    required : 'mobile number is required!',
                    pattern : {
                        value : /^[6-9][0-9]*$/,
                        message : "number is only allowed!"
                    },
                    maxLength :{
                        value : 10,
                        message : "Ten numbers only valid!"
                    }
                })}
                onKeyUp= {()=>{
                    trigger('phone')
                }}
                />
                {errors.phone && (<small className='user-err'>{errors.phone.message}</small>)}
                <input type="password"  className='form-control' placeholder='password' name='password' onChange={(p)=>setPassword(p.target.value)} 
                {...register('password',{
                    required : 'password is required',
                    pattern : {
                        value : /^[\w]{6,8}$/,
                        message : ' password is minimum 6 letter maximum 8 letters !'
                    }
                })}
                onKeyUp = {()=>{
                    trigger('password')
                }}
                />
                {errors.password && (<small className='user-err'>{errors.password.message}</small>)} <br></br>
                 {/* <input type="password" className='form-control' placeholder='comform password' onChange={(p)=>setPassword(p.target.value)} /> 
                 <textarea className='form-control' placeholder='Address' /> */}
                 <Link to = '/' className="link" >Login here</Link><br></br>
                 <button type='submit' className='btn17'> Register</button>
                 
                
            </form>
            </div>
            </div>
            </div>
           
        </div>
        </>
    )
}

export default Register





