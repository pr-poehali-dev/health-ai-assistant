import { useState } from 'react';
import Icon from '@/components/ui/icon';

const AI_MODELS = [
  { id: 'gpt4', name: 'ChatGPT-4o', desc: 'OpenAI — лучший для анализа', tag: 'Популярный', tagColor: 'bg-emerald-100 text-emerald-700' },
  { id: 'deepseek', name: 'DeepSeek R1', desc: 'Глубокий анализ медданных', tag: 'Умный', tagColor: 'bg-blue-100 text-blue-700' },
  { id: 'claude', name: 'Claude 3.5', desc: 'Anthropic — точные ответы', tag: 'Точный', tagColor: 'bg-violet-100 text-violet-700' },
  { id: 'gemini', name: 'Gemini Pro', desc: 'Google — анализ фото', tag: 'Для фото', tagColor: 'bg-orange-100 text-orange-700' },
];

export default function ProfilePage() {
  const [selectedModel, setSelectedModel] = useState('gpt4');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen leaf-bg pb-nav">
      {/* Header */}
      <div className="health-gradient px-5 safe-top pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
            <Icon name="User" fallback="UserCircle" size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-xl">{name || 'Ваш профиль'}</h1>
            <p className="text-white/70 text-sm mt-0.5">Настройки ИИ-помощника</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 space-y-4">
        {/* Personal info */}
        <div className="glass-card rounded-3xl p-5">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-sm">
            <Icon name="UserCircle" fallback="User" size={18} className="text-primary" />
            Личные данные
          </h2>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Имя</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Как вас зовут?"
                className="w-full rounded-2xl border border-border bg-secondary px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 touch-target"
                style={{ minHeight: '48px' }}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground font-medium mb-1.5 block">Возраст</label>
              <input
                value={age}
                onChange={e => setAge(e.target.value)}
                placeholder="Сколько лет?"
                type="number"
                inputMode="numeric"
                className="w-full rounded-2xl border border-border bg-secondary px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 touch-target"
                style={{ minHeight: '48px' }}
              />
            </div>
          </div>
        </div>

        {/* AI Model selection */}
        <div className="glass-card rounded-3xl p-5">
          <h2 className="font-semibold text-foreground mb-1 flex items-center gap-2 text-sm">
            <Icon name="Bot" fallback="Cpu" size={18} className="text-primary" />
            Модель ИИ
          </h2>
          <p className="text-xs text-muted-foreground mb-4">Выберите ИИ для консультаций</p>
          <div className="space-y-2.5">
            {AI_MODELS.map((model) => (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 touch-target ${
                  selectedModel === model.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-white/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      selectedModel === model.id ? 'border-primary bg-primary' : 'border-muted-foreground'
                    }`}>
                      {selectedModel === model.id && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div className="min-w-0">
                      <span className="font-semibold text-foreground text-sm">{model.name}</span>
                      <p className="text-muted-foreground text-xs truncate">{model.desc}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${model.tagColor}`}>
                    {model.tag}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="glass-card rounded-3xl p-5">
          <h2 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-sm">
            <Icon name="Settings" fallback="Cog" size={18} className="text-primary" />
            Настройки
          </h2>
          <button
            onClick={() => setNotifications(!notifications)}
            className="w-full flex items-center justify-between p-4 bg-secondary rounded-2xl touch-target"
          >
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">Уведомления</p>
              <p className="text-xs text-muted-foreground mt-0.5">Советы по здоровью</p>
            </div>
            <div className={`w-12 h-6 rounded-full transition-all duration-200 relative flex-shrink-0 ${
              notifications ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}>
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${
                notifications ? 'left-6' : 'left-0.5'
              }`} />
            </div>
          </button>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-4">
          <div className="flex gap-3">
            <Icon name="AlertTriangle" fallback="Info" size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">Медицинский дисклеймер</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                МедИИ предоставляет информационные рекомендации и не заменяет консультацию врача.
                В экстренных ситуациях: <strong>103</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-300 touch-target ${
            saved ? 'bg-green-500 text-white' : 'health-gradient text-white active:opacity-90 active:scale-[0.98]'
          }`}
        >
          {saved ? '✓ Сохранено!' : 'Сохранить настройки'}
        </button>
      </div>
    </div>
  );
}