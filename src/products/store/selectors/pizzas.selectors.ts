import { createSelector } from '@ngrx/store'

import * as fromRoot from '../../../app/store'
import * as fromFeature from '../reducers'
import * as fromPizzas from '../reducers/pizzas.reducer'

import { Pizza } from '../../models/pizza.model'
//
// Selectors - zijn nodig om door delen van de state tree te navigeren
// They return slices of the state tree.
//
// pizza state - part of the tree that we are managing

export const getPizzaState = createSelector(
    fromFeature.getProductsState,
    (state: fromFeature.ProductsState) => state.pizzas
)

/**
 * The state that we have here:
const state = {
  products: {
    pizzas: {
      entities: {},
      loading: false,
      loaded: false
    }
  }
}
*/

export const getPizzasEntities = createSelector(
    getPizzaState,
    fromPizzas.getPizzasEntities
)

// Get a selected pizza based on pizzaId from the route
export const getSelectedPizza = createSelector(
    getPizzasEntities,
    fromRoot.getRouterState,
    (entities, router): Pizza => {
        return router.state && entities[router.state.params.pizzaId]
    }
)

export const getAllPizzas = createSelector(
    getPizzasEntities,
    entities => {
        // Return an array version of our entities object
        // so that we can iterate over it via ngFor in HTML.
        return Object.keys(entities).map(id => entities[parseInt(id, 10)])
    }
)

export const getPizzasLoading = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoading
)

export const getPizzasLoaded = createSelector(
    getPizzaState,
    fromPizzas.getPizzasLoaded
)
