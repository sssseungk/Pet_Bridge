import { InputField } from './InputField';

function InputSection({ formState, handleInput }) {
  return (
    <>
      <InputField
        type="email"
        name="email"
        id="email"
        placeholder="이메일을 입력해 주세요"
        value={formState.email}
        onChange={handleInput}
      />
      <InputField
        type="password"
        name="password"
        id="password"
        placeholder="비밀번호를 입력해 주세요"
        value={formState.password}
        onChange={handleInput}
      />
    </>
  );
}

export default InputSection;
