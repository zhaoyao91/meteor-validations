Validations = {
    validationClasses: {},

    add: function (validationClass) {
        this.validationClasses[validationClass.prototype.name] = validationClass;
    },

    addByPrototype: function (prototype) {
        var validationClass = buildValidationClass(prototype);
        this.add(validationClass);
    },

    addByTestFunc: function (name, testFunc) {
        var validationClass = buildLeafValidationClass(name, testFunc);
        this.add(validationClass);
    },

    remove: function (name) {
        delete this.validationClasses[name];
    },

    get: function (name) {
        return this.validationClasses[name];
    },

    getList: function () {
        return Object.keys(this.validationClasses);
    },

    new: function (name, params, validations) {
        var validationClass = this.get(name);
        if (!validationClass) throw new Error('no such validation class: ' + name);
        return new validationClass(params, validations);
    },

    /**
     * parse a simple schema object into a validation
     *
     * @param schema
     * @param schema.name - validation name
     * @param [schema.params] - params for the validation
     * @param [schema.schemas] - schemas for the sub validations
     *
     * @return {object} - validation
     */
    parse: function (schema) {
        if (!schema || typeof schema !== 'object') throw new Error('fail to parse validation schema: schema must be an object');

        var validationClass = this.get(schema.name);
        if (!validationClass) throw new Error('fail to parse validation schema: unknown validation name: ' + schema.name);

        if (schema.schemas) {
            var subValidations = [];
            for (var i in schema.schemas) {
                var subValidation = this.parse(schema.schemas[i]);
                subValidations.push(subValidation);
            }
        }

        return new validationClass(schema.params, subValidations);
    },

    /**
     * parse a batch of schemas, they can refer to each other or self
     *
     * @param schemas - a schema can be a simple schema object or a string. if string, it means reference to the schema of this name
     */
    batchParse: function (schemas) {
        var that = this;
        var validations = {};
        if (!schemas || typeof schemas !== 'object') throw new Error('fail to parse validation schemas: schemas must be an object');

        var i;

        // build validations
        for (i in schemas) {
            validations[i] = parseSchema(schemas[i]);
        }

        // build references
        for (i in validations) {
            buildReferences(validations[i], validations);
        }

        return validations;

        function parseSchema(schema) {
            if (!schema || typeof schema !== 'object') throw new Error('fail to parse validation schema: schema must be an object');

            var validationClass = that.get(schema.name);
            if (!validationClass) throw new Error('fail to parse validation schema: unknown validation name: ' + schema.name);

            if (schema.schemas) {
                var subValidations = [];
                for (var i in schema.schemas) {
                    if (typeof schema.schemas[i] === 'string') subValidations.push(schema.schemas[i]);
                    else {
                        var subValidation = parseSchema(schema.schemas[i]);
                        subValidations.push(subValidation);
                    }
                }
            }

            return new validationClass(schema.params, subValidations);
        }

        function buildReferences(validation, validations) {
            for (var i in validation.validations) {
                var subValidation = validation.validations[i];
                if (typeof subValidation === 'string') {
                    var reference = subValidation;
                    subValidation = validations[reference];
                    if (!subValidation) throw new Error('fail to build validation reference: no such validation: ' + reference);
                    else validation.validations[i] = subValidation;
                }
                else buildReferences(subValidation, validations);
            }
        }
    },

    stringValidations: {
        enable: function (nameFunc) {
            StringValidations.enable(nameFunc);
        },
        disable: function () {
            StringValidations.disable();
        }
    }
};


var buildValidationClass = function (prototype) {
    var validationClass = function (params, validations) {
        this.params = params;
        this.validations = validations;
    };
    validationClass.prototype = prototype;
    return validationClass;
};

/**
 * @param name
 * @param testFunc(target, params...)
 */
var buildLeafValidationClass = function (name, testFunc) {
    return buildValidationClass({
        name: name,

        test: function (target) {
            return testFunc.bind(null, target).apply(null, this.params);
        },

        validate: function (target) {
            var result = testFunc.bind(null, target).apply(null, this.params);

            result = {
                result: result,
                name: this.name
            };
            if (this.params && this.params.length > 0) result.params = this.params;

            return result;
        }
    });
};