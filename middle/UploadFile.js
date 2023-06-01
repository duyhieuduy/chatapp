const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        console.log(`Lưu trữ ảnh thành công!`);
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
});
console.log(`Xác định vị trí lưu trữ ảnh thành công!`);

module.exports = multer({ storage: storage });