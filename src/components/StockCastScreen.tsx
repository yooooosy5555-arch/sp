import { Play, Search } from 'lucide-react';

export function StockCastScreen() {
  const podcasts = [
    {
      title: '코스피 역대 최고치 2887.20 경신 - 삼성전자 호재가 주도',
      date: '2025.10.17',
      duration: '8:32',
      gradient: 'from-orange-500 via-pink-500 to-purple-500'
    },
    {
      title: '가상자산 소도 테마주 중 올해 첫 보합세 종가에 근접',
      date: '2025.10.16',
      duration: '6:45',
      gradient: 'from-green-400 via-emerald-500 to-teal-500'
    },
    {
      title: '도쿄증시 아침 약세 - 엔·후 박약하기로 환율에 근접',
      date: '2025.10.15',
      duration: '7:18',
      gradient: 'from-purple-500 via-pink-500 to-rose-500'
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl">StockCast</h1>
          <Search className="w-5 h-5 text-zinc-400" />
        </div>
        <p className="text-sm text-zinc-500">AI가 분석한 시황을 오디오로 들어보세요</p>
      </div>

      {/* Podcast List */}
      <div className="p-4 space-y-4">
        {podcasts.map((podcast, index) => (
          <div key={index} className="relative">
            {/* Gradient Background */}
            <div className={`h-48 rounded-2xl bg-gradient-to-br ${podcast.gradient} overflow-hidden relative`}>
              {/* Audio Wave Visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-1">
                  {[...Array(30)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-white/40 rounded-full"
                      style={{
                        height: `${Math.random() * 60 + 20}px`,
                        animation: `pulse ${Math.random() * 2 + 1}s infinite`
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Play Button */}
              <button 
                onClick={() => alert(`"${podcast.title}" 재생을 시작합니다`)}
                className="absolute inset-0 flex items-center justify-center group"
              >
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                  <Play className="w-8 h-8 text-white fill-white" />
                </div>
              </button>
            </div>

            {/* Podcast Info */}
            <button 
              onClick={() => alert(`"${podcast.title}" 재생을 시작합니다`)}
              className="w-full mt-3 bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800 transition-colors text-left"
            >
              <p className="text-sm mb-2 leading-relaxed">{podcast.title}</p>
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <span>{podcast.date}</span>
                  <span>•</span>
                  <span>{podcast.duration}</span>
                </div>
                <span className="text-blue-400">재생 ▶</span>
              </div>
            </button>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(1.5); }
        }
      `}</style>
    </div>
  );
}
