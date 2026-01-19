import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Award,
  Calendar,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const certificates = [
  {
    id: 1,
    title: "Ethical Hacking Competition",
    issuer: "Naukari Campus",
    date: "2025-05-18",
    description:
      "Secured Average position in the national-level Ethical Hacking competition by demonstrating advanced penetration testing skills and vulnerability assessment techniques. Completed challenges in network security, cryptography, and web application security within the time limit.",
    file: [
      {
        type: "pdf",
        url: "/certificates/Ethical_Hacking_part_Naukari_Campus.pdf",
        name: "Ethical_Hacking_Certificate",
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
      "Successfully completed intensive 1-week workshop on AI and Robotics, culminating in building a fully functional robotic car with obstacle detection and autonomous navigation capabilities using Arduino and Basic learning algorithms.",
    file: [
      {
        type: "pdf",
        url: "/certificates/AI_Robotic_WorkShop.pdf",
        name: "AI_Robotics_Certificate",
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
      "Awarded 2nd position in All-India Hindi Diwas Essay Competition among 500+ participants for the essay titled 'भारत में हिंदी की यात्रा'. Recognized for original research and eloquent expression in Hindi language.",
    file: [
      {
        type: "pdf",
        url: "/certificates/Essay_Competition.pdf",
        name: "Hindi_Essay_Certificate",
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
      "Scored in top 10% percentile in All India Naukari Campus Aptitude Test (AInCAT) among 50,000+ candidates, demonstrating exceptional quantitative aptitude, logical reasoning, and technical knowledge.",
    file: [
      {
        type: "pdf",
        url: "/certificates/NCAT.pdf",
        name: "AInCAT_Scorecard",
      },
    ],
    type: "pdf",
  },
  {
    id: 5,
    title: "National Students Paryavaran Competition (NSPC) 2025",
    issuer:
      "Ministry of Education & Ministry of Environment, Forest and Climate Change",
    date: "2025-07-14",
    description:
      "Successfully participated in the National Students Paryavaran Competition (NSPC) 2025 organized under the joint initiative of the Ministry of Education and the Ministry of Environment, Forest & Climate Change. Represented the National Institute of Technology Delhi, contributing to awareness and action on environmental sustainability.",
    file: [
      {
        type: "image",
        url: "/certificates/NSPC/NSPC_2025_Participation.jpg",
        name: "NSPC_2025_Certificate",
      },
      {
        type: "image",
        url: "/certificates/NSPC/NSPC_me.jpg",
        name: "NSPC_2025_Certificate",
      },
    ],
    type: "image",
  },
].sort((a, b) => new Date(b.date) - new Date(a.date));

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/30">
          <Award className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Certifications & Achievements
          </h2>
          <p className="text-gray-400">
            Professional recognition and continuous learning milestones
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full flex flex-col bg-gradient-to-br from-gray-900/50 to-black/50 border-gray-800 hover:border-primary/30 transition-all duration-300 backdrop-blur-sm group hover:shadow-lg hover:shadow-primary/5">
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div className="p-2 rounded-md bg-gray-800/50 group-hover:bg-primary/20 transition-colors">
                    {cert.type === "pdf" ? (
                      <FileText className="h-5 w-5 text-gray-400 group-hover:text-primary" />
                    ) : (
                      <ImageIcon className="h-5 w-5 text-gray-400 group-hover:text-primary" />
                    )}
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs border-gray-700 text-gray-400"
                  >
                    {new Date(cert.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                    })}
                  </Badge>
                </div>
                <CardTitle className="mt-4 text-xl line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                  {cert.title}
                </CardTitle>
                <CardDescription className="text-primary/80 font-medium">
                  {cert.issuer}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1">
                <p className="text-gray-400 text-sm line-clamp-3">
                  {cert.description}
                </p>
              </CardContent>

              <CardFooter className="pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full border-gray-700 hover:border-primary/50 hover:bg-primary/10 hover:text-white group/btn"
                    >
                      <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                      View Certificate
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl bg-gray-900/95 border-gray-800 backdrop-blur-xl p-0 overflow-hidden">
                    <CertificateViewer cert={cert} />
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CertificateViewer = ({ cert }) => {
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const file = cert.file[currentFileIndex];
  const isMultiFile = cert.file.length > 1;

  return (
    <div className="flex flex-col h-[80vh]">
      <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-black/40">
        <div>
          <h3 className="text-lg font-semibold">{cert.title}</h3>
          <p className="text-sm text-gray-400">{cert.issuer}</p>
        </div>
        {isMultiFile && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setCurrentFileIndex((prev) =>
                  prev > 0 ? prev - 1 : cert.file.length - 1,
                )
              }
              className="h-8 w-8 text-gray-400 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-400">
              {currentFileIndex + 1} / {cert.file.length}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setCurrentFileIndex((prev) =>
                  prev < cert.file.length - 1 ? prev + 1 : 0,
                )
              }
              className="h-8 w-8 text-gray-400 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 bg-black/90 flex items-center justify-center p-4 overflow-auto">
        {file.type === "pdf" ? (
          <iframe
            src={file.url}
            className="w-full h-full rounded-lg border border-gray-800"
            title={file.name}
          />
        ) : (
          <img
            src={file.url}
            alt={file.name}
            className="max-h-full max-w-full object-contain rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default Certificates;
