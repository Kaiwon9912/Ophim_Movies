import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "@/layouts/MainLayout";
import WatchPage from "@/pages/WatchPage";
import CategoryPage from "@/pages/CategoryPage";
import FilterPage from "@/pages/FilterPage";
import SearchPage from "@/pages/SearchPage";
import CountryPage from "@/pages/CountryPage";

const Home = lazy(() => import("@/pages/Home"));
const MovieDetail = lazy(() => import("@/pages/MovieDetail"));


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "phim/:slug", element: <MovieDetail /> },
      { path:"/xem/:slug/:episodeSlug", element:<WatchPage />} ,
      {path:"/the-loai/:slug/:page", element:<CategoryPage/>},
      {path:"/quoc-gia/:slug/:page", element:<CountryPage/>},
     { path: "/danh-sach/:slug/:page", element: <FilterPage /> },
    { path: "/tim-kiem", element: <SearchPage /> }
    ],
  },
]);
