'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { blogApi } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function BlogDetailPage() {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();
    const router = useRouter();
    const id = parseInt(params.id as string);

    const fetchPost = async () => {
        try {
            setLoading(true);
            setError(null);
            const fetchedPost = await blogApi.getPost(id);
            setPost(fetchedPost);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'エラーが発生しました');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchPost();
        }
    }, [id]);

    const handleDelete = async () => {
        if (!confirm('この記事を削除しますか？')) return;

        try {
            await blogApi.deletePost(id);
            router.push('/');
        } catch (err) {
            alert(err instanceof Error ? err.message : '削除に失敗しました');
        }
    };

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <ErrorMessage message={error} onRetry={fetchPost} />
            </div>
        );
    }

    if (!post) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8">
                <ErrorMessage message="記事が見つかりません" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* メインコンテンツ */}
                <article className="flex-1">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        {/* ヘッダー */}
                        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
                            <div className="flex justify-between items-start mb-4">
                                <time className="text-pink-100 text-sm">
                                    {formatDate(post.date)}
                                </time>
                                <div className="flex space-x-3">
                                    <Link
                                        href={`/blog/${post.id}/edit`}
                                        className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded text-sm font-medium transition-colors"
                                    >
                                        編集
                                    </Link>
                                    <button
                                        onClick={handleDelete}
                                        className="bg-red-500/80 hover:bg-red-500 px-3 py-1 rounded text-sm font-medium transition-colors"
                                    >
                                        削除
                                    </button>
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold leading-tight">
                                {post.title}
                            </h1>
                        </div>

                        {/* 本文 */}
                        <div className="p-6">
                            <div className="prose max-w-none">
                                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                    {post.description}
                                </div>
                            </div>
                        </div>

                        {/* フッター */}
                        <div className="border-t border-gray-200 p-6 bg-gray-50">
                            <div className="flex justify-between items-center">
                                <Link
                                    href="/"
                                    className="inline-flex items-center text-gray-600 hover:text-pink-600 font-medium transition-colors"
                                >
                                    <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    記事一覧に戻る
                                </Link>

                                <div className="flex space-x-4">
                                    <Link
                                        href={`/blog/${post.id}/edit`}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium transition-colors"
                                    >
                                        この記事を編集
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* サイドバー */}
                <Sidebar />
            </div>
        </div>
    );
}





