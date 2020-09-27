// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

import { CollectionUtils, StringUtils } from "andculturecode-javascript-core";
import echo from "and-cli/modules/echo";
import jsonfile from "jsonfile";
import optionStringFactory from "and-cli/utilities/command-string-factory";
import shell from "shelljs";

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Variables
// -----------------------------------------------------------------------------------------

/**
 * If set, the value of this key will be used to determine sorting order of the underlying object.
 */
let _key: string | undefined;

// #endregion Variables

// -----------------------------------------------------------------------------------------
// #region Public Functions
// -----------------------------------------------------------------------------------------

const JsonAlphabetize = {
    description() {
        return "Alphabetizes a json file by a certain key";
    },
    getOptions() {
        return optionStringFactory.build("alphabetize [files]", "a");
    },
    getKeyOptions() {
        return optionStringFactory.build("key <key>", "k");
    },
    keyDescription() {
        return "Specify a key whose value should be used for alphabetization";
    },
    run(files?: string[]) {
        if (CollectionUtils.isEmpty(files)) {
            echo.error("No file(s) specified.");
            shell.exit(0);
        }
        const timestamp = new Date().toISOString();

        files?.forEach((file) => {
            const parsedFile = jsonfile.readFileSync(file);
            const alphabetizedFile = Array.isArray(parsedFile)
                ? _sortArray(parsedFile)
                : _sortObjectByKeys(parsedFile);

            jsonfile.writeFileSync(
                `${file.replace(".json", "")}.${timestamp}.json`,
                alphabetizedFile
            );
        });
    },
    setKey(key?: string) {
        if (StringUtils.isEmpty(key)) {
            return this;
        }

        _key = key;
        return this;
    },
};

// #endregion Public Functions

// -----------------------------------------------------------------------------------------
// #region Private Functions
// -----------------------------------------------------------------------------------------

const _sortArray = (array: any[]): any[] => {
    if (!Array.isArray(array)) {
        return array;
    }

    let sortedArray: any[] = [];
    const sortedStringsOrNumbers = array
        .filter(
            (entry) => typeof entry === "string" || typeof entry === "number"
        )
        .sort();

    sortedArray = sortedArray.concat(sortedStringsOrNumbers);

    const sortableObjects = array.filter(
        (entry) => typeof entry === "object" && !Array.isArray(entry)
    );

    // Sort the underlying keys of each object
    let sortedObjects = sortableObjects.map((unorderedObj) =>
        _sortObjectByKeys(unorderedObj)
    );

    // If a key has been specified to sort the objects by, process it now.
    if (StringUtils.hasValue(_key)) {
        sortedObjects = sortedObjects.sort(_sortObjectsByProperty);
    }

    sortedArray = sortedArray.concat(sortableObjects);

    // Recursively sort any arrays
    const sortedNestedArrays = array
        .filter((entry) => Array.isArray(entry))
        .map(_sortArray);
    sortedArray = sortedArray.concat(sortedNestedArrays);

    return sortedArray;
};

const _sortObjectsByProperty = (objectA: any, objectB: any) =>
    objectA[_key!].localeCompare(objectB[_key!]);

const _sortObjectByKeys = (unsortedObject: any) => {
    if (typeof unsortedObject !== "object") {
        return unsortedObject;
    }

    if (Array.isArray(unsortedObject)) {
        return _sortArray(unsortedObject);
    }

    const sortedObject: any = {};
    Object.keys(unsortedObject)
        .sort()
        .forEach((key) => {
            let value = unsortedObject[key];
            if (Array.isArray(value)) {
                value = _sortArray(value);
            }

            // If the value of the key is another object, recursively sort its keys.
            if (typeof value === "object" && !Array.isArray(value)) {
                value = _sortObjectByKeys(value);
            }

            sortedObject[key] = value;
        });

    return sortedObject;
};
// #endregion Private Functions

// -----------------------------------------------------------------------------------------
// #region Exports
// -----------------------------------------------------------------------------------------

export { JsonAlphabetize };

// #endregion Exports
