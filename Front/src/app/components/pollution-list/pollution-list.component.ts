import { Component, OnInit } from "@angular/core";
import { PollutionService, Pollution } from "../../services/pollution.service";
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FavoritesState } from '../../state/favorites.state';
import { AddToFavorites, RemoveFromFavorites } from '../../state/favorites.actions';

@Component({
  selector: "app-pollution-list",
  templateUrl: "./pollution-list.component.html",
  styleUrls: ["./pollution-list.component.css"],
})
export class PollutionListComponent implements OnInit {
  pollutions: Pollution[] = [];
  filtered: Pollution[] = [];
  filterText = "";

  @Select(FavoritesState.isFavorite) isFavorite$!: Observable<(pollutionId: number) => boolean>;

  constructor(private pollutionService: PollutionService, private store: Store) {}

  ngOnInit() {
    this.loadPollutions();
  }

  loadPollutions() {
    this.pollutionService.getAll().subscribe((data) => {
      this.pollutions = data;
      this.filtered = data;
    });
  }

  deletePollution(id: number) {
    this.pollutionService.delete(id).subscribe(() => {
      this.loadPollutions();
    });
  }
  filter() {
    this.filtered = this.pollutions.filter((p) =>
      p.city.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  toggleFavorite(pollution: Pollution) {
    if (pollution.id) {
      // Vérifier si c'est déjà en favoris
      const currentState = this.store.selectSnapshot(FavoritesState.isFavorite);
      const isFav = currentState(pollution.id);

      if (isFav) {
        this.store.dispatch(new RemoveFromFavorites(pollution.id));
      } else {
        this.store.dispatch(new AddToFavorites(pollution));
      }
    }
  }

  isFavorite(pollutionId: number): boolean {
    const currentState = this.store.selectSnapshot(FavoritesState.isFavorite);
    return currentState(pollutionId);
  }
}
