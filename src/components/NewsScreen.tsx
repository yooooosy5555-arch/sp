import { useState } from 'react';
import { Search, Clock, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
export function NewsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);




  
  // --- 뉴스 데이터
  const news = [
    { title: '삼성전자, AI 반도체 수주 확대로 3분기 영업이익 15% 증가 전망', source: '매일경제', time: '10분 전', category: '반도체' },
    { title: 'SK하이닉스 HBM3E 양산 본격화...엔비디아 공급 물량 2배 확대', source: '한국경제', time: '35분 전', category: '반도체' },
    { title: '코스피 2900선 돌파 임박, 외국인 매수세 이어져', source: '서울경제', time: '1시간 전', category: '시황' },
    { title: '테슬라 3분기 실적 발표, 전기차 판매량 예상치 상회', source: 'Bloomberg', time: '2시간 전', category: '해외' },
    { title: '카카오 AI 서비스 본격화...챗봇 월간 이용자 1000만 돌파', source: '연합뉴스', time: '3시간 전', category: 'IT' },
    { title: 'LG에너지솔루션, 북미 배터리 공장 증설 결정', source: '이데일리', time: '4시간 전', category: '2차전지' },
  ];
  // --- StockCast 데이터
  const podcasts = [
    { title: '코스피 역대 최고치 2887.20 경신 - 삼성전자 호재가 주도', date: '2025.10.17', duration: '8:32' },
    { title: '가상자산 소도 테마주 중 올해 첫 보합세 종가에 근접', date: '2025.10.16', duration: '6:45' },
    { title: '도쿄증시 아침 약세 - 엔·후 박약하기로 환율에 근접', date: '2025.10.15', duration: '7:18' },
  ];
  // --- 주요 키워드
  const keywords = [
    { word: '삼성전자', weight: 5 },
    { word: 'AI', weight: 5 },
    { word: '반도체', weight: 5 },
    { word: '코스피', weight: 5 },
    { word: 'HBM3E', weight: 5 },
    { word: '배터리', weight: 5 },
    { word: '테슬라', weight: 5 },
    { word: '챗봇', weight: 5 },
    { word: '외국인', weight: 5 },
    { word: 'IT', weight: 5 },
  ];
  const displayedNews = selectedCategory === '전체'
    ? news.slice(0, 3)
    : news.filter((item) => item.category === selectedCategory);
    setSelectedCategory;
  const weightClassMap: Record<number, string> = {
    1: 'text-[6pt] px-2 py-1 bg-zinc-800 text-zinc-300 rounded-full',
    2: 'text-[6pt] px-3 py-1 bg-zinc-800 text-zinc-200 rounded-full',
    3: 'text-[6pt] px-4 py-1.5 bg-zinc-800 text-white rounded-full',
    4: 'text-[6pt] px-4 py-2 bg-blue-600 text-white rounded-full shadow-sm',
    5: 'text-[6pt] px-3 py-1 bg-blue-500 text-white rounded-full shadow',
  };
  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-semibold">뉴스</h1>
          <Search className="w-5 h-5 text-zinc-400" />
        </div>
        <p className="text-xs text-zinc-500">실시간 AI 요약 뉴스와 StockCast를 확인해 보세요</p>
      </div>
      <div className="p-4 space-y-6">
        {/* ----------------- 주요 뉴스 키워드 ----------------- */}
        <div className="border-t border-b border-zinc-800 py-6">
          <h2 className="text-lg font-semibold mb-3">주요 뉴스 키워드</h2>
          <div className="flex flex-wrap gap-3 items-center">
            {keywords.map((k, i) => (
              <div key={i} className={weightClassMap[k.weight]}>{k.word}</div>
            ))}
          </div>
          <p className="text-xs text-zinc-500 mt-3">
            위 키워드는 최신 기사 기반으로 가중치를 적용한 워드맵입니다.
          </p>
        </div>
        {/* ----------------- AI 요약 뉴스 ----------------- */}
        <div className="border-b border-zinc-800 py-6">
          <h2 className="text-lg font-semibold mb-3">AI 요약 뉴스</h2>
          <div className="space-y-3">
            {displayedNews.map((item, index) => (
              <button
                key={index}
                onClick={() => alert('뉴스 상세 페이지로 이동')}
                className="w-full bg-zinc-900 rounded-xl p-3 hover:bg-zinc-800 transition-colors text-left"
              >
                <h3 className="text-sm mb-1 leading-snug">{item.title}</h3>
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">{item.category}</span>
                  <span>{item.source}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
        {/* ----------------- StockCast ----------------- */}
        <div className="border-b border-zinc-800 py-6">
          <h2 className="text-lg font-semibold mb-3">StockCast</h2>
          <div className="space-y-6">
            {podcasts.map((podcast, index) => (
              <div key={index} className="relative">
                {/* 오디오 웨이브 + 버튼 그룹 */}
                <div className="relative h-16 rounded-2xl bg-zinc-800 flex items-center justify-center overflow-hidden">
                  {/* 웨이브: 재생 중일 때만 */}
                  {playingIndex === index && isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center gap-1">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-white/40 rounded-full"
                          style={{
                            height: `${12 + (i % 7) * 3 + Math.random() * 6}px`,
                            animation: `wave ${0.6 + (i % 5) * 0.1 + Math.random() * 0.6}s infinite`,
                            animationDelay: `${(i % 7) * 40}ms`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                  {/* 버튼 그룹: 좌/중/우 */}
                  <div className="absolute inset-0 flex items-center justify-between px-6 z-0">
                    {/* 이전 */}
                    <button onClick={() => alert('이전 재생')} className="w-10 h-10 rounded-full bg-white/12 flex items-center justify-center hover:bg-white/20">
                      <SkipBack className="w-5 h-5 text-white" />
                    </button>
                    {/* 재생/일시정지 */}
                    <button
                      onClick={() => {
                        setPlayingIndex(index);
                        setIsPlaying(playingIndex === index ? !isPlaying : true);
                      }}
                      className="w-12 h-12 rounded-full bg-white/12 flex items-center justify-center hover:bg-white/20"
                    >
                      {playingIndex === index && isPlaying ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white" />
                      )}
                    </button>
                    {/* 다음 */}
                    <button onClick={() => alert('다음 재생')} className="w-10 h-10 rounded-full bg-white/12 flex items-center justify-center hover:bg-white/20">
                      <SkipForward className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
                {/* Podcast Info */}
                <div className="w-full bg-zinc-900 rounded-xl p-3 text-left mt-2">
                  <p className="text-sm mb-1 leading-snug">{podcast.title}</p>
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <div className="flex items-center gap-2">
                      <span>{podcast.date}</span>
                      <span>•</span>
                      <span>{podcast.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* local keyframes for wave animation */}
      <style>{`
        @keyframes wave {
          0% { transform: scaleY(1); }
          50% { transform: scaleY(1.6); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}
