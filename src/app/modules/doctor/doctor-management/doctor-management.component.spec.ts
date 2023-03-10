import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomsManagementComponent } from './symptoms-management.component';

describe('CustomerManagementComponent', () => {
  let component: SymptomsManagementComponent;
  let fixture: ComponentFixture<SymptomsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SymptomsManagementComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
