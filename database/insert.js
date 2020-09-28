import * as SQLite from "expo-sqlite";
// Do I need this import?
import { Request, Request_Tag, Tag, Reminder, Frequency } from "./objects";

// These functions are starting to feel repetitive.
// We could probably create a "do sql" function that takes an sql string, [] of args, and an error/success message
// This file would look nicer. Other files would not. Probably better to do this huh.

export function insertRequest(request) {
  const db = SQLite.openDatabase("db.cupray");
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO requests(subject, description, create_time," +
        "expire_time, remind_freq, remind_time) VALUES(?, ?, ?, ?, ?, ?);",
      [
        request.subject,
        request.description,
        request.create_time,
        request.expire_time,
        request.remind_freq,
        request.remind_time,
      ],
      () => void 0,
      (tx, result) => {
        console.log("Inserting request failed", result);
      }
    );
  });
}
export function insertTag(tag) {
  const db = SQLite.openDatabase("db.cupray");
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO tags(name) VALUES(?);",
      [tag.name],
      // (tx, res) => {
      //   console.log("Inserted: ", tag.name);
      // },
      () => void 0,
      (tx, result) => {
        console.log("Inserting tag failed", result);
      }
    );
  });
}
export function insertRequestTag(requestTag) {
  const db = SQLite.openDatabase("db.cupray");
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO request_tags(requestID, tagID) VALUES(?, ?);",
      [requestTag.requestID, requestTag.tagID],
      () => void 0,
      (tx, result) => {
        console.log("Inserting requestTag failed", result);
      }
    );
  });
}
export function insertReminder(reminder) {
  const db = SQLite.openDatabase("db.cupray");
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO reminders(reminderID, requestID) VALUES(?, ?);",
      [reminder.reminderID, reminder.requestID],
      () => void 0,
      (tx, result) => {
        console.log("Inserting reminder failed", result);
      }
    );
  });
}
