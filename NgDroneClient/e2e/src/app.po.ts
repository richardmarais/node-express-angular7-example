import { browser, by, element } from 'protractor';
import {HttpClient} from "protractor-http-client"

export class AppPage {
  
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    browser.ignoreSynchronization = true;
    return element(by.css('body app-root app-drone-dashboard div h1')).getText() as Promise<string>;
  }

  getHeaderCells() {
    browser.ignoreSynchronization = true;
    var tabledata = element.all(by.tagName("table"));
    var rows = tabledata.all(by.tagName("tr"));    
    var cells = rows.all(by.tagName("th"));
    return cells;
  }

  getCells() {
    browser.ignoreSynchronization = true;
    var tabledata = element.all(by.tagName("table"));
    var rows = tabledata.all(by.tagName("tr"));    
    var cells = rows.all(by.tagName("td"));
    return cells;
  }

  addDrone(drone: string) {
    const http = new HttpClient('http://localhost:3000/')
    http.post("/drone", drone, {
      "Content-Type": "application/json"
    }).catch((e)=> {
      console.error(e);
    });
  }
}
