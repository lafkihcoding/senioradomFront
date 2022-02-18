import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Position} from "./position";

@Injectable({
  providedIn: 'root'
})
export class PositionServiceService {

  url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  createPosition(position: any): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.post<any>(this.url + '/save',
      position, httpOptions);
  }
  getAllPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.url + '/all');
  }

  calculate(lat1:number,long1:number, lat2:number,long2:number): Observable<number> {
    return this.http.get<number>(this.url + '/calculate/'+lat1+'/'+long1+'/'+lat2+'/'+long2);
  }
  deletePosition(lat1:number,long1:number): Observable<number> {
    return this.http.delete<number>(this.url + '/delete/'+lat1+'/'+long1);
  }
}
