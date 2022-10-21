import React, { useState } from "react";
import "./contact.css";
import axios from "axios";
import swal from 'sweetalert';
import { Navigate, NavLink, useLocation, useNavigate,Link} from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [to, setTo] = useState("");
  const [text, setText] = useState("");
  const [Name, setName] = useState("");


      //user sigout
      const signout = () =>{
        //let uuid = state.result.uuid
        let uuid = localStorage.getItem('id')
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

  const handleSubmit = async () => {
    let mail  = {
      toMail : to,
      name  : Name,
      text  : text
    }

    axios.post(" http://localhost:8080/user/contact",mail)
      .then((res) => {
        console.log(res);
        console.log('success')
        swal({
          title: " MAIL SENDED!",
          text: "THANKS",
          icon: "success",
          button: "OK",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    <>
   <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-primary">
            <div className="container-fluid">
                <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
                <form class="d-flex" role="search">
                    <input class="form-control me-1 search" type="search" placeholder="What are You looking for" aria-label="Search"/>
                    <button class=" btn2" type="submit">&#128269;</button>      
                    </form>
                    <div className="cursor">
                    <Link to= {'/home'} className='navbar-brand'>
                        Home
                        </Link>
                        
                        <Link to= {'/about'} className='navbar-brand'>
                            About
                            </Link>  
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

      <div className="containe my-5 cantact-full">
        <div
          className=" col-lg-10 offset-lg-1 text-white contact-bg p-4"
          id="box"
        >
          <div className="row text-bg p-4">
            <h1 className="text-center text-white cont-title">CONTACT US</h1>
            <p className="text-center cont-para">
              If you have any query or need any help contach us through below
              Email or Phone number
            </p>
            <div className="col-6 con-left">
              <div>
                <i className="fa-solid fa-location-dot contact-icon"></i>
                <h2 className="mt-2  text-white">Address</h2>
                <p className="cont-para">
                  No 8, Vevekanandher Street, <br /> Dhubai MainRoad, Dhubai,
                  <br></br> Tamil Nadu-1234567
                </p>
              </div><br></br>
              <div>
                <i className="fa-solid  contact-icon"></i>
                <h2 className="mt-2  text-white">Phone</h2>
                <p>555-123-52525</p>
              </div><br></br><br></br>
              <div>
                <i className="fa-solid contact-icon"></i>
                <h2 className="mt-2  text-white">Email</h2>
                <p className="cont-para">jagan.platosys@gmail.com</p>
              </div>
            </div><br></br>

            <div className="col-6 ">
              <form className="cont-form" onSubmit={handleSubmit}>
                <div className="my-3">
                  <input
                    type="text"
                    placeholder="FullName"
                    className="form-control border-3 border-info"
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
                <div className="my-3">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control border-3 border-info"
                    onChange={(e) => setTo(e.target.value)}
                  ></input>
                </div>
                <div className="right-move">
                <div className="my-3">
                  <textarea
                    className="form-control border-3 border-info"
                    placeholder="type your message.."
                    onChange={(e) => setText(e.target.value)}
                    rows={5}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-outline-info border-3 w-100" 
                  onClick={handleSubmit}
                >
                  SUBMIT
                </button></div>
              </form>
            </div>
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
            <hr></hr>
            <span>2022 & 2023</span>
        </div>


    </>
  );
};

export default Contact;