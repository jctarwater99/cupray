import * as queries from "./query";
import * as updates from "./update";
import * as scheduler from "../schedule/scheduler";

// Call this function at the end of every useEffect()
export function checkBooks() {
  let currDate = new Date();
  currDate.setHours(0);
  currDate.setMinutes(0);
  currDate.setSeconds(0);
  currDate.setMilliseconds(0);

  queries.getFlag("lastScheduled", (lastScheduled) => {
    // Check when requests were last scheduled
    let lastDate = new Date(lastScheduled.value);

    if (currDate.getTime() == lastDate.getTime()) {
      return;
    }
    updates.setFlag("lastScheduled", currDate.toString());
    updates.archive(currDate.getTime());
    // Schedule
    scheduler.scheduleNotifs();
    scheduler.selectQuietTimeRequests();

    // Also, don't forget to call Noah's reschedule whenever creating new requests
    // And delete notifications when requests are deleted either manually or through category
  });
}
