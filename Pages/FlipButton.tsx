import React from 'react'
import { Card } from '../model'
import { cardsButNotDueMessage, noCardsMessage } from '../User'

type FlipButtonProps = {
    card: Card
    flipped: boolean
    flipCard: Function
}

export default function FlipButton(props: FlipButtonProps) {
    let cardExists = props.card.front !== noCardsMessage && props.card.front !== cardsButNotDueMessage
    return (
        <div>
            <button 
            onClick={(e: React.MouseEvent) => {props.flipCard(!props.flipped); console.log(props.flipped)}}
            style={{
                marginTop: 30,
                width: "100%",
                height: "3rem",
                fontFamily: "sans",
                fontWeight: 100,
                fontSize: "2rem",
                fontVariantLigatures: "none",
                borderRadius: 10,
                backgroundColor: cardExists ? "#55e" : "#aaa",
                color: cardExists ? "white" : "gray"
            }}>
                flip
            </button>
        </div>
    )
}