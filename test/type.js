Tinytest.add('isUndefined', function (test) {
    var v = Validations.new('isUndefined');

    test.equal(v.test(), true);
    test.equal(v.test(6), false);

    test.equal(v.validate(undefined, options), {
        result: true,
        name: 'isUndefined'
    });
    test.equal(v.validate(6, options), {
        result: false,
        name: 'isUndefined'
    });
});

Tinytest.add('isNull', function (test) {
    var v = Validations.new('isNull');

    test.equal(v.test(null), true);
    test.equal(v.test(6), false);

    test.equal(v.validate(null, options), {
        result: true,
        name: 'isNull'
    });
    test.equal(v.validate(undefined, options), {
        result: false,
        name: 'isNull'
    });
});

Tinytest.add('isNaN', function (test) {
    var v = Validations.new('isNaN');

    test.equal(v.test(NaN), true);
    test.equal(v.test(6), false);

    test.equal(v.validate(NaN, options), {
        result: true,
        name: 'isNaN'
    });
    test.equal(v.validate(null, options), {
        result: false,
        name: 'isNaN'
    });
});

Tinytest.add('isBoolean', function (test) {
    var v = Validations.new('isBoolean');

    test.equal(v.test(true), true);
    test.equal(v.test(6), false);

    test.equal(v.validate(false, options), {
        result: true,
        name: 'isBoolean'
    });
    test.equal(v.validate(undefined, options), {
        result: false,
        name: 'isBoolean'
    });
});

Tinytest.add('isNumber', function (test) {
    var v = Validations.new('isNumber');

    test.equal(v.test(1), true);
    test.equal(v.test('1'), false);

    test.equal(v.validate(1, options), {
        result: true,
        name: 'isNumber'
    });
    test.equal(v.validate('1', options), {
        result: false,
        name: 'isNumber'
    });
});

Tinytest.add('isString', function (test) {
    var v = Validations.new('isString');

    test.equal(v.test('1'), true);
    test.equal(v.test(9), false);

    test.equal(v.validate('1', options), {
        result: true,
        name: 'isString'
    });
    test.equal(v.validate(9, options), {
        result: false,
        name: 'isString'
    });
});

Tinytest.add('isFunction', function (test) {
    var v = Validations.new('isFunction');
    var f = function(){};

    test.equal(v.test(f), true);
    test.equal(v.test(9), false);

    test.equal(v.validate(f, options), {
        result: true,
        name: 'isFunction'
    });
    test.equal(v.validate(9, options), {
        result: false,
        name: 'isFunction'
    });
});

Tinytest.add('isDate', function (test) {
    var v = Validations.new('isDate');

    test.equal(v.test(new Date), true);
    test.equal(v.test(9), false);

    test.equal(v.validate(new Date, options), {
        result: true,
        name: 'isDate'
    });
    test.equal(v.validate(9, options), {
        result: false,
        name: 'isDate'
    });
});

Tinytest.add('isArray', function (test) {
    var v = Validations.new('isArray');

    test.equal(v.test([]), true);
    test.equal(v.test({}), false);

    test.equal(v.validate([], options), {
        result: true,
        name: 'isArray'
    });
    test.equal(v.validate({}, options), {
        result: false,
        name: 'isArray'
    });
});

Tinytest.add('isObject', function (test) {
    var v = Validations.new('isObject');

    test.equal(v.test({}), true);
    test.equal(v.test(1), false);

    test.equal(v.validate({}, options), {
        result: true,
        name: 'isObject'
    });
    test.equal(v.validate(1, options), {
        result: false,
        name: 'isObject'
    });
});