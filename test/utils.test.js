const { isNumberValid, isDateFormatValid, convertDateFormat } = require("../src/utils");

describe("Validate numbers in a range", () => {
    it("should validate valid non-negative integers", () => {
        expect(isNumberValid(70)).toBe(true);
        expect(isNumberValid(0)).toBe(true);
        expect(isNumberValid(1)).toBe(true);
    });

    it("should not validate non-numbers", () => {
        expect(isNumberValid("number")).toBe(false);
        expect(isNumberValid({})).toBe(false);
        expect(isNumberValid([])).toBe(false);
        expect(isNumberValid(/^\d$/)).toBe(false);
    });

    it("should not validate non-integer numbers", () => {
        expect(isNumberValid(1.5)).toBe(false);
    });

    it("should not validate negative integers", () => {
        expect(isNumberValid(-50)).toBe(false);
        expect(isNumberValid(-1)).toBe(false);
    });
});

describe("Validate date string format", () => {
    it("should validate valid date strings", () => {
        expect(isDateFormatValid("2019-12-25 06:30:00")).toBe(true);
    });

    it("should not validate invalid date strings", () => {
        expect(isDateFormatValid("2019/12/25 06:30:00")).toBe(false);
        expect(isDateFormatValid("2019/12-25 06:30:00")).toBe(false);
        expect(isDateFormatValid("2019-12/25 06:30:00")).toBe(false);
        expect(isDateFormatValid("2019-12-25 06.30.00")).toBe(false);
        expect(isDateFormatValid("2019-12-25_06:30:00")).toBe(false);
        expect(isDateFormatValid(" 2019-12-25 06:30:00")).toBe(false);
        expect(isDateFormatValid("2019-12-25 06:30:00 ")).toBe(false);
        expect(isDateFormatValid("2019-12-25  06:30:00")).toBe(false);
    });
});

describe("Convert date string", () => {
    it("should throw when input date format is not valid", () => {
        expect(
            () => convertDateFormat(),
        ).toThrowError("Invalid input date format.");

        expect(
            () => convertDateFormat("30 July, 2020"),
        ).toThrowError("Invalid input date format.");
    });

    it("should convert to epoch-milis format", () => {
        expect(
            convertDateFormat("2020-07-30 09:30:15") - ((new Date("2020-07-30T09:30:15")).getTimezoneOffset() * 60 * 1000),
        ).toBe(1596101415000);

        expect(
            convertDateFormat("1970-01-01 00:00:00") - ((new Date("1970-01-01T00:00:00")).getTimezoneOffset() * 60 * 1000),
        ).toBe(0);
    });
});
