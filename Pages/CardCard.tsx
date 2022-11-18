import React from 'react'
import { Card } from '../model'

type CardCardProps = {
    card: Card
}

export default function CardCard(props: CardCardProps) {
    return (
        <div>
            k
            {props.card.front}
        </div>
    )
}