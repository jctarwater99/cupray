class Request {
  subject = "";
  description = "";
  create_time = "";
  expire_time = "";
  remind_freq = 0;
  remind_time = "";
}
class Tag {
  name = "";
}
class RequestTag {
  requestID = 0;
  tagID = 0;
}
class Reminder {
  requestID = 0;
  reminderID = 0;
}
class Category {
  name = "";
  TagID = 0;
  reminder_freq = 0;
  reminder_time = "";
}

const Frequency = {
  EXPIRED: 0, // *
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
