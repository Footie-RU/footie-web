import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycFailedComponent } from './kyc-failed.component';

describe('KycFailedComponent', () => {
  let component: KycFailedComponent;
  let fixture: ComponentFixture<KycFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KycFailedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
