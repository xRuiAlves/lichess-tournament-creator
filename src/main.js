const { printUsage, printError } = require("./printer");
const ERRORS = require("./errors");
const INPUT_TYPES = require("./inputTypes");
const { readInputFile, validateFileData } = require("./fileUtils");
const LichessAPI = require("./lichessAPI");

const main = async () => {
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
        createArenaTournament(...process.argv.slice(3));
    } else if (input_type === INPUT_TYPES.SWISS) {
        createSwissTournament(...process.argv.slice(3));
    } else if (input_type === INPUT_TYPES.FILE) {
        const file_name = process.argv[3];
        const data = readInputFile(file_name);
        const { auth_token, tournaments } = data;

        validateFileData(data);
        const lichessAPI = new LichessAPI(auth_token);

        for (let i = 0; i < tournaments.length; ++i) {
            console.info(`Creating tournament ${i + 1}...`);
            try {
                const tournament = tournaments[i];
                if (tournament.type === "arena") {
                    const res = await lichessAPI.createArenaTournament(
                        tournament.name,
                        tournament.date,
                        tournament.tournament_duration,
                        tournament.match.duration,
                        tournament.match.increment,
                    );
                    console.info(`Created tournament ${i + 1}: ${handleSucessResponse(res, "arena")}`);
                } else if (tournament.type === "swiss") {
                    const res = await lichessAPI.createSwissTournament(
                        tournament.name,
                        tournament.team_id,
                        tournament.date,
                        tournament.num_rounds,
                        tournament.match.duration,
                        tournament.match.increment,
                    );
                    console.info(`Created tournament ${i + 1}: ${handleSucessResponse(res, "swiss")}`);
                }
            } catch (e) {
                handleBadResponse(e);
            }
        }
    } else {
        throw {
            err: ERRORS.INVALID_ARGS,
            msg: "Invalid tournament type (must be 'swiss' or 'arena')",
        };
    }
};

const createArenaTournament = (name, date, t_duration, m_duration, m_increment, auth_token) => {
    const lichessAPI = new LichessAPI(auth_token);
    lichessAPI.createArenaTournament(name, date, t_duration, m_duration, m_increment)
        .then((res) => console.info(`Created: ${handleSucessResponse(res, "arena")}`))
        .catch(handleBadResponse);
};

const createSwissTournament = (name, team_id, date, num_rounds, m_duration, m_increment, auth_token) => {
    const lichessAPI = new LichessAPI(auth_token);
    lichessAPI.createSwissTournament(name, team_id, date, num_rounds, m_duration, m_increment)
        .then((res) => console.info(`Created: ${handleSucessResponse(res, "swiss")}`))
        .catch(handleBadResponse);
};

const handleSucessResponse = ({ status, data }, type) => {
    if (status === 200 && data.id) {
        const url = type === "arena" ? LichessAPI.URLS.ARENA_TOURNAMENT_PAGE_URL : LichessAPI.URLS.SWISS_TOURNAMENT_PAGE_URL;
        return `${url}/${data.id}`;
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
