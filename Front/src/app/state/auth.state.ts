import { Injectable } from "@angular/core";
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { tap } from "rxjs/operators";
import { UtilisateurService } from "../services/utilisateur.service";

export interface AuthStateModel {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null;
  isLoading: boolean;
  error: string | null;
}

export class Login {
  static readonly type = "[Auth] Login";
  constructor(public payload: { email: string; password: string }) {}
}

export class LoginSuccess {
  static readonly type = "[Auth] Login Success";
  constructor(public payload: { accessToken: string; user: any }) {}
}

export class LoginFailure {
  static readonly type = "[Auth] Login Failure";
  constructor(public payload: string) {}
}

export class Logout {
  static readonly type = "[Auth] Logout";
}

export class LoadUserFromStorage {
  static readonly type = "[Auth] Load User From Storage";
}

@State<AuthStateModel>({
  name: "auth",
  defaults: {
    accessToken: null,
    refreshToken: null,
    user: null,
    isLoading: false,
    error: null,
  },
})
@Injectable()
export class AuthState {
  constructor(private utilisateurService: UtilisateurService) {}

  @Selector()
  static getAccessToken(state: AuthStateModel): string | null {
    return state.accessToken;
  }

  @Selector()
  static getUser(state: AuthStateModel): any | null {
    return state.user;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.accessToken && !!state.user;
  }

  @Selector()
  static isLoading(state: AuthStateModel): boolean {
    return state.isLoading;
  }

  @Selector()
  static getError(state: AuthStateModel): string | null {
    return state.error;
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    ctx.patchState({
      isLoading: true,
      error: null,
    });

    return this.utilisateurService.login(action.payload).pipe(
      tap(
        (response: any) => {
          ctx.dispatch(new LoginSuccess(response));
        },
        (error) => {
          ctx.dispatch(
            new LoginFailure(error.error?.error || "Erreur de connexion")
          );
        }
      )
    );
  }

  @Action(LoginSuccess)
  loginSuccess(ctx: StateContext<AuthStateModel>, action: LoginSuccess) {
    ctx.patchState({
      accessToken: action.payload.accessToken,
      user: action.payload.user,
      isLoading: false,
      error: null,
    });
  }

  @Action(LoginFailure)
  loginFailure(ctx: StateContext<AuthStateModel>, action: LoginFailure) {
    ctx.patchState({
      accessToken: null,
      user: null,
      isLoading: false,
      error: action.payload,
    });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      accessToken: null,
      refreshToken: null,
      user: null,
      isLoading: false,
      error: null,
    });
  }

  @Action(LoadUserFromStorage)
  loadUserFromStorage(ctx: StateContext<AuthStateModel>) {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        ctx.patchState(authData);
      } catch (error) {
        console.error(
          "Erreur lors du chargement des données d'authentification:",
          error
        );
      }
    }
  }
}
