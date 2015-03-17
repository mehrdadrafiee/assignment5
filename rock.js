#!/usr/bin/env node

//the following code is copied from
//http://www.reddit.com/r/dailyprogrammer/comments/23lfrf/4212014_challenge_159_easy_rock_paper_scissors/


var readline = require("readline"),
    util = require("util");

(function () {
    "use strict";

    var RPSLP = {
        nouns: ["Rock", "Paper", "Scissors", "Lizard", "Spock"],
        verbs: [
            [["x"],         ["covers"],    ["crushes"],    ["crushes"],    ["vaporizes"]],
            [["covers"],    ["x"],         ["cut"],        ["eats"],       ["disproves"]],
            [["crushes"],   ["cut"],       ["x"],          ["decapitate"], ["smashes"]],
            [["crushes"],   ["eats"],      ["decapitate"], ["x"],          ["poisons"]],
            [["vaporizes"], ["disproves"], ["smashes"],    ["poisons"],    ["x"]]
        ],
        scores: [
            [[0, 0],  [-1, 1], [1, -1], [1, -1], [-1, 1]],
            [[1, -1], [0, 0],  [-1, 1], [-1, 1], [1, -1]],
            [[-1, 1], [1, -1], [0, 0],  [1, -1], [-1, 1]],
            [[-1, 1], [1, -1], [-1, 1], [0, 0],  [1, -1]],
            [[1, -1], [-1, 1], [1, -1], [-1, 1], [0, 0]]
        ],
        totals: {
            games: 0,
            computer: 0,
            human: 0,
            ties: 0
        },
        arraySearch: function (needle, haystack) {
            var index = false;

            haystack.forEach(function (val, i) {
                if (needle === haystack[i]) {
                    index = i;
                }
            });

            return index;
        },
        playGame: function (choice) {
            var human = Math.floor(Math.random() * 5),
                computer = Math.floor(Math.random() * 5),
                scores = [],
                verb = "";

            if (choice && choice.length > 0) {
                choice = choice.charAt(0).toUpperCase() + choice.slice(1).toLowerCase();
                human = this.arraySearch(choice, this.nouns);

                if (human === false) {
                    console.log("Invalid choice. Try again.");
                    return false;
                }
            }

            scores = this.scores[human][computer];
            verb = this.verbs[human][computer];

            human = this.nouns[human];
            computer = this.nouns[computer];

            console.log(util.format("Player Picks:   %s", human));
            console.log(util.format("Computer Picks: %s", computer));

            if (scores[0] === scores[1]) {
                console.log("\nTie!\n");
                this.totals.ties += 1;
            }

            if (scores[0] < scores[1]) {
                console.log(util.format("\n%s %s %s. Computer wins!\n", computer, verb, human));
                this.totals.computer += 1;
            }

            if (scores[0] > scores[1]) {
                console.log(util.format("\n%s %s %s. You win!\n", human, verb, computer));
                this.totals.human += 1;
            }

            this.totals.games += 1;

            return true;
        },
        gamePrompt: function (rl, i, max) {
            var $this = this,
                inc = 0;

            i = i || 0;
            max = max || 10;

            if (i >= max) {
                rl.close();
                this.final();

                process.exit();
            }

            rl.question("Rock, paper, scissors, lizard, spock? ", function (choice) {
                inc  = (!$this.playGame(choice)) ? 0 : 1;

                $this.gamePrompt(rl, i + inc, max);
            });
        },
        final: function () {
            var totals = this.totals;

            console.log(util.format("Total games played: %d", totals.games));
            console.log(util.format("Computer wins:      %d (%d%)", totals.computer, ((totals.computer / totals.games) * 100).toFixed(2)));
            console.log(util.format("Human wins:         %d (%d%)", totals.human, ((totals.human / totals.games) * 100).toFixed(2)));
            console.log(util.format("Ties:               %d (%d%)", totals.ties, ((totals.ties / totals.games) * 100).toFixed(2)));
        },
        init: function () {
            var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            this.gamePrompt(rl);
        }
    };

    RPSLP.init();
}());