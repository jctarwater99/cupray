import * as SQLite from "expo-sqlite";
import { Request, Request_Tag, Tag, Reminder, Frequency } from "./objects";

const db = SQLite.openDatabase("db.cupray");

export function updateRequest(reqID, request) {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE requests SET subject = ?, description = ?, " +
        "expire_time = ?, remind_freq = ?, remind_days = ?, " +
        "remind_time = ?, priority = ? WHERE requests.id = ?;",
      [
        request.subject,
        request.description,
        request.expire_time,
        request.remind_freq,
        request.remind_days,
        request.remind_time,
        request.priority,
        reqID,
      ],
      () => void 0,
      (tx, result) => {
        console.log("Updating request failed", result);
      }
    );
  });
}

export function updateRequestTag(reqID, oldCatID, newCatID) {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE request_tags SET tagID = ? " +
        "WHERE requestID = ? AND tagID = ?;",
      [newCatID, reqID, oldCatID],
      () => void 0,
      (tx, result) => {
        console.log("Updating request tag failed", result);
      }
    );
  });
}

export function deleteCategory(catID) {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM categories WHERE tagID = ?",
      [catID],
      () => void 0,
      (tx, result) => {
        console.log("Deleting category failed", result);
      }
    );
  });
}
export function deleteTag(tagID) {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM tags WHERE id = ?",
      [tagID],
      () => void 0,
      (tx, result) => {
        console.log("Deleting tag failed", result);
      }
    );
  });
}
export function editCategory(cat) {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE categories SET name = ?, remind_days = ?, remind_time = ? WHERE tagID = ?",
      [cat.name, cat.remind_days, cat.remind_time, cat.tagID],
      (tx, result) => {
        console.log("Why tho:", result);
      },
      (tx, result) => {
        console.log("Updating category failed", result);
      }
    );
  });
}
export function editTag(newTagName, tagID) {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE tags SET name = ? WHERE id = ?",
      [newTagName, tagID],
      () => void 0,
      (tx, result) => {
        console.log("Updating tag failed", result);
      }
    );
  });
}

export function deleteRequest(reqID) {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM requests WHERE requests.id = ?",
      [reqID],
      () => void 0,
      (tx, result) => {
        console.log("Deleting request failed", result);
      }
    );
  });
}

export function rollbackNotificationWeight() {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE requests SET weight = previous_weight ",
      [],
      () => void 0,
      (tx, result) => {
        console.log("Failed ", result);
      }
    );
  });
}

export function deleteRequestTag(requestTag) {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM request_tags WHERE requestID = ? AND tagID = ?",
      [requestTag.requestID, requestTag.tagID],
      () => void 0,
      (tx, result) => {
        console.log("Deleting tag failed", result);
      }
    );
  });
}

export function editFlag(flagName, newFlagValue) {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE flags SET value = ? WHERE name = ?",
      [newFlagValue, flagName],
      () => void 0,
      (tx, result) => {
        console.log("Updating flag failed", result);
      }
    );
  });
}

//
//
//
//
//
//
//

export function deleteRequestTagsInCategory(catID) {
  db.transaction((tx) => {
    // delete request_tags in this list
    // select all requests tags in this list of requests
    // select all requests in the category
    // This query is dumb

    tx.executeSql(
      "DELETE FROM request_tags WHERE request_tags.id IN ( " +
        "SELECT request_tags.id FROM request_tags WHERE request_tags.requestID IN ( " +
        "SELECT requests.id FROM requests " +
        "INNER JOIN request_tags as RT ON RT.requestID = requests.id " +
        "INNER JOIN tags ON RT.tagID = tags.id " +
        "WHERE tags.id = ? ))",
      [catID],
      (tx, result) => {
        deleteRequestsInCategory();
      },
      (tx, result) => {
        console.log("Deleting request tags in category failed", result);
      }
    );
  });
}

export function deleteRequestsInCategory() {
  db.transaction((tx) => {
    // delete requests in this list
    // select all requests except these
    // select all distinct requests that are associated with tags
    // also don't get the first request

    tx.executeSql(
      "DELETE FROM requests WHERE requests.id IN ( " +
        "SELECT * FROM ( " +
        "SELECT requests.id FROM requests EXCEPT " +
        "SELECT DISTINCT requests.id FROM requests " +
        "INNER JOIN request_tags as RT ON RT.requestID = requests.id " +
        "EXCEPT SELECT requests.id FROM requests WHERE requests.id = 1 ))",
      [],
      () => void 0,
      (tx, result) => {
        console.log("Deleting requets in category failed", result);
      }
    );
  });
}

export function deleteRequestTagsOfReq(reqID) {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM request_tags WHERE request_tags.id IN ( " +
        "SELECT request_tags.id FROM request_tags WHERE request_tags.requestID IN ( " +
        "SELECT requests.id FROM requests " +
        "WHERE requests.id = ? ))",
      [reqID],
      (tx, result) => {
        deleteRequest(reqID);
      },
      (tx, result) => {
        console.log("Deleting request tags failed", result);
      }
    );
  });
}
export function deleteRequestTagsOfTag(tagID) {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM request_tags WHERE request_tags.tagID = ?",
      [tagID],
      () => void 0,
      (tx, result) => {
        console.log("Deleting request tags failed", result);
      }
    );
  });
}

export function archiveRequestsInCategory(catID) {
  //
  // Ok, so in theory, this should work, right?
  //
  // Insert into request tags (requests, expiredTagId)
  //    Every requests in catID
  //    except requests that have tags that are cats that != catId
  //    Union? requests that already have expired tags
  //

  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO request_tags(requestID, tagId) " +
        "SELECT DISTINCT id, 1 as tagId FROM ( " +
        "SELECT requests.id FROM requests " +
        "INNER JOIN request_tags as RT ON RT.requestID = requests.id " +
        "INNER JOIN tags ON RT.tagID = tags.id " +
        "WHERE tags.id = ? " +
        "EXCEPT SELECT * FROM (" +
        "SELECT requests.id FROM requests " +
        "INNER JOIN request_tags as RT ON RT.requestID = requests.id " +
        "INNER JOIN categories ON RT.tagID = categories.tagID " +
        "WHERE RT.tagID != ? " +
        "UNION " +
        "SELECT requests.id FROM requests " +
        "INNER JOIN request_tags as RT ON RT.requestID = requests.id " +
        "WHERE RT.tagID = 1))",
      [catID, catID],
      () => void 0,
      (tx, result) => {
        console.log("Archiving requests in category failed", result);
      }
    );
  });
}

export function archiveRequest(reqID) {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO request_tags(requestID, tagId) VALUES(?, 1)",
      [reqID],
      () => void 0,
      (tx, result) => {
        console.log("Archiving requests in category failed", result);
      }
    );
  });
}
