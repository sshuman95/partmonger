import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Observable, startWith, Subject, switchMap } from 'rxjs';
import { Part } from '../../types/parts';
import { PartsService } from '../parts.service';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss'],
})
export class PartsComponent implements OnInit {
  constructor(private partsService: PartsService) {}
  searchForm = new FormGroup({
    query: new FormControl(''),
  });

  partList$?: Observable<Part[]>;

  ngOnInit(): void {
    this.partList$ = this.partsService.searchObs$.pipe(
      startWith(''),
      debounceTime(300),
      switchMap((query) => {
        return this.partsService.getParts(query);
      })
    );
  }

  handleSearch(event: SubmitEvent) {
    event.preventDefault();
    this.partsService.handleSearch(this.searchForm.get('query')?.value);
  }
}
