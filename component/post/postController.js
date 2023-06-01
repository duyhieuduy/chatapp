const postmodel = require('./postmodel');
const User = require('../User/Usermodel');
const likemodel = require('../like/likemodel');
const commentmodel = require('../comment/commentmodel');
const Usermodel = require('../User/Usermodel');
//page: số trang hiện tại
//limit: số sản phẩm trên 1 trang
const getAllposts = async (page, limit) => {
    try {
        // Tìm số lượng like của mỗi bài post
        // const likeCounts = await likemodel.aggregate([
        //     { $group: { _id: "$postId", count: { $sum: 1 } } },
        //     { $lookup: { from: "posts", localField: "_id", foreignField: "_id", as: "post" } },
        //     { $unwind: "$post" },
        //     { $project: { title: "$post.title", count: 1 } },
        // ]);
        // const commentmodela = await commentmodel
        const p = await postmodel.find().populate('user', 'name');
        // p.likeCounts = likeCounts;
        return p
    } catch (error) {
        throw error;
    }
}

const comment = async (user, post, content) => {
    try {
        const newcomment = {
            user, post, content
        }
        const comment = new commentmodel(newcomment);
        await comment.save();
        return true;
    } catch (error) {

    }
}

const getcommentbyid = async (postid) => {
    try {
        //const comment = commentmodel.find({ postid: postid }).populate('user', 'name')
        const comment = commentmodel.find({ postid: postid }).populate('user');
        console.log(comment);
        return comment;

    } catch (error) {
        throw error;

    }
}


const deletepostById = async (id) => {

    try {
        await postmodel.findByIdAndDelete(id)
        return true;
    }
    catch (error) {
        console.log("Delete post bt ID error", error);
        return false;
    }
}

const addNewpost = async (content, createAt, user, image, hastag) => {
    try {

        const newpost = {
            content, createAt, user, image, hastag
        }
        const post = new postmodel(newpost);
        await post.save();
        return true;
    } catch (error) {
        console.log('Add new post error: ', error);
        return false;
    }

}

const updatepost = async (id, content, createAt, hastag) => {
    try {
        const post = await postmodel.findOne(id);
        if (post) {
            post.content = content ? content : post.content;
            post.createAt = createAt ? createAt : post.createAt;
            post.image = image ? image : post.image;
            post.hastag = hastag ? hastag : post.hastag;
            // console.log('image chosen: ', post.image);
            await post.save();
            return true;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}
//update moi anh
const updateimagepost = async (id, image) => {
    try {
        const post = await postmodel.findOne(id);
        if (post) {
            post.image = image ? image : post.image;
            await post.save();
            return post.image;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}


const getpostById = async (id) => {
    try {
        return await postmodel.findOne(id);
    } catch (error) {
        console.log(error);
        return null;
    }
}


const getpostByname = async (name) => {
    try {
        // Tìm người đăng bằng tên
        const author = await User.findOne({ name: name });

        // Nếu không tìm thấy, trả về mã lỗi 404 Not Found
        if (!author) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Tìm các bài viết liên quan và trả về thông tin
        return await postmodel.find({ author: author._id }).populate('user');

    } catch (error) {
        console.log(error);
        return null;
    }
}


const likecounta = async (id) => {
    try {
        const post = await postmodel.findOne(id);
        if (post)
            post.likecount = post.likecount + 1;
        await post.save();
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}



module.exports = {
    getAllposts, deletepostById, addNewpost, updatepost,
    getpostById, updateimagepost,
    getpostByname, likecounta, comment, getcommentbyid
};
