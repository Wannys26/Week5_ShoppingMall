import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import kakaoimg from '../assets/Vector.svg'

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
    <div className="signin-container">
      <div className="signin-card">
        <div className="signin-form">
        <p className="signin-message">
          카카오톡으로 간편하게 로그인하고<br />
          서비스를 이용해보세요!
        </p>

        <button className="kakao-btn">
          <div className="kakao-btn-message">카카오톡으로 로그인</div>
          <img src={kakaoimg} alt="kakao" />
        </button>
      </form>
    </main>
  );
}
