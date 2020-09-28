// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

import { NODE_MODULES } from "and-cli/modules/constants";
import { StringUtils } from "andculturecode-javascript-core";
import echo from "and-cli/modules/echo";
import optionStringFactory from "and-cli/utilities/option-string-factory";
import shell from "shelljs";
import upath from "upath";
import { Project, SyntaxKind } from "ts-morph";

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Functions
// -----------------------------------------------------------------------------------------

const TsAlphabetize = {
    description() {
        return "Alphabetizes functions, variables etc. in a typescript file";
    },
    getOptions() {
        return optionStringFactory.build("alphabetize [files]", "a");
    },
    run(files?: string[]) {
        const project = new Project({
            tsConfigFilePath: upath.join(".", "tsconfig.json"),
        });

        const jsonAlphabetizeFile = project.getSourceFile(
            "src/modules/json-alphabetize.ts"
        );

        const exports = jsonAlphabetizeFile
            ?.getExportedDeclarations()
            .get("JsonAlphabetize");
    },
};

// #endregion Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { TsAlphabetize };

// #endregion Exports
