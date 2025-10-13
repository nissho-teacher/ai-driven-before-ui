'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg">
            <div className="max-w-6xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href="/" className="text-white text-2xl font-bold hover:text-pink-200 transition-colors">
                            MyBlog
                        </Link>
                        <nav className="hidden md:flex space-x-6">
                            <Link href="/" className="text-white hover:text-pink-200 transition-colors">
                                ホーム
                            </Link>
                            <Link href="/blog/new" className="text-white hover:text-pink-200 transition-colors">
                                記事を書く
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center space-x-4">
                        <UserButton afterSignOutUrl="/" />

                        {/* モバイルメニューボタン */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden text-white hover:text-pink-200 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* モバイルメニュー */}
                {isMenuOpen && (
                    <nav className="md:hidden mt-4 pt-4 border-t border-pink-400/30">
                        <div className="space-y-2">
                            <Link
                                href="/"
                                className="block text-white hover:text-pink-200 py-2 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                ホーム
                            </Link>
                            <Link
                                href="/blog/new"
                                className="block text-white hover:text-pink-200 py-2 transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                記事を書く
                            </Link>
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
