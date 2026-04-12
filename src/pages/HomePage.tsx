import Icon from '@/components/ui/icon';
import { useLang } from '@/lib/LanguageContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { t } = useLang();

  const cards = [
    {
      id: 'symptoms',
      icon: 'Stethoscope',
      title: t.card_symptoms_title,
      desc: t.card_symptoms_desc,
      color: 'from-emerald-50 to-teal-50',
      border: 'border-emerald-200',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      tag: t.card_symptoms_tag,
      tagColor: 'bg-emerald-100 text-emerald-700',
    },
    {
      id: 'photo',
      icon: 'Camera',
      title: t.card_photo_title,
      desc: t.card_photo_desc,
      color: 'from-blue-50 to-cyan-50',
      border: 'border-blue-200',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      tag: t.card_photo_tag,
      tagColor: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'prevention',
      icon: 'ShieldCheck',
      title: t.card_prevention_title,
      desc: t.card_prevention_desc,
      color: 'from-violet-50 to-purple-50',
      border: 'border-violet-200',
      iconBg: 'bg-violet-100',
      iconColor: 'text-violet-600',
      tag: t.card_prevention_tag,
      tagColor: 'bg-violet-100 text-violet-700',
    },
  ];

  const stats = [
    { value: t.home_stat1_val, label: t.home_stat1_label },
    { value: t.home_stat2_val, label: t.home_stat2_label },
    { value: t.home_stat3_val, label: t.home_stat3_label },
  ];

  return (
    <div className="min-h-screen leaf-bg pb-nav">
      <div className="health-gradient px-5 safe-top pb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-8 w-32 h-32 rounded-full bg-white blur-2xl" />
          <div className="absolute bottom-0 left-4 w-24 h-24 rounded-full bg-white blur-xl" />
        </div>
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white text-sm">✦</span>
            </div>
            <span className="text-white/80 text-sm font-medium tracking-wide">{t.home_brand}</span>
          </div>
          <h1 className="font-cormorant text-4xl text-white font-semibold leading-tight mb-2">
            {t.home_title1}<br />
            <span className="italic">{t.home_title2}</span> {t.home_title3}
          </h1>
          <p className="text-white/75 text-sm leading-relaxed mt-2">{t.home_subtitle}</p>
        </div>
        <div className="flex gap-3 mt-5 relative">
          {stats.map((s) => (
            <div key={s.value} className="flex-1 bg-white/15 backdrop-blur-sm rounded-2xl py-3 px-2 text-center">
              <div className="text-white font-bold text-lg leading-none">{s.value}</div>
              <div className="text-white/65 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 pt-5">
        <h2 className="font-golos text-lg font-semibold text-foreground mb-4">{t.home_section}</h2>
        <div className="flex flex-col gap-3">
          {cards.map((card, i) => (
            <button
              key={card.id}
              onClick={() => onNavigate(card.id)}
              className={`w-full text-left bg-gradient-to-br ${card.color} border ${card.border} rounded-3xl p-4 hover:scale-[1.015] active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md touch-target`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-4">
                <div className={`${card.iconBg} w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <Icon name={card.icon} fallback="Circle" size={22} className={card.iconColor} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-foreground text-base block mb-0.5">{card.title}</span>
                  <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{card.desc}</p>
                  <span className={`inline-block mt-1.5 text-xs px-2.5 py-0.5 rounded-full font-medium ${card.tagColor}`}>
                    {card.tag}
                  </span>
                </div>
                <div className={`${card.iconBg} w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon name="ChevronRight" fallback="ArrowRight" size={16} className={card.iconColor} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-5 mt-5 bg-amber-50 border border-amber-200 rounded-3xl p-4">
        <div className="flex gap-3">
          <span className="text-xl flex-shrink-0">💡</span>
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-1">{t.home_tip_title}</p>
            <p className="text-xs text-amber-700 leading-relaxed">{t.home_tip_text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
