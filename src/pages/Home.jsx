import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Code2,
  Database,
  Server,
  Zap,
  Cpu,
  Globe,
  ArrowRight,
  Medal,
  Trophy,
  Star,
  Layers,
  Terminal,
  Cloud,
  Shield,
  Users,
  Clock,
  Target,
  Award,
  Brain,
  Rocket,
  BookOpen,
  Coffee,
  Heart,
  MessageSquare,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Download,
  ExternalLink,
  CheckCircle2,
  Eye,
  User,
  Briefcase,
  Target as TargetIcon,
  Lightbulb,
  Handshake,
  FileCode,
  ChevronLeft,
  ChevronRight,
  X,
  Trophy as TrophyIcon,
  Building,
  CalendarDays,
  MapPin as MapPinIcon,
  GraduationCap,
  Workflow,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import Typewriter from "typewriter-effect";

// Certificate Viewer Component
const CertificateViewer = ({
  certificate,
  onClose,
  onPrev,
  onNext,
  onPrevFile,
  onNextFile,
  fileIndex,
}) => {
  const currentFile = certificate.file[fileIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Fixed: Add pointer-events-none to overlay */}
      <div
        className="absolute inset-0 pointer-events-none bg-black/80 backdrop-blur-sm pointer-events-auto"
        onClick={onClose}
      />

      {/* Fixed: Add pointer-events-auto to modal content */}
      <div
        className="relative bg-gray-900 border border-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <TrophyIcon className="h-6 w-6 text-primary" />
            <div>
              <h3 className="text-xl font-bold">{certificate.title}</h3>
              <p className="text-gray-400 text-sm">{certificate.issuer}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div
          className="p-6 overflow-auto max-h-[70vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Certificate Display */}
            <div className="lg:w-2/3">
              <div className="relative bg-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-center min-h-[400px]">
                  {currentFile.type === "pdf" ? (
                    <div className="w-full h-full">
                      <iframe
                        src={currentFile.url}
                        className="w-full h-[400px] rounded-lg pointer-events-auto"
                        title={certificate.title}
                      />
                    </div>
                  ) : (
                    <img
                      src={currentFile.url}
                      alt={certificate.title}
                      className="max-w-full h-auto max-h-[400px] rounded-lg"
                      onError={(e) => {
                        e.target.src =
                          "https://placehold.co/600x400/1a1a1a/ffffff?text=Certificate+Not+Found";
                      }}
                    />
                  )}
                </div>

                {/* File Navigation */}
                {certificate.file.length > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onPrevFile();
                      }}
                      className="border-gray-700 hover:border-gray-600 hover:bg-gray-800"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm text-gray-400">
                      {fileIndex + 1} / {certificate.file.length}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNextFile();
                      }}
                      className="border-gray-700 hover:border-gray-600 hover:bg-gray-800"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Certificate Info */}
            <div
              className="lg:w-1/3 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <h4 className="font-semibold text-lg mb-2">Description</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {certificate.description}
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Issued</p>
                  <p className="font-medium">
                    {new Date(certificate.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Type</p>
                  <p className="font-medium capitalize">{certificate.type}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Files</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {certificate.file.map((file, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle file switch here if needed
                        }}
                        className={`px-3 py-1 rounded-full text-xs transition-colors ${fileIndex === idx ? "bg-primary text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
                      >
                        File {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 space-y-3">
                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      currentFile.url,
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open Full Size
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-700 hover:border-gray-600 hover:bg-gray-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    const link = document.createElement("a");
                    link.href = currentFile.url;
                    link.download = `${certificate.title.replace(/\s+/g, "_")}.${currentFile.type}`;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div
          className="flex items-center justify-between p-6 border-t border-gray-800"
          onClick={(e) => e.stopPropagation()}
        >
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="border-gray-700 hover:border-gray-600 hover:bg-gray-800"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          <div className="text-sm text-gray-400">
            Certificate {fileIndex + 1} of {certificate.file.length}
          </div>

          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="border-gray-700 hover:border-gray-600 hover:bg-gray-800"
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Experience Item Component
const ExperienceItem = ({ experience, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/40 to-transparent" />

      {/* Timeline dot */}
      <div className="absolute left-6 top-8 -translate-x-1/2">
        <div className="h-3 w-3 rounded-full bg-gradient-to-r from-primary to-primary/70" />
      </div>

      <Card
        className="ml-12 bg-white/5 border-white/10 hover:border-primary/30 transition-all cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="space-y-2">
                <h4 className="font-bold text-xl">{experience.title}</h4>
                <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm">
                  <div className="flex items-center gap-1">
                    <Building className="h-4 w-4" />
                    <span>{experience.company}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="h-4 w-4" />
                    <span>{experience.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <CalendarDays className="h-3 w-3 text-primary" />
                  <span className="text-xs font-medium">
                    {new Date(experience.startDate).toLocaleDateString(
                      "en-US",
                      { month: "short", year: "numeric" },
                    )}{" "}
                    -
                    {experience.current
                      ? " Present"
                      : ` ${new Date(experience.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{experience.type}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed">
              {expanded
                ? experience.description
                : `${experience.description.substring(0, 150)}...`}
            </p>

            {/* Technologies */}
            {experience.technologies && experience.technologies.length > 0 && (
              <div className="pt-4">
                <div className="flex items-center gap-2 mb-3">
                  <Workflow className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-gray-300">
                    Technologies Used
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 hover:bg-primary/10 hover:border-primary/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {experience.achievements &&
              experience.achievements.length > 0 &&
              expanded && (
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-gray-300">
                      Key Achievements
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {experience.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Expand/Collapse Button */}
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-primary hover:text-primary/80 hover:bg-primary/10"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
              }}
            >
              {expanded ? "Show Less" : "Show More"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCertificate, setActiveCertificate] = useState(null);
  const [certFileIndex, setCertFileIndex] = useState(0);

  // Social profile links - Fixed with your actual links
  const socialProfiles = {
    github: "https://github.com/Bharat346",
    linkedin: "https://www.linkedin.com/in/bharat-kumar-ab49b9297",
    leetcode: "https://leetcode.com/u/Bharat346/",
    email: "mailto:bharat030406@gmail.com",
  };

  // Certificates data with correct public folder paths
  const certificates = [
    {
      id: 1,
      title: "Ethical Hacking Competition",
      issuer: "Naukari Campus",
      date: "2025-05-18",
      description:
        "Secured Average position in national-level Ethical Hacking competition demonstrating advanced penetration testing skills.",
      file: [
        {
          type: "pdf",
          url: "/certificates/Ethical_Hacking_part_Naukari_Campus.pdf",
          name: "Ethical_Hacking_Certificate.pdf",
        },
      ],
      type: "pdf",
    },
    {
      id: 2,
      title: "AI & Robotics Workshop Completion",
      issuer: "NIT Delhi",
      date: "2024-04-06",
      description:
        "Completed intensive workshop on AI and Robotics, building functional robotic car with obstacle detection.",
      file: [
        {
          type: "pdf",
          url: "/certificates/AI_Robotic_WorkShop.pdf",
          name: "AI_Robotics_Certificate.pdf",
        },
      ],
      type: "pdf",
    },
    {
      id: 3,
      title: "Hindi Diwas Essay Competition (2nd Position)",
      issuer: "Ministry of Education",
      date: "2024-09-14",
      description:
        "Awarded 2nd position in All-India Hindi Diwas Essay Competition among 500+ participants.",
      file: [
        {
          type: "pdf",
          url: "/certificates/Essay_Competition.pdf",
          name: "Hindi_Essay_Certificate.pdf",
        },
      ],
      type: "pdf",
    },
    {
      id: 4,
      title: "AInCAT Top Performer",
      issuer: "Naukari Campus",
      date: "2025-05-24",
      description:
        "Scored in top 10% percentile in All India Naukari Campus Aptitude Test among 50,000+ candidates.",
      file: [
        {
          type: "pdf",
          url: "/certificates/NCAT.pdf",
          name: "AInCAT_Scorecard.pdf",
        },
      ],
      type: "pdf",
    },
    {
      id: 5,
      title: "National Students Paryavaran Competition (NSPC) 2025",
      issuer: "Ministry of Education & Environment",
      date: "2025-07-14",
      description:
        "Participated in National Students Paryavaran Competition 2025, contributing to environmental awareness.",
      file: [
        {
          type: "image",
          url: "/certificates/NSPC/NSPC_2025_Participation.jpg",
          name: "NSPC_2025_Certificate.jpg",
        },
        {
          type: "image",
          url: "/certificates/NSPC/NSPC_me.jpg",
          name: "NSPC_2025_Photo.jpg",
        },
      ],
      type: "image",
    },
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch profile
        const profileRes = await axios.get(
          "https://portfolio-bharat-backend.vercel.app/api/profile",
        );
        setProfile(profileRes.data);

        // Fetch experiences
        const expRes = await axios.get(
          "https://portfolio-bharat-backend.vercel.app/api/experience",
        );
        setExperiences(expRes.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
        // Set default data if API fails
        setProfile({
          name: "Bharat Kumar",
          bio: "Passionate full-stack developer creating meaningful digital experiences",
        });

        // Fallback experiences
        setExperiences([
          {
            id: 1,
            title: "Machine Learning Research Intern",
            company: "NIT Delhi",
            location: "New Delhi, India",
            startDate: "2026-01-19",
            endDate: "2026-02-19",
            current: true,
            description:
              "Worked as an ML Research Intern focusing on applied machine learning concepts, data preprocessing, model experimentation, and academic research problem solving.",
            technologies: ["Python", "Machine Learning", "Data Analysis"],
            achievements: [
              "Conducted research on applied machine learning models",
              "Worked with real-world datasets under academic supervision",
              "Improved understanding of ML research workflows",
            ],
            type: "Internship",
          },
          {
            id: 2,
            title: "AI & Robotics Workshop Participant",
            company: "AI & Robotics Workshop",
            location: "India",
            startDate: "2024-04-03",
            endDate: "2024-04-16",
            current: false,
            description:
              "Participated in an intensive AI and Robotics workshop covering AI fundamentals, robotics systems, and hands-on practical sessions.",
            technologies: ["Artificial Intelligence", "Robotics", "Automation"],
            achievements: [
              "Hands-on experience with robotics systems",
              "Understanding of AI-driven automation",
              "Completed practical AI & robotics exercises",
            ],
            type: "Workshop",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const humanValues = [
    {
      icon: Heart,
      title: "Empathy First",
      description:
        "Understanding user needs and emotions to create meaningful experiences",
    },
    {
      icon: Handshake,
      title: "Collaboration",
      description: "Working together to turn visions into reality",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Finding creative solutions to complex problems",
    },
    {
      icon: TargetIcon,
      title: "Purpose-Driven",
      description: "Building products that make a real difference",
    },
  ];

  const techStack = [
    {
      icon: <Code2 className="h-5 w-5" />,
      label: "React/Next.js",
      category: "Frontend",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: <Terminal className="h-5 w-5" />,
      label: "Node.js",
      category: "Backend",
      color: "from-green-500 to-emerald-400",
    },
    {
      icon: <Database className="h-5 w-5" />,
      label: "PostgreSQL",
      category: "Database",
      color: "from-purple-500 to-violet-400",
    },
    {
      icon: <Layers className="h-5 w-5" />,
      label: "Drizzle ORM",
      category: "ORM",
      color: "from-pink-500 to-rose-400",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      label: "TypeScript",
      category: "Language",
      color: "from-blue-400 to-indigo-300",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      label: "Tailwind CSS",
      category: "Styling",
      color: "from-cyan-500 to-teal-400",
    },
  ];

  const achievements = [
    {
      icon: Users,
      label: "Happy Clients",
      value: "50+",
      description: "Satisfied partners",
    },
    {
      icon: Briefcase,
      label: "Projects",
      value: "100+",
      description: "Successfully delivered",
    },
    {
      icon: Clock,
      label: "Experience",
      value: "5+ Years",
      description: "Professional journey",
    },
    {
      icon: Target,
      label: "Success Rate",
      value: "98%",
      description: "Project success",
    },
  ];

  const services = [
    {
      title: "Web Development",
      description:
        "Creating beautiful, responsive websites that tell your story",
      icon: Code2,
      color: "from-blue-500 to-cyan-400",
    },
    {
      title: "Backend Solutions",
      description:
        "Building robust APIs and databases that power amazing experiences",
      icon: Server,
      color: "from-green-500 to-emerald-400",
    },
    {
      title: "UI/UX Design",
      description: "Designing interfaces that are both beautiful and intuitive",
      icon: Sparkles,
      color: "from-purple-500 to-pink-400",
    },
  ];

  const handleCertificateClick = (cert, index) => {
    setActiveCertificate({ cert, index });
    setCertFileIndex(0);
  };

  const handlePrevCertificate = useCallback(() => {
    if (!activeCertificate) return;
    const newIndex =
      (activeCertificate.index - 1 + certificates.length) % certificates.length;
    setActiveCertificate({ cert: certificates[newIndex], index: newIndex });
    setCertFileIndex(0);
  }, [activeCertificate, certificates]);

  const handleNextCertificate = useCallback(() => {
    if (!activeCertificate) return;
    const newIndex = (activeCertificate.index + 1) % certificates.length;
    setActiveCertificate({ cert: certificates[newIndex], index: newIndex });
    setCertFileIndex(0);
  }, [activeCertificate, certificates]);

  const handlePrevFile = useCallback(() => {
    if (!activeCertificate) return;
    const totalFiles = activeCertificate.cert.file.length;
    setCertFileIndex((certFileIndex - 1 + totalFiles) % totalFiles);
  }, [activeCertificate, certFileIndex]);

  const handleNextFile = useCallback(() => {
    if (!activeCertificate) return;
    const totalFiles = activeCertificate.cert.file.length;
    setCertFileIndex((certFileIndex + 1) % totalFiles);
  }, [activeCertificate, certFileIndex]);

  // Handle keyboard navigation for certificates
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeCertificate) return;

      switch (e.key) {
        case "ArrowLeft":
          handlePrevCertificate();
          break;
        case "ArrowRight":
          handleNextCertificate();
          break;
        case "ArrowUp":
          handlePrevFile();
          break;
        case "ArrowDown":
          handleNextFile();
          break;
        case "Escape":
          setActiveCertificate(null);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    activeCertificate,
    handlePrevCertificate,
    handleNextCertificate,
    handlePrevFile,
    handleNextFile,
  ]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-center space-y-8">
          <div className="relative mx-auto w-24 h-24">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 pointer-events-none rounded-full border-2 border-transparent border-t-primary border-r-primary/30"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border-2 border-transparent border-b-primary border-l-primary/30"
            />
            <User className="absolute inset-0 pointer-events-none m-auto h-12 w-12 text-primary" />
          </div>
          <div className="space-y-3">
            <div className="h-2 w-64 bg-gray-800 rounded-full overflow-hidden mx-auto">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary/50"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <p className="text-gray-400 text-lg font-medium">
              Crafting your digital experience...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-28">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20 md:mb-28"
        >
          {/* Welcome Badge */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">
              Welcome! I'm currently available
            </span>
          </motion.div>

          {/* Main Headline */}
          <div className="space-y-6 mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            >
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Hello, I'm{" "}
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-white">
                {profile?.name || "Bharat"}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <p className="text-2xl md:text-3xl text-gray-300 font-light max-w-3xl">
                Full Stack Developer | Software Engineer
              </p>
            </motion.div>
          </div>

          {/* Typewriter Bio */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              <Typewriter
                options={{
                  strings: [
                    "I believe technology should feel human, not robotic.",
                    "Every line of code tells a story about people and their needs.",
                    "Building software that makes life better, one project at a time.",
                    "Where technical excellence meets human understanding.",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                  cursor: "▌",
                }}
              />
            </div>
          </motion.div>

          {/* Social Profiles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex justify-center gap-6 mb-8 z-10000"
          >
            <a
              href={socialProfiles.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-full bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <Github className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href={socialProfiles.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-full bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href={socialProfiles.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-full bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300"
              aria-label="LeetCode Profile"
            >
              <FileCode className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href={socialProfiles.email}
              className="group p-4 rounded-full bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-primary/10 transition-all duration-300"
              aria-label="Send Email"
            >
              <Mail className="h-6 w-6 group-hover:scale-110 transition-transform" />
            </a>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex z-10 flex-wrap justify-center gap-4 mb-16"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl shadow-primary/20 group px-8 py-6 text-base font-semibold rounded-full"
              onClick={() => (window.location.href = socialProfiles.email)}
            >
              <Mail className="mr-3 h-5 w-5" />
              Let's Build Something Together
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 hover:border-white/40 hover:bg-white/5 rounded-full px-8 py-6 text-base font-medium"
              onClick={() => {
                // Add your resume download logic here
                const link = document.createElement("a");
                link.href =
                  "https://drive.google.com/file/d/1m-QwkN-TwGrj978aV8Vfc73pIkXsGLaw/view?usp=drivesdk";
                link.download = "Bharat_Kumar_Resume.pdf";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="mr-3 h-5 w-5" />
              Download Resume
            </Button>
          </motion.div>

          {/* Human Values */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {humanValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-300 h-full">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">
                          {value.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <Separator className="bg-gradient-to-r from-transparent via-white/10 to-transparent my-16" />

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Trophy className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Journey So Far</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Building Trust Through Results
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Numbers that reflect dedication, quality, and human connection
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="bg-white/5 border-white/10 hover:border-primary/30 transition-all">
                    <CardContent className="p-8">
                      <div className="text-center space-y-4">
                        <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-4xl font-bold text-primary mb-2">
                            {achievement.value}
                          </div>
                          <div className="font-semibold text-gray-300 mb-1">
                            {achievement.label}
                          </div>
                          <div className="text-sm text-gray-400">
                            {achievement.description}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* About & Services */}
        <div className="grid lg:grid-cols-3 gap-10 mb-20">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/5 border-white/10">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/30">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold">
                      More Than Just Code
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-lg mt-1">
                      A human approach to technology
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <p className="text-gray-300 leading-relaxed text-lg">
                  I'm not just a developer—I'm a problem solver, a collaborator,
                  and someone who genuinely cares about creating digital
                  experiences that feel personal and meaningful. With over 5
                  years of experience, I've learned that the best solutions come
                  from understanding people, not just technology.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-300">Based in India</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-300">Available now</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Coffee className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-300">
                        Coffee & conversations
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-300">Always learning</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <h4 className="font-semibold text-xl mb-5 flex items-center gap-3">
                    <Heart className="h-5 w-5 text-primary" />
                    What Matters to Me
                  </h4>
                  <div className="space-y-4">
                    {[
                      "Creating solutions that improve real people's lives",
                      "Building lasting relationships with clients and partners",
                      "Writing clean, maintainable code that stands the test of time",
                      "Making technology accessible and enjoyable for everyone",
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-300">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-white/5 border-white/10 h-full">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/30">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold">
                      How I Can Help
                    </CardTitle>
                    <CardDescription className="text-gray-400 text-lg mt-1">
                      Services with a personal touch
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {services.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="group p-5 rounded-xl border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-lg bg-gradient-to-br ${service.color}`}
                          >
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                              {service.title}
                            </h4>
                            <p className="text-gray-400 text-sm mt-2">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                <div className="pt-6">
                  <Button
                    variant="outline"
                    className="w-full border-white/20 hover:border-white/40 hover:bg-white/5 rounded-lg"
                    size="lg"
                    onClick={() =>
                      (window.location.href = socialProfiles.email)
                    }
                  >
                    <MessageSquare className="mr-3 h-5 w-5" />
                    Let's Discuss Your Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Terminal className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">My Tools</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Technology I Work With
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Tools that help me bring human-centered ideas to life
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="group p-5 rounded-xl border border-white/10 hover:border-primary/30 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div
                      className={`p-3 rounded-lg bg-gradient-to-br ${tech.color}`}
                    >
                      {tech.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{tech.label}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {tech.category}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Briefcase className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Career Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Professional Experience
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              My journey through various roles and projects that shaped my
              expertise
            </p>
          </div>

          <div className="space-y-8">
            {experiences.length > 0 ? (
              experiences
                .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                .map((experience, index) => (
                  <ExperienceItem
                    key={experience.id}
                    experience={experience}
                    index={index}
                  />
                ))
            ) : (
              <div className="text-center py-12">
                <GraduationCap className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No experience data available</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Certificates Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Certifications</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Achievements & Certifications
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Professional qualifications and recognition for excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card
                  className="bg-white/5 border-white/10 hover:border-primary/30 transition-all cursor-pointer h-full group"
                  onClick={() => handleCertificateClick(cert, index)}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
                          <Award className="h-5 w-5 text-primary" />
                        </div>
                        <Eye className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg mb-2 line-clamp-2">
                          {cert.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-3">
                          {cert.issuer}
                        </p>
                        <p className="text-gray-300 text-sm line-clamp-3">
                          {cert.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <span className="text-xs text-gray-400">
                          {new Date(cert.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="text-xs text-primary font-medium capitalize">
                          {cert.file.length}{" "}
                          {cert.file.length === 1 ? "file" : "files"}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-br from-white/10 to-white/5 border-white/10 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
            <CardContent className="relative p-12 md:p-16">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-primary/10">
                  <Handshake className="h-6 w-6 text-primary" />
                  <span className="font-bold">Ready to Collaborate</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold">
                  Let's Build Something{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Meaningful
                  </span>{" "}
                  Together
                </h2>
                <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
                  Whether you have a project in mind or just want to explore
                  possibilities, I'm here to help bring your vision to life with
                  care and expertise.
                </p>
                <div className="flex flex-wrap justify-center gap-6 pt-8">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl shadow-primary/20 group px-10 py-7 text-lg font-bold rounded-full"
                    onClick={() =>
                      (window.location.href = socialProfiles.email)
                    }
                  >
                    <Mail className="mr-3 h-6 w-6" />
                    Start a Conversation
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 hover:border-white/40 hover:bg-white/5 rounded-full py-7 text-lg font-semibold"
                    onClick={() =>
                      (window.location.href = socialProfiles.linkedin)
                    }
                  >
                    <Linkedin className="mr-3 h-6 w-6" />
                    Connect on LinkedIn
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Certificate Viewer Modal */}
      {activeCertificate && (
        <CertificateViewer
          certificate={activeCertificate.cert}
          fileIndex={certFileIndex}
          onClose={() => setActiveCertificate(null)}
          onPrev={handlePrevCertificate}
          onNext={handleNextCertificate}
          onPrevFile={handlePrevFile}
          onNextFile={handleNextFile}
        />
      )}
    </div>
  );
};

export default Home;
