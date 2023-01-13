import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { UserCreationComponent } from './components/user-creation/user-creation.component';

@NgModule({
  declarations: [
    AppComponent,
    UserCreationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
