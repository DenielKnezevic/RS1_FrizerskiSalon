import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import {ChartModel} from "../interfaces/chartmodel.models";
@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public data: ChartModel[];
  private hubConnection: signalR.HubConnection
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:60669/chart')
      .build();
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection: ' + err))
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data) => {
      this.data = data;
      console.log(data);
    });
  }
}
