import React from 'react'
import { useRouter } from 'next/router'

function room() {
    const router = useRouter()
  return (
    <div><p>Room: {router.query.id}</p></div>
  )
}

export default room