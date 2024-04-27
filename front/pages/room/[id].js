import React, { useState } from "react";
import { useRouter } from "next/router";

import styled from "styled-components";

function Room({ className }) {
  const router = useRouter();
  const room_id = router.query.id;

  const [messageContent, setMessageContent] = useState("");

  const handle_change_value = (e) => {
    console.log(messageContent);
    setMessageContent(e.target.value);
  };

  const send_message = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/api/send-message/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room_id: room_id,
        message_content: messageContent,
      }),
    }).then((data) => {
      console.log(data);
    });
  };

  return (
    <div className={className}>
      <h3>Room: {room_id}</h3>
      <div className="message-area">message</div>
      <div>
        <form onSubmit={send_message}>
          <input
            placeholder="Entrer le message à envoyer"
            onChange={handle_change_value}
            value={messageContent}
            className="message-input"
          />
          <button>Envoyer le message</button>
        </form>
      </div>
    </div>
  );
}

const StyledRoom = styled(Room)`
  .message-area {
    border: 1px solid white;
    border-radius: 15px;
    min-height: 250px;

    margin: 50px 0;
  }

  .message-input {
    color: orange;
  }
`;

export default StyledRoom;
