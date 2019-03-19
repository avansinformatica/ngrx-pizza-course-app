import { Injectable } from '@angular/core'
import { Actions, ofType, Effect } from '@ngrx/effects'
import * as toppingActions from '../actions/toppings.action'
import * as fromServices from '../../services/toppings.service'
import { switchMap, map, catchError } from 'rxjs/operators'
import { of } from 'rxjs'

@Injectable()
export class ToppingEffects {
    @Effect()
    loadToppings$ = this.actions$.pipe(
        ofType(toppingActions.LOAD_TOPPINGS),
        switchMap(() =>
            this.toppingService.getToppings().pipe(
                map(
                    toppings => new toppingActions.LoadToppingsSuccess(toppings)
                ),
                catchError(error =>
                    of(new toppingActions.LoadToppingsFail(error))
                )
            )
        )
    )

    constructor(
        private actions$: Actions,
        private toppingService: fromServices.ToppingsService
    ) {}
}
