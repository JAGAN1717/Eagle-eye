import React, {Component,useState,useEffect} from "react";
import axios from "axios";
import 'braintree-web';
import DropIn from "braintree-web-drop-in-react";
import { Navigate, NavLink, useLocation, useNavigate,Link} from "react-router-dom";
import swal from 'sweetalert';


const Payment=()=> {
    const { state } = useLocation();
    const navigate = useNavigate();
    console.log("state",state.cartTotal)
    const [value,setvalue] = useState({
        clienttoken:null,
        success:'',
        error:'',
        instance:""
    })

    const handleSubmit = async () => {
        let name  = localStorage.getItem('name')
        let mail  = {
          toMail : '',
          name  : name,
          text  : 'Order is Comformed You will get With in 5 days '
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
    
    
    const {clienttoken,instance}=value
    console.log("value",value)
   const getClientToken=()=>{
        try {
            axios.get("http://localhost:8080/pay/tokengenete"
            ).then(data=>{
                console.log("token")
                console.log('data',data)
                console.log("msg",data.data.message,)
                setvalue({clienttoken:data.data.message})
            }).catch(err=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error.message)
        }
    }

    const saleTransaction=(data)=>{
        try {
            instance.requestPaymentMethod().then(nounceData=>{
                console.log(nounceData);
                if(nounceData){
                    console.log("data")
                    let data= {
                        amount: state.cartTotal,
                        paymentMethodNonce: nounceData.nonce
                    }
                    console.log('1',data.amount)
                    console.log("2",data.paymentMethodNonce)
                    axios.post("http://localhost:8080/pay/saleTransaction",data
                    ).then(resultData=>{
                        console.log("data",resultData.data);
                        if(resultData.data){
                            navigate('/slip',{state:resultData.data})

                        }
                    }).catch((err)=>{
                        console.log(err.message)
                    })
                }
            })
        } catch (error) {
            console.log(error.message)
        }
        
    }
    useEffect(() => {
        getClientToken()
      }, []);
   return(
    <div className="container">
    <h1>PAYMENT DETAILS</h1>
    {clienttoken && (
    <div>
    <DropIn
        options={{ authorization: clienttoken }}
        onInstance={(instance) =>setvalue ({ ...value,instance : instance})}
    />
    <button className="pay-btn" onClick={()=>saleTransaction()}>PAY NOW</button>
    </div>
    )}
    {!clienttoken && <h1>Loading...</h1>}
</div>
   )
}


export default Payment;