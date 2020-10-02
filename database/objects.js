export class Request {
  constructor() {
    this.subject = "";
    this.description = "";
    this.create_time = "";
    this.expire_time = "";
    this.remind_freq = 0;
    this.remind_time = "";
  }
}
export class Tag {
  constructor() {
    this.name = "";
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
  name = "";
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
