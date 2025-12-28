'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/use-translation';

const TESTIMONIALS = [
  {
    id: 1,
    rating: 5,
    content: '界面设计非常专业，信息清晰易读。PvP时技能冷却一目了然，帮助我在竞技场取得了更好的成绩！',
    author: '德拉诺的守护者',
    role: '战士 | 暴风要塞',
    avatar: '/avatars/user-1.jpg',
  },
  {
    id: 2,
    rating: 5,
    content: '作为治疗，这个UI让我能够更好地监控团队血量和增益状态。团本效率提升明显！',
    author: '月光女祭司',
    role: '牧师 | 燃烧之刃',
    avatar: '/avatars/user-2.jpg',
  },
  {
    id: 3,
    rating: 5,
    content: '简洁美观，性能优秀。而且自定义选项丰富，完全可以调整成自己喜欢的样子。',
    author: '影刃刺客',
    role: '盗贼 | 地狱咆哮',
    avatar: '/avatars/user-3.jpg',
  },
  {
    id: 4,
    rating: 5,
    content: '最喜欢的是暗黑风格的那款，配合我的术士职业简直完美。客服也很专业，有问题都能及时解决。',
    author: '暗影术士',
    role: '术士 | 黑石山',
    avatar: '/avatars/user-4.jpg',
  },
  {
    id: 5,
    rating: 5,
    content: '免费试用了一款后立即购买了高级版。物超所值！强烈推荐给所有玩家。',
    author: '冰霜法师',
    role: '法师 | 艾露恩',
    avatar: '/avatars/user-5.jpg',
  },
  {
    id: 6,
    rating: 5,
    content: '用了两年了，每次游戏更新都能及时跟进。这种持续的支持让我非常满意。',
    author: '圣光骑士',
    role: '圣骑士 | 霜之哀伤',
    avatar: '/avatars/user-6.jpg',
  },
];

function Testimonials() {
  const { t, locale } = useTranslation();
  return (
    <section className="bg-gradient-to-b from-black via-gray-950 to-black py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-5xl font-bold text-white">{t('testimonials.title')}</h2>
          <p className="text-xl text-gray-400">{t('testimonials.subtitle')}</p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full border-gray-800 bg-gradient-to-br from-gray-900/80 to-gray-900/40 p-6 backdrop-blur-sm transition-all hover:border-gray-700 hover:shadow-2xl hover:shadow-gray-600/10">
                {/* Rating */}
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-lg font-bold text-yellow-400">
                    {testimonial.rating}.0
                  </span>
                </div>

                {/* Content */}
                <p className="mb-6 text-gray-300 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 text-lg font-bold text-white">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>

                {/* Verified Badge */}
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                  <CheckCircle className="h-3 w-3" />
                  {locale === 'en-US' ? 'Verified Purchase' : '已验证购买'}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export default Testimonials;
