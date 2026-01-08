import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PollutionService, Pollution } from "../../services/pollution.service";

@Component({
  selector: "app-pollution-form",
  templateUrl: "./pollution-form.component.html",
  styleUrls: ["./pollution-form.component.css"],
})
export class PollutionFormComponent implements OnInit {
  pollution: Pollution = {
    city: "",
    level: 0,
    date: new Date().toISOString().split("T")[0],
    description: "",
  };
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pollutionService: PollutionService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const id = params["id"];
      if (id) {
        this.isEditMode = true;
        this.pollutionService.getById(+id).subscribe((data) => {
          this.pollution = data;
        });
      }
    });
  }

  onSubmit() {
    if (this.isEditMode && this.pollution.id) {
      const id = this.pollution.id as number;
      const { id: _, ...pollutionWithoutId } = this.pollution;
      this.pollutionService
        .update(id, pollutionWithoutId as Pollution)
        .subscribe(() => {
          alert("Pollution modifiée avec succès ✅");
          this.router.navigate(["/pollutions"]);
        });
    } else {
      this.pollutionService.create(this.pollution).subscribe(() => {
        alert("Pollution ajoutée avec succès ✅");
        this.router.navigate(["/pollutions"]);
      });
    }
  }

  cancel() {
    this.router.navigate(["/pollutions"]);
  }
}
