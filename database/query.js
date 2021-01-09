import * as SQLite from "expo-sqlite";
import { Request, Request_Tag, Tag, Reminder, Frequency } from "./objects";

const db = SQLite.openDatabase("db.cupray");

export function testQuery() {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT subject, weight, previous_weight FROM requests",
      [],
      (tx, result) => {
        console.log(result);
      }
    );
  });
}

export function getAllTables() {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT name FROM sqlite_master " +
        "WHERE type IN ('table','view') " +
        "AND name NOT LIKE 'sqlite_%' " +
        "ORDER BY 1;",
      [],
      (tx, result) => {
        console.log(result);
      }
    );
  });
}

export function getCategories(callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * from categories ORDER BY name;",
      [],
      (tx, result) => {
        callback(result.rows._array);
      },
      (tx, result) => {
        console.log("getCategories query failed", result);
      }
    );
  });
}

// Broken? or not populated?
export function getTags(callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT name, id from tags ORDER BY name;",
      [],
      (tx, result) => {
        callback(result.rows._array);
      },
      (tx, result) => {
        console.log("getTags query failed", result);
      }
    );
  });
}

export function getRequestsInCategory(categoryId, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT DISTINCT requests.subject, requests.id FROM requests " +
        "INNER JOIN request_tags as RT ON RT.requestID = requests.id " +
        "INNER JOIN tags ON RT.tagID = tags.id " +
        "WHERE tags.id = ? ORDER BY requests.subject; " +
        "EXCEPT " +
        "SELECT requests.subject, requests.id FROM requests " +
        "INNER JOIN request_tags as RT ON RT.requestID = requests.id " +
        "INNER JOIN tags ON RT.tagID = tags.id " +
        "tags.name = 'expired'; ",
      [categoryId],
      (tx, result) => {
        callback(result.rows._array);
      },
      (tx, result) => {
        console.log("getRequestsInCategory query failed", result);
      }
    );
  });
}

// Currently probably results in duplicates
// Need to do select * from requests except
// select start from requests, tags, RTs were
// RTs.tag = expired
// Yep, that should fix it.
export function getAllActiveRequests(callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * from requests, tags, request_tags as rt " +
        "WHERE rt.requestID = request.id AND rt.tagID = tags.id " +
        "EXCEPT WHERE tags.name = 'expired';",
      [],
      (tx, result) => {
        callback(result.rows._array);
      },
      (tx, result) => {
        console.log("getAllActiveRequests query failed", result);
      }
    );
  });
}

export function getRequest(id, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM requests WHERE requests.id = ?;",
      [id],
      (tx, result) => {
        callback(result.rows._array[0]);
      },
      (tx, result) => {
        console.log("getRequest query failed", result);
      }
    );
  });
}

export function getTagsForRequest(id, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT DISTINCT tags.name, tags.id FROM tags, request_tags " +
        "ON request_tags.tagID = tags.id " +
        "WHERE request_tags.requestID = ? ORDER BY name;",
      [id],
      (tx, result) => {
        callback(result.rows._array);
      },
      (tx, result) => {
        console.log("getRequest query failed", result);
      }
    );
  });
}

export function getDailyRequests(callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM daily_requests, requests " +
        "WHERE requests.id = daily_requests.requestID;",
      [],
      (tx, result) => {
        callback(result.rows._array);
      },
      (tx, result) => {
        console.log("getDailyRequests query failed", result);
      }
    );
  });
}

export function getNewReqId(callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT id FROM requests ORDER BY id DESC LIMIT 1;",
      [],
      (tx, result) => {
        callback(result.rows._array[0].id);
      },
      (tx, result) => {
        console.log("Get 'New Request' id query failed", result);
      }
    );
  });
}
