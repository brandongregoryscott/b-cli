#!/usr/bin/env node

// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const commandRegistry = require("and-cli/modules/command-registry");
const packageConfig = require("and-cli/modules/package-config");
const program = require("and-cli");

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
    .registerAliasesFromConfig()
    .parseWithAliases();

// #endregion Entrypoint
