// where
Validations.addByTestFunc('where', function (target, testFunc) {
    return testFunc(target);
});

// exist
Validations.addByTestFunc('exist', function (target) {
    return !(target === undefined || target === null);
});

// type
Validations.addByTestFunc('type', function (target, type) {
    return typeof target === type;
});

// class
Validations.addByTestFunc('class', function (target, constructor) {
    return target instanceof constructor;
});