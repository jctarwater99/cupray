import * as SQLite from "expo-sqlite";

// This function should probably get called every time the app loads?
// If we can only call it once, (like the welcome screen?) that would be ideal.
export function createDatabase() {
  const db = SQLite.openDatabase("db.cupray");
  db.transaction((tx) => {
    // TODO: These 5 commands will need to be removed eventually
    // TODO: These are only for keeping a clean DB while testing/developing
    tx.executeSql("DROP TABLE IF EXISTS requests", []);
    tx.executeSql("DROP TABLE IF EXISTS tags", []);
    tx.executeSql("DROP TABLE IF EXISTS reminders", []);
    tx.executeSql("DROP TABLE IF EXISTS request_tags", []);
    tx.executeSql("DROP TABLE IF EXISTS categories", []);

    // Requests
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS requests (" +
        "id INTEGER PRIMARY KEY," +
        "subject	TEXT, " +
        "description	TEXT," +
        "create_time	TEXT," +
        "expire_time	TEXT," +
        "remind_freq	INT," +
        "remind_time	TEXT," +
        "daily_weight INT," +
        "notification_weight INT," +
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
        "id INTEGER PRIMARY KEY," +
        "requestID	INT, " +
        "tagID	INT, " +
        "FOREIGN KEY (requestID) REFERENCES requests(id),",
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
        "id INTEGER PRIMARY KEY," +
        "name TEXT," +
        "tagID INT, " +
        "reminder_freq INT, " +
        "reminder_time TEXT, " +
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
        "reminderID		INTEGER PRIMARY KEY," +
        "requestID		INT," +
        "FOREIGN KEY (requestID) REFERENCES requests(id));",
      null,
      () => void 0,
      (tx, result) => {
        console.log("Creating 'reminders' table failed", result);
      }
    );
  });
  console.log("Finished createDatabase()");
}
