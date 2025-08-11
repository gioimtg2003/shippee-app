'use client';

import { InputForm } from '@/components/form/InputForm';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/routing';
import { axiosInstant } from '@/lib/axiosClient';
import { cn } from '@/lib/utils';
import useAuthStore from '@/stores/authStore';
import { LoginSchema, TLoginFormSchema } from '@/zod/login-schema.zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const token = useAuthStore((s) => s.token);
  const t = useTranslations('common');

  // If already logged in, go home
  if (typeof window !== 'undefined' && token) {
    router.replace('/');
  }

  const methods = useForm<TLoginFormSchema>({
    resolver: zodResolver(LoginSchema(t)),
    mode: 'onSubmit',
  });
  const canLogin = methods.formState.isValid;
  async function handleSubmit(dataLogin: TLoginFormSchema) {
    if (!canLogin) return;
    setLoading(true);
    try {
      const res = await axiosInstant.post<any>('customer-auth/register', {
        ...dataLogin,
      });
      console.log(res);
      if (res?.data) {
        router.replace('/login');
      }
      //   router.replace('/app');
    } catch (err: any) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className='min-h-screen bg-white'>
      <div className='mx-auto w-full max-w-md px-6 py-6'>
        <header className='mb-6 flex items-center gap-3'>
          <Logo variant='text' />
          <h1 className='text-2xl font-bold'>Đăng ký!</h1>
        </header>

        <form className='space-y-5'>
          <InputForm
            name='email'
            control={methods.control}
            label='Email'
            placeholder='shippee@gmail.com'
            size={22}
          />
          <InputForm
            name='password'
            type='password'
            control={methods.control}
            label='Password'
            placeholder='******'
            size={100}
          />

          <Button
            type='submit'
            disabled={!canLogin}
            className={cn(
              'h-12 w-full rounded-xl text-base font-semibold',
              canLogin
                ? 'bg-primary text-white hover:bg-primary'
                : 'bg-gray-200 text-gray-400 hover:bg-gray-200'
            )}
            onClick={methods.handleSubmit(handleSubmit)}
            loading={loading}
          >
            Đăng ký
          </Button>

          {/* Links */}
          <div className='flex items-center justify-center gap-2 text-sm text-gray-700'>
            <button type='button' className='underline underline-offset-2'>
              Điều Khoản Và Điều Kiện
            </button>
            <span>•</span>
            <button type='button' className='underline underline-offset-2'>
              Chính Sách Quyền Riêng Tư
            </button>
          </div>

          <div className='pt-8 text-center'>
            <button
              type='button'
              onClick={() => router.push('/login')}
              className='block w-full text-base font-semibold text-primary'
            >
              Bạn đã có tài khoản
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
