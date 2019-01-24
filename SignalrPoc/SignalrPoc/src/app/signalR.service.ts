import { Injectable } from "@angular/core";
import * as signalR from "@aspnet/signalr";

@Injectable()
export class SignalrService {

  connection: signalR.HubConnection;
  status: string;

  setupConnection = () => {

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:41695/coffeeHub")
      .configureLogging(signalR.LogLevel.Trace)
      .build();

    this.connection.on("NewOrder", (order)=> {
      this.status = "Someone ordered an " + order.product;
      console.log(this.status);
     });

    this.connection.on("ReceiveOrderUpdate", (update) => {
      this.status = update;
    });

    this.connection.on("finished", function () {
      // this.connection.stop();
    });

    this.connection.start()
      .then(() => console.log(this.connection))
      .catch(err => console.log(err));

  };

  constructor() {
    console.log('signalrService constructor called.');
    this.setupConnection();
  }


  send(userName: string, message: string) {
    this.connection.send("sendMessage", userName, message)
      .then(() => console.log('then block'));
  }
}
