import { Pollution } from '../services/pollution.service';

export class AddToFavorites {
  static readonly type = '[Favorites] Add to Favorites';
  constructor(public payload: Pollution) {}
}

export class RemoveFromFavorites {
  static readonly type = '[Favorites] Remove from Favorites';
  constructor(public payload: number) {} // ID de la pollution
}

export class ClearFavorites {
  static readonly type = '[Favorites] Clear Favorites';
}


