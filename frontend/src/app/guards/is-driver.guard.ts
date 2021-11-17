import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsDriverGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

	canActivate() {
		return this.authService.getUserLogged().pipe(
			switchMap((user) => {
				if (user.is_driver)
					return of(true)
				else {
					this.router.navigate(['/home']);
					return of(false)
				}
			})
		)
	}
}
