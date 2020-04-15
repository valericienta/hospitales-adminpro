import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ModaluploadService } from '../components/modalupload/modalupload.service';

import { LoginGuardGuard } from './service.index';

import { SettingsService } from './settings/settings.service';
import { SharedService } from './shared/shared.service';
import { SubirArchivoService } from './subir-archivo/subir-archivo.service';
import { AdminGuard } from './guards/admin.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ModaluploadService,
    SubirArchivoService,
    LoginGuardGuard,
    AdminGuard,
    SettingsService,
    SharedService,
    SharedService]
})
export class ServiceModule { }
