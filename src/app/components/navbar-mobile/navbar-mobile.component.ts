import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.css']
})
export class NavbarMobileComponent implements OnInit {

  showSearch:boolean = false;
  sidebar:boolean = false;
  showUserMenu:boolean = false;
  searchBar:any = '';

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  openSideBar(){
    this.sidebar = true
  }

  ShowProfile(){
    if (this.showUserMenu) {
      this.showUserMenu = false
    }else{
      this.showUserMenu = true
    }
  }

  search(){
    this.showSearch = true
  }

  closeSearch(){
    this.showSearch = false
  }

  closeSideBar(){
    this.sidebar = false
  }

  searchFileOrFolder(){
    if (this.searchBar.length <= 0) {
      return;
    }
    this.router.navigateByUrl(`/u/search-results?q=${this.searchBar}`)
    
  }

}
