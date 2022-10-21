import axios from "axios";
import React ,{useState} from "react";
import { Navigate, NavLink, useLocation, useNavigate,Link} from "react-router-dom";
import { useCart } from 'react-use-cart';
import swal from 'sweetalert';

const Paypal = () =>{
    const [address,setaddress]=useState('No:8,Vevekanandher street,Dhubai MainRoad,Dhubai');
    const {
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart
    } = useCart();
const navigate = useNavigate();
console.log("carttotal",cartTotal)

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

// const pay = () =>{
  
//     axios.post('http://localhost:8080/paypal/paypal').then(detail=>{
//         console.log('paypal',detail.data);

//     }).catch(err=>{
//         console.log(err.message)
//     })
// }

const changeAddress= () =>{
    swal("Enter your Deliver Address:", {
        content: "input",
      })
      .then((value) => {
    let info = {
        uuid:localStorage.getItem('id'),
        address:value
    }
    console.log(info.uuid , info.address)
    axios.put(`http://192.168.29.139:8080/user/updateAdd`,info).then(result=>{
        console.log('addres',result.data.result.address)
        setaddress(result.data.result.address)
    })
})
}

    return(
        <>

<nav className="navbar navbar-expand-md fixed-top navbar-dark bg-primary">
            <div className="container-fluid">
                <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
                    <div className="cursor">  
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
<div className="pay-meth">
    <div className="pay-full">

    
<div className="verify1">
    <div className="pay-address">
        <span><b>1 : Delivery Address</b></span>
        <p>{address}</p>
    </div>
    <div className="change-btn">
    <button onClick={changeAddress}>Change</button>
    </div>
</div>
<div className="verify2">
    <div className="pay-address">
        <span><b>2 : Order Summary</b></span>
        <p>items : ({totalItems})</p>
    </div>
    <div className="change-btn1">
    <button onClick={()=>navigate('/addtocart')}>Change</button>
    </div>
</div>

    <div className="paypal-gate">    
    <h3>3 : Payment Method</h3>    
    <hr></hr>
    <ul>
        <li>1
        <img src="https://paydible.com/wp-content/uploads/2018/09/Paypal-banner.png"/>
        <button className="pay-btn" onClick={''}><a href="http://localhost:8080/paypal">CONTINUE</a></button>
        </li>
        <li>2
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS155YCCcmmg8ww-Nfw4fhs9rrIwHzdMijryIx3NkrIO63UwyW62WurOqkImGaqJx4ylDY&usqp=CAU"/>
        <button className="pay-btn" onClick={()=>navigate('/pay',{state:{cartTotal}})} >CONTINUE</button>
        </li>    
        <li>3
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7QZDU8UMCRkbJn9YFoQ7_ObS8FZJwryLsUw&usqp=CAU"/>
        <button className="pay-btn" onClick={()=>navigate('/slip2')}>CONTINUE</button>
        </li>
    </ul>
 
    <div>

    </div>

    </div>
    </div>
    <div className="bill">
                    <h4>Price Details</h4>
                    <div className="price-list">
                    <div className="price-lable">
                       <p>Price({totalItems})  </p>
                       <p>Discount  </p>
                       <p>Delivery Charges  </p>
                       <p>Convenience Fee  </p>
                        </div>
                        <div className="rate">
                       <p>₹{cartTotal}</p>
                       <p style={{color:"red"}}>− ₹0</p>
                       <p style={{color:"green"}}>FREE</p>
                       <p >₹2</p>
                        </div>
                    </div>
                    <div className="total-price1">
                        <h4>Amount Payable</h4>
                        <h5>₹{cartTotal + 2}</h5>
                    </div>
                    <hr></hr>
                    <span>You will save ₹1,000 on this order</span>
                    <hr></hr>
                    <span>Save extra ₹80 using 80 SuperCoins on the next step</span>
                    </div>

</div>

<div class="row-1">
                     <div class="col-5">
                         <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Amazon_Pay_logo.svg/1280px-Amazon_Pay_logo.svg.png" />
                     </div>
                        <div class="col-5">
                            <img src="https://pngimg.com/uploads/paypal/paypal_PNG4.png" />
                        </div>
                            <div class="col-5">
                                <img src="https://logos-download.com/wp-content/uploads/2021/01/PhonePe_Logo_full.png" />
                            </div>
                                <div class="col-5">
                                    <img src="https://thestrawgroup.com/wp-content/uploads/2018/01/logobar-google-pay.png"/>
                                </div>
                                    <div class="col-5">
                                        <img src="https://static.businessworld.in/article/article_extra_large_image/1589892172_FHqF6Z_UPI.jpg"/>
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


export default Paypal