import * as db_insert from "./insert";
import { Request, RequestTag, Tag, Category, DailyRequest } from "./objects";

export function populateDB() {
  populateDBwithFlags();
  populateDBwithRequests();
  populateDBwithTags();
  populateDBwithRequestTags();
  populateDBwithReminders();
  populateDBwithCategories();
  populateDBwithDailyRequests();
}
export function populateDBwithFlags() {
  db_insert.insertFlag(
    "lastScheduled",
    "Tue Feb 01 2021 00:00:00 GMT-0500 (EST)"
  );
}

export function populateDBwithRequests() {
  // Date this was made
  let curr = 1611866029666;
  let baseC = 1610727130000;
  let baseE = 1613405530000;
  let offset = new Date().getTime() - curr;

  function addReq(sub, desc, priority) {
    request = new Request();
    request.subject = sub;
    request.description = desc;
    request.create_time = baseC + offset;
    request.expire_time = baseE + offset;
    request.remind_freq = 1;
    request.remind_days = "";
    request.remind_time = "15:15";
    request.previous_weight = 1;
    request.weight = priority;
    request.priority = priority;
    requests.push(request);
  }

  var requests = [];

  // 1
  request = new Request();
  request.subject = "Safe Ending";
  request.description =
    "With all the covid craziness, I just pray that everyone (especially myself, lol) would" +
    "be able to finish this semester strongly";
  request.create_time = "";
  request.expire_time = baseE + offset;
  request.remind_freq = 0;
  request.remind_days = "";
  request.remind_time = "";
  request.previous_weight = 5;
  request.weight = 3;
  request.priority = 1;
  requests.push(request);

  // 2
  sub = "Senior Design";
  desc =
    "That I would not worry about deadlines and finishing in time but rather that I would be " +
    "diligent and make sure everyone one the team knows what to do and is getting stuff done.";
  addReq(sub, desc, 1);

  // 3
  sub = "Depressed Friend";
  desc =
    "I have a friend who is suffering from depression. I'm praying to ask God to help me know " +
    "what, if anything I can do to help this friend and make them feel loved while still pushing them toward God.";
  addReq(sub, desc, 1);

  // 4
  sub = "Sister's Relationship";
  desc =
    "Lord, could you give my sister Agatha the wisdom and insight to see how bad this guy is? " +
    "Please show her that she can and should go to you for her worth and validation";
  addReq(sub, desc, 1);

  // 5
  sub = "Division in my church";
  desc =
    "Lord, my church body has really been at eachother's throats and could you show them how " +
    "to live at peace with one another, loving like you love us?";
  addReq(sub, desc, 1);

  // 6
  sub = "I need a servant's heart!";
  desc =
    "Lord, there are a lot of times when I feel the urge to think only of myself. " +
    "Could you give me a servant's heart so that I can honor you with my life?";
  addReq(sub, desc, 1);

  // 7
  sub = "National Leadership";
  desc =
    "Lord, you are the ultimate king, but you have ordained goverment to do good " +
    "and promote justice in the land. Would you lead our leaders in wisdom so that" +
    " our country can be at peace?";
  addReq(sub, desc, 1);

  // 8
  sub = "Bob's Career";
  desc = "Please make Bob the best physicist ever to live";
  addReq(sub, desc, 3);

  // 9
  sub = "Proposal";
  desc = "That Bob would propose to Yayira soon";
  addReq(sub, desc, 1);

  // 10
  sub = "Contentment";
  desc =
    "That I wouldn't complain as much since God is good despite the inconveniences";
  addReq(sub, desc, 1);

  // 11
  sub = "Consistency in the word";
  desc =
    "We make time for the things we value, that God would put a desire in me to know Him " +
    "and a sense of urgency so that I will be motivated to spend daily time in the word meditating.";
  addReq(sub, desc, 1);

  // 12
  sub = "Friends' Success";
  desc =
    "Please help all my friends as they finish up their last semester here at Cedarville. " +
    "Help them to stay motivated and work in a way that glorifies you, not themselves. Please " +
    "also give this same motivation and support to my underclassmen friends.";
  addReq(sub, desc, 1);

  // 13
  sub = "Job Hunt";
  desc =
    "A lot of my friends have jobs. I'm thankful that you have given them success. I ask that " +
    "You would also help my girlfriend and my roommates girlfriend to have the same success as " +
    "they begin to get more serious about looking for a job after graduation.";
  addReq(sub, desc, 1);

  // 14
  sub = "Friends' Relationships";
  desc =
    "Please protect the thoughts and feelings of my friends who are in or are going into dating " +
    "relationships. Help them to be reasonable, to think of eachother, and to pursue you most.";
  addReq(sub, desc, 1);

  // 15
  sub = "Member Fellowship";
  desc =
    "During this covid season, it has been harder for us to meet and have personal fellowship " +
    "as a church. I pray that you would give people the desire and the means to continue to meet " +
    "and fellowship, and have the close accountability that we should have as a church";
  addReq(sub, desc, 1);

  // 16
  sub = "Leadership";
  desc =
    "Thank you for the strong, biblical leaders in my church. Continue to guide them and " +
    "help them to make good decisions that are in the best interest of the church.";
  addReq(sub, desc, 1);

  // 17
  sub = "Tri-M";
  desc =
    "Please help mission agencies like Tri-M to continue to spread the gospel despite the " +
    "difficulties that covid19 presents to aspects of their service such as travel and meeting in " +
    "groups larger than 6 people.";
  addReq(sub, desc, 1);

  // 18
  sub = "Camino Global";
  desc =
    "I know some of the difficulties that one might face as part of Cam. I pray that you would " +
    "continue to provide the monetary support that the cam missionaries need to stay on the field " +
    "during covid.";
  addReq(sub, desc, 1);

  // 19
  sub = "RGBC";
  desc =
    "Help the students at this spanish Bible school to love you and learn well so that they " +
    "can return to their countries and effectively share the gospel.";
  addReq(sub, desc, 1);

  // 20
  sub = "Grandmother's Move";
  desc =
    "Thank you for my grandmother and the impact she has had on my mother, myself, my siblings, " +
    "etc... Please help her move to go smoothly both for her and my parents as they figure out what " +
    "it's like to have an inlaw live with them.";
  addReq(sub, desc, 1);

  // 21
  sub = "Aunt's surgery";
  desc =
    "Please help my aunt's surgery to go well, that there would be no complications, " +
    "and that she would have a rapid recovery";
  addReq(sub, desc, 1);

  // 22
  sub = "Brother's Spiritual Growth";
  desc =
    "Lord, we cannot know the state of someone's heart, only you can. But father, if he really is " +
    "saved, I pray that you would work in him so that he will better outwardly display his change of heart";
  addReq(sub, desc, 1);

  // 23
  sub = "Motivation";
  desc =
    "Heavenly Father, ....covid sucks. Please help it to end, and help me to stay motivated despite all " +
    "the demotivating factors surounding covid.";
  addReq(sub, desc, 1);

  // 24
  sub = "Loving/aware";
  desc =
    "I know that I can be more blunt or rude than I intend to be. Please help me to communicate " +
    "more lovingly with those around me and to be aware of the impact that my words can have.";
  addReq(sub, desc, 1);

  // 25
  sub = "Thankfulness";
  desc =
    "You have given me so many things to be thankful for, despite the pandemic. We're still in school." +
    "Help me to be more thankfull.";
  addReq(sub, desc, 1);

  // 26
  sub = "Patience";
  desc =
    "I know that I am not always patient with others. I know that I should be because it is more " +
    "loving and because it is a fruit of the spirit. Please forgive me for when I am short with people and " +
    "help me to learn the character traits that you display towards us.";
  addReq(sub, desc, 1);

  sub = "Subject";
  desc = "Description";
  addReq(sub, desc, 1);

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
  tags.push(createTag("Archived")); // 1
  tags.push(createTag("Bob")); // 2
  tags.push(createTag("Authority")); // 3
  tags.push(createTag("Sister")); // 4
  tags.push(createTag("Friends")); // 5
  tags.push(createTag("Church")); // 7
  tags.push(createTag("Missions")); // 8
  tags.push(createTag("Family")); // 9
  tags.push(createTag("Myself"));

  tags.forEach((element) => {
    db_insert.insertTag(element);
  });

  console.log("Finished Inserting Tags");
}

