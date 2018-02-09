import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { ProfileComponent } from './profile/profile.component'
import { AuthComponent } from './auth/auth.component'

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
