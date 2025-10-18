import { Injectable, signal } from '@angular/core';

export interface UserProfile {
  name: string;
  subname: string;
}

@Injectable({ providedIn: 'root' })
export class MockUserService {
  private readonly _user = signal<UserProfile | null>(null);

  get user() {
    return this._user.asReadonly();
  }

  loadUser() {
    // Simulate async API call
    setTimeout(() => {
      this._user.set({
        name: 'Some User',
        subname: 'Engineer',
      });
    }, 5000);
  }
}
