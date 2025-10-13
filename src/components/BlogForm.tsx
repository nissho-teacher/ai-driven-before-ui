'use client';

import { useState } from 'react';
import { BlogFormData } from '@/types/blog';

interface BlogFormProps {
    initialData?: BlogFormData;
    onSubmit: (data: BlogFormData) => Promise<void>;
    onCancel?: () => void;
    isEditing?: boolean;
    isLoading?: boolean;
}

export default function BlogForm({
    initialData,
    onSubmit,
    onCancel,
    isEditing = false,
    isLoading = false
}: BlogFormProps) {
    const [formData, setFormData] = useState<BlogFormData>(
        initialData || { title: '', description: '' }
    );
    const [errors, setErrors] = useState<Partial<BlogFormData>>({});

    const validateForm = (): boolean => {
        const newErrors: Partial<BlogFormData> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'タイトルは必須です';
        }

        if (!formData.description.trim()) {
            newErrors.description = '内容は必須です';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            await onSubmit(formData);
        } catch (error) {
            console.error('フォーム送信エラー:', error);
        }
    };

    const handleChange = (field: keyof BlogFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {isEditing ? '記事を編集' : '新しい記事を書く'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                        タイトル
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors ${errors.title ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="記事のタイトルを入力してください"
                        disabled={isLoading}
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        内容
                    </label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        rows={12}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-colors resize-vertical ${errors.description ? 'border-red-500' : 'border-gray-300'
                            }`}
                        placeholder="記事の内容を入力してください"
                        disabled={isLoading}
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-pink-600 hover:to-purple-700 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? '処理中...' : (isEditing ? '更新する' : '投稿する')}
                    </button>

                    {onCancel && (
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isLoading}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            キャンセル
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

