const path = require("path")
let firebase_admin = require('firebase-admin');
let serviceAccount = require('../helper/key_file/sysavings-5ad56-firebase-adminsdk-fbsvc-75b87acc2f.json')

// Initialize the app with a service account, granting admin privileges
firebase_admin.initializeApp({
    credential: firebase_admin.credential.cert(
        {
            "type": "service_account",
            "project_id": "sysavings-5ad56",
            "private_key_id": "530d37f6d92e2a71392cc2b8eddd15990bacd3be",
            "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCdw9BccrhQZ3f8\nIAqYwe3AR+9fmDZVWBeRGpoq/09l38NrcdcnqyAauW6BtVNysplHSXS8AnEvPd3g\ntUfzKzlg/Wxccn/wV35WVRZRq+Ud4gh3ES9xFilWHf8jm/jk6YU2n14DyCHyIapa\naqERcoh4fLl6MwYCiQuARd4A4ZoypaEM7hkaFN7VhIV4rTR0B1DoaJ70Cn0F8lJL\nSjfYOUPdrNsK4F0oH1G25xEZmeGE7vwJbfswHebsIB9hfZKYBdZw/chI70S9lL2e\nLJ1psnZd9sBcJxPdHup6SpQu9nOC3mLGTRpKF2f+bvtRq7NY4zIyIfZZBBQ/Tstk\nypTtFE+dAgMBAAECggEABQqM8xSkCMcITFFWdVjRDjwI4p7xsYVzRKrlx+pI8Qzs\nPi0w6QQXWQiZhuHdQkTXEAeWstadzkV6/GNejV8mt2TcXGc46QcACFCHZOG0xwvX\nexKHV7o+ZOboJbemBY6OuAGcq/XuW8Hb+IVVaJd70+R3ECK8QO18esNWG49vRsn7\nluvx/M/SzxG9XKXrYFT5XlJkXWX/0sRTphfNlBHlx5kfM5Q01g20t+yW5LABNq0I\nVDFoBBJaSNDZCe/IX+3rzM9pG20hJbAUW08F9cUsnGDixgisqyXpsWJzI190vPJc\nybL7YPa9IP1w6Y46yPN2vxhwSe0jU13Jchvu7aH/8QKBgQDSV0OV+p5/cgqmZCOk\nwEeX/0wUNPSt+E8Q01ietuTz/jS438yBhxfgMpzFv4MBuRS68Es2Uy7yPOlfG58i\nmrj0tiWng695MTQqx5itkv2CTVOuZbVBqnLSPeDUXetpar9G8Qo8qessDGT1+3Zo\n9Jt/ORQLzfCV8ucqa7DnMT3hKQKBgQDAAuElaVygHBRV5SIeiMcnm37IgWOHcllE\neSwM/hsEpwZZNvy+ZraghjAoB7rBO8ckkTuEr/vj+jw/3HmwwMYJ4RS7BaSeCOAw\n9FvqhqQJffbuexs/UpvbCWY9/pFPrvqmtyf2YwQQyR6XF9ig5fNtofkwhjc4EYz/\nVoe236TFVQKBgQCgrvs5iqAkOel63QsBo8XNjsD+usmkUQmNj/amII/c+PgrtwPS\ne3I42lE7G6cn3MzCVikO0hMOCIw7FK3H0Ky0fKVdR9L34Se5+opfJug073+avaXv\nCRf4Fj833JunB14iAqdQWnoGR12lMDlvylUzplXzAprk4g/IL0aQBuT/qQKBgEXJ\nBiE9wO9kJTPuuk7UsWVAy3x+IjlZIv6S96KlPBadyd3k8UkWNavz+U6jOIoAeulc\na4BXIbqC+SDQtd26wn9Wsd0jOOhDG5BPT5TWaIoWoQed8JI8KO8b5HAFtLR8SRcM\nnFadOB4NqrOJdC9ORAIFi3bKYQlcv50RyvN5Jv6dAoGBAIUiYY5W8ENMDZmUiVvL\nC03S10Z1xeyIXXP3+2jSm0CINHy8o+NkNt18yZdRRGdIEgmHc8kl500I2HOJyYy4\nfAu0BgeyYnFOhzr7eYTrqWEorj3o2+FJgtcZ0X010NzR3ylW1fQ9nXgNw6GuWcEI\n2a+fHjlexc+s4Ll11rtDOYNl\n-----END PRIVATE KEY-----\n",
            "client_email": "firebase-adminsdk-fbsvc@sysavings-5ad56.iam.gserviceaccount.com",
            "client_id": "116033586974531888456",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40sysavings-5ad56.iam.gserviceaccount.com",
            "universe_domain": "googleapis.com"
        }
    )
});

class NotificationHelper {
    constructor() { }

    async pushNotification(message) {
        try {
            // FCM Send notification
            console.log('[NotificationHelper.pushNotification] Request payload:', JSON.stringify(message, null, 2));
            const response = await firebase_admin.messaging().send(message);
            console.log('[NotificationHelper.pushNotification] FCM response:', response);
            return true;
        } catch (error) {
            console.error('[NotificationHelper.pushNotification] Error sending push notification:', error);

            return false;
        }
    }
}

module.exports = new NotificationHelper()
