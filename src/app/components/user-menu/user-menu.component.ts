import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  user:any

  constructor(private userService:UserService,
              private authService:AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.userInfo
  }

  logOut(){
    this.userService.logOut();
  }

}
