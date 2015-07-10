// and
Validations.addByPrototype({
    name: 'and',

    test: function (target) {
        for (var i = 0; i < this.validations.length; i++) {
            if (this.validations[i].test(target) === false) return false;
        }
        return true;
    },

    /**
     * @param target
     * @param actions
     * @param actions.quickReturn
     * @param actions.reportPass
     * @param actions.reportFail
     */
    validate: function (target, actions) {
        var result = {
            result: true,
            name: this.name,
            reports: []
        };

        for (var i = 0; i < this.validations.length; i++) {
            var thisResult = this.validations[i].validate(target, actions);

            // compute result
            result.result = result.result && thisResult.result;

            // build report
            if (actions.reportPass && thisResult.result === true) result.reports.push(thisResult);
            else if (actions.reportFail && thisResult.result === false) result.reports.push(thisResult);

            // quick return
            if (actions.quickReturn && result.result === false) return result;
        }

        return result;
    }
});

// or
Validations.addByPrototype({
    name: 'or',

    test: function (target) {
        for (var i = 0; i < this.validations.length; i++) {
            if (this.validations[i].test(target) === true) return true;
        }
        return false;
    },

    /**
     * @param target
     * @param actions
     * @param actions.quickReturn
     * @param actions.reportPass
     * @param actions.reportFail
     */
    validate: function (target, actions) {
        var result = {
            result: false,
            name: this.name,
            reports: []
        };

        for (var i = 0; i < this.validations.length; i++) {
            var thisResult = this.validations[i].validate(target, actions);

            // compute result
            result.result = result.result || thisResult.result;

            // build report
            if (actions.reportPass && thisResult.result === true) result.reports.push(thisResult);
            else if (actions.reportFail && thisResult.result === false) result.reports.push(thisResult);

            // quick return
            if (actions.quickReturn && result.result === true) return result;
        }

        return result;
    }
});

// not
Validations.addByPrototype({
    name: 'not',

    test: function (target) {
        var subValidation = this.validations[0];
        if (!subValidation) throw new Error('no sub validation: require 1 and only 1 sub validation');
        return !subValidation.test(target);
    },

    /**
     * @param target
     * @param actions
     * @param actions.quickReturn
     * @param actions.reportPass
     * @param actions.reportFail
     */
    validate: function (target, actions) {
        var subValidation = this.validations[0];
        if (!subValidation) throw new Error('no sub validation: require 1 and only 1 sub validation');

        var result = {
            result: null,
            name: this.name,
            reports: []
        };

        var thisResult = subValidation.validate(target, {
            quickReturn: actions.quickReturn,
            testOnly: actions.testOnly,
            reportPass: actions.reportFail,
            reportFail: actions.reportPass
        });

        result.result = !thisResult.result;

        if (actions.reportPass && thisResult.result === false) result.reports.push(thisResult);
        else if (actions.reportFail && thisResult.result === true) result.reports.push(thisResult);

        return result;
    }
});

// each
Validations.addByPrototype({
    name: 'each',

    test: function (target) {
        var i;
        if (!this.params || this.params.length === 0) {
            // for elements
            var elements = target;
            var subValidation = this.validations[0];
            if (!subValidation) throw new Error('no sub validation: require 1 and only 1 sub validation');

            for (i in elements) if (subValidation.test(getValue(target, i)) === false) return false;
            return true;
        }
        else {
            // for fields
            var keys = this.params;
            var validations = this.validations;
            if (keys.length !== validations.length) throw new Error('number of fields does not match number of validations');

            for (i = 0; i < keys.length; i++) if (validations[i].test(getValue(target, keys[i])) === false) return false;
            return true;
        }
    },

    /**
     * @param target
     * @param actions
     * @param actions.quickReturn
     * @param actions.reportPass
     * @param actions.reportFail
     */
    validate: function (target, actions) {
        var i, result, thisResult;
        if (!this.params || this.params.length === 0) {
            // for elements
            var elements = target;
            var subValidation = this.validations[0];
            if (!subValidation) throw new Error('no sub validation: require 1 and only 1 sub validation');

            result = {
                result: true,
                name: this.name,
                reports: []
            };

            for (i in elements) {
                thisResult = subValidation.validate(getValue(target, i), actions);
                thisResult.index = i;

                // compute result
                result.result = result.result && thisResult.result;

                // build report
                if (actions.reportPass && thisResult.result === true) result.reports.push(thisResult);
                else if (actions.reportFail && thisResult.result === false) result.reports.push(thisResult);

                // quick return
                if (actions.quickReturn && result.result === false) return result;
            }

            return result;

        }
        else {
            // for fields
            var keys = this.params;
            var validations = this.validations;
            if (keys.length !== validations.length) throw new Error('number of fields does not match number of validations');

            result = {
                result: true,
                name: this.name,
                reports: []
            };

            for (i = 0; i < keys.length; i++) {
                thisResult = validations[i].validate(getValue(target, keys[i]), actions);
                thisResult.index = keys[i];

                // compute result
                result.result = result.result && thisResult.result;

                // build report
                if (actions.reportPass && thisResult.result === true) result.reports.push(thisResult);
                else if (actions.reportFail && thisResult.result === false) result.reports.push(thisResult);

                // quick return
                if (actions.quickReturn && result.result === false) return result;
            }

            return result;
        }
    }
});

