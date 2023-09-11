import SearchProductList from "@/components/Search/SearchProductList";
import { useState } from "react";


function SearchProduct() {

  const [selectedCategory, setSelectedCategory] = useState('');
    
  const handleClickButton = (buttonId) => {
    setSelectedCategory(buttonId);
  }


  return (

    <>
      <div className="mt-2 max-w-4xl mx-auto pt-2 pl-3">
        <span className="text-lg font-[600]">친구들이 많이 찾고 있어요!</span>
        <ol className="flex flex-wrap gap-2 mt-3 justify-start">
          <li className={`text-base py-1 px-2 border-gray-1 border-[1px] rounded-[20px] ${selectedCategory === 'stationery' ? 'bg-primary' : ''}`}>
            <button type="button" onClick={() => handleClickButton('stationery')}>문구</button>
          </li>
          <li className={`text-base py-1 px-2 border-gray-1 border-[1px] rounded-[20px] ${selectedCategory === 'bag' ? 'bg-primary' : ''}`}>
            <button type="button" onClick={() => handleClickButton('bag')}>가방</button>
          </li>
          <li className={`text-base py-1 px-2 border-gray-1 border-[1px] rounded-[20px] ${selectedCategory === 'pouch' ? 'bg-primary' : ''}`}>
            <button type="button" onClick={() => handleClickButton('pouch')}>파우치</button>
          </li>
          <li className={`text-base py-1 px-2 border-gray-1 border-[1px] rounded-[20px] ${selectedCategory === 'digital' ? 'bg-primary' : ''}`}>
            <button type="button" onClick={() => handleClickButton('digital')}>디지털</button>
          </li>
          <li className={`text-base py-1 px-2 border-gray-1 border-[1px] rounded-[20px] ${selectedCategory === 'living' ? 'bg-primary' : ''}`}>
            <button type="button" onClick={() => handleClickButton('living')}>생활용품</button>
          </li>
          <li className={`text-base py-1 px-2 border-gray-1 border-[1px] rounded-[20px] ${selectedCategory === 'jibbitz' ? 'bg-primary' : ''}`}>
            <button type="button" onClick={() => handleClickButton('jibbitz')}>지비츠</button>
          </li>
          <li className={`text-base py-1 px-2 border-gray-1 border-[1px] rounded-[20px] ${selectedCategory === 'keyring' ? 'bg-primary' : ''}`}>
            <button type="button" onClick={() => handleClickButton('keyring')}>키링</button>
          </li>
        </ol>
      </div>
      <div>
        <SearchProductList selectedCategory={selectedCategory}/>
      </div>
    </>

  )
}

export default SearchProduct