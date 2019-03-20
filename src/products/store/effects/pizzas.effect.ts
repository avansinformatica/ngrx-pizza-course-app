import { Injectable } from '@angular/core'
import { Actions, ofType, Effect } from '@ngrx/effects'

import * as fromRoot from '../../../app/store'
import * as pizzaActions from '../actions/pizzas.action'
import * as fromServices from '../../services/pizzas.service'

import { switchMap, map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

@Injectable()
export class PizzaEffects {
    constructor(
        private actions$: Actions,
        private pizzaService: fromServices.PizzasService
    ) {}

    @Effect()
    loadPizzas$ = this.actions$.pipe(
        ofType(pizzaActions.LOAD_PIZZAS),
        switchMap(() =>
            this.pizzaService.getPizzas().pipe(
                map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
                catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
            )
        )
    )

    //
    // CreatePizza the pizza via the service
    //
    @Effect()
    createPizza$ = this.actions$.pipe(
        ofType(pizzaActions.CREATE_PIZZA),
        map((action: pizzaActions.CreatePizza) => action.payload),
        switchMap(fromPayload =>
            this.pizzaService.createPizza(fromPayload).pipe(
                map(pizza => new pizzaActions.CreatePizzaSuccess(pizza)),
                catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
            )
        )
    )

    //
    // CreatePizzaSuccess - navigate to the pizza after it has been created.
    //
    @Effect()
    createPizzaSuccess$ = this.actions$.pipe(
        ofType(pizzaActions.CREATE_PIZZA_SUCCESS),
        map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
        map(pizza => {
            return new fromRoot.Go({
                path: ['/products', pizza.id],
            })
        })
    )

    //
    // Update the pizza via the service
    //
    @Effect()
    updatePizza$ = this.actions$.pipe(
        ofType(pizzaActions.UPDATE_PIZZA),
        map((action: pizzaActions.UpdatePizza) => action.payload),
        switchMap(fromPayload =>
            this.pizzaService.updatePizza(fromPayload).pipe(
                map(pizza => new pizzaActions.UpdatePizzaSuccess(pizza)),
                catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
            )
        )
        // switchMap(fromPayload => this.pizzaService.updatePizza(fromPayload)),
        // map(pizza => new pizzaActions.UpdatePizzaSuccess(pizza)),
        // catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
    )

    @Effect()
    deletePizza$ = this.actions$.pipe(
        ofType(pizzaActions.DELETE_PIZZA),
        map((action: pizzaActions.DeletePizza) => action.payload),
        switchMap(pizza =>
            this.pizzaService.removePizza(pizza).pipe(
                // pizzaService.remove returns nothing, so we return
                // the deleted pizza ourselves on success
                map(() => new pizzaActions.DeletePizzaSuccess(pizza)),
                catchError(error => of(new pizzaActions.DeletePizzaFail(error)))
            )
        )
    )

    //
    // CreatePizzaSuccess - navigate to the pizza after it has been created.
    //
    @Effect()
    handlePizzaSuccess$ = this.actions$.pipe(
        ofType(
            pizzaActions.UPDATE_PIZZA_SUCCESS,
            pizzaActions.DELETE_PIZZA_SUCCESS
        ),
        map(() => {
            return new fromRoot.Go({
                path: ['/products'],
            })
        })
    )
}
