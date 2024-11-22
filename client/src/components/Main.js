import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setUserId } from "../redux/result_reducer";
import "../styles/Main.css";

export default function Main() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  function startQuiz() {
    if (inputRef.current?.value) {
      dispatch(setUserId(inputRef.current?.value));
    }
  }

  return (
    <div className="container">
      <h1 className="title text-light">Wie nachhaltig ist Ihre Agentur?</h1>

      <ol>
        <li>Dieser Rechner ermittelt, wie "grün" Ihre Agentur ist.</li>
        <li>Es werden 10 Fragen gestellt.</li>
        <li>Eine Frage hat drei verschiedene Ausprägungen.</li>
        <li>Basierend auf den Antworten werden Punkte vergeben.</li>
        <li>Am Ende wird Ihre Agentur bewertet.</li>
      </ol>

      <form id="form">
        <input
          ref={inputRef}
          className="userid"
          type="text"
          placeholder="Agenturname*"
        />
      </form>

      <div className="start">
        <Link className="btn" to={"quiz"} onClick={startQuiz}>
          Start!
        </Link>
      </div>
    </div>
  );
}
