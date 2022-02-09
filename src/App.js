import React from "react";
import './App.css';
import FormValidation from "./components/FormValidation";
import Form from "./components/Form";

function App() {
  return (
      <main className="container">
        <Form />
        <FormValidation />
      </main>
  );
}

export default App;
