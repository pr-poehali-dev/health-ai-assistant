import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';

interface AnalysisResult {
  type: string;
  severity: string;
  severityColor: string;
  steps: string[];
  medicines: string[];
  duration: string;
  warning?: string;
}

const MOCK_RESULT: AnalysisResult = {
  type: 'Поверхностная ссадина / царапина',
  severity: 'Лёгкая степень',
  severityColor: 'text-green-600 bg-green-50 border-green-200',
  steps: [
    'Промойте рану чистой прохладной водой 5–10 минут',
    'Обработайте края раны антисептиком (Хлоргексидин или перекись водорода)',
    'Нанесите заживляющую мазь тонким слоем',
    'Наложите стерильную повязку или пластырь',
    'Меняйте повязку каждые 24 часа',
  ],
  medicines: [
    'Хлоргексидин 0.05% — для обработки раны',
    'Бепантен или Пантенол — заживляющая мазь',
    'Стерильный бинт / лейкопластырь',
    'Мирамистин — для антисептической обработки',
  ],
  duration: '5–7 дней до полного заживления',
  warning: 'Обратитесь к врачу, если появится покраснение, отёк или гнойное выделение',
};

export default function PhotoPage() {
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setResult(null);
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
          setResult(MOCK_RESULT);
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

  const reset = () => {
    setImage(null);
    setResult(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen leaf-bg pb-28">
      {/* Header */}
      <div className="health-gradient px-5 pt-12 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
            <Icon name="Camera" fallback="Image" size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg leading-none">Анализ фото раны</h1>
            <p className="text-white/70 text-xs mt-0.5">Загрузите фото для диагностики</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-6">
        {!image ? (
          <div
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            className="border-2 border-dashed border-primary/40 rounded-3xl bg-white/80 p-8 text-center cursor-pointer hover:border-primary hover:bg-white transition-all duration-200"
            onClick={() => fileRef.current?.click()}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon name="ImagePlus" fallback="Upload" size={28} className="text-primary" />
            </div>
            <h3 className="font-semibold text-foreground text-base mb-2">Загрузите фото раны</h3>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              Сделайте чёткий снимок при хорошем освещении.<br />
              Поддерживаются JPG, PNG, HEIC
            </p>
            <button className="health-gradient text-white text-sm font-medium px-6 py-2.5 rounded-2xl hover:opacity-90 transition-opacity">
              Выбрать фото
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
        ) : (
          <div className="space-y-4">
            {/* Photo preview */}
            <div className="glass-card rounded-3xl overflow-hidden">
              <div className="relative">
                <img src={image} alt="Загруженное фото" className="w-full max-h-64 object-cover" />
                <button
                  onClick={reset}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
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
                    <span className="text-sm font-medium text-foreground">ИИ анализирует фото...</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full health-gradient rounded-full transition-all duration-150"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-muted-foreground">Распознаю тип повреждения</span>
                    <span className="text-xs text-primary font-medium">{progress}%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Result */}
            {result && (
              <div className="space-y-4 animate-fade-in">
                {/* Type & severity */}
                <div className="glass-card rounded-3xl p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-2xl">🔬</span>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Определено</p>
                      <h3 className="font-semibold text-foreground text-base">{result.type}</h3>
                      <span className={`inline-block mt-2 text-xs px-3 py-1 rounded-full border font-medium ${result.severityColor}`}>
                        {result.severity}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-secondary rounded-2xl">
                    <Icon name="Clock" fallback="Timer" size={16} className="text-primary" />
                    <span className="text-sm text-foreground">Заживление: <strong>{result.duration}</strong></span>
                  </div>
                </div>

                {/* Steps */}
                <div className="glass-card rounded-3xl p-5">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span>🩹</span> Порядок лечения
                  </h4>
                  <div className="space-y-3">
                    {result.steps.map((step, i) => (
                      <div key={i} className="flex gap-3">
                        <div className="w-6 h-6 rounded-full health-gradient flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">{i + 1}</span>
                        </div>
                        <p className="text-sm text-foreground/85 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Medicines */}
                <div className="glass-card rounded-3xl p-5">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <span>💊</span> Необходимые препараты
                  </h4>
                  <div className="space-y-2">
                    {result.medicines.map((med, i) => (
                      <div key={i} className="flex gap-2 p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <Icon name="Pill" fallback="Plus" size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground/85">{med}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Warning */}
                {result.warning && (
                  <div className="bg-amber-50 border border-amber-200 rounded-3xl p-4">
                    <div className="flex gap-2">
                      <Icon name="AlertTriangle" fallback="AlertCircle" size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-700">{result.warning}</p>
                    </div>
                  </div>
                )}

                <button
                  onClick={reset}
                  className="w-full py-3.5 rounded-2xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary hover:text-white transition-all duration-200"
                >
                  Загрузить другое фото
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tips */}
        {!image && (
          <div className="mt-5 space-y-3">
            <h3 className="font-semibold text-foreground text-sm">Советы для лучшего результата:</h3>
            {[
              { icon: 'Sun', text: 'Хорошее освещение — снимок при дневном свете' },
              { icon: 'Focus', text: 'Расстояние 15–20 см от объекта' },
              { icon: 'ZoomIn', text: 'Рана должна занимать большую часть кадра' },
            ].map((tip, i) => (
              <div key={i} className="flex gap-3 bg-white/70 rounded-2xl p-3 border border-border">
                <Icon name={tip.icon} fallback="Info" size={16} className="text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/80">{tip.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
