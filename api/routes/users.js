const User = require("..//models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update User
router.put("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id,
               { $set: req.body,}
        );
        res.status(200).json("Account has been updated")
        }catch(err){
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json.apply("you can update only your account")
    }
})
//delete User 
router.delete("/:id", async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
        }catch(err){
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("you can delete only your account")
    }
})
//get User
router.get("/", async (req,res)=>{
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId 
        ? await User.findById(userId)
        : await User.findOne({username: username});
        const{password,updatedAt, ...other} = user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(err)
    }
});

//follow User
router.put("/:id/follow", async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers: req.body.userId}})
                await currentUser.updateOne({$push:{followings: req.params.id}})
                res.status(200).json("user has been followed");
          }else{
                res.status(403).json("you already follow this user")
        }
        } catch (error) {
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("y???u can't follow your self")   
    }
})
//Unfollow User
router.put("/:id/unfollow", async(req,res)=>{
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers: req.body.userId}})
                await currentUser.updateOne({$pull:{followings: req.params.id}})
                res.status(200).json("unfollowed");
          }else{
                res.status(403).json("you don't follow this user")
        }
        } catch (error) {
            res.status(500).json(err)
        }
    }else{
        res.status(403).json("you can't unfollow your self")   
    }
})

module.exports = router