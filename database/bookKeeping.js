import * as SQLite from "expo-sqlite";

// Call this function at the end of every useEffect()
export function checkBooks() {
  // Check when requests were last scheduled
  // Check when requests were last added (do they need to be rescheduled?)
  // if so, reschedule
  // check when requests were last archived
  // if not recently, archive them
}
