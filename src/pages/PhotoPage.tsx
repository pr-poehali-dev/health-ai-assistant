import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { useLang } from '@/lib/LanguageContext';

export default function PhotoPage() {
  const { t } = useLang();
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setAnalyzed(false);
      startAnalysis();
    };
    reader.readAsDataURL(file);
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setAnalyzed(true);
          return 100;
        }
        return prev + 4;
      });
    }, 100);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleFile(file);
  };

  const reset = () => { setImage(null); setAnalyzed(false); setProgress(0); };

  return (
    <div className="min-h-screen leaf-bg pb-nav">
      <div className="health-gradient px-5 safe-top pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
            <Icon name="Camera" fallback="Image" size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-base leading-none">{t.photo_title}</h1>
            <p className="text-white/70 text-xs mt-0.5">{t.photo_subtitle}</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-4">
        {!image ? (
          <>
            <div
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              className="border-2 border-dashed border-primary/40 rounded-3xl bg-white/80 p-7 text-center cursor-pointer hover:border-primary hover:bg-white transition-all duration-200 active:scale-[0.98]"
              onClick={() => fileRef.current?.click()}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Icon name="ImagePlus" fallback="Upload" size={28} className="text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-base mb-1.5">{t.photo_upload_title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{t.photo_upload_desc}</p>
              <button className="health-gradient text-white text-sm font-semibold px-6 py-3 rounded-2xl hover:opacity-90 transition-opacity w-full touch-target flex items-center justify-center gap-2">
                <Icon name="Camera" fallback="Upload" size={16} className="text-white" />
                {t.photo_upload_btn}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
              />
            </div>

            <div className="mt-5 space-y-2.5">
              <h3 className="font-semibold text-foreground text-sm">{t.photo_tips_title}</h3>
              {[
                { icon: 'Sun', text: t.photo_tip1 },
                { icon: 'Focus', text: t.photo_tip2 },
                { icon: 'ZoomIn', text: t.photo_tip3 },
              ].map((tip, i) => (
                <div key={i} className="flex gap-3 bg-white/70 rounded-2xl p-3 border border-border items-center">
                  <Icon name={tip.icon} fallback="Info" size={16} className="text-primary flex-shrink-0" />
                  <p className="text-sm text-foreground/80">{tip.text}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-4">
            <div className="glass-card rounded-3xl overflow-hidden">
              <div className="relative">
                <img src={image} alt={t.photo_upload_title} className="w-full max-h-56 object-cover" />
                <button
                  onClick={reset}
                  className="absolute top-3 right-3 w-9 h-9 bg-black/50 rounded-full flex items-center justify-center active:bg-black/70 transition-colors touch-target"
                >
                  <Icon name="X" fallback="XCircle" size={16} className="text-white" />
                </button>
              </div>
              {isAnalyzing && (
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-full health-gradient flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{t.photo_analyzing}</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full health-gradient rounded-full transition-all duration-150" style={{ width: `${progress}%` }} />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{t.photo_detecting}</span>
                    <span className="text-xs text-primary font-medium">{progress}%</span>
                  </div>
                </div>
              )}
            </div>

            {analyzed && (
              <div className="space-y-4 animate-fade-in">
                <div className="glass-card rounded-3xl p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-2xl">🔬</span>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t.photo_detected}</p>
                      <h3 className="font-semibold text-foreground text-base">{t.photo_result_type}</h3>
                      <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full border font-medium text-green-600 bg-green-50 border-green-200">
                        {t.photo_result_severity}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-secondary rounded-2xl">
                    <Icon name="Clock" fallback="Timer" size={16} className="text-primary" />
                    <span className="text-sm text-foreground">{t.photo_healing} <strong>{t.photo_result_duration}</strong></span>
                  </div>
                </div>

                <div className="glass-card rounded-3xl p-5">
                  <h4 className="font-semibold text-foreground mb-3">{t.photo_steps_title}</h4>
                  <div className="space-y-3">
                    {(t.photo_result_steps as readonly string[]).map((step, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-6 h-6 rounded-full health-gradient flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">{i + 1}</span>
                        </div>
                        <p className="text-sm text-foreground/85 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-3xl p-5">
                  <h4 className="font-semibold text-foreground mb-3">{t.photo_meds_title}</h4>
                  <div className="space-y-2">
                    {(t.photo_result_meds as readonly string[]).map((med, i) => (
                      <div key={i} className="flex gap-2 p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <Icon name="Pill" fallback="Plus" size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground/85">{med}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-3xl p-4">
                  <div className="flex gap-2">
                    <Icon name="AlertTriangle" fallback="AlertCircle" size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-700">{t.photo_result_warning}</p>
                  </div>
                </div>

                <button
                  onClick={reset}
                  className="w-full py-4 rounded-2xl border-2 border-primary text-primary font-semibold text-sm active:scale-[0.98] transition-transform touch-target"
                >
                  {t.photo_reset}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
