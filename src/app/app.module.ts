import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdimnComponent } from './adimn/adimn.component';
import { ManagerComponent } from './manager/manager.component';
import { EditorComponent } from './editor/editor.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LabelModule } from '@progress/kendo-angular-label';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './service/api.service';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { IconsModule } from '@progress/kendo-angular-icons';
import { IndicatorsModule } from '@progress/kendo-angular-indicators';
import { NavigationModule } from '@progress/kendo-angular-navigation';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ProgressBarModule } from '@progress/kendo-angular-progressbar';
import { CommonModule } from '@angular/common';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { NotificationModule, NotificationService } from '@progress/kendo-angular-notification';
import { DataStateChangeEvent, GridModule } from '@progress/kendo-angular-grid';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdimnComponent,
    ManagerComponent,
    EditorComponent,
    NavbarComponent,
    UpdateComponent,
    DeleteComponent,
  ],
  imports: [

    HttpClientModule,
    GridModule,

    BrowserModule,
    AppRoutingModule,
    LabelModule,
    BrowserAnimationsModule,
    InputsModule,
    LayoutModule,
    ButtonsModule,

    /*Login */
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    InputsModule,
    LayoutModule,
    LabelModule,
    ButtonsModule,
    DialogsModule,
    IconsModule,
    IndicatorsModule,
    NavigationModule,
    PopupModule,
    ProgressBarModule,

    /*Admin */

    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputsModule,
    DateInputsModule,
    LabelModule,
    ButtonsModule,
    DropDownsModule,
    NotificationModule 


  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiService,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
