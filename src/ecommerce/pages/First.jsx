import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
// import UserContext from "../components/UseContext";
function First() {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
  );
}

export default First;
