import React from "react"; // importa a bibliotea React
import ReactDOM from "react-dom"; // importa o React Dom
import App from "./App"; // importa o componente App

ReactDOM.render( // componente em que renderiza a aplicação e linca com o html atraves do id "root" passado no document getElementById
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
