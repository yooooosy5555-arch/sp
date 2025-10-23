import { useState } from 'react';
import { Plus, TrendingUp, TrendingDown, MoreVertical } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts';


export function PortfolioScreen() {
  const [selectedView, setSelectedView] = useState<'overview' | 'detailed'>('overview');
  
  const totalAssets = 345680000;
  const totalInvestment = 300000000;
  const totalProfit = totalAssets - totalInvestment;
  const totalProfitRate = (totalProfit / totalInvestment) * 100;
  // const totalReturn = totalProfitRate;

  const portfolioData = [
    { 
      name: 'AAPL', 
      fullName: 'Apple Inc.',
      value: 35.2, 
      amount: 121680000,
      quantity: 500,
      avgPrice: 195.20,
      currentPrice: 243.36,
      change: 24.7,
      profit: 24080000,
      color: '#3b82f6',
      market: 'NASDAQ'
    },
    { 
      name: 'NVDA',
      fullName: 'NVIDIA Corporation',
      value: 28.5,
      amount: 98518800,
      quantity: 800,
      avgPrice: 98.50,
      currentPrice: 123.15,
      change: 25.0,
      profit: 19718800,
      color: '#10b981',
      market: 'NASDAQ'
    },
    { 
      name: 'PLTR',
      fullName: 'Palantir Technologies Inc.',
      value: 18.3,
      amount: 63259440,
      quantity: 850,
      avgPrice: 64500,
      currentPrice: 74423,
      change: 15.4,
      profit: 8434440,
      color: '#8b5cf6',
      market: 'NASDAQ'
    },
    { 
      name: 'F',
      fullName: 'Ford Motor',
      value: 12.5,
      amount: 43210000,
      quantity: 320,
      avgPrice: 110000,
      currentPrice: 135031,
      change: 22.8,
      profit: 8009920,
      color: '#f59e0b',
      market: 'NASDAQ'
    },
    { 
      name: 'TSLA',
      fullName: 'Tesla Inc.',
      value: 5.5,
      amount: 19011760,
      quantity: 80,
      avgPrice: 245.50,
      currentPrice: 237.65,
      change: -3.2,
      profit: -628000,
      color: '#ef4444',
      market: 'NASDAQ'
    },
  ];

  // 일별 수익률 데이터 (최근 7일)
  const dailyPerformance = [
    { date: '10/11', value: 12.8 },
    { date: '10/12', value: 13.2 },
    { date: '10/13', value: 14.1 },
    { date: '10/14', value: 14.8 },
    { date: '10/15', value: 15.3 },
    { date: '10/16', value: 14.9 },
    { date: '10/17', value: 15.2 },
  ];

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl">포트폴리오</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedView('overview')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                selectedView === 'overview'
                  ? 'bg-blue-500 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              요약
            </button>
            <button
              onClick={() => setSelectedView('detailed')}
              className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                selectedView === 'detailed'
                  ? 'bg-blue-500 text-white'
                  : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
              }`}
            >
              상세
            </button>
          </div>
        </div>
        
        {/* Total Assets Card */}
        <div className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-blue-500/20 mb-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="text-sm text-zinc-400 mb-1">총 자산</div>
              <div className="text-3xl mb-2">{totalAssets.toLocaleString()}원</div>
              <div className="flex items-center gap-2">
                <span className={`flex items-center gap-1 ${totalProfitRate < 0 ? 'text-blue-500' : 'text-red-500'}`}>
                  {totalProfitRate < 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                  {totalProfitRate > 0 ? '+' : ''}{totalProfitRate.toFixed(2)}%
                </span>
                <span className={`${totalProfit < 0 ? 'text-blue-500' : 'text-red-500'}`}>
                  ({totalProfit > 0 ? '+' : ''}{totalProfit.toLocaleString()}원)
                </span>
              </div>
            </div>
            <div className="text-right text-sm">
              <div className="text-zinc-500">투자금액</div>
              <div className="text-zinc-300">{totalInvestment.toLocaleString()}원</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-700/50">
            <div>
              <div className="text-xs text-zinc-500 mb-1">총 매입</div>
              <div className="text-sm">{totalInvestment.toLocaleString()}원</div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1">총 평가</div>
              <div className="text-sm">{totalAssets.toLocaleString()}원</div>
            </div>
            <div>
              <div className="text-xs text-zinc-500 mb-1">평가손익</div>
              <div className={`text-sm ${totalProfit < 0 ? 'text-blue-500' : 'text-red-500'}`}>
                {totalProfit.toLocaleString()}원
              </div>
            </div>
          </div>
        </div>

        {/* Daily Performance Chart */}
        <div className="mb-4">
          <h3 className="text-sm text-zinc-400 mb-3">일별 수익률 추이</h3>
          <div className="bg-zinc-900 rounded-xl p-4 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyPerformance}>
                <XAxis 
                  dataKey="date" 
                  stroke="#71717a"
                  tick={{ fill: '#71717a', fontSize: 12 }}
                />
                <YAxis 
                  stroke="#71717a"
                  tick={{ fill: '#71717a', fontSize: 12 }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {dailyPerformance.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.value >= 0 ? '#ef4444' : '#3b82f6'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {selectedView === 'overview' && (
          <>
            {/* Pie Chart */}
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={portfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {portfolioData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-2 justify-center">
              {portfolioData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-zinc-300">{item.name}</span>
                  <span className="text-zinc-500">{item.value}%</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Holdings List */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-zinc-400">
            보유 종목 ({portfolioData.length})
          </h3>
          <button className="flex items-center gap-1 text-blue-500 text-sm">
            <Plus className="w-4 h-4" />
            <span>종목 추가</span>
          </button>
        </div>

        <div className="space-y-3">
          {portfolioData.map((stock) => (
            <button 
              key={stock.name} 
              onClick={() => alert(`${stock.name} 상세 정보를 확인합니다`)}
              className="w-full bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800/80 transition-colors text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3 flex-1">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: stock.color }}
                  >
                    <span className="text-lg">{stock.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="truncate">{stock.name}</span>
                      <span className="text-xs text-zinc-500 shrink-0">{stock.market}</span>
                    </div>
                    <div className="text-xs text-zinc-500 truncate">
                      {stock.fullName}
                    </div>
                  </div>
                </div>
                <div className="text-zinc-500 hover:text-white">
                  <MoreVertical className="w-4 h-4" />
                </div>
              </div>

              {selectedView === 'overview' ? (
                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">평가액</div>
                    <div className="text-white">{stock.amount.toLocaleString()}원</div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500 mb-1">수익률</div>
                    <div className={stock.change > 0 ? 'text-red-500' : 'text-blue-500'}>
                      {stock.change > 0 ? '+' : ''}{stock.change}%
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-zinc-500 mb-1">보유 비중</div>
                    <div>{stock.value}%</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">보유수량</div>
                      <div>{stock.quantity}주</div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">현재가</div>
                      <div>{stock.currentPrice.toLocaleString()}원</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">평균 매입가</div>
                      <div>{stock.avgPrice.toLocaleString()}원</div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">평가손익</div>
                      <div className={stock.profit >= 0 ? 'text-red-500' : 'text-blue-500'}>
                        {stock.profit >= 0 ? '+' : ''}{stock.profit.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-zinc-800">
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <div className="text-xs text-zinc-500 mb-1">평가금액</div>
                        <div>{stock.amount.toLocaleString()}원</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-zinc-500 mb-1">수익률</div>
                        <div className={stock.change > 0 ? 'text-red-500' : 'text-blue-500'}>
                          {stock.change > 0 ? '+' : ''}{stock.change}%
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-zinc-500 mb-1">포트폴리오 비중</div>
                        <div>{stock.value}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Summary Card */}
        <div className="mt-6 bg-zinc-900 rounded-xl p-4">
          <h4 className="text-sm text-zinc-400 mb-3">포트폴리오 요약</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-zinc-500">총 보유 종목</span>
              <span>{portfolioData.length}개</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">국내 주식</span>
              <span>{portfolioData.filter(s => s.market === 'KOSPI').length}개</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">해외 주식</span>
              <span>{portfolioData.filter(s => s.market === 'NASDAQ').length}개</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-zinc-800">
              <span className="text-zinc-500">최고 수익률</span>
              <span className="text-red-500">
                {portfolioData.reduce((max, s) => s.change > max ? s.change : max, -Infinity).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">최저 수익률</span>
              <span className="text-blue-500">
                {portfolioData.reduce((min, s) => s.change < min ? s.change : min, Infinity).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
