import React, { useState,useEffect } from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import axios from "axios";

import {
  AppstoreOutlined,BarChartOutlined,CloudOutlined,ShopOutlined,TeamOutlined,UploadOutlined,VideoCameraOutlined,
  } from '@ant-design/icons';
import  { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { Navigate, NavLink, useLocation, useNavigate,Link} from "react-router-dom";
import './product.css'
import { useCart} from "react-use-cart";
import swal from 'sweetalert';


const Productpage = () =>{
   
    
    const {totalUniqueItems} = useCart();
    const {state} = useLocation();
    const navigate = useNavigate();
    console.log('dataa',state)
    const [product,setproduct] = useState('')
    const [search,setsearch] = useState('');
    const [getData,setData] = useState('');



    const searchProduct = () =>{
        console.log('-------------------')
        axios.get(`http://localhost:8080/product/search?Brandname=${getData}`).then(result=>{
            console.log('data',result.data);
            setproduct(result.data)
        }).catch(err=>{
            console.log("err",err.message)
        })
    }


    const priceFilter = (mini,max)=>{
        console.log("price",mini , max)
        axios.get(`http://localhost:8080/product/filterPrice?start=${mini}&end=${max}`).then(result=>{
            console.log("price",result.data.status)
            if(result.data.status == 'success'){
                setproduct(result.data)
            }else{
                setproduct(state)
            }
        }).catch(err=>{
            console.log("err",err.message)
        })
       }

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




       useEffect(()=>{
    axios.post(`http://localhost:8080/product/indiCategory?uuid=${state.uuid}`).then(result=>{
        console.log('detail',result.data);
        setproduct(result.data); 
        if(result.data.status == 'failure'){
            setproduct(state)
        }
       }).catch(err=>{
        console.log('err',err.message);
       })    
},[])






if(product){

    return(
        <>
                    
         <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
                <form class="d-flex" role="search">
                  <input class="form-control me-1 search" type="search" placeholder="What are You looking for" aria-label="Search" onChange={(p)=>setData(p.target.value)} />
                   <button class=" btn2" type="button" onClick={searchProduct}>&#128269;</button>      
                </form>
                <div className="cursor">
                        <Link to= {'/home'} className='navbar-brand'>
                           Home
                        </Link>
                        
                        <Link to = {'/about'} className = 'navbar-brand'>
                        About
                        </Link> 
                   
                        {/* <Link to = {''} onClick={Allproduct}  className = 'navbar-brand'>
                        product
                        </Link>   */}
 
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
            
           <div className="product">
            <div className="leftbar">
                <ul>
                <li>
                    <i><h6>PRICE FILTER</h6></i>
                    <div className="opt">
                    <input class="form-check-input me-1" type="checkbox" value="" onClick={()=>priceFilter(500,1000)} />
                    <span>500 - 1000</span><br></br>
                    <input class="form-check-input me-1" type="checkbox" value="" onClick={()=>priceFilter(1000,2000)}/>
                    <span>1000 - 2000</span><br></br>
                    <input class="form-check-input me-1" type="checkbox" value="" onClick={()=>priceFilter(2000,3000)}/>
                    <span>2000 - 3000</span><br></br>
                    <input class="form-check-input me-1" type="checkbox" value="" onClick={()=>priceFilter(1,10000)}/>
                    <span>ALL</span>
                    </div>
                    </li>
                    <hr></hr>
                    <li>
                    <i><h6>FRAM COLOR</h6></i>
                    <div className="opt">
                    <input class="form-check-input me-1" type="checkbox" value=""/>
                    <span>Black</span><br></br>
                    <input class="form-check-input me-1" type="checkbox" value=""/>
                    <span>Blue</span><br></br>
                    <input class="form-check-input me-1" type="checkbox" value=""/>
                    <span>Brown</span><br></br>
                    <input class="form-check-input me-1" type="checkbox" value=""/>
                    <span>Gray</span>
                    </div>
                    </li>
                    <hr></hr>
                    <li>
                    <i><h6>BRAND</h6></i>
                    <div className="opt">
                    <input class="form-check-input me-1" type="checkbox" value=""/>
                    <span>VINCENTCHASE</span><br></br>
                    <input class="form-check-input me-1" type="checkbox" value=""/>
                    <span>FALLON COLBY</span><br></br>
                    <input class="form-check-input me-1" type="checkbox" value=""/>
                    <span>MASK</span><br></br>
                    </div>
                    </li>
                    <hr></hr>
                    <li>
                   <i><h6>FRAME SIZE</h6></i>
                   <div className="opt">
                    <input class="form-check-input me-1" type="checkbox" value=""/>
                    <span>NARROW</span><br></br>
                    <input class="form-check-input me-1" type="checkbox" value=""/>
                    <span>MEDIUM</span><br></br>
                    <input class="form-check-input me-1" type="checkbox" value=""/>
                    <span>WIDE</span><br></br>
                    <input class="form-check-input me-1" type="checkbox" value=""/>
                    <span>EXTRA WIDE</span>
                    </div>
                    </li>
                    <hr></hr>
                    <li>
                    <i><h6>MATERIAL</h6></i>
                    <div className="opt">
                    <input class="form-check-input me-1" type="checkbox" value=""/>
                    <span>TR90 (FLEXIBLE LIGHT-WEIGHGT)</span><br></br>
                    <input class="form-check-input me-1" type="checkbox" value=""/>
                    <span>STAINLESS STEET (SMAPLE MATTE & SHINY)</span><br></br>
                    </div>
                    </li>
                    <hr></hr>
                    <li>
                    <i><h6>FRAME SHAPE</h6></i>
                    <div className="opt">
                    <input class="form-check-input me-1" type="checkbox" value=""/>
                    <span>Wayfarer</span><br></br>
                    <input class="form-check-input me-1" type="checkbox" value=""/>
                    <span>Cat Eye</span><br></br>
                    <input class="form-check-input me-1" type="checkbox" value=""/>
                    <span>Rectangle</span><br></br>
                    <input class="form-check-input me-1" type="checkbox" value=""/>
                    <span>Aviator</span><br></br>
                    <input class="form-check-input me-1" type="checkbox" value=""/>
                    <span>Round</span>
                    </div>
                    </li>
                    <hr></hr>
                    <li></li>
                </ul>

            </div>

<div className="container cont">
    <div className="sort">
<form >
  <label>SORT BY :	&nbsp;</label>
  <select >
    <option >Best seller</option>
    <option  >Price : Low to High</option>
    <option>Price : High to Low</option>
    <option >New</option>
  </select>
</form>
    </div>
<div className="items">
<div className="glass">
    <img src="https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/628x301/9df78eab33525d08d6e5fb8d27136e95//v/i/matte-black-full-rim-wayfarer-vincent-chase-mirage-5051/s-c10-polarized-sunglasses_g_1833_18_05_2022.jpg"/>
<div className="brand">
<b><i><span>vincent chase online</span></i></b><br></br>
<hr></hr>
<div className="price">
  <b><i><span>Price : ₹1299 </span></i></b>
  <div className="rating">
        <small>4.6 &#9733;</small>   
  </div>
  </div> 
  <div className="price">
  <b><i><span>Size : Medium </span></i></b>  
  <div>
   <small>Mens</small>
  </div>
</div>
</div>
</div>
{
    product.result.map((data,index)=>{
        console.log('name',data.Brandname)
        return(
            <>
            <div className="items">
            <div className="glass" onClick={()=>navigate('/viewProduct',{state:data})}>
            <img src={data.Image}/>
            <div className="brand">
            <b><i><span>{data.Brandname}</span></i></b><br></br>
            <hr></hr>
            <div className="price">
            <b><i><span>Price : ₹{data.price} </span></i></b>
            <div className="rating">
            <small>4.6 &#9733;</small>   
            </div>           
            </div>
            <div className="price">
            <b><i><span>Size : {data.Framesize} </span></i></b>
            <div className="gender">
            <small>{data.Gender}</small>
            </div>
            </div>  </div>
            </div></div>
            
            </>
        )
    })
}
{/* <div className="glass">

</div>
<div className="glass">

</div>
<div className="glass">

</div>
<div className="glass">

</div>
<div className="glass">

</div> */}



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


        </>
    )
}
}


export default Productpage