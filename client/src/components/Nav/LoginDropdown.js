import React, {useState, useRef} from "react";
import { createPopper } from "@popperjs/core";
import { Link } from "react-router-dom";
import OutsideClickHandler from 'react-outside-click-handler';

import { ReactComponent as Caret } from "../../assets/svg/caret.svg"
import { ReactComponent as Bookmark } from "../../assets/svg/icons8-bookmark.svg"
import { ReactComponent as News } from "../../assets/svg/icons8-news.svg"
import Login from "../../assets/svg/icons8-user-shield-96.png"

import { useStoreContext } from "../../utils/GlobalState";
import { LOGOUT } from "../../utils/actions";

const UserDropdown = () => {

  
  const [state,dispatch] = useStoreContext();
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = useRef();
  const popoverDropdownRef = useRef();
  createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
    placement: "bottom-start",
  });

  const handleDropdownClick = (e) =>{
    setDropdownPopoverShow(!dropdownPopoverShow)
  }
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };


  return (
    <>
      <OutsideClickHandler onOutsideClick={closeDropdownPopover}>
        <Link
          className="text-gray-600 block"
          ref={btnDropdownRef}
          onClick={handleDropdownClick}
        >
          <div className="items-center">
            <div className="w-8 h-8 lg:h-10 lg:w-10 border-none bg-indigo-100 focus:outline-none hover:bg-yellow-400 rounded-full flex items-center justify-center">
              <img viewBox="0 0 64 64" width="96px" height="96px" src={ Login }></img>
            </div>
          </div>
        </Link>
      </OutsideClickHandler>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-indigo-100 text-base z-50 float-left px-2 py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        {state.logged ? 
          <div>
            <Link
            to="/settings"
            onClick={closeDropdownPopover}
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-black hover:bg-yellow-400 hover:text-indigo-600 hover:underline"
            }
            >
            Account Settings
            </Link>
            <div className="h-0 my-2 border border-solid border-white" />

            <Link
            to="/logout"
            onClick={closeDropdownPopover}

           {/* <Link onClick={() => {
              dispatch({
                type: LOGOUT
              })
              if(localStorage.getItem('user')) {
                localStorage.removeItem('user')
              }
              fetch('/logout');
            }} */}

            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-black hover:bg-yellow-400 hover:text-indigo-600 hover:underline"
            }
            >
            Logout
            </Link>
          </div>
          :
        <div>
        <Link
          to="/Login"
          onClick={closeDropdownPopover}
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-black hover:bg-yellow-400 hover:text-indigo-600 hover:underline"
          }
        >
          Login
        </Link>
        <div className="h-0 my-2 border border-solid border-white" />
        <Link
          to="/signup"
          onClick={closeDropdownPopover}
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-black hover:bg-yellow-400 hover:text-indigo-600 hover:underline"
          }
        >
          Sign Up
        </Link>
        </div>
        }
        
        {/* <Link
          to="/newuser"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-black hover:bg-yellow-400 hover:text-indigo-600 hover:underline"
          }
        >
          New User
        </Link> */}
      </div>
    </>
  );
};

export default UserDropdown;
