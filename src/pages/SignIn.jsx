import pb from '@/api/pocketbase';
import { useAuth } from '@/contexts/Auth';
import debounce from '@/utils/debounce';
import kakaoLogin from '@/utils/kakaoLogin';
import {
  faComment,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/mypage');
    }
  }, [user, navigate]);

  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handleSignIn = async (e) => {
    e.preventDefault();

    const { email, password } = formState;

    try {
      await pb.collection('users').authWithPassword(email, password);
      navigate('/home');
    } catch (error) {
      console.error(error);
      alert('이메일,비밀번호를 확인해주세요.');
    }
  };

  const handleInput = debounce((e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }, 400);

  const togglePasswordHidden = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };
  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center pt-10 bg-pet-bg">
      <h2 className="text-3xl text-center pet-black font-semibold">로그인</h2>
      <form
        onSubmit={handleSignIn}
        className="flex flex-col gap-2 mt-4 justify-start items-start border-t-2 border-gray-800 pt-6"
      >
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="email" className="text-slate-900">
            이메일
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="이메일을 입력해 주세요"
            defaultValue={formState.email}
            onChange={handleInput}
            className="border border-gray-300 p-2 rounded-md focus:border-gray-900 focus:outline-none w-[300px]"
          />
        </div>
        <div className="flex flex-col gap-1 relative">
          <label htmlFor="password" className="text-slate-900">
            비밀번호
          </label>
          <input
            type={isPasswordHidden ? 'password' : 'text'}
            name="password"
            id="password"
            placeholder="비밀번호를 입력해 주세요"
            defaultValue={formState.password}
            onChange={handleInput}
            className="border border-slate-300 p-2 rounded-md focus:ring-slate-500 focus:ring-opacity-50 focus:border-slate-500 focus:outline-none w-[300px]"
          />
          <FontAwesomeIcon
            icon={isPasswordHidden ? faEyeSlash : faEye}
            onClick={togglePasswordHidden}
            className="cursor-pointer absolute right-[10px] top-[40px] text-gray-500"
          />
        </div>
        <div className="mt-4 w-full text-center">
          <button
            type="submit"
            className="bg-primary cursor-pointer px-10 py-2 rounded-md w-full"
          >
            로그인
          </button>
          <Link
            to="/signup"
            className="block bg-pet-green text-white px-10 py-2 rounded-md w-full mt-4"
          >
            회원가입
          </Link>
        </div>
      </form>
      <div className="flex flex-col mt-4 text-center w-[300px] border-t border-gray-800 pt-4">
        <button
          onClick={kakaoLogin}
          className="bg-[#F7E600] cursor-pointer px-10 py-2 rounded-md relative"
        >
          <FontAwesomeIcon
            icon={faComment}
            className="absolute left-[20px] bottom-[12px]"
          />
          카카오계정으로 로그인
        </button>
      </div>
    </div>
  );
}

export default SignIn;
