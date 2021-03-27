import React from "react";

function Footer() {

  return (
    <footer className="relative z-40 bottom-0 max-h-full w-full">
      <div className="w-full bg-indigo-500 shadow-md h-16 flex justify-between ">
          <div className="w-full h-full justify-center text-white">
            <div className="flex items-center h-full justify-center">
                <strong>Copyright © 2021 - <u><a title="Dev-Web GitHub Repo" href="https://github.com/group04-project03-uoftscs/Dev-Web">Dev Web Team</a></u></strong>
            </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
