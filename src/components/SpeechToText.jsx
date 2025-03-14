import React, { useState } from "react";

const SpeechToText = () => {
  const [text, setText] = useState("");
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;
  recognition.lang = "es-ES"; // Español

  recognition.onresult = (event) => {
    let transcript =
      event.results[event.results.length - 1][0].transcript.toLowerCase();

    // Reglas de reemplazo para signos de puntuación y formato
    const replacements = {
      punto: ".",
      coma: ",",
      "signo de interrogación": "¿",
      "cerrar interrogación": "?",
      "signo de exclamación": "¡",
      "cerrar exclamación": "!",
      "nueva línea": "\n",
      "guion de diálogo": "— ",
      "dos puntos": ":",
      "punto y coma": ";",
      "abrir comillas": "«",
      "cerrar comillas": "»",
    };

    // Aplicar reemplazos
    Object.keys(replacements).forEach((key) => {
      transcript = transcript.replace(
        new RegExp(`\\b${key}\\b`, "gi"),
        replacements[key]
      );
    });

    setText((prev) => prev + transcript + " ");
  };

  return (
    <div className="container text-center mt-4">
      <h2>Reconocimiento de Voz</h2>
      <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 my-3">
        <button
          className="btn btn-primary btn-md btn-sm"
          onClick={() => recognition.start()}
        >
          🎤 Iniciar Voz
        </button>
        <button
          className="btn btn-danger btn-md btn-sm"
          onClick={() => recognition.stop()}
        >
          ⛔ Detener
        </button>
      </div>

      <textarea
        className="form-control w-100"
        value={text}
        readOnly
        rows="12"
        placeholder="Tu texto aparecerá aquí..."
      />
      <div className="card mt-3">
  <div className="card-header">
    Atajos de Voz
  </div>
  <div className="card-body">
    <ul>
      <li><strong>punto:</strong> .</li>
      <li><strong>coma:</strong> ,</li>
      <li><strong>signo de interrogación:</strong> ¿</li>
      <li><strong>cerrar interrogación:</strong> ?</li>
      <li><strong>signo de exclamación:</strong> ¡</li>
      <li><strong>cerrar exclamación:</strong> !</li>
      <li><strong>nueva línea:</strong> \\n</li>
      {/* <li><strong>nueva página:</strong> \\n\\n</li> */}
      <li><strong>guion de diálogo:</strong> —</li>
      <li><strong>dos puntos:</strong> :</li>
      <li><strong>punto y coma:</strong> ;</li>
      <li><strong>abrir comillas:</strong> «</li>
      <li><strong>cerrar comillas:</strong> »</li>
    </ul>
  </div>
</div>

    </div>
  );
};

export default SpeechToText;
