import * as SQLite from "expo-sqlite";
// Do I need this import?
import {
  Request,
  Request_Tag,
  Tag,
  Reminder,
  Category,
  Frequency,
} from "./objects";

// These functions are starting to feel repetitive.
// We could probably create a "do sql" function that takes an sql string, [] of args, and an error/success message
// This file would look nicer. Other files would not. Probably better to do this huh.

const db = SQLite.openDatabase("db.cupray");

export function insertRequest(request) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO requests(subject, description, create_time," +
        "expire_time, remind_freq, remind_days, remind_time, daily_weight, " +
        "notification_weight, priority) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [
        request.subject,
        request.description,
        request.create_time,
        request.expire_time,
        request.remind_freq,
        request.remind_days,
        request.remind_time,
        request.daily_weight,
        request.notification_weight,
        request.priority,
      ],
      () => void 0,
      (tx, result) => {
        console.log("Inserting request failed", result);
      }
    );
  });
}
export function insertTag(tag) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO tags(name) VALUES(?);",
      [tag.name],
      () => void 0,
      (tx, result) => {
        console.log("Inserting tag failed", result);
      }
    );
  });
}
export function insertRequestTag(requestTag) {
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
export function insertCategory(category) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO categories(name, tagID, remind_freq, remind_days, remind_time) VALUES(?, ?, ?, ?, ?);",
      [
        category.name,
        category.tagID,
        category.remind_freq,
        category.remind_days,
        category.remind_time,
      ],
      () => void 0,
      (tx, result) => {
        console.log("Inserting reminder failed", result);
      }
    );
  });
}

export function insertNewRequest(request, catID) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO requests(subject, description, create_time," +
        "expire_time, remind_freq, remind_days, remind_time, daily_weight, " +
        "notification_weight, priority) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [
        request.subject,
        request.description,
        request.create_time,
        request.expire_time,
        request.remind_freq,
        request.remind_days,
        request.remind_time,
        request.daily_weight,
        request.notification_weight,
        request.priority,
      ],
      (tx, result) =>
        insertRequestTag({ requestID: result.insertId, tagID: catID }),
      (tx, result) => {
        console.log("Inserting request failed", result);
      }
    );
  });
}

export function insertNewTag(tagName, Category) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO tags(name) VALUES(?);",
      [tagName],
      (tx, result) => {
        Category.tagID = result.insertId;
        insertCategory(Category);
      },
      (tx, result) => {
        console.log("Inserting requestTag failed", result);
      }
    );
  });
}
