import { Component } from "@angular/core";
import { Router } from "@angular/router";
import {
  UtilisateurService,
  Utilisateur,
} from "../../services/utilisateur.service";

@Component({
  selector: "app-utilisateur-signin",
  templateUrl: "./utilisateur-signin.component.html",
  styleUrls: ["./utilisateur-signin.component.css"],
})
export class UtilisateurSigninComponent {
  user: Utilisateur = {
    nom: "",
    prenom: "",
    email: "",
    password: "",
    pseudo: "",
  };

  constructor(
    private userService: UtilisateurService,
    private router: Router
  ) {}

  onSubmit() {
    this.userService.create(this.user).subscribe({
      next: () => {
        alert("✅ Compte créé avec succès !");
        this.router.navigate(["/utilisateur/login"]);
      },
      error: (err) => alert("❌ Erreur : " + err.error?.error || err.message),
    });
  }
}
