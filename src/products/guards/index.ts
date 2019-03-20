import { PizzaGuard } from './pizzas.guard'
import { PizzaExistsGuard } from './pizza-exists.guard'
import { ToppingsGuard } from './toppings.guard'

export const guards: any[] = [PizzaGuard, PizzaExistsGuard, ToppingsGuard]

export * from './pizzas.guard'
export * from './pizza-exists.guard'
export * from './toppings.guard'
