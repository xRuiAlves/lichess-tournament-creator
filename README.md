# Lichess Tournament Creator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://img.shields.io/npm/v/lichess-tournament-creator.svg?style=flat-square)](https://www.npmjs.com/package/lichess-tournament-creator)
[![Build Status](https://circleci.com/gh/xRuiAlves/lichess-tournament-creator.svg?style=shield)](https://circleci.com/gh/xRuiAlves/lichess-tournament-creator)
[![Coverage Status](https://coveralls.io/repos/github/xRuiAlves/lichess-tournament-creator/badge.svg?branch=master)](https://coveralls.io/github/xRuiAlves/lichess-tournament-creator?branch=master)

CLI tool to create Lichess chess tournaments, built using NodeJS.

## Features

- Quickly creating a single Lichess tournament (Arena or Swiss format)
- Bulk creating a set of defined tournaments in a configuration file

## Installing

Using npm:

```
$ npm i -g lichess-tournament-creator
```

## Usage

```
$ lichess-tournament-creator <type> [...params]
```

- `type`:
    - `arena`: create Arena format tournament
        - `name`: tournament name
        - `date`: tournament date, in 'YYYY-MM-DD hh:mm:ss' format
        - `tournament_duration`: tournament duration, in minutes
        - `match_duration`: match duration, in minutes
        - `match_increment`: match increment per move, in seconds
        - `auth_token`: [lichess API authorization token](https://lichess.org/account/oauth/token)
    - `arena`: create Swiss format tournament
        - `name`: tournament name
        - `team_id`: team identification string
        - `date`: tournament date, in 'YYYY-MM-DD hh:mm:ss' format
        - `num_rounds`: tournament number of rounds
        - `match_duration`: match duration, in minutes
        - `match_increment`: match increment per move, in seconds
        - `auth_token`: [lichess API authorization token](https://lichess.org/account/oauth/token)
    - `file`: create a set of tournaments via configuration file
        - `file_name`: JSON file name (format explained below)

### Examples

```
$ lichess-tournament-creator arena "First anual chess meetup" "2021-01-01 16:30:00" 80 3 2 authtokenxpto123
```

```
$ lichess-tournament-creator swiss "Swiss-cheese open" switzerland-chess-club "2021-05-20 15:10:00" 7 5 3 authtokenxpto123
```

```
$ lichess-tournament-creator file my_tournaments.json
```

### JSON tournaments file format

The JSON tournaments input file should follow the following format:

```javascript
{
    "auth_token": "authtokenxpto123",   // lichess API authorization token, used in all requests
    "tournaments": [
        {
            "name": "First anual chess meetup",
            "type": "arena",
            "date": "2021-01-01 16:30:00",
            "tournament_duration": 80,
            "match": {
                "duration": 3,
                "increment": 2
            }
        },
        {
            "name": "Swiss-cheese open",
            "type": "swiss",
            "team_id": "switzerland-chess-club",
            "date": "2021-05-20 15:10:00",
            "num_rounds": 7,
            "match": {
                "duration": 5,
                "increment": 3
            }
        }
    ] 
}
```

## Usage considerations

- The Lichess API only allows a limit of tournaments created per user, per day (12 public tournaments or 24 private tournaments)
- The generated authorization should feature permission for tournament creating
- In order to create a swiss format tournament for a team, the user must be an admin of the team (to have the required permissions)

## Tests

To run the test suite, install the project's dependencies and run `npm test`:

```
$ npm install
$ npm test
```

## Future work

- Allows public/private tournament specification, along with other tournament-tweaking options that are not available at the moment
- Improve error lichess API error handling, displaying it in a more user-friendly format

## License

[MIT](https://github.com/xRuiAlves/lichess-tournament-creator/blob/master/LICENSE)
