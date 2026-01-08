import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  pseudo: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: Utilisateur;
}

@Injectable({
  providedIn: "root",
})
export class UtilisateurService {
  private apiUrl = environment.apiUrl + "/users";

  constructor(private http: HttpClient) {}

  create(user: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(this.apiUrl, user);
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl.replace('/users', '/auth/login')}`, credentials);
  }

  getAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.apiUrl);
  }
}
