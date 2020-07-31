const { printUsage } = require("./printer");
const ERRORS = require("./errors");
const TOURNAMENT_TYPES = require("./tournamentTypes");
const { createArenaTournament, createSwissTournament } = require("./tournamentCreator");

const main = () => {
    if (process.argv.length < 8) {
        printUsage();
        throw { err: ERRORS.INSUFFICIENT_ARGS };
    }

    const tournament_type = process.argv[2].toLowerCase();

    if (tournament_type === TOURNAMENT_TYPES.ARENA) {
        createArenaTournament(...process.argv.slice(3));
    } else if (tournament_type === TOURNAMENT_TYPES.SWISS) {
        if (process.argv.length < 9) {
            printUsage();
            throw { err: ERRORS.INSUFFICIENT_ARGS };
        }
        createSwissTournament(...process.argv.slice(3));
    } else {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Invalid tournament type (must be 'swiss' or 'arena')",
        };
    }
};

module.exports = {
    main,
};
