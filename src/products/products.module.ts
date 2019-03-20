import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { InMemoryDataService } from './services'

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'

import { reducers, effects } from './store'

// components
import * as fromComponents from './components'

// containers
import * as fromContainers from './containers'

// guards
import * as fromGuards from './guards'

// services
import * as fromServices from './services'

// routes
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [fromGuards.PizzaGuard],
        component: fromContainers.ProductsComponent,
    },
    {
        path: 'new',
        canActivate: [fromGuards.PizzaGuard, fromGuards.ToppingsGuard],
        component: fromContainers.ProductItemComponent,
    },
    {
        path: ':pizzaId',
        canActivate: [fromGuards.PizzaExistsGuard, fromGuards.ToppingsGuard],
        component: fromContainers.ProductItemComponent,
    },
]

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,

        // Always import the HttpClientInMemoryWebApiModule after the HttpClientModule
        // to ensure that the in-memory backend provider supersedes the Angular version.
        HttpClientModule,
        // HttpClientXsrfModule.withOptions({
        //     cookieName: 'My-Xsrf-Cookie',
        //     headerName: 'My-Xsrf-Header',
        // }),
        // Conditional import! Production does not use the in-memory web api.
        environment.production
            ? []
            : HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
                  dataEncapsulation: false,
                  passThruUnknownUrl: true,
                  put204: false, // return entity after PUT/update
              }),

        RouterModule.forChild(ROUTES),
        // Lazyload all store parts
        StoreModule.forFeature('products', reducers),
        EffectsModule.forFeature(effects),
    ],
    providers: [...fromServices.services, ...fromGuards.guards],
    declarations: [...fromContainers.containers, ...fromComponents.components],
    exports: [...fromContainers.containers, ...fromComponents.components],
})
export class ProductsModule {}
