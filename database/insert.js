import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("db.cupray");

export function insertFlag(name, value) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO flags(name, value) VALUES(?, ?);",
      [name, value],
      () => void 0,
      (tx, result) => {
        console.log("Inserting flag failed", result);
      }
    );
  });
}

export function insertRequest(request) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO requests(subject, description, create_time," +
        "expire_time, remind_days, remind_time, " +
        "weight, priority) VALUES(?, ?, ?, ?, ?, ?, ?, ?);",
      [
        request.subject,
        request.description,
        request.create_time,
        request.expire_time,
        request.remind_days,
        request.remind_time,
        request.weight,
        request.priority,
      ],
      () => void 0,
      (tx, result) => {
        console.log("Inserting request failed", result);
      }
    );
  });
}
export function insertTag(tag, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO tags(name) VALUES(?);",
      [tag.name],
      (tx, result) => {
        if (callback != undefined) {
          callback();
        }
      },
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

export function insertCategory(category, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO categories(name, tagID, remind_days, remind_time) VALUES(?, ?, ?, ?);",
      [
        category.name,
        category.tagID,
        category.remind_days,
        category.remind_time,
      ],
      (tx, result) => {
        if (callback != undefined) {
          callback();
        }
      },
      (tx, result) => {
        console.log("Inserting category failed", result);
      }
    );
  });
}

export function insertNewRequest(request, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO requests(subject, description, create_time," +
        "expire_time, remind_days, remind_time, " +
        "weight, priority) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [
        request.subject,
        request.description,
        request.create_time,
        request.expire_time,
        request.remind_days,
        request.remind_time,
        request.weight,
        request.priority,
      ],
      (tx, result) => {
        callback(result.insertId);
      },
      (tx, result) => {
        console.log("Inserting request failed", result);
      }
    );
  });
}

export function insertNewTag(tagName, cat, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO tags(name) VALUES(?);",
      [tagName],
      (tx, result) => {
        cat.tagID = result.insertId;
        insertCategory(cat, callback);
      },
      (tx, result) => {
        console.log("Inserting tag failed", result);
      }
    );
  });
}
export function insertDailyRequest(request) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO daily_requests(requestID, isPrayedFor, category) VALUES(?, ?, ?);",
      [request.requestID, request.isPrayedFor, request.category],
      () => void 0,
      (tx, result) => {
        console.log("Inserting Daily Request failed", result);
      }
    );
  });
}
