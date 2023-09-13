import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { pb } from '@/api/pocketbase';
import debounce from '@/utils/debounce';

function SignUp() {

  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const handleRegister = async (e) => {
    e.preventDefault();

    const { password, passwordConfirm } = formState;
    
    if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    await pb.collection('users').create({
      ...formState,
      emailVisibility: true,
    });

    navigate('/');
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleDebounceInput = debounce(handleInput, 500);

  return (
    <div>
      <h2>회원가입</h2>

      <form onSubmit={handleRegister} className='flex flex-col gap-2 mt-2 justify-start items-start'>
        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={formState.name}
            onChange={handleDebounceInput}
            className='border border-slate-300 ml-2'
          />
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            name="email"
            id="email"
            defaultValue={formState.email}
            onChange={handleDebounceInput}
            className='border border-slate-300 ml-2'
          />
        </div>
        <div>
          <label htmlFor="password">패스워드(6자 이상)</label>
          <input
            type="password"
            name="password"
            id="password"
            defaultValue={formState.password}
            onChange={handleDebounceInput}
            className='border border-slate-300 ml-2'
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm">패스워드 확인</label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            defaultValue={formState.passwordConfirm}
            onChange={handleDebounceInput}
            className='border border-slate-300 ml-2'
          />
        </div>
        <div className='flex gap-2'>
          <button type="submit" className='disabled:cursor-not-allowed'>가입</button>
          <button type="reset">취소</button>
        </div>
      </form>

      <Link to="/signin">로그인</Link>
    </div>
  );
}

export default SignUp;