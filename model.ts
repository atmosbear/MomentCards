import { User } from "./User"

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
        public timeOptions: {fromNow?: number, fromEpoch?: number, defaultTime?: number},
        public creationDate: number = Date.now(),
        public isSuspended: boolean = false
    ) {
        let knownFromNow = timeOptions.fromNow !== undefined
        let knownFromEpoch = timeOptions.fromEpoch !== undefined
        if (knownFromNow && knownFromEpoch) {
            // nothing to do!
        } else if (knownFromEpoch && !knownFromNow) {
            // find fromNow
            this.timeOptions.fromNow = Date.now() - this.timeOptions.fromEpoch!
        } else if (!knownFromEpoch && knownFromNow) {
            this.timeOptions.fromEpoch = Date.now() + this.timeOptions.fromNow!
        }  else { // if neither are known...
            if (this.timeOptions.defaultTime === undefined) { // and if there's no default time passed in from the settings object...
                this.timeOptions.defaultTime = (1000 * 60 * 10) // assume it's 10.
            }
            // now set both fromNow and fromEpoch.
            this.timeOptions.fromNow = this.timeOptions.defaultTime
            this.timeOptions.fromEpoch = Date.now() + this.timeOptions.defaultTime
        }
    }

    suspend() {
        this.isSuspended = true
    }

    getDueDateFromNowMS(): number {
        return this.timeOptions.fromEpoch! - Date.now()
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

