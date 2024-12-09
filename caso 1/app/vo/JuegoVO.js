class JuegoVO {
  constructor(gameName, gameGenre, gameRate, gamePoster, gameDescription) {
    this.gameName = gameName;
    this.gameGenre = gameGenre;
    this.gameRate = gameRate;
    this.gamePoster = gamePoster;
    this.gameDescription = gameDescription;
  }

  // Getters
  getGameName() {
    return this.gameName;
  }

  getGameGenre() {
    return this.gameGenre;
  }

  getGameRate() {
    return this.gameRate;
  }

  getGamePoster() {
    return this.gamePoster;
  }

  getGameDescription() {
    return this.gameDescription;
  }

  // Setters
  setGameName(gameName) {
    this.gameName = gameName;
  }

  setGameGenre(gameGenre) {
    this.gameGenre = gameGenre;
  }

  setGameRate(gameRate) {
    this.gameRate = gameRate;
  }

  setGamePoster(gamePoster) {
    this.gamePoster = gamePoster;
  }

  setGameDescription(gameDescription) {
    this.gameDescription = gameDescription;
  }
}

export default JuegoVO;