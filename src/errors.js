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
});

module.exports = ERRORS;
