import { Moon, Sun, Languages } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { cn } from '../../lib/utils';

interface ThemeLanguageControlsProps {
  className?: string;
  variant?: 'light' | 'dark' | 'auto';
}

export default function ThemeLanguageControls({ className, variant = 'auto' }: ThemeLanguageControlsProps) {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const isDarkBar = variant === 'dark' || (variant === 'auto' && theme === 'dark');

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={t('toggleTheme')}
        title={theme === 'light' ? t('darkMode') : t('lightMode')}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-colors',
          isDarkBar
            ? 'bg-white/10 text-white hover:bg-white/20'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
        )}
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} className="text-amber-400" />}
        <span className="hidden sm:inline">{theme === 'light' ? t('darkMode') : t('lightMode')}</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage(language === 'en' ? 'tl' : 'en')}
        aria-label={t('changeLang')}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-colors',
          isDarkBar
            ? 'bg-white/10 text-white hover:bg-white/20'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
        )}
      >
        <Languages size={18} />
        <span>{language === 'en' ? t('tagalog') : t('english')}</span>
      </button>
    </div>
  );
}
