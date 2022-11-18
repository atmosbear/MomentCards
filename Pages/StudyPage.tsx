import React from 'react'
import { User } from '../User'

type StudyPageProps = {
    user: User
}

export default function StudyPage(props: StudyPageProps) {
    let deck = <div>{props.user.currentDeck ? props.user.currentDeck.name : "hi"}</div>
    return (
        <div>
            Current Deck: "{deck}"
        </div>
    )
}