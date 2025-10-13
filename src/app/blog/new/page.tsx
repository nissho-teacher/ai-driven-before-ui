'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogFormData } from '@/types/blog';
import { blogApi } from '@/lib/api';
import BlogForm from '@/components/BlogForm';
import Sidebar from '@/components/Sidebar';

export default function NewBlogPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (formData: BlogFormData) => {
        setIsLoading(true);
        try {
            const newPost = await blogApi.createPost(formData);
            router.push(`/blog/${newPost.id}`);
        } catch (error) {
            alert(error instanceof Error ? error.message : '記事の作成に失敗しました');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        router.push('/');
    };

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
                            <span className="text-gray-800">新しい記事を書く</span>
                        </div>
                    </nav>

                    <BlogForm
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                        isLoading={isLoading}
                    />
                </div>

                {/* サイドバー */}
                <Sidebar />
            </div>
        </div>
    );
}





