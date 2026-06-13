import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: "AIzaSyAbiW7IBOEKt78bL4FOqLb2wMMObLVZPCs",
  authDomain: "destinify-6687b.firebaseapp.com",
  projectId: "destinify-6687b",
  storageBucket: "destinify-6687b.firebasestorage.app",
  messagingSenderId: "802282593609",
  appId: "1:802282593609:web:5936846f2b5a29ad7d4e98",
  measurementId: "G-L4Y66GDDZM"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

onBackgroundMessage(messaging, (payload) => {
  console.log("[firebase-messaging-sw.js] Recibido en segundo plano:", payload);

  const notificationTitle = payload.notification?.title || "Nueva notificación";

  const notificationOptions = {
    body: payload.notification?.body || "Tienes un nuevo mensaje",
    icon: "/icons/icon-192x192.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
notificationOptions