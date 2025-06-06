import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    img:{
        type:String,
        require:true,
    },
    title:{
        type:String,
        require:true,
    },
    detail:{
        type:String,
        require:true,
    },
})

const Blog = new mongoose.model("Blog",blogSchema)
export default Blog;