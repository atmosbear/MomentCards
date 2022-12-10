import React, { useState } from 'react'
import { Card } from '../model'
import { User } from '../User'

type StudyCardProps = {
    user: User
    card: Card
    flipped: boolean
    setFlipped: Function
}

export default function StudyCard(props: StudyCardProps) {
    let deckLabelStyle = { fontSize: "1rem", textAlign: "end", width: "100%", padding: 10 }
    // @ts-expect-error - the style is fine
    let [deckLabel, setDeck] = useState(<span style={deckLabelStyle}>{props.user.currentDeck ? props.user.currentDeck.name : "No decks!"}</span>)
    let color = props.user.getDueCards().length === 0 ? "lightgray" : props.flipped === false ? "skyblue" : "#fa5"
    window.addEventListener("deck is done loading!", () => {
        // @ts-expect-error - the style is fine
        setDeck(<span style={deckLabelStyle}>{props.user.currentDeck ? props.user.currentDeck.name : "No decks!"}</span>)
    }, { once: true })
    return (
        <div>
            <div style={{ margin: "auto", backgroundColor: color, padding: 10, borderRadius: 20 }}>
                <div style={{ fontSize: "2rem", display: "flex"}}>
                    {deckLabel}
                </div>
                <div style={{height: "30vh", textAlign: "center", verticalAlign: "center"}}>
                    {props.flipped ? props.card.back : props.card.front}
                </div>
            </div>

        </div >
    )
}