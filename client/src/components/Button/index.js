import React, { useEffect, useState } from 'react';

function Button (props) {
  return (
    <button className="bg-white bg-opacity-0 border border-white px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 hover:bg-yellow-400 text-lg"
        onClick={removeBookmark}>
      <FontAwesomeIcon icon={['fas','bookmark']} />
    </button> 
      :

      <button className="bg-white bg-opacity-0 border border-white px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 hover:bg-yellow-400 text-lg"
            onClick={addBookmark}>
      <FontAwesomeIcon icon={['far','bookmark']} />
    </button> 
  )
}

export default Button;