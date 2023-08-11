const joi = require('joi');

const userSchema = joi.object({
    firstName: joi.string()
        .min(3)
        .max(30)
        .required(),
    
    lastName: joi.string()
        .min(3)
        .max(30)
        .required(),
    
    email: joi.string()
        .email({ minDomainSegments: 2, tlds: true })
        .required(),
    
    password: joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
});

module.exports = userSchema;