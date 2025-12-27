'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle, XCircle } from 'lucide-react';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock success
    setStatus('success');
    setEmail('');

    // Reset after 3 seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-black py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-900/40 p-12 backdrop-blur-sm">
            {/* Decorative gradient */}
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-gradient-to-br from-gray-600/20 to-gray-700/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-gradient-to-br from-gray-700/20 to-gray-600/20 blur-3xl" />

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-600 to-gray-700"
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  delay: 0.2,
                }}
              >
                <Mail className="h-10 w-10 text-white" />
              </motion.div>

              {/* Title */}
              <h2 className="mb-4 text-center text-4xl font-bold text-white">
                订阅我们的Newsletter
              </h2>

              {/* Description */}
              <p className="mb-8 text-center text-lg text-gray-400">
                获取最新皮肤发布和独家优惠信息
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mb-6">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="输入你的邮箱地址"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    required
                    className="flex-1 border-gray-700 bg-gray-900/50 text-white placeholder:text-gray-500"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === 'loading'}
                    className="bg-gradient-to-r from-gray-700 to-gray-800 px-8 text-white hover:from-gray-600 hover:to-gray-700"
                  >
                    {status === 'loading' ? '订阅中...' : '立即订阅'}
                  </Button>
                </div>
              </form>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  className="flex items-center justify-center gap-2 text-green-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>订阅成功！欢迎加入我们的社区 🎉</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  className="flex items-center justify-center gap-2 text-red-400"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <XCircle className="h-5 w-5" />
                  <span>订阅失败，请稍后重试</span>
                </motion.div>
              )}

              {/* Benefits */}
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>每月1-2封邮件</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>随时可退订</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>订阅即送优惠码</span>
                </div>
              </div>

              {/* Privacy */}
              <p className="mt-4 text-center text-xs text-gray-500">
                我们尊重你的隐私，不会分享你的信息
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Newsletter;
