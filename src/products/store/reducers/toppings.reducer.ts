import * as fromToppings from '../actions/toppings.action'
import { Topping } from '../../models/topping.model'

export interface ToppingState {
    entities: {
        [id: number]: Topping
    }
    loaded: boolean
    loading: boolean
}

export const initialState: ToppingState = {
    entities: {},
    loaded: false,
    loading: false,
}

export function reducer(
    state = initialState,
    action: fromToppings.ToppingsAction
): ToppingState {
    switch (action.type) {
        case fromToppings.LOAD_TOPPINGS: {
            return {
                ...state,
                loading: true,
            }
        }

        case fromToppings.LOAD_TOPPINGS_SUCCESS: {
            const toppings = action.payload
            //
            // Mooier: maak een utility function die onderstaande entities returnt
            // bv. util.mapToEntities(entities, topping)
            //
            const entities = toppings.reduce(
                (entities: { [id: number]: Topping }, topping: Topping) => {
                    return {
                        ...entities,
                        [topping.id]: topping,
                    }
                },
                {
                    ...state.entities,
                }
            )
            return {
                ...state,
                loading: false,
                loaded: true,
                entities,
            }
        }

        case fromToppings.LOAD_TOPPINGS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
            }
        }
    }
    return state
}

// Selector functions: get the pieces of our state that we need
export const getToppingsEntities = (state: ToppingState) => state.entities
export const getToppingsLoading = (state: ToppingState) => state.loading
export const getToppingsLoaded = (state: ToppingState) => state.loaded
