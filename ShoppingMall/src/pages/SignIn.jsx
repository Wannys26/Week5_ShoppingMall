import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import kakaoimg from '../assets/Vector.svg'

export default function SignIn() {
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
      </div>
     </div>
    </div>
  );
}
