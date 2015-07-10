Package.describe({
    name: 'zhaoyao91:validations',
    version: '1.0.0',
    summary: 'the foundation for meteor variable validation.',
    git: 'https://github.com/zhaoyao91/meteor-validations',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.1.0.2');

    api.addFiles('lib/lib/validator.js');
    api.addFiles('lib/validations.js');
    api.addFiles('lib/validations/core.js');
    api.addFiles('lib/validations/basic.js');
    api.addFiles('lib/validations/string.js');
    api.addFiles('lib/validations/type.js');
    api.addFiles('lib/validations/compare.js');

    api.export('Validations');
});

Package.onTest(function (api) {
    api.use('tinytest');
    api.use('zhaoyao91:validations');

    api.addFiles('test/pre.js');
    api.addFiles('test/core.js');
    api.addFiles('test/basic.js');
    api.addFiles('test/string.js');
    api.addFiles('test/parse.js');
    api.addFiles('test/type.js');
    api.addFiles('test/compare.js');
});

/**
 * generally, the params and sub validations should be decided during construction,
 * and should not be modified latter.
 * @param params - a validation can have params if it needs
 * @param validations - a validation can have sub validations if it needs
 */
validationClass = function(params, validations) {
    this.params = params;
    this.validations = validations;
};

validationClass.prototype = {
    name: 'validation name',

    /**
     * test if the target satisfies something
     * @param target - anything to be tested
     * @return {boolean} - test result
     */
    test: function(target){

    },

    /**
     * validate the target and generate a report
     * @param target - anything to be validated
     * @param actions
     * @param actions.quickReturn - if true, it should return once it can decide the result,
     * else, it should check all branches
     * @param actions.reportPass - if true, it should add the reports of all sub validations
     * that contribute to the *true* result of this validation to its report.reports
     * @param actions.reportFail - if true, it should add the reports of all sub validations
     * that contribute to the *false* result of this validation to its report.reports*
     * @return {object} - report
     * {
     *      result: boolean,
     *      name: validation name,
     *      [params]: params if it have params,
     *      [reports]: reports of sub validations if it have sub validations,
     *      [index]: if it is for some field of the target,
     *      then add the field name here, no in params
     * }
     */
    validate: function(target, actions){

    }
};