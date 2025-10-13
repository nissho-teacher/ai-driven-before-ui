'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/types/blog';
import { blogApi } from '@/lib/api';
import BlogCard from '@/components/BlogCard';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPosts = await blogApi.getAllPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (id: number) => {
    router.push(`/blog/${id}/edit`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('この記事を削除しますか？')) return;

    try {
      await blogApi.deletePost(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : '削除に失敗しました');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* メインコンテンツ */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">最新の記事</h1>
            <p className="text-gray-600">最新のブログ記事をお楽しみください</p>
          </div>

          {loading && <LoadingSpinner />}

          {error && (
            <ErrorMessage
              message={error}
              onRetry={fetchPosts}
            />
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">まだ記事がありません</p>
              <button
                onClick={() => router.push('/blog/new')}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 transition-all"
              >
                最初の記事を書く
              </button>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="grid gap-6">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  showActions={true}
                />
              ))}
            </div>
          )}
        </div>

        {/* サイドバー */}
        <Sidebar />
      </div>
    </div>
  );
}
