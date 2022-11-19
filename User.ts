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

    getDueCards(): Card[] {
        let allCards: Card[] = this.getAllCards();
        let dues: Card[] = [];
        allCards.forEach((card) => {
            if (card.isDue()) {
                dues.push(card);
            }
        });
        return allCards;
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
