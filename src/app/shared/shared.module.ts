import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { ModaluploadComponent } from '../components/modalupload/modalupload.component';

@NgModule({
    imports : [ RouterModule, CommonModule, PipesModule],
    declarations: [
        BreadcrumbsComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent,
        ModaluploadComponent
    ],
    exports:[
        BreadcrumbsComponent,
        HeaderComponent,
        NopagefoundComponent,
        SidebarComponent   ,
        ModaluploadComponent
    ]
})

export class SharedModule { }