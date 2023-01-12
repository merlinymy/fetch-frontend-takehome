import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FormOptions } from '../model/form-options';

@Injectable({
  providedIn: 'root'
})
export class BackendApiService {
  private baseUrl: string;
  constructor(private httpClient: HttpClient) {
    this.baseUrl = `${environment.baseUrl}`;
   }

  getFormOptions(): Observable<FormOptions> {
    return this.httpClient.get<FormOptions>(this.baseUrl);
  }

  postUserForm(value: any): void {
   this.httpClient.post('https://frontend-take-home.fetchrewards.com/form', value).subscribe(
      (data) => {
        console.log('User created successfully!');
        // Provide feedback upon successful form submission
        alert('User created successfully!');
      },
      (error) => {
        console.log('Error:', error);
      }
    )
  }
}
