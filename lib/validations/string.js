StringValidations = {
    nameFunc: function(name) {return name},

    enabled: false,

    list: [
        'contains',
        'equals',
        'isAfter',
        'isAlpha',
        'isAlphanumeric',
        'isAscii',
        'isBase64',
        'isBefore',
        'isBoolean',
        'isCreditCard',
        'isCurrency',
        'isDate',
        'isDivisibleBy',
        'isEmail',
        'isFQDN',
        'isFloat',
        'isFullWidth',
        'isHalfWidth',
        'isHexColor',
        'isHexadecimal',
        'isIP',
        'isISBN',
        'isISIN',
        'isIn',
        'isInt',
        'isJSON',
        'isLowercase',
        'isMobilePhone',
        'isMongoId',
        'isMultibyte',
        'isNull',
        'isNumeric',
        'isSurrogatePair',
        'isURL',
        'isUUID',
        'isUppercase',
        'isVariableWidth',

        'isByteLength',
        'isLength',
        'matches'
    ],

    disable: function () {
        if (this.enabled) {
            for (var i = 0; i < this.list.length; i++) {
                var name = this.nameFunc(this.list[i]);
                Validations.remove(name);
            }
            this.enabled = false;
        }
    },

    enable: function (nameFunc) {
        this.disable();
        this.nameFunc = nameFunc || function(name) {return name};
        for (var i = 0; i < this.list.length; i++) {
            var originalName = this.list[i];
            var name = this.nameFunc(originalName);
            Validations.addByTestFunc(name, validator[originalName]);
        }
        this.enabled = true;
    }
};

