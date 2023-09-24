import { Helmet } from 'react-helmet-async';
import SignUpForm from '../components/SignUp/SignUpForm';

function SignUp() {
  return (
    <>
    <Helmet>
        <title>펫:브릿지 - 회원가입</title>
      </Helmet>
    <div className="max-w-screen-pet-l mx-auto flex flex-col items-center pt-10 bg-pet-bg">
      <h2 className="text-3xl text-center pet-black font-semibold">회원가입</h2>
      <SignUpForm />
    </div>
    </>
    
  );
}

export default SignUp;
