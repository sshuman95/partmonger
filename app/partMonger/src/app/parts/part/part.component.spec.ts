import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { PARTSMOCK } from 'src/app/mocks/parts-mock';
import { PartFormComponent } from '../part-form/part-form.component';
import { PartComponent } from './part.component';

describe('PartComponent', () => {
  let component: PartComponent;
  let fixture: ComponentFixture<PartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartComponent, PartFormComponent],
      imports: [HttpClientTestingModule, MatCardModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartComponent);
    component = fixture.componentInstance;
    component.part = PARTSMOCK[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
