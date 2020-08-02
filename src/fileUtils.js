const fs = require("fs");
const ERRORS = require("./errors");
const { isDateFormatValid, isNumberValid } = require("./utils");

/**
 * Read JSON file content
 * @param {String} file_name
 * @throws {Object}
 * @returns {Object} JSON file data
 */
const readInputFile = (file_name) => {
    let data;

    try {
        data = JSON.parse(fs.readFileSync(file_name));
    } catch (_e) {
        throw {
            err: ERRORS.INVALID_INPUT_FILE,
            msg: `The file ${file_name} is not a valid JSON file.`,
        };
    }

    return data;
};

/**
 * Validate input JSON file
 * @param {Object} data
 * @throws {Object}
 * @return {Boolean} True if valid, false otherwise
 */
const validateFileData = (data) => {
    if (!data.auth_token) {
        throw {
            err: ERRORS.INVALID_FILE_CONTENT,
            msg: "Missing Lichess API 'auth_token' field specification.",
        };
    }
    if (!data.tournaments) {
        throw {
            err: ERRORS.INVALID_FILE_CONTENT,
            msg: "Missing 'tournaments' field specification.",
        };
    }
    if (!Array.isArray(data.tournaments)) {
        throw {
            err: ERRORS.INVALID_FILE_CONTENT,
            msg: "The 'tournaments' field should be of Array type.",
        };
    }
    if (data.tournaments.length === 0) {
        throw {
            err: ERRORS.INVALID_FILE_CONTENT,
            msg: "The 'tournaments' array should not be empty.",
        };
    }

    data.tournaments.forEach((tournament, i) => {
        if (!tournament.type) {
            throw {
                err: ERRORS.INVALID_FILE_CONTENT,
                msg: `Missing 'type' field in tournament number ${i + 1}.`,
            };
        }
        if (!tournament.name) {
            throw {
                err: ERRORS.INVALID_FILE_CONTENT,
                msg: `Missing 'name' field in tournament number ${i + 1}.`,
            };
        }
        if (!tournament.date) {
            throw {
                err: ERRORS.INVALID_FILE_CONTENT,
                msg: `Missing 'date' field in tournament number ${i + 1}.`,
            };
        }
        if (!isDateFormatValid(tournament.date)) {
            throw {
                err: ERRORS.INVALID_FILE_CONTENT,
                msg: `Invalid 'date' field in tournament number ${i + 1} (should be in format 'YYYY-MM-DD hh:mm:ss').`,
            };
        }
        if (!tournament.match) {
            throw {
                err: ERRORS.INVALID_FILE_CONTENT,
                msg: `Missing 'match' field in tournament number ${i + 1}.`,
            };
        }
        if (!tournament.match.duration) {
            throw {
                err: ERRORS.INVALID_FILE_CONTENT,
                msg: `Missing 'match.duration' field in tournament number ${i + 1}.`,
            };
        }
        if (!tournament.match.increment) {
            throw {
                err: ERRORS.INVALID_FILE_CONTENT,
                msg: `Missing 'match.increment' field in tournament number ${i + 1}.`,
            };
        }

        if (tournament.type === "swiss") {
            if (!tournament.team_id) {
                throw {
                    err: ERRORS.INVALID_FILE_CONTENT,
                    msg: `Missing 'team_id' field in tournament number ${i + 1}.`,
                };
            }
            if (!tournament.num_rounds) {
                throw {
                    err: ERRORS.INVALID_FILE_CONTENT,
                    msg: `Missing 'num_rounds' field in tournament number ${i + 1}.`,
                };
            }
            if (!isNumberValid(parseInt(tournament.num_rounds, 10))) {
                throw {
                    err: ERRORS.INVALID_FILE_CONTENT,
                    msg: `Invalid 'num_rounds' field in tournament number ${i + 1} (should be a non-negative integer number').`,
                };
            }
        } else if (tournament.type === "arena") {
            if (!tournament.tournament_duration) {
                throw {
                    err: ERRORS.INVALID_FILE_CONTENT,
                    msg: `Missing 'tournament_duration' field in tournament number ${i + 1}.`,
                };
            }
            if (!isNumberValid(parseInt(tournament.tournament_duration, 10))) {
                throw {
                    err: ERRORS.INVALID_FILE_CONTENT,
                    msg: `Invalid 'tournament_duration' field in tournament number ${i + 1} (should be a non-negative integer number').`,
                };
            }
        } else {
            throw {
                err: ERRORS.INVALID_FILE_CONTENT,
                msg: `Invalid 'type' field in tournament number ${i + 1} (should be arena or swiss).`,
            };
        }

        if (!isNumberValid(parseInt(tournament.match.duration, 10))) {
            throw {
                err: ERRORS.INVALID_FILE_CONTENT,
                msg: `Invalid 'match.duration' field in tournament number ${i + 1} (should be a non-negative integer number').`,
            };
        }
        if (!isNumberValid(parseInt(tournament.match.increment, 10))) {
            throw {
                err: ERRORS.INVALID_FILE_CONTENT,
                msg: `Invalid 'match.increment' field in tournament number ${i + 1} (should be a non-negative integer number').`,
            };
        }
    });

    return true;
};

module.exports = {
    readInputFile,
    validateFileData,
};
