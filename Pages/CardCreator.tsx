import CardSubmitForm from './CardSubmitForm'
import React from 'react'
import { User } from '../model'

type CardCreatorProps = {
    user: User
}

export default function CardCreator(props: CardCreatorProps) {
    return (
        <div>
            <CardSubmitForm />
        </div>
    )
}