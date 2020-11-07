export class Request {
  constructor() {
    this.subject = ""; // Max 25?
    this.description = ""; // Max 300?
    this.create_time = "";
    this.expire_time = "";
    this.remind_freq = 0;
    this.remind_time = "";
    this.daily_weight = 0;
    this.notification_weight = 0;
    this.priority = 0;
  }
}
export class Tag {
  constructor() {
    this.name = ""; // max 10?
  }
}
export class RequestTag {
  requestID = 0;
  tagID = 0;
}
export class Reminder {
  requestID = 0;
  reminderID = 0;
}
export class Category {
  name = ""; // Max 10?
  TagID = 0;
  reminder_freq = 0;
  reminder_time = "";
}

export const Frequency = {
  ARCHIVED: 0, // *
  NONE: 1, // For reminders that are organized by category not request
  FUTURE_DATE: 2,
  ANNUALLY: 3,
  BIANUALLY: 4,
  QUARTERLY: 5,
  MONTHLY: 6, // *
  BIMONTHLY: 7,
  WEEKLY: 8, // *
  BIWEEKLY: 9, // *
  TRIWEEKLY: 10,
  DAILY: 11, // *
};

export const Priority = {
  LOW: 0,
  MED: 1,
  HIGH: 2,
};
