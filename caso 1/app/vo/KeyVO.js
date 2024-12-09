class KeyVO {
  constructor(gameKey, gameName, keyOwner) {
    this.gameKey = gameKey;
    this.gameName = gameName;
    this.keyOwner = keyOwner;
  }

  // Getters
  getGameKey() {
    return this.gameKey;
  }

  getGameName() {
    return this.gameName;
  }

  getKeyOwner() {
    return this.keyOwner;
  }

  // Setters
  setGameKey(gameKey) {
    this.gameKey = gameKey;
  }

  setGameName(gameName) {
    this.gameName = gameName;
  }

  setKeyOwner(keyOwner) {
    this.keyOwner = keyOwner;
  }
}

export default KeyVO;