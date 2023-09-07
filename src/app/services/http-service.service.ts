import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataDto } from './data.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }

  getDataById(id: string): Observable<DataDto> {
    const data = this.http.get<DataDto>(`http://localhost:3000/deals/${id}`)
    return data
  }

  createData(data: DataDto) {
    return this.http.post<DataDto>('http://localhost:3000/deals', data)
  }

  getAllData(): Observable<DataDto[]> {
    const data = this.http.get<DataDto[]>('http://localhost:3000/deals')
    return data
  }

  getMonthData(year: string, month: string): Observable<DataDto[]> {
    const data = this.http.get<DataDto[]>(`http://localhost:3000/deals/${year}/${month}`)
    return data
  }
}
