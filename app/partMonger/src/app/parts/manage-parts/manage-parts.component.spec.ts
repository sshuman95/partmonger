import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PARTSMOCK } from 'src/app/mocks/parts-mock';
import { ManagePartsComponent } from './manage-parts.component';

describe('ManagePartsComponent', () => {
  let component: ManagePartsComponent;
  let fixture: ComponentFixture<ManagePartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePartsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should return a part's id", () => {
    expect(component.track(0, PARTSMOCK[0])).toEqual(1);
  });
});
