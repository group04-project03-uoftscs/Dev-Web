import React from "react";
import './languagelist.css';

const LanguagesList = (props) => {
  let term = `devicon-${props.language}-plain colored`;
    return (
    <div className="language-checkbox">
        <label>
          <input 
            className="update-languages"
            type="checkbox"
            value={props.language}
            checked={props.checked}
            onChange={props.handleChecked}
          />
          <span><i class={term}></i></span>
        </label>
    </div>
    );
};

export default LanguagesList;
