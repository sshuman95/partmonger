import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { PARTSMOCK } from 'src/app/mocks/parts-mock';
import { PartComponent } from '../part/part.component';

import { PartsListComponent } from './parts-list.component';

describe('PartsListComponent', () => {
  let component: PartsListComponent;
  let fixture: ComponentFixture<PartsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartsListComponent, PartComponent],
      imports: [HttpClientTestingModule, MatCardModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of parts', () => {
    component.parts = PARTSMOCK;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('app-part')).length).toEqual(
      PARTSMOCK.length
    );
  });
});