// some
Validations.addByPrototype({
    name: 'some',

    test: function (target) {
        var i;
        if (!this.params || this.params.length === 0) {
            // for elements
            var elements = target;
            var subValidation = this.validations[0];
            if (!subValidation) throw new Error('no sub validation: require 1 and only 1 sub validation');

            for (i in elements) if (subValidation.test(getValue(target, i)) === true) return true;
            return false;
        }
        else {
            // for fields
            var keys = this.params;
            var validations = this.validations;
            if (keys.length !== validations.length) throw new Error('number of fields does not match number of validations');

            for (i = 0; i < keys.length; i++) if (validations[i].test(getValue(target, keys[i])) === true) return true;
            return false;
        }
    },

    /**
     * @param target
     * @param actions
     * @param actions.quickReturn
     * @param actions.reportPass
     * @param actions.reportFail
     */
    validate: function (target, actions) {
        var i, result, thisResult;
        if (!this.params || this.params.length === 0) {
            // for elements
            var elements = target;
            var subValidation = this.validations[0];
            if (!subValidation) throw new Error('no sub validation: require 1 and only 1 sub validation');

            result = {
                result: false,
                name: this.name,
                reports: []
            };

            for (i in elements) {
                thisResult = subValidation.validate(getValue(target, i), actions);
                thisResult.index = i;

                // compute result
                result.result = result.result || thisResult.result;

                // build report
                if (actions.reportPass && thisResult.result === true) result.reports.push(thisResult);
                else if (actions.reportFail && thisResult.result === false) result.reports.push(thisResult);

                // quick return
                if (actions.quickReturn && result.result === true) return result;
            }

            return result;
        }
        else {
            // for fields
            var keys = this.params;
            var validations = this.validations;
            if (keys.length !== validations.length) throw new Error('number of fields does not match number of validations');

            result = {
                result: false,
                name: this.name,
                reports: []
            };

            for (i = 0; i < keys.length; i++) {
                thisResult = validations[i].validate(getValue(target, keys[i]), actions);
                thisResult.index = keys[i];

                // compute result
                result.result = result.result || thisResult.result;

                // build report
                if (actions.reportPass && thisResult.result === true) result.reports.push(thisResult);
                else if (actions.reportFail && thisResult.result === false) result.reports.push(thisResult);

                // quick return
                if (actions.quickReturn && result.result === true) return result;
            }

            return result;
        }
    }
});

// optional
Validations.addByPrototype({
    name: 'optional',

    test: function(target) {
        if (this.validations.length > 1) throw new Error('optional can take at most 1 sub validation');
        var subValidation = this.validations[0];
        if (target === null || target === undefined || !subValidation) return true;
        else return subValidation.test(target);
    },

    validate: function(target, actions) {
        if (this.validations.length > 1) throw new Error('optional can take at most 1 sub validation');
        var subValidation = this.validations[0];
        if (target === null || target === undefined || !subValidation) return {result: true, name: this.name};
        else return subValidation.validate(target, actions);
    }
});

function getValue(host, key) {
    if (host === undefined || host === null) return undefined;
    else return host[key];
}