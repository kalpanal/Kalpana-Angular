import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class MockHttpService {
  private users: User[] = [{ id: 1, title: 'MR', firstname: 'John', lastname: 'Doe', email: 'john@doe.com' }];

  constructor() { }

  get<T>(url: string): Observable<any> {
    if (url === 'titles') {
      return of([
        { value: 'MR', label: 'Mr' },
        { value: 'MRS', label: 'Mrs' },
        { value: 'MISS', label: 'Miss' },
        { value: 'MS', label: 'Ms' },
        { value: 'DR', label: 'Doctor' },
        { value: 'PROF', label: 'Professor' },
        { value: 'LORD', label: 'Lord' }
      ]);
    }
    const urlArray = url.split('/');
    if (urlArray.length === 1) {
      return of(this.users).pipe(delay(1000));
    } else {
      const id = parseInt(urlArray[1]);
      return of(this.users.find(u => u.id === id)).pipe(delay(1000));
    }
  }

  post<T>(url: string, value: any): Observable<any> {
    if (!value.title) {
      return throwError({ error: 'Title cannot be blank' });
    }
    if (!value.firstname) {
      return throwError({ error: 'First name cannot be blank' });
    }
    if (!value.lastname) {
      return throwError({ error: 'Last name cannot be blank' });
    }
    if (!value.email) {
      return throwError({ error: 'Email cannot be blank' });
    }
    const id = this.users.reduce((greatestId, user) => user.id > greatestId ? user.id : greatestId, 0) + 1
    this.users = [...this.users, { ...value, id: id }];
    return of('OK').pipe(delay(1000));
  }

  put<T>(url: string, value: any): Observable<any> {
    if (!value.title) {
      return throwError({ error: 'Title cannot be blank' });
    }
    if (!value.firstname) {
      return throwError({ error: 'First name cannot be blank' });
    }
    if (!value.lastname) {
      return throwError({ error: 'Last name cannot be blank' });
    }
    if (!value.email) {
      return throwError({ error: 'Email cannot be blank' });
    }
    this.users = this.users.map(u => u.id === value.id ? value : u);
    return of('OK').pipe(delay(1000));
  }

  delete(url: string): Observable<any> {
    const urlArray = url.split('/');
    const id = parseInt(urlArray[1]);
    this.users = this.users.filter(u => u.id !== id);
    return of('OK');
  }
}