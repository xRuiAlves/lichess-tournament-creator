const ERRORS = require("./errors");
const { isNumberValid, isDateFormatValid } = require("./utils");

/**
 * Creates an arena tournament
 * @param {String} name Tournament name
 * @param {String} date Tournament date, in 'YYYY-MM-DD hh:mm:ss' format
 * @param {Integer} t_duration Tournament duration, in minutes
 * @param {Integer} m_duration Match duration, in minutes
 * @param {Integer} m_increment Match increment per move, in seconds
 * @throws {Object}
 * @returns {Boolean} True if valid
 */
const validateArenaTournamentParams = (name, date, t_duration, m_duration, m_increment) => {
    if (name.length === 0) {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Tournament name should not be empty.",
        };
    }
    if (!isDateFormatValid(date)) {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Tournament date should be specified in a 'YYYY-MM-DD hh:mm:ss' format.",
        };
    }
    if (!isNumberValid(parseInt(t_duration, 10))) {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Tournament duration should be a non-negative integer number.",
        };
    }
    if (!isNumberValid(parseInt(m_duration, 10))) {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Match duration should be a non-negative integer number.",
        };
    }
    if (!isNumberValid(parseInt(m_increment, 10))) {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Match increment per move should be a non-negative integer number.",
        };
    }

    return true;
};

/**
 * Creates a swiss tournament
 * @param {String} name Tournament name
 * @param {String} team_id Team identification string
 * @param {String} date Tournament date, in 'YYYY-MM-DD hh:mm:ss' format
 * @param {Integer} num_rounds Tournament number of rounds
 * @param {Integer} m_duration Match duration, in minutes
 * @param {Integer} m_increment Match increment per move, in seconds
 * @throws {Object}
 * @returns {Boolean} True if valid
 */
const validateSwissTournamentParams = (name, team_id, date, num_rounds, m_duration, m_increment) => {
    if (name.length === 0) {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Tournament name should not be empty.",
        };
    }
    if (team_id.length === 0) {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Team ID should not be empty.",
        };
    }
    if (!isDateFormatValid(date)) {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Tournament date should be specified in a 'YYYY-MM-DD hh:mm:ss' format.",
        };
    }
    if (!isNumberValid(parseInt(num_rounds, 10))) {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Tournament number of rounds should be a non-negative integer number.",
        };
    }
    if (!isNumberValid(parseInt(m_duration, 10))) {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Match duration should be a non-negative integer number.",
        };
    }
    if (!isNumberValid(parseInt(m_increment, 10))) {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Match increment per move should be a non-negative integer number.",
        };
    }

    return true;
};

module.exports = {
    validateArenaTournamentParams,
    validateSwissTournamentParams,
};
