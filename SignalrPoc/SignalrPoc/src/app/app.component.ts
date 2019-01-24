import { Component } from '@angular/core';
import { SignalrService } from './signalR.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Signalr POC';
  coffeeOrder: ICoffeeOrder;

  constructor(private signalRService: SignalrService){

    this.coffeeOrder = {
        product:"Americano",
        size:"Vente"
    };

    this.signalRService.connection
    .on("receiveMessage", (userName: string, message: string) => {       
        this.signalRService.status = userName + message;
    });
  }
  sendTestMessage(){
    console.log('sending test message');
    this.signalRService.connection.send("SendMessage","testUser", "Hello World");    
  }

    
    placeOrder(form:any) {      
      fetch("/api/Coffee",
        {
            method: "POST",
            body: JSON.stringify(this.coffeeOrder),
            headers: {
               'content-type': 'application/json'
            }
        })
        .then(response => response.text())
        .then(id => this.signalRService.connection.invoke("GetUpdateForOrder", id));
    }
}
export interface ICoffeeOrder{
  product:string;
  size:string;
}
