import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { PollutionListComponent } from './components/pollution-list/pollution-list.component';
import { PollutionDetailComponent } from './components/pollution-detail/pollution-detail.component';
import { PollutionFormComponent } from './components/pollution-form/pollution-form.component';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UtilisateurSigninComponent } from './components/utilisateur-signin/utilisateur-signin.component';
import { UtilisateurLoginComponent } from './components/utilisateur-login/utilisateur-login.component';
import { HeaderComponent } from './components/header/header.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

// NGXS imports
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { FavoritesState } from './state/favorites.state';
import { AuthState } from './state/auth.state';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PollutionListComponent,
    PollutionDetailComponent,
    PollutionFormComponent,
    FavoritesComponent,
    UtilisateurSigninComponent,
    UtilisateurLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    NgxsModule.forRoot([FavoritesState, AuthState]),
    NgxsStoragePluginModule.forRoot({
      keys: ['favorites', 'auth'] // Persister l'état des favoris et de l'authentification
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
