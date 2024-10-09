import { Component, inject, OnInit } from '@angular/core';
import {
  getToken,
  MessagePayload,
  Messaging,
  NotificationPayload,
  onMessage,
} from '@angular/fire/messaging';
import { RouterOutlet } from '@angular/router';
import { NotificationService } from './notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly _notification = inject(NotificationService);
  messages: NotificationPayload[] = [];

  title = 'angular-fcm';

  ngOnInit(): void {
    this._notification.requestPermissions();
    this._notification.getToken().subscribe((token) => {
      if (token) {
        console.log('Notification initialized with token:', token);
        this._notification.listenForMessages();
      }
    });

    this._notification.getMessage().subscribe({
      next: (message) => {
        if (message) {
          console.log('Message received:', message);
          if (message.notification) {
            this.messages.push(message.notification);
          }
        }
      },
      error: (error) => {
        console.error('Error receiving message:', error);
      },
      complete: () => {
        console.log('Message stream completed');
      },
    });
  }
}
