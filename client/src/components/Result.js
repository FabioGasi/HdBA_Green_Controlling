import React, { useEffect } from "react";
import "../styles/Result.css";
import { Link } from "react-router-dom";

import ResultTable from "./ResultTable";
import { useDispatch, useSelector } from "react-redux";
import {
  attempts_Number,
  earnPoints_Number,
  flagResult,
} from "../helper/helper";

/** import actions  */
import { resetAllAction } from "../redux/question_reducer";
import { resetResultAction } from "../redux/result_reducer";
import { usePublishResult } from "../hooks/setResult";

export default function Result() {
  const dispatch = useDispatch();
  const {
    questions: { queue, answers },
    result: { result, userId },
  } = useSelector((state) => state);

  const totalPoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers);
  const flag = flagResult(totalPoints, earnPoints);

  /** store user result */
  usePublishResult({
    result,
    username: userId,
    attempts,
    points: earnPoints,
    achived:
      flag === "green"
        ? "Grün"
        : flag === "yellow"
        ? "Teilweise Grün"
        : "Nicht Grün",
  });

  // Handlungsempfehlungen basierend auf dem Flag
  const getRecommendation = () => {
    if (flag === "yellow") {
      return "Handlungsempfehlung: Ihre Agentur ist auf einem guten Weg! Um noch nachhaltiger zu werden, wenden Sie sich an die Interne Beratung";
    } else if (flag === "red") {
      return "Handlungsempfehlung: Ihre Agentur hat noch großes Verbesserungspotenzial! Erstellen Sie einen Nachhaltigkeitsplan mit ihrem Green Team, reduzieren Sie Ihren Energieverbrauch und modernisieren Sie Ihre Infrastruktur. Schulen Sie Ihre Mitarbeiter in Umweltthemen.";
    }
    return null;
  };

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }

  return (
    <div className="container">
      <h1 className="title text-light">Ergebnis</h1>

      <div className="result flex-center">
        <div className="flex">
          <span>Name</span>
          <span className="bold">{userId || ""}</span>
        </div>
        <div className="flex">
          <span>Punkte insgesamt: </span>
          <span className="bold">{totalPoints || 0}</span>
        </div>
        <div className="flex">
          <span>Fragen beantwortet : </span>
          <span className="bold">{queue.length || 0}</span>
        </div>
        <div className="flex">
          <span>Punkte : </span>
          <span className="bold">{earnPoints || 0}</span>
        </div>
        <div className="flex">
          <span>Ihre Agentur ist</span>
          <span
            style={{
              color: `${
                flag === "green"
                  ? "#006400"
                  : flag === "yellow"
                  ? "#DAA520"
                  : "#ff2a66"
              }`,
            }}
            className="bold"
          >
            {flag === "green"
              ? "Grün"
              : flag === "yellow"
              ? "Teilweise Grün"
              : "Nicht Grün"}
          </span>
        </div>
        {getRecommendation() && (
          <div className="flex recommendation">
            <span
              style={{
                color: "#cecece",
                fontSize: "0.9em",
                textAlign: "center",
                marginTop: "1em",
                fontStyle: "italic",
              }}
            >
              {getRecommendation()}
            </span>
          </div>
        )}
      </div>

      <div className="start">
        <Link className="btn" to={"/"} onClick={onRestart}>
          Restart
        </Link>
      </div>

      <div className="container">
        <ResultTable></ResultTable>
      </div>
    </div>
  );
}
