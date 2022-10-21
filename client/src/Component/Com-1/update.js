import React, { useState } from "react";
import swal from 'sweetalert';
import axios from "axios";
import { Navigate, NavLink, useLocation, useNavigate,Link} from "react-router-dom";


const Updateproduct = () =>{
  const navigate = useNavigate('');
    const {state} = useLocation();
    const[Brandname,setBrandname] = useState(state.Brandname)
    const[Producttype,setProducttype] = useState(state.Producttype)
    const[Framecolor,setFramecolor] = useState(state.Framecolor)
    const[Frametype,setFrametype] = useState(state.Frametype)
    const[Frameshape,setFrameshape] = useState(state.Frameshape)
    const[Framesize,setFramesize] = useState(state.Framesize)
    const[Material,setMaterial] = useState(state.Material)
    const[Gender,setGender] = useState(state.Gender)
    const[Price,setPrice] = useState(state.Price)
    const[Quantity,setQuantity] = useState(state.Quantity)
    const[Image,setImage] = useState(state.Image)
    const[CategoryId,setCategoryId] = useState(state.CategoryId)

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


    const Updateproduct = (uuid) =>{
        const data = {
            uuid : uuid,
            Brandname:Brandname,
            Producttype:Producttype,
            Framecolor:Framecolor,
            Frametype:Frametype,
            Frameshape:Frameshape,
            Framesize:Framesize,
            Material:Material,
            Gender:Gender,
            Price:Price,
            Quantity: Quantity,
            Image :Image,
            AdminId:"USE7670AEB8",
            CategoryId:CategoryId
        }
        axios.put('http://localhost:8080/product/update',data,{headers:{"token":localStorage.getItem("token")}}).then(result=>{
            console.log('data',result.data.status);
            if(result.data.status == 'success'){
                swal({
                    title: "UPDATE SUCCESS!",
                    text: "SUCESSED",
                    icon: "success",
                    button: "OK",
                  });

            }
        }).catch(err=>{
            console.log('err',err.message)
        })
    }
    

    return(
        <>
             <nav className="navbar navbar-dark bg-primary">
                <div className="container-fluid">
                    <img className="logo" src="https://eagleeyevr.com/wp-content/uploads/2021/12/Eagle-Eye-VR-Logo-1.png"/>
                <form class="d-flex" role="search">
                  <input class="form-control me-1 search" type="search" placeholder="What are You looking for" aria-label="Search"/>
                   <button class=" btn2" type="submit">&#128269;</button>      
                </form>
                   
                        <Link to= {'/home'} className='navbar-brand'>
                           Home
                        </Link>
                        
                        <Link to= {'/about'} className='navbar-brand'>
                          About 
                        </Link>
                   
                        {/* <Link to = {''} onClick={Allproduct}  className = 'navbar-brand'>
                        product
                        </Link>   */}

                        <Link to = {'/signup'}  onClick={''} className = 'navbar-brand'>
                        Cart
                        </Link>  

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
<div className="back">
    <div className="up">
            <h3> Update_ProductDetails</h3>
            <form className="container form">
                <div className="right">
             <div className="form-group">
               <label for="formGroupExampleInput">Brandname</label>
              <input type="text" className="form-control" id="formGroupExampleInput" value={Brandname} onChange={(p)=>setBrandname(p.target.value)} />
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput2">Producttype</label>
              <input type="text" className="form-control" id="formGroupExampleInput2" value={Producttype} onChange={(p)=>setProducttype(p.target.value)}/>
            </div>
            <div className="form-group">
               <label for="formGroupExampleInput">Framecolor</label>
              <input type="text" className="form-control" id="formGroupExampleInput"value={Framecolor} onChange={(p)=>setFramecolor(p.target.value)} />
            </div>
            <div className="form-group">
               <label for="formGroupExampleInput">Frametype</label>
              <input type="text" className="form-control" id="formGroupExampleInput" value={Frametype} onChange={(p)=>setFrametype(p.target.value)}/>
            </div>
            <div className="form-group">
               <label for="formGroupExampleInput">Frameshape</label>
              <input type="text" className="form-control" id="formGroupExampleInput" value={Frameshape} onChange={(p)=>setFrameshape(p.target.value)} />
            </div>
            <div className="form-group">
               <label for="formGroupExampleInput">Framesize</label>
              <input type="text" className="form-control" id="formGroupExampleInput" value={Framesize} onChange={(p)=>setFramesize(p.target.value)} />
            </div>
            </div>
            <div className="right">
            <div class="form-group">
               <label for="formGroupExampleInput">Material</label>
              <input type="text" className="form-control" id="formGroupExampleInput" value={Material} onChange={(p)=>setMaterial(p.target.value)} />
            </div>             <div className="form-group">
               <label for="formGroupExampleInput">Gender</label>
              <input type="text" className="form-control" id="formGroupExampleInput" value={Gender} onChange={(p)=>setGender(p.target.value)} />
            </div>             <div className="form-group">
               <label for="formGroupExampleInput">Price</label>
              <input type="text" className="form-control" id="formGroupExampleInput" value={Price} onChange={(p)=>setPrice(p.target.value)} />
            </div>             <div className="form-group">
               <label for="formGroupExampleInput">Quantity</label>
              <input type="text" className="form-control" id="formGroupExampleInput" value={Quantity} onChange={(p)=>setQuantity(p.target.value)} />
            </div>
             <div className="form-group">
               <label for="formGroupExampleInput">Image</label>
              <input type="text" className="form-control" id="formGroupExampleInput"value={Image} onChange={(p)=>setImage(p.target.value)} />
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput2">CategoryId</label>
              <input type="text" className="form-control" id="formGroupExampleInput2" value={CategoryId} onChange={(p)=>setCategoryId(p.target.value)} />
            </div>
            </div>
            </form>
            <button type="button" className="btn btn-primary mb-3 btnup" onClick={()=>Updateproduct(state.uuid)} >Update-Product</button>
            </div></div>
        </>
    )
}


export default Updateproduct