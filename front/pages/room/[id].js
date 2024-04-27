import React, {useState} from 'react'
import { useRouter } from 'next/router'

import styled from 'styled-components'

function Room({className}) {
    const router = useRouter()
    const room_id = router.query.id



  return (
    <div className={className}>
        <h3>Room: {room_id}</h3>
        <div className='message-area'>
            message
        </div>
        <div>
            <form>
                <input placeholder='Entrer le message à envoyer'></input>
                <button>Envoyer le message</button>
            </form>
        </div>
    </div>
  )
}

const StyledRoom = styled(Room)`
    .message-area {
        border: 1px solid white;
        border-radius: 15px;
        min-height: 250px;

        margin: 50px 0;
    }
`


export default StyledRoom