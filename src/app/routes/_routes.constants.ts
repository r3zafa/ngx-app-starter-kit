export type RoutePath =
    "root"
    | "home"
    | "aboutUs"
    | "pageNotFound"
    | 'photoAlbum'
    | "posts"
    | "countries"
    | "profile"
    | "settings";

export const routePaths: Record<RoutePath, string> = {
    pageNotFound: "page-not-found",
    root: "",
    home: "home",
    aboutUs: "about-us",
    photoAlbum: "photo-album",
    posts: 'posts',
    countries: 'countries',
    profile: "profile",
    settings: 'settings'
};

export const routeTitles: Record<RoutePath, string> = {
    pageNotFound: "App | Page Not Found",
    root: "App | Home",
    home: "App | Home",
    aboutUs: "App | About Us",
    photoAlbum: "App | Photo Album",
    posts: 'App | Posts',
    countries: 'App | Countries',
    profile: "App | Profile",
    settings: "App | Settings",
};
