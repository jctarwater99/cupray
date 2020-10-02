import * as SQLite from "expo-sqlite";
import { Request, Request_Tag, Tag, Reminder, Frequency } from "./objects";

export function getCategories() {
  const db = SQLite.openDatabase("db.cupray");
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT name, tagID from categories ORDER BY name;",
      [],
      () => void 0,
      (tx, result) => {
        console.log("getCategories query failed", result);
      }
    );
  });
}
export function getTags() {
  const db = SQLite.openDatabase("db.cupray");
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT name, id from tags ORDER BY name;",
      [],
      (tx, result) => {
        console.log("getTags query succeeded");
        //this.state.tags = result.rows._array;
      },
      //() => void 0,
      (tx, result) => {
        console.log("getTags query failed", result);
      }
    );
  });
}
