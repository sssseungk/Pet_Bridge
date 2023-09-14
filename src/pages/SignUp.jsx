import { pb } from '@/api/pocketbase';
import { useAuth } from '@/contexts/Auth';
import debounce from "@/utils/debounce";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const { user } = useAuth();
  const navigate = useNavigate();

    useEffect(() => {
      if (user) {
        navigate("/mypage");
      }
    }, [user, navigate]);

  const koreaName = /^.{1,9}[가-힣]$/; // 한글 2~10글자
  const nickName = /^.{2,14}[a-z | A-Z]$/; // 영문 3~15글자
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 일반적인 이메일 형식
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/; // 6~16글자 영문+숫자

  const [formState, setFormState] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  // 유효성 검사 상태
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    username: false,
    email: false,
    password: false,
    passwordConfirm: false,
  });

  // 유효성 검사 전체 통과 확인
  const isFormValid = () => {
    return Object.values(validationErrors).every((error) => error === false);
  };

  // 비밀번호 숨김/표시 상태 관리
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);

  // 회원가입 등록 핸들러
  const handleRegister = async (e) => {
    e.preventDefault();

    const { password, passwordConfirm } = formState;

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    await pb.collection("users").create({
      ...formState,
      emailVisibility: true,
    });

    navigate("/home");
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    let isValid;

    switch (name) {
      case "name":
        isValid = koreaName.test(value);
        break;
      case "username":
        isValid = nickName.test(value);
        break;
      case "email":
        isValid = emailRegex.test(value);
        break;
      case "password":
        isValid = passwordRegex.test(value);
        break;
      case "passwordConfirm":
        isValid = formState.password === value;
        break;
      default:
        return;
    }

    setValidationErrors({
      ...validationErrors,
      [name]: !isValid,
    });

    if (isValid) {
      setFormState({
        ...formState,
        [name]: value,
      });
    }
  };

  const handleDebounceInput = debounce(handleInput, 500);
  // 비밀번호 숨김/표시 토글 함수
  const togglePasswordHidden = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };
  const toggleConfirmPasswordHidden = () => {
    setIsConfirmPasswordHidden(!isConfirmPasswordHidden);
  };

  return (
    <div className="w-[360px] mx-auto rounded-md flex flex-col items-center my-10">
        <h2 className="text-3xl text-center pet-black font-semibold">회원가입</h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-2 mt-4 justify-start items-start border-t-2 border-gray-800 pt-6">
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="name" className="text-slate-900">
              이름
            </label>
            <input type="text" name="name" id="name" placeholder="이름을 입력해 주세요"
              defaultValue={formState.name}
              onChange={handleDebounceInput}
              className="border border-gray-300 p-2 rounded-md focus:border-gray-900 focus:outline-none w-[300px]"
            />
            {validationErrors.name && (
              <>
                <span className="text-red-500 text-xs">
                  2자 이상 10자 이하의 한글
                </span>
              </>
            )}
            {!validationErrors.name && formState.name !== "" && (
              <>
                <span className="text-green-600 text-xs">
                  가입 가능한 이름입니다.
                </span>
              </>
            )}
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="username" className="text-slate-900">
              닉네임 (영문)
            </label>
            <input type="text" name="username" id="username" placeholder="닉네임을 입력해 주세요" defaultValue={formState.username} onChange={handleDebounceInput}
              className="border border-gray-300 p-2 rounded-md focus:border-gray-900 focus:outline-none w-[300px]"
            />
            {!validationErrors.username && formState.username !== "" && (
              <>
                <span className="text-green-600 text-xs">
                  사용가능한 계정 이름입니다.
                </span>
              </>
            )}
            {validationErrors.username && (
              <>
                <span className="text-red-500 text-xs">
                  최소3자 이상 15자 이하의 영문
                </span>
              </>
            )}
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="email" className="text-slate-900">
              이메일
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="예: petbridge@gmail.com"
              defaultValue={formState.email}
              onChange={handleDebounceInput}
              className="border border-gray-300 p-2 rounded-md focus:border-gray-900 focus:outline-none w-[300px]"
            />
            {!validationErrors.email && formState.email !== "" && (
              <>
                <span className="text-green-600 text-xs">
                  사용가능한 이메일입니다.
                </span>
              </>
            )}
            {validationErrors.email && (
              <>
                <span className="text-red-500 text-xs">
                  올바른 이메일 형식이 아닙니다.
                </span>
              </>
            )}
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="password" className="text-slate-900">
              비밀번호
            </label>
            <input
              type={isPasswordHidden ? "password" : "text"}
              name="password"
              id="password"
              placeholder="비밀번호를 입력해 주세요"
              defaultValue={formState.password}
              onChange={handleDebounceInput}
              className="border border-gray-300 p-2 rounded-md focus:border-gray-900 focus:outline-none w-[300px]"
            />
              <FontAwesomeIcon icon={isPasswordHidden ? faEyeSlash : faEye} onClick={togglePasswordHidden} 
              className="cursor-pointer absolute right-[10px] top-[40px] text-gray-500"/>
            {!validationErrors.password && formState.password !== "" && (
              <>
                <span className="text-green-600 text-xs">
                  사용가능한 비밀번호입니다.
                </span>
              </>
            )}
            {validationErrors.password && (
              <span className="text-red-500 text-xs">
                비밀번호는 영문, 숫자를 포함하여 6자~16자로 입력해주세요.
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="passwordConfirm" className="text-slate-900">
              비밀번호
            </label>
            <input
              type={isConfirmPasswordHidden ? "password" : "text"}
              name="passwordConfirm"
              id="passwordConfirm"
              placeholder="비밀번호를 한번 더 입력해 주세요"
              defaultValue={formState.passwordConfirm}
              onChange={handleDebounceInput}
              className="border border-gray-300 p-2 rounded-md focus:border-gray-900 focus:outline-none w-[300px]"
            />        
              <FontAwesomeIcon icon={isConfirmPasswordHidden ? faEyeSlash : faEye} onClick={toggleConfirmPasswordHidden}
              className="cursor-pointer absolute right-[10px] top-[40px] text-gray-500"/>
            {!validationErrors.passwordConfirm &&
              formState.passwordConfirm !== "" && (
                <>
                  <span className="text-green-600 text-xs">
                    비밀번호와 일치합니다.
                  </span>
                </>
              )}
            {validationErrors.passwordConfirm && (
              <span className="text-red-500 text-xs">
                비밀번호와 일치하지 않습니다. 다시 확인해주세요.
              </span>
            )}
          </div>
          <div className="mt-4 w-full text-center">
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`px-10 py-2 rounded-md w-full ${
                isFormValid()
                  ? "bg-primary cursor-pointer"
                  : "bg-gray-1 cursor-not-allowed"
              }`}
            >
              가입하기
            </button>
            <Link to="/home" className="block bg-pet-green text-white px-10 py-2 rounded-md w-full mt-4">
              취소
            </Link>
          </div>
        </form>
      </div>
  );
}

export default SignUp;
