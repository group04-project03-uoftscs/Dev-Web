import React from "react";
import './languagelist.css'

const LanguagesList = (props) => {
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
          <span>{props.language}</span>
          
        </label>
    </div>
    );
};

export default LanguagesList;
