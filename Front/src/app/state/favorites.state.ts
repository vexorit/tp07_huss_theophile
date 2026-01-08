import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Pollution } from '../services/pollution.service';
import { AddToFavorites, RemoveFromFavorites, ClearFavorites } from './favorites.actions';

export interface FavoritesStateModel {
  favorites: Pollution[];
}

@State<FavoritesStateModel>({
  name: 'favorites',
  defaults: {
    favorites: []
  }
})
@Injectable()
export class FavoritesState {
  constructor() {
    console.log('FavoritesState créé, vérification localStorage...');
    const stored = localStorage.getItem('favorites');
    console.log('Données localStorage pour favorites:', stored);
  }

  @Selector()
  static getFavorites(state: FavoritesStateModel): Pollution[] {
    const result = Array.isArray(state.favorites) ? state.favorites : [];
    console.log('Selector getFavorites appelé, retourne:', result);
    return result;
  }

  @Selector()
  static getFavoritesCount(state: FavoritesStateModel): number {
    return Array.isArray(state.favorites) ? state.favorites.length : 0;
  }

  @Selector()
  static isFavorite(state: FavoritesStateModel) {
    return (pollutionId: number): boolean => {
      return Array.isArray(state.favorites) && state.favorites.some(fav => fav.id === pollutionId);
    };
  }

  @Action(AddToFavorites)
  addToFavorites(ctx: StateContext<FavoritesStateModel>, action: AddToFavorites) {
    const state = ctx.getState();
    console.log('Action AddToFavorites:', action.payload);
    console.log('État actuel:', state);
    const currentFavorites = Array.isArray(state.favorites) ? state.favorites : [];
    // Vérifier si la pollution n'est pas déjà en favoris
    if (!currentFavorites.some((fav: Pollution) => fav.id === action.payload.id)) {
      ctx.patchState({
        favorites: [...currentFavorites, action.payload]
      });
      console.log('Favori ajouté, nouvel état:', ctx.getState());
    } else {
      console.log('Favori déjà existant');
    }
  }

  @Action(RemoveFromFavorites)
  removeFromFavorites(ctx: StateContext<FavoritesStateModel>, action: RemoveFromFavorites) {
    const state = ctx.getState();
    const currentFavorites = Array.isArray(state.favorites) ? state.favorites : [];
    ctx.patchState({
      favorites: currentFavorites.filter((fav: Pollution) => fav.id !== action.payload)
    });
  }

  @Action(ClearFavorites)
  clearFavorites(ctx: StateContext<FavoritesStateModel>) {
    ctx.patchState({
      favorites: []
    });
  }
}