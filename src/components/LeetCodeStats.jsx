import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Trophy,
  CheckCircle2,
  TrendingUp,
  Award,
  Activity,
} from "lucide-react";

const LeetCodeStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "https://leetcode-stats-api.herokuapp.com/Bharat346",
        );
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch LeetCode stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-gray-800 backdrop-blur-xl h-full animate-pulse">
        <CardContent className="h-64 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Activity className="h-8 w-8 text-primary animate-spin" />
            <span className="text-gray-400">Loading LeetCode Stats...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats || stats.status === "error") {
    return null; // Or render an error state
  }

  return (
    <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border-gray-800 backdrop-blur-xl h-full hover:border-primary/20 transition-all duration-300">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-600 to-yellow-400/30">
            <Trophy className="h-5 w-5 text-yellow-100" />
          </div>
          <div>
            <CardTitle className="text-xl">LeetCode Profile</CardTitle>
            <CardDescription className="text-gray-400">
              Problem Solving Statistics
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
              Total Solved
            </p>
            <p className="text-2xl font-bold text-white">{stats.totalSolved}</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-800">
            <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
              Acceptance
            </p>
            <p className="text-2xl font-bold text-green-400">
              {stats.acceptanceRate}%
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Easy</span>
              <span className="text-white font-medium">
                {stats.easySolved} / {stats.totalEasy}
              </span>
            </div>
            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-cyan-400"
                initial={{ width: 0 }}
                animate={{
                  width: `${(stats.easySolved / stats.totalEasy) * 100}%`,
                }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Medium</span>
              <span className="text-white font-medium">
                {stats.mediumSolved} / {stats.totalMedium}
              </span>
            </div>
            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-yellow-400"
                initial={{ width: 0 }}
                animate={{
                  width: `${(stats.mediumSolved / stats.totalMedium) * 100}%`,
                }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Hard</span>
              <span className="text-white font-medium">
                {stats.hardSolved} / {stats.totalHard}
              </span>
            </div>
            <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-red-400"
                initial={{ width: 0 }}
                animate={{
                  width: `${(stats.hardSolved / stats.totalHard) * 100}%`,
                }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
          </div>

          <div className="pt-2 flex justify-between items-center text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Award className="h-3 w-3" />
              <span>Ranking: {stats.ranking}</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-green-500" />
              <span>{stats.contributionPoints} Points</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeetCodeStats;
