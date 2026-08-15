import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { Search, Clock, ChevronRight, ArrowLeft } from 'lucide-react';
import Markdown from 'react-markdown';

// FIXED: Updated casing to capital 'Store' to resolve the Linux build error.
import { useGlobalStore } from '../Store'; 
import { BlogPost } from '../types';
import { SEO } from '../components/SEO';
import { getArticleSchema, getBreadcrumbSchema } from '../lib/seoSchemas';

export function KnowledgeHub() {
  const { blogPosts } = useGlobalStore();
  const [searchQuery, setSearchQuery] = useState('');
  
  const publishedPosts = blogPosts.filter(p => p.status === 'Published');
  const filteredPosts = publishedPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="pt-24 min-h-screen bg-slate-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Knowledge Hub</h1>
          <p className="text-lg text-slate-600 mb-8">Insights, strategies, and engineering deep-dives from the team at GullG Technology.</p>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search articles, case studies, technical guides..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search articles and guides"
              className="w-full pl-12 pr-4 py-4 rounded-full bg-white border border-slate-200 focus:ring-2 focus:ring-slate-700 outline-none text-slate-900 shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link 
              to={`/knowledge-hub/${post.slug || post.id}`}
              key={post.id}
              className="group bg-white rounded-3xl overflow-hidden ring-1 ring-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-500/10 transition-all flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.imageAlt || post.title} 
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-sm text-xs font-bold text-white">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-slate-600 mb-6 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-slate-700 font-semibold text-sm group-hover:gap-2 transition-all gap-1 mt-auto">
                  Read Article <ChevronRight size={16} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-24 text-slate-500">
            No articles found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}

export function KnowledgeHubArticle() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { blogPosts } = useGlobalStore();
  const selectedPost = blogPosts.find(p => p.slug === slug || p.id === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!selectedPost) {
    return (
      <div className="pt-32 pb-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <SEO 
          title="Article Not Found | GullG Technology" 
          description="The requested article does not exist in the Knowledge Hub."
          noIndex={true}
        />
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Article Not Found</h1>
        <button onClick={() => navigate('/knowledge-hub')} className="text-slate-600 hover:text-slate-900 underline">
          Return to Knowledge Hub
        </button>
      </div>
    );
  }

  const postSlug = selectedPost.slug || selectedPost.id;
  const articleSchema = getArticleSchema({
    title: selectedPost.title,
    excerpt: selectedPost.excerpt,
    slug: postSlug,
    datePublished: selectedPost.date,
    image: selectedPost.image,
    category: selectedPost.category
  });

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Knowledge Hub', item: '/knowledge-hub' },
    { name: selectedPost.title, item: `/knowledge-hub/${postSlug}` }
  ]);

  return (
    <article className="pt-24 min-h-screen bg-white pb-20">
      <SEO 
        title={selectedPost.seoTitle || `${selectedPost.title} | Knowledge Hub`}
        description={selectedPost.metaDescription || selectedPost.excerpt}
        canonicalPath={`/knowledge-hub/${postSlug}`}
        ogType="article"
        ogImage={selectedPost.image}
        ogImageAlt={selectedPost.imageAlt || selectedPost.title}
        category={selectedPost.category}
        publishedTime={new Date(selectedPost.date || '2026-08-15').toISOString()}
        schemas={[articleSchema, breadcrumbsSchema]}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/knowledge-hub" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Knowledge Hub
        </Link>
        
        <header className="mb-12">
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-6">
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700">
              {selectedPost.category}
            </span>
            <span>{selectedPost.date}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> {selectedPost.readTime}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight mb-6">
            {selectedPost.title}
          </h1>
        </header>
        
        <figure className="mb-12 rounded-3xl overflow-hidden ring-1 ring-slate-200">
          <img 
            src={selectedPost.image} 
            alt={selectedPost.imageAlt || selectedPost.title} 
            decoding="async"
            referrerPolicy="no-referrer" 
            className="w-full h-auto object-cover max-h-[500px]" 
          />
        </figure>
        
        <div className="prose prose-lg prose-slate max-w-none text-slate-700">
          <div className="markdown-body leading-relaxed space-y-4">
            <Markdown>{selectedPost.content}</Markdown>
          </div>
        </div>
      </div>
    </article>
  );
}
