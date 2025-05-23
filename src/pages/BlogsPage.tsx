// client/src/pages/Blogs.tsx (or your preferred path)
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"; // Added more Dialog parts
import { Input } from '@/components/ui/input'; // Assuming you have this
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge'; // For tags
import { 
  ArrowRight, Clock, User, CalendarDays as Calendar, ChevronRight, Search, Tag, Loader2, AlertTriangle, X
} from 'lucide-react';
// import { FaUsersCog } from 'react-icons/fa'; // Using Lucide equivalent if preferred or keep
import { UsersRound } from 'lucide-react'; // Lucide equivalent for FaUsersCog
import { toast, Toaster } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://silver-talent-backend.onrender.com/api";

// --- TypeScript Interfaces ---
interface BlogImage {
  public_id?: string;
  url: string;
}

interface BlogCategoryRef {
  _id: string;
  name: string;
  slug: string;
}

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string[]; // Array of paragraphs
  author: string;
  publishDate: string; // ISO Date string
  readTime: string;
  featuredImage?: BlogImage;
  category: BlogCategoryRef; // Populated category
  tags: string[];
  views?: number;
}

interface BlogCategory {
    _id: string;
    name: string;
    slug: string;
    description?: string;
}


const BlogsPage = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>("all-categories");


  // Fetch initial data (categories and all posts)
  useEffect(() => {
    document.title = "Blog | Silver Talent";
    const fetchInitialData = async () => {
      setIsLoadingPosts(true);
      setIsLoadingCategories(true);
      setError(null);
      try {
        const [postsResponse, categoriesResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/blog/posts`), // Fetch all published posts initially
          fetch(`${API_BASE_URL}/blog/categories`)
        ]);

        if (!postsResponse.ok) throw new Error(`Posts: ${postsResponse.statusText || postsResponse.status}`);
        const postsData: BlogPost[] = await postsResponse.json();
        setBlogPosts(postsData);

        if (!categoriesResponse.ok) throw new Error(`Categories: ${categoriesResponse.statusText || categoriesResponse.status}`);
        const categoriesData: BlogCategory[] = await categoriesResponse.json();
        setCategories(categoriesData);

      } catch (err: any) {
        console.error("Error fetching blog data:", err);
        setError(err.message || "Failed to load blog content.");
        toast.error(err.message || "Failed to load blog content.");
      } finally {
        setIsLoadingPosts(false);
        setIsLoadingCategories(false);
      }
    };
    fetchInitialData();
  }, []);

  // Fetch posts based on filters (debounced)
  useEffect(() => {
    // Don't run on initial mount if categories haven't loaded yet or if it's the default state
    if ((!isLoadingCategories && (searchTerm || selectedCategorySlug !== "all-categories"))) {
        const handler = setTimeout(() => {
            fetchFilteredPosts();
        }, 700); // Debounce
        return () => clearTimeout(handler);
    } else if (!isLoadingCategories && !searchTerm && selectedCategorySlug === "all-categories" && blogPosts.length === 0 && !isLoadingPosts){
        // If filters are reset and no posts are shown (e.g. after an error), try fetching all again
        fetchFilteredPosts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedCategorySlug, isLoadingCategories]);


  const fetchFilteredPosts = async () => {
    setIsLoadingPosts(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.append('search', searchTerm.trim());
      if (selectedCategorySlug && selectedCategorySlug !== "all-categories") {
        params.append('category', selectedCategorySlug);
      }
      // You can add tag filtering here if you implement a UI for it
      // if (selectedTag) params.append('tag', selectedTag);

      const response = await fetch(`${API_BASE_URL}/blog/posts?${params.toString()}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Filtered Posts: ${response.statusText || response.status}` }));
        throw new Error(errorData.message || `Filtered Posts: ${response.statusText || response.status}`);
      }
      const data: BlogPost[] = await response.json();
      setBlogPosts(data);
    } catch (err: any) {
      console.error("Error fetching filtered blog posts:", err);
      setError(err.message || "Failed to load filtered blog posts.");
      toast.error(err.message || "Failed to load filtered posts.");
      setBlogPosts([]); // Clear posts on error
    } finally {
      setIsLoadingPosts(false);
    }
  };
  
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (slug: string) => {
    setSelectedCategorySlug(slug);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const openBlogModal = async (slug: string) => {
    // Fetch full blog post details if needed, or use existing if excerpt is enough
    // For this example, we'll assume the main list has enough, but in a real app
    // you might fetch the full content for the modal if it's very long.
    // The current backend GET /blog/posts/:slug fetches full content and increments views.
    
    const existingPost = blogPosts.find(p => p.slug === slug);
    if (existingPost && existingPost.content.length > 0) { // Check if content is already substantial
        setSelectedBlog(existingPost); // Use existing data
        return;
    }
    
    // If not found or content seems minimal, fetch fresh
    try {
        toast.loading("Loading article details...");
        const response = await fetch(`${API_BASE_URL}/blog/posts/${slug}`);
        if (!response.ok) throw new Error("Failed to load article details.");
        const postData: BlogPost = await response.json();
        setSelectedBlog(postData);
        // Optionally update the views in the main list if your UI shows it
        setBlogPosts(prevPosts => prevPosts.map(p => p._id === postData._id ? {...p, views: postData.views} : p));
        toast.dismiss(); // Dismiss loading toast
    } catch (err: any) {
        toast.dismiss();
        toast.error(err.message || "Could not load article.");
        console.error("Error fetching single blog post for modal:", err);
    }
  };


  // --- Render Skeletons ---
  const PostSkeleton = () => (
    <Card className="overflow-hidden animate-pulse">
      <div className="relative h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-full mb-3"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
        <div className="h-8 bg-gray-300 rounded w-1/3"></div>
      </div>
    </Card>
  );


  return (
    <div className="min-h-screen bg-slate-50 selection:bg-sky-100">
      <Toaster richColors position="top-center" />
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1453928582365-b6ad3332aab4?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center opacity-10 mix-blend-soft-light"></div>
        <div className="container mx-auto px-4 py-24 sm:py-32 relative">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1.5 bg-white/10 rounded-full backdrop-blur-sm mb-6">
              <span className="text-xs sm:text-sm font-medium">Latest Insights & Trends</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Talent & HR <span className="text-sky-400">Solutions Blog</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/80 mb-8 leading-relaxed">
              Stay updated with trends, strategies, and best practices in recruitment, HR management, and talent development.
            </p>
            {/* <div className="flex gap-4">
              <Button size="lg" className="bg-white text-sky-600 hover:bg-gray-100 px-8 rounded-lg">
                Explore Articles
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div> */}
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 -mt-12 sm:-mt-16 relative z-10">
        <Card className="p-4 sm:p-6 bg-white shadow-xl border-gray-200 rounded-xl">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative w-full">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              <Input
                type="text"
                placeholder="Search articles by title, keyword, tag..."
                className="w-full pl-11 pr-4 py-2.5 h-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-base"
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search blog articles"
              />
            </div>
            <div className="w-full md:w-auto">
              {isLoadingCategories ? (
                <div className="h-11 bg-gray-200 rounded-lg animate-pulse w-full md:w-52"></div>
              ) : (
                <Select value={selectedCategorySlug} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full md:w-52 h-11 border-gray-300 rounded-lg text-base focus:ring-sky-500">
                    <SelectValue placeholder="Filter by Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-categories">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat._id} value={cat.slug}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Blog Posts Section */}
      <section className="py-16 sm:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
              Featured Articles
            </h2>
            <div className="w-24 h-1.5 bg-sky-500 mx-auto rounded-full"></div>
            {/* <UsersRound className="text-sky-600 w-10 h-10 md:w-12 md:h-12 mt-4 mx-auto" /> */}
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mt-6 text-base md:text-lg">
              Explore our latest insights and expert perspectives on talent management and HR solutions.
            </p>
          </div>

          {isLoadingPosts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => <PostSkeleton key={i} />)}
            </div>
          ) : error ? (
            <div className="text-center py-10 bg-red-50 rounded-lg shadow">
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-600 text-lg">{error}</p>
            </div>
          ) : blogPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((blog) => (
                <Card key={blog._id} className="overflow-hidden group hover:shadow-xl transition-shadow duration-300 rounded-xl border-gray-200 flex flex-col">
                  <div className="relative h-52 sm:h-56 overflow-hidden">
                    <img
                      src={blog.featuredImage?.url || `https://images.unsplash.com/photo-1505682499293-230dd9df9655?q=80&w=800&auto=format&fit=crop`}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => (e.currentTarget.src = `https://images.unsplash.com/photo-1505682499293-230dd9df9655?q=80&w=800&auto=format&fit=crop`)} // Fallback
                    />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <Badge variant="default" className="bg-sky-600 text-white text-xs sm:text-sm hover:bg-sky-700">
                        {blog.category.name}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{blog.author}</div>
                      <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(blog.publishDate)}</div>
                      <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{blog.readTime}</div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 group-hover:text-sky-600 transition-colors leading-tight">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                      {blog.excerpt}
                    </p>
                    <Button
                      variant="link" // Changed to link variant for better semantics
                      className="text-sky-600 hover:text-sky-700 p-0 group self-start mt-auto font-semibold"
                      onClick={() => openBlogModal(blog.slug)}
                      aria-label={`Read more about ${blog.title}`}
                    >
                      Read More
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 col-span-full">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Blog Detail Dialog (Modal) */}
      <Dialog open={!!selectedBlog} onOpenChange={(isOpen) => !isOpen && setSelectedBlog(null)}>
        <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto p-0 rounded-lg">
          {selectedBlog && (
            <>
            <DialogHeader className="p-6 pb-4 border-b sticky top-0 bg-white z-10 rounded-t-lg">
              <DialogTitle className="text-2xl sm:text-3xl font-bold text-gray-800 pr-10">{selectedBlog.title}</DialogTitle>
              <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogHeader>
            <div className="p-6 pt-2">
              <div className="relative h-56 sm:h-72 md:h-80 mb-6 rounded-md overflow-hidden bg-gray-200">
                <img
                  src={selectedBlog.featuredImage?.url || `https://images.unsplash.com/photo-1505682499293-230dd9df9655?q=80&w=1200&auto=format&fit=crop`}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover"
                />
                {/* Category badge can be here if needed */}
              </div>
              
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1.5"><User className="w-4 h-4" />{selectedBlog.author}</div>
                <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{formatDate(selectedBlog.publishDate)}</div>
                <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{selectedBlog.readTime}</div>
                {selectedBlog.views !== undefined && <div className="flex items-center gap-1.5"><UsersRound className="w-4 h-4" />{selectedBlog.views} views</div>}
              </div>

              {/* Using Tailwind Typography plugin for prose styling if available, otherwise basic styling */}
              <article className="prose prose-slate lg:prose-lg max-w-none text-gray-700 leading-relaxed">
                {selectedBlog.content.map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </article>

              {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBlog.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs sm:text-sm font-normal"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogsPage; // Renamed component to BlogsPage for clarity