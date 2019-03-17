import { PizzasService } from './pizzas.service'
import { ToppingsService } from './toppings.service'
import { InMemoryDataService } from './in-memory-data.service'

export const services: any[] = [
    PizzasService,
    ToppingsService,
    InMemoryDataService,
]

export * from './pizzas.service'
export * from './toppings.service'
export * from './in-memory-data.service'
