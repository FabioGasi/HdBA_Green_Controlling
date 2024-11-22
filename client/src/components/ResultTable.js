import React, { useEffect, useState } from "react";
import { getServerData } from "../helper/helper";

export default function ResultTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getServerData(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`,
      (res) => {
        setData(res);
      }
    );
  });

  return (
    <div>
      <table>
        <thead className="table-header">
          <tr className="table-row">
            <td>Name</td>
            <td>Fragen Beantwortet</td>
            <td>Punkte</td>
            <td>Ihre Agentur ist...</td>
          </tr>
        </thead>
        <tbody>
          {!data ?? <div>No Data Found </div>}
          {data.map((v, i) => (
            <tr className="table-body" key={i}>
              <td>{v?.username || ""}</td>
              <td>{v?.attempts || 0}</td>
              <td>{v?.points || 0}</td>
              <td
                style={{
                  color:
                    v?.achived === "Grün"
                      ? "#006400"
                      : v?.achived === "Teilweise Grün"
                      ? "#DAA520"
                      : "#ff2a66",
                }}
              >
                {v?.achived || ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
