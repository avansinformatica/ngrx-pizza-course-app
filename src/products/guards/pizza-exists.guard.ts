import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router'

import { Store } from '@ngrx/store'
import { Observable, of } from 'rxjs'
import { tap, filter, take, switchMap, catchError, map } from 'rxjs/operators'

import * as fromStore from '../store'
import { Pizza } from '../models/pizza.model'

@Injectable()
export class PizzaExistsGuard implements CanActivate {
    constructor(private store: Store<fromStore.ProductsState>) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => {
                const id = +route.params.pizzaId
                return this.hasPizza(id)
            })
        )
    }

    hasPizza(id: number): Observable<boolean> {
        return this.store.select(fromStore.getPizzasEntities).pipe(
            // Get the entity with given id, and convert to boolean
            // true or false indicates wether the pizza exists.
            map((entities: { [key: number]: Pizza }) => !!entities[id]),
            take(1)
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
