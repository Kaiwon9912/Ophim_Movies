

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";


export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className=" max-w-[1680px] m-auto">
      <Header/>
      <div className="mt-16"></div>
      <Outlet />
      <Footer/>
      </div>

    </div>
  );
}
