import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlaskService } from './service/flask.service';
import { HttpClientModule } from '@angular/common/http';
import { NgTwitterTimelineModule } from 'ng-twitter-timeline';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as Cloudinary from 'cloudinary-core';
import { NavbarComponent } from './component/navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { ResultsComponent } from './component/results/results.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgTwitterTimelineModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'dzoq2eys2' }),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
    }),

  ],
  providers: [FlaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
