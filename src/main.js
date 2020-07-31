const { printUsage, printError } = require("./printer");
const ERRORS = require("./errors");
const TOURNAMENT_TYPES = require("./tournamentTypes");
const { validateArenaTournamentParams, validateSwissTournamentParams } = require("./tournamentValidator");
const LichessAPI = require("./lichessAPI");

const main = () => {
    if (process.argv.length < 9) {
        printUsage();
        throw { err: ERRORS.INSUFFICIENT_ARGS };
    }

    const tournament_type = process.argv[2].toLowerCase();

    if (tournament_type === TOURNAMENT_TYPES.SWISS && process.argv.length < 10) {
        printUsage();
        throw { err: ERRORS.INSUFFICIENT_ARGS };
    }

    const auth_token = process.argv[tournament_type === TOURNAMENT_TYPES.ARENA ? 8 : 9];
    const lichessAPI = new LichessAPI(auth_token);

    if (tournament_type === TOURNAMENT_TYPES.ARENA) {
        validateArenaTournamentParams(...process.argv.slice(3));
        lichessAPI.validateArenaTournamentParams(...process.argv.slice(3))
            .then((res) => console.info(`Created: ${LichessAPI.URLS.TOURNAMENT_PAGE_URL}/${res.data.id}`))
            .catch(handleBadResponse);
    } else if (tournament_type === TOURNAMENT_TYPES.SWISS) {
        validateSwissTournamentParams(...process.argv.slice(3));
    } else {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Invalid tournament type (must be 'swiss' or 'arena')",
        };
    }
};

const handleBadResponse = ({ response }) => {
    if (response.status === 500) {
        printError(ERRORS.LICHESS_SERVER_ERROR);
        process.exit(ERRORS.LICHESS_SERVER_ERROR.code);
    } else if (response.status === 400) {
        printError(ERRORS.LICHESS_BAD_REQUEST, `Lichess error message was:\n${JSON.stringify(response.data, null, 2)}`);
        process.exit(ERRORS.LICHESS_BAD_REQUEST.code);
    } else {
        printError(ERRORS.LICHESS_UNKNOWN_ERROR);
        process.exit(ERRORS.LICHESS_UNKNOWN_ERROR.code);
    }
};

module.exports = {
    main,
};
