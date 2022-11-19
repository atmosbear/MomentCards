import React from 'react'
import { Card } from '../model'

type CardCardProps = {
    card: Card
}

export default function CardCard(props: CardCardProps) {
    return (
        <div>
            kghrefgf
            {props.card.front}
        </div>
    )
}