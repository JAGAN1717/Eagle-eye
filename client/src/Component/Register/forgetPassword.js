import axios from "axios";
import React,{useState} from "react";
import swal from 'sweetalert';
import Login  from '../Register/Login'
import { NavLink, useLocation, useNavigate } from "react-router-dom";


const ForgetPassword = () =>{
const navigate = useNavigate();
const [mail,setEmail] = useState('') 
const [change,setchange] = useState('')
const [otp,setOtp] = useState('')
const [newpass,setNewpass] = useState('')
const [conform,setcomform] = useState('')
const [password,setPassword] = useState('')
//console.log(mail);

const forgetPassword = () =>{

  axios.post(`http://localhost:8080/user/forgetPassword?mail=${mail}`).then(result=>{
    console.log('sned otp',result.data.status);
   let status = result.data.status;
    if(status == "success"){
        swal({
            title: "SUCCESS!",
            text: "send otp your mail",
            icon: "success",
            button: "OK",
          });
    }else{
        swal("something went wrong!");
    }
    setchange(result.data.status);
  }).catch(err=>{
    console.log('err',err.message);
    swal("something went wrong!");
  })
}
console.log('pass',password)
const resetPassword = () =>{
    if(newpass == conform){
        setPassword(newpass);
       
    }else(
        setPassword()
    )

axios.post(`http://localhost:8080/user/resetPassword?newPass=${newpass}&otp=${otp}`).then(result=>{
    console.log('result',result.data.status);
    let status = result.data.status;
      if(status == 'success'){
        swal({
            title: "SUCCESS!",
            text: "password successfully reseted!",
            icon: "success",
            button: "OK" ,
          });
        navigate('/');
      }else{
        swal("something went wrong!");
      }

}).catch(err=>{
    console.log('err'.err.message)
    swal("something went wrong!");
})

}




if (change == "success") {
    return(
        <>
                <div className="container">
            <div className="box">
                <i><h2 className="for">Reset-password</h2></i>
                <span>Enter your one time password to reset your password</span>

                <form>
                    
                    <input type='text' className='form-control' placeholder="Enter your OTP" onChange={(p)=>setOtp(p.target.value)} />
                    <input type='password' className='form-control' placeholder="Enter your New Password" onChange={(p)=>setNewpass(p.target.value)} />
                    <input type='text' className='form-control' placeholder="conform password" onChange={(p)=>setcomform(p.target.value)} />
                    <button type="button" className="click" onClick={resetPassword}>Reset password</button><br></br><br></br>
                    <span onClick={()=>window.location.href='/signup'}>create New account </span> <br></br>
                    <span onClick={()=>window.location.href='/'}>Login here </span>
                </form>

            </div>

        </div>
        </>
    )
    
} else {
    return(
        <>
        <div className="container">
            <div className="box">
                <i><h2 className="for">Forget-password</h2></i>
                <span>Enter your registered email to reset your password</span>

                <form>
                    <input type='text' className='form-control' placeholder="Enter your Email" onChange={(val)=>setEmail(val.target.value)} />
                    <button type="button" className="click" onClick={forgetPassword}>Send Mail</button><br></br><br></br>
                    <span onClick={()=>window.location.href='/signup'} >create New account </span> <br></br>
                    <span onClick={()=>window.location.href='/'}>Login here </span>
                </form>

            </div>

        </div>
        </>
    ) 
}
   
}

export default ForgetPassword