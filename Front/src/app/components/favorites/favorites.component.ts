import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Pollution } from '../../services/pollution.service';
import { FavoritesState } from '../../state/favorites.state';
import { RemoveFromFavorites, ClearFavorites } from '../../state/favorites.actions';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites$!: Observable<Pollution[]>;

  constructor(private store: Store) {}

  ngOnInit() {
    // Initialiser l'observable des favoris de manière sécurisée
    this.favorites$ = this.store.select(FavoritesState.getFavorites);

    // Debug: log des favoris
    this.favorites$.subscribe(favorites => {
      console.log('Favoris actuels:', favorites);
    });
  }

  removeFromFavorites(pollutionId: number) {
    this.store.dispatch(new RemoveFromFavorites(pollutionId));
  }

  clearAllFavorites() {
    if (confirm('Êtes-vous sûr de vouloir supprimer tous vos favoris ?')) {
      this.store.dispatch(new ClearFavorites());
    }
  }
}

