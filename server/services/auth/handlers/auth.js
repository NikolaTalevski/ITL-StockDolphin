const {
    UserSignUp,
    UserLogin,
    validate,
    UserPasswordReset
} = require('../../../pkg/users/validate');

const user = require('../../../pkg/users/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../../pkg/config');

const register = async(req, res) => {
    try {
        await validate(req.body, UserSignUp);
        const exists = await user.getByEmailUser(req.body.email);
        if(exists) {
            throw {
                code: 400,
                error: 'User with this email already exists'
            };
        }
        req.body.password = bcrypt.hashSync(req.body.password);
        let u = await user.createUser(req.body);
        return res.status(201).send(u);
    } catch(err) {
        console.log(err);
        return res.status(err.code).send(err.error);
    }
};

const login = async(req, res) => {
    try {
        await validate(req.body, UserLogin);
        let u = await user.getByEmailUser(req.body.email);
        if(!u) {
            throw {
                code: 400,
                error: 'User not found'
            };
        }
        if(!bcrypt.compareSync(req.body.password, u.password)) {
            throw {
                code: 400,
                error: 'Incorrect password'
            };
        }
        let payload = {
            username: u.username,
            email: u.email,
            id: u._id,
            exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60
        };
        const token = jwt.sign(payload, config.getSection("security").jwt)
        return res.status(200).send({token});
    } catch (err) {
        console.log(err);
        return res.status(err.code).send(err.error);
    }
};

const refreshToken = async(req, res) => {
    const payload = {
        ...req.auth,
        exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60
    };
    const token = jwt.sign(payload, config.getSection("security").jwt);
    return res.status(200).send(token);
};

const resetPassword = async(req, res) => {
    await validate(req.body, UserPasswordReset);
    const {email, old_password, new_password} = req.body;

    const u = await user.getByEmailUser(email);

    if(!bcrypt.compareSync(old_password, u.password)) {
        return res.status(400).send("Incorrect password");
    }

    const newPasswordHashed = bcrypt.hashSync(new_password);

    if(old_password === new_password) {
        return res.status(400).send("New password can't be the old password");
    }

    const passwordChanged = await user.setNewPassword(
        u._id.toString(),
        newPasswordHashed
    );

    return res.status(200).send(passwordChanged);
};



module.exports = {
    register,
    login,
    refreshToken,
    resetPassword
}