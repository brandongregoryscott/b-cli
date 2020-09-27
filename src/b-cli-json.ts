#!/usr/bin/env node

// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

import { JsonAlphabetize } from "./modules/json-alphabetize";
import { JsonList } from "./modules/json-list";
import program from "and-cli";

// #endregion Imports

require("and-cli/command-runner").run(async () => {
    // -----------------------------------------------------------------------------------------
    // #region Entrypoint
    // -----------------------------------------------------------------------------------------

    program
        .usage("option(s)")
        .description("Commands for listing, processing, etc. json files")
        .option(JsonAlphabetize.getOptions(), JsonAlphabetize.description())
        .option(
            JsonAlphabetize.getInplaceOptions(),
            JsonAlphabetize.inplaceDescription()
        )
        .option(
            JsonAlphabetize.getKeyOptions(),
            JsonAlphabetize.keyDescription()
        )
        .option(JsonList.getOptions(), JsonList.description())
        .parse(process.argv);

    if (program.alphabetize) {
        const files =
            typeof program.alphabetize === "string"
                ? program.alphabetize.split(" ")
                : undefined;
        JsonAlphabetize.setInplace(program.inPlace)
            .setKey(program.key)
            .run(files);
    }

    if (program.list) {
        const dir = typeof program.list === "string" ? program.list : undefined;
        JsonList.run(dir);
    }

    // If no options are passed in, just output help
    if (process.argv.slice(2).length === 0) {
        program.outputHelp();
    }

    // #endregion Entrypoint
});
