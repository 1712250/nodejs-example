const Joi = require("@hapi/joi");


module.exports.registerValidator = async (userInfo) => {
    const registerSchema = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(255).required(),
        repeat_password: Joi.ref("password"),
    });

    let err = await registerSchema.validate(userInfo).error;
    if (err) {
        return err.details[0].message;
    } else {
        return null;
    }
}

module.exports.loginValidator = async (userInfo) => {
    const loginSchema = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(255).required(),
    });

    let err = await loginSchema.validate(userInfo).error;
    if (err) {
        return err.details[0].message;
    } else {
        return null;
    }
}