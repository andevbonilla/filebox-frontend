import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ValidateJwtGuard } from './guards/validate-jwt.guard';
import { AllFilesComponent } from './pages/all-files/all-files.component';
import { AllFoldersComponent } from './pages/all-folders/all-folders.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FileViewComponent } from './pages/file-view/file-view.component';
import { FolderViewComponent } from './pages/folder-view/folder-view.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';

const routes: Routes = [
  {path:'u', component: HomeComponent, canActivate: [ValidateJwtGuard], children:[
    {path:'dashboard', component: DashboardComponent},
    {path:'folder/:id', component: FolderViewComponent},
    {path:'file/:id', component: FileViewComponent},
    {path:'search-results', component: SearchResultsComponent},
    {path:'all-files', component: AllFilesComponent},
    {path:'all-folders', component: AllFoldersComponent}
  ]},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path: '', redirectTo: 'u/dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'u/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
