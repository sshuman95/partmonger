import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PARTSMOCK } from 'src/app/mocks/parts-mock';
import { EditPartComponent } from '../edit-part/edit-part.component';
import { PartService } from '../parts.service';
import { PartComponent } from './part.component';

describe('PartComponent', () => {
  let component: PartComponent;
  let fixture: ComponentFixture<PartComponent>;
  let service: any;
  let router: any;
  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('PartService', [
      'receivePart',
      'consumePart',
      'handleUpdateQuantity',
    ]);
    await TestBed.configureTestingModule({
      declarations: [PartComponent],
      imports: [
        HttpClientTestingModule,
        MatCardModule,
        RouterTestingModule.withRoutes([
          { path: 'manage/:id', component: EditPartComponent },
        ]),
      ],
      providers: [{ provide: PartService, useValue: serviceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartComponent);
    component = fixture.componentInstance;
    component.part = PARTSMOCK[0];
    service = TestBed.inject(PartService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call receivePart and update the quantity', () => {
    let res = { ...PARTSMOCK[0], inStock: 2 };
    service.receivePart.and.returnValue(of(res));
    let receiveButton: HTMLButtonElement = fixture.debugElement.query(
      By.css('.receive')
    ).nativeElement;
    receiveButton.click();
    expect(service.receivePart).toHaveBeenCalledOnceWith(component.part.id);
    expect(service.handleUpdateQuantity).toHaveBeenCalled();
  });

  it('should call consumePart and update the quantity', () => {
    let res = { ...PARTSMOCK[0], inStock: 0 };
    service.consumePart.and.returnValue(of(res));
    let consumeButton: HTMLButtonElement = fixture.debugElement.query(
      By.css('.consume')
    ).nativeElement;
    consumeButton.click();
    expect(service.consumePart).toHaveBeenCalledOnceWith(component.part.id);
    expect(service.handleUpdateQuantity).toHaveBeenCalled();
  });

  it('should navigate to manage/ID', () => {
    spyOn(router, 'navigateByUrl');
    let editButton: HTMLButtonElement = fixture.debugElement.query(
      By.css('.edit')
    ).nativeElement;
    editButton.click();
    expect(router.navigateByUrl).toHaveBeenCalledWith(
      `manage/${component.part.id}`
    );
  });
});
