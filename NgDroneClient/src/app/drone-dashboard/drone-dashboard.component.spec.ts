import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DroneDashboardComponent } from './drone-dashboard.component';

describe('DroneDashboardComponent', () => {
  let component: DroneDashboardComponent;
  let fixture: ComponentFixture<DroneDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DroneDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DroneDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
