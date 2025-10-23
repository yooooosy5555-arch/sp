import { useState } from 'react';
import { Bell, MessageSquare, PlusCircle } from 'lucide-react';

export function DashboardScreen(): JSX.Element {
  // 커뮤니티 상태
  const [tab, setTab] = useState<'latest' | 'popular'>('latest');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const filters = ['주식', '우량주', '가치투자', '성장투자', '코인', '급상승', '급하락'];

  const latestPosts = [
    { id: 1, title: '오늘 삼성전자 너무 오른 거 아닌가요?', time: '3분 전', likes: 21, comments: 5 },
    { id: 2, title: '급등주 매도 타이밍 질문드립니다', time: '15분 전', likes: 12, comments: 8 },
    { id: 3, title: '기관 매수 종목 분석 공유합니다', time: '1시간 전', likes: 33, comments: 14 },
  ];

  const popularPosts = [
    { id: 1, title: '가치투자자의 10년 보유 전략', time: '2시간 전', likes: 212, comments: 76, tag: '가치투자' },
    { id: 2, title: '급상승 종목 따라타도 될까요?', time: '5시간 전', likes: 145, comments: 39, tag: '급상승' },
    { id: 3, title: '요즘 우량주보다 코인 수익률이...', time: '7시간 전', likes: 98, comments: 27, tag: '코인' },
  ];

  const filteredPopularPosts = activeFilter
    ? popularPosts.filter((post) => post.tag === activeFilter)
    : popularPosts;

  return (
    <div className="min-h-screen bg-black text-white pb-24 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <h1 className="text-xl font-semibold">커뮤니티</h1>
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative"
          aria-label="알림 보기"
        >
          <Bell className="w-5 h-5 text-zinc-400 hover:text-white transition-colors" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>

      {/* 본문 */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* 탭 토글 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex bg-zinc-800 rounded-lg p-1">
              <button
                onClick={() => setTab('latest')}
                className={`px-3 py-1 rounded-md text-xs transition-colors ${
                  tab === 'latest' ? 'bg-blue-500 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                최신글
              </button>
              <button
                onClick={() => setTab('popular')}
                className={`px-3 py-1 rounded-md text-xs transition-colors ${
                  tab === 'popular' ? 'bg-blue-500 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                인기글
              </button>
            </div>
          </div>

          {/* 필터 (인기글 탭일 때만 표시) */}
          {tab === 'popular' && (
            <div className="flex flex-wrap gap-2 mb-3">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f === activeFilter ? null : f)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                    activeFilter === f
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'border-zinc-700 text-zinc-400 hover:border-blue-500/40 hover:text-blue-400'
                  }`}
                  type="button"
                >
                  {f}
                </button>
              ))}
            </div>
          )}

          {/* 게시글 리스트 */}
          <div className="space-y-4 mb-8">
            {(tab === 'latest' ? latestPosts : filteredPopularPosts).map((post) => (
              <div
                key={post.id}
                className="bg-zinc-900 rounded-lg p-4 hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-sm">{post.title}</span>
                  <span className="text-[11px] text-zinc-500">{post.time}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{post.comments}</span>
                  </div>
                  <span>❤️ {post.likes}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 새 글 작성 CTA */}
        <div className="text-center mt-8">
          <button
            onClick={() => alert('새 글 작성 페이지로 이동합니다')}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-medium text-white
                       bg-zinc-800 border border-zinc-700
                       hover:bg-blue-500 hover:border-blue-500 transition-colors"
            type="button"
          >
            <PlusCircle className="w-5 h-5" />
            새 글 작성하기
          </button>
        </div>
      </div>
    </div>
  );
}
