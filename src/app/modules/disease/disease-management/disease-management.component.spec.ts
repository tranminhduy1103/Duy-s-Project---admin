import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseaseManagementComponent } from './disease-management.component';

describe('CustomerManagementComponent', () => {
  let component: DiseaseManagementComponent;
  let fixture: ComponentFixture<DiseaseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiseaseManagementComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseaseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
