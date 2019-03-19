import * as fromPizzas from './pizzas.reducer'
import * as fromToppings from './toppings.reducer'
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store'

// Hier ontstaat de state tree
export interface ProductsState {
    pizzas: fromPizzas.PizzaState
    toppings: fromToppings.ToppingState
}

// De ActionReducerMap zorgt voor typechecking. We kunnen niet zo maar functies toevoegen;
// deze moeten nu uit de Productstate komen.
export const reducers: ActionReducerMap<ProductsState> = {
    // koppel pizzas aan de reducer function
    pizzas: fromPizzas.reducer,
    toppings: fromToppings.reducer,
}

export const getProductsState = createFeatureSelector<ProductsState>('products')
