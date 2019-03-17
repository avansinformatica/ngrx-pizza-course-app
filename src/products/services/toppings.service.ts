import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError, tap, map } from 'rxjs/operators'
import { Topping } from '../models/topping.model'

@Injectable()
export class ToppingsService {
    constructor(private http: HttpClient) {}

    getToppings(): Observable<Topping[]> {
        return this.http
            .get<Topping[]>(`api/toppings`, {
                params: undefined,
                observe: 'response',
            })
            .pipe(
                // tap(console.log),
                map(response => response.body),
                catchError((error: any) => throwError(error))
            )
    }
}
