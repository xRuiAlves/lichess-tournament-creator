const axios = require("axios");
const { convertDateFormat } = require("./utils");

/**
 * Lichess API connector
 */
class LichessAPI {
    /**
     * LichessAPI constructor
     * @param {String} auth_token Lichess user authorization token
     */
    constructor(auth_token) {
        this.auth_token = auth_token;
    }

    /**
     * Create an Arena tournament
     * @param {String} name
     * @param {String} date
     * @param {Integer} t_duration
     * @param {Integer} m_duration
     * @param {Integer} m_increment
     * @returns {Promise} Axios request promise
     */
    createArenaTournament(name, date, t_duration, m_duration, m_increment) {
        return axios({
            method: "post",
            url: LichessAPI.URLS.CREATE_ARENA_TOURNAMENT_URL,
            headers: {
                "Authorization": `Bearer ${this.auth_token}`,
            },
            data: {
                "name": name,
                "startDate": convertDateFormat(date),
                "minutes": parseInt(t_duration, 10),
                "clockTime": parseInt(m_duration, 10),
                "clockIncrement": parseInt(m_increment, 10),
            },
        });
    }

    /**
     * Create a Swiss tournament
     * @param {String} name
     * @param {String} team_id
     * @param {String} date
     * @param {Integer} num_rounds
     * @param {Integer} m_duration
     * @param {Integer} m_increment
     * @returns {Promise} Axios request promise
     */
    createSwissTournament(name, team_id, date, num_rounds, m_duration, m_increment) {
        return axios({
            method: "post",
            url: `${LichessAPI.URLS.CREATE_SWISS_TOURNAMENT_URL}/${team_id}`,
            headers: {
                "Authorization": `Bearer ${this.auth_token}`,
            },
            data: {
                "name": name,
                "startsAt": convertDateFormat(date),
                "nbRounds": parseInt(num_rounds, 10),
                "clock": {
                    "limit": parseInt(m_duration, 10) * 60,
                    "increment": parseInt(m_increment, 10),
                },
            },
        });
    }
}

/**
 * API Urls used to access Lichess
 */
LichessAPI.URLS = Object.freeze({
    BASE_URL: "https://lichess.org",
    CREATE_ARENA_TOURNAMENT_URL: "https://lichess.org/api/tournament",
    CREATE_SWISS_TOURNAMENT_URL: "https://lichess.org/api/swiss/new",
    ARENA_TOURNAMENT_PAGE_URL: "https://lichess.org/tournament",
    SWISS_TOURNAMENT_PAGE_URL: "https://lichess.org/swiss",
});

module.exports = LichessAPI;
