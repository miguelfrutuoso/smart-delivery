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

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	) {
		if (!this.authService.isLoggedIn()) {
			this.router.navigate(['login']);
			//window.location.reload();
			console.log("nav to login")
		}	
		console.log("logged in - " + this.authService.isLoggedIn())
		return this.authService.isLoggedIn();
	}

}


