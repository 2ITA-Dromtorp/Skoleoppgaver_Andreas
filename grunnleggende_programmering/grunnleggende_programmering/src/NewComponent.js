import React, { useState } from 'react';

function ToggleButton() {
  const [isButtonVisible, setButtonVisible] = useState(true);

  const handleClick = () => {
    // Toggle the visibility of the button when it's clicked
    setButtonVisible(!isButtonVisible);
  };

  return (
    <div>
      {isButtonVisible ? (
        <button onClick={handleClick}>Click to Hide</button>
      ) : (
        <div>
          <button onClick={handleClick}>Click to Show</button>
          <div>Some text in the revealed div.</div>
        </div>
      )}
    </div>
  );
}

export default ToggleButton;