// == === != !== > < >= <= eq neq gt lt ge le min max in notIn
Tinytest.add('==', function (test) {
    var v = Validations.new('==', [5]);

    test.equal(v.test(5), true);
    test.equal(v.test('5'), true);
    test.equal(v.test(6), false);

    test.equal(v.validate(5, options), {
        result: true,
        name: '==',
        params: [5]
    });
    test.equal(v.validate('5', options), {
        result: true,
        name: '==',
        params: [5]
    });
    test.equal(v.validate(6, options), {
        result: false,
        name: '==',
        params: [5]
    });
});

Tinytest.add('===', function (test) {
    var v = Validations.new('===', [5]);

    test.equal(v.test(5), true);
    test.equal(v.test('5'), false);
    test.equal(v.test(6), false);

    test.equal(v.validate(5, options), {
        result: true,
        name: '===',
        params: [5]
    });
    test.equal(v.validate('5', options), {
        result: false,
        name: '===',
        params: [5]
    });
    test.equal(v.validate(6, options), {
        result: false,
        name: '===',
        params: [5]
    });
});

Tinytest.add('!=', function (test) {
    var v = Validations.new('!=', [5]);

    test.equal(v.test(5), false);
    test.equal(v.test('5'), false);
    test.equal(v.test(6), true);

    test.equal(v.validate(5, options), {
        result: false,
        name: '!=',
        params: [5]
    });
    test.equal(v.validate('5', options), {
        result: false,
        name: '!=',
        params: [5]
    });
    test.equal(v.validate(6, options), {
        result: true,
        name: '!=',
        params: [5]
    });
});

Tinytest.add('!==', function (test) {
    var v = Validations.new('!==', [5]);

    test.equal(v.test(5), false);
    test.equal(v.test('5'), true);
    test.equal(v.test(6), true);

    test.equal(v.validate(5, options), {
        result: false,
        name: '!==',
        params: [5]
    });
    test.equal(v.validate('5', options), {
        result: true,
        name: '!==',
        params: [5]
    });
    test.equal(v.validate(6, options), {
        result: true,
        name: '!==',
        params: [5]
    });
});

Tinytest.add('>', function (test) {
    var v = Validations.new('>', [5]);

    test.equal(v.test(4), false);
    test.equal(v.test(5), false);
    test.equal(v.test(6), true);

    test.equal(v.validate(4, options), {
        result: false,
        name: '>',
        params: [5]
    });
    test.equal(v.validate(5, options), {
        result: false,
        name: '>',
        params: [5]
    });
    test.equal(v.validate(6, options), {
        result: true,
        name: '>',
        params: [5]
    });
});

Tinytest.add('<', function (test) {
    var v = Validations.new('<', [5]);

    test.equal(v.test(4), true);
    test.equal(v.test(5), false);
    test.equal(v.test(6), false);

    test.equal(v.validate(4, options), {
        result: true,
        name: '<',
        params: [5]
    });
    test.equal(v.validate(5, options), {
        result: false,
        name: '<',
        params: [5]
    });
    test.equal(v.validate(6, options), {
        result: false,
        name: '<',
        params: [5]
    });
});

Tinytest.add('>=', function (test) {
    var v = Validations.new('>=', [5]);

    test.equal(v.test(4), false);
    test.equal(v.test(5), true);
    test.equal(v.test(6), true);

    test.equal(v.validate(4, options), {
        result: false,
        name: '>=',
        params: [5]
    });
    test.equal(v.validate(5, options), {
        result: true,
        name: '>=',
        params: [5]
    });
    test.equal(v.validate(6, options), {
        result: true,
        name: '>=',
        params: [5]
    });
});

Tinytest.add('<=', function (test) {
    var v = Validations.new('<=', [5]);

    test.equal(v.test(4), true);
    test.equal(v.test(5), true);
    test.equal(v.test(6), false);

    test.equal(v.validate(4, options), {
        result: true,
        name: '<=',
        params: [5]
    });
    test.equal(v.validate(5, options), {
        result: true,
        name: '<=',
        params: [5]
    });
    test.equal(v.validate(6, options), {
        result: false,
        name: '<=',
        params: [5]
    });
});

Tinytest.add('eq', function (test) {
    var v = Validations.new('eq', [5]);

    test.equal(v.test(5), true);
    test.equal(v.test('5'), true);
    test.equal(v.test(6), false);

    test.equal(v.validate(5, options), {
        result: true,
        name: 'eq',
        params: [5]
    });
    test.equal(v.validate('5', options), {
        result: true,
        name: 'eq',
        params: [5]
    });
    test.equal(v.validate(6, options), {
        result: false,
        name: 'eq',
        params: [5]
    });
});

