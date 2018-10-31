import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { NopagefoundComponent } from "./shared/nopagefound/nopagefound.component";
import { RegisterComponent } from "./login/register.component";
import { NotAuthorizedComponent } from "./shared/not-authorized/not-authorized.component";

const appRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "not-authorized", component: NotAuthorizedComponent },
  { path: "**", component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
