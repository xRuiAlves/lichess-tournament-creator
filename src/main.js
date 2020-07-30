const { printUsage } = require("./printer");
const ERRORS = require("./errors");
const TOURNAMENT_TYPES = require("./tournamentTypes");

const main = () => {
    if (process.argv.length < 8) {
        printUsage();
        throw { err: ERRORS.ARGS };
    }

    const tournament_type = process.argv[2].toLowerCase();

    if (tournament_type === TOURNAMENT_TYPES.SWISS) {
        if (process.argv.length < 9) {
            printUsage();
            throw { err: ERRORS.ARGS };
        }
        createSwissTournament(...process.argv.slice(3));
    } else if (tournament_type === TOURNAMENT_TYPES.ARENA) {
        createArenaTournament(...process.argv.slice(3));
    } else {
        throw { err: ERRORS.INVALID_TOURNAMENT_TYPE };
    }
};

const createArenaTournament = (name, date, t_duration, m_duration, m_increment) => {
    console.info(name);
    console.info(date);
    console.info(t_duration);
    console.info(m_duration);
    console.info(m_increment);
};

const createSwissTournament = (name, team_id,  date,  num_rounds,  m_duration,  m_increment) => {
    console.info(name);
    console.info(team_id);
    console.info(date);
    console.info(num_rounds);
    console.info(m_duration);
    console.info(m_increment);
};

module.exports = {
    main,
};
