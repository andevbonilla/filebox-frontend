import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formGroup:any;
  firstTime:boolean = true;
  showHtml:boolean = true;

  constructor( private formBuilder:FormBuilder,
               private userService:UserService,
               private router:Router ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      email: ['',  [Validators.required, Validators.email]],
      password: ['',  [Validators.required, Validators.minLength(8)]]
    });
  }

  register(){

    this.firstTime = false;
    
    if (this.formGroup.invalid) {
      return;
    }

    this.formGroup.value.username.trim()
    this.formGroup.value.email.trim()

    this.showHtml = false;
    this.userService.createUser(this.formGroup.value).subscribe(resp=>{

      this.showHtml = true;
      this.router.navigateByUrl('/dashboard');

    },(err)=>{

      if (err.error.msj.keyValue?.username === this.formGroup.value.username) {

        this.showHtml = true;
        Swal.fire({
          icon: 'error',
          title: 'The username you wrote already exists, please put a new one',
        })
        return;

      }

      if (err.error.msj.keyValue?.email === this.formGroup.value.email) {

        this.showHtml = true;
        Swal.fire({
          icon: 'error',
          title: 'The email you wrote already exists, please put a new one',
        })
        return;

      }

      this.showHtml = true;
      Swal.fire({
        icon: 'error',
        title: 'there was an error',
      })

    })

  
  
  }

}
