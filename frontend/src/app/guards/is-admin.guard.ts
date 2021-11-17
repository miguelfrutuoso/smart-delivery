import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {

	constructor(private authService: AuthService, private router: Router) { }

	canActivate() {
		return this.authService.getUserLogged().pipe(
			switchMap((user) => {
				if (user.is_admin)
					return of(true)
				else {
					//this.router.navigate(['/home']);
					return of(false)
				}
			})
		)
	}
}
