import { ChangeDetectionStrategy, Component, inject } from '@angular/core'; // <-- IMPORT inject
import { Router } from '@angular/router'; // <-- IMPORT Router
import { AuthenticationService } from './services/authentication.service';
import { User } from '@angular/fire/auth'; // <-- IMPORT User type

// Other necessary imports for a standalone component...
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  // 1. MAKE THIS PUBLIC so the template can access it
  authService = inject(AuthenticationService);
  private router = inject(Router);

  // 2. APPLY THE CORRECT TYPE to fix the 'unknown' error
  user$ = this.authService.currentUser$ as any as import("rxjs").Observable<User | null>;

  // 3. REMOVE THE CONSTRUCTOR
  constructor() { }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}