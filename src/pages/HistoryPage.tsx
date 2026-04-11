import Icon from '@/components/ui/icon';

interface HistoryItem {
  id: string;
  type: 'symptoms' | 'photo' | 'prevention';
  title: string;
  preview: string;
  date: string;
  result: string;
}

const MOCK_HISTORY: HistoryItem[] = [
  {
    id: '1',
    type: 'symptoms',
    title: 'Анализ симптомов',
    preview: 'Головная боль, температура 37.5',
    date: '11 апр, 14:32',
    result: 'ОРВИ, лёгкая форма',
  },
  {
    id: '2',
    type: 'photo',
    title: 'Фото раны',
    preview: 'Ссадина на колене',
    date: '10 апр, 09:15',
    result: 'Поверхностная ссадина',
  },
  {
    id: '3',
    type: 'prevention',
    title: 'Профилактика',
    preview: 'Как укрепить иммунитет',
    date: '9 апр, 20:44',
    result: 'Получены рекомендации',
  },
  {
    id: '4',
    type: 'symptoms',
    title: 'Анализ симптомов',
    preview: 'Боль в горле, насморк',
    date: '7 апр, 11:20',
    result: 'Фарингит',
  },
];

const typeConfig = {
  symptoms: {
    icon: 'Stethoscope',
    color: 'bg-emerald-100 text-emerald-600',
    label: 'Симптомы',
    labelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  photo: {
    icon: 'Camera',
    color: 'bg-blue-100 text-blue-600',
    label: 'Фото',
    labelColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  prevention: {
    icon: 'ShieldCheck',
    color: 'bg-violet-100 text-violet-600',
    label: 'Профилактика',
    labelColor: 'bg-violet-50 text-violet-700 border-violet-200',
  },
};

export default function HistoryPage() {
  return (
    <div className="min-h-screen leaf-bg pb-28">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-5 pt-12 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
            <Icon name="ClockIcon" fallback="History" size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg leading-none">История консультаций</h1>
            <p className="text-white/70 text-xs mt-0.5">{MOCK_HISTORY.length} записи</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { icon: 'Stethoscope', label: 'Симптомов', count: 2, color: 'text-emerald-600 bg-emerald-50' },
            { icon: 'Camera', label: 'Фото', count: 1, color: 'text-blue-600 bg-blue-50' },
            { icon: 'ShieldCheck', label: 'Советов', count: 1, color: 'text-violet-600 bg-violet-50' },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-3 text-center">
              <div className={`w-8 h-8 rounded-xl ${s.color} flex items-center justify-center mx-auto mb-1.5`}>
                <Icon name={s.icon} fallback="Circle" size={16} className={s.color.split(' ')[0]} />
              </div>
              <div className="font-bold text-foreground text-xl leading-none">{s.count}</div>
              <div className="text-muted-foreground text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* List */}
        <h2 className="font-semibold text-foreground mb-3">Последние консультации</h2>
        <div className="space-y-3">
          {MOCK_HISTORY.map((item, i) => {
            const cfg = typeConfig[item.type];
            return (
              <div
                key={item.id}
                className="glass-card rounded-3xl p-4 flex gap-3 hover:shadow-md transition-shadow duration-200"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                  <Icon name={cfg.icon} fallback="Circle" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-semibold text-foreground text-sm">{item.title}</span>
                      <p className="text-muted-foreground text-xs mt-0.5 truncate">{item.preview}</p>
                    </div>
                    <span className="text-muted-foreground text-xs flex-shrink-0">{item.date}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${cfg.labelColor}`}>
                      {cfg.label}
                    </span>
                    <span className="text-xs text-muted-foreground">→ {item.result}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state hint */}
        <div className="mt-6 text-center py-4">
          <p className="text-muted-foreground text-xs">История хранится только на вашем устройстве</p>
        </div>
      </div>
    </div>
  );
}
