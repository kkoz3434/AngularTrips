import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AllTripsComponent} from './all-trips/all-trips.component';
import {TripFormComponent} from './trip-form/trip-form.component';
import {RouterModule, Routes} from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {TripComponent} from './trip/trip.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { TripDetailsComponent } from './trip-details/trip-details.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthService } from './services/auth.service';

const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'mainPage', component: AllTripsComponent},
  {path: 'addTrip', component: TripFormComponent},
  {path: 'tripDetails/:id', component:TripDetailsComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    AllTripsComponent,
    TripFormComponent,
    MenuComponent,
    TripComponent,
    PageNotFoundComponent,
    TripDetailsComponent,
    LoginComponent,
  ],
  imports: [
    AngularFirestoreModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}



