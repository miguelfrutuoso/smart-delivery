import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { IsAdminGuard } from '../guards/is-admin.guard';
import { User } from '../models/user';


@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

	constructor(private authService: AuthService, private router: Router, private isAdminGuard: IsAdminGuard) {
		
	}

	loggedUser: User;

	ngOnInit(): void {
		this.authService.getUserLogged().subscribe(
			user => this.loggedUser = user
		)
	}

	logOut() {
		this.router.navigate(['/login'])
		this.authService.logout().subscribe(
			() => this.router.navigate(['/login'])
		)
	}
}
