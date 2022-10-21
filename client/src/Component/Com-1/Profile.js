import React, { useEffect, useState } from "react";
import './profile.css';
import { Navigate, NavLink, useLocation, useNavigate,Link} from "react-router-dom";
import swal from 'sweetalert';
import Star from './IronGirl.jpg'
import {useCart} from "react-use-cart"
import axios from "axios";
const Profile = () =>{
 const {state} = useLocation();
 console.log('data',state)
 const navigate = useNavigate()
 const [data,setData] = useState(state)
 const[name,setname] = useState(data.username)
 const[role,setrole] = useState(data.role)
 const[mobile,setmobile] = useState(data.phone)
 const[email,setemail] = useState(data.email)
 const[address,setaddress] = useState(data.address)
 const [img,setimg] = useState(data.img )
 const {totalUniqueItems} = useCart();


 function disableTxt() {
    document.getElementById("myText").disabled = true;
    document.getElementById('can').style.display = "none";
    document.getElementById("myText1").disabled = true;
    document.getElementById('can1').style.display = "none";
    document.getElementById("myText2").disabled = true;
    document.getElementById('can2').style.display = "none";
    updateuser();
  }
  function openButton(){
    document.getElementById('save-btn').style.display = "inline";
  }
//   Input name
  function disableTxt1() {
    document.getElementById("myText").disabled = true;
    document.getElementById('save-btn').style.display = "none";
    document.getElementById('can').style.display = "none";
   
  }
   function undisableTxt() {
    document.getElementById("myText").disabled = false;
    document.getElementById('save-btn').style.display = "inline";
    document.getElementById('can').style.display = "inline";

  }
//   input Number
  function undisableTxtNumber() {
    document.getElementById("myText1").disabled = false;
    document.getElementById('save-btn1').style.display = "inline";
    document.getElementById('can1').style.display = "inline";

  }
  function disableTxtNumber() {
    document.getElementById("myText1").disabled = true;
    document.getElementById('save-btn1').style.display = "none";
    document.getElementById('can1').style.display = "none";
   
  }
//   input Address
function undisableTxtAddress() {
    document.getElementById("myText2").disabled = false;
    document.getElementById('save-btn').style.display = "inline";
    document.getElementById('can2').style.display = "inline";

  }
  function disableTxtAddress() {
    document.getElementById("myText2").disabled = true;
    document.getElementById('save-btn').style.display = "none";
    document.getElementById('can2').style.display = "none";
  }



 const updateuser = () =>{
   let data ={
    uuid     : state.uuid,
    username : name,
    role     : role,
    phone    : mobile,
    email    : email,
    address  : address,
    img      : img
    }

    axios.put('http://localhost:8080/user/updateuser',data).then(result=>{
        console.log('update',result.data)
        if(result.data.status == 'success'){
            document.getElementById("myText1").disabled = true;
            document.getElementById('can1').style.display = "none";
            swal({
                title: "UPDATED SUCCESS!",
                text: state.username,
                icon: "success",
                button: "OK",
              });
         
        }
    }).catch(err=>{
        console.log('err',err.message)
    })
 }

 const signout = () =>{
    let uuid = state.uuid
    axios.post(`http://localhost:8080/user/Logout?uuid=${uuid}`).then(result=>{
        console.log('result',result.data.status)
        if(result.data.status == "success"){
            swal({
                title: "LOGOUT SUCCESS!",
                text: "THANKS",
                icon: "success",
                button: "OK",
              });
              navigate('/signup')
        }  
    }).catch(err=>{
        console.log('err',err.message)
        swal("userName and password is Wrong!");

    })
}
console.log('img',img)
var digit = '0123456789';
let otp='' ;
for(let i=0;i<4;i++){
 otp += digit[ Math.floor(Math.random()*10)]
}
console.log('otp',email)

// function updateNumber(){
//     swal("Enter you mobile number:", {
//       content: "input",
//     })
//     .then((value) => {
//      verify(value,email)
//     });
// }


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
                title: "Update SUCCESS!",
                text: "welcome",
                icon: "success",
                button: "OK",
              });
              document.getElementById("myText1").disabled = true;
              document.getElementById('can1').style.display = "none";
              document.getElementById('save-btn1').style.display = "none";
           }
           console.log('datas',result.data.result)
        }).catch(err=>{
            console.log('err',err.message)
        })
    }



console.log('jaki',img)


