import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { FavoritesState } from "../../state/favorites.state";
import { AuthState, Logout } from "../../state/auth.state";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  @Select(FavoritesState.getFavoritesCount)
  favoritesCount$!: Observable<number>;

  constructor(private store: Store, private router: Router) {}

  onLogout() {
    this.store.dispatch(new Logout());
    this.router.navigate(["/utilisateur/login"]);
  }

  getIsAuthenticatedSnapshot() {
    return this.store.selectSnapshot(AuthState.isAuthenticated);
  }

  getUserSnapshot() {
    return this.store.selectSnapshot(AuthState.getUser);
  }
}
