import { User } from "./User"

export class Settings {
    constructor(
        public defaultDueMins: number = 10,
        public theme: string = "light"
    ) { }
}
export class Card {
    public dueDateMS
    constructor(
        public front: string,
        public back: string,
        private settingsDueMins: number,
        public creationDate: number = Date.now(),
        public isSuspended: boolean = false
    ) {
        this.dueDateMS = Date.now() + settingsDueMins * 1000 * 60
    }

    suspend() {
        this.isSuspended = true
    }

    getDueDateFromNowMS(): number {
        return this.dueDateMS - Date.now()
    }

    isDue(): boolean {
        return (this.getDueDateFromNowMS() <= 0)
    }
}
export class Deck {
    constructor(
        public name: string = "Default",
        public cards: Card[] = []
    ) {
    }
}

