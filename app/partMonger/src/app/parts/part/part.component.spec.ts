import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { PARTSMOCK } from 'src/app/mocks/parts-mock';
import { PartService } from '../parts.service';
import { PartComponent } from './part.component';

describe('PartComponent', () => {
  let component: PartComponent;
  let fixture: ComponentFixture<PartComponent>;
  let serviceSpy: any;
  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('PartService', [
      'receivePart',
      'consumePart',
      'handleUpdateQuantity',
    ]);
    await TestBed.configureTestingModule({
      declarations: [PartComponent],
      imports: [HttpClientTestingModule, MatCardModule],
      providers: [{ provide: PartService, useValue: serviceSpy }],
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

  it('should call receivePart and update the quantity', () => {
    let res = { ...PARTSMOCK[0], inStock: 2 };
    serviceSpy.receivePart.and.returnValue(of(res));
    let receiveButton: HTMLButtonElement = fixture.debugElement.query(
      By.css('button')
    ).nativeElement;
    receiveButton.click();
    expect(serviceSpy.receivePart).toHaveBeenCalled();
    expect(serviceSpy.receivePart).toHaveBeenCalledWith(component.part.id);
    expect(serviceSpy.handleUpdateQuantity).toHaveBeenCalledWith(res);
  });

  it('should call consumePart and update the quantity', () => {
    let res = { ...PARTSMOCK[0], inStock: 0 };
    serviceSpy.consumePart.and.returnValue(of(res));
    let consumeButton: HTMLButtonElement = fixture.debugElement.queryAll(
      By.css('button')
    )[1].nativeElement;
    consumeButton.click();
    expect(serviceSpy.consumePart).toHaveBeenCalled();
    expect(serviceSpy.consumePart).toHaveBeenCalledWith(component.part.id);
    expect(serviceSpy.handleUpdateQuantity).toHaveBeenCalledWith(res);
  });
});
