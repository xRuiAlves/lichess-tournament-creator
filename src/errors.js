/**
 * Error types
 */
const ERRORS = Object.freeze({
    ARGS: {
        code: 1,
        description: "Insufficient arguments.",
    },
    INVALID_TOURNAMENT_TYPE: {
        code: 2,
        description: "Invalid tournament type (must be 'swiss' or 'arena')",
    },
});

module.exports = ERRORS;
