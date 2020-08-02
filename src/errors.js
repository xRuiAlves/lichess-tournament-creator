/**
 * Error types
 */
const ERRORS = Object.freeze({
    INSUFFICIENT_ARGS: {
        code: 1,
        description: "Insufficient arguments.",
    },
    INVALID_ARGS: {
        code: 2,
        description: "Invalid arguments.",
    },
    LICHESS_SERVER_ERROR: {
        code: 3,
        description: "Lichess server appears to have failed to process the request.",
    },
    LICHESS_BAD_REQUEST: {
        code: 4,
        description: "The request sent was invalid.",
    },
    LICHESS_UNKNOWN_ERROR: {
        code: 5,
        description: "Lichess unknown error occured.",
    },
    LICHESS_TOURNAMENT_LIMIT_EXCEEDED: {
        code: 6,
        description: "You have rechead the daily limit of tournament a user may create.",
    },
    INVALID_INPUT_FILE: {
        code: 7,
        description: "Invalid input file.",
    },
    INVALID_FILE_CONTENT: {
        code: 8,
        description: "Failed file parsing.",
    },
});

module.exports = ERRORS;
