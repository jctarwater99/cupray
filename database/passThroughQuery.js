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
  