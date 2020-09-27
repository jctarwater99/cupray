import * as SQLite from "expo-sqlite";
import * as db_insert from "./database/insert";
import { Request, Request_Tag, Tag, Reminder } from "./database/objects";

export function populateDB() {
  populateDBwithRequests();
  populateDBwithTags();
  populateDBwithRequestTags();
  populateDBwithReminders();
  populateDBwithReminders();
}

export function populateDBwithRequests() {
  requests = [];
  request = new Request();
  request.subject = "Senior Design";
  request.description =
    "That I would not worry about deadlines and finishing in time but rather that I would be " +
    "diligent and make sure everyone one the team knows what to do and is getting stuff done.";
  request.create_time = "2020-09-25T17:15:14+0000";
  request.expire_time = "2020-10-10T17:15:14+0000";
  request.remind_freq = 2;
  request.remind_time = "17:15:00";
  requests.push(request);

  request = new Request();
  request.subject = "Depressed Friend";
  request.description =
    "I have a friend who is suffering from depression. I'm praying to ask God to help me know " +
    "what, if anything I can do to help this friend and make them feel loved while still pushing them toward God.";
  request.create_time = "2020-09-24T17:15:14+0000";
  request.expire_time = "2020-10-09T17:15:14+0000";
  request.remind_freq = 2;
  request.remind_time = "19:15:00";
  requests.push(request);

  request = new Request();
  request.subject = "Reliance on God";
  request.description =
    "God, it's really easy to focus on myself instead of you and to get overwhelmed by life. Please help me " +
    "to pray without ceasing so that I will focus on you more instead of myself.";
  request.create_time = "2020-09-22T14:15:14+0000";
  request.expire_time = "2020-10-07T14:15:14+0000";
  request.remind_freq = 2;
  request.remind_time = "19:15:00";
  requests.push(request);
}

export function populateDBwithTags() {}

export function populateDBwithCategories() {}

export function populateDBwithRequestTags() {}

export function populateDBwithReminders() {}
