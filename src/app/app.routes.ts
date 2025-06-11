import { AboutUsComponent, HomeComponent, PageNotFoundComponent } from "./pages";
import { Routes } from "@angular/router";

type RoutePath = "root" | "home" | "aboutUs" | "pageNotFound";

export const routePaths: Record<RoutePath, string> = {
  root: "",
  home: "home",
  aboutUs: "about-us",
  pageNotFound: "page-not-found",
};

export const routes: Routes = [
  {
    path: routePaths.root,
    redirectTo: routePaths.home,
    pathMatch: "full",
  },
  {
    path: routePaths.home,
    component: HomeComponent,
  },
  {
    path: routePaths.aboutUs,
    component: AboutUsComponent,
  },
  {
    path: routePaths.pageNotFound,
    component: PageNotFoundComponent,
  },
    {
    path: '**',
    redirectTo: routePaths.pageNotFound,
  },
];
