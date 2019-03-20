import * as fromPizzas from '../actions/pizzas.action'
import { Pizza } from 'src/products/models/pizza.model'

export interface PizzaState {
    entities: {
        [id: number]: Pizza
    }
    loaded: boolean
    loading: boolean
}

export const initialState: PizzaState = {
    entities: {},
    loaded: false,
    loading: false,
}

export function reducer(
    state = initialState,
    action: fromPizzas.PizzasAction
): PizzaState {
    switch (action.type) {
        case fromPizzas.LOAD_PIZZAS: {
            return {
                ...state,
                loading: true,
            }
        }

        case fromPizzas.LOAD_PIZZAS_SUCCESS: {
            const pizzas = action.payload
            // Array approach: expensive
            // [{ id: 1, name: 'Pizza'}, { id: 2, name: 'OtherPizza'}]
            // Object approach: fast
            // const pizzas: any = {
            //     0: {
            //         id: 0,
            //         name: 'Pizza',
            //         toppings: [],
            //     },
            //     1: {
            //         id: 1,
            //         name: 'OtherPizza',
            //     },
            // }
            const entities = pizzas.reduce(
                (entities: { [id: number]: Pizza }, pizza: Pizza) => {
                    return {
                        ...entities,
                        [pizza.id]: pizza,
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

        case fromPizzas.LOAD_PIZZAS_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
            }
        }

        case fromPizzas.CREATE_PIZZA_SUCCESS:
        case fromPizzas.UPDATE_PIZZA_SUCCESS: {
            console.log(action.type)
            const pizza = action.payload
            const entities = {
                ...state.entities,
                [pizza.id]: pizza,
            }
            return {
                ...state,
                entities,
            }
        }

        case fromPizzas.DELETE_PIZZA_SUCCESS: {
            const pizza = action.payload
            // destructure the pizza from the state object
            // select the pizza by id and name that 'removed'
            // the remainder are the enteties, without the removed.
            // ES6 destructuring syntax!
            const { [pizza.id]: removed, ...entities } = state.entities

            return {
                ...state,
                entities,
            }
        }
    }
    return state
}

// Selector functions: get the pieces of our state that we need
export const getPizzasEntities = (state: PizzaState) => state.entities
export const getPizzasLoading = (state: PizzaState) => state.loading
export const getPizzasLoaded = (state: PizzaState) => state.loaded
