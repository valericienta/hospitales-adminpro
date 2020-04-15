import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { AdminProRoutes } from './app.routes';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PageModule } from './pages/pages.module';
import { ServiceModule } from './services/service.module';
import { PagesComponent } from './pages/pages.component';
import { ModaluploadComponent } from './components/modalupload/modalupload.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AdminProRoutes,
    FormsModule, 
    ServiceModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
