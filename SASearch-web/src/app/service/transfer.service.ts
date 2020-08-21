import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  query: string;

  getRandomSubject: Subject<Boolean> = new Subject<Boolean>();
  getRandomObservable$: Observable<Boolean> = this.getRandomSubject.asObservable();

  searchSubject: Subject<any> = new Subject<any>();
  searchObservable$: Observable<any> = this.searchSubject.asObservable();

  loadingSubject: Subject<any> = new Subject<any>();
  loadingObservable$: Observable<any> = this.loadingSubject.asObservable();

  constructor() { }


  triggerGetRandom(trigger: boolean) {
    this.getRandomSubject.next(trigger);
  }

  triggerSearch(trigger: string) {
    this.setQuery(trigger);
    this.searchSubject.next(trigger);
  }

  getQuery() {
    return this.query;
  }

  setQuery(query: string) {
    this.query = query;
  }

  resetQuery() {
    this.query = '';
  }

  toggleLoadingIndicator(toggle: boolean) {
    this.loadingSubject.next(toggle);
  }

}
