import React,{useState} from "react";
import './addcart.css'
import { Navigate, NavLink, useLocation, useNavigate,Link} from "react-router-dom";
import { useCart } from 'react-use-cart';
import swal from 'sweetalert';
import axios from "axios";


const AddToCart = () =>{
// const {state} = useLocation();
// console.log('state',state);
//const [cart,setcart] = useState(state.updated)
//const [ prodata,setprodata]= useState('')
const navigate = useNavigate();
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

//console.log('prodata',prodata)

const totalcart = (uuid) =>{
    axios.get(`http://localhost:8080/oder/Cart?uuid=${uuid}`).then(result=>{
        console.log("total",result.data)
        if(result.data.status == 'success'){
       // navigate('/cart',{state:result.data})

        }
    })
}

const addTocart1 = (prodata) =>{
    let uuid = localStorage.getItem('id'); 
    let cart = {
        productId :prodata.id ,
        productName : prodata.Brandname,
        ProductColor : prodata.Framecolor,
        productimg : prodata.Image,
        quantity : prodata.quantity ,
        price : prodata.price,
    }
    axios.post(`http://localhost:8080/oder/addToCart?userId=${uuid}`,cart).then(result=>{
        console.log("data",result.data)
        let uuid = result.data.result.uuid
         totalcart(uuid)
        
    }).catch(err=>{
        console.log("err",err.message)
    })
}


if(isEmpty){
    return(
        <>
        <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-primary">
                <div className="container-fluid">
                    <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
                <form class="d-flex" role="search">
                  <input class="form-control me-1 search" type="search" placeholder="What are You looking for" aria-label="Search" />
                   <button class=" btn2" type="button" onClick={''}>&#128269;</button>   
                </form>
                        <Link to = {'/home'} className = 'navbar-brand'>Home</Link> 
                        <Link to = {'/map'} className = 'navbar-brand'>Track</Link> 
                        <Link to = {'/about'} className = 'navbar-brand'>About</Link> 
                        <div className="drobdown">
                        <div className="profile ">
                        <h5>{localStorage.getItem('name')}</h5>
                        <div className="drob-con">
                        <p onClick={()=>  window.location.href = '/' }>Sigin-in</p>
                        <p onClick={()=>  window.location.href = '/signup' }>Sigin-up</p>
                        <p onClick={'/'}>Log-out</p>
                        </div>
                        </div></div>
                </div>    
            </nav>

            <div className="empty-cart">
            <h1 className="text-center">Your Cart is Empty</h1>
            </div>
        
        </>
    )
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
                <form class="d-flex" role="search">
                  <input class="form-control me-1 search" type="search" placeholder="What are You looking for" aria-label="Search" />
                   <button class=" btn2" type="button" onClick={''}>&#128269;</button>   
                </form>
                        <Link to = {'/home'} className = 'navbar-brand'>Home</Link> 
                        <Link to = {'/map'} className = 'navbar-brand'>Track</Link> 
                        <Link to = {'/about'} className = 'navbar-brand'>About</Link>                         <div className="drobdown">
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

        

<div class="cart-items">
<div class="small-cart-page">

    <table className="table table-light table-hover m-0">
            <tr className="table-primary">
                <th>product ({totalUniqueItems})</th>
                <th>Brandname</th>
                <th>Price</th>
                <th>Quantity ({totalItems})</th>
                <th>Remove</th>
               
            </tr>
        <tbody>
            {
                items.map((i,index)=>{
                    
                    return(
                        <>
                     
                        <tr key={index} onClick={()=>addTocart1(i)}> 
                            <td>
                                <img src={i.Image} style = {{height:'6rem'}}/>
                            </td>
                            <td>{i.Brandname}</td>
                            <td>{i.price}</td>
                            <td>Quantity ({i.quantity})</td>
                            <td>
                                <button
                                className="btn btn-info ms-2"
                                onClick={()=>updateItemQuantity(i.id,i.quantity -1)}
                                > -
                                </button>
                                <button
                                className="btn btn-info ms-2"
                                onClick={()=>updateItemQuantity(i.id,i.quantity +1)}
                                > +
                                </button>
                                <button 
                                className="btn btn-danger ms-2"
                                onClick={()=>removeItem(i.id)}
                                >Remove-Item
                                 </button>
                                 {/* <button
                                className="btn btn-info ms-2"
                                onClick={()=>addTocart1(i)}
                                >set
                                </button> */}

                            </td>
                        </tr>
                        </>
                    )
                })
            }
        </tbody>
    </table>
<hr/>
<div class="total">
   <h6>TOTAL</h6>
   <span class="total-price">₹{cartTotal}</span>
</div>
<hr/>
{/* <div className="pay-1">
<button type="button">PAY</button>
</div> */}
</div>
</div>
<div className="address-cart">
<span>Address : {address}</span><br></br>
<button className="btn btn-primary m-2" onClick={changeAddress}>change</button>
</div>
<div className="col-auto">
<button className="btn btn-danger ms-2"
onClick={()=>emptyCart()}
>Clear cart
</button>
<button className="btn btn-primary m-2" onClick={()=>navigate('/paypal')}>BUY NOW</button>
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

export default AddToCart