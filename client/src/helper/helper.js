import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from "axios";

export function attempts_Number(result) {
  return result.filter((r) => r !== undefined).length;
}

export function earnPoints_Number(result, answers, point) {
  return result
    .map((element) => {
      // Punktevergabe basierend auf der gewählten Antwort
      switch (element) {
        case 0:
          return 0; // erste Antwort = 0 Punkte
        case 1:
          return 5; // zweite Antwort = 5 Punkte
        case 2:
          return 10; // dritte Antwort = 10 Punkte
        default:
          return 0;
      }
    })
    .reduce((prev, curr) => prev + curr, 0);
}

export function flagResult(totalPoints, earnPoints) {
  const percentage = (earnPoints / totalPoints) * 100;
  if (percentage >= 75) {
    return "green"; // Grün für >= 75%
  } else if (percentage >= 50) {
    return "yellow"; // Gelb für 50-74%
  }
  return "red"; // Rot für < 50%
}

/** check user auth  */
export function CheckUserExist({ children }) {
  const auth = useSelector((state) => state.result.userId);
  return auth ? children : <Navigate to={"/"} replace={true}></Navigate>;
}

/** get server data */
export async function getServerData(url, callback) {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return callback ? callback(data) : data;
  } catch (error) {
    console.error("API Fehler:", error);
    throw new Error("Fehler beim Laden der Daten");
  }
}

/** post server data */
export async function postServerData(url, result, callback) {
  const data = await (await axios.post(url, result))?.data;
  return callback ? callback(data) : data;
}
