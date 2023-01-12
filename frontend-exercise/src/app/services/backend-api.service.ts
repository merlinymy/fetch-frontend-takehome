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

  // postUserCreationForm(): 
}
