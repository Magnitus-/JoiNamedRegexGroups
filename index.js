var XRegExp = require('xregexp');
const Joi = require('joi');

module.exports = {
    base: Joi.string(),
    name: 'string',
    language: {
        xregexp: 'Needs to be parsable by regex {{exp}}'
    },
    rules: [
        {
            name: 'xregexp',
            params: {
                exp: Joi.string().min(1).max(100).required(),
                namedGroups: Joi.array().items(Joi.string()).min(1).required(),
                test: Joi.object()/*.keys({'isJoi': Joi.boolean().valid(true).required()})*/.required(),
                name: Joi.string().min(1).max(100)
            },
            validate: function(params, value, state, options) {
                var match = XRegExp.exec(value, XRegExp(params.exp));
                if(match)
                {
                    var filteredMatch = {};
                    params.namedGroups.forEach(function(key) {
                        filteredMatch[key] = match[key];
                    });
                    var result = Joi.validate(filteredMatch, params.test);

                    if(result.error)
                    {
                        return this.createError('string.xregexp', { v: value, exp: params.exp  }, state, options);//result.error;
                    }
                    else
                    {
                        return result.value;
                    }
                }
                else
                {
                    return this.createError('string.xregexp', { v: value, exp: params.exp }, state, options);
                }
            }
        }
    ]
};

