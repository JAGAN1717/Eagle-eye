import React, { useState } from 'react'
import './dash.css'
import axios from 'axios';
import swal from 'sweetalert';
import { Navigate, NavLink, useLocation, useNavigate,Link} from "react-router-dom";


const Dashbord = () =>{
  const[datalist,setdatalist] = useState('');
  const [itemslist,setitemlist] = useState('')
  const [cart,setcart] = useState('')
 const navigate = useNavigate();
const getuserList = () =>{
  axios.get("http://localhost:8080/user/getuserList",{headers:{"token":localStorage.getItem("token")}}).then(list=>{
    console.log("list",list.data.status)
    if(list.data.status == 'success'){
      setdatalist(list.data)
      setitemlist('')
      setcart('')
    }
    
  }).catch(err=>{
    console.log("err",err.message)
  })
}
const addProduct = () =>{
  axios.post('http://localhost:8080/product/addProduct').then(result=>{
    console.log("result",result.data);
    if(result.data.status == "success"){
      
    }
  })
}

const getcart = () =>{
      
  let uuid = localStorage.getItem('id'); 
  axios.get(`http://localhost:8080/oder/getcart?uuid=USE57DF67D0`).then(result=>{
      console.log("status1",result.data.updated.products)
      if(result.data.status == 'success'){
      // navigate('/cart',{state:result.data}) 
      setcart(result.data.updated);
      }else{
          swal("Your Carts is Empty!");
      }
      setdatalist('')
      setitemlist('')
     
  }).catch(err=>{
      console.log("err",err.message)
  })
}

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

const GetProductList = () =>{
  axios.get("http://localhost:8080/product/getAll",{headers:{"token":localStorage.getItem("token")}}).then(list=>{
    console.log("list",list.data.status)
    if(list.data.status == 'success'){
      setitemlist(list.data)
      setdatalist('')
      setcart('')
    }

  }).catch(err=>{
    console.log("err",err.message)
  })
}
if(itemslist){
  return(
    <>
    <div className='dash_list'>
  <nav class="navbar navbar-expand-md fixed-top  top">
      <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
        
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2 search1" type="text" placeholder="Search" aria-label="Search"/>
        </form>
        <button class="btn7 btn-outline-success my-2 my-sm-0" type="submit">Search</button>\
        <h5 onClick={()=>navigate('/about')}> About </h5>
          <h5>{localStorage.getItem('name')}</h5>
      </div>
</nav>
<div className='dashcon'>
    <div className='left-bar'>
  <ul className='navbar-nav mr-auto'>
  <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
    <li className='nav-item'><a class="nav-link"  onClick={()=>window.location.href='/dash'}>Dashboard</a></li>
    <li className='nav-item'><a class="nav-link" onClick={GetProductList} href='#'>Product</a></li>
    <li className='nav-item'><a class="nav-link" onClick={getcart} href='#'>Order List</a></li>
    <li className='nav-item'><a class="nav-link" onClick={getuserList} href='#'>user List</a></li>
    <li className='nav-item'><a class="nav-link" onClick={GetProductList}  href='#'>Stock</a></li>
    {/* <li className='nav-item'><a class="nav-link" href='#'>Total Order</a></li> */}
    <li className='nav-item'><a class="nav-link" href='#'>Team</a></li>
    <li className='nav-item'><a class="nav-link" onClick={()=>navigate('/cantact')} href='#'>Message</a></li>
    <li className='nav-item'><a class="nav-link" href='#'>Setting</a></li><br></br><br></br>
    <li className='nav-item'><a class="nav-link" onClick={signout} href='#'>LOG OUT</a></li>
  </ul>
</div>
  {/* user List */}
  <div className='pro-head'></div>
  <table class="table table-bordered container pro-head">
    <thead  >
      <tr>
        <th scope="col">S.NO</th>
        <th scope="col">Product_id</th>
        <th scope="col">Brandname</th>
        <th scope="col">Producttype</th>
        <th scope="col">CategoryId</th>
        <th scope="col">Quantity</th>
      </tr>
    </thead>
  {
    itemslist.result.map((productlist,index)=>{
      return(<>
        <tbody>
      <tr>
        <th scope="row">{index+1}</th>
        <td>{productlist.uuid}</td>
        <td>{productlist.Brandname}</td>
        <td>{productlist.Producttype}</td>
        <td>{productlist.CategoryId}</td>
        <td>{productlist.quantity}</td>
        
      </tr> 
    </tbody>
      </>)
    })
  }
  </table>
  </div></div>

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

}else if(datalist){

return(
  <>
  <div className='dash_list'>
  <nav class="navbar navbar-expand-md fixed-top  top">
      <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
        
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2 search1" type="text" placeholder="Search" aria-label="Search"/>
        </form>
        <button class="btn7 btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        <h5 onClick={()=>navigate('/about')}> About </h5>
          <h5>{localStorage.getItem('name')}</h5>
      </div>
</nav>
<div className='dashcon'>
    <div className='left-bar'>
  <ul className='navbar-nav mr-auto'>
  <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
    <li className='nav-item'><a class="nav-link"  onClick={()=>window.location.href='/dash'}>Dashboard</a></li>
    <li className='nav-item'><a class="nav-link" onClick={GetProductList} href='#'>Product</a></li>
    <li className='nav-item'><a class="nav-link" onClick={getcart} href='#'>Order List</a></li>
    <li className='nav-item'><a class="nav-link" onClick={getuserList} href='#'>User List</a></li>
    <li className='nav-item'><a class="nav-link" onClick={GetProductList} href='#'>Stock</a></li>
    {/* <li className='nav-item'><a class="nav-link" href='#'>Total Order</a></li> */}
    <li className='nav-item'><a class="nav-link" href='#'>Team</a></li>
    <li className='nav-item'><a class="nav-link" onClick={()=>navigate('/cantact')} href='#'>Message</a></li>
    <li className='nav-item'><a class="nav-link" href='#'>Setting</a></li><br></br><br></br>
    <li className='nav-item'><a class="nav-link" onClick={signout} href='#'>LOG OUT</a></li>
  </ul>
</div>
{/* user List */}
<table class="table table-bordered table-dark container">
  <thead>
    <tr>
      <th scope="col">S.NO</th>
      <th scope="col">User_id</th>
      <th scope="col">NAME</th>
      <th scope="col">NUMBER</th>
      <th scope="col">EMAIL</th>
      <th scope="col">LOGIN TYPE</th>
    </tr>
  </thead>
{
  datalist.result.map((userlist,index)=>{
    return(<>
      <tbody>
    <tr>
      <th scope="row">{index+1}</th>
      <td>{userlist.uuid}</td>
      <td>{userlist.username}</td>
      <td>{userlist.phone}</td>
      <td>{userlist.email}</td>
      <td>{userlist.loginType}</td>
      
    </tr> 
  </tbody>
    </>)
  })
}
</table>
</div></div>

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
if(cart){
  return(
    <>
    <div className='dash_list'>
  <nav class="navbar navbar-expand-md fixed-top  top">
      <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
        
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2 search1" type="text" placeholder="Search" aria-label="Search"/>
        </form>
        <button class="btn7 btn-outline-success my-2 my-sm-0" type="submit">Search</button>\
        <h5 onClick={()=>navigate('/about')}> About </h5>
          <h5>{localStorage.getItem('name')}</h5>
      </div>
</nav>
<div className='dashcon'>
    <div className='left-bar'>
  <ul className='navbar-nav mr-auto'>
  <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
    <li className='nav-item'><a class="nav-link"  onClick={()=>window.location.href='/dash'}>Dashboard</a></li>
    <li className='nav-item'><a class="nav-link" onClick={GetProductList} href='#'>Product</a></li>
    <li className='nav-item'><a class="nav-link" href='#'>Order List</a></li>
    <li className='nav-item'><a class="nav-link" onClick={getuserList} href='#'>user List</a></li>
    <li className='nav-item'><a class="nav-link" onClick={GetProductList} href='#'>Stock</a></li>
    {/* <li className='nav-item'><a class="nav-link" href='#'>Total Order</a></li> */}
    <li className='nav-item'><a class="nav-link" href='#'>Team</a></li>
    <li className='nav-item'><a class="nav-link" onClick={()=>navigate('/cantact')} href='#'>Message</a></li>
    <li className='nav-item'><a class="nav-link" href='#'>Setting</a></li><br></br><br></br>
    <li className='nav-item'><a class="nav-link" onClick={signout} href='#'>LOG OUT</a></li>
  </ul>
</div>
  {/* order List */}
  <div className='pro-head'></div>
  <table class="table table-bordered container pro-head">
    <thead  >
      <tr>
        <th scope="col">S.NO</th>
        <th scope="col">Product_id</th>
        <th scope="col">Brandname</th>
        <th scope="col">Producttype</th>
        <th scope="col">price</th>
        <th scope="col">Quantity</th>
      </tr>
    </thead>
  {
    cart.products.map((order,index)=>{
      return(<>
        <tbody>
      <tr>
        <th scope="row">{index+1}</th>
        <td>{cart.uuid}</td>
        <td>{order.productName}</td>
        <td>{order.ProductColor}</td>
        <td>{order.price}</td>
        <td>{order.quantity}</td>
        
      </tr> 
    </tbody>
      </>)
    })
  }
  </table>
  </div></div>

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
else{

return(
        <>
        
<nav class="navbar navbar-expand-md fixed-top  top">
      <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
        
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2 search1" type="text" placeholder="Search" aria-label="Search"/>
        </form>
        <button class="btn7 btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        <h5 onClick={()=>navigate('/about')}> About </h5>
          <h5>{localStorage.getItem('name')}</h5>
          
      </div>
</nav>
   
    <div className='dashcon'>
    <div className='left-bar'>
  <ul className='navbar-nav mr-auto'>
  <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
    <li className='nav-item'><a class="nav-link"  onClick={()=>window.location.href='/dash'}>Dashboard</a></li>
    <li className='nav-item'><a class="nav-link" onClick={GetProductList} href='#'>Product</a></li>
    <li className='nav-item'><a class="nav-link" onClick={getcart} href='#'>Order List</a></li>
    <li className='nav-item'><a class="nav-link" onClick={getuserList} href='#'>User List</a></li>
    <li className='nav-item'><a class="nav-link" onClick={GetProductList} href='#'>Stock</a></li>
    {/* <li className='nav-item'><a class="nav-link" href='#'>Total Order</a></li> */}
    <li className='nav-item'><a class="nav-link" href='#'>Team</a></li>
    <li className='nav-item'><a class="nav-link" onClick={()=>navigate('/cantact')} href='#'>Message</a></li>
    <li className='nav-item'><a class="nav-link" href='#'>Setting</a></li><br></br><br></br>
    <li className='nav-item'><a class="nav-link" onClick={signout} href='#'>LOG OUT</a></li>
  </ul>
</div>
<div className='container'>
<div className='dashfle'>
<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Get User Details and List</h5>
        <p class="card-text">user name id loginstatus address details and wishlist and Orders.</p>
        <button className='sub' onClick={getuserList} type='button'>submit</button>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Product_Details and Stacks</h5>
        <p class="card-text">Product Quantities, Available Stacks and New Stack Enquiry.</p>
        <button className='sub' onClick={GetProductList} type='button'>submit</button>
      </div>
    </div>
  </div>
</div>
</div>
<div className='dashfle'>
<div class="row">
  {/* <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Branchers and Distributes</h5>
        <p class="card-text">Branch and Distributes Enquiry and get Details Visit New current product.</p>
        <button className='sub' type='button'>submit</button>
      </div>
    </div>
  </div> */}
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Get Payment and sale Details</h5>
        <p class="card-text">much sale product,much wishite product, much wishite offers and deals.</p>
        <button className='sub' type='button' ><a href='https://www.sandbox.paypal.com/mep/dashboard'>submit</a></button>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
      <div class="card">
      <div class="card-body">
        <h5 class="card-title">Add product and Categories</h5>
        <p class="card-text">Including New, Popular Products and Categories,including offers  .</p>
        <button className='sub' type='button' onClick={()=>navigate('/add')} >submit</button>
      </div>
    </div>
  </div>
  
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
        </div>
    </>
    )
}
}



export default Dashbord