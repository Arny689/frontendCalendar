import { Injectable } from '@angular/core';
import { DataDto, DateParsed } from './data.dto';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  data$: BehaviorSubject<DataDto | null> = new BehaviorSubject<DataDto | null>(null)

  date$: BehaviorSubject<DateParsed | null> = new BehaviorSubject<DateParsed | null>(null)

  constructor() { }

  setData(data: DataDto | null) {
    console.log(this.data$.value);
    this.data$.next(data)
  }

  setDate(date: DateParsed | null) {
    this.date$.next(date)
  }
}
