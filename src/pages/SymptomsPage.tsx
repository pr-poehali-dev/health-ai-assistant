import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  time: string;
}

const QUICK_SYMPTOMS = [
  'Головная боль', 'Температура', 'Кашель', 'Боль в горле',
  'Насморк', 'Боль в животе', 'Тошнота', 'Усталость',
];

const MOCK_RESPONSES: Record<string, string> = {
  default: `На основе описанных симптомов, вот мои рекомендации:

**🔍 Предварительная оценка:**
Симптомы указывают на возможное ОРВИ или лёгкое воспаление. Без осмотра врача точный диагноз невозможен.

**💊 Рекомендуемые препараты:**
• Парацетамол 500мг — при температуре и боли (3–4 раза в день)
• Ибупрофен 400мг — снятие воспаления (с едой)
• Витамин С 1000мг — поддержка иммунитета

**🌿 Домашнее лечение:**
• Постельный режим 1–2 дня
• Обильное тёплое питьё (1.5–2 л в день)
• Тёплые ингаляции с ромашкой или шалфеем
• Проветривать помещение каждые 2–3 часа

**⏱️ Ожидаемое время выздоровления:**
3–7 дней при соблюдении режима

**⚠️ Обратитесь к врачу, если:**
Температура выше 39°C держится более 3 дней, или появилась сильная боль в груди`,
};

function getTime() {
  return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-4">
      <div className="w-8 h-8 rounded-full health-gradient flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xs">ИИ</span>
      </div>
      <div className="msg-bubble-ai px-4 py-3">
        <div className="flex gap-1 items-center h-4">
          <div className="typing-dot w-2 h-2 rounded-full bg-gray-400" />
          <div className="typing-dot w-2 h-2 rounded-full bg-gray-400" />
          <div className="typing-dot w-2 h-2 rounded-full bg-gray-400" />
        </div>
      </div>
    </div>
  );
}

function formatAIText(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="font-semibold text-foreground mt-2 mb-1">{line.replace(/\*\*/g, '')}</p>;
    }
    if (line.startsWith('•')) {
      return <p key={i} className="text-sm text-foreground/85 ml-2">• {line.slice(1).trim()}</p>;
    }
    if (line.trim() === '') return <div key={i} className="h-1" />;
    return <p key={i} className="text-sm text-foreground/85">{line}</p>;
  });
}

export default function SymptomsPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'ai',
      text: 'Здравствуйте! 👋 Опишите ваши симптомы как можно подробнее — что беспокоит, как давно, есть ли температура. Я помогу разобраться и подберу рекомендации.',
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: text.trim(), time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: MOCK_RESPONSES.default,
        time: getTime(),
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 2200);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="health-gradient px-5 pt-12 pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
            <Icon name="Stethoscope" fallback="Activity" size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg leading-none">Анализ симптомов</h1>
            <p className="text-white/70 text-xs mt-0.5">ИИ-диагностика • онлайн</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-300 pulse-green" />
            <span className="text-white/70 text-xs">активен</span>
          </div>
        </div>
      </div>

      {/* Quick symptoms */}
      <div className="px-4 py-3 flex-shrink-0 bg-white border-b border-border">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {QUICK_SYMPTOMS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-150 font-medium"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 mb-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            {msg.role === 'ai' && (
              <div className="w-8 h-8 rounded-full health-gradient flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-semibold">ИИ</span>
              </div>
            )}
            <div className={`max-w-[82%] ${msg.role === 'user' ? 'msg-bubble-user px-4 py-2.5' : 'msg-bubble-ai px-4 py-3'}`}>
              {msg.role === 'ai' ? (
                <div>{formatAIText(msg.text)}</div>
              ) : (
                <p className="text-sm">{msg.text}</p>
              )}
              <p className={`text-xs mt-1.5 ${msg.role === 'user' ? 'text-white/60 text-right' : 'text-muted-foreground'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-border flex-shrink-0 pb-28">
        <div className="flex gap-2 items-end">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            placeholder="Опишите симптомы подробно..."
            rows={1}
            className="flex-1 resize-none rounded-2xl border border-border bg-secondary px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[44px] max-h-[100px] leading-relaxed"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="w-11 h-11 rounded-2xl health-gradient flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:opacity-90 active:scale-95 transition-all"
          >
            <Icon name="Send" fallback="ArrowRight" size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
