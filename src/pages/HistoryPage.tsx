import Icon from '@/components/ui/icon';
import { useLang } from '@/lib/LanguageContext';

type ItemType = 'symptoms' | 'photo' | 'prevention';

export default function HistoryPage() {
  const { t } = useLang();

  const typeConfig: Record<ItemType, { icon: string; color: string; label: string; labelColor: string }> = {
    symptoms: {
      icon: 'Stethoscope',
      color: 'bg-emerald-100 text-emerald-600',
      label: t.history_label_symptoms,
      labelColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    photo: {
      icon: 'Camera',
      color: 'bg-blue-100 text-blue-600',
      label: t.history_label_photo,
      labelColor: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    prevention: {
      icon: 'ShieldCheck',
      color: 'bg-violet-100 text-violet-600',
      label: t.history_label_prevention,
      labelColor: 'bg-violet-50 text-violet-700 border-violet-200',
    },
  };

  const itemTypes: ItemType[] = ['symptoms', 'photo', 'prevention', 'symptoms', 'prevention'];

  return (
    <div className="min-h-screen leaf-bg pb-nav">
      <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-5 safe-top pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
            <Icon name="History" fallback="Clock" size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-base leading-none">{t.history_title}</h1>
            <p className="text-white/70 text-xs mt-0.5">{t.history_items.length} {t.history_stat_prevention.toLowerCase()}</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5">
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { icon: 'Stethoscope', label: t.history_stat_symptoms, count: 2, bg: 'bg-emerald-50', iconCls: 'text-emerald-600' },
            { icon: 'Camera', label: t.history_stat_photo, count: 1, bg: 'bg-blue-50', iconCls: 'text-blue-600' },
            { icon: 'ShieldCheck', label: t.history_stat_prevention, count: 2, bg: 'bg-violet-50', iconCls: 'text-violet-600' },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-3 text-center">
              <div className={`w-8 h-8 rounded-xl ${s.bg} flex items-center justify-center mx-auto mb-1.5`}>
                <Icon name={s.icon} fallback="Circle" size={16} className={s.iconCls} />
              </div>
              <div className="font-bold text-foreground text-xl leading-none">{s.count}</div>
              <div className="text-muted-foreground text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <h2 className="font-semibold text-foreground mb-3 text-sm">{t.history_section}</h2>
        <div className="space-y-3">
          {t.history_items.map((item, i) => {
            const type = itemTypes[i] as ItemType;
            const cfg = typeConfig[type];
            return (
              <div key={i} className="glass-card rounded-3xl p-4 flex gap-3 active:scale-[0.98] transition-transform">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                  <Icon name={cfg.icon} fallback="Circle" size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span className="font-semibold text-foreground text-sm">{item.title}</span>
                      <p className="text-muted-foreground text-xs mt-0.5 truncate">{item.preview}</p>
                    </div>
                    <span className="text-muted-foreground text-xs flex-shrink-0 mt-0.5">{item.date}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 flex-wrap">
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${cfg.labelColor}`}>
                      {cfg.label}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">→ {item.result}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 text-center py-3">
          <p className="text-muted-foreground text-xs">{t.history_note}</p>
        </div>
      </div>
    </div>
  );
}
