class Game {
  constructor(options = {}) {
    this.players = new Array();
    this.places = new Array(6);
    this.purses = new Array(6);


    this.popQuestions = new Array();
    this.scienceQuestions = new Array();
    this.sportsQuestions = new Array();
    this.rockQuestions = new Array();

    this.categories = ["Pop", "Science", "Sports", "Rock"];
    this.questionIndexes = { "Pop": 0, "Science": 0, "Sports": 0, "Rock": 0 };

    this.inPenaltyBox = new Array(6);
    this.currentPlayer = 0;
    this.isGettingOutOfPenaltyBox = false;

    for (let i = 0; i < 50; i++) {
      this.popQuestions.push(`Pop Question ${i}`);
      this.scienceQuestions.push(`Science Question ${i}`);
      this.sportsQuestions.push(`Sports Question ${i}`);
      this.rockQuestions.push(`Rock Question ${i}`);
    };
  };

  didPlayerWin() {
    return !(this.purses[this.currentPlayer] === 6);
  };

  switchPlayer() {
    this.currentPlayer += 1;
    if (this.currentPlayer === this.players.length) {
      this.currentPlayer = 0;
    };
  };

  currentCategory() {
    return this.categories[this.places[this.currentPlayer] % 4];
  };

  addPlayer(playerName) {
    this.players.push(playerName);
    const playerIndex = this.players.length - 1;

    this.places[playerIndex] = 0;
    this.purses[playerIndex] = 0;
    this.inPenaltyBox[playerIndex] = false;
    console.log(`${playerName} was added`);
    console.log(`They are player number ${this.players.length}`);
    return true;
  };

  incrementAndFetchQuestion(category) {
    const question = `${category} Question ${this.questionIndexes[category]}`;
    this.questionIndexes[category]++;
    return question;
  };

  askQuestion() {
    const question = this.incrementAndFetchQuestion(this.currentCategory());
    console.log(question);
  };

  takeTurn(roll) {
    this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
    if (this.places[this.currentPlayer] > 11) {
      this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
    }
    console.log(`${this.players[this.currentPlayer]}'s new location is ` +
      `${this.places[this.currentPlayer]}`
    );
    console.log(`The category is ${this.currentCategory()}`);
    this.askQuestion();
  };

  roll(roll) {
    console.log(`${this.players[this.currentPlayer]} is the current player`);
    console.log(`They have rolled a ${roll}`);
    if (this.inPenaltyBox[this.currentPlayer]) {
      if (roll % 2 != 0) {
        this.isGettingOutOfPenaltyBox = true;
        console.log(`${this.players[this.currentPlayer]} is getting out of the penalty box`);
        this.takeTurn(roll);
      }
      else {
        console.log(`${this.players[this.currentPlayer]} is not getting out of the penalty box`);
        this.isGettingOutOfPenaltyBox = false;
      }
    }
    else {
      this.takeTurn(roll);
    }
  };

  wasCorrectlyAnswered() {
    if (this.inPenaltyBox[this.currentPlayer] && !this.isGettingOutOfPenaltyBox) {
      this.switchPlayer();
      return true;
    }
    else {
      console.log("Answer was correct!!!!");
      this.purses[this.currentPlayer] += 1;
      console.log(`${this.players[this.currentPlayer]} now has` +
        ` ${this.purses[this.currentPlayer]} Gold Coins.`
      );
      const winner = this.didPlayerWin();
      this.switchPlayer();
      return winner;
    }
  };

  wrongAnswer() {
    console.log("Question was incorrectly answered");
    console.log(`${this.players[this.currentPlayer]} was sent to the penalty box`);
    this.inPenaltyBox[this.currentPlayer] = true;
    this.switchPlayer();
    return true;
  };

};

let notAWinner = false;

const game = new Game();

game.addPlayer("Chet");
game.addPlayer("Pat");
game.addPlayer("Sue");

do {

  game.roll(Math.floor(Math.random() * 6) + 1);

  if (Math.floor(Math.random() * 10) === 7) {
    notAWinner = game.wrongAnswer();
  } else {
    notAWinner = game.wasCorrectlyAnswered();
  }

} while (notAWinner);

module.exports = Game;