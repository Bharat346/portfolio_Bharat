import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Code2, 
  Database, 
  Server, 
  Globe, 
  Sparkles, 
  Layers,
  Cloud,
  PaintBucket,
  Smartphone,
  TerminalSquare,
  Box,
  CpuIcon,
  Palette,
  Search,
  X,
  Calendar,
  Zap,
  Brain,
  Workflow,
  Tag,
  Clock,
  Star,
  TrendingUp,
  Filter,
  ChevronRight,
} from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

// Category Icons Mapping
const categoryIcons = {
  "Frontend": Palette,
  "Backend": Server,
  "Database": Database,
  "DevOps": Cloud,
  "Mobile": Smartphone,
  "Tools": TerminalSquare,
  "Design": PaintBucket,
  "Frameworks": Box,
  "Languages": Code2,
  "Other": CpuIcon
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    topSkills: 0,
  });
  const [showAll, setShowAll] = useState(false);
  const [limit, setLimit] = useState(8); // Default limit per category
  
  const debouncedSearch = useDebounce(searchQuery, 500);
  const isInitialMount = useRef(true);

  // Fetch categories from skills data
  useEffect(() => {
    const extractCategories = () => {
      const uniqueCategories = [...new Set(skills.map(skill => skill.category))].filter(Boolean);
      setCategories(uniqueCategories.sort());
    };
    
    extractCategories();
  }, [skills]);

  // Fetch top skills stats
  useEffect(() => {
    const fetchTopSkills = async () => {
      try {
        const res = await axios.get("https://portfolio-bharat-backend.vercel.app/api/skills/top");
        setStats(prev => ({
          ...prev,
          topSkills: res.data.length,
        }));
      } catch (err) {
        console.error("Failed to fetch top skills", err);
      }
    };
    
    fetchTopSkills();
  }, []);

  // Fetch skills
  const fetchSkills = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://portfolio-bharat-backend.vercel.app/api/skills");
      
      // Process skills data - only keep name and category
      const processedSkills = res.data.map(skill => ({
        id: skill.id,
        name: skill.name,
        category: skill.category || "Other",
        createdAt: skill.createdAt
      }));
      
      setSkills(processedSkills);
      
      // Update total count
      setStats(prev => ({
        ...prev,
        total: processedSkills.length,
      }));
    } catch (err) {
      console.error("Failed to fetch skills", err);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    if (isInitialMount.current) {
      fetchSkills();
      isInitialMount.current = false;
    }
  }, [fetchSkills]);

  // Handle category click - toggle between category and "all"
  const handleCategoryClick = (category) => {
    if (activeCategory === category) {
      // If clicking the same category again, show all
      setActiveCategory("all");
    } else {
      // Otherwise, show the selected category
      setActiveCategory(category);
    }
  };

  // Filter skills based on search and category
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = !debouncedSearch || 
      skill.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      (skill.category && skill.category.toLowerCase().includes(debouncedSearch.toLowerCase()));
    
    const matchesCategory = activeCategory === "all" || skill.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Group skills by category
  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  // Sort categories by number of skills
  const sortedCategories = Object.keys(groupedSkills).sort((a, b) => 
    groupedSkills[b].length - groupedSkills[a].length
  );

  // Limit skills per category
  const displayedGroupedSkills = Object.fromEntries(
    Object.entries(groupedSkills).map(([category, skillsList]) => [
      category,
      showAll ? skillsList : skillsList.slice(0, limit)
    ])
  );

  // Get category color
  const getCategoryColor = (category) => {
    switch(category?.toLowerCase()) {
      case 'frontend':
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case 'backend':
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case 'database':
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case 'devops':
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case 'mobile':
        return "bg-pink-500/20 text-pink-300 border-pink-500/30";
      case 'tools':
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
      case 'design':
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case 'frameworks':
        return "bg-cyan-500/20 text-cyan-300 border-cyan-500/30";
      case 'languages':
        return "bg-indigo-500/20 text-indigo-300 border-indigo-500/30";
      case 'other':
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  if (loading && skills.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          {/* Header Skeleton */}
          <div className="text-center mb-16">
            <Skeleton className="h-8 w-48 mx-auto mb-6 bg-gray-800" />
            <Skeleton className="h-12 w-96 mx-auto mb-4 bg-gray-800" />
            <Skeleton className="h-6 w-2/3 mx-auto mb-10 bg-gray-800" />
            <Skeleton className="h-14 w-96 mx-auto bg-gray-800" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-32 rounded-xl bg-gray-900" />
            ))}
          </div>

          {/* Filters Skeleton */}
          <div className="flex justify-center gap-3 mb-12">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-10 w-32 rounded-full bg-gray-900" />
            ))}
          </div>

          {/* Skills Grid Skeleton */}
          <div className="space-y-12">
            {[1, 2, 3].map((categoryIndex) => (
              <div key={categoryIndex}>
                <Skeleton className="h-8 w-48 mb-6 bg-gray-900" />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {[1, 2, 3, 4].map((skillIndex) => (
                    <Card key={skillIndex} className="border-gray-800 bg-gray-900">
                      <CardContent className="p-6">
                        <Skeleton className="h-6 w-3/4 mb-2 bg-gray-800" />
                        <div className="flex gap-2">
                          <Skeleton className="h-6 w-20 rounded-full bg-gray-800" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
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
        damping: 15
      }
    },
  };

  const skillItem = {
    hidden: { opacity: 0, scale: 0.9 },
    show: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4
      }
    })
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 border border-gray-800 mb-6">
            <Brain className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">
              Technical Stack
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Technology
            <span className="block mt-2 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Expertise
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            A comprehensive collection of technologies, frameworks, and tools 
            mastered through real-world projects and continuous learning.
          </p>

          {/* Search and Filter Bar */}
          <div className="max-w-4xl mx-auto mb-12 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search skills by name or category..."
                className="w-full pl-12 pr-12 bg-gray-900 border-2 border-gray-800 text-white placeholder:text-gray-500 h-14 rounded-xl hover:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
            
            {/* Limit Selector */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Filter className="h-4 w-4" />
                  <span>Show:</span>
                  <select 
                    className="bg-gray-900 border border-gray-800 rounded-lg px-3 py-1.5 text-sm"
                    value={limit}
                    onChange={(e) => setLimit(parseInt(e.target.value))}
                  >
                    <option value={4}>4 per category</option>
                    <option value={8}>8 per category</option>
                    <option value={12}>12 per category</option>
                    <option value={20}>20 per category</option>
                  </select>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="border-gray-800 bg-gray-900 hover:bg-gray-800"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? "Show Less" : "Show All Skills"}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg shadow-blue-500/5">
              <div className="text-3xl font-bold text-white mb-2">
                {stats.total}
              </div>
              <div className="text-sm text-gray-400">Total Skills</div>
            </div>
            
            <div className="text-center p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg shadow-purple-500/5">
              <div className="text-3xl font-bold text-white mb-2">
                {categories.length}
              </div>
              <div className="text-sm text-gray-400">Categories</div>
            </div>
            
            <div className="text-center p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg shadow-green-500/5">
              <div className="text-3xl font-bold text-white mb-2">
                {stats.topSkills}
              </div>
              <div className="text-sm text-gray-400">Top Skills</div>
            </div>
            
            <div className="text-center p-6 bg-gray-900 border border-gray-800 rounded-2xl shadow-lg shadow-orange-500/5">
              <div className="text-3xl font-bold text-white mb-2">
                {filteredSkills.length}
              </div>
              <div className="text-sm text-gray-400">Showing</div>
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-5 py-2.5 rounded-full border transition-all flex items-center gap-2 ${
                activeCategory === "all"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent"
                  : "bg-gray-900 text-gray-300 border-gray-800 hover:border-gray-700 hover:bg-gray-800"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="text-sm font-medium">All Skills</span>
            </button>
            
            {categories.map((category) => {
              const Icon = categoryIcons[category] || Layers;
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-5 py-2.5 rounded-full border transition-all flex items-center gap-2 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-transparent"
                      : "bg-gray-900 text-gray-300 border-gray-800 hover:border-gray-700 hover:bg-gray-800"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="text-sm font-medium">{category}</span>
                  {isActive && (
                    <ChevronRight className="h-3.5 w-3.5" />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Active Filter Badge */}
        {activeCategory !== "all" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full">
              <span className="text-sm text-blue-300">
                Showing only <span className="font-semibold">{activeCategory}</span> skills
              </span>
              <button
                onClick={() => setActiveCategory("all")}
                className="p-1 hover:bg-blue-500/20 rounded-full transition-colors"
              >
                <X className="h-3 w-3 text-blue-300" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Skills Grid */}
        {sortedCategories.length > 0 ? (
          <motion.div
            className="space-y-12"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {sortedCategories.map((category) => {
              const Icon = categoryIcons[category] || CpuIcon;
              const skillsList = displayedGroupedSkills[category] || [];
              
              if (skillsList.length === 0) return null;
              
              return (
                <motion.div key={category} variants={item}>
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                        <Icon className="h-5 w-5 text-blue-400" />
                      </div>
                      <h2 className="text-2xl font-semibold text-white">{category}</h2>
                      <Badge className="bg-gray-800 text-gray-300 border-gray-700">
                        {groupedSkills[category]?.length || 0} skills
                      </Badge>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {skillsList.map((skill, index) => (
                        <motion.div 
                          key={skill.id || index} 
                          custom={index}
                          variants={skillItem}
                          initial="hidden"
                          animate="show"
                        >
                          <Card className="group bg-gray-900 border border-gray-800 rounded-xl hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 h-full">
                            <CardContent className="p-6 h-full flex flex-col">
                              <div className="flex items-start justify-between mb-4">
                                <div className="space-y-2 flex-1">
                                  <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors text-lg">
                                    {skill.name}
                                  </h3>
                                  <Badge className={`${getCategoryColor(category)} border`}>
                                    {category}
                                  </Badge>
                                </div>
                                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 ml-3">
                                  <Zap className="h-4 w-4 text-cyan-400" />
                                </div>
                              </div>
                              
                              {/* Simple display - only name and category */}
                              <div className="mt-auto pt-4 border-t border-gray-800">
                                <div className="text-xs text-gray-400 flex items-center gap-1">
                                  <Tag className="h-3 w-3" />
                                  <span>Technology</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Show More/Less for category */}
                    {groupedSkills[category]?.length > limit && !showAll && (
                      <div className="text-center mt-6">
                        <Button
                          variant="ghost"
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                          onClick={() => {
                            setActiveCategory(category);
                            setShowAll(true);
                          }}
                        >
                          Show {groupedSkills[category].length - limit} more skills in {category}
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          // No results found state
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center py-16"
          >
            <div className="inline-flex p-4 rounded-2xl bg-gray-900 mb-6 border border-gray-800">
              <Search className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              No skills found
            </h3>
            <p className="text-gray-400 mb-8">
              Try a different search term or select another category
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
                setShowAll(false);
                setLimit(8);
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* Footer Section */}
        {sortedCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-20 pt-12 border-t border-gray-800"
          >
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-3 px-4 py-3 bg-gray-900 rounded-xl mb-6 border border-gray-800">
                <Workflow className="h-4 w-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-300">
                  Continuously Evolving Stack
                </span>
              </div>
              <p className="text-gray-500 text-sm">
                Technologies are regularly updated based on industry trends, 
                project requirements, and emerging innovations in the ecosystem.
              </p>
              <div className="mt-6 text-sm text-gray-400">
                Showing {filteredSkills.length} of {stats.total} skills
                {activeCategory !== "all" && ` in ${activeCategory} category`}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Skills;