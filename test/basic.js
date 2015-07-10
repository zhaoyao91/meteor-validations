Tinytest.add('where', function (test) {
    var testFunc = function (target) {
        return target > 5
    };
    var v = Validations.new('where', [testFunc]);

    test.equal(v.test(5), false);
    test.equal(v.test(6), true);

    test.equal(v.validate(5, options), {
        result: false,
        name: 'where',
        params: [testFunc]
    });
    test.equal(v.validate(6, options), {
        result: true,
        name: 'where',
        params: [testFunc]
    });
});

Tinytest.add('exist', function (test) {
    var v = Validations.new('exist');

    test.equal(v.test(null), false);
    test.equal(v.test(), false);
    test.equal(v.test(6), true);

    test.equal(v.validate(null, options), {
        result: false,
        name: 'exist'
    });
    test.equal(v.validate(undefined, options), {
        result: false,
        name: 'exist'
    });
    test.equal(v.validate(6, options), {
        result: true,
        name: 'exist'
    });
});

Tinytest.add('type', function (test) {
    var v = Validations.new('type', ['number']);

    test.equal(v.test('1'), false);
    test.equal(v.test(6), true);

    test.equal(v.validate('1', options), {
        result: false,
        name: 'type',
        params: ['number']
    });
    test.equal(v.validate(6, options), {
        result: true,
        name: 'type',
        params: ['number']
    });
});

Tinytest.add('class', function (test) {
    var v = Validations.new('class', [Date]);
    var A = function(){};

    test.equal(v.test(new A), false);
    test.equal(v.test(new Date), true);

    test.equal(v.validate(new A, options), {
        result: false,
        name: 'class',
        params: [Date]
    });
    test.equal(v.validate(new Date, options), {
        result: true,
        name: 'class',
        params: [Date]
    });
});

Tinytest.add('optional', function (test) {
    var v = Validations.new('optional', null, [Validations.new('type', ['number'])]);

    test.equal(v.test(null), true);
    test.equal(v.test(1), true);
    test.equal(v.test('1'), false);

    test.equal(v.validate(null, options), {
        result: true,
        name: 'optional'
    });
    test.equal(v.validate(1, options), {
        result: true,
        name: 'type',
        params: ['number']
    });
    test.equal(v.validate('1', options), {
        result: false,
        name: 'type',
        params: ['number']
    });
});