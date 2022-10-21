import axios from "axios";
import React, { useState ,useEffect} from "react";
import { Navigate, NavLink, useLocation, useNavigate,Link} from "react-router-dom";
import swal from 'sweetalert';
import Register from "../Register/Sign-up";
import { useCart } from 'react-use-cart'
import './home.css'

const Home = () =>{
    // const {state} = useLocation();
    //  localStorage.setItem('name',state.result.username);
    //  localStorage.setItem('id',state.result.uuid)
    const navigate = useNavigate();
    const [profile,setprofile] = useState('');
    const[logout,setLogout] = useState('');
    const[product, setProduct] = useState('');
    const [category,setCategory] = useState('');
    const [search,setsearch] = useState('');
    const [getData,setData] = useState('');
    const {totalUniqueItems} = useCart();

    

    useEffect(()=>{
        let uuid  = localStorage.getItem('id')
        axios.get(`http://localhost:8080/user/getoneUser?uuid=${uuid}`).then(result=>{
            console.log('result',result.data.result)
            setprofile(result.data.result)
        }).catch(err=>{
            console.log(err.message)
        })
     },[])   


    //search-product
    const searchProduct = () =>{
        console.log('-------------------')
        axios.get(`http://localhost:8080/product/search?Brandname=${getData}`).then(result=>{
            console.log('data',result.data);
            navigate('/product',{state:result.data})
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
                  setLogout(result);
                  navigate('/signup')
            }  
        }).catch(err=>{
            console.log('err',err.message)
            swal("userName and password is Wrong!");

        })
    }

    //cart
    const getcart = () =>{
      
            let uuid = localStorage.getItem('id'); 
            axios.get(`http://localhost:8080/oder/getcart?uuid=${uuid}`).then(result=>{
                console.log("status1",result.data.updated.products)
                if(result.data.status == 'success'){
                 navigate('/cart',{state:result.data}) 
                }else{
                    swal("Your Carts is Empty!");
                }
               
            }).catch(err=>{
                console.log("err",err.message)
            })
    }

    // get all product in  database
    const Allproduct = () =>{
        axios.get('http://localhost:8080/product/getAll',{headers:{"token":localStorage.getItem("token")}})
        .then(items =>{
            console.log('product',items.data.result);
          setProduct(items)
          if(product){
            console.log('success');
            navigate('/product',{state:items.data})
          }

        }).catch(err=>{
            console.log('err',err.message)
        })
    }

  

    useEffect(()=>{
        axios.get('http://localhost:8080/product/categoryBassed').then(result=>{
            console.log('category',result.data.result);
            setCategory(result.data);
        }).catch(err=>{
            console.log('err',err.message);
        })
    },[])


const role = localStorage.getItem('role');  

