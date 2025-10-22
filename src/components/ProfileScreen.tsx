import { ChevronRight, Bell, Lock, HelpCircle, LogOut, User, Mail, Smartphone } from 'lucide-react';
import { Button } from './ui/button';

export function ProfileScreen() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <h1 className="text-xl">마이페이지</h1>
      </div>

      {/* Profile Section */}
      <div className="p-4 border-b border-zinc-800">
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl">
              👤
            </div>
            <div className="flex-1">
              <h2 className="text-xl mb-1">투자자님</h2>
              <p className="text-sm text-zinc-400">investor@stocktrend.com</p>
            </div>
          </div>
          
          <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl">
            프로필 편집
          </Button>
        </div>
      </div>

      {/* Account Info */}
      <div className="p-4 border-b border-zinc-800">
        <h3 className="text-sm text-zinc-400 mb-3">계정 정보</h3>
        <div className="space-y-2">
          <button className="w-full bg-zinc-900 rounded-xl p-4 flex items-center justify-between hover:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-zinc-500" />
              <div className="text-left">
                <div className="text-sm">이름</div>
                <div className="text-xs text-zinc-500">투자자</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-500" />
          </button>

          <button className="w-full bg-zinc-900 rounded-xl p-4 flex items-center justify-between hover:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-zinc-500" />
              <div className="text-left">
                <div className="text-sm">이메일</div>
                <div className="text-xs text-zinc-500">investor@stocktrend.com</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-500" />
          </button>

          <button className="w-full bg-zinc-900 rounded-xl p-4 flex items-center justify-between hover:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-zinc-500" />
              <div className="text-left">
                <div className="text-sm">전화번호</div>
                <div className="text-xs text-zinc-500">010-1234-5678</div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-500" />
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="p-4 border-b border-zinc-800">
        <h3 className="text-sm text-zinc-400 mb-3">설정</h3>
        <div className="space-y-2">
          <button className="w-full bg-zinc-900 rounded-xl p-4 flex items-center justify-between hover:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-zinc-500" />
              <span className="text-sm">알림 설정</span>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-500" />
          </button>

          <button className="w-full bg-zinc-900 rounded-xl p-4 flex items-center justify-between hover:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-zinc-500" />
              <span className="text-sm">보안 설정</span>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-500" />
          </button>
        </div>
      </div>

      {/* Support */}
      <div className="p-4 border-b border-zinc-800">
        <h3 className="text-sm text-zinc-400 mb-3">고객 지원</h3>
        <div className="space-y-2">
          <button className="w-full bg-zinc-900 rounded-xl p-4 flex items-center justify-between hover:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-zinc-500" />
              <span className="text-sm">도움말</span>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-500" />
          </button>

          <button className="w-full bg-zinc-900 rounded-xl p-4 flex items-center justify-between hover:bg-zinc-800 transition-colors">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-zinc-500" />
              <span className="text-sm">문의하기</span>
            </div>
            <ChevronRight className="w-5 h-5 text-zinc-500" />
          </button>
        </div>
      </div>

      {/* App Info */}
      <div className="p-4 border-b border-zinc-800">
        <div className="space-y-2">
          <button className="w-full bg-zinc-900 rounded-xl p-4 flex items-center justify-between hover:bg-zinc-800 transition-colors">
            <span className="text-sm">서비스 이용약관</span>
            <ChevronRight className="w-5 h-5 text-zinc-500" />
          </button>

          <button className="w-full bg-zinc-900 rounded-xl p-4 flex items-center justify-between hover:bg-zinc-800 transition-colors">
            <span className="text-sm">개인정보 처리방침</span>
            <ChevronRight className="w-5 h-5 text-zinc-500" />
          </button>

          <div className="bg-zinc-900 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">버전 정보</span>
              <span className="text-sm text-zinc-500">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logout */}
      <div className="p-4">
        <button className="w-full bg-zinc-900 rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors text-red-500">
          <LogOut className="w-5 h-5" />
          <span>로그아웃</span>
        </button>
      </div>
    </div>
  );
}
