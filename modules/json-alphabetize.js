// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const {
    StringUtils,
    CollectionUtils,
} = require("andculturecode-javascript-core");
const echo = require("and-cli/modules/echo");
const optionStringFactory = require("and-cli/utilities/option-string-factory");
const shell = require("shelljs");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Functions
// -----------------------------------------------------------------------------------------

const jsonAlphabetize = {
    description() {
        return "Alphabetizes a json file by a certain key";
    },
    getOptions() {
        return optionStringFactory.build("alphabetize [files]", "a");
    },
    run(files) {
        if (CollectionUtils.isEmpty(files)) {
            echo.error("No file specified.");
            shell.exit(0);
        }
    },
};

// #endregion Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

module.exports = jsonAlphabetize;

// #endregion Exports
