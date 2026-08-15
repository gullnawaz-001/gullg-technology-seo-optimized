import React, { useState } from 'react';
import { useGlobalStore } from '../store';
import { BlogPost } from '../types';
import { Plus, Search, Edit2, Trash2, X, Eye, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router';

export function AdminKnowledgeHub() {
  const { blogPosts, setBlogPosts } = useGlobalStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const [isEditing, setIsEditing] = useState(false);
  const [editingPost, setEditingPost] = useState<Partial<BlogPost> | null>(null);

  const categories = ['All', 'AI & Automation', 'Engineering', 'UI/UX Design', 'Marketing'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost({ ...post });
    setIsEditing(true);
  };

  const handleCreate = () => {
    setEditingPost({
      id: `b${Date.now()}`,
      title: '',
      category: 'Engineering',
      readTime: '5 min read',
      excerpt: '',
      content: '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      image: '',
      status: 'Draft',
      slug: ''
    });
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete Knowledge Hub Article?\n\nThis action will permanently remove this article from the Knowledge Hub. Are you sure you want to continue?")) {
      setBlogPosts(blogPosts.filter(p => p.id !== id));
    }
  };

  const handleSave = (status: 'Published' | 'Draft') => {
    if (!editingPost?.title || !editingPost?.category || !editingPost?.content || !editingPost?.excerpt || !editingPost?.image) {
      alert('Please fill in all required fields (Title, Category, Content, Takeaway, Image).');
      return;
    }

    const newSlug = editingPost.slug || generateSlug(editingPost.title);
    
    const postToSave = {
      ...editingPost,
      slug: newSlug,
      status
    } as BlogPost;

    const exists = blogPosts.find(p => p.id === postToSave.id);
    if (exists) {
      setBlogPosts(blogPosts.map(p => p.id === postToSave.id ? postToSave : p));
    } else {
      setBlogPosts([postToSave, ...blogPosts]);
    }
    
    setIsEditing(false);
    setEditingPost(null);
  };

  if (isEditing && editingPost) {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center bg-white p-6 rounded-3xl ring-1 ring-slate-200 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{editingPost.id.startsWith('b') && editingPost.title ? 'Edit Article' : 'Create New Article'}</h2>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <Link
              to={`/knowledge-hub/${editingPost.slug || generateSlug(editingPost.title || 'preview')}`}
              target="_blank"
              className="px-4 py-2 flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Eye size={16} /> Preview
            </Link>
            <button 
              onClick={() => handleSave('Draft')}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Save Draft
            </button>
            <button 
              onClick={() => handleSave('Published')}
              className="px-4 py-2 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
            >
              Publish Article
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl ring-1 ring-slate-200 shadow-sm space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Article Title *</label>
                <input 
                  type="text" 
                  value={editingPost.title || ''}
                  onChange={(e) => {
                    const title = e.target.value;
                    setEditingPost({...editingPost, title, slug: generateSlug(title)});
                  }}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
                  placeholder="Enter article title"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-end mb-1"><label className="block text-sm font-semibold text-slate-700">Article Content *</label><span className="text-xs text-slate-400 font-medium">Supports Markdown</span></div>
                <textarea 
                  value={editingPost.content || ''}
                  onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                  className="w-full h-96 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none resize-y"
                  placeholder="Enter full article content here..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Key Takeaway *</label>
                <textarea 
                  value={editingPost.excerpt || ''}
                  onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                  className="w-full h-24 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none resize-none"
                  placeholder="Brief summary or key insight..."
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl ring-1 ring-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Publishing Details</h3>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Category *</label>
                <select 
                  value={editingPost.category || ''}
                  onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Read Time</label>
                <input 
                  type="text" 
                  value={editingPost.readTime || ''}
                  onChange={(e) => setEditingPost({...editingPost, readTime: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
                  placeholder="e.g. 7 min read"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Article Image URL *</label>
                <input 
                  type="text" 
                  value={editingPost.image || ''}
                  onChange={(e) => setEditingPost({...editingPost, image: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none mb-2"
                  placeholder="https://..."
                />
                {editingPost.image && (
                  <div className="relative rounded-lg overflow-hidden h-32 border border-slate-200 bg-slate-50 flex items-center justify-center">
                    <img src={editingPost.image} alt="Preview" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl ring-1 ring-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">SEO (Optional)</h3>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">URL Slug</label>
                <input 
                  type="text" 
                  value={editingPost.slug || ''}
                  onChange={(e) => setEditingPost({...editingPost, slug: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
                  placeholder="article-url-slug"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">SEO Title</label>
                <input 
                  type="text" 
                  value={editingPost.seoTitle || ''}
                  onChange={(e) => setEditingPost({...editingPost, seoTitle: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none"
                  placeholder="Leave blank to use article title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Meta Description</label>
                <textarea 
                  value={editingPost.metaDescription || ''}
                  onChange={(e) => setEditingPost({...editingPost, metaDescription: e.target.value})}
                  className="w-full h-24 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none resize-none"
                  placeholder="Leave blank to use takeaway"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Knowledge Hub</h2>
          <p className="text-slate-500 mt-1">Manage articles, case studies, and insights.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Create New Article
        </button>
      </div>

      <div className="bg-white rounded-3xl ring-1 ring-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search Knowledge Hub..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 outline-none text-sm"
            />
          </div>
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Article</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPosts.map(post => (
                <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                        {post.image ? (
                          <img src={post.image} alt={post.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-full h-full p-3 text-slate-300" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 line-clamp-1">{post.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{post.readTime} &bull; {post.date}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium whitespace-nowrap">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit ${
                      post.status === 'Published' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${post.status === 'Published' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {post.status || 'Published'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        to={`/knowledge-hub/${post.slug || post.id}`}
                        target="_blank"
                        className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Preview"
                      >
                        <Eye size={18} />
                      </Link>
                      <button 
                        onClick={() => handleEdit(post)}
                        className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    No articles found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
