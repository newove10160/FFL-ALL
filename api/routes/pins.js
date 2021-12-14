const router = require("express").Router();
const Pin = require("../models/Pin");

//Create a pin
router.post("/", async (req,res)=>{
    const newPin = new Pin(req.body);
    try{
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    }catch(err){
        res.status(500).json(err);
    }
});

//get pin
router.get("/:id", async(req,res)=>{
    try {
        const pin = await Pin.findById(req.params.id);
        res.status(200).json(pin);
    } catch (error) {
        res.status(500).json(err);
    }
});

//delete post
router.delete("/:id", async(req,res)=>{
    try{
    const pin = await Pin.findById(req.params.id);
        await pin.deleteOne();
        res.status(200).json("pin deleted")
    }catch (err){
        res.status(500).json(err);
    }
});


module.exports = router;