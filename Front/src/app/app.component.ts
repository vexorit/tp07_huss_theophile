import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FavoritesState } from './state/favorites.state';
import { LoadUserFromStorage, AuthState } from './state/auth.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    // Charger l'état d'authentification depuis le localStorage
    this.store.dispatch(new LoadUserFromStorage());

    // Debug: vérifier l'état initial des favoris restauré par NGXS
    const initialState = this.store.selectSnapshot(FavoritesState.getFavorites);
    console.log('État initial des favoris après restauration NGXS:', initialState);
  }
}
