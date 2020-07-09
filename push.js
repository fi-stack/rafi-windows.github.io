const webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BHoD1Z_JPp9E4uM9PMxPmn_cuDxwQwpghIzxpv59jEsc0VhKwXp7hymsh3LQr1ptVG9q9AUXU0ENyQvNvebU29A",
    "privateKey": "Hb-ppKfzcarzu0rqPjiYTLvtxs8kV1uPcffyPeydRks"
};

webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/f_-6ZvfdkBA:APA91bG-5I6p0dXEvrU9CHo2EzC-WRv-7LLAp8eof0YJQxrwYZT7_Er41fgl1bgrrwDxuHDRXKxueHM6R9xjN_l_xFTNOcN9hfF8jYcmg-5D9DCdMcAwowxly3vSMIHr-RV1deR3mjDs",
    "keys": {
        "p256dh": "BNvJzBoCI4gIwFCOIwmALEAAlq83D9DL93c7Vivo/pKaMsi8qBp+Cw7J0jTHH73Ld0E0yheZcuPuO0o4zqDFJ94=",
        "auth": "C+Odo1Ls6rvQ6QiJ0J8IXQ=="
    }
};
var payload = 'Hello World!';

var options = {
    gcmAPIKey: '418598804709',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);