import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NewPartComponent } from './new-part.component';


describe('NewPartComponent', () => {
  let component: NewPartComponent;
  let fixture: ComponentFixture<NewPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewPartComponent],
      imports: [
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the proper error message for cost', () => {
    component.partForm.get('cost')?.setValue(undefined);
    fixture.detectChanges();
    expect(component.getCostError()).toEqual(component.requiredMessage);
    component.partForm.get('cost')?.setValue(-1);
    fixture.detectChanges();
    expect(component.getCostError()).toEqual('Cost must be greater than 0.');
    component.partForm.get('cost')?.setValue(10);
    fixture.detectChanges();
    expect(component.getCostError()).toEqual('');
    component.partForm.removeControl('cost');
    fixture.detectChanges();
    expect(component.getCostError()).toEqual('');
  });
});
