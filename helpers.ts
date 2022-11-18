
export function selectRandomFrom<T>(array: T[]): T  {
    let rand = array[Math.round(Math.random()*array.length-1)]
    return rand
}

export function randomID(length: number = 10): string {
    // a length of ten equals 1.4455e17 possible values... wow!
    let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let rands: string[] = []
    for (let i = 0; i < length; i++) {
        let r = selectRandomFrom(alphabet)
        if (["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].includes(r)) {
            if (Math.random() > 0.5) {
                r = r.toUpperCase()
            }
        }
        rands.push(r)
    }
    return rands.join("")
}

randomID(30)
