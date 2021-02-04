import * as queries from "../database/passThroughQuery";
import * as Notifications from 'expo-notifications';
import { Reminder } from "../database/objects";
import { getCategoriesWithActiveCount } from "../database/query";
import { insertDailyRequest } from "../database/insert";

export function scheduleNotificationWait(title, body, wait) {
    Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
        },
        trigger: {
            seconds: wait,
        },
    });
}

export function scheduleNotificationDate(title, body, trigger) {
    return Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
        },
        trigger,
    });
}

export function executeNotification(title, body) {
    Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
        },
        trigger: null,
    });
}

function getDaysDiff(olderDate, newerDate) {
    olderDate.setHours(0);
    olderDate.setMinutes(0);
    olderDate.setSeconds(0);
    olderDate.setMilliseconds(0);
    newerDate.setHours(0);
    newerDate.setMinutes(0);
    newerDate.setSeconds(0);
    newerDate.setMilliseconds(0);
    return (newerDate.getTime() - olderDate.getTime()) / (1000 * 60 * 60 * 24);
}

export function selectQuietTimeRequests() {
    queries.clearDailyRequests(() => {
        getCategoriesWithActiveCount((results) => {
            var tickets = [];
            var idList = [];
            var i;
            for (i = 0; i < results.length; i++) {
                var j;
                for (j = 0; j < results[i].active_count; j++) {
                    tickets.push(results[i].tagID);
                }
            }

            
            for (i = 0; i < 8; i++) {
                if (tickets.length > 0) {
                    var randomChoice = Math.floor(Math.random() * tickets.length);
                    var id = tickets[randomChoice];
                    tickets.splice(randomChoice, 1);
                    idList.push(id);
                }
            }


            while(idList.length > 0) {
                var curNum = idList[0];
                var cnt = 1;
                idList.splice(0, 1);
                for(i = 0; i < idList.length; i++) {
                    if (idList[i] == curNum) {
                        cnt++;
                        idList.splice(i, 1);
                        i--;
                    }
                }
                queries.getRequestsInCategory(curNum, (results, cnt, placeholder) => {
                    var tickets2 = [];
                    var i;
                    for (i = 0; i < results.length; i++) {
                        var j;
                        for (j = 0; j < results[i].weight; j++) {
                            tickets2.push(results[i].id);
                        }
                    }

                    for (i = 0; i < cnt; i++) {
                        var id = tickets2[Math.floor(Math.random() * tickets2.length)];
                        insertDailyRequest({requestID: id, isPrayedFor: 0});
                        var j;
                        for (j = 0; j < tickets2.length; j++) {
                            if (tickets2[j] == id) {
                                tickets2.splice(j, 1);
                                j--;
                            }
                        }
                    }
                }, cnt, 0);
            }
        });
    });
}

export function rescheduleNotifs() {
    queries.resetReminders(scheduleNotifs());
}

export function scheduleNotifs() {
    queries.getReminders((results) => {
        var startDayNum = 1;
        if (results.length > 0) {
            var latestDate = new Date();
            var i;
            for (i = 0; i < results.length; i++) {
                curDate = new Date(results[i].furthestDate);
                if (curDate > latestDate) {
                    latestDate = curDate;
                }
            }
            startDayNum = getDaysDiff(new Date(), latestDate) + 1;
        }
        scheduleForCat(0, startDayNum);
    });
}

function scheduleForCat(catNum, startDayNum) {
    queries.getCategories((results, catNum, startDayNum) => {
        if (catNum < results.length) {
            cat = results[catNum];
            queries.getRequestsInCategory(cat.tagID, (results, cat, startDayNum) => {
                days = cat.remind_days;
                remindTime = new Date(cat.remind_time);
                startDate = new Date();
                curDate = new Date();
                startDate.setHours(remindTime.getHours());
                startDate.setMinutes(remindTime.getMinutes());
                startDate.setSeconds(remindTime.getSeconds());

                var i;
                var idList = [];
                var reminderCnt = 0;
                for (i = startDayNum; i <= 14; i++) {
                    curDate.setTime(startDate.getTime() + (i * 1000 * 60 * 60 * 24));
                    if (days[curDate.getDay()] == '1') {
                        var tickets = [];
                        var j;
                        for (j = 0; j < results.length; j++) {
                            var k;
                            for (k = 0; k < results[j].weight; k++) {
                                tickets.push(results[j].id);
                            }
                        }
                        var randomChoice = Math.floor(Math.random() * tickets.length);
                        var id = tickets[randomChoice];
                        idList.push(id);

                        for (j = 0; j < results.length; j++) {
                            if (results[j].id == id) {
                                var req = results[j];
                                scheduleNotificationDate(req.subject, req.description, curDate).then((results) => {
                                    var curReminder = new Reminder();
                                    curReminder.reminderID = results;
                                    curReminder.requestID = idList[reminderCnt];
                                    curReminder.furthestDate = curDate;
                                    queries.insertReminder({reminderID: curReminder.reminderID, requestID: curReminder.requestID, furthestDate: curReminder.furthestDate.toString()});
                                    reminderCnt++;
                                });
                                results[j].weight = results[j].priority;
                            }
                            else {
                                results[j].weight += results[j].priority;
                            }
                        }
                    }
                }
                for (i = 0; i < results.length; i++) {
                    queries.updateWeight(results[i].id, results[i].weight);
                }
                scheduleForCat(catNum + 1, startDayNum);
            }, cat, startDayNum);
        }  
    }, catNum, startDayNum);
}
