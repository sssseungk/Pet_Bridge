import { useState } from 'react';
import click from '/assets/icons/heart_click_icon.svg'
import unclick from '/assets/icons/heart_unclick_icon.svg'


function clicked() {

  const [addWish, setAddWish] = useState(false);
  const handleWishBtn = (e) => {
    e.preventDefault();
    setAddWish(!addWish);
  }

  return (
    <div>
      {
        addWish ? (
          <img src={click} onClick={handleWishBtn}/>
        ) : (
          <img src={unclick} onClick={handleWishBtn}/>
        )
      }
        </div>
  );
}

export default clicked;