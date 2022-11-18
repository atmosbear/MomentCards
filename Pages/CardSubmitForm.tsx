import React from 'react'
import { User } from '../model'

type CardSubmitFormProps = {
    user: User
}

export default function CardSubmitForm(props: CardSubmitFormProps) {
    function test(e: React.FormEvent<HTMLButtonElement>) {
        // todo: why doesn't preventD work here?
        e.preventDefault(); 
    }
    return (
            <form acceptCharset="utf-8" style={{ display: "flex", flexDirection: "column", width: "50%",  paddingLeft: 30, paddingRight: 30}}>
                    <textarea placeholder="front" ></textarea>
                    <textarea placeholder="back" ></textarea>
                    <button type="submit" onSubmit={(e) => {/**e.preventD also doesn't work here. Hmmm.*/e.preventDefault(); test(e)}} >create</button>
            </form>
    )
}