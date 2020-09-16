import { Injectable } from '@angular/core';
import { RxCacheService } from 'ngx-rxcache';

import { MockHttpService } from './mock-http.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersCache = this.cache.get<User[]>({
    id: '[Users] users',
    construct: () => this.http.get<User[]>('user')
  });

  users$ = this.usersCache.value$;

  loading$ = this.usersCache.loading$;

  constructor(private http: MockHttpService, private cache: RxCacheService) { }

  load() {
    this.usersCache.load();
  }
}