export function populateDBwithCategories() {
  function createCat(name, tagID, days, time) {
    var cat = new Category();
    cat.name = name;
    cat.tagID = tagID;
    cat.remind_time = time;
    cat.remind_days = days;
    return cat;
  }

  var cats = new Array();
  cats.push(createCat("Archived", 1, "", 0));
  cats.push(createCat("Friends", 5, "0101010", 1608141600000));
  cats.push(createCat("Church", 6, "0010001", 1608145200000));
  cats.push(createCat("Missions", 7, "1000000", 1608148800000));
  cats.push(createCat("Family", 8, "0010101", 1608159600000));
  cats.push(createCat("Myself", 9, "0101011", 1608166800000));

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
  RTs.push(createRT(8, 2)); // Bob's career,        Bob
  RTs.push(createRT(3, 5)); // Depressed friend,    friends
  RTs.push(createRT(8, 5)); // Bob's career,        friends
  RTs.push(createRT(8, 8)); // Bob's career,        family
  RTs.push(createRT(5, 6)); // Division in church   church
  RTs.push(createRT(4, 4)); // Sisters rela-ship    sister
  RTs.push(createRT(4, 8)); // Sisters rela-ship    Family
  RTs.push(createRT(9, 1)); // Proposal,            Archived
  RTs.push(createRT(1, 1)); // Good semester despite covid,            Archived
  RTs.push(createRT(1, 5)); // Good semester despite covid,            myself
  RTs.push(createRT(1, 9)); // Good semester despite covid,            friends
  RTs.push(createRT(9, 2)); // Proposal,            Bob
  RTs.push(createRT(9, 5)); // Proposal,            friends
  RTs.push(createRT(2, 9)); // SD                   myself
  RTs.push(createRT(10, 9)); // Contentment          myself
  RTs.push(createRT(11, 9)); // Consistency in word  myself
  RTs.push(createRT(6, 9)); // servants heart  myself
  RTs.push(createRT(7, 6)); // National leadership  idk, church?

  RTs.push(createRT(12, 5)); // 13
  RTs.push(createRT(13, 5));
  RTs.push(createRT(14, 5));
  RTs.push(createRT(15, 6));
  RTs.push(createRT(16, 6));
  RTs.push(createRT(17, 7)); // 18
  RTs.push(createRT(18, 7)); // 19
  RTs.push(createRT(19, 7)); // 20
  RTs.push(createRT(20, 8));
  RTs.push(createRT(21, 8));
  RTs.push(createRT(22, 8));
  RTs.push(createRT(23, 9));
  RTs.push(createRT(24, 9));
  RTs.push(createRT(25, 9));
  RTs.push(createRT(26, 9));

  RTs.forEach((element) => {
    db_insert.insertRequestTag(element);
  });
  console.log("Finished Inserting RequestTags");
}

