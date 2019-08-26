/*
 * Component used to listen for drone updates and render them to the browser.
*/
import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';

@Component({
  selector: 'app-drone-dashboard',
  templateUrl: './drone-dashboard.component.html',
  styleUrls: ['./drone-dashboard.component.css']
})
export class DroneDashboardComponent implements OnInit {

  title = 'Drone Dashboard';
  drones: any;

  ngOnInit(): void {
    const socket = socketIo('http://localhost:3000');
    socket.on('drones', (drones: any) => {
      for (var i = 0; i < drones.length; i++) {
        drones[i].lastUpdated = (new Date().getTime() - drones[i].lastUpdated)/1000;
      }
      this.drones = drones;
    });
  }
}
