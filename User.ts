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
        // if (this.getAllCards().length > 0) {

        // }
        let card = this.getDueCards().length > 0 ? this.getDueCards()[0] : new Card(cardsButNotDueMessage, noCardsMessage, 10000)
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
        let allCards: Card[] = this.getAllCards();
        let dues: Card[] = [];
        allCards.forEach((card) => {
            if (card.isDue()) {
                dues.push(card);
            }
        });
        return dues;
    }

    async populateData() {
        await fetch("/public/fakeCards.json")
        .then(response => {
            return response.json()
        }).then(data => {
            let ND = new Deck(data.deckName, data.cards)
            this.decks.push(ND)
            this.currentDeck = ND
        }).catch(error => {
            console.error("Something went wrong: ", error)
        }).finally(() => {
            window.dispatchEvent(new CustomEvent("deck is done loading!"))
            console.log("loaded deck.")
        })
    }

    getAllCards(): Card[] {
        try {
            let cards: Card[] = [];
            this.decks.forEach((deck) => {
                if (deck.cards.length > 0) 
                    {
                        deck.cards.forEach((card) => {
                        cards.push(card);
                    });
                }
            });
            return cards;
        } catch (e) {
            console.error(e);
            return [];
        }
    }

    getRecentlyMadeCards(quantity: number = 20): Card[] {
        // technically, these aren't recent. Fix this later.
        let cards: Card[] = [];
        console.log("recently made cards", this.getAllCards());
        this.getAllCards().forEach((card, i) => {
            if (i < 20) {
                cards.push(card);
            }
        });
        return cards;
    }
}

export let noCardsMessage = "No active cards have been found.<br />Create one?"
export let cardsButNotDueMessage = "There's nothing to study right now."