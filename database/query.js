import * as SQLite from "expo-sqlite";
import { Request, Request_Tag, Tag, Reminder, Frequency } from "./objects";

const db = SQLite.openDatabase("db.cupray");

export function getCategories(callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT name, tagID from categories ORDER BY name;",
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
