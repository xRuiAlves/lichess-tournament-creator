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
});

module.exports = ERRORS;
