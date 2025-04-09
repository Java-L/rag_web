import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function Home() {
  const { t } = useTranslation('common');

  const roles = [
    { id: 'sales', name: t('roles.sales') },
    { id: 'customerService', name: t('roles.customerService') },
    { id: 'product', name: t('roles.product') },
  ];

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('selectRole')}</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {roles.map((role) => (
            <Link
              key={role.id}
              href={`/chat/${role.id}`}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold text-gray-900">{role.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
}; 