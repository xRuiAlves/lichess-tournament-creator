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

    validateArenaTournamentParams(name, date, t_duration, m_duration, m_increment) {
        return axios({
            method: "post",
            url: LichessAPI.URLS.CREATE_TOURNAMENT_URL,
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
}

LichessAPI.URLS = Object.freeze({
    BASE_URL: "https://lichess.org",
    CREATE_TOURNAMENT_URL: "https://lichess.org/api/tournament",
    TOURNAMENT_PAGE_URL: "https://lichess.org/tournament",
});

module.exports = LichessAPI;
