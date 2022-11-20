
// export function selectRandomFrom<T>(array: T[]): T  {
//     let rand = array[Math.round(Math.random()*array.length-1)]
//     return rand
// }

// export function randomID(length: number = 10): string {
//     // a length of ten equals 1.4455e17 possible values... wow!
//     let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
//     let rands: string[] = []
//     for (let i = 0; i < length; i++) {
//         let r = selectRandomFrom(alphabet)
//         if (["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"].includes(r)) {
//             if (Math.random() > 0.5) {
//                 r = r.toUpperCase()
//             }
//         }
//         rands.push(r)
//     }
//     return rands.join("")
// }

// randomID(30)


export function posOrNegMSto0000(posOrNegMS: number, options: {ms?: boolean, decAndCent?: boolean} = {ms: false, decAndCent: false}) {
    let isNegative = posOrNegMS < 0
    posOrNegMS = Math.abs(posOrNegMS)
    if (options.ms === undefined) { options.ms = false }
    if (options.decAndCent === undefined) { options.decAndCent = false }

    let includeDecadesAndCenturies = options.decAndCent
    let includeMS = options.ms
    let v = posOrNegMS
    let fullCentury = includeDecadesAndCenturies ? v * 1 / 60 * 1 / 60 * 1 / 1000 * 1 / 24 * 1 / 365 * 1 / 10 * 1 / 10 : 0
    let flooredCentury = Math.floor(fullCentury)
    let overflowedCentury = fullCentury - flooredCentury

    let fullDecade = includeDecadesAndCenturies ? flooredCentury * 10 : 0 //0// v * 1/60 * 1/60 * 1/1000 * 1/24 * 1/365 * 1/10
    let flooredDecade = Math.floor(fullDecade)
    let overflowedDecade = fullDecade - flooredDecade

    let fullY = v * 1 / 60 * 1 / 60 * 1 / 1000 * 1 / 24 * 1 / 365 // overflowedDecade * 10
    let flooredY = Math.floor(fullY)
    let overflowedY = fullY - flooredY

    let fullD = overflowedY * 365
    let flooredD = Math.floor(fullD)
    let overflowedD = fullD - flooredD

    let fullH = overflowedD * 24 // hours
    let flooredH = Math.floor(fullH)
    let overflowedH = fullH - flooredH

    let fullM = (overflowedH) * 60
    let flooredM = Math.floor(fullM)
    let overflowedM = fullM - flooredM

    let fullS = (overflowedM) * 60
    let flooredS = Math.floor(fullS)
    let overflowedS = fullS - flooredS

    let fullMS = (overflowedS) * 1000
    let flooredMS = Math.floor(fullMS)
    let overflowedMS = flooredMS // this isn't true, but i'm ending it here!

    // these few can be larger than 100.
    let c = flooredCentury < 10 ? "00" + flooredCentury
        : flooredCentury < 100 ? "0" + flooredCentury
            : flooredCentury
    let dec = flooredDecade < 10 ? "00" + flooredDecade
        : flooredDecade < 100 ? "0" + flooredDecade
            : flooredDecade
    let y = flooredY < 10 ? "00" + flooredY
        : flooredY < 100 ? "0" + flooredY
            : flooredY
    let d = flooredD < 10 ? "00" + flooredD
        : flooredD < 100 ? "0" + flooredD
            : flooredD
    let h = flooredH < 9 ? "0" + flooredH : flooredH
    let m = flooredM < 9 ? "0" + flooredM : flooredM
    let s = flooredS + "s"
    let ms = flooredMS < 9 ? "0" + flooredMS : flooredMS


    let decdec = dec > 0 ? `${dec}decs|` : ""
    let cc = c > 0 ? `${c}cnts / ` : ""
    let yy = y > 0 ? `${y}y / ` : ""
    let dd = d > 0 ? `${d}d / ` : ""
    let hh = h > 0 ? `${h}h / ` : ""
    let mm = m > 0 ? `${m}m / ` : ""
    let msms = includeMS ? ms > 0 ? ` / ${ms}ms` : "" : ""
    let prefix = ""
    if (isNegative) {prefix = "-"}
    return `${prefix}${decdec}${cc}${yy}${dd}${hh}${mm}${s}${msms}`
}
posOrNegMSto0000(-10000, {ms: true, decAndCent: true})