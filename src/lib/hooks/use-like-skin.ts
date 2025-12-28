'use client';

import { useState, useEffect } from 'react';

interface UseLikeSkinOptions {
  initialLiked?: boolean;
  initialLikes?: number;
}

export function useLikeSkin(skinId: string | number, options: UseLikeSkinOptions = {}) {
  const [isLiked, setIsLiked] = useState(options.initialLiked || false);
  const [likes, setLikes] = useState(options.initialLikes || 0);
  const [isLoading, setIsLoading] = useState(false);

  // 从本地存储加载喜欢状态
  useEffect(() => {
    const stored = localStorage.getItem(`skin-like-${skinId}`);
    if (stored) {
      setIsLiked(stored === 'true');
    }
  }, [skinId]);

  const toggleLike = async () => {
    const newLikedState = !isLiked;
    const previousLikes = likes;
    
    // 乐观更新
    setIsLiked(newLikedState);
    setLikes((prev) => prev + (newLikedState ? 1 : -1));
    
    // 保存到本地存储
    localStorage.setItem(`skin-like-${skinId}`, newLikedState.toString());

    // TODO: 后端同步
    setIsLoading(true);
    try {
      // const response = await fetch(`/api/skins/${skinId}/like`, {
      //   method: newLikedState ? 'POST' : 'DELETE',
      // });
      // if (!response.ok) throw new Error('Failed to update like');
      // const data = await response.json();
      // setLikes(data.likes);
    } catch (error) {
      console.error('Failed to update like:', error);
      // 失败时回滚
      setIsLiked(!newLikedState);
      setLikes(previousLikes);
      localStorage.setItem(`skin-like-${skinId}`, (!newLikedState).toString());
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLiked,
    likes,
    toggleLike,
    isLoading,
  };
}
