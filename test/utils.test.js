const { isNumberValid, isDateFormatValid } = require("../src/utils");

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
        expect(isDateFormatValid("2019/12/25 06:30:00")).toBe(true);
    });

    it("should not validate invalid date strings", () => {
        expect(isDateFormatValid("2019/12-25 06:30:00")).toBe(false);
        expect(isDateFormatValid("2019-12/25 06:30:00")).toBe(false);
        expect(isDateFormatValid("2019-12-25 06.30.00")).toBe(false);
        expect(isDateFormatValid("2019-12-25_06:30:00")).toBe(false);
        expect(isDateFormatValid(" 2019-12-25 06:30:00")).toBe(false);
        expect(isDateFormatValid("2019-12-25 06:30:00 ")).toBe(false);
        expect(isDateFormatValid("2019-12-25  06:30:00")).toBe(false);
    });
});
