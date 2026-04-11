import Icon from '@/components/ui/icon';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const cards = [
  {
    id: 'symptoms',
    icon: 'Stethoscope',
    title: 'Анализ симптомов',
    desc: 'Опишите, что вас беспокоит — ИИ поставит предварительный диагноз и подберёт лечение',
    color: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-200',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    tag: 'Текст + ИИ',
    tagColor: 'bg-emerald-100 text-emerald-700',
  },
  {
    id: 'photo',
    icon: 'Camera',
    title: 'Анализ фото раны',
    desc: 'Загрузите фотографию — ИИ определит тип повреждения и объяснит, как лечить',
    color: 'from-blue-50 to-cyan-50',
    border: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    tag: 'Фото + ИИ',
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 'prevention',
    icon: 'ShieldCheck',
    title: 'Профилактика',
    desc: 'Получите персональные советы, как укрепить здоровье и не заболеть',
    color: 'from-violet-50 to-purple-50',
    border: 'border-violet-200',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    tag: 'Советы',
    tagColor: 'bg-violet-100 text-violet-700',
  },
];

const stats = [
  { value: '24/7', label: 'Доступен всегда' },
  { value: '3 с', label: 'Быстрый ответ' },
  { value: '100%', label: 'Приватно' },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen leaf-bg pb-24">
      <div className="health-gradient px-6 pt-14 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-8 w-32 h-32 rounded-full bg-white blur-2xl" />
          <div className="absolute bottom-0 left-4 w-24 h-24 rounded-full bg-white blur-xl" />
        </div>
        <div className="relative animate-fade-in">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-sm">✦</span>
            </div>
            <span className="text-white/80 text-sm font-medium tracking-wide">МедИИ</span>
          </div>
          <h1 className="font-cormorant text-4xl text-white font-semibold leading-tight mb-2">
            Ваш умный<br />
            <span className="italic">помощник</span> здоровья
          </h1>
          <p className="text-white/75 text-sm leading-relaxed mt-3 max-w-xs">
            ИИ-диагностика симптомов, анализ ран по фото и советы по профилактике
          </p>
        </div>
        <div className="flex gap-3 mt-6 relative">
          {stats.map((s) => (
            <div key={s.value} className="flex-1 bg-white/15 backdrop-blur-sm rounded-2xl py-3 px-2 text-center">
              <div className="text-white font-bold text-lg leading-none">{s.value}</div>
              <div className="text-white/65 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pt-6">
        <h2 className="font-golos text-lg font-semibold text-foreground mb-4">Чем могу помочь?</h2>
        <div className="flex flex-col gap-4">
          {cards.map((card, i) => (
            <button
              key={card.id}
              onClick={() => onNavigate(card.id)}
              className={`w-full text-left bg-gradient-to-br ${card.color} border ${card.border} rounded-3xl p-5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`${card.iconBg} w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <Icon name={card.icon} fallback="Circle" size={22} className={card.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-foreground text-base block mb-1">{card.title}</span>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                  <span className={`inline-block mt-2 text-xs px-2.5 py-1 rounded-full font-medium ${card.tagColor}`}>
                    {card.tag}
                  </span>
                </div>
                <Icon name="ChevronRight" fallback="ArrowRight" size={18} className="text-muted-foreground flex-shrink-0 mt-1" />
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-3xl p-4">
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">💡</span>
            <div>
              <p className="text-sm font-semibold text-amber-800 mb-1">Важно помнить</p>
              <p className="text-xs text-amber-700 leading-relaxed">
                ИИ-помощник даёт рекомендации на основе описанных симптомов. При серьёзных состояниях всегда обращайтесь к врачу.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
