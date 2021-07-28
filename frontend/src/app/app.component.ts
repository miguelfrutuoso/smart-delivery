import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login/login.service'
import { AppRoutingModule } from './app-routing.module'
import { ActivatedRoute, Router, NavigationEnd , ParamMap } from '@angular/router'
import { filter } from 'rxjs/operators';
import { Location } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  

  ngOnInit() {
    
  }

   
  path: string;
  route: string;

  constructor(private router: Router, private location: Location,){
    
    this.path = location.path()

    router.events.subscribe(val => {
      if (location.path() != "") {
        this.route = location.path();
      } else {
        this.route = "Home";
      }
    });
    
    console.log(this.route)
    
  }

  title = 'frontend';
}
