import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register/register.service'
import { User } from '../models/user'
import { Router } from '@angular/router'

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	public user: User = new User;

	error: string;

	constructor(private registerService: RegisterService,
		private router: Router) { }

	ngOnInit(): void {
	}

	singin() {
		this.registerService.registUser(this.user).subscribe(
			() => this.router.navigate(['/login']) // TODO Error handling
		)
	}
}
