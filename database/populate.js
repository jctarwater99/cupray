import * as SQLite from "expo-sqlite";
import * as db_insert from "./insert";
import {
  Request,
  Request_Tag,
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
  request.weight = 1;
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
  request.weight = 10;
  requests.push(request);

  request = new Request();
  request.subject = "Sister's Unhealthy Relationship";
  request.description =
    "Lord, could you give my sister Agatha the wisdom and insight to see how bad this guy is?" +
    "Please show her that she can and should go to you for her worth and validation";
  request.create_time = "2020-09-28T14:15:14+0000";
  request.expire_time = "2020-12-30T14:15:14+0000";
  request.remind_freq = 11;
  request.remind_time = "19:20:00";
  request.weight = 2;
  requests.push(request);

  request = new Request();
  request.subject = "Division in my church";
  request.description =
    "Lord, my church body has really been at eachother's throats and could you show them how" +
    " to live at peace with one another, loving like you love us?";
  request.create_time = "2020-09-22T14:15:14+0000";
  request.expire_time = "2020-10-07T14:15:14+0000";
  request.remind_freq = 8;
  request.remind_time = "08:05:00";
  request.weight = 4;
  requests.push(request);

  request = new Request();
  request.subject = "I need a servant's heart!";
  request.description =
    "Lord, there are a lot of times when I feel the urge to think only of myself." +
    " Could you give me a servant's heart so that I can honor you with my life?";
  request.create_time = "2020-07-20T14:15:14+0000";
  request.expire_time = "2020-11-07T14:15:14+0000";
  request.remind_freq = 7;
  request.remind_time = "09:00:00";
  request.weight = 2;
  requests.push(request);

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
  request.weight = 3;
  requests.push(request);

  request = new Request();
  request.subject = "Bob";
  request.description = "Please make Bob the best physicist ever to live";
  request.create_time = "2020-09-22T14:15:14+0000";
  request.expire_time = "2020-10-07T14:15:14+0000";
  request.remind_freq = 11;
  request.remind_time = "19:15:00";
  request.weight = 1;
  requests.push(request);

  request = new Request();
  request.subject = "01&((#3993(*003)))";
  request.description =
    ")*)(!)(#*)$)$*)*#(#@~~~``Testing for bad input*$#))$#'''";
  request.create_time = "0000-09-22T14:15:14+0000";
  request.expire_time = "2222-12-22T22:22:22+0000";
  request.remind_freq = 6;
  request.remind_time = "22:22:22";
  request.weight = 1;
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
  tags.push(createTag("Bob"));
  tags.push(createTag("Authority"));
  tags.push(createTag("Sister"));
  tags.push(createTag("Friends"));
  tags.push(createTag("Archived"));
  tags.push(createTag("Church"));
  tags.push(createTag("Missions"));
  tags.push(createTag("Family"));

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
  cats.push(createTag("Church", 6));
  cats.push(createTag("Missions", 7));
  cats.push(createTag("Family", 8));

  cats.forEach((element) => {
    db_insert.insertCategory(element);
  });
  console.log("Finished Inserting Categories");
}

export function populateDBwithRequestTags() {
  console.log("Finished Inserting RequestTags");
}

export function populateDBwithReminders() {
  console.log("Finished Inserting Reminders");
}
