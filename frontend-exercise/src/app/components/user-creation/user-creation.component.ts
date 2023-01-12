import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private backendApiService: BackendApiService) {}

  ngOnInit() {
    // Create the form
    this.userCreationForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required]],
      password: ["", Validators.required],
      occupation: ["", Validators.required],
      state: ["", Validators.required]
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
      this.http.post('https://frontend-take-home.fetchrewards.com/form', this.userCreationForm.value).subscribe(
        (data) => {
          console.log('User created successfully!');
          // Provide feedback upon successful form submission
          alert('User created successfully!');
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    }
  }
}