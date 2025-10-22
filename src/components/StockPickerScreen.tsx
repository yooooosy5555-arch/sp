import { useState } from 'react';
import { Search, Plus, Check, TrendingUp, TrendingDown, X } from 'lucide-react';
import { Button } from './ui/button';

interface Stock {
  code: string;
  name: string;
  nameEn: string;
  market: string;
  price: number;
  change: number;
  changePercent: number;
  selected: boolean;
}

interface StockPickerScreenProps {
  onComplete: (stocks: Stock[]) => void;
  onSkip: () => void;
}

export function StockPickerScreen({ onComplete, onSkip }: StockPickerScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStocks, setSelectedStocks] = useState<Stock[]>([]);
  
  const allStocks: Stock[] = [
    { code: '005930', name: '삼성전자', nameEn: 'Samsung Electronics', market: 'KOSPI', price: 74800, change: 2800, changePercent: 3.88, selected: false },
    { code: '000660', name: 'SK하이닉스', nameEn: 'SK hynix', market: 'KOSPI', price: 125000, change: 4000, changePercent: 3.31, selected: false },
    { code: '035420', name: '네이버', nameEn: 'NAVER', market: 'KOSPI', price: 210000, change: 1700, changePercent: 0.82, selected: false },
    { code: '035720', name: '카카오', nameEn: 'Kakao', market: 'KOSPI', price: 48500, change: -500, changePercent: -1.02, selected: false },
    { code: '051910', name: 'LG화학', nameEn: 'LG Chem', market: 'KOSPI', price: 385000, change: -2000, changePercent: -0.52, selected: false },
    { code: '006400', name: '삼성SDI', nameEn: 'Samsung SDI', market: 'KOSPI', price: 385000, change: 3000, changePercent: 0.78, selected: false },
    { code: '207940', name: '삼성바이오로직스', nameEn: 'Samsung Biologics', market: 'KOSPI', price: 820000, change: 5000, changePercent: 0.61, selected: false },
    { code: '068270', name: '셀트리온', nameEn: 'Celltrion', market: 'KOSPI', price: 185000, change: -1500, changePercent: -0.80, selected: false },
    { code: 'AAPL', name: 'Apple Inc.', nameEn: 'Apple Inc.', market: 'NASDAQ', price: 239200, change: 4920, changePercent: 2.10, selected: false },
    { code: 'TSLA', name: 'Tesla Inc.', nameEn: 'Tesla Inc.', market: 'NASDAQ', price: 231250, change: -3475, changePercent: -1.48, selected: false },
    { code: 'GOOGL', name: 'Alphabet Inc.', nameEn: 'Alphabet Inc.', market: 'NASDAQ', price: 140830, change: 1117, changePercent: 0.80, selected: false },
    { code: 'MSFT', name: 'Microsoft', nameEn: 'Microsoft Corporation', market: 'NASDAQ', price: 428650, change: 8573, changePercent: 2.04, selected: false },
  ];

  const filteredStocks = searchQuery
    ? allStocks.filter(stock => 
        stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.code.includes(searchQuery)
      )
    : allStocks;

  const toggleStock = (stock: Stock) => {
    if (selectedStocks.find(s => s.code === stock.code)) {
      setSelectedStocks(selectedStocks.filter(s => s.code !== stock.code));
    } else {
      setSelectedStocks([...selectedStocks, stock]);
    }
  };

  const removeStock = (code: string) => {
    setSelectedStocks(selectedStocks.filter(s => s.code !== code));
  };

  const handleComplete = () => {
    onComplete(selectedStocks);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl">종목 담기</h1>
          <button 
            onClick={onSkip}
            className="text-sm text-zinc-500 hover:text-white"
          >
            건너뛰기
          </button>
        </div>
        <p className="text-sm text-zinc-500">
          관심있는 종목을 선택하여 포트폴리오를 구성하세요
        </p>
      </div>

      {/* Selected Stocks */}
      {selectedStocks.length > 0 && (
        <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-zinc-400">선택한 종목</span>
            <span className="text-sm text-blue-500">{selectedStocks.length}개</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedStocks.map((stock) => (
              <div
                key={stock.code}
                className="flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-lg px-3 py-1.5"
              >
                <span className="text-sm">{stock.name}</span>
                <button
                  onClick={() => removeStock(stock.code)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="p-4 border-b border-zinc-800">
        <div className="bg-zinc-900 rounded-xl p-3 flex items-center gap-3">
          <Search className="w-5 h-5 text-zinc-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="종목명, 종목코드로 검색"
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-zinc-500"
          />
        </div>
      </div>

      {/* Stock List */}
      <div className="flex-1 overflow-auto p-4 pb-24">
        <div className="space-y-2">
          {filteredStocks.map((stock) => {
            const isSelected = selectedStocks.find(s => s.code === stock.code);
            const isPositive = stock.change > 0;
            
            return (
              <button
                key={stock.code}
                onClick={() => toggleStock(stock)}
                className={`w-full bg-zinc-900 rounded-xl p-4 flex items-center justify-between hover:bg-zinc-800 transition-colors ${
                  isSelected ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex items-center gap-3 flex-1 text-left">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-blue-500' : isPositive ? 'bg-red-500/20' : 'bg-blue-500/20'
                  }`}>
                    {isSelected ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <span className={isPositive ? 'text-red-500' : 'text-blue-500'}>
                        {stock.name.charAt(0)}
                      </span>
                    )}
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
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-900/95 backdrop-blur-lg border-t border-zinc-800">
        <div className="mx-auto max-w-md">
          <Button
            onClick={handleComplete}
            disabled={selectedStocks.length === 0}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl py-6 shadow-lg shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selectedStocks.length > 0 
              ? `${selectedStocks.length}개 종목 추가하기`
              : '종목을 선택해주세요'
            }
          </Button>
        </div>
      </div>
    </div>
  );
}
