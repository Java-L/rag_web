import { GetStaticProps, GetStaticPaths } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface RoleConfig {
  appId: string;
  appKey: string;
}

export default function Chat() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { role } = router.query;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [roleConfig, setRoleConfig] = useState<RoleConfig | null>(null);

  useEffect(() => {
    if (!role) return;
    
    // Configure app ID and key based on role
    if (role === 'sales') {
      setRoleConfig({
        appId: process.env.NEXT_PUBLIC_SALES_APP_ID || '',
        appKey: process.env.NEXT_PUBLIC_SALES_APP_KEY || '',
      });
    } else if (role === 'customerService') {
      setRoleConfig({
        appId: process.env.NEXT_PUBLIC_CUSTOMER_SERVICE_APP_ID || '',
        appKey: process.env.NEXT_PUBLIC_CUSTOMER_SERVICE_APP_KEY || '',
      });
    } else if (role === 'product') {
      setRoleConfig({
        appId: process.env.NEXT_PUBLIC_PRODUCT_APP_ID || '',
        appKey: process.env.NEXT_PUBLIC_PRODUCT_APP_KEY || '',
      });
    }
  }, [role]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !roleConfig) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/chat-messages`,
        {
          inputs: {},
          query: input,
          response_mode: 'blocking',
          conversation_id: '',
          user: 'user',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${roleConfig.appKey}`,
            'X-App-ID': roleConfig.appId
          },
        }
      );

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.answer,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // If no role configuration is available yet, show a loading state
  if (!roleConfig) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-[600px]">
          <div className="text-gray-500">{t('chat.thinking')}</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="h-[600px] overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-center text-gray-500">{t('chat.thinking')}</div>
            )}
          </div>
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('chat.placeholder')}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
            >
              {t('chat.send')}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
  const roles = ['sales', 'customerService', 'product'];
  const paths = locales.flatMap((locale) =>
    roles.map((role) => ({
      params: { role },
      locale,
    }))
  );

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
}; 