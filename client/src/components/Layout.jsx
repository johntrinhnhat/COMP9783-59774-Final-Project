// Developer:
// Purpose:

import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
}

export default Layout;
