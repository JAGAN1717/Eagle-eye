import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, NavLink, useLocation, useNavigate,Link} from "react-router-dom";
import './cart.css'
import swal from 'sweetalert';
import {useSelector} from 'react-redux'


const Cart = () =>{

const{state} = useLocation();
console.log("stat",state)
const navigate = useNavigate();
const [cart,setcart] = useState(state.updated)
console.log("data",state.updated.products)
//console.log("i",state.updated.total)
var total1 = parseInt(state.updated.total)
var totalPay = total1 + 50 +12
const [address,setaddress]=useState('chennai-0001');
const[qnt,setqnt] = useState('')
const[item,setitem] = useState('')



function quantity(quan,id){
    setqnt(quan);
    setitem(id)
}

// if(qnt <= 0){
//     setqnt(1)
// }
// function quantity(value,index){
// //setqnt(value)
// //const findindex = cart.findIndex((obj)=>)
// console.log('cart1',cart[index])
// console.log('ind',index)


// if (index !== -1) {
//    var temp = cart[index].quantity = value;
//     console.log('cart2',cart[index])
//     console.log('temp',cart)
//     console.log('qnt',cart[index].price * cart[index].quantity)
//     setqnt(cart[index].price * cart[index].quantity);
//   }
// }
console.log('asd',qnt)
console.log('pp',item.price)
const removeItem = (i,index)=>{
    
    
    for( var i = 0; i < cart.length; i++){ 
    
        if ( cart[index] == i) { 
    
            cart.splice(i, 1); 
        }
    
    }
    
    //=> [1, 2, 3, 4, 6, 7, 8, 9, 0]
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
                        <Link to = {'/map'} className = 'navbar-brand'> Track Order</Link> 
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

            <div className="cart-con">
                <div className="cort-flex">
                    <div className="addTo">
                        <div className="address">
                            <h5>My Cart(0)</h5>
                            <div className="change">
                                <span>Deliver to : </span> <h6>{address}</h6>
                                <button type="button" onClick={changeAddress} > change </button>
                            </div>
                        </div>
                        {
                      cart.products.map((i,index)=>{
                       
                        return(
                            <>
                        <div className="cart-item">
                            <img src={i.productimg} />
                            <div className="item-info">
                                <h4>{i.productName}</h4>
                                <span>FRAME-COLOR : {i.ProductColor}</span><br></br>
                                <span>Size : Widwe</span>
                                <h6>price : ₹{i.price}</h6>
                                <div className="cart-remove">
                             <input class="quantity" type="number" defaultValue={1}  onChange={(p)=>quantity(p.target.value,i)} />
                                        <button type="button"onClick={removeItem(i,index)} >Remove</button>
                                        </div>
                                        </div>
                                        </div>
                                        </>
                        )
                       }) 
                       }
                        <div className="procced">
                            <button type="button" onClick={()=>navigate('/pay',{state:totalPay})} >PLACE ORDER</button>
                        </div>

                    </div>
                    
                    <div className="bill">
                    <h4>Price Details</h4>
                    <div className="price-list">
                    <div className="price-lable">
                       <p>Price  </p>
                       <p>Discount  </p>
                       <p>Delivery Charges  </p>
                       <p>Convenience Fee  </p>
                        </div>
                        <div className="rate">
                       <p>₹{cart.total}</p>
                       <p>− ₹0</p>
                       <p>₹50</p>
                       <p>₹12</p>
                        </div>
                    </div>
                    <div className="total-price">
                        <h4>Total Amount</h4>
                        <h5>₹{totalPay}</h5>
                    </div>
                    <hr></hr>
                    <span>You will save ₹1,000 on this order</span>
                    <hr></hr>
                    <span>Save extra ₹80 using 80 SuperCoins on the next step</span>
                      
                    </div>
                </div>

            </div>

        </>
   )
 

    
 }

 export default Cart