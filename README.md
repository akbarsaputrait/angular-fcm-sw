# Angular Firebase Cloud Messaging Demo

This project demonstrates the implementation of Firebase Cloud Messaging (FCM) in an Angular 18 application using AngularFire. It showcases both in-app notifications and background notifications.

## Features

- Angular 18 framework
- AngularFire for Firebase integration
- Firebase Cloud Messaging (FCM) implementation
- In-app notifications
- Background notifications

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (latest LTS version)
- Angular CLI 18.x
- A Firebase project with Cloud Messaging enabled

## Installation

1. Clone this repository:
   ```
   git clone https://github.com/your-username/angular-fcm-demo.git
   cd angular-fcm-demo
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Configure Firebase:
   - Create a new Firebase project or use an existing one
   - Enable Cloud Messaging in the Firebase Console
   - Add a web app to your Firebase project and obtain the configuration
   - Create a `src/environments/environment.ts` file and add your Firebase configuration:

     ```typescript
     export const environment = {
       production: false,
       firebase: {
         apiKey: 'YOUR_API_KEY',
         authDomain: 'YOUR_AUTH_DOMAIN',
         projectId: 'YOUR_PROJECT_ID',
         storageBucket: 'YOUR_STORAGE_BUCKET',
         messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
         appId: 'YOUR_APP_ID'
       }
     };
     ```

## Usage

1. Start the development server:
   ```
   ng serve
   ```

2. Open your browser and navigate to `http://localhost:4200`

3. Allow notifications when prompted

4. Use the Firebase Console to send test messages to your app

## How It Works

This project demonstrates two types of notifications:

1. **In-app notifications**: These are displayed when the app is open and in the foreground. They are handled by the Angular application and can be customized to fit your app's UI.

2. **Background notifications**: These are displayed when the app is not active or is in the background. They are handled by the browser's service worker and appear as system notifications.

The main components of the FCM implementation are:

- `notification.service.ts`: Handles the FCM token generation and message reception
- `firebase-messaging-sw.js`: Service worker file for handling background notifications
- `app.component.ts`: Initializes the messaging service and handles in-app notifications

## Contributing

Contributions to this project are welcome. Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Angular team for the powerful web application framework
- Firebase team for the robust backend-as-a-service platform
- AngularFire team for simplifying Firebase integration in Angular applications