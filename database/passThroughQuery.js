import * as SQLite from "expo-sqlite";
import { Request, Request_Tag, Tag, Reminder, Frequency } from "./objects";

const db = SQLite.openDatabase("db.cupray");

// function for getting categories
// catNum is carried through for use in callback
export function getCategories(callback, catNum) {
    db.transaction(getCats2(callback, catNum));
}
  
// returns a function that has the right context/scope to access catNum
function getCats2(callback, catNum) {
    return function(tx) {
        tx.executeSql(
            "SELECT * from categories ORDER BY name;",
            [],
            // Why is tx passed in here?
            (tx, result) => {
                callback(result.rows._array, catNum);
            },
            (tx, result) => {
                console.log("getCategories query failed", result);
            }
        );
    }
}

export function getRequestsInCategory(categoryId, callback, category) {
    db.transaction(getReqs2(categoryId, callback, category));
}
  
function getReqs2(categoryId, callback, category) {    
    return function(tx) {
        tx.executeSql(
            "SELECT DISTINCT requests.subject, requests.id, requests.weight, requests.priority, requests.description FROM requests " +
            "INNER JOIN request_tags as RT ON RT.requestID = requests.id " +
            "INNER JOIN tags ON RT.tagID = tags.id " +
            "WHERE tags.id = ?; " +
            "EXCEPT " +
            "SELECT requests.subject, requests.id FROM requests " +
            "INNER JOIN request_tags as RT ON RT.requestID = requests.id " +
            "INNER JOIN tags ON RT.tagID = tags.id " +
            "tags.name = 'expired';",
            [categoryId],
            (tx, result) => {
                callback(result.rows._array, category);
            },
            (tx, result) => {
                console.log("getRequestsInCategory query failed", result);
            }
        );
    }
}

export function updateWeight(reqID, weight) {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE requests SET weight = ? WHERE requests.id = ?;",
      [
        weight,
        reqID,
      ],
      () => void 0,
      (tx, result) => {
        console.log("Updating weight failed", result);
      }
    );
  });
}