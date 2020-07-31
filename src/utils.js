/**
 * 'YYYY-MM-DD hh:mm:ss' Date format regex
 */
const DATE_FORMAT_REGEX = /^(\d{4}-\d{2}-\d{2}|\d{4}\/\d{2}\/\d{2}) \d{2}:\d{2}:\d{2}$/;

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

module.exports = {
    isNumberValid,
    isDateFormatValid,
};
