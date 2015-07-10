var testFuncs = {
    '==': function (target, value) {
        return target == value;
    },

    '===': function (target, value) {
        return target === value;
    },

    '!=': function (target, value) {
        return target != value;
    },

    '!==': function (target, value) {
        return target !== value;
    },

    '>': function (target, value) {
        return target > value;
    },

    '<': function (target, value) {
        return target < value;
    },

    '>=': function (target, value) {
        return target >= value;
    },

    '<=': function (target, value) {
        return target <= value;
    },

    eq: function (target, value) {
        return target == value;
    },

    neq: function (target, value) {
        return target != value;
    },

    gt: function (target, value) {
        return target > value;
    },

    lt: function (target, value) {
        return target < value;
    },

    ge: function (target, value) {
        return target >= value;
    },

    le: function (target, value) {
        return target <= value;
    },
    
    min: function (target, value) {
        return target >= value;
    },

    max: function(target, value) {
        return target <= value;
    },

    'in': function (target, values) {
        for (var i in values) {
            if (target == values[i]) return true;
        }
        return false;
    },

    notIn: function (target, values) {
        for (var i in values) {
            if (target == values[i]) return false;
        }
        return true;
    }
};

for (var name in testFuncs) {
    Validations.addByTestFunc(name, testFuncs[name]);
}
