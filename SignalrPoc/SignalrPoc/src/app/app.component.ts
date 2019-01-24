import { Component } from '@angular/core';
import { SignalrService } from './signalR.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private signalRService: SignalrService){
    this.signalRService.connection
    .on("receiveMessage", (userName: string, message: string) => {
        console.log(userName, message);
    });
  }

  sendTestMessage(){
    console.log('sending test message');
    this.signalRService.connection.send("SendMessage","testUser", "Hello World");    
  }
}
