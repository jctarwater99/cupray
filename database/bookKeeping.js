import * as SQLite from "expo-sqlite";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as queries from "./query";
import * as updates from "./update";

// Call this function at the end of every useEffect()
export function checkBooks() {
  let date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  queries.getFlag("lastScheduled", (lastScheduled) => {
    // Check when requests were last scheduled
    let lastDate = new Date(lastScheduled.value);

    if (date.getTime() == lastDate.getTime()) {
      return;
    }
    updates.setFlag("lastScheduled", date.toString());
    updates.archive(date.getTime());

    // Check when requests were last added (do they need to be rescheduled?)
    // if so, reschedule
  });
}
