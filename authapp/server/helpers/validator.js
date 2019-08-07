const Joi = require('joi');
module.exports = {
    validateBody : (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if(result.error){
                return res.status(400).json(result.error.details);
            } 
            if(!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },
    schema : {
        authSchemaSignIn : Joi.object().keys({
            email  : Joi.string().email().required(),
            password : Joi.string().required(),
        })
    }
};