import { inject, Injectable } from '@angular/core';
import {
  deleteToken,
  getToken,
  MessagePayload,
  Messaging,
  onMessage,
} from '@angular/fire/messaging';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private messageSubject = new BehaviorSubject<MessagePayload | null>(null);

  private readonly _messaging = inject(Messaging);

  constructor() {
    this.setupVisibilityChangeListener();
  }

  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  getMessage(): Observable<MessagePayload | null> {
    return this.messageSubject.asObservable();
  }

  async requestPermissions(): Promise<void> {
    try {
      const token = await getToken(this._messaging, {
        vapidKey: environment.vapidKey,
      });

      if (token) {
        // save the token in the server, or do whatever you want
        this.tokenSubject.next(token);
      } else {
        console.log(
          'No registration token available. Request permission to generate one.'
        );
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          await this.requestPermissions();
        } else {
          this.tokenSubject.next(null);
        }
      }
    } catch (error) {
      console.error('Failed to enable FCM:', error);
    }
  }

  listenForMessages(): void {
    onMessage(this._messaging, (payload: MessagePayload) => {
      this.messageSubject.next(payload);
    });
  }

  async disableNotification(): Promise<void> {
    try {
      await deleteToken(this._messaging);
      this.tokenSubject.next(null);
      console.log('FCM disabled for live notifications');
    } catch (error) {
      console.error('Failed to disable FCM:', error);
    }
  }

  private setupVisibilityChangeListener() {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.checkForStoredMessages();
      }
    });
  }

  private async checkForStoredMessages() {
    const db = await this.openDatabase();
    const transaction = db.transaction('messages', 'readwrite');
    const store = transaction.objectStore('messages');
    const request = store.getAll();

    request.onsuccess = () => {
      const storedMessages = request.result;
      if (storedMessages.length > 0) {
        storedMessages.forEach((message) => {
          this.messageSubject.next(message);
        });
        store.clear();
      }
    };
  }

  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('fcm-messages', 1);
      request.onerror = reject;
      request.onsuccess = () => resolve(request.result);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        db.createObjectStore('messages', { autoIncrement: true });
      };
    });
  }
}