Tinytest.add('neq', function (test) {
    var v = Validations.new('neq', [5]);

    test.equal(v.test(5), false);
    test.equal(v.test('5'), false);
    test.equal(v.test(6), true);

    test.equal(v.validate(5, options), {
        result: false,
        name: 'neq',
        params: [5]
    });
    test.equal(v.validate('5', options), {
        result: false,
        name: 'neq',
        params: [5]
    });
    test.equal(v.validate(6, options), {
        result: true,
        name: 'neq',
        params: [5]
    });
});

Tinytest.add('gt', function (test) {
    var v = Validations.new('gt', [5]);

    test.equal(v.test(4), false);
    test.equal(v.test(5), false);
    test.equal(v.test(6), true);

    test.equal(v.validate(4, options), {
        result: false,
        name: 'gt',
        params: [5]
    });
    test.equal(v.validate(5, options), {
        result: false,
        name: 'gt',
        params: [5]
    });
    test.equal(v.validate(6, options), {
        result: true,
        name: 'gt',
        params: [5]
    });
});

Tinytest.add('lt', function (test) {
    var v = Validations.new('lt', [5]);

    test.equal(v.test(4), true);
    test.equal(v.test(5), false);
    test.equal(v.test(6), false);

    test.equal(v.validate(4, options), {
        result: true,
        name: 'lt',
        params: [5]
    });
    test.equal(v.validate(5, options), {
        result: false,
        name: 'lt',
        params: [5]
    });
    test.equal(v.validate(6, options), {
        result: false,
        name: 'lt',
        params: [5]
    });
});

Tinytest.add('ge', function (test) {
    var v = Validations.new('ge', [5]);

    test.equal(v.test(4), false);
    test.equal(v.test(5), true);
    test.equal(v.test(6), true);

    test.equal(v.validate(4, options), {
        result: false,
        name: 'ge',
        params: [5]
    });
    test.equal(v.validate(5, options), {
        result: true,
        name: 'ge',
        params: [5]
    });
    test.equal(v.validate(6, options), {
        result: true,
        name: 'ge',
        params: [5]
    });
});

Tinytest.add('le', function (test) {
    var v = Validations.new('le', [5]);

    test.equal(v.test(4), true);
    test.equal(v.test(5), true);
    test.equal(v.test(6), false);

    test.equal(v.validate(4, options), {
        result: true,
        name: 'le',
        params: [5]
    });
    test.equal(v.validate(5, options), {
        result: true,
        name: 'le',
        params: [5]
    });
    test.equal(v.validate(6, options), {
        result: false,
        name: 'le',
        params: [5]
    });
});

Tinytest.add('min', function (test) {
    var v = Validations.new('min', [5]);

    test.equal(v.test(4), false);
    test.equal(v.test(5), true);
    test.equal(v.test(6), true);

    test.equal(v.validate(4, options), {
        result: false,
        name: 'min',
        params: [5]
    });
    test.equal(v.validate(5, options), {
        result: true,
        name: 'min',
        params: [5]
    });
    test.equal(v.validate(6, options), {
        result: true,
        name: 'min',
        params: [5]
    });
});

Tinytest.add('max', function (test) {
    var v = Validations.new('max', [5]);

    test.equal(v.test(4), true);
    test.equal(v.test(5), true);
    test.equal(v.test(6), false);

    test.equal(v.validate(4, options), {
        result: true,
        name: 'max',
        params: [5]
    });
    test.equal(v.validate(5, options), {
        result: true,
        name: 'max',
        params: [5]
    });
    test.equal(v.validate(6, options), {
        result: false,
        name: 'max',
        params: [5]
    });
});

Tinytest.add('in', function (test) {
    var v = Validations.new('in', [[1, 2]]);

    test.equal(v.test(1), true);
    test.equal(v.test(6), false);

    test.equal(v.validate(2, options), {
        result: true,
        name: 'in',
        params: [[1,2]]
    });
    test.equal(v.validate(6, options), {
        result: false,
        name: 'in',
        params: [[1,2]]
    });
});

Tinytest.add('notIn', function (test) {
    var v = Validations.new('notIn', [[1, 2]]);

    test.equal(v.test(5), true);
    test.equal(v.test(1), false);

    test.equal(v.validate(5, options), {
        result: true,
        name: 'notIn',
        params: [[1,2]]
    });
    test.equal(v.validate(2, options), {
        result: false,
        name: 'notIn',
        params: [[1,2]]
    });
});