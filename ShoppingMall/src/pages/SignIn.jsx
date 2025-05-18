import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const nav = useNavigate();

//로그인에 필요한 요소들(이름, 전화번호, 이메일, 생년월일, 비밀번호)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    birth: '',
    pw: '',
  });

  // 로그인 유효성 검사
  const isValid = {
    name:  form.name.trim().length > 0,
    phone: /^\d{10,11}$/.test(form.phone), // 01012345678 또는 021234567 모두 가능하도록
    email: /^[\w.-]+@[\w.-]+\.\w+$/.test(form.email),
    birth: /^\d{4}-\d{2}-\d{2}$/.test(form.birth),         // YYYY-MM-DD
    pw:    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,16}$/.test(form.pw), 
    //비밀번호(선택 기능에서 요구하는 조건들도 추가했습니다.->특수문자:!@#$%^&*)
  };

  // 모두 통과해야 버튼 활성화
  const allOk = Object.values(isValid).every(Boolean);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (!allOk) return;           // 더블체크
    alert('회원가입 완료! 🎉');    // API 호출 자리
    nav('/');                    // 메인으로 이동
  };

  // 스타일
  const baseBox =
    'border rounded px-4 py-2 w-full placeholder:text-gray-400 focus:outline-none ';
  const sizeBox = 'ph:text-sm dt:text-base';      // ph/dt 공통 클래스

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-[90%] max-w-md space-y-4 bg-white p-6 rounded shadow-md"
      >
        <h1 className="text-2xl font-semibold text-center mb-2">Sign Up</h1>

        {/* 이름 */}
        <input
          className={baseBox + sizeBox}
          type="text"
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={handleChange}
        />

        {/* 전화번호 */}
        <input
          className={baseBox + sizeBox}
          type="tel"
          name="phone"
          placeholder="전화번호(숫자만)"
          value={form.phone}
          onChange={handleChange}
        />

        {/* 이메일 */}
        <input
          className={baseBox + sizeBox}
          type="email"
          name="email"
          placeholder="이메일"
          value={form.email}
          onChange={handleChange}
        />

        {/* 생년월일 */}
        <input
          className={baseBox + sizeBox}
          type="date"
          name="birth"
          value={form.birth}
          onChange={handleChange}
        />

        {/* 비밀번호 */}
        <input
          className={baseBox + sizeBox}
          type="password"
          name="pw"
          placeholder="비밀번호(8–16자, 영문·숫자·특수문자)"
          value={form.pw}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={!allOk}
          className={`w-full py-2 rounded font-semibold transition
            ${allOk
              ? 'bg-sky-600 hover:bg-sky-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
            ph:text-sm dt:text-base`}
        >
          가입하기
        </button>
      </form>
    </main>
  );
}
