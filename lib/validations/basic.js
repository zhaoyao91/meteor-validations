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

// length
Validations.addByTestFunc('length', function (target, targetLength) {
    var length = target.length;
    if (Array.isArray(targetLength)) {
        if (targetLength.length === 1) return length >= targetLength[0];
        else if (targetLength.length === 2) return length >= targetLength[0] && length <= targetLength[1];
        else throw new Error('wrong params for length validation: length must be 1 or 2, actually is: ' + targetLength.length);
    }
    else {
        return length == targetLength;
    }
});