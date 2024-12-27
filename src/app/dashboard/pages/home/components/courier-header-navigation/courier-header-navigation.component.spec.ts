import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierHeaderNavigationComponent } from './courier-header-navigation.component';

describe('CourierHeaderNavigationComponent', () => {
  let component: CourierHeaderNavigationComponent;
  let fixture: ComponentFixture<CourierHeaderNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierHeaderNavigationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourierHeaderNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
