import { useLanguage } from '../../contexts/LanguageContext';

export default function PageLoader() {
  const { t } = useLanguage();
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-3 bg-[#f4f6fb] dark:bg-slate-950">
      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center font-display font-bold text-white text-xl animate-pulse">
        P
      </div>
      <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">{t('initializing')}</p>
    </div>
  );
}
