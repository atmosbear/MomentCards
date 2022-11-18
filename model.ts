import CardSubmitForm from "./Pages/CardSubmitForm"

export class User {
    constructor(
        public username: string = "DevLearner",
        public settings: Settings = new Settings(),
        public decks: Deck[] = [],
        public currentDeck?: Deck,
    ) { }

    getDueCards(): Card[] {
        let allCards: Card[] = this.getAllCards()
        let dues: Card[] = []
        allCards.forEach((card) => {
            if (card.isDue()) {
                dues.push(card)
            }
        })
        return allCards
    }

    getAllCards(): Card[] {
        let cards: Card[] = []
        this.decks.forEach((deck) => {
            deck.cards.forEach((card) => {
                cards.push(card)
            })
        })
        return cards
    }

    getRecentlyMadeCards(quantity: number = 20): Card[] {
        // technically, these aren't recent. Fix this later.
        let cards: Card[] = []
        this.getAllCards().forEach((card, i) => {
            if (i < 20) {
                cards.push(card)
            }
        })
        return cards
    }
}
export class Settings {
    constructor(
        public defaultDueMins: number = 10,
        public theme: string = "light"
    ) { }
}
export class Card {
    constructor(
        public front: string,
        public back: string,
        private dueDateMS: number = Date.now() + user.settings.defaultDueMins * 1000 * 60,
        public creationDate: number = Date.now()
    ) { }

    dueDateFromNowMS(): number {
        return this.dueDateMS - Date.now()
    }

    isDue(): boolean {
        return (this.dueDateFromNowMS() <= 0)
    }
}
class Deck {
    constructor(
        public name: string = "Default",
        public cards: Card[] = []
    ) {
        user.decks.push(this) // ensures the deck belongs to the current user.
    }
}
export function getUserFromLocalStorage(): User {
    let dataExists = true
    if (dataExists) {
        const reqURL = "./fakeCards.json"
        let req = new Request(reqURL)
        async function a () {
            let resp = await fetch(req)
            return await resp.json()
        }
        let b = a()
        console.log(b)

        // read from JSON or wherever
        return new User(/** put settings from JSON/wherever */)
    } else {
        console.error("Local storage isn't set up yet - using a default user.")
        console.log("Setting user to default.")
        return new User()
    }
}
export const user = getUserFromLocalStorage() // this is pretty much a singleton, representing all the data the user has.
