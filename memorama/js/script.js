class Memorama {
  constructor() {
    this.canPlay = false;
    this.card1 = null;
    this.card2 = null;
    this.availableImages = [1, 2, 3, 4, 5];
    this.orderForThisRound = [];
    this.cards = Array.from(document.querySelectorAll(".board-game figure"));
    this.maxPairNumber = this.availableImages.length;
    this.startGame();
    this.turno = 1;
    this.jugador1 = 0;
    this.jugador2 = 0;
    this.modo = 0;
  }

  startGame() {
    this.modo = parseInt(prompt("1. SOLITARIO\n2. DOS JUGADORES"));
    if (this.modo === 1 || this.modo === 2) {
      this.foundPairs = 0;
      this.setNewOrder();
      this.setImagesInCards();
      this.openCards();
    } else {
      alert("INSERTA UNA OPCION VALIDA: ");
      this.startGame();
    }
  }

  setNewOrder() {
    this.orderForThisRound = this.availableImages.concat(this.availableImages);
    this.orderForThisRound.sort(() => Math.random() - 0.5);
  }

  setImagesInCards() {
    for (const key in this.cards) {
      const card = this.cards[key];
      const image = this.orderForThisRound[key];
      const imgLabel = card.children[1].children[0];
      card.dataset.image = image;
      imgLabel.src = `./images/${image}.jpg`;
    }
  }

  openCards() {
    this.cards.forEach((card) => card.classList.add("opened"));
    setTimeout(() => {
      this.closeCards();
    }, 7000);
  }

  closeCards() {
    this.cards.forEach((card) => card.classList.remove("opened"));
    this.addClickEvents();
    this.canPlay = true;
  }

  addClickEvents() {
    this.cards.forEach((_this) =>
      _this.addEventListener("click", this.flipCard.bind(this))
    );
  }

  removeClickEvents() {
    this.cards.forEach((_this) =>
      _this.removeEventListener("click", this.flipCard)
    );
  }

  flipCard(e) {
    const clickedCard = e.target;
    if (this.canPlay && !clickedCard.classList.contains("opened")) {
      clickedCard.classList.add("opened");
      this.checkPair(clickedCard.dataset.image);
    }
  }

  checkPair(image) {
    if (!this.card1) this.card1 = image;
    else this.card2 = image;

    if (this.card1 && this.card2) {
      if (this.card1 === this.card2) {
        this.canPlay = false;
        setTimeout(this.checkIfWon.bind(this), 300);
        if (this.modo === 2) {
          if (this.turno === 1) {
            this.jugador1++;
            console.log("SE LE ASIGNO UN PUNTO AL J1");
            console.log("*********************************************");
          } else if (this.turno === 2) {
            this.jugador2++;
            console.log("SE LE ASIGNO UN PUNTO AL J2");
            console.log("*********************************************");
          }
        }
      } else {
        this.canPlay = false;
        setTimeout(this.resetOpenedCards.bind(this), 800);
        if (this.modo === 2) {
          if (this.turno === 1) {
            this.turno = 2;
            console.log("SE CAMBIO EL TURNO AL J2");
            alert("Se cambió al jugador 2.");
            console.log("*********************************************");
          } else if (this.turno === 2) {
            this.turno = 1;
            console.log("SE CAMBIO EL TURNO AL J1");
            alert("Se cambió al jugador 1.");
            console.log("*********************************************");
          }
        }
      }
    }
  }

  resetOpenedCards() {
    const firstOpened = document.querySelector(
      `.board-game figure.opened[data-image='${this.card1}']`
    );
    const secondOpened = document.querySelector(
      `.board-game figure.opened[data-image='${this.card2}']`
    );

    firstOpened.classList.remove("opened");
    secondOpened.classList.remove("opened");

    this.card1 = null;
    this.card2 = null;

    this.canPlay = true;
  }

  checkIfWon() {
    this.foundPairs++;
    this.card1 = null;
    this.card2 = null;
    this.canPlay = true;

    if (this.maxPairNumber === this.foundPairs) {
      alert("JUEGO TERMINADO");
      if (this.modo === 2) {
        alert(
          "PUNTOS:\n" +
            "Puntaje jugador 1: " +
            this.jugador1 +
            " Punto(s)\n" +
            "Puntaje jugador 2: " +
            this.jugador2 +
            " Punto(s)"
        );
        console.log("Puntaje jugador 1: " + this.jugador1);
        console.log("Puntaje jugador 2: " + this.jugador2);
      } else {
        alert("¡Felicidades! Has ganado en modo solitario.");
      }
      this.setNewGame();
    }
  }

  setNewGame() {
    this.removeClickEvents();
    this.cards.forEach((card) => card.classList.remove("opened"));
    setTimeout(this.startGame.bind(this), 800);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Memorama();
});
