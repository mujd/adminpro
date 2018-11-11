import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

// temporal
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
/* import { TextMaskModule } from 'angular2-text-mask'; */

// Rutas
import { APP_ROUTES } from "./app.routes";

// Modulos
/* import { PagesModule } from "./pages/pages.module"; */
import { SharedModule } from "./shared/shared.module";

// Servicios
import { ServiceModule } from "./services/service.module";

// Componentes
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./login/register.component";
import { PagesComponent } from "./pages/pages.component";

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, PagesComponent],
  imports: [
    BrowserModule,
    APP_ROUTES,
    /* PagesModule, */
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule
    /* TextMaskModule */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