export function populateDBwithDailyRequests() {
  function createDR(reqID, isPrayedFor) {
    var DR = new DailyRequest();
    DR.requestID = reqID;
    DR.isPrayedFor = isPrayedFor;
    return DR;
  }

  var DRs = new Array();
  DRs.push(createDR(8, 0, "Friends")); // Bob's career,        Bob
  DRs.push(createDR(5, 1, "Church")); // Division in church   church
  DRs.push(createDR(4, 0, "Family")); // Sisters rela-ship    sister
  DRs.push(createDR(2, 0, "Myself")); // SD                   myself
  DRs.push(createDR(18, 0, "Missions")); // Camino Global       missions

  DRs.forEach((element) => {
    db_insert.insertDailyRequest(element);
  });
  console.log("Finished Inserting Daily Requests");
}

export function populateDBwithReminders() {
  console.log("Finished Inserting Reminders");
}

export function populateMinimum() {
  db_insert.insertFlag(
    "lastScheduled",
    "Tue Feb 01 2021 00:00:00 GMT-0500 (EST)"
  );

  function createTag(name) {
    var tag = new Tag();
    tag.name = name;
    return tag;
  }

  var tags = new Array();
  tags.push(createTag("Archived")); // 1
  tags.push(createTag("Friends"));
  tags.push(createTag("Church"));
  tags.push(createTag("Family"));

  tags.forEach((element) => {
    db_insert.insertTag(element);
  });

  function createCat(name, tagID, days, time) {
    var cat = new Category();
    cat.name = name;
    cat.tagID = tagID;
    cat.remind_time = time;
    cat.remind_days = days;
    return cat;
  }

  var cats = new Array();
  cats.push(createCat("Archived", 1, "", 0));
  cats.push(createCat("Friends", 2, "0111110", 1608141600000));
  cats.push(createCat("Church", 3, "1000001", 1608145200000));
  cats.push(createCat("Family", 4, "1111111", 1608159600000));

  cats.forEach((element) => {
    db_insert.insertCategory(element);
  });
}
