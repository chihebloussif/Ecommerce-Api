const router = require ("express").Router();
const Stripe_Key = 'sk_test_51JyeGvEtLAaFiKSj6F9LwufgOUdWFkQIez76qytbOD8dbDdGHW44QOjsR2ERz70TPavB5XgU5NxaCplVpLO5HLSy00pIGTPZIR';
const stripe = require("stripe")(Stripe_Key);



router.post('/payment', (req,res)=>{
    stripe.charges.create({
        source:req.body.tokenId,
        amount: req.body.amount,
        currency:"usd",
    }, (stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr);
        } else {
            res.status(200).json(stripeRes);
        }
    });
});

module.exports =  router ;