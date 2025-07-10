import { Injectable, inject } from '@angular/core'; // <-- 1. Import 'inject'
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { from, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private auth: Auth = inject(Auth); // <-- 2. Inject the Auth service here

  // 3. This line now works correctly because `this.auth` is initialized before it's used.
  currentUser$ = authState(this.auth);

  // 4. The constructor is now empty and can be removed if you want, but it's fine to leave it.
  constructor() { }

  signUp(name: string, email: string, password: string): Observable<void> { // <-- Better typing
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap(({ user }) => from(updateProfile(user, { displayName: name }))) // <-- Wrap updateProfile in from()
    );
  }

  login(email: string, password: string): Observable<any> { // UserCredential return type is complex
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(): Observable<void> { // <-- Better typing
    return from(this.auth.signOut());
  }
}