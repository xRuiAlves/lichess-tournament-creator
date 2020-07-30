const TOURNAMENT_TYPES = require("../src/tournamentTypes");

describe("Validate tournament types", () => {
    it("should feature an entry for each tournament type", () => {
        expect(Object.entries(TOURNAMENT_TYPES).length).not.toBe(0);
        Object.entries(TOURNAMENT_TYPES).forEach(([key, val]) => {
            expect(typeof key).toBe("string");
            expect(typeof key).toBe("string");
            expect(key.toLowerCase()).toBe(val.toLowerCase());
        });
    });
});
