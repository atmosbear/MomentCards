export class User {
    constructor(
        public username: string = "DevLearner",
        public settings: Settings = new Settings(),
        public decks: Deck[] = [],
        public currentDeck?: Deck,
    ) { }
}
export class Settings {
    constructor(
        public defaultDueMins: number = 10,
        public theme: string = "light"
    ) { }
}
class Card {
    constructor(
        public front: string,
        public back: string,
        private dueDateMS: number = Date.now() + user.settings.defaultDueMins * 1000 * 60,
    ) { }

    dueDateFromNowMS(): number {
        return this.dueDateMS - Date.now()
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
export function getUserFromLocalStorage() {
    let dataExists = false
    if (dataExists) {
        // read from JSON or wherever
        return new User(/** put settings from JSON/wherever */)
    } else {
        console.error("Local storage isn't set up yet - using a default user.")
        console.log("Setting user to default.")
        return new User()
    }
}
export const user = getUserFromLocalStorage() // this is pretty much a singleton, representing all the data the user has.
