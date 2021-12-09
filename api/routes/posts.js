const router = require("express").Router();
const Post = require("..//models/Post");
const User = require("../models/User");

//create a post
router.post("/", async (req, res)=>{
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(err);
    }
});

//Update Post
router.put("/:id", async(req, res)=>{
    try{ 
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){
        await post.updateOne({$set:req.body});
        res.status(200).json("post updated")
    }else{
        res.status(403).json("can update only you post");
    }
    } catch (err){
        res.status(500).json(err);
    }
});

//delete post
router.delete("/:id", async(req,res)=>{
    try{
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){
        await post.deleteOne();
        res.status(200).json("post deleted")
    }else{
        res.status(403).json("can delete only you post");
    }
    }catch (err){
        res.status(500).json(err);
    }
});

//like a post and dislike
router.put("/:id/like", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
    if(!post.likes.includes(req.body.userId)){
        await post.updateOne({$push:{likes: req.body.userId}});
        res.status(200).json("liked");
    }else{
        await post.updateOne({$pull:{likes: req.body.userId}});
        res.status(200).json("disliked");
    }
    } catch (error) {
        res.status(500).json(err);
    }
});

//get a post
router.get("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(err);
    }
});

//get timeline post
router.get("/timeline/:userId", async(req,res)=>{
    try {
        /*const currentUser = await User.findById(req.params.userId);*/
        const userPosts = await Post.find();
        /*const friendPosts = await Promise.all(
            currentUser.followings.map((friendId)=>{
                return Post.find({userId: friendId});
            })
        );*/
            res.status(200).json(userPosts);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get user's all post
router.get("/profile/:username", async(req,res)=>{
    try {
        const user = await User.findOne({username:req.params.username});
        const posts = await Post.find({userId: user._id});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = router;