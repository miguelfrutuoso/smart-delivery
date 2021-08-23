import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-top-bar',
	templateUrl: './top-bar.component.html',
	styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

	constructor(private authService: AuthService, private router: Router) { }

	ngOnInit(): void {
	}

	logOut() {
		this.authService.logout().subscribe(
			() => this.router.navigate(['/login'])
		)
	}
}
