'use client';

import Link from 'next/link';

export default function Sidebar() {
    return (
        <aside className="w-full md:w-80 bg-white rounded-lg shadow-md p-6 h-fit">
            <div className="space-y-6">
                {/* プロフィール */}
                <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">U</span>
                    </div>
                    <h3 className="font-bold text-gray-800 mb-1">ユーザー名</h3>
                    <p className="text-sm text-gray-600">ブログの説明文がここに入ります。</p>
                </div>

                {/* メニュー */}
                <div>
                    <h4 className="font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">メニュー</h4>
                    <nav className="space-y-2">
                        <Link href="/" className="block text-gray-700 hover:text-pink-600 hover:bg-pink-50 px-3 py-2 rounded transition-colors">
                            ホーム
                        </Link>
                        <Link href="/blog/new" className="block text-gray-700 hover:text-pink-600 hover:bg-pink-50 px-3 py-2 rounded transition-colors">
                            記事を書く
                        </Link>
                    </nav>
                </div>

                {/* カテゴリー */}
                <div>
                    <h4 className="font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">カテゴリー</h4>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-700">日記</span>
                            <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-full text-xs">5</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-700">技術</span>
                            <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-full text-xs">3</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-700">趣味</span>
                            <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-full text-xs">2</span>
                        </div>
                    </div>
                </div>

                {/* 最近の記事 */}
                <div>
                    <h4 className="font-bold text-gray-800 mb-3 border-b border-gray-200 pb-2">最近の記事</h4>
                    <div className="space-y-3">
                        <div className="text-sm">
                            <Link href="#" className="text-gray-700 hover:text-pink-600 line-clamp-2 transition-colors">
                                サンプル記事のタイトルがここに表示されます
                            </Link>
                            <p className="text-xs text-gray-500 mt-1">2024年1月15日</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

