const ERRORS = require("./errors");
const { isNumberValid, isDateFormatValid } = require("./utils");

/**
 * Creates an arena tournament
 * @param {String} name
 * @param {String} date
 * @param {Integer} t_duration
 * @param {Integer} m_duration
 * @param {Integer} m_increment
 * @param {Function} api_callback Async function to create tournament
 * @throws {Object}
 */
const createArenaTournament = (name, date, t_duration, m_duration, m_increment, api_callback) => {
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
    if (!isNumberValid(t_duration)) {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Tournament duration should be a non-negative integer number.",
        };
    }
    if (!isNumberValid(m_duration)) {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Match duration should be a non-negative integer number.",
        };
    }
    if (!isNumberValid(m_increment)) {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Match increment per move should be a non-negative integer number.",
        };
    }

    return api_callback(name, date, t_duration, m_duration, m_increment);
};

/**
 * Creates a swiss tournament
 * @param {String} name
 * @param {String} team_id
 * @param {String} date
 * @param {Integer} num_rounds
 * @param {Integer} m_duration
 * @param {Integer} m_increment
 * @param {Function} api_callback Async function to create tournament
 * @throws {Object}
 */
const createSwissTournament = (name, team_id, date, num_rounds, m_duration, m_increment, api_callback) => {
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
    if (!isNumberValid(num_rounds)) {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Tournament number of rounds should be a non-negative integer number.",
        };
    }
    if (!isNumberValid(m_duration)) {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Match duration should be a non-negative integer number.",
        };
    }
    if (!isNumberValid(m_increment)) {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Match increment per move should be a non-negative integer number.",
        };
    }

    return api_callback(name, team_id, date, num_rounds, m_duration, m_increment, api_callback);
};

module.exports = {
    createArenaTournament,
    createSwissTournament,
};
