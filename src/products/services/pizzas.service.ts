import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators'
import { Pizza } from '../models/pizza.model'
import { Observable, throwError } from 'rxjs'

@Injectable()
export class PizzasService {
    constructor(private http: HttpClient) {}

    getPizzas(): Observable<Pizza[]> {
        const endpoint = `api/pizzas`
        return this.http
            .get<Pizza[]>(endpoint, {
                params: undefined,
                observe: 'response',
            })
            .pipe(
                // tap(console.log),
                map(response => response.body),
                catchError((error: any) => throwError(error))
            )
    }

    createPizza(payload: Pizza): Observable<Pizza> {
        return this.http
            .post<Pizza>(`api/pizzas`, payload, {
                params: undefined,
                observe: 'response',
            })
            .pipe(
                // tap(console.log),
                map(response => response.body),
                catchError((error: any) => throwError(error))
            )
    }

    updatePizza(payload: Pizza): Observable<Pizza> {
        return this.http
            .put<Pizza>(`api/pizzas/${payload.id}`, payload, {
                params: undefined,
                observe: 'response',
            })
            .pipe(
                // tap(console.log),
                map(response => response.body),
                catchError((error: any) => throwError(error))
            )
    }

    removePizza(payload: Pizza): Observable<Pizza> {
        return this.http
            .delete<any>(`api/pizzas/${payload.id}`, {
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
