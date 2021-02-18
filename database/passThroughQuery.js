import * as SQLite from "expo-sqlite";
import { Request, Request_Tag, Tag, Reminder, Frequency } from "./objects";

const db = SQLite.openDatabase("db.cupray");

// function for getting categories
// catNum is carried through for use in callback
export function getCategories(callback, catNum, startDayNum) {
  db.transaction(getCats2(callback, catNum, startDayNum));
}

// returns a function that has the right context/scope to access catNum
function getCats2(callback, catNum, startDayNum) {
  return function (tx) {
    tx.executeSql(
      "SELECT * from categories ORDER BY name;",
      [],
      // Why is tx passed in here?
      (tx, result) => {
        callback(result.rows._array, catNum, startDayNum);
      },
      (tx, result) => {
        console.log("getCategories query failed", result);
      }
    );
  };
}

export function getRequestsInCategory(
  categoryId,
  callback,
  category,
  startDayNum
) {
  db.transaction(getReqs2(categoryId, callback, category, startDayNum));
}

function getReqs2(categoryId, callback, category, startDayNum) {
  return function (tx) {
    tx.executeSql(
      "SELECT DISTINCT requests.subject, requests.id, requests.weight, requests.priority, " +
        "requests.description, tags.name as category FROM requests " +
        "INNER JOIN request_tags as RT ON RT.requestID = requests.id " +
        "INNER JOIN tags ON RT.tagID = tags.id " +
        "WHERE tags.id = ? AND requests.id IN ( " +
        "SELECT requests.id FROM requests " +
        "INNER JOIN request_tags as RT ON RT.requestID = requests.id " +
        "INNER JOIN tags ON RT.tagID = tags.id " +
        "WHERE tags.id = ? " +
        "EXCEPT " +
        "SELECT requests.id FROM requests " +
        "INNER JOIN request_tags as RT ON RT.requestID = requests.id " +
        "INNER JOIN tags ON RT.tagID = tags.id " +
        "WHERE tags.name = 'Archived')",
      [categoryId, categoryId],
      (tx, result) => {
        callback(result.rows._array, category, startDayNum);
      },
      (tx, result) => {
        console.log("getRequestsInCategory query failed", result);
      }
    );
  };
}

export function updateWeight(reqID, weight) {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE requests SET weight = ? WHERE requests.id = ?;",
      [weight, reqID],
      () => void 0,
      (tx, result) => {
        console.log("Updating weight failed", result);
      }
    );
  });
}

export function resetReminders(callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE requests SET weight = requests.priority;",
      [],
      () => {
        tx.executeSql(
          "DELETE FROM reminders;",
          [],
          () => {
            callback();
          },
          (tx, result) => {
            console.log("Clearing reminders failed", result);
          }
        );
      },
      (tx, result) => {
        console.log("Updating request failed", result);
      }
    );
  });
}

export function insertReminder(reminder) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO reminders(reminderID, requestID, furthestDate) VALUES(?, ?, ?);",
      [reminder.reminderID, reminder.requestID, reminder.furthestDate],
      () => void 0,
      (tx, result) => {
        console.log("Inserting reminder failed", result);
      }
    );
  });
}

export function getReminders(callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * from reminders;",
      [],
      (tx, result) => {
        callback(result.rows._array);
      },
      (tx, result) => {
        console.log("getReminders query failed", result);
      }
    );
  });
}

export function clearDailyRequests(callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM daily_requests;",
      [],
      () => {
        callback();
      },
      () => {
        console.log("clearDailyRequests failed");
      }
    );
  });
}
