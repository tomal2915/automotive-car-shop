import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { context } from "../../context/AuthContext";
import { Twirl as Hamburger } from 'hamburger-react';

const Navbar = () => {

  const [isOpen, setOpen] = useState(false);

  // State to manage user menu visibility
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);

  const { user, logOut } = useContext(context);

  const handleSignOut = () => {
    logOut()
      .then(() => {
        toast('Successfully Logged Out');
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  const closeMobileMenu = () => {
    setOpen(false);
  };

  // Function to toggle user details visibility
  const toggleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen); // Toggle the user menu visibility
  };

  const navLink = (
    <>
      <li><NavLink to="/" onClick={closeMobileMenu}>Home</NavLink></li>
      <li><NavLink to="/addProduct" onClick={closeMobileMenu}>Add Product</NavLink></li>
      <li><NavLink to="/myCart" onClick={closeMobileMenu}>My Cart</NavLink></li>
    </>
  );


  return (
    <div className="navbar max-w-7xl mx-auto ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <Hamburger toggled={isOpen} toggle={setOpen} color="#4FD1C5" />
          </label>
          {/* Conditionally render the mobile menu based on isOpen */}
          {isOpen && (
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navLink}
            </ul>
          )}
        </div>
        <div className="gap-4 items-center hidden md:flex">
          {/* <a className="normal-case text-xl">Automotive</a> */}
          <img src="https://i.ibb.co/h7xRknW/logo.png" alt="" className="w-[100px] h-[40px]" />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLink}
        </ul>
      </div>


      {user ? (
        <div className="navbar-end">
          {/* User profile picture that toggles the user menu */}
          <div className="avatar" onClick={toggleUserMenu}>
            <div className="w-12 h-12 rounded-full">
              <img src={user.photoURL} alt="User Avatar" />
            </div>
          </div>
          {/* User menu that appears when the user clicks on the profile picture */}
          {isUserMenuOpen && (
            <div className="flex flex-row gap-2 items-center rounded-lg">
              <p className="font-bold ">{user.displayName}</p>
              <button onClick={handleSignOut} className="btn bg-red-200 ml-4">Sign Out</button>
            </div>
          )}
        </div>
      ) : (
        <div className="navbar-end">
          <Link to='/signIn'><button className="btn bg-slate-300">Sign In</button></Link>
        </div>
      )}
    </div>

  )
}

export default Navbar;
