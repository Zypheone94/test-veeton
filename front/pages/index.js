
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const create_room = async () => {
    await fetch("http://localhost:8000/api/room/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" 
      },
      body :JSON.stringify({
        "name": "name",
        "id": "myId"
      })
    })
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h3>
        Bienvenu sur l'application de messagerie
      </h3>
      <div>
        <button className="cursor-pointer" onClick={create_room}>Créer une salle</button>
      </div>
      <div>
      <form>
        <input placeholder="Id de la room"></input>
        <button>Rejoindre</button>
        </form>
      </div>
    </main>
  );
}
