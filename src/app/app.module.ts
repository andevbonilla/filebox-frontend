import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FolderViewComponent } from './pages/folder-view/folder-view.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { OptionsWindowComponent } from './components/options-window/options-window.component';
import { FileViewComponent } from './pages/file-view/file-view.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { FileInfoComponent } from './components/file-info/file-info.component';
import { AllFilesComponent } from './pages/all-files/all-files.component';
import { AllFoldersComponent } from './pages/all-folders/all-folders.component';
import { NavbarMobileComponent } from './components/navbar-mobile/navbar-mobile.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MoveToComponent } from './components/move-to/move-to.component'


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    FolderViewComponent,
    UserMenuComponent,
    OptionsWindowComponent,
    FileViewComponent,
    SearchResultsComponent,
    FileInfoComponent,
    AllFilesComponent,
    AllFoldersComponent,
    NavbarMobileComponent,
    HomeComponent,
    MoveToComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
