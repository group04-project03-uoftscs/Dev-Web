import React from "react";
import { createPopper } from "@popperjs/core";

import { ReactComponent as Caret } from "../../assets/svg/caret.svg"
import { ReactComponent as Bookmark } from "../../assets/svg/icons8-bookmark.svg"
import { ReactComponent as News } from "../../assets/svg/icons8-news.svg"
import { Link } from "react-router-dom";

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <Link
        className="text-gray-600 block"
        to="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center">
          <div className="w-8 h-8 lg:h-10 lg:w-10 border-none bg-indigo-400 focus:outline-none hover:bg-yellow-400 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 64 64" width="96px" height="96px"><Caret /></svg>
          </div>
        </div>
      </Link>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-indigo-200 text-base z-50 float-left px-2 py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <Link
          to="/news"
          className={
            "text-md py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-bold text-black hover:bg-yellow-400 hover:text-indigo-600 hover:underline"
          }
        >
          News
        </Link>
        <Link
          to="/jobs"
          className={
            "text-md py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-black hover:bg-yellow-400 hover:text-indigo-600 hover:underline"
          }
        >
          Jobs
        </Link>
        <Link
          to="/podcast"
          className={
            "text-md py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-black hover:bg-yellow-400 hover:text-indigo-600 hover:underline"
          }
        >
          Podcasts
        </Link>
        <div className="h-0 my-2 border border-solid border-white" />
        <Link
          to="/settings"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent text-black hover:bg-yellow-400 hover:text-indigo-600 hover:underline"
          }
        >
          Account Settings
        </Link>
      </div>
    </>
  );
};

export default UserDropdown;
