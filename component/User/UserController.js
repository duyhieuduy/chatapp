const Usermodel = require('./Usermodel');
const userModel = require('./Usermodel');
const bcrypt = require('bcryptjs');


const login = async (username, password) => {

    //gọi vào database để kiểm tra password

    try {
        const user = await userModel.findOne({ username: username });
        console.log('user at service:', user);
        if (user) {
            const result = bcrypt.compareSync(password, user.password)
            console.log('result at 12 userservice:', result)
            if (result) {
                return user
            }
        } else { return false }

    } catch (e) { console.log(e) }
    return false;

}
const register = async (username, password, name) => {
    try {
        //kiem tra username da ton tai chua
        //select 1 from user where #username = username
        const user = await userModel.findOne({ username: username });
        if (user) {
            return false
        }
        else {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = {
                username, password: hash, name
            }
            const newsaveUser = new userModel(newUser)
            await newsaveUser.save();
            return true;
        }
    }
    catch (err) {
        console.log(err);
    }
    return false;
}

const updatepassword = async (id, password) => {
    try {
        const u = await userModel.findById(id);
        if (u)
            u.password = password ? password : u.password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        u.password = hash

        u.save();
        return true
    } catch (error) {
        console.log(error);
        return false;
    }
}

const getuserbyid = async (id) => {
    try {
        const u = await Usermodel.findById(id)
        if (u)
            return u
        else {
            return false
        }
    } catch (error) {
        console.log(error);
    }
}

const updateuser = async (id, username, password, email, avatar, name, dob, gender) => {
    try {
        const user = await Usermodel.findOne(id)
        if (user) {
            user.username = username ? username : user.username;
            user.password = password ? password : user.password;
            user.email = email ? email : user.email;
            user.avatar = avatar ? avatar : user.avatar;
            user.name = name ? name : user.name;
            user.dob = dob ? dob : user.dob;
            user.gender = gender ? gender : user.gender;
        }
        await user.save();
        console.log(user);
        return true;
    } catch (error) {
        console.log(error)
    }
}

module.exports = { login, register, updatepassword, getuserbyid, updateuser };

