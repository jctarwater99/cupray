import * as SQLite from "expo-sqlite";

export function dropForTesting() {
  const db = SQLite.openDatabase("db.cupray");
  db.transaction((tx) => {
    tx.executeSql("DROP TABLE IF EXISTS flags");
    tx.executeSql("DROP TABLE IF EXISTS requests");
    tx.executeSql("DROP TABLE IF EXISTS tags");
    tx.executeSql("DROP TABLE IF EXISTS request_tags");
    tx.executeSql("DROP TABLE IF EXISTS categories");
    tx.executeSql("DROP TABLE IF EXISTS daily_requests");
    tx.executeSql("DROP TABLE IF EXISTS reminders");
  });
}

// This function should probably get called every time the app loads?
// If we can only call it once, (like the welcome screen?) that would be ideal.
export function createDatabase() {
  const db = SQLite.openDatabase("db.cupray");
  db.transaction((tx) => {
    // Flags
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS flags ( " +
        "id INTEGER PRIMARY KEY," +
        "name TEXT," +
        "value TEXT);",
      null,
      () => void 0,
      (tx, result) => {
        console.log("Creating 'flags' table failed", result);
      }
    );

    // Requests
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS requests (" +
        "id INTEGER PRIMARY KEY," +
        "subject	TEXT, " +
        "description	TEXT," +
        "create_time	TEXT," +
        "expire_time	TEXT," +
        "remind_freq	INT," +
        "remind_days  TEXT," +
        "remind_time	TEXT," +
        "previous_weight INT," +
        "weight       INT," +
        "priority     INT);",
      null,
      () => void 0,
      (tx, result) => {
        console.log("Creating 'requests' table failed", result);
      }
    );

    // Tags
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS tags ( " +
        "id INTEGER PRIMARY KEY," +
        "name		TEXT);",
      null,
      () => void 0,
      (tx, result) => {
        console.log("Creating 'tags' table failed", result);
      }
    );

    // Request Tags
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS request_tags ( " +
        "id INTEGER PRIMARY KEY, " +
        "requestID INT, " +
        "tagID INT, " +
        "FOREIGN KEY (requestID) REFERENCES requests(id)," +
        "FOREIGN KEY (tagID) REFERENCES tags(id));",
      null,
      () => void 0,
      (tx, result) => {
        console.log("Creating 'request_tags' table failed", result);
      }
    );

    // Categories
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS categories ( " +
        "tagID INTEGER PRIMARY KEY, " +
        "name TEXT, " +
        "remind_days TEXT," +
        "remind_time TEXT, " +
        "FOREIGN KEY (tagID) REFERENCES tags(id));",
      null,
      () => void 0,
      (tx, result) => {
        console.log("Creating 'categories' table failed", result);
      }
    );

    // Reminders
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS reminders ( " +
        "reminderID		TEXT PRIMARY KEY," +
        "requestID		INT," +
        "furthestDate		TEXT," +
        "FOREIGN KEY (requestID) REFERENCES requests(id));",
      null,
      () => void 0,
      (tx, result) => {
        console.log("Creating 'reminders' table failed", result);
      }
    );

    // Daily
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS daily_requests ( " +
        "id INTEGER PRIMARY KEY, " +
        "requestID INT, " +
        "isPrayedFor INT, " +
        "FOREIGN KEY (requestID) REFERENCES requests(id));",
      null,
      () => void 0,
      (tx, result) => {
        console.log("Creating 'categories' table failed", result);
      }
    );

    // Misc Variables
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS misc_vars ( " +
        "id INTEGER PRIMARY KEY, " +
        "has_logged_in_before INT);",
      null,
      () => void 0,
      (tx, result) => {
        console.log("Creating 'categories' table failed", result);
      }
    );
  });
  console.log("Finished createDatabase()");
}
