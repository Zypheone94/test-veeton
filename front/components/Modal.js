import React from "react";
import { createPortal } from "react-dom";

const Modal = ({setCheckPasswordValue, verify_value, displayError}) => {
  return (
    <div>
      {createPortal(
        <div style={{ border: "2px solid white" }}>
            <h3>Merci d'entrer le mot de passe de cette room avant de continuer</h3>
          <form onSubmit={verify_value}>
            <input
              placeholder="Entrer le mot de passe de la salle"
              type="password"
              className="text-yellow-600"
              onChange={(e) => setCheckPasswordValue(e.target.value)}
            />
            <button>Valider mot de passe</button>
          </form>
          {displayError && (
            <div className="border-2 border-red-600 rounded-2xl p-8">
              <p className="text-red-600">Mot de passe incorrect</p>
            </div>
          )}
        </div>,
        document.body
      )}
    </div>
  );
};

export default Modal;
