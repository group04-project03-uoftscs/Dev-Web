import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useDarkMode from '../../pages/useDarkMode'

function Footer() {

  return (
    useDarkMode(),
    <footer className="relative z-40 bottom-0 max-h-full w-full">
      <div className="w-full bg-indigo-500 shadow-md h-16 flex justify-between dark:bg-black transition duration-500">
          <div className="w-full h-full justify-center text-white">
            <div className="flex items-center h-full justify-center">
                <strong>Copyright © 2021 - Dev Web Team &nbsp;
                  <span className="text-xl hover:text-gray-600">
                  <a title="Dev-Web GitHub Repo" href="https://github.com/group04-project03-uoftscs/Dev-Web" target="_blank" rel="noopener noreferrer"
                  >
                  <FontAwesomeIcon icon={['fab','github']} />
                  </a></span>
                </strong>
            </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
