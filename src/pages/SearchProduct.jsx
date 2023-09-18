import CategoryButton from '@/components/Search/CategoryButton';
import SearchHeaderComp from '@/components/Search/SearchHeaderComp';
import SearchProductList from '@/components/Search/SearchProductList';
import { useState } from 'react';

function SearchProduct() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleClickButton = (buttonId) => {
    if (selectedCategory === buttonId) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(buttonId);
    }
  };

  const categories = [
    { id: 'stationery', text: '문구' },
    { id: 'bag', text: '가방' },
    { id: 'pouch', text: '파우치' },
    { id: 'digital', text: '디지털' },
    { id: 'living', text: '생활용품' },
    { id: 'jibbitz', text: '지비츠' },
    { id: 'keyring', text: '키링' },
  ];

  return (
    <>
      <SearchHeaderComp setSearchTerm={setSearchTerm} searchTerm={searchTerm} />{' '}
      <div className="mt-2 max-w-4xl mx-auto pt-2 pl-3">
        <span className="text-lg font-[600]">친구들이 많이 찾고 있어요!</span>
        <ul className="flex flex-wrap gap-2 mt-3 justify-start">
          {categories.map((category) => (
            <li key={category.id}>
              <CategoryButton
                buttonId={category.id}
                selectedCategory={selectedCategory}
                handleClickButton={handleClickButton}
                buttonText={category.text}
              />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <SearchProductList
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
        />
      </div>
    </>
  );
}

export default SearchProduct;
