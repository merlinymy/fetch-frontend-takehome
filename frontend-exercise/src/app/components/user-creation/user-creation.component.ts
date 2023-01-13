import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { FormOptions } from 'src/app/model/form-options';
import { BackendApiService } from 'src/app/services/backend-api.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {

  userCreationForm!: FormGroup;
  occupations!: string[];
  states!: any[];
  formNotValidMsg!: string;
  invalidSubmit: boolean = false;

  emailControl!: FormControl;
  nameControl!: FormControl;
  passwordControl!: FormControl;
  occupationControl!: FormControl;
  stateControl!: FormControl;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private backendApiService: BackendApiService) {}

  ngOnInit() {
    // input validation and form validation
    this.emailControl = new FormControl('', [Validators.email, Validators.required]);
    this.nameControl = new FormControl('', [Validators.required]);
    this.passwordControl = new FormControl('', [Validators.required]);
    this.occupationControl = new FormControl('', [Validators.required]);
    this.stateControl = new FormControl('', [Validators.required]); 
    
    this.userCreationForm = this.formBuilder.group({
      name: this.nameControl,
      email: this.emailControl,
      password: this.passwordControl,
      occupation: this.occupationControl,
      state: this.stateControl
    });

    this.getOptions();
  }

  getOptions() {
    this.backendApiService.getFormOptions().subscribe(
      (data: FormOptions) => {
        this.occupations = data.occupations;
        this.states = data.states;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    ) 
  }

  onSubmit() {
    // Check if the form is valid before submitting

    if (this.userCreationForm.valid) {
      // Send a POST request with the form data to the endpoint
      this.backendApiService.postUserForm(this.userCreationForm.value);
      this.invalidSubmit=false;
      this.userCreationForm.reset();
    } else {
      this.invalidSubmit = true;
      this.formNotValidMsg = "There was a problem with your submission. Please review the fields above."
    }
  }
}