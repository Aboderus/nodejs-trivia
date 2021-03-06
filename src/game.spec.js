const Should = require('should');
const Game = require('./game.js');

describe("The test environment", function () {
  it("should pass", function () {
    (true).should.equal(true);
  });

  it("should access game", function () {
    Should(Game).not.equal(undefined);
  });
});


describe("Increment questions", function () {
  const game = new Game();

  it("should return incrementing questions from category", function () {
    const categoryOne = game.categories[0];
    const categoryTwo = game.categories[1]
    const questionOne = game.incrementAndFetchQuestion(categoryOne);
    const questionTwo = game.incrementAndFetchQuestion(categoryOne);
    const questionOtherCategory = game.incrementAndFetchQuestion(categoryTwo);
    Should(questionOne).equal(`${categoryOne} Question 0`);
    Should(questionTwo).not.equal(questionOne);
    Should(questionOne).not.equal(questionOtherCategory);
  });
});

describe("takeTurn increments and resets places", function () {
  const game = new Game();

  it("should increment after each takeTurn. When it goes over 11 it should reset to within span.", function () {
    game.addPlayer("Alfa");
    game.takeTurn(10);
    Should(game.places[game.currentPlayer]).equal(10);
    game.takeTurn(3);
    Should(game.places[game.currentPlayer]).equal(1);
  });
});

describe("Test addPlayer", function () {
  const game = new Game();

  it("Should add players and set correct player values.", function () {
    const names = ["Alfa", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "eta"]
    names.forEach((name, index) => {
      game.addPlayer(name);
      should(game.players[index]).equal(name);
      should(game.places[index]).equal(0);
      should(game.purses[index]).equal(0);
      should(game.inPenaltyBox[index]).equal(false);
    });
    Should(game.players.length).equal(names.length);
  });
});
