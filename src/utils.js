/**
 * 'YYYY-MM-DD hh:mm:ss' Date format regex
 */
const DATE_FORMAT_REGEX = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

/**
 * Validates if a number is a non-negative integer
 * @param {Integer} number
 * @returns {Boolean} True if valid, false otherwise
 */
const isNumberValid = (number) => (
    typeof number === "number" &&
    Number.isInteger(number) &&
    number >= 0
);

/**
 * Validates if a date string is in the 'YYYY-MM-DD hh:mm:ss' format
 * @param {String} date
 * @returns {Boolean} True if valid, false otherwise
 */
const isDateFormatValid = (date) => DATE_FORMAT_REGEX.test(date);

/**
 * Convert 'YYYY-MM-DD hh:mm:ss' date format to epoch-milis format
 * @param {String} date_str
 * @throws {Error}
 * @returns {Integer} Date in epoch format
 */
const convertDateFormat = (date_str) => {
    if (!isDateFormatValid(date_str)) {
        throw new Error("Invalid input date format.");
    }

    const [date, time] = date_str.split(" ");
    return (new Date(`${date}T${time}`)).getTime();
};

module.exports = {
    isNumberValid,
    isDateFormatValid,
    convertDateFormat,
};
