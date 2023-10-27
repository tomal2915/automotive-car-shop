import { Outlet } from "react-router-dom"
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"

const Root = () => {
  return (
    <div className="px-12">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default Root