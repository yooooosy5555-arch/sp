import { useState } from 'react';
import { Search, ArrowLeft, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { PinchZoom } from "./ui/PinchZoom";

type MainTabType = 'price' | 'correlation' | 'keywords' | 'valuechain' | 'community';
type FinancialTabType = 'revenue' | 'income';

interface Stock {
  code: string;
  name: string;
  nameEn: string;
  market: string;
  price: number;
  change: number;
  changePercent: number;
}

export function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [selectedMainTab, setSelectedMainTab] = useState<MainTabType>('price');
  const [selectedFinancialTab, setSelectedFinancialTab] = useState<FinancialTabType>('revenue');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const allStocks: Stock[] = [
    { code: '005930', name: '삼성전자', nameEn: 'Samsung Electronics', market: 'KOSPI', price: 74800, change: 2800, changePercent: 3.88 },
    { code: '000660', name: 'SK하이닉스', nameEn: 'SK hynix', market: 'KOSPI', price: 125000, change: 4000, changePercent: 3.31 },
    { code: '035420', name: '네이버', nameEn: 'NAVER', market: 'KOSPI', price: 210000, change: 1700, changePercent: 0.82 },
    { code: '035720', name: '카카오', nameEn: 'Kakao', market: 'KOSPI', price: 48500, change: -500, changePercent: -1.02 },
    { code: '051910', name: 'LG화학', nameEn: 'LG Chem', market: 'KOSPI', price: 385000, change: -2000, changePercent: -0.52 },
    { code: '006400', name: '삼성SDI', nameEn: 'Samsung SDI', market: 'KOSPI', price: 385000, change: 3000, changePercent: 0.78 },
  ];

  const filteredStocks = searchQuery
    ? allStocks.filter(stock => 
        stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.code.includes(searchQuery)
      )
    : allStocks;

  const handleStockSelect = (stock: Stock) => {
    setSelectedStock(stock);
    setSearchQuery('');
    setShowSearchResults(false);
    setSelectedMainTab('price');
    setSelectedFinancialTab('revenue');
  };

  const handleSearchFocus = () => {
    setShowSearchResults(true);
  };

  const handleClearSelection = () => {
    setSelectedStock(null);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  // 주가 데이터
  const priceData = [
    { date: '10/01', price: 69500 },
    { date: '10/02', price: 70200 },
    { date: '10/03', price: 69800 },
    { date: '10/04', price: 71000 },
    { date: '10/07', price: 70500 },
    { date: '10/08', price: 71800 },
    { date: '10/09', price: 72500 },
    { date: '10/10', price: 72000 },
    { date: '10/11', price: 73200 },
    { date: '10/14', price: 72800 },
    { date: '10/15', price: 74100 },
    { date: '10/16', price: 73500 },
    { date: '10/17', price: 74800 },
  ];

  // 상관계수 데이터
  const correlationData = [
    { name: 'SK하이닉스', code: '000660', correlation: 0.87, price: '125,000원', change: '+3.2%', positive: true },
    { name: 'LG디스플레이', code: '034220', correlation: 0.72, price: '15,800원', change: '+1.8%', positive: true },
    { name: 'DB하이텍', code: '000990', correlation: 0.68, price: '45,600원', change: '+2.1%', positive: true },
    { name: '삼성SDI', code: '006400', correlation: 0.61, price: '385,000원', change: '-0.5%', positive: false },
    { name: 'LG전자', code: '066570', correlation: 0.58, price: '98,500원', change: '+0.9%', positive: true },
    { name: '현대차', code: '005380', correlation: 0.45, price: '215,000원', change: '-1.2%', positive: false },
  ];

  // 연관어 데이터
  const keywords = [
    { text: 'AI반도체', count: 1250, trend: 'up' },
    { text: 'HBM', count: 980, trend: 'up' },
    { text: '엔비디아', count: 856, trend: 'up' },
    { text: '실적발표', count: 734, trend: 'neutral' },
    { text: '메모리반도체', count: 621, trend: 'up' },
    { text: '파운드리', count: 543, trend: 'neutral' },
    { text: '삼성바이오', count: 432, trend: 'down' },
    { text: '투자확대', count: 389, trend: 'up' },
    { text: '시장점유율', count: 321, trend: 'neutral' },
    { text: '영업이익', count: 298, trend: 'up' },
  ];

  // 가치사슬 데이터
  const valueChainData = {
    upstream: [
      { name: '신에츠화학', category: '실리콘웨이퍼', relation: '원자재 공급' },
      { name: 'ASML', category: '노광장비', relation: '장비 공급' },
      { name: '도쿄일렉트론', category: '반도체장비', relation: '장비 공급' },
    ],
    related: [
      { name: 'SK하이닉스', category: '메모리반도체', relation: '경쟁사' },
      { name: '마이크론', category: '메모리반도체', relation: '경쟁사' },
    ],
    downstream: [
      { name: 'Apple', category: '전자기기', relation: '주요 고객' },
      { name: '엔비디아', category: 'GPU', relation: 'HBM 공급' },
      { name: '삼성전자DS', category: '완제품', relation: '자체 소비' },
    ]
  };

  // 매출비중 데이터 (도넛 차트)
  const revenueData = [
    { name: '반도체', value: 58.2, color: '#3b82f6' },
    { name: 'IM(모바일)', value: 24.5, color: '#8b5cf6' },
    { name: 'CE(가전)', value: 9.8, color: '#10b981' },
    { name: 'SDC(디스플레이)', value: 5.3, color: '#f59e0b' },
    { name: '기타', value: 2.2, color: '#ef4444' },
  ];

  // 손익계산서 데이터 (바 차트)
  const incomeData = [
    { quarter: '22 Q3', revenue: 76.78, operatingProfit: 10.85, netIncome: 9.14 },
    { quarter: '22 Q4', revenue: 70.46, operatingProfit: 4.31, netIncome: 4.17 },
    { quarter: '23 Q1', revenue: 63.75, operatingProfit: 0.64, netIncome: 1.57 },
    { quarter: '23 Q2', revenue: 60.01, operatingProfit: 0.67, netIncome: 1.72 },
    { quarter: '23 Q3', revenue: 67.40, operatingProfit: 2.43, netIncome: 3.86 },
    { quarter: '23 Q4', revenue: 67.78, operatingProfit: 2.82, netIncome: 6.34 },
    { quarter: '24 Q1', revenue: 71.92, operatingProfit: 6.64, netIncome: 6.61 },
    { quarter: '24 Q2', revenue: 74.07, operatingProfit: 10.44, netIncome: 9.90 },
  ];

  // 종목 관련 뉴스
  const stockNews = [
    {
      title: '삼성전자, AI 반도체 수주 확대로 3분기 영업이익 15% 증가 전망',
      source: '매일경제',
      time: '10분 전',
      category: '실적'
    },
    {
      title: 'SK하이닉스 HBM3E 양산 본격화...삼성전자 추격 가속화',
      source: '한국경제',
      time: '35분 전',
      category: '산업'
    },
    {
      title: '삼성전자, 엔비디아향 HBM3E 공급 본격화...2025년 매출 전망 상향',
      source: '서울경제',
      time: '1시간 전',
      category: '실적'
    },
  ];

  const mainTabs = [
    { id: 'price', label: '주가' },
    { id: 'correlation', label: '상관계수' },
    { id: 'keywords', label: '연관어' },
    { id: 'valuechain', label: '가치사슬' },
    { id: 'community', label: '커뮤니티' },
  ];

  const financialTabs = [
    { id: 'revenue', label: '매출비중' },
    { id: 'income', label: '손익계산서' },
  ];

    const renderCorrelationMindMap = () => {
    if (!selectedStock) return null;

    const centerX = 200;
    const centerY = 200;
    const radius = 150;

    return (
      <div className="mb-6">
        <h3 className="text-sm text-zinc-400 mb-3">상관계수</h3>
        <div className="bg-zinc-900 rounded-2xl p-6 overflow-x-auto scrollbar-hide">
          <PinchZoom>
            <svg width="400" height="400" className="mx-auto">
              {/* 연결선 */}
              {correlationData.map((stock, index) => {
                const angle = (index / correlationData.length) * 2 * Math.PI;
                const distance = radius * (1 - stock.correlation * 0.5);
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                
                const opacity = stock.correlation;
                const color = `rgba(239, 68, 68, ${opacity})`;
                
                return (
                  <line
                    key={`line-${index}`}
                    x1={centerX}
                    y1={centerY}
                    x2={x}
                    y2={y}
                    stroke={color}
                    strokeWidth={2 * stock.correlation}
                    opacity={0.6}
                  />
                );
              })}

              {/* 중심 노드 (선택된 종목) */}
              <g>
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={30}
                  fill="#3b82f6"
                  className="cursor-pointer hover:fill-blue-400 transition-colors"
                />
                <text
                  x={centerX}
                  y={centerY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                >
                  {selectedStock.name}
                </text>
              </g>

              {/* 상관 종목 노드 */}
              {correlationData.map((stock, index) => {
                const angle = (index / correlationData.length) * 2 * Math.PI;
                const distance = radius * (1 - stock.correlation * 0.5);
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                
                const nodeRadius = 15 + stock.correlation * 10;
                const opacity = 0.3 + stock.correlation * 0.7;
                const hue = stock.correlation * 120; // 0 (red) to 120 (red for high correlation)
                const color = `hsl(0, ${stock.correlation * 100}%, ${50 + (1 - stock.correlation) * 30}%)`;
                
                return (
                  <g key={`node-${index}`} className="cursor-pointer hover:opacity-80 transition-opacity">
                    <circle
                      cx={x}
                      cy={y}
                      r={nodeRadius}
                      fill={color}
                      opacity={opacity}
                    />
                    <text
                      x={x}
                      y={y+2}
                      textAnchor="middle"
                      fill="white"
                      fontSize="11"
                      fontWeight="500"
                    >
                      {stock.name}
                    </text>
                    <text
                      x={x}
                      y={y + nodeRadius + 15}
                      textAnchor="middle"
                      fill="#a1a1aa"
                      fontSize="10"
                    >
                      {stock.correlation.toFixed(2)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </PinchZoom>
        </div>
      </div>
    );
  };

  
  // 연관어 워드맵 렌더링
  const renderKeywordWordMap = () => {
    // 워드 클라우드 배치 알고리즘
    const maxCount = Math.max(...keywords.map(k => k.count));
    
    return (
      <div className="mb-6">
        <h3 className="text-sm text-zinc-400 mb-3">키워드 워드맵</h3>
        <div className="bg-zinc-900 rounded-2xl p-6 relative" style={{ height: '300px' }}>
          {keywords.map((keyword, index) => {
            const size = 12 + (keyword.count / maxCount) * 24;
            const positions = [
              { x: 15, y: 20 },
              { x: 65, y: 35 },
              { x: 25, y: 60 },
              { x: 75, y: 55 },
              { x: 45, y: 80 },
              { x: 10, y: 85 },
              { x: 85, y: 75 },
              { x: 55, y: 25 },
              { x: 35, y: 45 },
              { x: 70, y: 15 },
            ];
            
            const pos = positions[index] || { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 };
            
            const getColor = () => {
              if (keyword.trend === 'up') return '#ef4444';
              if (keyword.trend === 'down') return '#3b82f6';
              return '#71717a';
            };
            
            return (
              <button
                key={index}
                className="absolute transition-all hover:scale-110 cursor-pointer"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  fontSize: `${size}px`,
                  color: getColor(),
                  fontWeight: keyword.trend === 'up' ? 700 : 500,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => alert(`"${keyword.text}" 관련 정보`)}
              >
                {keyword.text}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // 가치사슬 마인드맵 렌더링
  const renderValueChainMindMap = () => {
    if (!selectedStock) return null;

    return (
      <div className="mb-6">
        <h3 className="text-sm text-zinc-400 mb-3">가치사슬 네트워크</h3>
        <div className="bg-zinc-900 rounded-2xl p-4 overflow-x-auto scrollbar-hide">
          <PinchZoom>
            <svg viewBox="0 0 700 500" className="w-full h-auto">
              {/* 상류 박스 (왼쪽) */}
              <g>
                <rect x={20} y={100} width={180} height={((valueChainData[Object.keys(valueChainData)[0]]).length+1)*70} rx={8} fill="#f97316" opacity={0.1} stroke="#f97316" strokeWidth={2} />
                <text x={110} y={125} textAnchor="middle" fill="#f97316" fontSize="14" fontWeight="bold">
                  상류 (공급업체)
                </text>
                
                {valueChainData.upstream.map((company, index) => {
                  const y = 160 + index * 70;
                  return (
                    <g key={`upstream-${index}`}>
                      <rect x={35} y={y} width={150} height={50} rx={6} fill="#18181b" stroke="#f97316" strokeWidth={1.5} />
                      <text x={110} y={y + 20} textAnchor="middle" fill="white" fontSize="15" fontWeight="500">
                        {company.name}
                      </text>
                      <text x={110} y={y + 38} textAnchor="middle" fill="#a1a1aa" fontSize="10">
                        {company.category}
                      </text>
                      {/* 연결선 */}
                      <line
                        x1={201}
                        y1={250}
                        x2={310}
                        y2={250}
                        stroke="#f97316"
                        strokeWidth={1.5}
                        opacity={0.5}
                      />
                    </g>
                  );
                })}
              </g>

              {/* 경쟁사 박스 (위) */}
              <g>
                <rect x={260} y={10} width={180} height={170} rx={8} fill="#3b82f6" opacity={0.1} stroke="#3b82f6" strokeWidth={2} strokeDasharray="5,5" />
                <text x={350} y={30} textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold">
                  동일 산업 (경쟁사)
                </text>
                
                {valueChainData.related.map((company, index) => {
                  const y = 60 + index * 55;
                  return (
                    <g key={`related-${index}`}>
                      <rect x={275} y={y} width={150} height={50} rx={6} fill="#18181b" stroke="#3b82f6" strokeWidth={1.5} strokeDasharray="3,3" />
                      <text x={350} y={y + 24} textAnchor="middle" fill="white" fontSize="15" fontWeight="500">
                        {company.name}
                      </text>
                      <text x={350} y={y + 40} textAnchor="middle" fill="#a1a1aa" fontSize="10">
                        {company.category}
                      </text>
                      {/* 연결선 */}
                      <line
                        x1={350}
                        y1={180}
                        x2={350}
                        y2={210}
                        stroke="#3b82f6"
                        strokeWidth={1.5}
                        strokeDasharray="5,5"
                        opacity={0.4}
                      />
                    </g>
                  );
                })}
              </g>

              {/* 중심 (중앙) */}
              <circle cx={350} cy={250} r={40} fill="#3b82f6" stroke="white" strokeWidth={3} />
              <text x={350} y={250} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="16" fontWeight="bold">
                {selectedStock.name}
              </text>

              {/* 하류 박스 (오른쪽) */}
              <g>
                <rect x={500} y={100} width={180} height={280} rx={8} fill="#10b981" opacity={0.1} stroke="#10b981" strokeWidth={2} />
                <text x={590} y={125} textAnchor="middle" fill="#10b981" fontSize="14" fontWeight="bold">
                  하류 (고객사)
                </text>
                
                {valueChainData.downstream.map((company, index) => {
                  const y = 160 + index * 70;
                  return (
                    <g key={`downstream-${index}`}>
                      <rect x={515} y={y} width={150} height={50} rx={6} fill="#18181b" stroke="#10b981" strokeWidth={1.5} />
                      <text x={590} y={y + 22} textAnchor="middle" fill="white" fontSize="15" fontWeight="500">
                        {company.name}
                      </text>
                      <text x={590} y={y + 40} textAnchor="middle" fill="#a1a1aa" fontSize="10">
                        {company.category}
                      </text>
                      {/* 연결선 */}
                      <line
                        x1={392}
                        y1={250}
                        x2={499}
                        y2={250}
                        stroke="#10b981"
                        strokeWidth={1.5}
                        opacity={0.4}
                      />
                    </g>
                  );
                })}
              </g>

              {/* 범례 */}
              <g transform="translate(250, 460)">
                <rect x={10} y={-10} width={12} height={12} fill="#f97316" opacity={0.3} stroke="#f97316" strokeWidth={1} />
                <text x={27} y={0} fill="#ffffffff" fontSize="12">상류</text>
                
                <rect x={70} y={-10} width={12} height={12} fill="#3b82f6" opacity={0.3} stroke="#3b82f6" strokeWidth={1} strokeDasharray="2,2" />
                <text x={87} y={0} fill="#ffffffff" fontSize="12">경쟁사</text>
                
                <rect x={140} y={-10} width={12} height={12} fill="#10b981" opacity={0.3} stroke="#10b981" strokeWidth={1} />
                <text x={157} y={0} fill="#ffffffff" fontSize="12">하류</text>
              </g>
            </svg>
          </PinchZoom>
        </div>
      </div>
    );
  };

  const renderMainTabContent = () => {
    if (!selectedStock) return null;

    switch (selectedMainTab) {
      case 'price':
        return (
          <div className="p-4 space-y-6">
            {/* 현재가 정보 */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-zinc-400 text-sm mb-1">현재가</div>
                  <div className="text-3xl mb-2">{selectedStock.price.toLocaleString()}원</div>
                  <div className="flex items-center gap-2">
                    <span className={`flex items-center gap-1 ${selectedStock.changePercent > 0 ? 'text-red-500' : 'text-blue-500'}`}>
                      {selectedStock.changePercent > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {selectedStock.changePercent > 0 ? '+' : ''}{selectedStock.change.toLocaleString()}원
                    </span>
                    <span className={selectedStock.changePercent > 0 ? 'text-red-500' : 'text-blue-500'}>
                      {selectedStock.changePercent > 0 ? '+' : ''}{selectedStock.changePercent}%
                    </span>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <div className="text-zinc-500">2025.10.17</div>
                  <div className="text-zinc-500">15:30 기준</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-700">
                <div>
                  <div className="text-zinc-500 text-sm">고가</div>
                  <div className="text-red-500">75,200원</div>
                </div>
                <div>
                  <div className="text-zinc-500 text-sm">저가</div>
                  <div className="text-blue-500">73,900원</div>
                </div>
                <div>
                  <div className="text-zinc-500 text-sm">거래량</div>
                  <div>15.2M</div>
                </div>
                <div>
                  <div className="text-zinc-500 text-sm">거래대금</div>
                  <div>1.13조</div>
                </div>
              </div>
            </div>

            {/* 차트 */}
            <div>
              <h3 className="text-sm text-zinc-400 mb-3">최근 2주 추이</h3>
              <div className="bg-zinc-900 rounded-2xl p-4">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={priceData}>
                      <XAxis 
                        dataKey="date" 
                        stroke="#71717a"
                        tick={{ fill: '#71717a', fontSize: 12 }}
                      />
                      <YAxis 
                        stroke="#71717a"
                        tick={{ fill: '#71717a', fontSize: 12 }}
                        domain={['dataMin - 1000', 'dataMax + 1000']}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#18181b', 
                          border: '1px solid #3f3f46',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6', r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        );

      case 'correlation':
        return (
          <div className="p-4">
            {/* 마인드맵 */}
            {renderCorrelationMindMap()}
            
            {/* 리스트 */}
            <div className="mb-4">
              <h3 className="text-sm text-zinc-400 mb-2">상관계수 높은 종목</h3>
              <p className="text-xs text-zinc-500">{selectedStock.name}와 주가 움직임이 유사한 종목들입니다</p>
            </div>
            <div className="space-y-3">
              {correlationData.map((stock) => (
                <button
                  key={stock.code}
                  onClick={() => {
                    const newStock = allStocks.find(s => s.code === stock.code);
                    if (newStock) handleStockSelect(newStock);
                  }}
                  className="w-full bg-zinc-900 rounded-xl p-4 hover:bg-zinc-800 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span>{stock.name}</span>
                        <span className="text-xs text-zinc-500">{stock.code}</span>
                      </div>
                      <div className="text-sm text-zinc-400">{stock.price}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm ${stock.positive ? 'text-red-500' : 'text-blue-500'}`}>
                        {stock.change}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${stock.correlation * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-blue-400 font-mono">
                      {stock.correlation.toFixed(2)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );


      case 'keywords':
        return (
          <div className="p-4">
            {/* 워드맵 */}
            {renderKeywordWordMap()}
            
            {/* 리스트 */}
            <div className="mb-4">
              <h3 className="text-sm text-zinc-400 mb-2">최근 30일 연관 키워드</h3>
              <p className="text-xs text-zinc-500">뉴스, SNS에서 함께 언급된 키워드입니다</p>
            </div>
            <div className="space-y-2">
              {keywords.map((keyword, index) => (
                <div key={index} className="bg-zinc-900 rounded-xl p-4 flex items-center justify-between hover:bg-zinc-800 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="text-zinc-500 text-sm w-6">{index + 1}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span>{keyword.text}</span>
                        {keyword.trend === 'up' && (
                          <div className="w-4 h-4 rounded bg-red-500/20 flex items-center justify-center">
                            <span className="text-red-500 text-xs">↑</span>
                          </div>
                        )}
                        {keyword.trend === 'down' && (
                          <div className="w-4 h-4 rounded bg-blue-500/20 flex items-center justify-center">
                            <span className="text-blue-500 text-xs">↓</span>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">
                        언급 {keyword.count.toLocaleString()}회
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-20 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i}
                          className="w-1 bg-blue-500/50 mx-0.5 rounded-full"
                          style={{ 
                            height: `${Math.random() * 100}%`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'valuechain':
        return (
          <div className="p-4 space-y-6">
            {/* 마인드맵 */}
            {renderValueChainMindMap()}
            
            {/* 리스트 */}
            {/* Upstream */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <h3 className="text-sm">상류 (공급업체)</h3>
              </div>
              <div className="space-y-2">
                {valueChainData.upstream.map((company, index) => (
                  <div key={index} className="bg-zinc-900 rounded-xl p-4 border-l-2 border-orange-500">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="mb-1">{company.name}</div>
                        <div className="text-xs text-zinc-500">{company.category}</div>
                      </div>
                      <div className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded">
                        {company.relation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <h3 className="text-sm">동일 산업 (경쟁사)</h3>
              </div>
              <div className="space-y-2">
                {valueChainData.related.map((company, index) => (
                  <div key={index} className="bg-zinc-900 rounded-xl p-4 border-l-2 border-blue-500">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="mb-1">{company.name}</div>
                        <div className="text-xs text-zinc-500">{company.category}</div>
                      </div>
                      <div className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                        {company.relation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Downstream */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <h3 className="text-sm">하류 (고객사)</h3>
              </div>
              <div className="space-y-2">
                {valueChainData.downstream.map((company, index) => (
                  <div key={index} className="bg-zinc-900 rounded-xl p-4 border-l-2 border-green-500">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="mb-1">{company.name}</div>
                        <div className="text-xs text-zinc-500">{company.category}</div>
                      </div>
                      <div className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                        {company.relation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderFinancialTabContent = () => {
    if (!selectedStock) return null;

    switch (selectedFinancialTab) {
      case 'revenue':
        return (
          <div className="p-4 space-y-6">
            <div className="mb-4">
              <h3 className="text-sm text-zinc-400 mb-2">사업부문별 매출 비중</h3>
              <p className="text-xs text-zinc-500">2024년 3분기 기준</p>
            </div>

            {/* 도넛 차트 */}
            <div className="bg-zinc-900 rounded-2xl p-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={revenueData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {revenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#e0e0e0ff', 
                        border: '1px solid #3f3f46',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                      formatter={(value: number) => `${value}%`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* 범례 */}
              <div className="space-y-2 mt-4">
                {revenueData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 상세 설명 */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <div className="text-sm text-zinc-300 leading-relaxed">
                <p className="mb-2">반도체 부문이 전체 매출의 58.2%를 차지하며 주력 사업으로 자리잡고 있습니다.</p>
                <p>모바일(IM) 부문은 24.5%로 두 번째로 큰 비중을 차지하고 있습니다.</p>
              </div>
            </div>
          </div>
        );

      case 'income':
        return (
          <div className="p-4 space-y-6">
            <div className="mb-4">
              <h3 className="text-sm text-zinc-400 mb-2">분기별 손익계산서</h3>
              <p className="text-xs text-zinc-500">단위: 조원</p>
            </div>

            {/* 바 차트 */}
            <div className="bg-zinc-900 rounded-2xl p-4">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incomeData}>
                    <XAxis 
                      dataKey="quarter" 
                      stroke="#71717a"
                      tick={{ fill: '#71717a', fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="#71717a"
                      tick={{ fill: '#71717a', fontSize: 12 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#18181b', 
                        border: '1px solid #3f3f46',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                      formatter={(value: number) => `${value}조원`}
                    />
                    <Legend 
                      wrapperStyle={{ color: '#a1a1aa' }}
                      formatter={(value) => {
                        const labels: { [key: string]: string } = {
                          revenue: '매출액',
                          operatingProfit: '영업이익',
                          netIncome: '당기순이익'
                        };
                        return labels[value] || value;
                      }}
                    />
                    <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="operatingProfit" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="netIncome" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 주요 지표 */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-zinc-900 rounded-xl p-4">
                <div className="text-xs text-zinc-500 mb-1">최근 분기 매출</div>
                <div className="text-lg text-blue-400">74.07조</div>
                <div className="text-xs text-red-500 mt-1">+3.0% QoQ</div>
              </div>
              <div className="bg-zinc-900 rounded-xl p-4">
                <div className="text-xs text-zinc-500 mb-1">영업이익</div>
                <div className="text-lg text-purple-400">10.44조</div>
                <div className="text-xs text-red-500 mt-1">+57.2% QoQ</div>
              </div>
              <div className="bg-zinc-900 rounded-xl p-4">
                <div className="text-xs text-zinc-500 mb-1">순이익</div>
                <div className="text-lg text-green-400">9.90조</div>
                <div className="text-xs text-red-500 mt-1">+49.7% QoQ</div>
              </div>
            </div>

            {/* 인사이트 */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
              <div className="text-sm text-zinc-300 leading-relaxed">
                <p className="mb-2">2023년 하반기부터 반도체 시장 회복세에 힘입어 실적이 개선되고 있습니다.</p>
                <p>특히 HBM 등 AI 반도체 수요 증가가 영업이익 개선의 주요 요인입니다.</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-black/95 backdrop-blur-sm border-b border-zinc-800 z-10">
        <div className="p-4">
          <h1 className="text-xl mb-4">종목 알아보기</h1>
          
          {/* Search Bar */}
          <div className="bg-zinc-900 rounded-xl p-3 flex items-center gap-3 mb-4">
            <Search className="w-5 h-5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleSearchFocus}
              placeholder="종목명 또는 종목코드 검색"
              className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-500"
            />
            {selectedStock && !showSearchResults && (
              <button
                onClick={handleClearSelection}
                className="text-zinc-500 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Selected Stock */}
          {selectedStock && !showSearchResults && (
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-3 border border-blue-500/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    {selectedStock.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span>{selectedStock.name}</span>
                      <span className="text-xs text-zinc-500">{selectedStock.code}</span>
                    </div>
                    <div className="text-xs text-zinc-400">{selectedStock.market}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Search Results or Content */}
      {showSearchResults ? (
        <div className="flex-1 overflow-auto p-4">
          {filteredStocks.length > 0 ? (
            <div className="space-y-2">
              {filteredStocks.map((stock) => {
                const isPositive = stock.changePercent > 0;
                return (
                  <button
                    key={stock.code}
                    onClick={() => handleStockSelect(stock)}
                    className="w-full bg-zinc-900 rounded-xl p-4 flex items-center justify-between hover:bg-zinc-800 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 text-left">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isPositive ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'
                      }`}>
                        {stock.name.charAt(0)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="truncate">{stock.name}</span>
                          <span className="text-xs text-zinc-500 shrink-0">{stock.code}</span>
                        </div>
                        <div className="text-xs text-zinc-500">{stock.market}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm mb-1">{stock.price.toLocaleString()}원</div>
                      <div className={`text-xs flex items-center justify-end gap-1 ${
                        isPositive ? 'text-red-500' : 'text-blue-500'
                      }`}>
                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {isPositive ? '+' : ''}{stock.changePercent}%
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-zinc-500">검색 결과가 없습니다</p>
            </div>
          )}
        </div>
      ) : selectedStock ? (
        <div className="flex-1 overflow-auto">
          {/* Main Tabs */}
          <div className="border-b-8 border-zinc-900">
            <div className="px-4 flex gap-1 overflow-x-auto scrollbar-hide">
              {mainTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedMainTab(tab.id as MainTabType)}
                  className={`px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                    selectedMainTab === tab.id
                      ? 'text-blue-500 border-b-2 border-blue-500'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Tab Content */}
          <div className="border-b-8 border-zinc-900">
            {renderMainTabContent()}
          </div>

          {/* Financial Tabs */}
          <div className="border-b border-zinc-800 z-10">
            <div className="px-4 flex gap-1 overflow-x-auto scrollbar-hide">
              {financialTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFinancialTab(tab.id as FinancialTabType)}
                  className={`px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                    selectedFinancialTab === tab.id
                      ? 'text-purple-500 border-b-2 border-purple-500'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Financial Tab Content */}
          <div className="border-b-8 border-zinc-900">
            {renderFinancialTabContent()}
          </div>

          {/* Stock News Section */}
          <div className="bg-zinc-900/50 p-4">
            <h3 className="text-sm text-zinc-400 mb-3">
              {selectedStock.name} 관련 뉴스
            </h3>
            <div className="space-y-2">
              {stockNews.map((news, index) => (
                <button
                  key={index}
                  className="w-full bg-zinc-900 rounded-xl p-3 hover:bg-zinc-800 transition-colors text-left"
                >
                  <div className="text-sm mb-2 leading-relaxed">{news.title}</div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded">
                      {news.category}
                    </span>
                    <span>{news.source}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {news.time}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-zinc-900 flex items-center justify-center">
              <Search className="w-10 h-10 text-zinc-600" />
            </div>
            <h3 className="text-lg mb-2">종목을 검색해보세요</h3>
            <p className="text-sm text-zinc-500">
              종목명이나 종목코드를 입력하면<br/>
              상세한 분석 정보를 확인할 수 있습니다
            </p>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
