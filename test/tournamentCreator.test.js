/* eslint-disable no-undef */
const { createArenaTournament, createSwissTournament } = require("../src/tournamentCreator");
const ERRORS = require("../src/errors");

// eslint-disable-next-line require-await
const api_callback = () => {};

describe("Arena tournament creating - parameters validation", () => {
    it("should detect invalid tournament name", () => {
        try {
            createArenaTournament("");
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Tournament name should not be empty.");
        }
    });

    it("should detect invalid tournament date", () => {
        try {
            createArenaTournament("Arena Tournament", "20 Set, 2050");
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Tournament date should be specified in a 'YYYY-MM-DD hh:mm:ss' format.");
        }
    });

    it("should detect invalid tournament duration", () => {
        try {
            createArenaTournament("Arena Tournament", "2045-12-25 06:30:00", -10);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Tournament duration should be a non-negative integer number.");
        }
    });

    it("should detect invalid match duration", () => {
        try {
            createArenaTournament("Arena Tournament", "2045-12-25 06:30:00", 90, "not number");
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Match duration should be a non-negative integer number.");
        }
    });

    it("should detect invalid match increment per move", () => {
        try {
            createArenaTournament("Arena Tournament", "2045-12-25 06:30:00", 90, 5, [3]);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Match increment per move should be a non-negative integer number.");
        }
    });

    it("should create tournament with valid inputs given", () => {
        expect(
            () => createArenaTournament("Arena Tournament", "2045-12-25 06:30:00", 90, 5, 3, api_callback),
        ).not.toThrow();
    });
});

describe("Swiss tournament creating - parameters validation", () => {
    it("should detect invalid tournament name", () => {
        try {
            createSwissTournament("");
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Tournament name should not be empty.");
        }
    });

    it("should detect invalid tournament team ID", () => {
        try {
            createSwissTournament("Swiss Tournament", "");
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Team ID should not be empty.");
        }
    });

    it("should detect invalid tournament date", () => {
        try {
            createSwissTournament("Swiss Tournament", "1234567890abcdef", "20 Set, 2050");
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Tournament date should be specified in a 'YYYY-MM-DD hh:mm:ss' format.");
        }
    });

    it("should detect invalid tournament number of rounds", () => {
        try {
            createSwissTournament("Swiss Tournament", "1234567890abcdef", "2045-12-25 06:30:00", -10);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Tournament number of rounds should be a non-negative integer number.");
        }
    });

    it("should detect invalid tournament match duration", () => {
        try {
            createSwissTournament("Swiss Tournament", "1234567890abcdef", "2045-12-25 06:30:00", 7, null);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Match duration should be a non-negative integer number.");
        }
    });

    it("should detect invalid tournament match increment per move", () => {
        try {
            createSwissTournament("Swiss Tournament", "1234567890abcdef", "2045-12-25 06:30:00", 7, 5, "not a number");
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(ERRORS.INVALID_ARGS.code);
            expect(e.msg).toBe("Match increment per move should be a non-negative integer number.");
        }
    });

    it("should create tournament with valid inputs given", () => {
        expect(
            () => createSwissTournament("Swiss Tournament", "1234567890abcdef", "2045-12-25 06:30:00", 7, 5, 3, api_callback),
        ).not.toThrow();
    });
});
