// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

import { NODE_MODULES } from "and-cli/modules/constants";
import { StringUtils } from "andculturecode-javascript-core";
import echo from "and-cli/modules/echo";
import optionStringFactory from "and-cli/utilities/option-string-factory";
import shell from "shelljs";

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Functions
// -----------------------------------------------------------------------------------------

const JsonList = {
    description() {
        return `Lists json files in the specified directory (defaults to pwd - ${shell.pwd()})`;
    },
    getOptions() {
        return optionStringFactory.build("list [dir]", "l");
    },
    run(dir?: string) {
        if (StringUtils.isEmpty(dir)) {
            dir = shell.pwd();
        }

        echo.message(`Listing json files in ${dir}`);

        const jsonFiles = shell
            .ls("-R", [dir!])
            .filter((file) => !file.includes(NODE_MODULES))
            .filter((file) => file.endsWith(".json"));

        jsonFiles.forEach((jsonFile) => console.log(jsonFile));
    },
};

// #endregion Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { JsonList };

// #endregion Exports
