import React, { useState } from "react";
import swal from 'sweetalert';
import axios from "axios";
import { Navigate, NavLink, useLocation, useNavigate,Link} from "react-router-dom";


const AddProduct = () =>{

    const[Brandname,setBrandname] = useState('')
    const[Producttype,setProducttype] = useState('')
    const[Framecolor,setFramecolor] = useState('')
    const[Frametype,setFrametype] = useState('')
    const[Frameshape,setFrameshape] = useState('')
    const[Framesize,setFramesize] = useState('')
    const[Material,setMaterial] = useState('')
    const[Gender,setGender] = useState('')
    const[Price,setPrice] = useState('')
    const[Quantity,setQuantity] = useState('')
    const[Image,setImage] = useState('')
    const[CategoryId,setCategoryId] = useState('')



    const Updateproduct = (uuid) =>{
        const data = {
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
        axios.post('http://192.168.29.139:8080/product/addProduct',data,{headers:{"token":localStorage.getItem("token")}}).then(result=>{
            console.log('data',result.data.status);
            if(result.data.status == 'success'){
                swal({
                    title: "SUCCESS!",
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
         <nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
      <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
        <ul className='navbar-nav mr-auto' >
          <li className='nav-item'><a class="nav-link"  onClick={()=>window.location.href='/dash'}>Dashboard</a></li>
          <li className='nav-item'><a class="nav-link"  onClick={()=>window.location.href='/dash'}>Dashboard</a></li>
          
        </ul>
        
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2 search1" type="text" placeholder="Search" aria-label="Search"/>
        </form>
        <button class="btn7 btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          <h5>{localStorage.getItem('name')}</h5>
      </div>
</nav>
        
         
<div className="back">
    <div className="up">
            <h3> Add_ProductDetails</h3>
            <form className="container form">
                <div className="right">
             <div className="form-group">
               <label for="formGroupExampleInput">Brandname</label>
              <input type="text" className="form-control" id="formGroupExampleInput"  onChange={(p)=>setBrandname(p.target.value)} />
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput2">Producttype</label>
              <input type="text" className="form-control" id="formGroupExampleInput2"  onChange={(p)=>setProducttype(p.target.value)}/>
            </div>
            <div className="form-group">
               <label for="formGroupExampleInput">Framecolor</label>
              <input type="text" className="form-control" id="formGroupExampleInput" onChange={(p)=>setFramecolor(p.target.value)} />
            </div>
            <div className="form-group">
               <label for="formGroupExampleInput">Frametype</label>
              <input type="text" className="form-control" id="formGroupExampleInput"  onChange={(p)=>setFrametype(p.target.value)}/>
            </div>
            <div className="form-group">
               <label for="formGroupExampleInput">Frameshape</label>
              <input type="text" className="form-control" id="formGroupExampleInput"  onChange={(p)=>setFrameshape(p.target.value)} />
            </div>
            <div className="form-group">
               <label for="formGroupExampleInput">Framesize</label>
              <input type="text" className="form-control" id="formGroupExampleInput"  onChange={(p)=>setFramesize(p.target.value)} />
            </div>
            </div>
            <div className="right">
            <div class="form-group">
               <label for="formGroupExampleInput">Material</label>
              <input type="text" className="form-control" id="formGroupExampleInput"  onChange={(p)=>setMaterial(p.target.value)} />
            </div>             <div className="form-group">
               <label for="formGroupExampleInput">Gender</label>
              <input type="text" className="form-control" id="formGroupExampleInput"  onChange={(p)=>setGender(p.target.value)} />
            </div>             <div className="form-group">
               <label for="formGroupExampleInput">Price</label>
              <input type="text" className="form-control" id="formGroupExampleInput"  onChange={(p)=>setPrice(p.target.value)} />
            </div>             <div className="form-group">
               <label for="formGroupExampleInput">Quantity</label>
              <input type="text" className="form-control" id="formGroupExampleInput"  onChange={(p)=>setQuantity(p.target.value)} />
            </div>
             <div className="form-group">
               <label for="formGroupExampleInput">Image</label>
              <input type="text" className="form-control" id="formGroupExampleInput"  onChange={(p)=>setImage(p.target.value)} />
            </div>
            <div className="form-group">
              <label for="formGroupExampleInput2">CategoryId</label>
              <input type="text" className="form-control" id="formGroupExampleInput2"  onChange={(p)=>setCategoryId(p.target.value)} />
            </div>
            </div>
            </form>
            <button type="button" className="btn btn-primary mb-3 btnup" onClick={''} >Add-Product</button>
            </div></div>
        </>
    )
}


export default AddProduct