import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectKycComponent } from './reject-kyc.component';

describe('RejectKycComponent', () => {
  let component: RejectKycComponent;
  let fixture: ComponentFixture<RejectKycComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectKycComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectKycComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
