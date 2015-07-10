# Validations
**the foundation for meteor variable validation**

## Installation
`meteor add zhaoyao91:validations`

## Introduction
This package defines the **validation class**, a **simple schema**, some functions that help **build validation tree** from a schema, and a set of **built-in validations**.

## Validation Class
Here is a template to write a new validation class:

    /**
     * the params and sub validations should be decided during construction,
     * and generally, should not be modified latter.
     * @param {array} params - a validation can have params if it needs
     * @param {array} validations - a validation can have sub validations if it needs
     */
    validationClass = function(params, validations) {
        this.params = params;
        this.validations = validations;
    };
    
    validationClass.prototype = {
        name: 'validation name',
    
        /**
         * test if the target satisfies something
         * @param target - anything to be tested
         * @return {boolean} - test result
         */
        test: function(target){
    
        },
    
        /**
         * validate the target and generate a report
         * @param target - anything to be validated
         * @param actions
         * @param actions.quickReturn - if true, it should return once it can decide the result,
         * else, it should check all branches
         * @param actions.reportPass - if true, it should add the reports of all sub validations 
         * that contribute to the *true* result of this validation to its report.reports
         * @param actions.reportFail - if true, it should add the reports of all sub validations 
         * that contribute to the *false* result of this validation to its report.reports*
         * @return {object} - report
         * {
         *      result: boolean,
         *      name: validation name,
         *      [params]: params if it have params,
         *      [reports]: reports of sub validations if it have sub validations,
         *      [index]: if it is for some field of the target,
         *      then add the field name here, no in params
         * }
         */
        validate: function(target, actions){
    
        }
    };
    
Once a validation class is defined, you can just new one and use it to validate your variable.

to integrate it into **validations**:  
 - **Validations.add(validationClass)**

or: 
 - **Validations.addByPrototype(prototype)**
 - **Validations.addByTestfunc(validationName, testFunc(target) => boolean)**

to remove a validation class:
 - **Validations.remove(validationName)**

to get a validation class:
 - **Validations.get(validationName) => validationClass**

to new a validation by name:
 - **Validations.new(validationName, [params], [subValidations]) => validation**
 
to get all available validation names in **validations**:
 - **Validations.getList() => validationNames**

## Simple Schema
A simple schema is a plain js object (or string, see below) that is used to build a validation hierarchically.

    {
        name: 'validation name',
        [params]: ['params if it needs'], // array
        [schemas]: ['sub schemas if it needs sub validations'] // array
    }

You can parse a simple schema into a validation:
 - **Validations.parse(schema) => validation**

To solve the cycle-reference problem, you can define **a batch of schemas**, which is an object with the key to be the name of the schema, and the value to be the simple schema. In this way, a simple schema can be a string, which means a reference to the schema defined in the schemas. For example:

    // define a batch of schemas
    var schemas = {
        // here 'people' is the name of the schema
        people: {
            // 'each' is a validation which needs params and sub validations
            name: 'each', 
            params: ['name', 'friend'],
            schemas:[
                {name: 'isString}, // 'isString' is a validation needs nothing
                'people' // 'people' refer to the schema defined in the schemas
            ]
        }
    }

You can parse the batch of schemas into a batch of validations:
 - **Validations.batchParse(schemas) => validations**
 
**Note**: Although you can define validations with cycle-reference, you can't test or validate object with cycle-reference. It will lead to a dead lock. I will appreciate any help from you.

## Built-in Validations
There are some built-in validations (validation classes). 

### core validations
 - **and( (need params?)no, (need sub validations?)yes )** - return true if all sub validations return true, else return false.
 - **or(no, yes)** - return false if all sub validations return false, else return true.
 - **not(no, only one)** - return true if sub validation return false, else return true.
 - **each(maybe, yes)** - if no params, it takes only one sub validation, and return true if all fields of the target pass the validation, else return false. if there are params, then it takes as many sub validations as the params, and if all (param->field->validation)s pass, it return true, else return false.
 - **some(maybe, yes)** - if no params, it takes only one sub validation, and return false if all fields of the target fail the validation, else return true. if there are params, then it takes as many sub validations as the params, and if all (param->field->validation)s fail, it return false, else return true.
 - **optional(no, maybe one)** - if the target is null, undefined or there is no sub validation, then return true, else return the result of the sub validation.
 
### basic validations
 - **where(only one, no)** - the param is a test function receives only the target and returns a boolean. the validation will return as the test function.
 - **exist(no, no)**- if the target is null or undefined, return false, else return true.
 - **type(only one, no)** - if typeof the target equals the param, return true, else return false.
 - **class(only one, no)** - return target instanceof param
 
### compare validations
Each of these validations takes only one param and no sub validations.
 - **==**
 - **===**
 - **!=**
 - **!==**
 - **>**
 - **<**
 - **>=**
 - **<=**
 - **eq** - ==
 - **neq** - !=
 - **gt** - >
 - **lt** - <
 - **ge** - >=
 - **le** - <=
 - **min** - >=
 - **max** - <=
 - **in** - the param is an array of values, if the target == any of the values, return true, else return false.
 - **notIn** - the param is an array of values, if the target == any of the values, return false, else return true.
 
### type validations
Each of the validations takes no params and no sub validations.
 - **isUndefined**
 - **isNull**
 - **isNaN**
 - **isBoolean**
 - **isNumber**
 - **isString**
 - **isFunction**
 - **isDate**
 - **isArray**
 - **isObject**
 
### string validations
Thanks for [validator.js](https://github.com/chriso/validator.js#validators), you can easily validate strings. To enable these adapted validations, just `Validations.stringValidations.enable(nameFunc(string)=>string)`, where nameFunc will translate the name of the validator function to the name of the correcponding validation. To disable them, just `Validations.stringValidations.disable()`.

**Note**: These validations take params as the corresponding validator function, and do not need sub validations.


## Tests
In the project with this package, run `meteor test-packages zhaoyao91:validations`.

## License (MIT)

    Copyright (c) <2015> <zhaoyao91@163.com>
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.