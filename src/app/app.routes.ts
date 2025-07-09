import { AboutUsComponent, HomeComponent, PageNotFoundComponent } from "./pages";
import { Routes } from "@angular/router";

export type RoutePath = "root" | "home" | "aboutUs" | "pageNotFound";

export const routePaths: Record<RoutePath, string> = {
  root: "",
  home: "home",
  aboutUs: "about-us",
  pageNotFound: "page-not-found",
};

export const routeTitles: Record<RoutePath, string> = {
  root: "App | Home",
  home: "App | Home",
  aboutUs: "App | About Us",
  pageNotFound: "App | Page Not Found",
};

export const routes: Routes = [
  {
    path: routePaths.root,
    redirectTo: routePaths.home,
    pathMatch: "full",
    title: routeTitles.home,
  },
  {
    path: routePaths.home,
    component: HomeComponent,
    title: routeTitles.home,
  },
  {
    path: routePaths.aboutUs,
    component: AboutUsComponent,
    title: routeTitles.aboutUs,
  },
  {
    path: routePaths.pageNotFound,
    component: PageNotFoundComponent,
    title: routeTitles.pageNotFound,
  },
  {
    path: '**',
    redirectTo: routePaths.pageNotFound,
    title: routeTitles.pageNotFound,
  },
];
