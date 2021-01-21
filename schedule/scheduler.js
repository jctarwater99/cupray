import * as queries from "../database/passThroughQuery";
import { insertReminder } from "../database/insert";
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from "react";
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

export function scheduleNotifs() {
    // TODO rewind weights
    console.log("Scheduling");
    Notifications.cancelAllScheduledNotificationsAsync();
    scheduleForCat(0);
}

function scheduleForCat(catNum) {
    queries.getCategories((results, catNum) => {
        if (catNum < results.length) {
            cat = results[catNum];
            queries.getRequestsInCategory(cat.tagID, (results, cat) => {
                console.log(cat);
                days = cat.remind_days;
                remindTime = new Date(cat.remind_time);
                curDate = new Date();
                curDate.setHours(remindTime.getHours());
                curDate.setMinutes(remindTime.getMinutes());
                curDate.setSeconds(remindTime.getSeconds());

                var i;
                var idList = [];
                var reminderCnt = 0;
                for (i = 1; i <= 14; i++) {
                    curDate.setDate(curDate.getDate() + 1);
                    if (days[curDate.getDay()] == '1') {
                        var tickets = [];
                        var j;
                        for (j = 0; j < results.length; j++) {
                            var k;
                            for (k = 0; k < results[j].weight; k++) {
                                tickets.push(results[j].id);
                            }
                        }
                        console.log ("Lottery Pot: " + tickets);
                        var randomChoice = Math.floor(Math.random() * tickets.length);
                        var id = tickets[randomChoice];
                        idList.push(id);

                        console.log(id + " picked");
                        for (j = 0; j < results.length; j++) {
                            if (results[j].id == id) {
                                var req = results[j];
                                var remind_id = scheduleNotificationDate(req.subject, req.description, curDate).then((results) => {
                                    console.log(idList[reminderCnt] + ": " + results);
                                    var curReminder = new Reminder();
                                    curReminder.reminderID = results;
                                    curReminder.requestID = idList[reminderCnt];
                                    insertReminder(curReminder);
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
                scheduleForCat(catNum + 1);
            }, cat);
        }  
    }, catNum);
}
