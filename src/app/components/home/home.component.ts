import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonModule } from '@angular/common'; // <-- Import

@Component({
  selector: 'app-home',
  standalone: true, // <-- ADD
  imports: [CommonModule], // <-- ADD
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private authService = inject(AuthenticationService); // <-- Use inject()
  user$ = this.authService.currentUser$;

  ngOnInit(): void {
  }
}