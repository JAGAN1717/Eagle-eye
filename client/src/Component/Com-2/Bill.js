import React from "react";
import './paymentSlip.css'
import { Navigate, NavLink, useLocation, useNavigate,Link} from "react-router-dom";


function Slip (){
const {state} = useLocation();
 console.log("slip",state)
 const navigate = useNavigate();

  return(
    <>
    <center>
    <div className="slip">
     <div className="pay-bill">
      <div className="user-name">
      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
        <h3>{localStorage.getItem('name')}</h3>
      </div>
    <div className="pay-recipt">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbssZFxeG30s0ODG0P_1KqDhfrgyzrvSLxHaCmvksvn26RQmKhQVv6NsL-qfR3qR-TkM8&usqp=CAU"/>
      <h2>Payment Successfull!</h2>
      </div>
      <hr></hr>
      <div className="li">
        <div className="li1">
          <b><p>Payment ID</p></b>
          <b><p>Amount</p></b>
          <b><p>Paid to</p></b>
          <b><p>Paid on</p></b>
        </div>
        <div className="li2">
          <p>321{state.message.paymentReceipt.id}123</p>
          <p>₹{state.message.amount}</p>
          <p>Lenskart</p>
          <p>{state.message.updatedAt}</p>
        </div>
      </div>
      <hr></hr>
     <span>We've sent the recipt to your mail </span>
     <h2>Thank You</h2>
     </div>
     <button onClick={()=>navigate('/home')}> continue Shopping</button>
    </div>
    </center>
    </>
  )
}

export default Slip;
