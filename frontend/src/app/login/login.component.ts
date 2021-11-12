import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service'
import { AuthService } from '../services/auth/auth.service'
import { User } from '../models/user'
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {

	public user: User = new User;

	constructor(private loginService: LoginService, private authService: AuthService, private router: Router) { }

	ngOnInit() {
		
	}
	
	login() {
		this.authService.login(this.user).subscribe(
			() => this.router.navigate(['/home'])
		)
	}

}
