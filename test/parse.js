Tinytest.add('parse', function (test) {
    var schema = {
        name: 'and',
        schemas: [
            {name: 'type', params: ['string']},
            {name: '.contains', params: ['bob']}
        ]
    };

    var v = Validations.parse(schema);

    test.equal(v.test('hello bob'), true);
    test.equal(v.test('hello you'), false);

    test.equal(v.validate('hello bob', options), {
        result: true,
        name: 'and',
        reports: [
            {
                result: true,
                name: 'type',
                params: ['string']
            },
            {
                result: true,
                name: '.contains',
                params: ['bob']
            }
        ]
    });

    test.equal(v.validate('hello you', options), {
        result: false,
        name: 'and',
        reports: [
            {
                result: true,
                name: 'type',
                params: ['string']
            },
            {
                result: false,
                name: '.contains',
                params: ['bob']
            }
        ]
    });
});

Tinytest.add('batch parse', function (test) {
    var schemas = {
        people: {
            name: 'each',
            params: ['name', 'friend'],
            schemas: [
                {name: 'isString'},
                {
                    name: 'optional',
                    schemas: ['people']
                }
            ]
        }
    };


    var alan = {
        name: 'alan'
    };

    var bob = {
        name: 'bob',
        friend: alan
    };

    var evil = {
        name: 'evil',
        friend: 233333
    };

    var v = Validations.batchParse(schemas).people;

    test.equal(v.test(alan), true);
    test.equal(v.test(bob), true);
    test.equal(v.test(evil), false);

    test.equal(v.validate(bob, options), {
        result: true,
        name: 'each',
        reports: [
            {
                result: true,
                index: 'name',
                name: 'isString'
            },
            {
                result: true,
                index: 'friend',
                name: 'each',
                reports: [
                    {
                        result: true,
                        index: 'name',
                        name: 'isString'
                    },
                    {
                        result: true,
                        index: 'friend',
                        name: 'optional'
                    }
                ]
            }
        ]
    });

    test.equal(v.validate(evil, options), {
        result: false,
        name: 'each',
        reports: [
            {
                result: true,
                index: 'name',
                name: 'isString'
            },
            {
                result: false,
                index: 'friend',
                name: 'each',
                reports: [
                    {
                        result: false,
                        index: 'name',
                        name: 'isString'
                    }
                ]
            }
        ]
    });
});