import { Injectable } from '@angular/core'
import { Actions, ofType, Effect } from '@ngrx/effects'
import * as pizzaActions from '../actions/pizzas.action'
import * as fromServices from '../../services/pizzas.service'
import { switchMap, map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

@Injectable()
export class PizzaEffects {
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

    constructor(
        private actions$: Actions,
        private pizzaService: fromServices.PizzasService
    ) {}
}
