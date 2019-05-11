import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NgFlashMessagesModule } from 'ng-flash-messages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { AccessComponent } from './access/access.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RegisterComponent } from './register/register.component';
import { UpdateComponent } from './update/update.component';
import { AdminComponent } from './admin/admin.component';
import { PersonalComponent } from './update/personal/personal.component';
import { ContactComponent } from './update/contact/contact.component';
import { BiometricsComponent } from './update/biometrics/biometrics.component';
import { ErrorComponent } from './error/error.component';

import { ContractsService } from './services/contracts.service';
import { PrerequisiteGuardService } from './services/prerequisite.guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [PrerequisiteGuardService] },
  { path: 'access-records', component: AccessComponent, canActivate: [PrerequisiteGuardService] },
  { path: 'manage-permissions', component: PermissionsComponent, canActivate: [PrerequisiteGuardService] },
  { path: 'register-applicant', component: RegisterComponent, canActivate: [PrerequisiteGuardService]  },
  { path: 'update-records', component: UpdateComponent,
    children: [
      { path: '', redirectTo: 'personal',  pathMatch: 'full', canActivate: [PrerequisiteGuardService] }, 
      { path: 'personal', component: PersonalComponent, canActivate: [PrerequisiteGuardService] }, 
      { path: 'contact', component: ContactComponent, canActivate: [PrerequisiteGuardService] }, 
      { path: 'biometrics', component: BiometricsComponent, canActivate: [PrerequisiteGuardService] }
    ]
  },
  { path: 'regulate-nodes', component: AdminComponent, canActivate: [PrerequisiteGuardService] },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent }
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
    AdminComponent,
    PersonalComponent,
    ContactComponent,
    BiometricsComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    NgFlashMessagesModule.forRoot()
  ],
  providers: [ ContractsService, PrerequisiteGuardService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
