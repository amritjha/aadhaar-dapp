import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { AccessComponent } from './access/access.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RegisterComponent } from './register/register.component';
import { UpdateComponent } from './update/update.component';
import { AdminComponent } from './admin/admin.component';
import { ContractsService } from './services/contracts.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'access-records', component: AccessComponent },
  { path: 'manage-permissions', component: PermissionsComponent },
  { path: 'register-applicant', component: RegisterComponent },
  { path: 'update-records', component: UpdateComponent },
  { path: 'regulate-nodes', component: AdminComponent }
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    PermissionsComponent,
    AccessComponent,
    RegisterComponent,
    UpdateComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ContractsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
