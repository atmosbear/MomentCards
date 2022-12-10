import { Settings, Deck, Card } from "./model";


export class User {
    constructor(
        public username: string = "DevLearner",
        public settings: Settings = new Settings(),
        public decks: Deck[] = [],
        public currentDeck?: Deck | undefined
    ) {
        this.populateData()
    }

    getCurrentCard(): Card {
        let card = this.getDueCards().length > 0 ? this.getDueCards()[0] : new Card(cardsButNotDueMessage, noCardsMessage, {})
        return card
    }

    getUnsuspendedCards(): Card[] {
        let allCards: Card[] = this.getAllCards();
        let nonSuspendedCards: Card[] = [];
        allCards.forEach((card) => {
            if (!card.isSuspended) {
                nonSuspendedCards.push(card);
            }
        });
        return nonSuspendedCards;
    }

    getDueCards(): Card[] {
        let allCards: Card[] = this.getAllCards()
        let dues: Card[] = []
        allCards.forEach((card) => {
            if (card.isDue()) {
                dues.push(card)
            }
        });
        return dues
    }

    getAllCards(): Card[] {
        let cards: Card[] = [];
        this.decks.forEach((deck) => {
            if (deck.cards.length > 0) {
                deck.cards.forEach((card) => {
                    cards.push(card)
                });
            } else {
                console.error("aaa")
            }
        });
        return cards;
    }

    getRecentlyMadeCards(quantity: number = 20): Card[] {
        // technically, these aren't recent. Fix this later.
        let cards: Card[] = [];
        this.getAllCards().forEach((card, i) => {
            if (i < 20) {
                cards.push(card);
            }
        });
        return cards;
    }

    async populateData() {
        type FakeCard = { front: string, back: string, dueMS: number, creationDate: number, isSuspended: boolean }
        await fetch("/public/fakeCards.json")
            .then((response) => {
                return response.json()
            }).then(data => {
                let fakeCards: FakeCard[] = data.cards
                let realCards: Card[] = []
                fakeCards.forEach((fake) => {
                    // convert the fake cards to real cards!
                    realCards.push(new Card(fake.front, fake.back, { fromEpoch: Number(fake.dueMS) }, Number(fake.creationDate), Boolean(fake.isSuspended)))
                })
                let ND = new Deck(data.deckName, realCards)
                this.decks.push(ND)
                this.currentDeck = ND
            }).catch((error) => {
                console.error("Something went wrong: ", error)
            }).finally(() => {
                window.dispatchEvent(new CustomEvent("deck is done loading!"))
                console.log("loaded deck.")
            })
    }

    async post() {
        // this is the next thing to do! it's within the backend section I'm sure. It deals with mongo and others, as well.
        await fetch("/public/fakeCards.json", {
                method: "POST",
                    body: JSON.stringify({deckName: "helo", cards: {
                    front: "YAY",
                    back: "THIS IS A CARD FROM THE POST METHOD!",
                    dueMS: 1668892597034,
                    creationDate: 316256316161,
                    isSuspended: false
                    }}),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        )
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data)
            })
    }
}

export let noCardsMessage = "No active cards have been found.<br />Create one?"
export let cardsButNotDueMessage = "There's nothing to study right now."
