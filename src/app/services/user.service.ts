import { Injectable } from '@angular/core';
import { RxCacheService } from 'ngx-rxcache';

import { MockHttpService } from './mock-http.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userCache = this.cache.get<User>({
    id: '[User] user',
    save: (user: User) => user.id ? this.http.put<User>(`user/${user.id}`, user) : this.http.post<User>('user', user),
    delete: (user: User) => this.http.delete(`user/${user.id}`),
    errorHandler: (response) => response.error
  });

  user$ = this.userCache.clone$;

  loading$ = this.userCache.loading$;

  saving$ = this.userCache.saving$;

  error$ = this.userCache.error$;

  constructor(
    private http: MockHttpService,
    private cache: RxCacheService
  ) { }

  save(user: User, saved?: (response) => void) {
    this.userCache.save(user, saved);
  }

  delete(user: User, deleted?: (response) => void) {
    this.userCache.delete(user, deleted);
  }

  load(id?: number) {
    if (id) {
      this.userCache.load(() => this.http.get<User>(`user/${id}`));
    } else {
      this.userCache.update({
        id: null,
        title: null,
        firstname: '',
        lastname: '',
        email: ''
      });
    }
  }
}