if(data){


    return(
        <>
        <div className="containe">
        <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-primary">
                <div className="container-fluid">
                    <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
                <form class="d-flex" role="search">
                  <input class="form-control me-1 search" type="search" placeholder="What are You looking for" aria-label="Search" onChange={(p)=>(p.target.value)}/>
                   <button class=" btn2" type="button" >&#128269;</button>   
                </form>
                <div className="cursor">
                       <Link to = {'/home'} className = 'navbar-brand'>
                        Home
                        </Link>
                       <Link to = {'/about'} className = 'navbar-brand'>
                        About
                        </Link> 
                        <Link to = {'/cantact'} className = 'navbar-brand'>
                          Contact Us
                        </Link>
                       <img src="https://static.thenounproject.com/png/70771-200.png" width='40' onClick={()=>navigate('/addtocart')} />
                       <span className="cart-count"><b>{totalUniqueItems}</b></span>   
                        </div>
                        <div className="drobdown">
                        <div className="profile ">
                        <h5>{localStorage.getItem('name')}</h5>
                        <div className="drob-con">
                        <p onClick={()=>  window.location.href = '/' }>Sigin-in</p>
                        <p onClick={()=>  window.location.href = '/signup' }>Sigin-up</p>
                        <p onClick={signout}>Log-out</p>
                        </div>
                        </div></div>
                </div>    
            </nav>
            <div className="profile-back">
            <div className="pro">
                <div className="profile-left">
                    {
                    img == null ?
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                    : <img src={img}></img>
                    }
                   <h4>{localStorage.getItem('name')}</h4>
                   <span>Id : {localStorage.getItem('id')}</span><br></br>
                   <span>Role :  {localStorage.getItem('role')}</span><br></br>
                   <input type='file' id="im" onClick={()=>openButton()} onChange={(p)=>setimg(URL.createObjectURL(p.target.files[0]))}/>
  <div className="d-left">
                <ul>
                    <li>My Coupons</li>
                    <li>All Notifications</li>
                    <li>My Reviews & Rating</li>
                    <li>My Wishlist</li>
                </ul>
  </div>
                <button type="button" onClick={signout}>Log out</button>

                </div>
                <div className="profile-right">
                  <form>
                    
                  <b><p>Name : 	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;<span onClick={()=>undisableTxt()}>Edit</span> <span id="can" onClick={()=>disableTxt1()} >cancel</span></p>  </b>
                    <br></br>
                <div className="form-group row">
                <div className="col">
                <input type="text"  className="form-control form-control-lg" id="myText" placeholder="name" value={name}  onChange={(p)=>setname(p.target.value)} disabled />
                </div>
                </div><br></br>    
                <b><p>Role: 	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;<span onClick={()=>undisableTxt()}></span></p> </b><br></br>
                <div className="form-group row">
               <div className="col">
                <input type="email" className="form-control form-control-lg" id="colFormLabelLg" placeholder="Role" value={role} onChange={(p)=>setrole(p.target.value)} disabled />
                </div>
                </div><br></br>
                <b><p>Mobile Number : <span onClick={()=>undisableTxtNumber()}>Edit</span> <span id="can1" onClick={()=>disableTxtNumber()}>cancel</span></p> </b><br></br>
                <div className="form-group row">
                <div className="col">
                <input type="email" className="form-control form-control-lg" id="myText1" placeholder="Mobile" value={mobile} onChange={(p)=>setmobile(p.target.value)} disabled />
                </div>
                </div><br></br>
                <b><p>Email : 	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp; <span onClick={()=>undisableTxt()}></span> <span id="can" onClick={()=>disableTxt1()} ></span></p> </b><br></br>
                <div className="form-group row">
                <div className="col">
                <input type="email" className="form-control form-control-lg" id="colFormLabelLg" placeholder="Email" value={email} onChange={(p)=>setemail(p.target.value)} disabled/>
                </div>
                </div><br></br>
                <b><p>Address : 	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;		 <span onClick={()=>undisableTxtAddress()}>Edit</span> <span id="can2" onClick={()=>disableTxtAddress()} >cancel</span></p> </b><br></br>
                <div className="form-group row">
                <div className="col">
                <input type="email" className="form-control form-control-lg" id="myText2" placeholder="Address" value={address} onChange={(p)=>setaddress(p.target.value)}  disabled/>
                </div>
                </div>


                  </form>
                  <button type="button" id="save-btn" onClick={()=>disableTxt()} >Save</button>
                  <button type="button" id="save-btn1" onClick={()=>verify(mobile,email)} >save</button>

<div className="help">
                  <h5>FAQs</h5>
                <ul>
                    <b><li>
                    What happens when I update my email address (or mobile number)?
                    </li></b>
                    <li>
                    Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).
                    </li>
                    <b><li>When will my Flipkart account be updated with the new email address (or mobile number)?</li></b>
                    <li>It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</li>
                    <b><li>Does my Seller account get affected when I update my email address?</li></b>
                    <li>lenskart has a 'single sign-on' policy. Any changes will reflect in your Seller account also.</li>
                </ul></div>
                </div>
            </div>
            </div>
 


        <div className="footer">
        <i><h4>Buy The Best Eyewear From Eagle-Eye</h4></i>
        <p>A one-stop online solution for purchasing eyewear and its accessories, Lenskart delivers them right at your doorstep with convenient methods of payment. Sunglasses as well as eyeglasses are available for men and women in a diverse array of styles and trendy colours. If you want to try out contact lenses, pick the ones of your choice from the extensive variety of coloured contact lenses from our online store.</p>
            <div className="foot">
                <div className="cont">
                <b><span>Service</span></b>
                <ul>
                    <li>Store Locator</li>
                    <li>Enter My Power</li>
                    <li>Buying Guide</li>
                    <li>Frame Size</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>About Us</span></b>
                <ul>
                    <li>We Are Hiring</li>
                    <li>Refer & Earn</li>
                    <li>About Us</li>
                    <li>Coupons</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>Help</span></b>
                <ul>
                    <li>FAQ's</li>
                    <li>Site Map</li>
                    <li>Payments</li>
                </ul>
                </div>
                <div className="cont">
                <b><span>Social</span></b>
                <ul>
                    <li>Facebooke</li>
                    <li>Twitter</li>
                    <li>Youtube</li>
                </ul>
                </div>
                <div className="cont">
                    
                <img src="https://headstrongperformance.net/wp-content/uploads/2016/04/get-it-on-google-play-vector.png"  />
                <img src="https://miro.medium.com/max/600/1*xqT83bMEz92IBYxS9UQNow.png"/>
                <p>Download Eyekart App to buy EyeGlasses </p>
                 </div>

            </div>
        </div>
        </div>

  
        </>
    )
                }
}

export default Profile