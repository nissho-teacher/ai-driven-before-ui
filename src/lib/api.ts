import { BlogPost, BlogFormData } from '@/types/blog';

const API_BASE = '/api/blog';

export const blogApi = {
    // 全ブログ記事を取得
    async getAllPosts(): Promise<BlogPost[]> {
        const response = await fetch(API_BASE);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'ブログ記事の取得に失敗しました');
        }
        return data.posts;
    },

    // 特定のブログ記事を取得
    async getPost(id: number): Promise<BlogPost> {
        const response = await fetch(`${API_BASE}/${id}`);
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'ブログ記事の取得に失敗しました');
        }
        return data.post;
    },

    // ブログ記事を作成
    async createPost(postData: BlogFormData): Promise<BlogPost> {
        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'ブログ記事の作成に失敗しました');
        }
        return data.post;
    },

    // ブログ記事を更新
    async updatePost(id: number, postData: BlogFormData): Promise<BlogPost> {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'ブログ記事の更新に失敗しました');
        }
        return data.post;
    },

    // ブログ記事を削除
    async deletePost(id: number): Promise<void> {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'ブログ記事の削除に失敗しました');
        }
    },
};

