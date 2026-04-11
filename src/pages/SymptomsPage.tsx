import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import AdBanner from '@/components/AdBanner';

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

const MOCK_RESPONSE = `На основе описанных симптомов, вот мои рекомендации:

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

**⏱️ Выздоровление:** 3–7 дней при соблюдении режима

**⚠️ К врачу, если:** температура выше 39°C держится более 3 дней`;

function getTime() {
  return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-8 h-8 rounded-full health-gradient flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xs font-semibold">ИИ</span>
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
      return <p key={i} className="font-semibold text-foreground mt-2 mb-1 text-sm">{line.replace(/\*\*/g, '')}</p>;
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
      text: 'Здравствуйте! 👋 Опишите симптомы подробнее — что беспокоит, как давно, есть ли температура. Я помогу разобраться.',
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: text.trim(), time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setMsgCount(c => c + 1);
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', text: MOCK_RESPONSE, time: getTime() };
      setMessages(prev => [...prev, aiMsg]);
    }, 2200);
  };

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
  };

  return (
    <div className="flex flex-col bg-background" style={{ height: '100dvh' }}>
      {/* Header */}
      <div className="health-gradient px-5 safe-top pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
            <Icon name="Stethoscope" fallback="Activity" size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-base leading-none">Анализ симптомов</h1>
            <p className="text-white/70 text-xs mt-0.5">ИИ-диагностика</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-300 pulse-green" />
            <span className="text-white/70 text-xs">онлайн</span>
          </div>
        </div>
      </div>

      {/* Quick symptoms */}
      <div className="px-4 py-2.5 flex-shrink-0 bg-white border-b border-border">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {QUICK_SYMPTOMS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              className="flex-shrink-0 text-xs px-3 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-150 font-medium whitespace-nowrap touch-target flex items-center"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {messages.map((msg, idx) => (
          <div key={msg.id}>
            {/* Рекламный блок после каждого 4-го сообщения AI */}
            {msg.role === 'ai' && idx > 0 && idx % 4 === 0 && (
              <div className="my-3 -mx-4">
                <AdBanner size="small" />
              </div>
            )}
            <div className={`flex items-end gap-2 mb-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full health-gradient flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-semibold">ИИ</span>
                </div>
              )}
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'msg-bubble-user px-4 py-2.5' : 'msg-bubble-ai px-4 py-3'}`}>
                {msg.role === 'ai' ? <div>{formatAIText(msg.text)}</div> : <p className="text-sm">{msg.text}</p>}
                <p className={`text-xs mt-1.5 ${msg.role === 'user' ? 'text-white/60 text-right' : 'text-muted-foreground'}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={bottomRef} className="h-1" />
      </div>

      {/* Input */}
      <div className="px-4 pt-3 bg-white border-t border-border flex-shrink-0 safe-bottom">
        <div className="flex gap-2 items-end mb-16">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextarea}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            placeholder="Опишите симптомы..."
            rows={1}
            className="flex-1 resize-none rounded-2xl border border-border bg-secondary px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 leading-relaxed overflow-hidden"
            style={{ minHeight: '48px', maxHeight: '100px' }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 rounded-2xl health-gradient flex items-center justify-center flex-shrink-0 disabled:opacity-40 active:scale-95 transition-transform"
          >
            <Icon name="Send" fallback="ArrowRight" size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
