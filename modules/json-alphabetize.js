// -----------------------------------------------------------------------------------------
// #region Imports
// -----------------------------------------------------------------------------------------

const {
    CollectionUtils,
    StringUtils,
} = require("andculturecode-javascript-core");
const echo = require("and-cli/modules/echo");
const jsonfile = require("jsonfile");
const optionStringFactory = require("and-cli/utilities/option-string-factory");
const shell = require("shelljs");

// #endregion Imports

// -----------------------------------------------------------------------------------------
// #region Variables
// -----------------------------------------------------------------------------------------

/**
 * If set, the value of this key will be used to determine sorting order of the underlying object.
 */
let _key;

// #endregion Variables

// -----------------------------------------------------------------------------------------
// #region Public Functions
// -----------------------------------------------------------------------------------------

const jsonAlphabetize = {
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
    run(files) {
        if (CollectionUtils.isEmpty(files)) {
            echo.error("No file(s) specified.");
            shell.exit(0);
        }

        files.forEach((file) => {
            const parsedFile = jsonfile.readFileSync(file);
            const alphabetizedFile = Array.isArray(parsedFile)
                ? _sortArray(parsedFile)
                : _sortObjectByKeys(parsedFile);

            jsonfile.writeFileSync(
                `${file.replace(".json", "")}.alphabetized.json`,
                alphabetizedFile
            );
        });
    },
    setKey(key) {
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

const _sortArray = (array) => {
    if (!Array.isArray(array)) {
        return array;
    }

    let sortedArray = [];
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

const _sortObjectsByProperty = (objectA, objectB) =>
    objectA[_key].localeCompare(objectB[_key]);

const _sortObjectByKeys = (unsortedObject) => {
    if (typeof unsortedObject !== "object") {
        return unsortedObject;
    }

    const sortedObject = {};
    Object.keys(unsortedObject)
        .sort()
        .forEach((key) => {
            let value = unsortedObject[key];
            // If the value of the key is another object, recursively sort its keys.
            if (typeof value === "object") {
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

module.exports = jsonAlphabetize;

// #endregion Exports
