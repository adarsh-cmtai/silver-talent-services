// client/src/pages/AdminDashboardPage.tsx
// <<<< ENSURE THIS FILE IS NAMED AdminDashboardPage.tsx >>>>

import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { 
    LogOut, Settings, Phone, Mail, MapPinIcon as MapPin, Briefcase, PlusCircle, Loader2, 
    AlertTriangle, UploadCloud, ImagePlus, Trash2, Edit3, Layers, Menu, X
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://silver-talent-backend.onrender.com/api";

// --- TypeScript Interfaces ---
interface ContactInfo { /* ... (same as before) ... */ 
  _id?: string; 
  address: string;
  phone: string;
  email: string;
  locationMapUrl: string;
}
interface NewVacancyData { /* ... (same as before) ... */ 
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  category: string;
  description: string;
  skills: string; 
}
interface FilterOptions {  /* ... (same as before) ... */
  categories: string[];       
  locations?: string[]; 
  jobTypes: string[];         
}

// For blog posts & categories
interface BlogCategory {
    _id: string;
    name: string;
    slug: string;
    description?: string;
}
interface NewBlogCategoryData { // For the new category form
    name: string;
    description: string;
}
interface NewBlogPostData { /* ... (same as before) ... */ 
    title: string;
    excerpt: string;
    content: string; 
    author: string;
    readTime: string;
    categoryId: string; 
    tags: string; 
    isPublished: boolean;
}


const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string>('contact');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // --- Contact Info State ---
  const [contactForm, setContactForm] = useState<ContactInfo>({ address: "", phone: "", email: "", locationMapUrl: "" });
  const [isContactLoading, setIsContactLoading] = useState<boolean>(true);
  const [isContactSubmitting, setIsContactSubmitting] = useState<boolean>(false);

  // --- New Vacancy State ---
  const initialVacancyState: NewVacancyData = { title: "", company: "", location: "", type: "", salary: "", category: "", description: "", skills: "" };
  const [newVacancy, setNewVacancy] = useState<NewVacancyData>(initialVacancyState);
  const [logoImageFile, setLogoImageFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubmittingVacancy, setIsSubmittingVacancy] = useState<boolean>(false);
  const [jobCategories, setJobCategories] = useState<string[]>([]);
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [isLoadingVacancyFilters, setIsLoadingVacancyFilters] = useState<boolean>(true);

  // --- New Blog Category State ---
  const initialBlogCategoryState: NewBlogCategoryData = { name: "", description: "" };
  const [newBlogCategory, setNewBlogCategory] = useState<NewBlogCategoryData>(initialBlogCategoryState);
  const [isSubmittingBlogCategory, setIsSubmittingBlogCategory] = useState<boolean>(false);

  // --- New Blog Post State ---
  const initialBlogPostState: NewBlogPostData = { title: "", excerpt: "", content: "", author: "", readTime: "5 min read", categoryId: "", tags: "", isPublished: false };
  const [newBlogPost, setNewBlogPost] = useState<NewBlogPostData>(initialBlogPostState);
  const [blogImageFile, setBlogImageFile] = useState<File | null>(null);
  const [blogImagePreview, setBlogImagePreview] = useState<string | null>(null);
  const [isSubmittingBlogPost, setIsSubmittingBlogPost] = useState<boolean>(false);
  const [blogPostCategories, setBlogPostCategories] = useState<BlogCategory[]>([]); 
  const [isLoadingBlogCategories, setIsLoadingBlogCategories] = useState<boolean>(true);


  const fetchBlogCategories = async () => { // Helper function to fetch/re-fetch blog categories
    setIsLoadingBlogCategories(true);
    try {
        const response = await fetch(`${API_BASE_URL}/blog/categories`);
        if (!response.ok) throw new Error(`Blog Categories: ${response.statusText || response.status}`);
        const data: BlogCategory[] = await response.json();
        setBlogPostCategories(data);
        // If adding a new blog post and no category is selected, select the first one
        if (newBlogPost.categoryId === "" && data.length > 0) {
            setNewBlogPost(prev => ({ ...prev, categoryId: data[0]._id }));
        }
    } catch (error: any) {
        console.error("Failed to fetch blog categories:", error);
        toast.error(error.message || "Could not load blog categories.");
    } finally {
        setIsLoadingBlogCategories(false);
    }
  }

  useEffect(() => {
    document.title = "Admin Dashboard | Silver Talent";
    const fetchInitialAdminData = async () => {
      setIsContactLoading(true);
      setIsLoadingVacancyFilters(true);
      // setIsLoadingBlogCategories(true); // Moved to fetchBlogCategories

      try {
        const [contactResponse, vacancyFiltersResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/contact-info`),
          fetch(`${API_BASE_URL}/filter-options`), 
        ]);

        if (!contactResponse.ok) throw new Error(`Contact Info: ${contactResponse.statusText || contactResponse.status}`);
        const contactData: ContactInfo = await contactResponse.json();
        setContactForm(contactData);
        setIsContactLoading(false);

        if (!vacancyFiltersResponse.ok) throw new Error(`Vacancy Filters: ${vacancyFiltersResponse.statusText || vacancyFiltersResponse.status}`);
        const vacancyFiltersData: FilterOptions = await vacancyFiltersResponse.json();
        const activeJobCategories = vacancyFiltersData.categories?.filter(cat => cat !== "All Categories") || [];
        const activeJobTypes = vacancyFiltersData.jobTypes?.filter(type => type !== "All Types") || [];
        setJobCategories(activeJobCategories);
        setJobTypes(activeJobTypes);
        if (newVacancy.category === "" && activeJobCategories.length > 0) setNewVacancy(prev => ({ ...prev, category: activeJobCategories[0] }));
        if (newVacancy.type === "" && activeJobTypes.length > 0) setNewVacancy(prev => ({ ...prev, type: activeJobTypes[0] }));
        setIsLoadingVacancyFilters(false);

        fetchBlogCategories(); // Fetch blog categories

      } catch (error: any) {
        console.error("Failed to fetch initial admin data:", error);
        toast.error(error.message || "Failed to load admin dashboard data.");
        setIsContactLoading(false); 
        setIsLoadingVacancyFilters(false);
        setIsLoadingBlogCategories(false); // Ensure this is false on error too
      }
    };
    fetchInitialAdminData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const handleLogout = () => { /* ... (same as before) ... */ 
    console.log("Admin logging out...");
    toast.success("Admin logged out successfully!");
    navigate("/admin-login"); 
  };

  // --- Contact Info Handlers ---
  const handleContactInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setContactForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleContactInfoSubmit = async (e: FormEvent<HTMLFormElement>) => { /* ... (same as before, condensed) ... */ 
    e.preventDefault(); setIsContactSubmitting(true);
    try { 
        const response = await fetch(`${API_BASE_URL}/contact-info`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(contactForm) });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Update failed.");
        toast.success(result.message || "Contact info updated!");
        if(result.data) setContactForm(result.data);
    } catch (error: any) { toast.error(error.message); } 
    finally { setIsContactSubmitting(false); }
  };

  // --- New Vacancy Handlers ---
  const handleNewVacancyChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNewVacancy(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleNewVacancySelectChange = (name: keyof NewVacancyData, value: string) => setNewVacancy(prev => ({ ...prev, [name]: value }));
  const handleLogoImageChange = (e: ChangeEvent<HTMLInputElement>) => { /* ... (same as before, condensed) ... */ 
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) { toast.error("Logo max 2MB."); e.target.value = ""; return; }
      if (!['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'].includes(file.type)) { toast.error("Invalid logo type."); e.target.value = ""; return; }
      setLogoImageFile(file); setLogoPreview(URL.createObjectURL(file));
    } else { setLogoImageFile(null); setLogoPreview(null); }
  };
  const removeVacancyLogoImage = () => { // Renamed for clarity
    setLogoImageFile(null); setLogoPreview(null);
    const fileInput = document.getElementById('logoImage') as HTMLInputElement; if (fileInput) fileInput.value = "";
  };
  const handleAddNewVacancySubmit = async (e: FormEvent<HTMLFormElement>) => { /* ... (same as before, condensed) ... */ 
    e.preventDefault(); setIsSubmittingVacancy(true);
    const formData = new FormData();
    Object.entries(newVacancy).forEach(([k, v]) => formData.append(k, v));
    if (logoImageFile) formData.append('logoImage', logoImageFile);
    try { 
        const response = await fetch(`${API_BASE_URL}/jobs`, { method: 'POST', body: formData });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Add vacancy failed.");
        toast.success(result.message || "Vacancy added!");
        const defaultCategory = jobCategories.length > 0 ? jobCategories[0] : "";
        const defaultType = jobTypes.length > 0 ? jobTypes[0] : "";
        setNewVacancy({...initialVacancyState, category: defaultCategory, type: defaultType }); 
        removeVacancyLogoImage();
    } catch (error: any) { toast.error(error.message); } 
    finally { setIsSubmittingVacancy(false); }
  };
  
  // --- New Blog Category Handlers ---
  const handleNewBlogCategoryChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewBlogCategory(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleAddNewBlogCategorySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newBlogCategory.name.trim()) {
        toast.error("Category name is required.");
        return;
    }
    setIsSubmittingBlogCategory(true);
    try {
        const response = await fetch(`${API_BASE_URL}/blog/categories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBlogCategory)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to add blog category.");
        toast.success(result.message || "Blog category added successfully!");
        setNewBlogCategory(initialBlogCategoryState); // Reset form
        fetchBlogCategories(); // Re-fetch categories to update dropdowns
    } catch (error: any) {
        console.error("Error adding blog category:", error);
        toast.error(error.message || "Could not add blog category.");
    } finally {
        setIsSubmittingBlogCategory(false);
    }
  };


  // --- New Blog Post Handlers ---
  const handleNewBlogPostChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setNewBlogPost(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleNewBlogPostSelectChange = (name: 'categoryId' , value: string) => setNewBlogPost(prev => ({ ...prev, [name]: value }));
  const handleBlogImageChange = (e: ChangeEvent<HTMLInputElement>) => { /* ... (same as before, condensed) ... */ 
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) { toast.error("Image max 2MB."); e.target.value = ""; return; }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { toast.error("Invalid image type."); e.target.value = ""; return; }
      setBlogImageFile(file); setBlogImagePreview(URL.createObjectURL(file));
    } else { setBlogImageFile(null); setBlogImagePreview(null); }
  };
  const removeBlogPostImage = () => { // Renamed for clarity
    setBlogImageFile(null); setBlogImagePreview(null);
    const fileInput = document.getElementById('blogFeaturedImage') as HTMLInputElement; if (fileInput) fileInput.value = "";
  };
  const handleNewBlogPostCheckboxChange = (checked: boolean | 'indeterminate') => { /* ... (same as before) ... */
    if (typeof checked === 'boolean') setNewBlogPost(prev => ({ ...prev, isPublished: checked }));
  };
  const handleAddNewBlogPostSubmit = async (e: FormEvent<HTMLFormElement>) => { /* ... (same as before, condensed) ... */ 
    e.preventDefault(); setIsSubmittingBlogPost(true);
    const formData = new FormData();
    Object.entries(newBlogPost).forEach(([k, v]) => formData.append(k, String(v))); // Ensure all values are strings for FormData
    if (blogImageFile) formData.append('featuredImageFile', blogImageFile); 
    try {
        const response = await fetch(`${API_BASE_URL}/blog/posts`, { method: 'POST', body: formData });
        const result = await response.json(); // Assume backend sends JSON now
        if (!response.ok) throw new Error(result.message || "Add blog post failed.");
        toast.success(result.message || "Blog post added!");
        const defaultBlogCategory = blogPostCategories.length > 0 ? blogPostCategories[0]._id : "";
        setNewBlogPost({...initialBlogPostState, categoryId: defaultBlogCategory});
        removeBlogPostImage();
    } catch (error: any) { toast.error(error.message); }
    finally { setIsSubmittingBlogPost(false); }
  };

  const renderSidebar = () => (
    <div className={`fixed top-0 left-0 h-screen bg-white shadow-lg transition-all duration-300 z-20 ${isSidebarOpen ? 'w-64' : 'w-0'}`}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <nav className="p-4 space-y-2">
        <Button
          variant={activeSection === 'contact' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setActiveSection('contact')}
        >
          <Settings className="mr-2 h-5 w-5" />
          Contact Information
        </Button>
        <Button
          variant={activeSection === 'vacancy' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setActiveSection('vacancy')}
        >
          <Briefcase className="mr-2 h-5 w-5" />
          Add Vacancy
        </Button>
        <Button
          variant={activeSection === 'blog-category' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setActiveSection('blog-category')}
        >
          <Layers className="mr-2 h-5 w-5" />
          Blog Categories
        </Button>
        <Button
          variant={activeSection === 'blog-post' ? 'secondary' : 'ghost'}
          className="w-full justify-start"
          onClick={() => setActiveSection('blog-post')}
        >
          <Edit3 className="mr-2 h-5 w-5" />
          Blog Posts
        </Button>
        <div className="pt-4 mt-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </nav>
    </div>
  );

  const renderContactSection = () => (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
        <Settings size={24} className="mr-3 text-sky-600" />
        <h2 className="text-2xl font-semibold text-gray-700">Manage Contact Information</h2>
      </div>
      {isContactLoading ? (
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleContactInfoSubmit} className="space-y-6">
          <div>
            <Label htmlFor="address" className="text-sm font-medium text-gray-700 flex items-center mb-1">
              <MapPin size={16} className="mr-2 text-gray-500" /> Address
            </Label>
            <Textarea 
              id="address" 
              name="address" 
              value={contactForm.address} 
              onChange={handleContactInputChange} 
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" 
              rows={3} 
              required 
              disabled={isContactSubmitting}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center mb-1">
                <Phone size={16} className="mr-2 text-gray-500" /> Phone
              </Label>
              <Input 
                id="phone" 
                name="phone" 
                type="tel" 
                value={contactForm.phone} 
                onChange={handleContactInputChange} 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" 
                required 
                disabled={isContactSubmitting}
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center mb-1">
                <Mail size={16} className="mr-2 text-gray-500" /> Email
              </Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={contactForm.email} 
                onChange={handleContactInputChange} 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" 
                required 
                disabled={isContactSubmitting}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="locationMapUrl" className="text-sm font-medium text-gray-700 flex items-center mb-1">
              <MapPin size={16} className="mr-2 text-gray-500" /> Maps URL
            </Label>
            <Input 
              id="locationMapUrl" 
              name="locationMapUrl" 
              type="url" 
              value={contactForm.locationMapUrl} 
              onChange={handleContactInputChange} 
              placeholder="https://..." 
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500" 
              disabled={isContactSubmitting}
            />
          </div>
          <div>
            <Button 
              type="submit" 
              className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white rounded-md" 
              disabled={isContactSubmitting}
            >
              {isContactSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Contact
            </Button>
          </div>
        </form>
      )}
    </div>
  );

  const renderVacancySection = () => (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
        <PlusCircle size={24} className="mr-3 text-green-600" />
        <h2 className="text-2xl font-semibold text-gray-700">Add New Vacancy</h2>
      </div>
      {isLoadingVacancyFilters ? (
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleAddNewVacancySubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div><Label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">Job Title *</Label><Input id="title" name="title" value={newVacancy.title} onChange={handleNewVacancyChange} required className="mt-1 border-gray-300 rounded-md" disabled={isSubmittingVacancy}/></div>
            <div><Label htmlFor="company" className="text-sm font-medium text-gray-700 mb-1">Company *</Label><Input id="company" name="company" value={newVacancy.company} onChange={handleNewVacancyChange} required className="mt-1 border-gray-300 rounded-md" disabled={isSubmittingVacancy}/></div>
            <div><Label htmlFor="location" className="text-sm font-medium text-gray-700 mb-1">Location *</Label><Input id="location" name="location" value={newVacancy.location} onChange={handleNewVacancyChange} required className="mt-1 border-gray-300 rounded-md" placeholder="e.g., City, ST or Remote" disabled={isSubmittingVacancy}/></div>
            <div><Label htmlFor="salary" className="text-sm font-medium text-gray-700 mb-1">Salary *</Label><Input id="salary" name="salary" value={newVacancy.salary} onChange={handleNewVacancyChange} required className="mt-1 border-gray-300 rounded-md" placeholder="e.g., $100k - $120k" disabled={isSubmittingVacancy}/></div>
            <div><Label htmlFor="vacancyCategory" className="text-sm font-medium text-gray-700 mb-1">Category *</Label><Select name="category" value={newVacancy.category} onValueChange={(v) => handleNewVacancySelectChange("category",v)} required disabled={isSubmittingVacancy || jobCategories.length === 0}><SelectTrigger className="mt-1 h-10 border-gray-300 rounded-md"><SelectValue placeholder="Select category"/></SelectTrigger><SelectContent>{jobCategories.map(c=><SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
            <div><Label htmlFor="vacancyType" className="text-sm font-medium text-gray-700 mb-1">Job Type *</Label><Select name="type" value={newVacancy.type} onValueChange={(v) => handleNewVacancySelectChange("type",v)} required disabled={isSubmittingVacancy || jobTypes.length === 0}><SelectTrigger className="mt-1 h-10 border-gray-300 rounded-md"><SelectValue placeholder="Select type"/></SelectTrigger><SelectContent>{jobTypes.map(t=><SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select></div>
            <div className="md:col-span-2"><Label htmlFor="logoImage" className="text-sm font-medium text-gray-700 mb-1">Company Logo</Label><div className="mt-1 flex items-center gap-4">{logoPreview ? (<div className="relative group"><img src={logoPreview} alt="Logo" className="h-20 w-20 rounded-md object-contain border p-1 bg-gray-50"/><Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100" onClick={removeVacancyLogoImage}><Trash2 className="h-3 w-3"/></Button></div>):(<div className="h-20 w-20 rounded-md border-2 border-dashed flex flex-col items-center justify-center bg-gray-50 text-gray-400"><ImagePlus className="h-8 w-8"/><span className="text-xs mt-1">Upload</span></div>)}<Input id="logoImage" name="logoImage" type="file" accept="image/*" onChange={handleLogoImageChange} className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer border-gray-300 rounded-md" disabled={isSubmittingVacancy} aria-describedby="logo-desc"/><p id="logo-desc" className="text-xs text-gray-500 mt-1">Max 2MB.</p></div></div>
            <div className="md:col-span-2"><Label htmlFor="skills" className="text-sm font-medium text-gray-700 mb-1">Skills (comma-separated)</Label><Input id="skills" name="skills" value={newVacancy.skills} onChange={handleNewVacancyChange} className="mt-1 border-gray-300 rounded-md" placeholder="e.g., React, Node.js" disabled={isSubmittingVacancy}/></div>
          </div>
          <div className="md:col-span-2"><Label htmlFor="description" className="text-sm font-medium text-gray-700 mb-1">Description *</Label><Textarea id="description" name="description" value={newVacancy.description} onChange={handleNewVacancyChange} required className="mt-1 border-gray-300 rounded-md" rows={6} disabled={isSubmittingVacancy}/></div>
          <div><Button type="submit" className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white rounded-md" disabled={isSubmittingVacancy || isLoadingVacancyFilters}>{isSubmittingVacancy && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}Add Vacancy</Button></div>
        </form>
      )}
    </div>
  );

  const renderBlogCategorySection = () => (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
        <Layers size={24} className="mr-3 text-indigo-600" />
        <h2 className="text-2xl font-semibold text-gray-700">Add New Blog Category</h2>
      </div>
      <form onSubmit={handleAddNewBlogCategorySubmit} className="space-y-6">
        <div>
          <Label htmlFor="blogCategoryName" className="text-sm font-medium text-gray-700 mb-1">Category Name *</Label>
          <Input 
            id="blogCategoryName" 
            name="name" 
            value={newBlogCategory.name} 
            onChange={handleNewBlogCategoryChange} 
            required 
            className="mt-1 border-gray-300 rounded-md" 
            disabled={isSubmittingBlogCategory}
            placeholder="e.g., Technology Trends"
          />
        </div>
        <div>
          <Label htmlFor="blogCategoryDescription" className="text-sm font-medium text-gray-700 mb-1">Description (Optional)</Label>
          <Textarea 
            id="blogCategoryDescription" 
            name="description" 
            value={newBlogCategory.description} 
            onChange={handleNewBlogCategoryChange} 
            className="mt-1 border-gray-300 rounded-md" 
            rows={3} 
            disabled={isSubmittingBlogCategory}
            placeholder="A brief description of the category."
          />
        </div>
        <div>
          <Button type="submit" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-md" disabled={isSubmittingBlogCategory}>
            {isSubmittingBlogCategory && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
            {isSubmittingBlogCategory ? 'Adding Category...' : 'Add Blog Category'}
          </Button>
        </div>
      </form>
    </div>
  );

  const renderBlogPostSection = () => (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
      <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
        <Edit3 size={24} className="mr-3 text-purple-600" />
        <h2 className="text-2xl font-semibold text-gray-700">Add New Blog Post</h2>
      </div>
      {isLoadingBlogCategories ? (
        <div className="space-y-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
          ))}
        </div>
      ) : (
        <form onSubmit={handleAddNewBlogPostSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <div><Label htmlFor="blogTitle" className="text-sm font-medium text-gray-700 mb-1">Post Title *</Label><Input id="blogTitle" name="title" value={newBlogPost.title} onChange={handleNewBlogPostChange} required className="mt-1 border-gray-300 rounded-md" disabled={isSubmittingBlogPost}/></div>
            <div><Label htmlFor="blogAuthor" className="text-sm font-medium text-gray-700 mb-1">Author *</Label><Input id="blogAuthor" name="author" value={newBlogPost.author} onChange={handleNewBlogPostChange} required className="mt-1 border-gray-300 rounded-md" disabled={isSubmittingBlogPost}/></div>
            <div>
              <Label htmlFor="blogPostCategorySelect" className="text-sm font-medium text-gray-700 mb-1">Category *</Label>
              <Select name="categoryId" value={newBlogPost.categoryId} onValueChange={(v) => handleNewBlogPostSelectChange("categoryId",v)} required disabled={isSubmittingBlogPost || isLoadingBlogCategories || blogPostCategories.length === 0}>
                <SelectTrigger className="mt-1 h-10 border-gray-300 rounded-md"><SelectValue placeholder={isLoadingBlogCategories ? "Loading..." : blogPostCategories.length === 0 ? "No categories" : "Select category"}/></SelectTrigger>
                <SelectContent>{!isLoadingBlogCategories && blogPostCategories.map(cat => <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div><Label htmlFor="blogReadTime" className="text-sm font-medium text-gray-700 mb-1">Read Time *</Label><Input id="blogReadTime" name="readTime" value={newBlogPost.readTime} onChange={handleNewBlogPostChange} required className="mt-1 border-gray-300 rounded-md" placeholder="e.g., 5 min read" disabled={isSubmittingBlogPost}/></div>
            <div className="md:col-span-2"><Label htmlFor="blogExcerpt" className="text-sm font-medium text-gray-700 mb-1">Excerpt *</Label><Textarea id="blogExcerpt" name="excerpt" value={newBlogPost.excerpt} onChange={handleNewBlogPostChange} required className="mt-1 border-gray-300 rounded-md" rows={3} disabled={isSubmittingBlogPost}/></div>
            <div className="md:col-span-2"><Label htmlFor="blogContent" className="text-sm font-medium text-gray-700 mb-1">Full Content *</Label><Textarea id="blogContent" name="content" value={newBlogPost.content} onChange={handleNewBlogPostChange} required className="mt-1 border-gray-300 rounded-md" rows={8} placeholder="Paragraphs separated by blank lines." disabled={isSubmittingBlogPost}/><p className="text-xs text-gray-500 mt-1">Tip: Separate paragraphs with a blank line.</p></div>
            <div className="md:col-span-2"><Label htmlFor="blogFeaturedImage" className="text-sm font-medium text-gray-700 mb-1">Featured Image *</Label><div className="mt-1 flex items-center gap-4">{blogImagePreview ? (<div className="relative group"><img src={blogImagePreview} alt="Blog preview" className="h-20 w-32 rounded-md object-cover border p-1 bg-gray-50"/><Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100" onClick={removeBlogPostImage}><Trash2 className="h-3 w-3"/></Button></div>):(<div className="h-20 w-32 rounded-md border-2 border-dashed flex flex-col items-center justify-center bg-gray-50 text-gray-400"><ImagePlus className="h-8 w-8"/><span className="text-xs mt-1">Upload</span></div>)}<Input id="blogFeaturedImage" name="featuredImageFile" type="file" accept="image/*" onChange={handleBlogImageChange} className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer border-gray-300 rounded-md" disabled={isSubmittingBlogPost} required aria-describedby="blog-img-desc"/><p id="blog-img-desc" className="text-xs text-gray-500 mt-1">Required. Max 2MB.</p></div></div>
            <div className="md:col-span-2"><Label htmlFor="blogTags" className="text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</Label><Input id="blogTags" name="tags" value={newBlogPost.tags} onChange={handleNewBlogPostChange} className="mt-1 border-gray-300 rounded-md" placeholder="e.g., AI, HR Tech" disabled={isSubmittingBlogPost}/></div>
            <div className="md:col-span-2 flex items-center space-x-2 pt-2"><Checkbox id="isPublished" checked={newBlogPost.isPublished} onCheckedChange={handleNewBlogPostCheckboxChange} disabled={isSubmittingBlogPost}/><Label htmlFor="isPublished" className="text-sm font-medium text-gray-700 cursor-pointer select-none">Publish immediately</Label></div>
          </div>
          <div><Button type="submit" className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white rounded-md" disabled={isSubmittingBlogPost || isLoadingBlogCategories}>{isSubmittingBlogPost && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}Add Blog Post</Button></div>
        </form>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Toaster richColors position="top-center" duration={4000} />
      
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-10 p-4 flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="w-10"></div>
      </div>

      {/* Sidebar */}
      {renderSidebar()}

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        <div className="container mx-auto py-8 px-4 pt-20 lg:pt-8">
          {/* Desktop Header */}
          <div className="hidden lg:flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {activeSection === 'contact' && renderContactSection()}
            {activeSection === 'vacancy' && renderVacancySection()}
            {activeSection === 'blog-category' && renderBlogCategorySection()}
            {activeSection === 'blog-post' && renderBlogPostSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;