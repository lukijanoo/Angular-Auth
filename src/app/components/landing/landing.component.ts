import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router'; // <-- Import
import { MatButtonModule } from '@angular/material/button'; // <-- Import

@Component({
  selector: 'app-landing',
  standalone: true, // <-- ADD
  imports: [RouterLink, MatButtonModule], // <-- ADD
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}