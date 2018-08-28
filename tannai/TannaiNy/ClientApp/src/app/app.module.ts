import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { EhdotusComponent } from './ehdotus/ehdotus.component';
import { KommenttiComponent } from './kommentti/kommentti.component';
import { LisaaKommenttiComponent } from './lisaa-kommentti/lisaa-kommentti.component';

import { HttpModule } from '@angular/http';

//import { ROUTES } from './app.routes';

import { AuthService } from './auth/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { ProfileComponent } from './profile/profile.component';
import { PingComponent } from './ping/ping.component';

import { Routes } from '@angular/router';

import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { ScopeGuardService as ScopeGuard } from './auth/scope-guard.service';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KommenttiDetailComponent } from './kommentti-detail/kommentti-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { EhdotusSearchComponent } from './ehdotus-search/ehdotus-search.component';





@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    EhdotusComponent,
    KommenttiComponent,
    LisaaKommenttiComponent,
    CallbackComponent,
    ProfileComponent,
    PingComponent,
    MapComponent,
    DashboardComponent,
    KommenttiDetailComponent,
    MessagesComponent,
    EhdotusSearchComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FormsModule,
    HttpModule,
    AppRoutingModule,
    HttpClientModule,
    //HttpClientInMemoryWebApiModule.forRoot(
    //  InMemoryDataService, { dataEncapsulation: false }
    //),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDiiUeDvQBtpL4JdU6OYWCwmxwK0PTbu_Y'
    }),
  //  RouterModule.forRoot([
  //    { path: '', component: HomeComponent, pathMatch: 'full' },
  //    { path: 'counter', component: CounterComponent },
  //    { path: 'fetch-data', component: FetchDataComponent },
  //    { path: 'callback', component: CallbackComponent },
  //    { path: '**', redirectTo: '' },
  //    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  //    { path: 'ping', component: PingComponent, canActivate: [AuthGuard] },
  //// { path: 'admin', component: AdminComponent, canActivate: [ScopeGuard], data: { expectedScopes: ['write:messages'] } },
  //  ])
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }




