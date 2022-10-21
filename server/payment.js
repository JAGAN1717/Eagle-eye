const router = require('express').Router();
const braintree = require('braintree');
require('dotenv').config();

const config = {
    environment : braintree.Environment.Sandbox,
    merchantId: 'mfkfhxyjgwvgsmg8',
    publicKey: 'qpsscwdpd5kmz8d2',
    privateKey: 'befdc5c3b10b32cb713af1398e5496e7'
}

const gateway = new braintree.BraintreeGateway(config);

router.get("/tokengenete",async(req,res)=>{
    try {
        gateway.clientToken.generate({},(err,token)=>{
            if(err){
                res.send({res:err})
            }else{
                res.json({'status':'success',message:token.clientToken})
                console.log('sucess',token.clientToken)
            }
        })

    } catch (err) {
        res.json({'status':'failed',message:err.message})        
    }
});

router.post('/saleTransaction',async(req,res)=>{
    try {
        const payment = gateway.transaction.sale({
            amount : req.body.amount,
            paymentMethodNonce : req.body.paymentMethodNonce,
            options : {
                submitForSettlement : true
            }
        },(err,data)=>{
            if(err){
                console.log('err',err.message)

            }else{
                console.log('data',data);
            }
            if(data.success){
                res.json({'status':'success',message: data.transaction})
            }else{
                res.json({'err':err})
            }
        })
    } catch (err) {
        console.log('err',err.message);
        res.json({'err':err.message});
    }
})



module.exports = router
