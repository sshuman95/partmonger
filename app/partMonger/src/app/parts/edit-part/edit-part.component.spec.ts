import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PARTSMOCK } from 'src/app/mocks/parts-mock';
import { PartService } from '../parts.service';
import { EditPartComponent } from './edit-part.component';

describe('EditPartComponent', () => {
  let component: EditPartComponent;
  let fixture: ComponentFixture<EditPartComponent>;
  let serviceSpy: any;

  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('PartService', [
      'editPart',
      'handleEditPart',
      'getPartById',
    ]);
    await TestBed.configureTestingModule({
      declarations: [EditPartComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [{ provide: PartService, useValue: serviceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPartComponent);
    component = fixture.componentInstance;
    serviceSpy.getPartById.and.returnValue(of(PARTSMOCK[0]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a new form group', () => {
    let formValue = {
      id: 1,
      cost: 10,
      partNumber: 'mockPart1',
      description: 'mock part',
      name: 'Mock Part 1',
      notes: 'Mock note',
      image: '',
      isActive: false,
    };
    expect(component.initForm(PARTSMOCK[0]).value).toEqual(formValue);
  });

  it('should return the proper cost error message', () => {
    let form = component.initForm(PARTSMOCK[0]);
    form.get('cost')?.setValue(undefined);
    expect(component.getCostError(form)).toEqual(component.requiredMessage);
    form.get('cost')?.setValue(-1);
    expect(component.getCostError(form)).toEqual(
      'Cost must be greater than 0.'
    );
    form.get('cost')?.setValue(10);
    expect(component.getCostError(form)).toEqual('');
    expect(component.getCostError(new FormGroup({}))).toEqual('');
  });

  it('should submit an updated part and call handleUpdate', () => {
    let res = { ...PARTSMOCK[0], cost: 100 };
    serviceSpy.editPart.and.returnValue(of(res));
    let form = component.initForm(PARTSMOCK[0]);
    form.get('cost')?.setValue(100);
    fixture.detectChanges();
    component.handleSubmit(new SubmitEvent('submit'), form);
    expect(serviceSpy.editPart).toHaveBeenCalledWith(form.value);
    expect(serviceSpy.handleEditPart).toHaveBeenCalledTimes(1);
    expect(serviceSpy.handleEditPart).toHaveBeenCalledWith(res);
  });

  it('should not submit the form and not call handleUpdate', () => {
    let res = { ...PARTSMOCK[0], cost: 100 };
    serviceSpy.editPart.and.returnValue(of(res));
    let form = component.initForm(PARTSMOCK[0]);
    form.get('cost')?.setValue(-100);
    fixture.detectChanges();
    component.handleSubmit(new SubmitEvent('submit'), form);
    expect(serviceSpy.editPart).not.toHaveBeenCalled();
    expect(serviceSpy.handleEditPart).not.toHaveBeenCalled();
  });
});
