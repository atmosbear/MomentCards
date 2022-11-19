import React, { useEffect, useState } from 'react'
import { User } from '../User'

type StudyPageProps = {
    user: User
}

let waitfor = false;
export default function StudyPage(props: StudyPageProps) {
    let [deck, setDeck] = useState(<span>{props.user.currentDeck ? props.user.currentDeck.name : "No decks!"}</span>)
    window.addEventListener("deck is done loading!", () => {console.log("Event fired!"); setDeck(<span>{props.user.currentDeck ? props.user.currentDeck.name : "No decks!"}</span>)}, {once: true})
    return (
        <div style={{ fontSize: "1 rem" }}>
            Current Deck: "{deck}"
        </div>
    )
}