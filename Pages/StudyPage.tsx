import React, { useEffect, useState } from 'react'
import { User } from '../User'

type StudyPageProps = {
    user: User
}

let waitfor = false;
export default function StudyPage(props: StudyPageProps) {
    let [deck, setDeck] = useState(<span>{props.user.currentDeck ? props.user.currentDeck.name : "No decks!"}</span>)
    addEventListener("deck is done loading!", () => {waitfor = true; setDeck(<span>{props.user.currentDeck ? props.user.currentDeck.name : "No decks!"}</span>)})
    useEffect(() => {props.user.populateData()}, [waitfor])  // when waitfor changes (meaning the event was fired, rerender the component.)
    return (
        <div style={{ fontSize: "1 rem" }}>
            Current Deck: "{deck}"
        </div>
    )
}