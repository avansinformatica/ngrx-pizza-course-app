import * as fromRouter from '@ngrx/router-store'
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store'
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Params,
    RouterState,
} from '@angular/router'

//
// Deze kun je uitbreiden om je eigen properties uit de route terug te krijgen.
// Dat zijn dan bestaande properties die in de route zitten.
// Zie de ngrx documentation over routing.
//
export interface RouterStateUrl {
    url: string
    queryParams: Params
    params: Params
}

export interface State {
    routerReducer: fromRouter.RouterReducerState<RouterStateUrl>
}

export const reducers: ActionReducerMap<State> = {
    routerReducer: fromRouter.routerReducer,
}

export const getRouterState = createFeatureSelector<
    fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer')

//
// Custom serializer - zorgt dat je eigen properties uit de route kunt halen
// ngrx heeft dit ook; zelf maken hoeft niet, maar geeft meer controle.
//
export class CustomSerializer
    implements fromRouter.RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        // const url = routerState.url
        // zelfde op es6 manier: cleaner
        // = destructuring, zelfde als import { } from '..'
        const { url } = routerState
        const { queryParams } = routerState.root

        let state: ActivatedRouteSnapshot = routerState.root
        // state bevat alle router properties die we kunnen gebruiken.
        // Loop door de delen van de url tot we bij de laatste komen.
        // Dat is de params. Bv /pizzas/1/toppings/1
        while (state.firstChild) {
            state = state.firstChild
        }
        const params = state.params

        // Dit object zal aan de state tree gebonden worden.
        return { url, queryParams, params }
    }
}
