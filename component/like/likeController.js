const likemodel = require('../like/likemodel');

const clike = async (userid, postid) => {
    try {
        const newlike = { userid, postid }
        const like = new likemodel(newlike)
        await like.save();
        return true
    } catch (error) {
        console.log(error);
        return false
    }

}


module.exports = { clike };