import { createSelector } from '@ngrx/store'

import * as fromRoot from '../../../app/store'
import * as fromFeature from '../reducers'
import * as fromToppings from '../reducers/toppings.reducer'

import { Topping } from '../../models/topping.model'

//
// Selectors - zijn nodig om door delen van de state tree te navigeren
// They return slices of the state tree.
//
// topping state - part of the tree that we are managing
export const getToppingState = createSelector(
    fromFeature.getProductsState,
    (state: fromFeature.ProductsState) => state.toppings
)

export const getToppingsEntities = createSelector(
    getToppingState,
    fromToppings.getToppingsEntities
)

// Get a selected topping based on toppingId from the route
export const getSelectedTopping = createSelector(
    getToppingsEntities,
    fromRoot.getRouterState,
    (entities, router): Topping => {
        return router.state && entities[router.state.params.toppingId]
    }
)

export const getAllToppings = createSelector(
    getToppingsEntities,
    entities => {
        // Return an array version of our entities object
        // so that we can iterate over it via ngFor in HTML.
        return Object.keys(entities).map(id => entities[parseInt(id, 10)])
    }
)

export const getToppingsLoading = createSelector(
    getToppingState,
    fromToppings.getToppingsLoading
)

export const getToppingsLoaded = createSelector(
    getToppingState,
    fromToppings.getToppingsLoaded
)
