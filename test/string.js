Validations.stringValidations.enable(function (name) {
    return '.' + name;
});

Tinytest.add('isEmail', function (test) {
    var v = Validations.new('.isEmail');

    test.equal(v.test('qq@qq.com'), true);
    test.equal(v.test('qq'), false);

    test.equal(v.validate('qq@qq.com', options), {
        result: true,
        name: '.isEmail'
    });

    test.equal(v.validate('qq', options), {
        result: false,
        name: '.isEmail'
    });
});

Tinytest.add('contains', function (test) {
    var v = Validations.new('.contains', ['bob']);

    test.equal(v.test('hello bob'), true);
    test.equal(v.test('hello world'), false);

    test.equal(v.validate('hello bob', options), {
        result: true,
        name: '.contains',
        params: ['bob']
    });

    test.equal(v.validate('1', options), {
        result: false,
        name: '.contains',
        params: ['bob']
    });
});

Tinytest.add('isIn', function (test) {
    var v = Validations.new('.isIn', [['1', '2']]);

    test.equal(v.test('1'), true);
    test.equal(v.test('3'), false);

    test.equal(v.validate('1', options), {
        result: true,
        name: '.isIn',
        params: [['1', '2']]
    });

    test.equal(v.validate('3', options), {
        result: false,
        name: '.isIn',
        params: [['1','2']]
    });
});