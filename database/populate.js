import * as SQLite from "expo-sqlite";
import * as db_insert from "./insert";
import {
  Request,
  RequestTag,
  Tag,
  Reminder,
  Frequency,
  Category,
} from "./objects";

export function populateDB() {
  populateDBwithRequests();
  populateDBwithTags();
  populateDBwithRequestTags();
  populateDBwithReminders();
  populateDBwithReminders();
  populateDBwithCategories();
}

export function populateDBwithRequests() {
  requests = [];

  // 1
  request = new Request();
  request.subject = "Senior Design";
  request.description =
    "That I would not worry about deadlines and finishing in time but rather that I would be " +
    "diligent and make sure everyone one the team knows what to do and is getting stuff done.";
  request.create_time = "2020-09-25T17:15:14+0000";
  request.expire_time = "2020-10-10T17:15:14+0000";
  request.remind_freq = 2;
  request.remind_time = "17:15:00";
  request.daily_weight = 1;
  request.notification_weight = 0;
  request.priority = 1;
  requests.push(request);

  // 2
  request = new Request();
  request.subject = "Depressed Friend";
  request.description =
    "I have a friend who is suffering from depression. I'm praying to ask God to help me know " +
    "what, if anything I can do to help this friend and make them feel loved while still pushing them toward God.";
  request.create_time = "2020-09-24T17:15:14+0000";
  request.expire_time = "2020-10-09T17:15:14+0000";
  request.remind_freq = 2;
  request.remind_time = "19:15:00";
  request.daily_weight = 3;
  request.notification_weight = 0;
  request.priority = 1;
  requests.push(request);

  // 3
  request = new Request();
  request.subject = "Sister's Unhealthy Relationship";
  request.description =
    "Lord, could you give my sister Agatha the wisdom and insight to see how bad this guy is?" +
    "Please show her that she can and should go to you for her worth and validation";
  request.create_time = "2020-09-28T14:15:14+0000";
  request.expire_time = "2020-12-30T14:15:14+0000";
  request.remind_freq = 11;
  request.remind_time = "19:20:00";
  request.daily_weight = 5;
  request.notification_weight = 7;
  request.priority = 0;
  requests.push(request);

  // 4
  request = new Request();
  request.subject = "Division in my church";
  request.description =
    "Lord, my church body has really been at eachother's throats and could you show them how" +
    " to live at peace with one another, loving like you love us?";
  request.create_time = "2020-09-22T14:15:14+0000";
  request.expire_time = "2020-10-07T14:15:14+0000";
  request.remind_freq = 8;
  request.remind_time = "08:05:00";
  request.daily_weight = 1;
  request.notification_weight = 0;
  request.priority = 0;
  requests.push(request);

  // 5
  request = new Request();
  request.subject = "I need a servant's heart!";
  request.description =
    "Lord, there are a lot of times when I feel the urge to think only of myself." +
    " Could you give me a servant's heart so that I can honor you with my life?";
  request.create_time = "2020-07-20T14:15:14+0000";
  request.expire_time = "2020-11-07T14:15:14+0000";
  request.remind_freq = 7;
  request.remind_time = "09:00:00";
  request.daily_weight = 5;
  request.notification_weight = 2;
  request.priority = 1;
  requests.push(request);

  // 6
  request = new Request();
  request.subject = "National Leadership";
  request.description =
    "Lord, you are the ultimate king, but you have ordained goverment to do good " +
    "and promote justice in the land. Would you lead our leaders in wisdom so that" +
    " our country can be at peace?";
  request.create_time = "2020-11-03T14:15:14+0000";
  request.expire_time = "2020-11-04T14:15:14+0000";
  request.remind_freq = 2;
  request.remind_time = "12:00:00";
  request.daily_weight = 0;
  request.notification_weight = 0;
  request.priority = 2;
  requests.push(request);

  // 7
  request = new Request();
  request.subject = "Bob";
  request.description = "Please make Bob the best physicist ever to live";
  request.create_time = "2020-09-22T14:15:14+0000";
  request.expire_time = "2020-10-07T14:15:14+0000";
  request.remind_freq = 11;
  request.remind_time = "19:15:00";
  request.daily_weight = 4;
  request.notification_weight = 4;
  request.priority = 1;
  requests.push(request);

  // 8
  request = new Request();
  request.subject = "01&((#3993(*003)))";
  request.description =
    ")*)(!)(#*)$)$*)*#(#@~~~``Testing for bad input*$#))$#'''";
  request.create_time = "0000-09-22T14:15:14+0000";
  request.expire_time = "2222-12-22T22:22:22+0000";
  request.remind_freq = 6;
  request.remind_time = "22:22:22";
  request.daily_weight = 2;
  request.notification_weight = 3;
  request.priority = 2;
  requests.push(request);

  requests.forEach((element) => {
    db_insert.insertRequest(element);
  });

  console.log("Finished Inserting Requests");
}

export function populateDBwithTags() {
  function createTag(name) {
    var tag = new Tag();
    tag.name = name;
    return tag;
  }

  var tags = new Array();

  tags.push(createTag("Bob")); // 1
  tags.push(createTag("Authority")); // 2
  tags.push(createTag("Sister")); // 3
  tags.push(createTag("Friends")); // 4
  tags.push(createTag("Archived")); // 5
  tags.push(createTag("Church")); // 6
  tags.push(createTag("Missions")); // 7
  tags.push(createTag("Family")); // 8
  tags.push(createTag("Expired"));

  tags.forEach((element) => {
    db_insert.insertTag(element);
  });

  console.log("Finished Inserting Tags");
}

export function populateDBwithCategories() {
  function createCat(name, tagID) {
    var cat = new Category();
    cat.name = name;
    cat.tagID = tagID;
    cat.reminder_freq = 8;
    cat.reminder_time = "14:15:14+0000";
    return cat;
  }

  var cats = new Array();
  cats.push(createCat("Friends", 4));
  cats.push(createCat("Church", 6));
  cats.push(createCat("Missions", 7));
  cats.push(createCat("Family", 8));

  cats.forEach((element) => {
    db_insert.insertCategory(element);
  });
  console.log("Finished Inserting Categories");
}

export function populateDBwithRequestTags() {
  function createRT(reqID, tagID) {
    var RT = new RequestTag();
    RT.requestID = reqID;
    RT.tagID = tagID;
    return RT;
  }

  var RTs = new Array();
  RTs.push(createRT(7, 1));
  RTs.push(createRT(2, 4));
  RTs.push(createRT(7, 4));
  RTs.push(createRT(4, 6));
  RTs.push(createRT(3, 3));
  RTs.push(createRT(3, 8));
  RTs.forEach((element) => {
    db_insert.insertRequestTag(element);
  });
  console.log("Finished Inserting RequestTags");
}

export function populateDBwithReminders() {
  console.log("Finished Inserting Reminders");
}
