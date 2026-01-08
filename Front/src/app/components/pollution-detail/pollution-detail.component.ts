import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PollutionService, Pollution } from '../../services/pollution.service';

@Component({
  selector: 'app-pollution-detail',
  templateUrl: './pollution-detail.component.html',
  styleUrls: ['./pollution-detail.component.css'],
})
export class PollutionDetailComponent implements OnInit {
  pollution?: Pollution;

  constructor(
    private route: ActivatedRoute,
    private pollutionService: PollutionService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pollutionService
      .getById(id)
      .subscribe((data) => (this.pollution = data));
  }
}
