import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { api } from '../lib/api';
import { useToast } from './ToastContext';

interface BookmarkContextType {
  bookmarks: string[];
  toggleBookmark: (jobId: string) => Promise<void>;
  isBookmarked: (jobId: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const { user } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    if (!user) {
      setBookmarks([]);
      return;
    }

    api
      .get<{ jobIds: string[] }>('bookmarks')
      .then(data => setBookmarks((data.jobIds || []).map(String)))
      .catch(() => setBookmarks([]));
  }, [user]);

  const toggleBookmark = async (jobId: string) => {
    if (!user) {
      showToast('Please sign in to save jobs.', 'info');
      return;
    }

    try {
      const data = await api.post<{ jobIds: string[]; bookmarked: boolean }>(
        'bookmarks/toggle',
        { jobId }
      );
      setBookmarks((data.jobIds || []).map(String));
      showToast(
        data.bookmarked ? 'Job saved to your bookmarks!' : 'Removed from bookmarks.',
        data.bookmarked ? 'success' : 'info'
      );
    } catch (error) {
      console.error('Bookmark error:', error);
      showToast('Failed to update bookmark.', 'error');
    }
  };

  const isBookmarked = (jobId: string) => bookmarks.includes(jobId);

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  );
}

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
