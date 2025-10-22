import { useState } from 'react';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface SignupScreenProps {
  onBack: () => void;
  onSignup: () => void;
}

export function SignupScreen({ onBack, onSignup }: SignupScreenProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    verificationCode: '',
    interests: [] as string[]
  });

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onSignup();
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const interests = [
    '가전제품', '가상화폐', '건설',
    '게임/미디어', '고급외식', '금융서비스',
    '기계/장비', '농업/어업', '담배',
    '레저/여행', '리츠', '바이오/제약',
    'IT하드웨어', '반도체', '방위산업',
    '부동산', '선박', '소매/유통'
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <button onClick={onBack} className="mb-8 text-zinc-400 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h2 className="text-2xl mb-2">
          {step === 1 && '회원가입'}
          {step === 2 && '보유 종목 선택'}
          {step === 3 && '관심 종목 선택'}
        </h2>
        <p className="text-zinc-400 text-sm mb-8">
          {step === 1 && '아래 정보를 입력하여 회원가입을 진행하세요'}
          {step === 2 && '현재 보유 중인 종목을 선택하세요'}
          {step === 3 && '관심 있는 업종을 선택하세요'}
        </p>

        {step === 1 && (
          <div className="space-y-4">
            <div className="bg-zinc-900 rounded-xl p-4">
              <label className="block text-sm text-zinc-400 mb-2">이름</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-transparent border-none outline-none text-white"
                placeholder="이름을 입력하세요"
              />
            </div>
            
            <div className="bg-zinc-900 rounded-xl p-4">
              <label className="block text-sm text-zinc-400 mb-2">이메일</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-transparent border-none outline-none text-white"
                placeholder="example@email.com"
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1 bg-zinc-900 rounded-xl p-4">
                <label className="block text-sm text-zinc-400 mb-2">인증번호</label>
                <input
                  type="text"
                  value={formData.verificationCode}
                  onChange={(e) => setFormData({...formData, verificationCode: e.target.value})}
                  className="w-full bg-transparent border-none outline-none text-white"
                  placeholder="6자리 입력"
                />
              </div>
              <Button className="bg-zinc-700 hover:bg-zinc-600 px-6 rounded-xl self-end">
                전송
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="bg-zinc-900 rounded-xl p-4">
              <input
                type="text"
                className="w-full bg-transparent border-none outline-none text-white"
                placeholder="종목명 또는 종목코드 검색"
              />
            </div>
            <div className="text-center text-zinc-500 py-12">
              보유 종목을 검색하여 추가하세요
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    formData.interests.includes(interest)
                      ? 'bg-blue-500 text-white'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        )}

        <Button 
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl py-6 mt-8 shadow-lg shadow-blue-500/30"
        >
          {step === 3 ? '완료' : '다음'}
        </Button>
      </div>
    </div>
  );
}
