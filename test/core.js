// and or not each some

Tinytest.add('and', function (test) {
    var v = Validations.new('and', null, [Validations.new('exist'), Validations.new('type', ['number'])]);

    test.equal(v.test(null), false);
    test.equal(v.test('1'), false);
    test.equal(v.test(6), true);

    test.equal(v.validate(null, options), {
        result: false,
        name: 'and',
        reports: [
            {result: false, name: 'exist'}
        ]
    });
    test.equal(v.validate('1', options), {
        result: false,
        name: 'and',
        reports: [
            {result: true, name: 'exist'},
            {result: false, name: 'type', params: ['number']}
        ]
    });
    test.equal(v.validate(6, options), {
        result: true,
        name: 'and',
        reports: [
            {result: true, name: 'exist'},
            {result: true, name: 'type', params: ['number']}
        ]
    });
});

Tinytest.add('or', function (test) {
    var v = Validations.new('or', null, [Validations.new('type', ['string']), Validations.new('type', ['number'])]);

    test.equal(v.test(null), false);
    test.equal(v.test('1'), true);
    test.equal(v.test(6), true);

    test.equal(v.validate(null, options), {
        result: false,
        name: 'or',
        reports: [
            {result: false, name: 'type', params: ['string']},
            {result: false, name: 'type', params: ['number']}
        ]
    });
    test.equal(v.validate('1', options), {
        result: true,
        name: 'or',
        reports: [
            {result: true, name: 'type', params: ['string']}
        ]
    });
    test.equal(v.validate(6, options), {
        result: true,
        name: 'or',
        reports: [
            {result: false, name: 'type', params: ['string']},
            {result: true, name: 'type', params: ['number']}
        ]
    });
});

Tinytest.add('not', function (test) {
    var v = Validations.new('not', null, [Validations.new(['exist'])]);

    test.equal(v.test(null), true);
    test.equal(v.test(undefined), true);
    test.equal(v.test(6), false);

    test.equal(v.validate(null, options), {
        result: true,
        name: 'not',
        reports: [
            {result: false, name: 'exist'}
        ]
    });
    test.equal(v.validate(undefined, options), {
        result: true,
        name: 'not',
        reports: [
            {result: false, name: 'exist'}
        ]
    });
    test.equal(v.validate(6, options), {
        result: false,
        name: 'not',
        reports: [
            {result: true, name: 'exist'}
        ]
    });
});

Tinytest.add('some', function (test) {
    var v = Validations.new('some', null, [Validations.new('exist')]);

    test.equal(v.test([null, undefined]), false);
    test.equal(v.test([null, 1]), true);

    test.equal(v.validate([null, undefined], options), {
        result: false,
        name: 'some',
        reports: [
            {result: false, index: '0', name: 'exist'},
            {result: false, index: '1', name: 'exist'}
        ]
    });
    test.equal(v.validate([null, 1], options), {
        result: true,
        name: 'some',
        reports: [
            {result: false, index: '0', name: 'exist'},
            {result: true, index: '1', name: 'exist'}
        ]
    });
});

Tinytest.add('some field', function (test) {
    var v = Validations.new('some', ['name', 'age'], [Validations.new('type', ['string']), Validations.new('type', ['number'])]);

    test.equal(v.test({name: 20, age: 'bob'}), false);
    test.equal(v.test({name: 20, age: 20}), true);

    test.equal(v.validate({name: 20, age: 'bob'}, options), {
        result: false,
        name: 'some',
        reports: [
            {result: false, index: 'name', name: 'type', params: ['string']},
            {result: false, index: 'age', name: 'type', params: ['number']}
        ]
    });
    test.equal(v.validate({name: 20, age: 20}, options), {
        result: true,
        name: 'some',
        reports: [
            {result: false, index: 'name', name: 'type', params: ['string']},
            {result: true, index: 'age', name: 'type', params: ['number']}
        ]
    });
});

Tinytest.add('each', function (test) {
    var v = Validations.new('each', null, [Validations.new('exist')]);

    test.equal(v.test([1, null]), false);
    test.equal(v.test([2, 1]), true);

    test.equal(v.validate([1, undefined], options), {
        result: false,
        name: 'each',
        reports: [
            {result: true, index: '0', name: 'exist'},
            {result: false, index: '1', name: 'exist'}
        ]
    });
    test.equal(v.validate([2, 1], options), {
        result: true,
        name: 'each',
        reports: [
            {result: true, index: '0', name: 'exist'},
            {result: true, index: '1', name: 'exist'}
        ]
    });
});

Tinytest.add('each field', function (test) {
    var v = Validations.new('each', ['name', 'age'], [Validations.new('type', ['string']), Validations.new('type', ['number'])]);

    test.equal(v.test({name: 'bob', age: 'bob'}), false);
    test.equal(v.test({name: 'name', age: 20}), true);

    test.equal(v.validate({name: 'bob', age: 'bob'}, options), {
        result: false,
        name: 'each',
        reports: [
            {result: true, index: 'name', name: 'type', params: ['string']},
            {result: false, index: 'age', name: 'type', params: ['number']}
        ]
    });
    test.equal(v.validate({name: 'bob', age: 20}, options), {
        result: true,
        name: 'each',
        reports: [
            {result: true, index: 'name', name: 'type', params: ['string']},
            {result: true, index: 'age', name: 'type', params: ['number']}
        ]
    });
});
