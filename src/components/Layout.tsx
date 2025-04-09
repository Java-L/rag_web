import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const { t } = useTranslation('common');

  const changeLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-primary">{t('title')}</span>
              </Link>
            </div>
            <div className="flex items-center">
              <select
                onChange={(e) => changeLanguage(e.target.value)}
                value={router.locale}
                className="ml-4 block w-24 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
              >
                <option value="en">{t('languages.en')}</option>
                <option value="zh">{t('languages.zh')}</option>
                <option value="th">{t('languages.th')}</option>
              </select>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
} 