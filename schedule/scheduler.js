import * as queries from "../database/query";
import * as Notifications from 'expo-notifications';

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
    Notifications.cancelAllScheduledNotificationsAsync();
    scheduleForCat(0);
}

function scheduleForCat(catNum) {
    queries.getCategories((results) => {
        cat = results[catNum];
        queries.getRequestsInCategory(cat.tagID, (results) => {
            freq = cat.reminder_freq;
            time = cat.reminder_time.split(":");
            date = new Date();
            date += 1;
            date.setHours(time[0]);
            date.setMinutes(time[1]);
            console.log(date);
        });
    });
}
