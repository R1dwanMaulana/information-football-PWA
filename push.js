var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BFBsH5cF8NvzMI0GTdwmVqLmHDIktIlTRpU4J8wF1YM07wjTPlgO1R2IAcxQ5ITEyLt7Jlvxtzxx3VXAfaLFheg",
   "privateKey": "QEvVBAxGr8JCT91WGx3rJ9KOwpfDGlNk4C9BrS2hsEI"
};
 
 
webPush.setVapidDetails(
   'mailto:rdwanf49@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/elo-mTftaAc:APA91bFEnQZBonMUFr9537FDRMF98pKjaKKBpMbID1LDaTZAeO1JN2zm3ohKc3Ng49BhiaUMe270Pty-BJLG1Jp2eTVYsgjA6TNfRUoYoPwJig7f387AGVQ4vdwpw_I9BDEWXtyZde0n",
   "keys": {
       "p256dh": "BOGGqBZ48hGiJssmU9hitZDY0I2nY3m4VRKdJmGpEAe8urXwZJxAkwSEhw1O6NbiVCKzrCwRLayOMfaqVXpgfYQ=",
       "auth": "BSuGMWKeq6Q3/4Tgq/iLPQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '913877655289',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);