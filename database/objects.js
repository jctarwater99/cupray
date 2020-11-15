export class Request {
  constructor() {
    this.subject = ""; // Max 25?
    this.description = ""; // Max 300?
    this.create_time = "";
    this.expire_time = "";
    this.remind_freq = 0;
    this.remind_days = "";
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
  remind_freq = 0;
  remind_days = "";
  remind_time = "";
}

export const Frequency = {
  ARCHIVED: 0, // *
  SAME_AS_CATEGORY: 1, // For reminders that are organized by category not request
  WEEKLY: 2, // *
};

export const Priority = {
  LOW: 0,
  MED: 1,
  HIGH: 2,
};
