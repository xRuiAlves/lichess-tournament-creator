/* eslint-disable no-undef */
const { validateArenaTournamentParams, validateSwissTournamentParams } = require("../src/tournamentValidator");
const ERRORS = require("../src/errors");

describe("Arena tournament creating - parameters validation", () => {
    it("should detect invalid tournament name", () => {
        try {
            validateArenaTournamentParams("");
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Tournament name should not be empty.");
        }
    });

    it("should detect invalid tournament date", () => {
        try {
            validateArenaTournamentParams("Arena Tournament", "20 Set, 2050");
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Tournament date should be specified in a 'YYYY-MM-DD hh:mm:ss' format.");
        }
    });

    it("should detect invalid tournament duration", () => {
        try {
            validateArenaTournamentParams("Arena Tournament", "2045-12-25 06:30:00", -10);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Tournament duration should be a non-negative integer number.");
        }
    });

    it("should detect invalid match duration", () => {
        try {
            validateArenaTournamentParams("Arena Tournament", "2045-12-25 06:30:00", 90, "not number");
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Match duration should be a non-negative integer number.");
        }
    });

    it("should detect invalid match increment per move", () => {
        try {
            validateArenaTournamentParams("Arena Tournament", "2045-12-25 06:30:00", 90, 5, null);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Match increment per move should be a non-negative integer number.");
        }
    });

    it("should create tournament with valid inputs given", () => {
        expect(
            () => validateArenaTournamentParams("Arena Tournament", "2045-12-25 06:30:00", 90, 5, 3),
        ).not.toThrow();
    });
});

describe("Swiss tournament creating - parameters validation", () => {
    it("should detect invalid tournament name", () => {
        try {
            validateSwissTournamentParams("");
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Tournament name should not be empty.");
        }
    });

    it("should detect invalid tournament team ID", () => {
        try {
            validateSwissTournamentParams("Swiss Tournament", "");
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Team ID should not be empty.");
        }
    });

    it("should detect invalid tournament date", () => {
        try {
            validateSwissTournamentParams("Swiss Tournament", "1234567890abcdef", "20 Set, 2050");
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Tournament date should be specified in a 'YYYY-MM-DD hh:mm:ss' format.");
        }
    });

    it("should detect invalid tournament number of rounds", () => {
        try {
            validateSwissTournamentParams("Swiss Tournament", "1234567890abcdef", "2045-12-25 06:30:00", -10);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Tournament number of rounds should be a non-negative integer number.");
        }
    });

    it("should detect invalid tournament match duration", () => {
        try {
            validateSwissTournamentParams("Swiss Tournament", "1234567890abcdef", "2045-12-25 06:30:00", 7, null);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Match duration should be a non-negative integer number.");
        }
    });

    it("should detect invalid tournament match increment per move", () => {
        try {
            validateSwissTournamentParams("Swiss Tournament", "1234567890abcdef", "2045-12-25 06:30:00", 7, 5, "not a number");
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Match increment per move should be a non-negative integer number.");
        }
    });

    it("should create tournament with valid inputs given", () => {
        expect(
            () => validateSwissTournamentParams("Swiss Tournament", "1234567890abcdef", "2045-12-25 06:30:00", 7, 5, 3),
        ).not.toThrow();
    });
});
