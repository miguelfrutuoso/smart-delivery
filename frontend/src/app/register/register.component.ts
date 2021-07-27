import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register/register.service'
import { User } from '../models/user'

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	public user: User = new User;

	constructor(private registerService: RegisterService) { }

	ngOnInit(): void {
	}

	singin() {
		console.log(this.user)
		this.registerService.registUser(this.user).subscribe()
	}
}
