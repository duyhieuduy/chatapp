const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../component/User/UserController')
const uploadFile = require('../middle/UploadFile')


// Đường dẫn trang đăng nhập /login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Kiểm tra xem tên người dùng và mật khẩu có hợp lệ không
    if (!username || !password) {
      return res.status(400).json({
        message: 'Tên người dùng và mật khẩu không được để trống',
      });
    }

    // Lấy thông tin tài khoản người dùng từ cơ sở dữ liệu
    const user = await userController.login(username, password);
    if (!user) {
      return res.status(400).json({ message: 'Tài khoản không tồn tại' });
    }
    return res.status(200).json({ user })
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: 'Lỗi máy chủ' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password, name } = req.body;
    const user = userController.register(username, password, name)
    if (!user) return res.status(400).send({ message: 'username đã tồn tại' })
    return res.status(200).send({ message: "Tạo thành công" })

  } catch (error) {
    console.log(error)
    return res.status(500).send({ message: 'Lỗi máy chủ' })
  }

})

router.post('/changepass', async (req, res) => {
  try {
    const { id, password } = req.body;
    const user = await userController.updatepassword(id, password);
    if (user)
      return res.status(200).send({ message: "Đổi pass thành công" });

  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Đổi pass Thất bại" });
  }
})

router.get('/rbyiid/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rbyiid = await userController.getuserbyid(id);
    return res.status(200).json(rbyiid)
  } catch (error) {
    console.log(error);
  }
})


// /user/profile
router.post('/profile', uploadFile.single('image'), async (req, res, next) => {
  try {
    let { id } = req.params;
    let { body, file } = req;
    if (file) {
      let image = `http://192.168.1.2:3000/images/${file.filename}`;
      body = { ...body, avatar: image }
    }
    const { username, password, email, name, dob, gender, avatar } = body;
    await userController.updateuser(id, username, password, email, name, dob, gender, avatar);
    res.status(200).json({ result: true });
  } catch (error) {
    res.status(400).json({ result: false });
  }
})


module.exports = router;