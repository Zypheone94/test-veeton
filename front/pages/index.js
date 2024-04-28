import { useState } from "react";

import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const [roomValue, setRoomValue] = useState("");
  const [displayError, setDisplayError] = useState(false)

  const create_room = async () => {
    await fetch("http://localhost:8000/api/room/", {
      method: "POST",
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
        console.log("Données renvoyées par le serveur :", data);
        router.push("/room/" + data.id);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  const handle_load_room = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8000/api/room/${roomValue}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          router.push(`/room/${roomValue}/`)
        }
        setDisplayError(true)
      })
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h3>Bienvenu sur l'application de messagerie</h3>
      <div>
        <button className="cursor-pointer" onClick={create_room}>
          Créer une salle
        </button>
      </div>
      <div>
        <form onSubmit={handle_load_room}>
          <input
            placeholder="Id de la room"
            className="text-yellow-600"
            onChange={(e) => setRoomValue(e.target.value)}
          ></input>
          <button>Rejoindre</button>
          {
            displayError && (
              <div className="border-2 border-red-600 rounded-2xl p-8">
                 <p className="text-red-600">Erreur lors de la recherche de votre salle</p> 
              </div>
            )
          }
        </form>
      </div>
    </main>
  );
}
