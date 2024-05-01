import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Modal from "@/components/Modal";

import api from "@/components/api";

function Room() {
  const router = useRouter();
  const room_id = router.query.id;

  const [messageBody, setmessageBody] = useState("");
  const [messageList, setMessageList] = useState();
  const [deleteRoomTime, setDeleteRoomTime] = useState();
  const [displayError, setDisplayError] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);
  const [checkPasswordValue, setCheckPasswordValue] = useState("");

  const [countdown, setCountdown] = useState();

  useEffect(() => {
    room_id && handle_load_room();
  }, [room_id]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();

      const timeDifferenceInSeconds = Math.max(
        0,
        Math.floor((deleteRoomTime - currentTime) / 1000)
      );

      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      const seconds = timeDifferenceInSeconds % 60;

      const formattedCountdown = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

      setCountdown(formattedCountdown);
      if (formattedCountdown === "00:00") {
        handle_delete_room();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deleteRoomTime]);

  const handle_load_room = async () => {
    api({
      request_type: "GET",
      request_url: `http://localhost:8000/api/room/${room_id}/`,
    }).then((res) => {
      if (res.status === 404) {
        router.push("/");
      }
      setDeleteRoomTime(new Date(res.data.delete_hours));
      if (res.data && res.data.password) {
        setDisplayError(false);
        setDisplayPassword(true);
      } else {
        get_message_list();
      }
    });
  };

  const verify_value = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8000/api/room/${room_id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: checkPasswordValue,
      }),
    }).then((res) => {
      if (res.status === 200) {
        get_message_list();
        setDisplayPassword(false);
        return res.json();
      } else {
        setDisplayError(true);
      }
    });
  };

  const handle_change_value = (e) => {
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
    }).then(() => {
      setmessageBody("");
      get_message_list();
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
        setMessageList(data.messages);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  const handle_delete_room = async (e) => {
    await fetch(`http://localhost:8000/api/room/${room_id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status === 200) {
        router.push("/");
      }
    });
  };

  return (
    <div
      style={{
        filter: displayPassword ? "blur(5px)" : "",
      }}
    >
      <h3>Room: {room_id}</h3>
      <p>
        <a href="/">Retour</a>
      </p>

      <div>
        <p>
          Temps restant avant la fin de cette salle : <b>{countdown}</b>
        </p>
      </div>

      <div className="border-2 border-white rounded-2xl my-20 px-4 min-h-40 max-h-56 overflow-y-scroll">
        {messageList &&
          messageList.map((message) => (
            <div className="flex items-center">
              <p>{message.message_date.split("T")[1].split(".")[0]}</p>
              <p className="text-yellow-600 my-4 ml-6" key={message.message_id}>
                {message.message_body}
              </p>
            </div>
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

      {displayPassword ? (
        <Modal
          setCheckPasswordValue={setCheckPasswordValue}
          verify_value={verify_value}
          displayError={displayError}
        />
      ) : null}
    </div>
  );
}

export default Room;
