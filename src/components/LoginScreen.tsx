import { useState } from 'react';
import { Button } from './ui/button';

interface LoginScreenProps {
  onLogin: () => void;
  onSignup: () => void;
}

export function LoginScreen({ onLogin, onSignup }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');

  const handleLoginAttempt = () => {
    if (email === '' || password === '') {
        setMessage('아이디와 비밀번호를 모두 입력해주세요.');
        return;
    }
    setMessage('');
    onLogin(); 
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col">
      <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">

        {/* Logo + App Name: "주식 트렌드 분석" 텍스트를 삭제하고, h1의 마진을 mb-4로 늘려 간격 확보 */}
        <div className="mb-16 text-center">
          <div className="w-24 max-w-full aspect-square mx-auto mb-4 rounded-2xl bg-blue-600 flex items-center justify-center">
            {/* 상승 추세와 차트판을 나타내는 미니멀한 SVG 아이콘 */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="white" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-16 h-16 lucide lucide-area-chart"
            >
                {/* 차트판 배경 */}
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" strokeOpacity="0.5" />
                {/* 상승 트렌드 라인 (깔끔하고 명확하게) */}
                <polyline points="7 12 12 7 17 12" strokeWidth="2" />
                {/* 상승 화살표 꼬리 */}
                <line x1="12" y1="7" x2="12" y2="17" strokeWidth="2" />
            </svg>


          </div>
          {/* mb-1 -> mb-4로 변경하여 입력 폼과의 간격 보충 */}
          <h1 className="text-3xl font-bold tracking-tight mb-4">StockTrend</h1>
          {/* 삭제된 텍스트: <p className="text-sm text-zinc-400">주식 트렌드 분석</p> */}
        </div>


        {/* Form */}
        <div className="space-y-4 mb-6">
          {message && (
            <div className="p-3 bg-red-900/50 text-red-400 rounded-lg text-sm text-center">
                {message}
            </div>
          )}
          <div className="bg-zinc-900 rounded-xl p-4">
            <label className="block text-sm text-zinc-400 mb-2">아이디</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-white placeholder:text-zinc-500"
              placeholder="아이디를 입력하세요"
            />
          </div>
          
          <div className="bg-zinc-900 rounded-xl p-4">
            <label className="block text-sm text-zinc-400 mb-2">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-white placeholder:text-zinc-500"
              placeholder="비밀번호를 입력하세요"
            />
          </div>
        </div>

        {/* 로그인 버튼 */}
        <Button 
          onClick={handleLoginAttempt}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-5 mb-4 text-lg font-semibold" 
        >
          로그인
        </Button>

        {/* 회원가입 / 아이디 찾기 */}
        <div className="flex flex-col items-center space-y-2">
          <button 
            onClick={onSignup}
            className="text-blue-500 hover:underline font-medium text-sm"
          >
            회원가입
          </button>
          <button onClick={() => setMessage('아이디 찾기 기능이 곧 추가됩니다.')} className="text-zinc-400 hover:text-white text-sm">
            아이디 찾기
          </button>
        </div>

      </div>
    </div>
  );
}
