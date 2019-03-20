import * as fromPizzas from './pizzas.action'

describe('Pizzas actions', () => {
    describe('Load Pizza Actions', () => {
        describe('Load Pizzas', () => {
            it('should create an action', () => {
                const action = new fromPizzas.LoadPizzas()

                expect({ ...action }).toEqual({
                    type: fromPizzas.LOAD_PIZZAS,
                })
            })
        })

        describe('Load Pizzas Fail', () => {
            it('should create an action', () => {
                const payload = { message: 'Load error' }
                const action = new fromPizzas.LoadPizzasFail(payload)

                expect({ ...action }).toEqual({
                    type: fromPizzas.LOAD_PIZZAS_FAIL,
                    payload,
                })
            })
        })
    })
})
