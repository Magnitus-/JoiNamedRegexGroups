const Joi = require('joi').extend(require('../index'));

var matchValidator = Joi.object().unknown(true).keys({
    x: Joi.number().min(1).max(10).required(),
    y: Joi.number().min(1).max(10).required()
});

var namedGroups = ['x', 'y'];

var validator = Joi.string().xregexp('^(?<x>\\d+),(?<y>\\d+)$', namedGroups, matchValidator).required();

var test = "10,10";
var test2 = "20,30";

console.log(Joi.validate(test, validator));
console.log(Joi.validate(test2, validator));