import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

interface DailyGoalCount {
  day: string;
  count: number;
}

const WeeklyGoalProgress: React.FC = () => {
  const [data, setData] = useState<DailyGoalCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWeeklyProgress = async () => {
      try {
        // Replace this with your actual API call
        const response = await fetch("/api/goals/weekly-progress");
        if (!response.ok) throw new Error("Failed to fetch weekly progress");
        const weeklyData = await response.json();
        setData(weeklyData);
      } catch (error) {
        console.error("Error fetching weekly progress:", error);
        // Set some dummy data in case of error
        setData([
          { day: "Mon", count: 0 },
          { day: "Tue", count: 0 },
          { day: "Wed", count: 0 },
          { day: "Thu", count: 0 },
          { day: "Fri", count: 0 },
          { day: "Sat", count: 0 },
          { day: "Sun", count: 0 },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeeklyProgress();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Weekly Goal Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Goal Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default WeeklyGoalProgress;
