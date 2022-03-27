import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreatePart, Part } from '../types/parts';

@Injectable({
  providedIn: 'root',
})
export class PartService {
  constructor(private http: HttpClient) {}
  private _url = environment.apiBase;
  get url() {
    return this._url;
  }
  private _cache = new Subject<Part[]>();
  searchSubject = new Subject<string>();
  parts: Part[] = [];
  partCache$ = this._cache.asObservable();
  searchParts$ = this.searchSubject.asObservable().pipe(
    switchMap((query) => {
      return this.getParts(query);
    })
  );

  getParts(query?: string) {
    let request = query?.length
      ? `${this.url}/parts?search=${query}`
      : `${this.url}/parts`;
    return this.http
      .get<Part[]>(request)
      .pipe(tap((data) => (this.parts = [...data])));
  }

  getPartById(id: number): Observable<Part> {
    return this.http
      .get<Part | { errors: string[] }>(`${this.url}/parts/${id}`)
      .pipe(
        map((data) => {
          if ('errors' in data) {
            console.error(data.errors);
            return this.getNewPart();
          }
          return data;
        })
      );
  }

  handleSearch(query: string) {
    this.searchSubject.next(query);
  }

  receivePart(id: number) {
    return this.http.put<Part>(`${this.url}/parts/${id}/receive`, {
      quantity: 1,
    });
  }

  consumePart(id: number) {
    return this.http.put<Part>(`${this.url}/parts/${id}/consume`, {
      quantity: 1,
    });
  }

  addPart(part: CreatePart) {
    return this.http.post<Part>(`${this.url}/parts`, part);
  }

  editPart(part: Part) {
    return this.http.put<Part>(`${this.url}/parts/${part.id}`, part);
  }

  deletePart(id: number) {
    return this.http.delete<Part>(`${this.url}/parts/${id}`);
  }

  handleUpdateQuantity(data: Part) {
    this.parts = [...this.parts].map((p) => {
      if (p.id === data.id) {
        return { ...p, inStock: data.inStock };
      }
      return { ...p };
    });
    this._cache.next([...this.parts]);
  }

  handleAddPart(data: Part) {
    this.parts = [...this.parts, data];
    this._cache.next([...this.parts]);
  }

  handleEditPart(data: Part) {
    this.parts = [...this.parts].map((p) => {
      if (p.id === data.id) {
        return { ...p, ...data };
      }
      return { ...p };
    });
    this._cache.next([...this.parts]);
  }

  handleDeletePart(data: Part) {
    this.parts = [...this.parts].filter((p) => p.id !== data.id);
    this._cache.next([...this.parts]);
  }

  getNewPart(): Part {
    return {
      id: 0,
      cost: 0,
      partNumber: '',
      description: '',
      name: '',
      notes: '',
      inStock: 0,
      image: '',
      isActive: true,
    };
  }
}
