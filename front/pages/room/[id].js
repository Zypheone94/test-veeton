import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import styled from "styled-components";

function Room({ className }) {
  const router = useRouter();
  const room_id = router.query.id;

  const [messageBody, setmessageBody] = useState("");
  const [messageList, setMessageList] = useState();

  useEffect(() => {
    get_message_list();
  }, [room_id]);

  const handle_change_value = (e) => {
    console.log(messageBody);
    setmessageBody(e.target.value);
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
        message_body: messageBody,
      }),
    }).then((data) => {
      console.log(data);
    });
  };

  const get_message_list = async (e) => {
    await fetch(`http://localhost:8000/api/message-list/${room_id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur HTTP " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setMessageList(data.messages)
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  console.log(messageList)

  return (
    <div className={className}>
      <h3>Room: {room_id}</h3>
      <div className="border-2 border-white rounded-2xl my-20 px-4 min-h-40 max-h-56 overflow-scroll">
        {messageList && messageList.map((message) => (
            <p className="text-yellow-600 my-4">{message.message_body}</p>
        ))}
      </div>
      <div>
        <form onSubmit={send_message}>
          <input
            placeholder="Entrer le message à envoyer"
            onChange={handle_change_value}
            value={messageBody}
            className="text-yellow-600"
          />
          <button>Envoyer le message</button>
        </form>
      </div>
    </div>
  );
}

export default Room;
