/* eslint-disable no-undef */
const { readInputFile, validateFileData } = require("../src/fileUtils");

describe("Correct file reading and validating", () => {
    it("should read a well-formed valid file", () => {
        const file_name = `${__dirname}/fixtures/valid.json`;
        const data = readInputFile(file_name);
        expect(typeof data).toBe("object");
    });
});

describe("Detect invalid file format and/or structure", () => {
    it("should validate a valid file", () => {
        const file_name = `${__dirname}/fixtures/valid.json`;
        const data = readInputFile(file_name);
        expect(validateFileData(data)).toBe(true);
    });

    it("should fail if input file is not JSON", () => {
        try {
            readInputFile(`${__dirname}/fixtures/not_json.txt`);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(7);
            expect(e.msg.includes("is not a valid JSON file")).toBe(true);
        }
    });

    it("should fail if auth_token is missing", () => {
        try {
            const data = readInputFile(`${__dirname}/fixtures/missing_auth_token.json`);
            validateFileData(data);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(8);
            expect(e.msg.includes("Missing Lichess API 'auth_token' field specification.")).toBe(true);
        }
    });

    it("should fail if tournaments are missing", () => {
        try {
            const data = readInputFile(`${__dirname}/fixtures/missing_tournaments.json`);
            validateFileData(data);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(8);
            expect(e.msg.includes("Missing 'tournaments' field specification.")).toBe(true);
        }
    });

    it("should fail if tournaments field has invalid type", () => {
        try {
            const data = readInputFile(`${__dirname}/fixtures/invalid_tournaments.json`);
            validateFileData(data);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(8);
            expect(e.msg.includes("The 'tournaments' field should be of Array type.")).toBe(true);
        }
    });

    it("should fail if tournaments array is empty", () => {
        try {
            const data = readInputFile(`${__dirname}/fixtures/empty_tournaments.json`);
            validateFileData(data);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(8);
            expect(e.msg.includes("The 'tournaments' array should not be empty.")).toBe(true);
        }
    });

    it("should fail if tournament type is missing", () => {
        try {
            const data = readInputFile(`${__dirname}/fixtures/missing_tournament_type.json`);
            validateFileData(data);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(8);
            expect(e.msg.includes("Missing 'type' field in tournament number 2")).toBe(true);
        }
    });

    it("should fail if tournament type is invalid", () => {
        try {
            const data = readInputFile(`${__dirname}/fixtures/invalid_tournament_type.json`);
            validateFileData(data);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(8);
            expect(e.msg.includes("Invalid 'type' field in tournament number 2")).toBe(true);
        }
    });

    it("should fail if tournament name is missing", () => {
        try {
            const data = readInputFile(`${__dirname}/fixtures/missing_tournament_name.json`);
            validateFileData(data);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(8);
            expect(e.msg.includes("Missing 'name' field in tournament number 1")).toBe(true);
        }
    });

    it("should fail if tournament date is missing", () => {
        try {
            const data = readInputFile(`${__dirname}/fixtures/missing_tournament_date.json`);
            validateFileData(data);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(8);
            expect(e.msg.includes("Missing 'date' field in tournament number 2")).toBe(true);
        }
    });

    it("should fail if tournament date is invalid", () => {
        try {
            const data = readInputFile(`${__dirname}/fixtures/invalid_tournament_date.json`);
            validateFileData(data);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(8);
            expect(e.msg.includes("Invalid 'date' field in tournament number 2")).toBe(true);
        }
    });

    it("should fail if tournament match info is missing", () => {
        try {
            const data = readInputFile(`${__dirname}/fixtures/missing_tournament_match.json`);
            validateFileData(data);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(8);
            expect(e.msg.includes("Missing 'match' field in tournament number 2")).toBe(true);
        }
    });

    it("should fail if tournament match duration is missing", () => {
        try {
            const data = readInputFile(`${__dirname}/fixtures/missing_tournament_match_duration.json`);
            validateFileData(data);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(8);
            expect(e.msg.includes("Missing 'match.duration' field in tournament number 2")).toBe(true);
        }
    });

    it("should fail if tournament match increment is missing", () => {
        try {
            const data = readInputFile(`${__dirname}/fixtures/missing_tournament_match_increment.json`);
            validateFileData(data);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(8);
            expect(e.msg.includes("Missing 'match.increment' field in tournament number 2")).toBe(true);
        }
    });

    it("should fail if tournament team_id is missing", () => {
        try {
            const data = readInputFile(`${__dirname}/fixtures/missing_tournament_team_id.json`);
            validateFileData(data);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(8);
            expect(e.msg.includes("Missing 'team_id' field in tournament number 1")).toBe(true);
        }
    });

    it("should fail if tournament num_rounds is missing", () => {
        try {
            const data = readInputFile(`${__dirname}/fixtures/missing_tournament_num_rounds.json`);
            validateFileData(data);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(8);
            expect(e.msg.includes("Missing 'num_rounds' field in tournament number 1")).toBe(true);
        }
    });

    it("should fail if tournament num_rounds is invalid", () => {
        try {
            const data = readInputFile(`${__dirname}/fixtures/invalid_tournament_num_rounds.json`);
            validateFileData(data);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(8);
            expect(e.msg.includes("Invalid 'num_rounds' field in tournament number 1")).toBe(true);
        }
    });

    it("should fail if tournament duration is missing", () => {
        try {
            const data = readInputFile(`${__dirname}/fixtures/missing_tournament_duration.json`);
            validateFileData(data);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(8);
            expect(e.msg.includes("Missing 'tournament_duration' field in tournament number 2")).toBe(true);
        }
    });

    it("should fail if tournament duration is invalid", () => {
        try {
            const data = readInputFile(`${__dirname}/fixtures/invalid_tournament_duration.json`);
            validateFileData(data);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(8);
            expect(e.msg.includes("Invalid 'tournament_duration' field in tournament number 2")).toBe(true);
        }
    });

    it("should fail if tournament match duration is invalid", () => {
        try {
            const data = readInputFile(`${__dirname}/fixtures/invalid_tournament_match_duration.json`);
            validateFileData(data);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(8);
            expect(e.msg.includes("Invalid 'match.duration' field in tournament number 2")).toBe(true);
        }
    });

    it("should fail if tournament match increment is invalid", () => {
        try {
            const data = readInputFile(`${__dirname}/fixtures/invalid_tournament_match_increment.json`);
            validateFileData(data);
            fail("Should have thrown exception");
        } catch (e) {
            expect(e.err.code).toBe(8);
            expect(e.msg.includes("Invalid 'match.increment' field in tournament number 1")).toBe(true);
        }
    });
});
