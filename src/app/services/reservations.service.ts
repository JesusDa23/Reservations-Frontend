import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ReservationService {
    private apiUrl = 'http://localhost:3000/api/reservations'

    constructor(private http: HttpClient) { }

    createReservation(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data)
    }
    
}