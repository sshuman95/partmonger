import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  mergeWith,
  Observable,
  startWith,
  Subscription,
} from 'rxjs';
import { Part } from '../../types/parts';
import { PartService } from '../parts.service';

@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrls: ['./parts.component.scss'],
})
export class PartsComponent implements OnInit, OnDestroy {
  query: FormControl;
  partList$?: Observable<Part[]>;
  searchSub = new Subscription();
  constructor(private partService: PartService) {
    this.query = new FormControl('');
  }
  ngOnInit(): void {
    this.partList$ = this.partService.searchParts$.pipe(
      mergeWith(this.partService.partCache$)
    );

    this.searchSub = this.query.valueChanges
      .pipe(startWith(''), debounceTime(300), distinctUntilChanged())
      .subscribe((value) => this.partService.handleSearch(value));
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }
}
