// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

import child_process from "child_process";
import commandStringFactory from "and-cli/utilities/command-string-factory";
import echo from "and-cli/modules/echo";
import optionStringFactory from "and-cli/utilities/option-string-factory";
import shell from "shelljs";

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Functions
// -----------------------------------------------------------------------------------------

const DotnetVersion = {
    cmd() {
        return commandStringFactory.build("dotnet", "--info");
    },
    description() {
        return `Outputs information about the installed dotnet SDKs (via ${this.cmd()})`;
    },
    getOptions() {
        return optionStringFactory.build("version", "v");
    },
    run() {
        const { cmd, args } = this.cmd();

        echo.message(`Printing dotnet info (via ${this.cmd()})...`);
        const { status } = child_process.spawnSync(cmd, args, {
            stdio: "inherit",
            shell: true,
        });

        if (status !== 0) {
            echo.error(
                "Failed to retrieve dotnet info. See output for details."
            );
            shell.exit(status ?? 1);
        }

        return status;
    },
};

// #endregion Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { DotnetVersion };

// #endregion Exports
