var testFuncs = {
    isUndefined: function(arg) {
        return arg === undefined;
    },

    isNull: function(arg) {
        return arg === null;
    },

    isNaN: function(arg) {
        return isNaN(arg);
    },

    isBoolean: function(arg) {
        return typeof arg === 'boolean';
    },

    isNumber: function(arg) {
        return typeof arg === 'number';
    },

    isString: function(arg) {
        return typeof arg === 'string';
    },

    isFunction: function(arg) {
        return typeof arg === 'function';
    },

    isDate: function(arg) {
        return arg instanceof Date;
    },

    isArray: function(arg) {
        return Array.isArray(arg);
    },

    isObject: function(arg) {
        return arg !== null && typeof arg === 'object';
    }
};

for (var name in testFuncs) {
    Validations.addByTestFunc(name, testFuncs[name]);
}