if(category) {

  
    
    return(
        <>
            <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-primary">
                <div className="container-fluid">
                    <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
                <form class="d-flex" role="search">
                  <input class="form-control me-1 search" type="search" placeholder="What are You looking for" aria-label="Search" onChange={(p)=>setData(p.target.value)}/>
                   <button class=" btn2" type="button" onClick={searchProduct}>&#128269;</button>   
                </form>
                <div className="cursor">
                       {/* <span className="navclick" onClick={Allproduct}>product</span> */}
                       <Link to = {'/about'} className = 'navbar-brand'>About</Link> 
                       <Link to = {'/map'} className = 'navbar-brand'>Track Order</Link> 
                       {/* <span className="navclick" onClick={getcart}>Cart</span> */}
                       
                       {
                       role == 'user' ? 
                       <>
                       <img src="https://static.thenounproject.com/png/70771-200.png" width='40' onClick={()=>navigate('/addtocart')} />
                       <span className="cart-count"><b>{totalUniqueItems}</b></span>  
                       </> :"" 
                       
                       }  
                        </div>
                        <div className="drobdown">
                        <div className="profile ">
                         <h5 onClick={()=>navigate('/profile',{state:profile})}>{localStorage.getItem('name')}</h5> 
                        <div className="drob-con">
                        <p onClick={()=>  window.location.href = '/' }>Sigin-in</p>
                        <p onClick={()=>  window.location.href = '/signup' }>Sigin-up</p>
                        <p onClick={signout}>Log-out</p>
                        </div>
                        </div></div>
                </div>    
            </nav>

<div className="home-full">
<div className="adm">
            {
                role == 'admin'?
        <div class="nav-scroller bg-white box-shadow NAV2">
      <nav class="nav nav-underline">
        <a class="nav-link " onClick={()=>window.location.href = '/dash'} >Dashboard</a>
        <a class="nav-link" href="">EYEGLASSES</a>
        <a class="nav-link" href="">SUNGLASSESS</a>
        <a class="nav-link" href="">COMPUTER GlASSES</a>
        <a class="nav-link" href="">CONTACT LENSE</a>
        <a class="nav-link" href="">POWER GLASSES</a>
        <a class="nav-link" href="">RADING GLASSES</a>
        <a class="nav-link" href="">STORE LOCATOR</a>
        <a class="nav-link" href="">MEN,WOMENS & KIDS</a>

      </nav>
    </div> :""
}</div>
        {/* home  */}
        <div className="cover">
            <div className="container-fluid">
                {
                category.result.map((detail,index)=>{
                        console.log('data',detail.uuid)
                        return(<>
                        <div className="category" >
                            <div className="type" onClick={()=>navigate('/product',{state:detail})} >
                                <img src={detail.Image}/>
                                <i><h6>{detail.Category}</h6> </i>
                                </div>
                                </div>
                        </>)
                    })
                
        
                }
                 
            
     </div> </div>
                 <div className="slideShow">
                    <div className="slid-frame">
                    </div>
                 </div>
     

      

                     <div className="off">
                        <img src="https://static1.lenskart.com/media/desktop/img/Apr22/Bannerforexport.jpg"/>
                     </div><br></br>
                       
                        <h3>WEAR THE TRENDING</h3>
                     
                     <div className="trend-product">
                        <div className="product-items">
                            <img src ="https://static1.lenskart.com/media/desktop/img/Sep21/image179.png"/>
                            <h4>Round</h4>
                            <button>Explore</button>
                        </div>
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/cateeye.jpg"/>
                            <h4>Cat-Eye</h4>
                            <button>Explore</button>
                        </div>
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/clubmaster.jpg"/>
                            <h4>Clubmaster</h4>
                            <button>Explore</button>
                        </div>   
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/trans.jpg"/>
                            <h4>Transparent</h4>
                            <button>Explore</button>
                        </div>
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/trans.jpg"/>
                            <h4>Transparent</h4>
                            <button>Explore</button>
                        </div>
                        <div className="product-items">
                            <img src="https://static1.lenskart.com/media/desktop/img/Sep21/airflex.jpg"/>
                            <h4>Air Flex</h4>
                            <button>Explore</button>
                        </div>                     
                     </div>


                <div className="off">
                    <img src='https://static1.lenskart.com/media/desktop/img/June22/27thjune/1920x200.jpg'/>
                </div>

        <div className="view">
            <div className="line"><h3><span>AS Seen On TV : Aqualens Contect Lenses</span></h3></div>
            <div className="gif">
                <img src="https://static1.lenskart.com/media/desktop/img/June22/aqualense-as-seen-web.gif"/>
                </div>
                <div className="line"><h3><span>FIND THE PERFECT FIT</span></h3></div>
                <div className="mode">
                <div className="container flex ">
                    <div className="addver">
                        <img src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/eye-square10.jpg"/>
                        <img src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/power-sun-square.jpg"/>
                        </div>
                        <div className="addver">
                            <img src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/ce-square.jpg"/>
                            <img src="https://static1.lenskart.com/media/desktop/img/Aug21/Desktop/sun-square.jpg"/>
                            <img src="https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/Banner03_TileDesktop.jpg" />
                            </div>
                            </div>
                            </div></div>

                <div className="off2">
                    <img src='https://static1.lenskart.com/media/desktop/img/Nov20/25-Nov/Banner05_Final2ndDec21.jpg'/>
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
    )} 
}

export default Home