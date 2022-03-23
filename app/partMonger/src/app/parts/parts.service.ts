import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorService } from '../services/error.service';
import { Part } from '../types/parts';

@Injectable({
  providedIn: 'root',
})
export class PartsService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}
  private _url = environment.apiBase;
  get url() {
    return this._url;
  }

  private searchSubject = new Subject<string>();
  searchObs$ = this.searchSubject.asObservable()
  getParts(query?: string) {
    let request = query?.length
      ? `${this.url}/parts?search=${query}`
      : `${this.url}/parts`;
    return this.http
      .get<Part[]>(request)
      .pipe(catchError(this.errorService.handleError<Part[]>('getParts', [])));
  }

  handleSearch(query:string){
    this.searchSubject.next(query);
  }
}
