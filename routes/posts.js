const express = require("express");
const router = express.Router();
const uploadFile = require('../middle/UploadFile')
const postController = require('../component/post/postController');
const like = require('../component/like/likeController')

// /post/c/like
router.post('/c/like', async (req, res) => {
    try {
        const { userid, postid } = req.body
        const a = await like.clike(userid, postid)
        if (a) return res.status(200).json({ result: 'like oke' })
    } catch (error) {
        console.log(error);
        return res.status(200).json({ result: 'like fail' })
    }
})

// /post/r
router.get('/r', async (req, res, next) => {
    try {
        const posts = await postController.getAllposts();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(400).json({ mess: 'Lỗi hệ thống' });
    }
});

// /post/r/:id/
router.get('/r/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const posts = await postController.getpostById(id);
        res.status(200).json(posts);
    } catch (error) {
        next(error);
        res.status(400).json({});
    }
});

// /post/f/:name/
router.get('/f/:name', async (req, res, next) => {
    try {
        const { name } = req.params;
        const posts = await postController.getpostByname(name);
        res.status(200).json(posts);
    } catch (error) {
        next(error);
        res.status(400).json({});
    }
});

// /post/c
router.post('/c', uploadFile.single('image'), async (req, res, next) => {
    try {
        let { body, file } = req;
        if (file) {
            let image = `http://192.168.1.2:3000/images/${file.filename}`;
            body = { ...body, image: image }
        }
        const { content, createAt, user, image } = req.body;
        await postController.addNewpost(content, createAt, user, image);
        res.status(200).json({ result: true });
    } catch (error) {
        res.status(400).json({ result: false });
    }
})

// /post/u/:id/
router.post('/u/:id', uploadFile.single('image'), async (req, res, next) => {
    try {
        let { id } = req.params;
        let { body, file } = req;
        if (file) {
            let image = `http://192.168.241.52:3000/images/${file.filename}`;
            body = { ...body, image: image }
        }
        let { content, createAt, user, image } = body;
        console.log('Edit param:', image);
        await postController.updatepost(id, content, createAt, user, image);
        res.status(200).json({ result: true });
    } catch (e) {
        console.log(e);
        res.status(400).json({ result: false });
    }
});


// /post/d/:id/
router.post('/d/:id/', async (req, res, next) => {
    try {
        const { id } = req.params;
        await postController.deletepostById(id);
        return res.json({ status: true });
    } catch (error) {
        return res.json({ status: false, error });
    }
});

router.post('/editanh/:id', uploadFile.single('image'), async (req, res) => {
    try {
        let { id } = req.params;
        let { body, file } = req;
        //console.log(id, file.name);
        if (file) {
            let image = `http://192.168.1.2:3000/images/${file.filename}`;
            body = { ...body, image: image }
        }
        let { image } = body;
        console.log(image);
        const postimage = await postController.updateimagepost(id, image)
        res.status(200).json({ result: true, postimage })
    } catch (error) {
        console.log(error);
        res.status(400).json({ result: false });
    }

})


router.post('/likecount', async (req, res) => {
    try {
        const { id } = req.body
        await postController.likecounta(id)
        return res.status(200).json({ result: true })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false })
    }
})

router.post('/c/comment', async (req, res) => {
    try {
        const { user, post, content } = req.body
        await postController.comment(user, post, content)
        return res.status(200).json({ result: true })
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false })
    }
})


router.get('/r/comment/:postid', async (req, res) => {
    try {
        let { postid } = req.params;
        const comment = await postController.getcommentbyid(postid)
        return res.status(200).json(comment)
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false })
    }
})


// /post/user/profile
router.post('/user/profile', uploadFile.single('image'), async (req, res, next) => {
    try {
        let { body, file } = req;
        if (file) {
            let avatar = `http://192.168.1.2:3000/images/${file.filename}`;
            body = { ...body, avatar: avatar }
        }
        const { username, email, name, dob, gender, avatar } = req.body;
        await postController.updateuser(username, email, name, dob, gender, avatar);
        res.status(200).json({ result: true });
    } catch (error) {
        res.status(400).json({ result: false });
    }
})






module.exports = router;
