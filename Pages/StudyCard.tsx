import React, { useState } from 'react'
import { Card } from '../model'
import { User } from '../User'

type StudyCardProps = {
    user: User
    card: Card
}

export default function StudyCard(props: StudyCardProps) {
    const [flipped, setFlipped] = useState(false)
    let deckStyle = { fontSize: "1rem" }
    let [deckLabel, setDeck] = useState(<span style={deckStyle}>{props.user.currentDeck ? props.user.currentDeck.name : "No decks!"}</span>)
    let [color, setColor] = useState(props.user.getDueCards.length === 0 ? "lightgray" : flipped === false ? "skyblue" : "orange")
    window.addEventListener("deck is done loading!", () => {
        setDeck(<span style={deckStyle}>{props.user.currentDeck ? props.user.currentDeck.name : "No decks!"}</span>)
    }, { once: true })
    return (
        <div>
            <div style={{ margin: "auto", backgroundColor: color, padding: 10, borderRadius: 20 }}>
                <div style={{ fontSize: "2rem", display: "flex", flexDirection: "column", position: "absolute"}}>
                    {deckLabel}
                </div>
                <div style={{display: "flex", height: "30vh"}}>
                {props.card.front}
                </div>
            </div>

        </div >
    )
}