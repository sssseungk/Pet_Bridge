import { useNavigate } from "react-router-dom";
import prev_icon from '/assets/icons/prev_icon.svg'
import { PropTypes } from 'prop-types';
import { useRef, useState } from "react";

function SearchHeaderComp({ setSearchTerm}) {

  const navigate = useNavigate();
  const handleGoPrevPage = () => {
    navigate(-1);
  }

  const [tempSearchTerm, setTempSearchTerm] = useState(""); // 임시 검색어 상태 추가
  const searchInputRef = useRef(); // 입력 필드 참조 생성

  const onChange = (e) => {
    setTempSearchTerm(e.target.value); // 임시 검색어 상태 업데이트
  }

  const onSubmit = (e) => {
    e.preventDefault(); // form 기본 동작 방지
    setSearchTerm(tempSearchTerm); // 실제 검색어 상태 업데이트
    searchInputRef.current.blur(); // 검색 실행 후 입력 필드의 포커스 제거
  }

  return (
    <>
      <div className="max-w-4xl mx-auto pt-5 pb-5 px-4 bg-pet-bg border-gray-800 shadow-lg relative z-10">
        <div className="flex items-center justify-between w-full">
          <button className="flex items-center">
            <img src={prev_icon} alt="Previous" className="mr-2" onClick={handleGoPrevPage}/>
          </button>
          <form action='/' onSubmit={onSubmit} className="ml-4 w-full flex flex-nowrap">
            <fieldset style={{ flexGrow: 1 }}> {/* 수정: flexGrow를 1로 설정 */}
              <legend className="sr-only">검색 폼</legend>
              <label className="sr-only" htmlFor="search">검색</label>
              <input
                type="search"
                id="search"
                value={tempSearchTerm}
                onChange={onChange}
                placeholder="상품명을 입력하세요."
                className="w-full bg-[#E9E9E9] text-ellipsis text-pet-black py-1 px-2 rounded-lg focus:outline-none"
                ref={searchInputRef} // 생성한 참조 연결
              />
            </fieldset>
            <button type='submit' 
              className="bg-primary rounded-xl px-4 ml-5 pet-s:w-20"
              onClick={onSubmit}>검색
            </button>  
          </form>
        </div>
      </div>
    </>
  )
}


export default SearchHeaderComp

SearchHeaderComp.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};