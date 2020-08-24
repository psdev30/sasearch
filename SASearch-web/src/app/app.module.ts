import { InterceptorService } from './service/interceptor.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FlaskService } from './service/flask.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgTwitterTimelineModule } from 'ng-twitter-timeline';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as Cloudinary from 'cloudinary-core';
import { NavbarComponent } from './component/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ResultsComponent } from './component/results/results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { environment } from 'src/environments/environment.prod';
import { AngularFireModule } from '@angular/fire';
import { SearchComponent } from './component/search/search.component';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from "@angular/common";
import { AboutComponent } from './component/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ResultsComponent,
    SearchComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    NgTwitterTimelineModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'dzoq2eys2' }),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'search', pathMatch: 'full' },
      { path: 'search', component: SearchComponent },
      { path: 'results/:query', component: ResultsComponent },
      { path: 'navbar', component: NavbarComponent },
      { path: 'about', component: AboutComponent },
      { path: '**', component: SearchComponent }
    ]),

    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    FlaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
