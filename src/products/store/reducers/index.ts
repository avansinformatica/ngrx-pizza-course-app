import * as fromPizzas from './pizzas.reducer'
import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store'

// Hier ontstaat de state tree
export interface ProductsState {
    pizzas: fromPizzas.PizzaState
}

// De ActionReducerMap zorgt voor typechecking. We kunnen niet zo maar functies toevoegen;
// deze moeten nu uit de Productstate komen.
export const reducers: ActionReducerMap<ProductsState> = {
    // koppel pizzas aan de reducer function
    pizzas: fromPizzas.reducer,
}

//
// Selectors - zijn nodig om door delen van de state tree te navigeren
// They return slices of the state tree.
//

export const getProductsState = createFeatureSelector<ProductsState>('products')

// product state - the top level of our state tree
export const getPizzaState = createSelector(
    getProductsState,
    (state: ProductsState) => state.pizzas
)

/**
 * The state that we have here:
const state = {
  products: {
    pizzas: {
      data: [],
      loading: false,
      loaded: false
    }
  }
}
*/

// pizza state - part of the tree that we are managing
export const getAllPizzas = createSelector(
    getPizzaState,
    fromPizzas.getPizzas
)

export const getPizzasLoading = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoading
)

export const getPizzasLoaded = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoaded
)
