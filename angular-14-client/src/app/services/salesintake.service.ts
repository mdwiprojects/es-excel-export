import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/salesintake';

@Injectable({
  providedIn: 'root'
})
export class SalesIntakeService {
    constructor(private http:HttpClient) {

    }
    exportSalesIntake(data:any){
        return this.http.post(`${baseUrl}/excel`,data);
    }
}