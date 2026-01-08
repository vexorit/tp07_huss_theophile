import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngxs/store";
import { Subscription, timer } from "rxjs";
import { Login, LoadUserFromStorage } from "../../state/auth.state";
import { AuthState } from "../../state/auth.state";

@Component({
  selector: "app-utilisateur-login",
  templateUrl: "./utilisateur-login.component.html",
  styleUrls: ["./utilisateur-login.component.css"],
})
export class UtilisateurLoginComponent implements OnInit, OnDestroy {
  email = "";
  password = "";
  private redirectSubscription?: Subscription;

  constructor(
    private store: Store,
    private router: Router
  ) {}

  ngOnInit() {
    // Charger l'utilisateur depuis le localStorage si disponible
    this.store.dispatch(new LoadUserFromStorage());

    // Vérifier si déjà authentifié et rediriger si nécessaire
    if (this.getIsAuthenticated()) {
      this.router.navigate(["/pollutions"]);
    }
  }

  ngOnDestroy() {
    if (this.redirectSubscription) {
      this.redirectSubscription.unsubscribe();
    }
  }

  get isLoading(): boolean {
    return this.store.selectSnapshot(AuthState.isLoading);
  }

  get error(): string | null {
    return this.store.selectSnapshot(AuthState.getError);
  }

  getIsAuthenticated(): boolean {
    return this.store.selectSnapshot(AuthState.isAuthenticated);
  }

  onLogin() {
    if (!this.email || !this.password) {
      alert("Veuillez saisir votre email et mot de passe");
      return;
    }

    this.store.dispatch(new Login({ email: this.email, password: this.password }));

    // Vérifier l'état d'authentification après un court délai pour permettre à l'action de se compléter
    this.redirectSubscription = timer(100).subscribe(() => {
      if (this.getIsAuthenticated()) {
        this.router.navigate(["/pollutions"]);
      }
    });
  }
}
