#!/usr/bin/env node

// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

import commandRegistry from "and-cli/modules/command-registry";
import packageConfig from "and-cli/modules/package-config";
import program from "and-cli";

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Entrypoint
// -----------------------------------------------------------------------------------------

const { description } = packageConfig.getLocal();
program.description(description);

// Register all of the base commands from the and-cli with this application
commandRegistry
    .registerBaseCommands()
    .registerCommand({
        command: "json",
        description: "Commands to manipulate json files",
    })
    .registerCommand({
        command: "ts",
        description: "Commands to manipulate ts files",
    })
    .registerAliasesFromConfig()
    .parseWithAliases();

// #endregion Entrypoint
