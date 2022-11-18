import DeckPreview from "./DeckPreview"
import CardSubmitForm from './CardSubmitForm'
import React from 'react'
import { user, User } from '../model'

type CardCreatorProps = {
    user: User
}

export default function CardCreator(props: CardCreatorProps) {
    return (
        <div>
            <div style={{textAlign: "center", display: "flex", justifyContent: "space-around", width: "100%", marginLeft: -30, paddingBottom: 50, lineHeight: 0.5, textShadow: "1px 1px gray"}}>Create</div>
            <div id="card-creator" style={{ display: "flex", flexDirection: "row" }}>
                <CardSubmitForm user={user}  />
                <DeckPreview user={user} />
            </div>
        </div>
    )
}