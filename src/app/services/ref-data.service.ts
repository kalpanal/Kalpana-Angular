import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RxCacheService } from 'ngx-rxcache';

import { MockHttpService } from './mock-http.service';
import { SelectItem } from '../models/select-item';

@Injectable({
  providedIn: 'root'
})
export class RefDataService {
  private titlesCache = this.cache.get<SelectItem[]>({
    id: '[RefData] titles',
    construct: () => this.http.get<SelectItem[]>('titles'),
    autoload: true
  });
  
  constructor(
    private http: MockHttpService,
    private cache: RxCacheService
  ) { }

  get titles$(): Observable<SelectItem[]> {
    return this.titlesCache.value$;
  }
}