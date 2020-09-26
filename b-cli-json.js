#!/usr/bin/env node

const {
    StringUtils,
    CollectionUtils,
} = require("andculturecode-javascript-core");

require("and-cli/command-runner").run(async () => {
    // -----------------------------------------------------------------------------------------
    // #region Imports
    // -----------------------------------------------------------------------------------------

    const jsonList = require("./modules/json-list");
    const optionStringFactory = require("and-cli/utilities/option-string-factory");
    const program = require("and-cli");

    // #endregion Imports

    // -----------------------------------------------------------------------------------------
    // #region Functions
    // -----------------------------------------------------------------------------------------

    // #endregion Functions

    // -----------------------------------------------------------------------------------------
    // #region Entrypoint
    // -----------------------------------------------------------------------------------------

    program
        .usage("option(s)")
        .description("Commands for listing, processing, etc. json files")
        .option(jsonList.getOptions(), jsonList.description())
        .parse(process.argv);

    if (program.list) {
        const dir = typeof program.list === "string" ? program.list : undefined;
        jsonList.run(dir);
    }

    // If no options are passed in, just output help
    if (process.argv.slice(2).length === 0) {
        program.outputHelp();
    }

    // #endregion Entrypoint
});
