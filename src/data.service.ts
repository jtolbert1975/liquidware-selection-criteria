import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DataService {
   url: string = 'https://demo.liquidware.com/lwl/api?json={"inspector":"0"} ' ;

  constructor(private http: HttpClient) { }

  getAllYesterday() : Observable<any>{
    console.log("get All Yesterday")
   
    return this.http.get(this.url).pipe();
  }

}
