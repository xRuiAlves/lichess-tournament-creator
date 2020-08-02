const { printUsage, printError } = require("./printer");
const ERRORS = require("./errors");
const INPUT_TYPES = require("./inputTypes");
const { validateArenaTournamentParams, validateSwissTournamentParams } = require("./tournamentValidator");
const { readInputFile, validateFileData } = require("./fileUtils");
const LichessAPI = require("./lichessAPI");

const main = () => {
    if (process.argv.length < 4) {
        printUsage();
        throw { err: ERRORS.INSUFFICIENT_ARGS };
    }

    const input_type = process.argv[2].toLowerCase();

    if (input_type === INPUT_TYPES.SWISS && process.argv.length < 10) {
        printUsage();
        throw { err: ERRORS.INSUFFICIENT_ARGS };
    }
    if (input_type === INPUT_TYPES.ARENA && process.argv.length < 9) {
        printUsage();
        throw { err: ERRORS.INSUFFICIENT_ARGS };
    }

    if (input_type === INPUT_TYPES.ARENA) {
        const auth_token = process.argv[8];
        const lichessAPI = new LichessAPI(auth_token);
        validateArenaTournamentParams(...process.argv.slice(3));
        lichessAPI.createArenaTournament(...process.argv.slice(3))
            .then((res) => handleSucessResponse(res, "arena"))
            .catch(handleBadResponse);
    } else if (input_type === INPUT_TYPES.SWISS) {
        const auth_token = process.argv[9];
        const lichessAPI = new LichessAPI(auth_token);
        validateSwissTournamentParams(...process.argv.slice(3));
        lichessAPI.createSwissTournament(...process.argv.slice(3))
            .then((res) => handleSucessResponse(res, "swiss"))
            .catch(handleBadResponse);
    } else if (input_type === INPUT_TYPES.FILE) {
        const file_name = process.argv[3];
        const data = readInputFile(file_name);
        validateFileData(data);
        console.info(data);
    } else {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Invalid tournament type (must be 'swiss' or 'arena')",
        };
    }
};

const handleSucessResponse = ({ status, data }, type) => {
    if (status === 200 && data.id) {
        const url = type === "arena" ? LichessAPI.URLS.ARENA_TOURNAMENT_PAGE_URL : LichessAPI.URLS.SWISS_TOURNAMENT_PAGE_URL;
        console.info(`Created: ${url}/${data.id}`);
    } else if (status === 200 && !data.id) {
        printError(ERRORS.LICHESS_TOURNAMENT_LIMIT_EXCEEDED);
        process.exit(ERRORS.LICHESS_TOURNAMENT_LIMIT_EXCEEDED.code);
    } else {
        printError(ERRORS.LICHESS_UNKNOWN_ERROR);
        process.exit(ERRORS.LICHESS_UNKNOWN_ERROR.code);
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
        printError(
            ERRORS.LICHESS_UNKNOWN_ERROR,
            `Response status code was: ${response.status}\nError message was:\n${JSON.stringify(response.data, null, 2)}`,
        );
        process.exit(ERRORS.LICHESS_UNKNOWN_ERROR.code);
    }
};

module.exports = {
    main,
};
