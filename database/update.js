import * as SQLite from "expo-sqlite";
import { Request, Request_Tag, Tag, Reminder, Frequency } from "./objects";

const db = SQLite.openDatabase("db.cupray");

export function updateRequest(reqID, request) {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE requests SET subject = ?, description = ?, " +
        "expire_time = ?, remind_freq = ?, remind_time = ?, " +
        "priority = ? WHERE requests.id = ?;",
      [
        request.subject,
        request.description,
        request.expire_time,
        request.remind_freq,
        request.remind_time,
        request.priority,
        reqID,
      ],
      () => void 0,
      (tx, result) => {
        console.log("Updating request failed", result);
      }
    );
  });
}
