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

// I hate this query, given me so much trouble
export function getRequestsInCategory(categoryId, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT DISTINCT requests.subject, requests.id FROM requests " +
        "INNER JOIN request_tags as RT ON RT.requestID = requests.id " +
        "INNER JOIN tags ON RT.tagID = tags.id " +
        "WHERE tags.id = ? " +
        "EXCEPT " +
        "SELECT requests.subject, requests.id FROM requests " +
        "INNER JOIN request_tags as RT ON RT.requestID = requests.id " +
        "INNER JOIN tags ON RT.tagID = tags.id " +
        "WHERE tags.id = 1 " +
        "ORDER BY requests.subject",
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

export function getAllRequests(callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT requests.id, subject, name FROM requests " +
        "INNER JOIN request_tags ON requests.id = request_tags.requestID " +
        "INNER JOIN categories ON categories.tagID = request_tags.tagID " +
        "ORDER BY requests.id;",
      [],
      (tx, result) => {
        callback(result.rows._array);
      },
      (tx, result) => {
        console.log("getAllRequests query failed", result);
      }
    );
  });
}

export function getAllRequestsInCategory(category, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT name, requestID, subject FROM requests " +
        "INNER JOIN request_tags as RT on RT.requestID = requests.id " +
        "INNER JOIN tags on tags.id = RT.tagID " +
        "WHERE UPPER(tags.name) LIKE UPPER(?) " +
        "ORDER BY requests.expire_time",
      [category],
      (tx, result) => {
        callback(result.rows._array);
      },
      (tx, result) => {
        console.log("getAllRequests in category query failed", result);
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
        console.log("get tags for request query failed", result);
      }
    );
  });
}

// export function getDailyRequests(callback) {
//   db.transaction((tx) => {
//     tx.executeSql(
//       "SELECT DISTINCT daily_requests.id as dID, subject, requests.id as rID, " +
//         "isPrayedFor, categories.name as cat_name FROM daily_requests " +
//         "INNER JOIN requests ON requests.id = daily_requests.requestID " +
//         "INNER JOIN request_tags ON requests.id = request_tags.requestID " +
//         "INNER JOIN categories ON categories.tagID = request_tags.tagID;",
//       [],
//       (tx, result) => {
//         callback(result.rows._array);
//       },
//       (tx, result) => {
//         console.log("getDailyRequests query failed", result);
//       }
//     );
//   });
// }

export function getDailyRequests(callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT DISTINCT subject, requests.id as id, isPrayedFor, category FROM daily_requests " +
        "INNER JOIN requests ON requests.id = daily_requests.requestID;",
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

export function getCategoriesWithActiveCount(callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT tagID, name, remind_days, remind_time, count(requests) as active_count FROM (" +
        "SELECT DISTINCT requests.id as requests, categories.name, categories.tagID, " +
        "categories.name, categories.remind_days, categories.remind_time FROM requests " +
        "INNER JOIN request_tags as RT ON requests.id = RT.requestID " +
        "INNER JOIN categories ON categories.tagID = RT.tagID " +
        "WHERE requests.id IN (" +
        "SELECT requests.id FROM requests " +
        "INNER JOIN request_tags as RT ON requests.id = RT.requestID " +
        "EXCEPT " +
        "SELECT requests.id FROM requests " +
        "INNER JOIN request_tags as RT ON requests.id = RT.requestID " +
        "WHERE RT.tagID = 1)) " +
        "GROUP BY name ",
      [],
      (tx, result) => {
        //console.log(result.rows._array);
        callback(result.rows._array);
      },
      (tx, result) => {
        console.log("Get categories with active count failed", result);
      }
    );
  });
}
export function getTagsForTagsPage(callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM ( " +
        "SELECT name, id, 0 as isCategory from tags WHERE tags.name != 'Archived' " +
        "EXCEPT " +
        "SELECT name, tagID as id, 0 as isCategory from categories " +
        "UNION " +
        "SELECT name, tagID as id, 1 as isCategory from categories ) " +
        "ORDER BY name",
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
export function getFlag(name, callback) {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT value FROM flags WHERE name = ?",
      [name],
      (tx, result) => {
        callback(result.rows._array[0]);
      },
      (tx, result) => {
        console.log("get flag query failed", result);
      }
    );
  });
}
