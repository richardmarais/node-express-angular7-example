/*
 * Tests for the app-drone-dashboard.
*/
import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 45000;

describe('workspace-project App', () => {
  let page: AppPage;
  /*
   * Before test is run.
  */
  beforeEach(() => {
    page = new AppPage();
  });

  /*
   * Checks if the page title is correct.
  */
  it('should display header', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Drone Dashboard');
  });

  /*
   * Checks is the table headers are correct.
  */
  it('should have table header cell contents', () => {
    page.navigateTo();  
    var cells = page.getHeaderCells();
    expect(cells.get(0).getText()).toEqual('Id');
    expect(cells.get(1).getText()).toEqual('Speed (kmph)');
    expect(cells.get(2).getText()).toEqual('Latitude');
    expect(cells.get(3).getText()).toEqual('Longitude');
    expect(cells.get(4).getText()).toEqual('Distance (m last 10s)');
    expect(cells.get(5).getText()).toEqual('Last Updated (s ago)');
  });

   /*
    * Checks if the table contents is correct.
    * Adds drone data by calling the servers POST service and then looks at the values 
    * of the individual cells to see if the correspond to the populated values.
   */
  it('should have table cell contents', () => {
    page.addDrone('[0,13, -32.015392, 24.919277]');
    browser.sleep(1000);
    page.navigateTo();  
    browser.sleep(10000);
    var cells = page.getCells();
    cells.count().then((counter) => {
      expect(cells.get(counter-6).getText()).toEqual('0');
      expect(cells.get(counter-5).getText()).toEqual('13');
      expect(cells.get(counter-4).getText()).toEqual('-32.015392');
      expect(cells.get(counter-3).getText()).toEqual('24.919277');
    });
    page.addDrone('[1,14, -32.015393, 24.919273]');
    browser.sleep(11000);
    var cells = page.getCells();
    cells.count().then((counter) => {
      expect(cells.get(counter-6).getText()).toEqual('1');
      expect(cells.get(counter-5).getText()).toEqual('14');
      expect(cells.get(counter-4).getText()).toEqual('-32.015393');
      expect(cells.get(counter-3).getText()).toEqual('24.919273');
    });
    page.addDrone('[1,15, -32.915391, 24.019271]');
    browser.sleep(11000);
    var cells = page.getCells();
    cells.count().then((counter) => {
      expect(cells.get(counter-6).getText()).toEqual('1');
      expect(cells.get(counter-5).getText()).toEqual('15');
      expect(cells.get(counter-4).getText()).toEqual('-32.915391');
      expect(cells.get(counter-3).getText()).toEqual('24.019271');
      //expect(cells.get(counter-2).getText()).toEqual('130.9351769997356');
    });
  });

  /*
   * After test is run, Assert that there are no errors emitted from the browser.
  */
  afterEach(async () => {
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
  
});


