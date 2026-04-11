import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import AdBanner from '@/components/AdBanner';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  time: string;
}

const QUICK_TOPICS = [
  'Иммунитет', 'Сон', 'Питание', 'Витамины',
  'Спорт', 'Стресс', 'Простуда', 'Сердце',
];

const MOCK_PREVENTION = `Отличный вопрос! Вот персональные рекомендации:

**🛡️ Укрепление иммунитета:**
• Витамин D3 — 2000 МЕ/день (осенью-зимой)
• Витамин С — 500–1000 мг в день
• Цинк — 10–15 мг в день

**🥗 Питание:**
• 5 порций овощей и фруктов ежедневно
• Ограничьте сахар и белую муку
• Вода — 30 мл на кг веса тела

**😴 Сон:**
• 7–9 часов качественного сна
• Ложитесь до 23:00 — пик восстановления
• За час до сна — без экранов

**🏃 Активность:**
• 30 мин умеренной нагрузки 5 раз в неделю
• Прогулки на свежем воздухе ежедневно

**⏱️ Результат:** заметен через 2–4 недели`;

function getTime() {
  return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
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

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0">
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

export default function PreventionPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'ai',
      text: 'Привет! 🌿 Я помогу выстроить систему профилактики. Что вас интересует — иммунитет, питание, сон, физическая активность?',
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', text: MOCK_PREVENTION, time: getTime() };
      setMessages(prev => [...prev, aiMsg]);
    }, 2000);
  };

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
  };

  return (
    <div className="flex flex-col bg-background" style={{ height: '100dvh' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 px-5 safe-top pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
            <Icon name="ShieldCheck" fallback="Shield" size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-base leading-none">Профилактика</h1>
            <p className="text-white/70 text-xs mt-0.5">Советы как не заболеть</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-300 pulse-green" />
            <span className="text-white/70 text-xs">онлайн</span>
          </div>
        </div>
      </div>

      {/* Quick topics */}
      <div className="px-4 py-2.5 flex-shrink-0 bg-white border-b border-border">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {QUICK_TOPICS.map((s) => (
            <button
              key={s}
              onClick={() => sendMessage(`Расскажи про профилактику: ${s}`)}
              className="flex-shrink-0 text-xs px-3 py-2 rounded-full bg-violet-50 text-violet-700 border border-violet-200 hover:bg-violet-500 hover:text-white transition-colors duration-150 font-medium whitespace-nowrap touch-target flex items-center"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.map((msg, idx) => (
          <div key={msg.id}>
            {msg.role === 'ai' && idx > 0 && idx % 4 === 0 && (
              <div className="my-3 -mx-4">
                <AdBanner size="small" />
              </div>
            )}
            <div className={`flex items-end gap-2 mb-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0">
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
            placeholder="Спросите про профилактику..."
            rows={1}
            className="flex-1 resize-none rounded-2xl border border-border bg-secondary px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300 leading-relaxed overflow-hidden"
            style={{ minHeight: '48px', maxHeight: '100px' }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0 disabled:opacity-40 active:scale-95 transition-transform"
          >
            <Icon name="Send" fallback="ArrowRight" size={18} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
