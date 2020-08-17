import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlaskService } from './service/flask.service';
import { HttpClientModule } from '@angular/common/http';
import { NgTwitterTimelineModule } from 'ng-twitter-timeline';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import { NavbarComponent } from './component/navbar/navbar.component';
import { TwitterComponent } from './component/twitter/twitter.component';
import { ResultsComponent } from './component/results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TwitterComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgTwitterTimelineModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'dzoq2eys2' }),

  ],
  providers: [FlaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
