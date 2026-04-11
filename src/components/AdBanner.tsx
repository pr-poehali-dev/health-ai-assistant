interface AdBannerProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const AD_CONTENT = [
  {
    title: 'Аптека 36.6',
    desc: 'Лекарства с доставкой за 1 час',
    emoji: '💊',
    cta: 'Открыть',
    color: 'from-blue-50 to-indigo-50',
    border: 'border-blue-100',
    ctaColor: 'bg-blue-500',
  },
  {
    title: 'СберЗдоровье',
    desc: 'Онлайн-консультация врача от 399₽',
    emoji: '👨‍⚕️',
    cta: 'Записаться',
    color: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-100',
    ctaColor: 'bg-emerald-500',
  },
  {
    title: 'Витамины Эвалар',
    desc: 'Комплексы для иммунитета со скидкой 30%',
    emoji: '🌿',
    cta: 'Смотреть',
    color: 'from-amber-50 to-orange-50',
    border: 'border-amber-100',
    ctaColor: 'bg-amber-500',
  },
];

let adIndex = 0;

export default function AdBanner({ size = 'small', className = '' }: AdBannerProps) {
  const ad = AD_CONTENT[adIndex++ % AD_CONTENT.length];

  if (size === 'small') {
    return (
      <div className={`ad-banner bg-gradient-to-r ${ad.color} border ${ad.border} mx-5 ${className}`}>
        <span className="ad-banner-label">Реклама</span>
        <div className="flex items-center gap-3 px-4 py-3">
          <span className="text-2xl flex-shrink-0">{ad.emoji}</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-foreground truncate">{ad.title}</p>
            <p className="text-xs text-muted-foreground truncate">{ad.desc}</p>
          </div>
          <button className={`flex-shrink-0 ${ad.ctaColor} text-white text-xs font-semibold px-3 py-1.5 rounded-xl whitespace-nowrap`}>
            {ad.cta}
          </button>
        </div>
      </div>
    );
  }

  if (size === 'medium') {
    return (
      <div className={`ad-banner bg-gradient-to-br ${ad.color} border ${ad.border} mx-5 ${className}`}>
        <span className="ad-banner-label">Реклама</span>
        <div className="px-4 py-4">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/80 flex items-center justify-center flex-shrink-0 text-2xl">
              {ad.emoji}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">{ad.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{ad.desc}</p>
              <button className={`mt-2 ${ad.ctaColor} text-white text-xs font-semibold px-4 py-1.5 rounded-xl`}>
                {ad.cta} →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`ad-banner bg-gradient-to-br ${ad.color} border ${ad.border} mx-5 ${className}`}>
      <span className="ad-banner-label">Реклама</span>
      <div className="px-5 py-5 text-center">
        <div className="text-4xl mb-2">{ad.emoji}</div>
        <p className="font-semibold text-foreground text-base mb-1">{ad.title}</p>
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{ad.desc}</p>
        <button className={`${ad.ctaColor} text-white text-sm font-semibold px-6 py-2.5 rounded-2xl w-full`}>
          {ad.cta}
        </button>
      </div>
    </div>
  );
}
