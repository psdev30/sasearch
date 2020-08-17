import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  getRandomSubject: Subject<Boolean> = new Subject<Boolean>();
  getRandomObservable$: Observable<Boolean> = this.getRandomSubject.asObservable();

  searchSubject: Subject<any> = new Subject<any>();
  searchObservable$: Observable<any> = this.searchSubject.asObservable();

  constructor() { }


  triggerGetRandom(trigger: boolean) {
    this.getRandomSubject.next(trigger);
  }

  triggerSearch(trigger: string) {
    this.searchSubject.next(trigger);
  }

}
