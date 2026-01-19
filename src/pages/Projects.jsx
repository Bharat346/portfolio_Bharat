import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink,
  Github,
  Search,
  Eye,
  Code2,
  Sparkles,
  Layers,
  Star,
  Calendar,
  User,
  Clock,
  Tag,
  Zap,
  X,
  ChevronRight,
  Globe,
  Server,
  Calculator,
  FileText,
  Lock,
  Code,
  Gamepad2,
  Droplets,
  Share2,
  Brain,
  Rocket,
  Database,
  Palette,
  TerminalSquare,
  Filter,
  Loader2,
} from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState(["all", "web", "utility", "game", "system"]);
  const [stats, setStats] = useState({
    total: 0,
    withDemo: 0,
    withRepo: 0,
    uniqueTech: 0,
  });
  const [apiSearchLoading, setApiSearchLoading] = useState(false);

  const debouncedSearch = useDebounce(search, 500);
  const isInitialMount = useRef(true);

  // Fetch all projects initially
  const fetchAllProjects = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://portfolio-bharat-backend.vercel.app/api/projects');
      const projectsData = Array.isArray(res.data) ? res.data : [];
      setProjects(projectsData);
      
      // Calculate stats from all projects
      calculateStats(projectsData);
    } catch (err) {
      console.error("Failed to fetch projects", err);
      setProjects([]);
      setStats({ total: 0, withDemo: 0, withRepo: 0, uniqueTech: 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  // Search projects by skill (API call)
  const searchProjectsBySkill = useCallback(async (skill) => {
    if (!skill.trim()) {
      fetchAllProjects();
      return;
    }

    try {
      setApiSearchLoading(true);
      const res = await axios.get(`https://portfolio-bharat-backend.vercel.app/api/projects?skill=${encodeURIComponent(skill)}`);
      const projectsData = Array.isArray(res.data) ? res.data : [];
      setProjects(projectsData);
      
      // Calculate stats from filtered projects
      calculateStats(projectsData);
    } catch (err) {
      console.error("Failed to search projects by skill", err);
      setProjects([]);
    } finally {
      setApiSearchLoading(false);
    }
  }, [fetchAllProjects]);

  // Calculate stats from projects data
  const calculateStats = useCallback((projectsData) => {
    // Count demos
    const demoCount = projectsData.filter(project => {
      const demoLink = getDemoLink(project);
      return demoLink !== null;
    }).length;

    // Count repos
    const repoCount = projectsData.filter(project => {
      const repoLink = getRepoLink(project);
      return repoLink !== null;
    }).length;

    // Get unique technologies
    const allTechs = new Set();
    projectsData.forEach(project => {
      const techStack = getTechStackArray(project);
      techStack.forEach(tech => allTechs.add(tech));
    });

    setStats({
      total: projectsData.length,
      withDemo: demoCount,
      withRepo: repoCount,
      uniqueTech: allTechs.size,
    });
  }, []);

  // Initial fetch
  useEffect(() => {
    if (isInitialMount.current) {
      fetchAllProjects();
      isInitialMount.current = false;
    }
  }, [fetchAllProjects]);

  // Search by skill when debounced search changes
  useEffect(() => {
    if (!isInitialMount.current) {
      if (debouncedSearch.trim()) {
        searchProjectsBySkill(debouncedSearch);
      } else {
        fetchAllProjects();
      }
    }
  }, [debouncedSearch, searchProjectsBySkill, fetchAllProjects]);

  // Filter projects by category client-side
  const filteredProjects = projects.filter(project => {
    if (selectedCategory === "all") return true;
    
    // Get project category from various sources
    const projectCategory = project.category?.toLowerCase() || "";
    const title = project.title?.toLowerCase() || "";
    const description = project.description?.toLowerCase() || "";
    
    // Match category based on project content
    switch(selectedCategory) {
      case "web":
        return projectCategory.includes('web') || 
               title.includes('web') || 
               title.includes('docs') || 
               title.includes('share') ||
               description.includes('web');
      case "utility":
        return projectCategory.includes('utility') || 
               title.includes('tool') || 
               title.includes('calculator') ||
               description.includes('tool') ||
               description.includes('utility');
      case "game":
        return projectCategory.includes('game') || 
               title.includes('game') || 
               title.includes('tic-tac') ||
               description.includes('game');
      case "system":
        return projectCategory.includes('system') || 
               title.includes('system') || 
               title.includes('water') || 
               title.includes('distribution') ||
               description.includes('system');
      default:
        return true;
    }
  });

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  // Get project icon based on category or title
  const getProjectIcon = (project) => {
    const category = project.category?.toLowerCase();
    const title = project.title?.toLowerCase();
    
    if (category?.includes('web') || title?.includes('web') || title?.includes('docs') || title?.includes('share')) return Globe;
    if (category?.includes('utility') || title?.includes('tool') || title?.includes('calculator')) return Calculator;
    if (category?.includes('game') || title?.includes('game') || title?.includes('tic-tac')) return Gamepad2;
    if (category?.includes('system') || title?.includes('system') || title?.includes('water') || title?.includes('distribution')) return Server;
    if (category?.includes('database') || title?.includes('database')) return Database;
    if (category?.includes('design') || title?.includes('design')) return Palette;
    if (category?.includes('cli') || title?.includes('cli')) return TerminalSquare;
    return Code2;
  };

  // Get category color
  const getCategoryColor = (category) => {
    if (!category) return "from-gray-500/20 to-gray-900/10";
    
    const catLower = category.toLowerCase();
    if (catLower.includes('web') || catLower.includes('docs') || catLower.includes('share')) return "from-blue-500/20 to-blue-900/10";
    if (catLower.includes('utility') || catLower.includes('tool') || catLower.includes('calculator')) return "from-green-500/20 to-green-900/10";
    if (catLower.includes('game')) return "from-purple-500/20 to-purple-900/10";
    if (catLower.includes('system') || catLower.includes('water')) return "from-cyan-500/20 to-cyan-900/10";
    if (catLower.includes('mobile')) return "from-pink-500/20 to-pink-900/10";
    if (catLower.includes('design')) return "from-red-500/20 to-red-900/10";
    if (catLower.includes('database')) return "from-indigo-500/20 to-indigo-900/10";
    if (catLower.includes('cli')) return "from-orange-500/20 to-orange-900/10";
    return "from-gray-500/20 to-gray-900/10";
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Get demo link from various sources - IMPROVED VERSION
  const getDemoLink = (project) => {
    // Check urls object first (this is what your server returns)
    if (project.urls) {
      try {
        let urlsObj;
        
        // If urls is already an object
        if (typeof project.urls === 'object') {
          urlsObj = project.urls;
        } 
        // If urls is a string, try to parse it
        else if (typeof project.urls === 'string') {
          urlsObj = JSON.parse(project.urls);
        }
        
        // Check for various demo/live/website URLs
        if (urlsObj) {
          // Check in order of priority
          const possibleDemoUrls = [
            urlsObj.demo,
            urlsObj.live,
            urlsObj.website,
            urlsObj.app,
            urlsObj.url
          ];
          
          // Return the first valid URL
          for (const url of possibleDemoUrls) {
            if (url && typeof url === 'string' && url.trim()) {
              // Ensure URL has protocol
              const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
              return formattedUrl;
            }
          }
        }
      } catch (err) {
        console.log("Error parsing URLs:", err);
      }
    }
    
    // Check demoLink field as fallback
    if (project.demoLink && typeof project.demoLink === 'string' && project.demoLink.trim()) {
      const url = project.demoLink;
      return url.startsWith('http') ? url : `https://${url}`;
    }
    
    return null;
  };

  // Get repo link from various sources - IMPROVED VERSION
  const getRepoLink = (project) => {
    // Check urls object first
    if (project.urls) {
      try {
        let urlsObj;
        
        if (typeof project.urls === 'object') {
          urlsObj = project.urls;
        } else if (typeof project.urls === 'string') {
          urlsObj = JSON.parse(project.urls);
        }
        
        if (urlsObj) {
          const possibleRepoUrls = [
            urlsObj.github,
            urlsObj.gitlab,
            urlsObj.code,
            urlsObj.repository,
            urlsObj.repo
          ];
          
          for (const url of possibleRepoUrls) {
            if (url && typeof url === 'string' && url.trim()) {
              const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
              return formattedUrl;
            }
          }
        }
      } catch (err) {
        console.log("Error parsing repository URLs:", err);
      }
    }
    
    // Check repoLink field as fallback
    if (project.repoLink && typeof project.repoLink === 'string' && project.repoLink.trim()) {
      const url = project.repoLink;
      return url.startsWith('http') ? url : `https://${url}`;
    }
    
    return null;
  };

  // Get tech stack as array
  const getTechStackArray = (project) => {
    if (!project.techStack) return [];
    
    if (Array.isArray(project.techStack)) {
      return project.techStack;
    }
    
    if (typeof project.techStack === 'object') {
      // Flatten object values into array
      return Object.values(project.techStack).flat();
    }
    
    if (typeof project.techStack === 'string') {
      try {
        const parsed = JSON.parse(project.techStack);
        if (Array.isArray(parsed)) return parsed;
        if (typeof parsed === 'object') return Object.values(parsed).flat();
      } catch {
        return project.techStack.split(',').map(t => t.trim());
      }
    }
    
    return [];
  };

  // Handle clear all filters
  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    fetchAllProjects();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative mx-auto w-24 h-24">
            <div className="absolute inset-0 rounded-full border-2 border-transparent animate-spin border-t-emerald-500 border-r-emerald-500/30"></div>
            <div className="absolute inset-4 rounded-full border-2 border-transparent animate-spin border-b-emerald-500 border-l-emerald-500/30 delay-300"></div>
            <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-emerald-500 animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-medium text-white mb-2">
              Loading Portfolio
            </h3>
            <p className="text-gray-400">Fetching creative projects...</p>
          </div>
        </div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900/50 border border-gray-800 backdrop-blur-sm mb-6">
            <Code2 className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium text-gray-300">
              Developer Portfolio
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 tracking-tight">
            Crafted
            <span className="block font-normal mt-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A curated collection of innovative solutions and creative experiments.
            Each project showcases technical excellence and thoughtful design.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search projects by technology (React, Node.js, JavaScript)..."
                className="pl-12 pr-12 bg-gray-900/50 border-2 border-gray-800 text-white placeholder:text-gray-500 h-14 rounded-xl backdrop-blur-sm hover:border-gray-700 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {(search || apiSearchLoading) && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  {apiSearchLoading ? (
                    <Loader2 className="h-4 w-4 text-emerald-400 animate-spin" />
                  ) : (
                    <button
                      onClick={() => setSearch("")}
                      className="p-1.5 hover:bg-gray-800/50 rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4 text-gray-400" />
                    </button>
                  )}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Search by technology (API search) • Filter by category below
            </p>
          </div>
        </motion.div>

        {/* Category Filters - Client-side filtering */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-400">Filter by category:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category === "all" ? Layers : 
                          category === "web" ? Globe : 
                          category === "utility" ? Calculator : 
                          category === "game" ? Gamepad2 : 
                          category === "system" ? Server : Layers;
              
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`px-5 py-2.5 rounded-full border transition-all flex items-center gap-2 backdrop-blur-sm ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-emerald-500 to-cyan-500 border-transparent text-white shadow-lg shadow-emerald-500/25"
                      : "bg-gray-900/50 border-gray-800 text-gray-300 hover:border-gray-700 hover:text-white"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="text-sm font-medium capitalize">
                    {category === "all" ? "All Projects" : category}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Overview - Calculated client-side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-6 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800/50">
              <div className="text-3xl font-light text-white mb-2">
                {stats.total}
              </div>
              <div className="text-sm text-gray-400">Total Projects</div>
            </div>
            <div className="text-center p-6 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800/50">
              <div className="text-3xl font-light text-white mb-2">
                {stats.uniqueTech}
              </div>
              <div className="text-sm text-gray-400">Technologies</div>
            </div>
            <div className="text-center p-6 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800/50">
              <div className="text-3xl font-light text-white mb-2">
                {stats.withDemo}
              </div>
              <div className="text-sm text-gray-400">Live Demos</div>
            </div>
            <div className="text-center p-6 bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-800/50">
              <div className="text-3xl font-light text-white mb-2">
                {stats.withRepo}
              </div>
              <div className="text-sm text-gray-400">Open Source</div>
            </div>
          </div>
        </motion.div>

        {/* Active Filters Display */}
        {(search || selectedCategory !== "all") && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <div className="flex flex-wrap items-center justify-center gap-3 p-4 bg-gray-900/30 backdrop-blur-sm rounded-xl border border-gray-800/50">
              <span className="text-sm text-gray-400">Active filters:</span>
              
              {search && (
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-700 px-3 py-1">
                  <Search className="h-3 w-3 mr-1.5" />
                  Technology: {search}
                </Badge>
              )}
              
              {selectedCategory !== "all" && (
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-700 px-3 py-1">
                  <Filter className="h-3 w-3 mr-1.5" />
                  Category: {selectedCategory}
                </Badge>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 text-gray-400 hover:text-white"
              >
                <X className="h-3 w-3 mr-1.5" />
                Clear all
              </Button>
            </div>
          </motion.div>
        )}

        {/* Projects Grid */}
        <AnimatePresence>
          <motion.div
            className="max-w-6xl mx-auto"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredProjects.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project) => {
                  const ProjectIcon = getProjectIcon(project);
                  const categoryColor = getCategoryColor(project.category);
                  const demoLink = getDemoLink(project);
                  const repoLink = getRepoLink(project);
                  const formattedDate = formatDate(project.createdAt || project.time);
                  const techStack = getTechStackArray(project);
                  const hasDemoLink = demoLink !== null;

                  return (
                    <motion.div key={project.id} variants={item}>
                      <Card className={`group h-full bg-gradient-to-b ${categoryColor} backdrop-blur-sm border border-gray-800/50 rounded-2xl hover:border-emerald-500/30 transition-all duration-300 overflow-hidden flex flex-col hover:shadow-2xl hover:shadow-emerald-500/10`}>
                        {/* Project Thumbnail */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                          {project.img ? (
                            <>
                              <img
                                src={project.img}
                                alt={project.title}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                onError={(e) => {
                                  e.target.src = "https://placehold.co/600x400/1a1a1a/333333?text=" + encodeURIComponent(project.title);
                                  e.target.className = "h-full w-full object-cover opacity-80";
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </>
                          ) : (
                            <div className="h-full w-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                              <div className="relative">
                                <ProjectIcon className="h-20 w-20 text-gray-700" />
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-2xl rounded-full"></div>
                              </div>
                            </div>
                          )}
                          
                          {/* Demo Link Badge - Only show if demo exists */}
                          {hasDemoLink && (
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-gradient-to-r from-emerald-500/90 to-emerald-600/90 backdrop-blur-sm text-white border-emerald-700 px-3 py-1">
                                <Eye className="h-3 w-3 mr-1.5" />
                                Live Demo
                              </Badge>
                            </div>
                          )}

                          {/* Creation Date/Time */}
                          {formattedDate !== 'N/A' && (
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-black/60 backdrop-blur-sm text-gray-300 border-gray-700 px-3 py-1">
                                <Calendar className="h-3 w-3 mr-1.5" />
                                {formattedDate}
                              </Badge>
                            </div>
                          )}
                        </div>

                        <CardHeader className="pb-4 pt-6 px-6">
                          <div className="flex items-start justify-between mb-3">
                            <CardTitle className="text-xl font-semibold text-white group-hover:text-emerald-300 transition-colors">
                              {project.title || 'Untitled Project'}
                            </CardTitle>
                            {repoLink && (
                              <a
                                href={repoLink}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                              >
                                <Github className="h-4 w-4 text-gray-400 hover:text-white" />
                              </a>
                            )}
                          </div>
                          <CardDescription className="text-gray-400 leading-relaxed text-[15px]">
                            {project.description || 'No description available.'}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="flex-1 pb-4 px-6">
                          {/* Tech Stack */}
                          {techStack.length > 0 && (
                            <div className="mb-6">
                              <div className="flex items-center gap-2 mb-3">
                                <Tag className="h-3.5 w-3.5 text-emerald-400" />
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                  Tech Stack
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {techStack.slice(0, 5).map((tech, i) => (
                                  <Badge
                                    key={i}
                                    variant="secondary"
                                    className="bg-gray-900/50 text-gray-300 border-gray-700 hover:bg-gray-800 text-xs font-normal backdrop-blur-sm"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                                {techStack.length > 5 && (
                                  <Badge
                                    variant="secondary"
                                    className="bg-gray-900/50 text-gray-300 border-gray-700 hover:bg-gray-800 text-xs font-normal backdrop-blur-sm"
                                  >
                                    +{techStack.length - 5}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Tags */}
                          {project.tags && Array.isArray(project.tags) && project.tags.length > 0 && (
                            <div className="mb-4">
                              <div className="flex flex-wrap gap-2">
                                {project.tags.slice(0, 3).map((tag, i) => (
                                  <Badge
                                    key={i}
                                    variant="outline"
                                    className="bg-gray-800/30 text-gray-400 border-gray-700 text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Project Metadata */}
                          <div className="pt-4 border-t border-gray-800/50">
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-2 text-gray-400">
                                <User className="h-3.5 w-3.5" />
                                <span>Personal Project</span>
                              </div>
                              {project.category && (
                                <Badge className="text-emerald-400 border-emerald-800 bg-emerald-500/10 px-3 py-1 text-xs">
                                  {project.category}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardContent>

                        <CardFooter className="pt-4 pb-6 px-6 border-t border-gray-800/50 mt-auto">
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-4">
                              {repoLink && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-9 gap-2 text-gray-300 hover:text-white hover:bg-gray-800/50 backdrop-blur-sm"
                                  asChild
                                >
                                  <a
                                    href={repoLink}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <Code className="h-3.5 w-3.5" />
                                    Code
                                  </a>
                                </Button>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-3">
                              {hasDemoLink ? (
                                <Button
                                  size="sm"
                                  className="h-9 gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white shadow-lg shadow-emerald-500/25"
                                  asChild
                                >
                                  <a
                                    href={demoLink}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    Visit
                                  </a>
                                </Button>
                              ) : (
                                <Badge className="bg-gray-800/50 text-gray-400 border-gray-700 px-3 py-1.5">
                                  <Lock className="h-3 w-3 mr-1.5" />
                                  Private
                                </Badge>
                              )}
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto"
              >
                <Card className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 rounded-2xl">
                  <CardContent className="py-16 text-center">
                    <div className="inline-flex p-4 rounded-2xl bg-gray-800/50 mb-6">
                      <Search className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      No projects found
                      !!! Please Reload the page !!!
                    </h3>
                    <p className="text-gray-400 mb-8">
                      {search.trim() ? `No projects found for "${search}"` : "No projects available"}
                    </p>
                    <Button
                      variant="outline"
                      className="border-gray-700 hover:border-gray-600 hover:bg-gray-800/50 text-gray-300"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        {filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 text-center"
          >
            <Separator className="mb-12 max-w-2xl mx-auto bg-gray-800/50" />
            <div className="space-y-4">
              <h3 className="text-2xl font-light text-white">
                Explore More Projects
              </h3>
              <p className="text-gray-400 max-w-lg mx-auto">
                Each project represents a unique technical challenge and creative solution.
                More innovative ideas are in development.
              </p>
              <Button
                variant="outline"
                className="mt-6 h-12 px-8 rounded-xl border-gray-700 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-white backdrop-blur-sm"
                onClick={clearFilters}
              >
                <span>View All Projects</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 pt-12 border-t border-gray-800/50"
        >
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-4 py-3 bg-gray-900/50 backdrop-blur-sm rounded-xl mb-6 border border-gray-800/50">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-gray-300">
                Built with modern technologies
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              Projects built with React, Node.js, Tailwind CSS, and other cutting-edge tools.
              Focused on performance, security, and user experience.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;