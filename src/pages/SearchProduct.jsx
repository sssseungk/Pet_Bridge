import { useState } from "react";

function SearchProduct() {


  const [isSelected, setIsSelected] = useState();
    
  const handleClickButton = (buttonId) => {
    setIsSelected(buttonId);
  }


  return (

    <>
      <div className="mt-2 max-w-4xl mx-auto pt-2 pl-3">
        <span className="text-sm font-[600]">친구들이 많이 찾고 있어요!</span>
        <ol className="flex gap-2 mt-3 justify-start">
          <li className={`text-[12px] py-1 px-2 border-gray-1 border-[1px] rounded-[20px] ${isSelected === 'tumbler' ? 'bg-primary' : ''}`}>
            <button type="button" onClick={() => handleClickButton('tumbler')}>텀블러</button>
          </li>
          <li className={`text-[12px] py-1 px-2 border-gray-1 border-[1px] rounded-[20px] ${isSelected === 'pouch' ? 'bg-primary' : ''}`}>
            <button type="button" onClick={() => handleClickButton('pouch')}>파우치</button>
          </li>
          <li className={`text-[12px] py-1 px-2 border-gray-1 border-[1px] rounded-[20px] ${isSelected === 'echobag' ? 'bg-primary' : ''}`}>
            <button type="button" onClick={() => handleClickButton('echobag')}>에코백</button>
          </li>
          <li className={`text-[12px] py-1 px-2 border-gray-1 border-[1px] rounded-[20px] ${isSelected === 'zibits' ? 'bg-primary' : ''}`}>
            <button type="button" onClick={() => handleClickButton('zibits')}>지비츠</button>
          </li>

        </ol>
      </div>
    </>

  )
}

export default SearchProduct