const INPUT_TYPES = require("../src/inputTypes");

describe("Validate tournament types", () => {
    it("should feature an entry for each tournament type", () => {
        expect(Object.entries(INPUT_TYPES).length).not.toBe(0);
        Object.entries(INPUT_TYPES).forEach(([key, val]) => {
            expect(typeof key).toBe("string");
            expect(typeof key).toBe("string");
            expect(key.toLowerCase()).toBe(val.toLowerCase());
        });
    });
});
