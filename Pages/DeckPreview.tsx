import CardCard from './CardCard'
import React from 'react'
import { User } from "../User"


type DeckPreviewProps = {
    user: User
}


export default function DeckPreview(props: DeckPreviewProps) {
    let last20Created = props.user.getRecentlyMadeCards(20)
    let cardCards: JSX.Element[] = []
    last20Created.forEach((card) => {
        cardCards.push(<CardCard card={card}  />)
    })

    return (
        <div style={{ display: "flex", flexDirection: "column", width: "50%", paddingLeft: 30, paddingRight: 30 }}>
            {cardCards}
        </div>
    )
}