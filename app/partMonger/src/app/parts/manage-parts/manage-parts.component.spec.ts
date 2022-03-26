import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePartsComponent } from './manage-parts.component';

describe('ManagePartsComponent', () => {
  let component: ManagePartsComponent;
  let fixture: ComponentFixture<ManagePartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagePartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
