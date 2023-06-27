import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup:any;
  firstTime:boolean = true;
  showHtml:boolean = true;

  constructor(private authService:AuthService,
              private formBuilder:FormBuilder,
              private router:Router) { }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

  }

  login(){

    this.firstTime = false;

    if (this.formGroup.invalid) {
      return;
    }

    this.formGroup.value.email.trim()
    
    this.showHtml = false;
    this.authService.loginService(this.formGroup.value).subscribe(resp=>{

      this.showHtml = true;
      this.router.navigateByUrl('/dashboard')

    }, (err)=>{

      this.showHtml = true;
      Swal.fire({
        icon: 'error',
        title: 'there was an error',
      })

    })

   
  }

}
