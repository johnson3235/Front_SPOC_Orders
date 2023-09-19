import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MasterService } from '../service/master.service';
import { error } from 'jquery';
import { trigger } from '@angular/animations';

import { ApiService } from '../token_services/Api_Service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
  animations: [
    trigger('flyInOut', [
      // Animation configuration here
    ])
  ]
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup<any>;

  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: MasterService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  initializeLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      userName: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  onSubmit(): void {

    
    const userName = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;
    const requestBody = {
      userName: userName,
      password: password,
    };
    console.log(requestBody); 
    if (this.loginForm.valid) {
      
      this.apiService.requestApi('User/o2login', 'POST', requestBody,).subscribe(
        (response: any) => {
          // Check if the username and password are correct
          console.log(response.access_token);
          if ( response.access_token != null ) {
            localStorage.setItem('token', response.access_token);
            this.toastr.success('User logged in successfully');
            this.router.navigate(['/dashboard']); // Redirect to the main page
          } else {
            this.toastr.error('Invalid username or password');
          }
        },
        (error: any) => {
          console.log(error); // Handle the error if necessary
        }
      );
    } else {
      this.toastr.warning('Please enter a valid username & password');
    }
  }
}
