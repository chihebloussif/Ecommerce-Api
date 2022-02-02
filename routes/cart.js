const Cart = require('../models/Cart');
const { verifyTokenAndAuthorization,verifyToken, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();


//Create Cart Router
router.post('/', verifyToken , async (req,res)=>{

    const newCart = new Cart(req.body);
  
    try {
         const savedCart = await newCart.save();
         res.status(200).json(savedCart);
       
    } catch(err) {
        res.status(500).json(err);
    }

});

// Update Cart
router.put('/:id', verifyTokenAndAuthorization , async (req,res)=>{
      
    const updatedCart = await Cart.findByIdAndUpdate(req.params.id, 
        {
            $set:req.body,
        },
        {
            new : true 
        }
        );
     res.status(200).json(updatedCart);
    try {

    } catch(err) {
        res.status(500).json(err);
    }

});

//DELETE Router
router.delete('/:id', verifyTokenAndAuthorization , async (req,res)=>{

    try {
            await Cart.findByIdAndDelete(req.params.id)
            res.status(200).json("Cart Has been Deleted ...")
       
    } catch(err) {
        res.status(500).json(err);
    }

});

//Get Cart Router
router.get('/find/:userId', verifyTokenAndAuthorization, async (req,res)=>{

    try {
         const cart =    await Cart.findOne({userId:req.params.userId});
            res.status(200).json(cart);
       
    } catch(err) {
        res.status(500).json(err);
    }

});


//Get all Carts Router
router.get('/', verifyTokenAndAdmin , async (req,res)=>{


    try {
  
    
    
         const carts = await Cart.find();
        
        res.status(200).json(carts);
       
    } catch(err) {
        res.status(500).json(err);
    }

});




module.exports = router ;