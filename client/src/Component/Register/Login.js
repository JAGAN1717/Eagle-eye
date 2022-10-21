import React,{useState} from "react";
import axios from "axios";
import swal from 'sweetalert';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import FacebookLogin from "react-facebook-login";
import jwt from 'jwt-decode'
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import Home from "../Com-1/Home";

const Login = ()=>{
    const navigate = useNavigate();
    const [sign,setSign] = useState('');
    const [ mail, setMail] = useState('');
    const [password,setPassword] = useState('');
    const [data, setData] = useState('');
    const [google,setgoogle]= useState('')
    const [facebook,setfacebook]= useState('')


        var digit = '0123456789';
        let otp='' ;
        for(let i=0;i<4;i++){
         otp += digit[ Math.floor(Math.random()*10)]
        }

    
   

// login database
    const signin = () =>{
        let data = {
            username : mail,
            password :password
        }
        axios.post('http://localhost:8080/user/Login',data).then(result=>{
            console.log('data',result.data.result);
            // console.log(JSON.stringify(result));
            console.log("token",result.data.token)

            localStorage.setItem("token",result.data.token);
            localStorage.setItem("role",result.data.result.role);
            localStorage.setItem('name',result.data.result.username);
            localStorage.setItem('id',result.data.result.uuid)
            localStorage.setItem('mail',result.data.result.email);
            if(result.data.status == 'success'){
                swal({
                    title: "LOGIN SUCCESS!",
                    text: "welcome",
                    icon: "success",
                    button: "OK",
                  });
                  navigate('/home',{state:result.data})
            }else{
                swal("userName and password is Wrong!");
            }
            setData(result)
            
        }).catch(err=>{
            console.log("err",err.message)
            
        })
    }

    //check facebook siginin
    const responseFacebook = (response) => {
        console.log(response);
        setData(response)
        swal({
            title: "LOGIN SUCCESS!",
            text: "welcome",
            icon: "success",
            button: "OK",
          });
          facebooksingin(response)
        if (response.status === "unknown") {
          alert("Login failed!");
        }
      };


    //facebook signup
    const facebooksingin = async(decode) =>{
       
        let Data = {
            username:decode.name,
            phone : '1234567890',
            email : `bmjagan17@gmail.com`,
            password : 'bike',
            loginType : 'Facebook'
        }
        console.log("logintype",Data);
       await axios.post('http://localhost:8080/user/Register',Data).then(userData=>{
        console.log("data",userData.result)
        console.log('result',JSON.stringify(userData));
        console.log('status',userData.data.status);
        if(userData.data.status =='success'){
            swal({
                title: "REGISTER SUCCESS!",
                text: "welcome",
                icon: "success",
                button: "OK",
              });
              
           }
           navigate('/home',{state:userData.data})
           localStorage.setItem("role",userData.data.result.role);
           localStorage.setItem('name',userData.data.result.username);
           localStorage.setItem('id',userData.data.result.uuid);
           localStorage.setItem('mail',userData.data.result.email);
           navigate('/home',{state:userData.data})

           
          
       }).catch(err=>{
        console.log('err',err.message)
        //swal("User Already Exist!");
        googlesignin(decode)

       })
    
    }


    
      
// google register in database 
    const autosing = async(decode) =>{
       
        let Data = {
            username:decode.name,
            phone : `${decode.phone}`,
            email : decode.email,
            password : 'bike',
            loginType : 'google'
        }
        console.log("logintype",Data);
       await axios.post('http://localhost:8080/user/Register',Data).then(userData=>{
        console.log("data1",userData.data.result.email)
        console.log('result',JSON.stringify(userData));
        console.log('status',userData.data.status);
        if(userData.data.status =='success'){
            let email = userData.data.result.email;
              swal("Enter you mobile number:", {
                content: "input",
              })
              .then((value) => {
               verify(value,email)
              });
              
           }
           localStorage.setItem("role",userData.data.result.role);
           localStorage.setItem('name',userData.data.result.username);
           localStorage.setItem('id',userData.data.result.uuid);
           localStorage.setItem('mail',userData.data.result.email);
           navigate('/home',{state:userData.data})
           
       }).catch(err=>{
        console.log('err',err.message)
        googlesignin(decode)
       })
    
    }

    //verify mobile number
    const verify = async(value,email) =>{
        let smsdata = {
            number : value,
            text : "this your otp :"+ otp
        }
        await axios.post('http://localhost:8080/user/sms',smsdata).then(result =>{
            console.log('otp sended your mobile number')
            swal("Enter your OTP :", {
                content: "input",
              })
              .then((digit) => {
                if(otp == digit){
                    moblienumber(value,email)
                    console.log('its same')
                }else{
                    swal("please enter valid OTP!");

                }
              }).catch(err=>{
                console.log('err',err.message)
                swal("somthing went wrong!");
              })

        })

    }


    //moblie number update
    const moblienumber = (value,email) =>{
        console.log('uuid',email)
        console.log("vla",value)
        let detail ={
            email:email,
            phone:value
        }
        axios.put(`http://localhost:8080/user/update`,detail).then(result =>{
           if(result.data.status = 'success'){
            swal({
                title: "REGISTER SUCCESS!",
                text: "welcome",
                icon: "success",
                button: "OK",
              });
           }
           console.log('datas',result.data.result)
        }).catch(err=>{
            console.log('err',err.message)
        })
    }


    // google login in database
    const googlesignin = async(decode) =>{
        let data = {
            username : decode.email,
            password :'bike'
        }
       await axios.post('http://localhost:8080/user/Login',data).then(result=>{
            console.log('data',result.data.result);
            console.log("token",result.data.token)
            localStorage.setItem("token",result.data.token);
            localStorage.setItem("role",result.data.result.role);
            localStorage.setItem('name',result.data.result.username);
            localStorage.setItem('id',result.data.result.uuid)
            localStorage.setItem('data',result.data.result);
            localStorage.setItem('mail',result.data.result.email);
            if(result.data.status == 'success'){
                swal({
                    title: "LOGIN SUCCESS!",
                    text: "welcome",
                    icon: "success",
                    button: "OK",
                  });
                  navigate('/home',{state:result.data})
            }else{
                swal("userName and password is Wrong!");
            }
            
            
        }).catch(err=>{
            console.log("err",err.message)
            
        })
    }
   
   //check google siginup
    const handleLogin = (googleData) =>{
        console.log("data",googleData.credential)
         var decode = jwt(googleData.credential)
        console.log(decode)
        console.log(decode.name)
        console.log(decode.picture)
        setData(decode)
    //    navigate('/home',{state:decode})
        console.log('string',JSON.stringify(googleData))
        autosing(decode)
    }
    
    const handleFailure = (result) =>{
        console.log(result)
        alert('fail')

    }; 


    if(google){
        return(
            <>

        <div className="google">
        <GoogleOAuthProvider clientId="551835202218-qttsmjeipdj01fnoia1q7s3tkmdln7fb.apps.googleusercontent.com" >
        <GoogleLogin onSuccess={handleLogin} onError={handleFailure}  />
        </GoogleOAuthProvider>
        </div>
            </>
        )
    }
    if(facebook){
        return(
            <>

          <div className="facebook">
          <FacebookLogin
          appId="355457510062045"
          //appId="1270809540400661"
          autoLoad={false}
          fields="name,email,picture"
          scope="public_profile,email,user_friends"
          callback={responseFacebook}
          icon=""/></div>
            </>
        )
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
            <h4>SIGN-IN</h4>
            <form> 
            
                <input type="email" className='form-control' placeholder='Email' onChange={(p)=>setMail(p.target.value)}  />
                <input type="password" className='form-control' placeholder='password' onChange={(p)=>setPassword(p.target.value)} />
                <Link to = "/forget" className="link" >Forget password?</Link>
                <button type="button" className='btn1' onClick={signin}>Login</button><br></br><br></br>
                <Link to = '/signup' className="link" >Create New Account</Link><br></br><br></br>              
            </form>
            <div className="icon">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1365px-Facebook_f_logo_%282019%29.svg.png" onClick={()=>setfacebook(1)} width="40"></img>
            <img src="https://image.similarpng.com/very-thumbnail/2020/12/Flat-design-Google-logo-design-Vector-PNG.png" onClick={()=>setgoogle(1)} width="40"></img><br></br>       
            </div>
        {/* <div className="google">
       <GoogleOAuthProvider clientId="551835202218-qttsmjeipdj01fnoia1q7s3tkmdln7fb.apps.googleusercontent.com" >
        <GoogleLogin onSuccess={handleLogin} onError={handleFailure}  />
        </GoogleOAuthProvider>
        </div>
          <div className="facebook">
          <FacebookLogin
          appId="355457510062045"
          autoLoad={false}
          fields="name,email,picture"
          scope="public_profile,email,user_friends"
          callback={responseFacebook}
          icon=""/></div> */}
            </div>
            </div>
            </div>
           
        </div>
        </>
    )
    
}

export default Login;