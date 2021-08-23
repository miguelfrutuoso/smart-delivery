import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from '../services/auth/auth.service';


@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {

	constructor(private authService: AuthService, private router: Router) {

	}

	canActivate() {
		if (this.authService.isLoggedIn()) {
			this.router.navigate(['/home']);
		}
    
		return !this.authService.isLoggedIn();
	}

}

export class isAdmin implements CanActivate {

	constructor(private authService: AuthService, private router: Router) {}

	canActivate() {

		var userLogged: User;
		this.authService.getUserLogged().subscribe(user => userLogged = user)

		if (userLogged.is_admin) {
			this.router.navigate(['/home']);
		}
		
		return false
	}

}