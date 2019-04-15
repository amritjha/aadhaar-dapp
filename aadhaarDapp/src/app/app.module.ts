import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'access-records', component: AccessComponent },
  { path: 'manage-permissions', component: PermissionsComponent },
  { path: 'register-applicant', component: RegisterComponent },
  { path: 'update-records', component: UpdateComponent,
    children: [
      { path: '', redirectTo: 'personal',  pathMatch: 'full' }, 
      { path: 'personal', component: PersonalComponent }, 
      { path: 'contact', component: ContactComponent }, 
      { path: 'biometrics', component: BiometricsComponent }
    ]
  },
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
    AdminComponent,
    PersonalComponent,
    ContactComponent,
    BiometricsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
