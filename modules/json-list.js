// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const commandStringFactory = require("and-cli/utilities/command-string-factory");
const echo = require("and-cli/modules/echo");
const optionStringFactory = require("and-cli/utilities/option-string-factory");
const shell = require("shelljs");
const { StringUtils } = require("andculturecode-javascript-core");
const { NODE_MODULES } = require("and-cli/modules/constants");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Functions
// -----------------------------------------------------------------------------------------

const jsonList = {
    description() {
        return `Lists json files in the specified directory (defaults to pwd - ${shell.pwd()})`;
    },
    getOptions() {
        return optionStringFactory.build("list [dir]", "l");
    },
    run(dir) {
        if (StringUtils.isEmpty(dir)) {
            dir = shell.pwd();
        }

        echo.message(`Listing json files in ${dir}`);

        const jsonFiles = shell
            .ls("-R", dir)
            .filter((file) => !file.includes(NODE_MODULES))
            .filter((file) => file.endsWith(".json"));

        jsonFiles.forEach((jsonFile) => console.log(jsonFile));
    },
};

// #endregion Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

module.exports = jsonList;

// #endregion Exports
