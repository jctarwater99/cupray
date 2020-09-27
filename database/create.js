import * as SQLite from "expo-sqlite";

// This function should probably get called every time the app loads?
// If we can only call it once, (like the welcome screen?) that would be ideal.
export function createDatabase() {
  const db = SQLite.openDatabase("db.cupray");
  db.transaction((tx) => {
    // TODO: These 5 commands will need to be removed eventually
    // TODO: These are only for keeping a clean DB while testing/developing
    tx.executeSql("DROP TABLE IF EXISTS requests", [], function (tx, res) {
      console.log("Executed drop requests");
    });
    tx.executeSql("DROP TABLE IF EXISTS tags", [], function (tx, res) {
      console.log("Executed drop tags");
    });
    tx.executeSql("DROP TABLE IF EXISTS reminders", [], function (tx, res) {
      console.log("Executed drop reminders");
    });
    tx.executeSql("DROP TABLE IF EXISTS request_tags", [], function (tx, res) {
      console.log("Executed drop request_tags");
    });
    tx.executeSql("DROP TABLE IF EXISTS categories", [], function (tx, res) {
      console.log("Executed drop categores");
    });

    // Requests
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS requests (" +
        "id INT AUTO_INCREMENT PRIMARY KEY," +
        "subject	TEXT, " +
        "description	TEXT," +
        "create_time	TEXT," +
        "expire_time	TEXT," +
        "remind_freq	INT," +
        "remind_time	TEXT);",
      null,
      () => void 0,
      (tx, result) => {
        console.log("Creating 'requests' table failed", result);
      }
    );

    // Tags
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS tags ( " +
        "id INT AUTO_INCREMENT PRIMARY KEY," +
        "name		TEXT," +
        "FOREIGN KEY (requestID) REFERENCES requests(id));",
      null,
      () => void 0,
      (tx, result) => {
        console.log("Creating 'tags' table failed", result);
      }
    );

    // Request Tags
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS request_tags ( " +
        "id INT AUTO_INCREMENT PRIMARY KEY," +
        "requestID	INT, " +
        "tagID	INT, " +
        "FOREIGN KEY (requestID) REFERENCES requests(id));",
      null,
      () => void 0,
      (tx, result) => {
        console.log("Creating 'tags' table failed", result);
      }
    );

    // Categories
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS categories ( " +
        "ID INT AUTO_INCREMENT PRIMARY KEY," +
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
        "reminderID		INT PRIMARY KEY," +
        "requestID		INT," +
        "FOREIGN KEY (requestID) REFERENCES requests(id));",
      null,
      () => void 0,
      (tx, result) => {
        console.log("Creating 'reminders' table failed", result);
      }
    );
  });
}
