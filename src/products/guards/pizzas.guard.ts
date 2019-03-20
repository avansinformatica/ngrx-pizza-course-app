import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'

import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { map, tap, filter, take, switchMap, catchError } from 'rxjs/operators'

import * as fromStore from '../store'

@Injectable()
export class PizzaGuard implements CanActivate {
    constructor(private store: Store<fromStore.ProductsState>) {}

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        )
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getPizzasLoaded).pipe(
            tap(loaded => {
                if (!loaded) {
                    // load pizzas from the store
                    this.store.dispatch(new fromStore.LoadPizzas())
                }
            }),
            // this filter construct waits for loaded to become true
            filter(loaded => loaded),
            // this take completes the observable and unsubscribes
            take(1)
        )
    }
}
