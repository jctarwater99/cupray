import * as queries from "../database/passThroughQuery";
import * as Notifications from 'expo-notifications';
import React, { useEffect, useState } from "react";

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

export function scheduleNotificationDate(title, body, date) {
    Notifications.scheduleNotificationAsync({
        content: {
            title: title,
            body: body,
        },
        trigger: {
            seconds: date,
        },
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
    scheduleForCat(1);
}

function scheduleForCat(catNum) {
    console.log("Gonna get Cats");
    queries.getCategories((results, catNum) => {
        console.log("CatNum: " + catNum);
        cat = results[catNum];
        console.log(cat);
        console.log("Gonna get requests");
        queries.getRequestsInCategory(cat.tagID, (results) => {
            console.log(cat);
            /*days = cat.remind_days;
            time = cat.reminder_time.split(":");
            date = new Date();
            date.setHours(time[0]);
            date.setMinutes(time[1]);
            console.log("Print date");
            console.log(date);*/
        });
    }, catNum);
}
