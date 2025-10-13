'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogPost, BlogFormData } from '@/types/blog';
import { blogApi } from '@/lib/api';
import BlogForm from '@/components/BlogForm';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function EditBlogPage() {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    const handleSubmit = async (formData: BlogFormData) => {
        setIsSubmitting(true);
        try {
            await blogApi.updatePost(id, formData);
            router.push(`/blog/${id}`);
        } catch (error) {
            alert(error instanceof Error ? error.message : '記事の更新に失敗しました');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        router.push(`/blog/${id}`);
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
                <div className="flex-1">
                    {/* パンくずナビ */}
                    <nav className="mb-6">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Link href="/" className="hover:text-pink-600 transition-colors">
                                ホーム
                            </Link>
                            <span>/</span>
                            <Link href={`/blog/${id}`} className="hover:text-pink-600 transition-colors">
                                {post.title}
                            </Link>
                            <span>/</span>
                            <span className="text-gray-800">編集</span>
                        </div>
                    </nav>

                    <BlogForm
                        initialData={{
                            title: post.title,
                            description: post.description,
                        }}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        isEditing={true}
                        isLoading={isSubmitting}
                    />
                </div>

                {/* サイドバー */}
                <Sidebar />
            </div>
        </div>
    );
}





