#!/usr/bin/env node

const {
    StringUtils,
    CollectionUtils,
} = require("andculturecode-javascript-core");
const jsonAlphabetize = require("./modules/json-alphabetize");

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
        .option(jsonAlphabetize.getOptions(), jsonAlphabetize.description())
        .option(
            jsonAlphabetize.getKeyOptions(),
            "Specify a key whose value should be used for alphabetization"
        )
        .option(jsonList.getOptions(), jsonList.description())
        .parse(process.argv);

    if (program.alphabetize) {
        const files =
            typeof program.alphabetize === "string"
                ? program.alphabetize.split(" ")
                : undefined;
        jsonAlphabetize.setKey(program.key).run(files);
    }

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
