import { useNavigate } from "react-router-dom";
import prev_icon from '/assets/icons/prev_icon.svg'
import { useState } from "react";

function SearchHeaderComp() {

  const navigate = useNavigate();
  const handleGoPrevPage = () => {
    navigate(-1);
  }

  const [search, setSearch] = useState("");
  const onChange = (e) => {
      setSearch(e.target.value)
  }

  return (
    <>
      <div className="max-w-4xl mx-auto pt-5 pb-5 px-4 bg-pet-bg border-gray-800 shadow-lg relative z-10">
        <div className="flex items-center justify-between">
          <button className="flex items-center">
            <img src={prev_icon} alt="Previous" className="mr-2" onClick={handleGoPrevPage}/>
          </button>
          <form action='/' className="ml-4 w-full">
            <fieldset>
              <legend className="sr-only">검색 폼</legend>
              <label className="sr-only" htmlFor="search">검색</label>
              <input
                type="search"
                id="search"
                value={search}
                onChange={onChange}
                placeholder="상품명을 입력하세요."
                className="w-full bg-[#E9E9E9] text-pet-black py-1 px-2 rounded-lg focus:outline-none"
              />
            </fieldset>
          </form>
        </div>
      </div>
    </>
  )
}


export default SearchHeaderComp