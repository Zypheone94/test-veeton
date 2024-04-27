import { Inter } from "next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const create_room = async () => {
    await fetch("http://localhost:8000/api/room/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
        if (!response.ok) {
          throw new Error("Erreur HTTP " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Données renvoyées par le serveur :", data)
        router.push("/room/" + data.id);
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
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
        <form>
          <input placeholder="Id de la room"></input>
          <button>Rejoindre</button>
        </form>
      </div>
    </main>
  );
}
