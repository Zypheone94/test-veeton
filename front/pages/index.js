import { useState } from "react";

import { Inter } from "next/font/google";
import { useRouter } from "next/router";

import api from "@/components/api";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const [passwordValue, setPasswordValue] = useState("");
  const [roomValue, setRoomValue] = useState("");
  const [displayError, setDisplayError] = useState(false);

  const create_room = (e) => {
    e.preventDefault();
    api({
      request_type: "POST",
      request_url: "http://localhost:8000/api/room/",
      request_body: { password: passwordValue },
    })
      .then((response) => {
        if (response.data && response.status === 200) {
          router.push("/room/" + response.data.id);
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête API :", error);
      });
  };

  const handle_load_room = async (e) => {
    e.preventDefault();
    router.push(`/room/${roomValue}/`);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h3>Bienvenu sur l'application de messagerie</h3>
      <div>
        <form onSubmit={create_room}>
          <input
            type="password"
            className="text-yellow-600"
            onChange={(e) => setPasswordValue(e.target.value)}
          />
          <button className="cursor-pointer">Créer une salle</button>
        </form>
      </div>
      <div>
        <form onSubmit={handle_load_room}>
          <input
            placeholder="Id de la room"
            className="text-yellow-600"
            onChange={(e) => setRoomValue(e.target.value)}
          ></input>
          <button>Rejoindre</button>
          {displayError && (
            <div className="border-2 border-red-600 rounded-2xl p-8">
              <p className="text-red-600">
                Erreur lors de la recherche de votre salle
              </p>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
