/**
 * Print error to stderr
 * @param {Object} err
 * @param {String} msg
 */
const printError = (err, msg) => {
    console.error(`Code: ${err.code}`);
    console.error(`Reason: ${err.description}`);
    if (msg) {
        console.error(`Message: ${msg}`);
    }
};

/**
 * Print tool usage to stdout
 */
const printUsage = () => {
    console.info("usage:");
    console.info("lichess-tournament-creator arena <name> <date> <t_duration> <m_duration> <m_increment> <auth_token>");
    console.info("\tname:        tournament name");
    console.info("\tdate:        tournament date, in 'YYYY-MM-DD hh:mm:ss' format");
    console.info("\tt_duration:  tournament duration, in minutes");
    console.info("\tm_duration:  match duration, in minutes");
    console.info("\tm_increment: match increment per move, in seconds");
    console.info("\tauth_token:  lichess user authorization token");
    console.info("");
    console.info("lichess-tournament-creator swiss <name> <team_id> <date> <num_rounds> <m_duration> <m_increment> <auth_token>");
    console.info("\tname:        tournament name");
    console.info("\tteam_id:     team identification string");
    console.info("\tdate:        tournament date, in 'YYYY-MM-DD hh:mm:ss' format");
    console.info("\tnum_rounds:  tournament number of rounds");
    console.info("\tm_duration:  match duration, in minutes");
    console.info("\tm_increment: match increment per move, in seconds");
    console.info("\tauth_token:  lichess user authorization token");
    console.info("");
    console.info("lichess-tournament-creator file <file_name>");
    console.info("\tfile_name:  JSON file name");
};

module.exports = {
    printError,
    printUsage,
};
