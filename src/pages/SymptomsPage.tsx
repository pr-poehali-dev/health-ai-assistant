import { useState, useRef, useEffect, useCallback } from 'react';
import Icon from '@/components/ui/icon';
import { useLang } from '@/lib/LanguageContext';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  time: string;
}

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

function getTime() {
  return new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3">
      <div className="w-8 h-8 rounded-full health-gradient flex items-center justify-center flex-shrink-0">
        <span className="text-white text-xs font-semibold">AI</span>
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
  const { t, lang } = useLang();

  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'ai', text: t.symptoms_greeting, time: getTime() },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
  const micSupported = !!SpeechRecognitionAPI;

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
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'ai', text: t.symptoms_mock, time: getTime() };
      setMessages(prev => [...prev, aiMsg]);
    }, 2200);
  };

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
  };

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    if (!micSupported) { setMicError(true); return; }
    setMicError(false);

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = lang === 'ru' ? 'ru-RU' : 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;
    recognitionRef.current = recognition;

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      let transcript = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        transcript += e.results[i][0].transcript;
      }
      setInput(transcript);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 100) + 'px';
      }
    };

    recognition.onend = () => {
      setIsListening(false);
      recognitionRef.current = null;
    };

    recognition.onerror = () => {
      setIsListening(false);
      setMicError(true);
      recognitionRef.current = null;
    };

    recognition.start();
  }, [lang, micSupported, SpeechRecognitionAPI]);

  const toggleMic = () => {
    if (isListening) stopListening();
    else startListening();
  };

  return (
    <div className="flex flex-col bg-background" style={{ height: '100dvh' }}>
      <div className="health-gradient px-5 safe-top pb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
            <Icon name="Stethoscope" fallback="Activity" size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-base leading-none">{t.symptoms_title}</h1>
            <p className="text-white/70 text-xs mt-0.5">{t.symptoms_subtitle}</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-green-300 pulse-green" />
            <span className="text-white/70 text-xs">{t.symptoms_online}</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-2.5 flex-shrink-0 bg-white border-b border-border">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {(t.symptoms_quick as readonly string[]).map((s) => (
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

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {messages.map((msg) => (
          <div key={msg.id}>
            <div className={`flex items-end gap-2 mb-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.role === 'ai' && (
                <div className="w-8 h-8 rounded-full health-gradient flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-semibold">AI</span>
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

      {/* Подсказка при записи */}
      {isListening && (
        <div className="mx-4 mb-2 flex items-center gap-2 px-4 py-2.5 bg-red-50 border border-red-200 rounded-2xl flex-shrink-0">
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
          </span>
          <span className="text-sm text-red-600 font-medium">{t.symptoms_mic_listening}</span>
          <span className="text-xs text-red-400 ml-auto truncate max-w-[60%]">{input || '…'}</span>
        </div>
      )}

      {micError && (
        <div className="mx-4 mb-2 flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-2xl flex-shrink-0">
          <Icon name="AlertTriangle" fallback="Alert" size={15} className="text-amber-500 flex-shrink-0" />
          <span className="text-sm text-amber-700">{t.symptoms_mic_error}</span>
        </div>
      )}

      <div className="px-4 pt-3 bg-white border-t border-border flex-shrink-0 safe-bottom">
        <div className="flex gap-2 items-end mb-16">
          {/* Кнопка микрофона */}
          {micSupported && (
            <button
              onClick={toggleMic}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                isListening
                  ? 'bg-red-500 scale-110 shadow-lg shadow-red-200'
                  : 'bg-secondary hover:bg-secondary/80 active:scale-95'
              }`}
            >
              <Icon
                name={isListening ? 'MicOff' : 'Mic'}
                fallback="Mic"
                size={18}
                className={isListening ? 'text-white' : 'text-muted-foreground'}
              />
            </button>
          )}

          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextarea}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            placeholder={isListening ? t.symptoms_mic_listening : t.symptoms_placeholder}
            rows={1}
            className="flex-1 resize-none rounded-2xl border border-border bg-secondary px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 leading-relaxed overflow-hidden"
            style={{ minHeight: '48px', maxHeight: '100px' }}
          />
          <button
            onClick={() => { if (isListening) stopListening(); sendMessage(input); }}
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
