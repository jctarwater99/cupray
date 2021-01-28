import * as queries from "../database/passThroughQuery";
import * as Notifications from 'expo-notifications';
import { Reminder } from "../database/objects";

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
