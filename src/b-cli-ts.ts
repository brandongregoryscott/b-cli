#!/usr/bin/env node

// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

import { TsAlphabetize } from "./modules/ts-alphabetize";
import program from "and-cli";

// #endregion Imports

require("and-cli/command-runner").run(async () => {
    // -----------------------------------------------------------------------------------------
    // #region Entrypoint
    // -----------------------------------------------------------------------------------------

    program
        .usage("option(s)")
        .description("Commands for listing, processing, etc. typescript files")
        .option(TsAlphabetize.getOptions(), TsAlphabetize.description())
        .parse(process.argv);

    if (program.alphabetize) {
        const files =
            typeof program.alphabetize === "string"
                ? program.alphabetize.split(" ")
                : undefined;
        TsAlphabetize.run(files);
    }
    // If no options are passed in, just output help
    if (process.argv.slice(2).length === 0) {
        program.outputHelp();
    }

    // #endregion Entrypoint
});
