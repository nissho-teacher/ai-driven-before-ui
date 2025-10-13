'use client';

import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { formatDate, truncateText } from '@/lib/utils';

interface BlogCardProps {
    post: BlogPost;
    onEdit?: (id: number) => void;
    onDelete?: (id: number) => void;
    showActions?: boolean;
}

export default function BlogCard({ post, onEdit, onDelete, showActions = false }: BlogCardProps) {
    return (
        <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover-lift animate-fade-in">
            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <time className="text-sm text-gray-500">
                        {formatDate(post.date)}
                    </time>
                    {showActions && (
                        <div className="flex space-x-2">
                            <button
                                onClick={() => onEdit?.(post.id)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                            >
                                編集
                            </button>
                            <button
                                onClick={() => onDelete?.(post.id)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                            >
                                削除
                            </button>
                        </div>
                    )}
                </div>

                <Link href={`/blog/${post.id}`} className="block group">
                    <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors line-clamp-2">
                        {post.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                        {truncateText(post.description, 150)}
                    </p>
                </Link>

                <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center text-pink-600 hover:text-pink-800 font-medium text-sm transition-colors"
                    >
                        続きを読む
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </article>
    );
}
