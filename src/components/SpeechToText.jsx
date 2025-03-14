// import React, { useState } from "react";

// const SpeechToText = () => {
//   const [text, setText] = useState("");
//   const SpeechRecognition =
//     window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new SpeechRecognition();

//   recognition.continuous = true;
//   recognition.lang = "es-ES"; // Español

//   recognition.onresult = (event) => {
//     let transcript =
//       event.results[event.results.length - 1][0].transcript.toLowerCase();

//     // Reglas de reemplazo para signos de puntuación y formato
//     const replacements = {
//       punto: ".",
//       coma: ",",
//       "signo de interrogación": "¿",
//       "cerrar interrogación": "?",
//       "signo de exclamación": "¡",
//       "cerrar exclamación": "!",
//       "nueva línea": "\n",
//       "guion de diálogo": "— ",
//       "dos puntos": ":",
//       "punto y coma": ";",
//       "abrir comillas": "«",
//       "cerrar comillas": "»",
//     };

//     // Aplicar reemplazos
//     Object.keys(replacements).forEach((key) => {
//       transcript = transcript.replace(
//         new RegExp(`\\b${key}\\b`, "gi"),
//         replacements[key]
//       );
//     });

//     setText((prev) => prev + transcript + " ");
//   };

//   return (
//     <div className="container text-center mt-4">
//       <h2>Reconocimiento de Voz</h2>
//       <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 my-3">
//         <button
//           className="btn btn-primary btn-md btn-sm"
//           onClick={() => recognition.start()}
//         >
//           🎤 Iniciar Voz
//         </button>
//         <button
//           className="btn btn-danger btn-md btn-sm"
//           onClick={() => recognition.stop()}
//         >
//           ⛔ Detener
//         </button>
//       </div>

//       <textarea
//         className="form-control w-100"
//         value={text}
//         readOnly
//         rows="12"
//         placeholder="Tu texto aparecerá aquí..."
//       />
//       <div className="card mt-3">
//   <div className="card-header">
//     Atajos de Voz
//   </div>
//   <div className="card-body">
//     <ul>
//       <li><strong>punto:</strong> .</li>
//       <li><strong>coma:</strong> ,</li>
//       <li><strong>signo de interrogación:</strong> ¿</li>
//       <li><strong>cerrar interrogación:</strong> ?</li>
//       <li><strong>signo de exclamación:</strong> ¡</li>
//       <li><strong>cerrar exclamación:</strong> !</li>
//       <li><strong>nueva línea:</strong> \\n</li>
//       {/* <li><strong>nueva página:</strong> \\n\\n</li> */}
//       <li><strong>guion de diálogo:</strong> —</li>
//       <li><strong>dos puntos:</strong> :</li>
//       <li><strong>punto y coma:</strong> ;</li>
//       <li><strong>abrir comillas:</strong> «</li>
//       <li><strong>cerrar comillas:</strong> »</li>
//     </ul>
//   </div>
// </div>

//     </div>
//   );
// };

// export default SpeechToText;
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaMicrophone, FaStop } from "react-icons/fa";  // Importa los iconos de react-icons

const SpeechToText = () => {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isError, setIsError] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  
  recognition.continuous = false;  // No permitir grabación continua
  recognition.interimResults = false;  // No mostrar resultados intermedios
  recognition.lang = "es-ES"; // Español
  recognition.maxAlternatives = 1;  // Número máximo de resultados

  recognition.onstart = () => {
    setIsRecording(true);
    setIsError(false);  // Restablecer errores si los hay
  };

  recognition.onend = () => {
    setIsRecording(false);
  };

  recognition.onerror = (event) => {
    setIsRecording(false);
    setIsError(true); // Indicador de error
    console.error("Error en el reconocimiento: ", event.error);
  };

  recognition.onresult = (event) => {
    let transcript = event.results[event.results.length - 1][0].transcript;
    setText((prev) => prev + transcript + " ");  // Solo agrega el texto nuevo
  };

  const startRecording = () => {
    setText(""); // Limpiar el texto previo
    recognition.start();
  };

  const stopRecording = () => {
    recognition.stop();
  };

  return (
    <div>
      <div className="mb-3">
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)}  // Permitir correcciones manuales
          className="form-control" 
          rows="10" 
          placeholder="Habla aquí..."
        />
      </div>

      {/* Indicador de grabación */}
      {isRecording && <div className="alert alert-info">Grabando...</div>}
      {isError && <div className="alert alert-danger">Hubo un error en la grabación</div>}

      <div className="d-flex justify-content-center gap-3">
        {/* Botón Iniciar grabación */}
        <Button 
          variant="primary" 
          size="lg" 
          onClick={startRecording} 
          disabled={isRecording} 
        >
          <FaMicrophone size={24} /> Iniciar Voz
        </Button>

        {/* Botón Detener grabación */}
        <Button 
          variant="danger" 
          size="lg" 
          onClick={stopRecording} 
          disabled={!isRecording}
        >
          <FaStop size={24} /> Detener
        </Button>
      </div>

      {/* Card para los atajos */}
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
            <li><strong>nueva página:</strong> \\n\\n</li>
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
