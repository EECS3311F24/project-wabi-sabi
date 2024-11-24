"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { useState } from "react";
import TagDropdown from "./SelectTag";

// Chart data with single value per month
const chartData = [
  { Day: "Monday", hours: 3 },
  { Day: "Tuesday", hours: 7 },
  { Day: "Wednesday", hours: 4 },
  { Day: "Thursday", hours: 8 },
  { Day: "Friday", hours: 5 },
  { Day: "Saturday", hours: 2 },
  { Day: "Sunday", hours: 9 },
];

// Define colors dynamically or statically
const chartConfig = {
  hours: {
    label: "Focus Hours",
    color: "#FF7D59", // Tailwind's color
  },
} satisfies ChartConfig;


const FocusTime = () => {
    const [selectedTag, setSelectedTag] = useState<string>('');
    const handleTagChange = (value: string) => {
        setSelectedTag(value);
        console.log('Selected Tag', value);
      };
  return (
    <Card className="shadow-none border-none">
      <CardHeader>
        <CardTitle>Focus Time Bar Chart</CardTitle>
        <CardDescription>Last Week</CardDescription>
        <div className="flex justify-end mb-2">
        <TagDropdown className="w-48" onSelectChange={handleTagChange} />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData} width={600} height={400}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="Day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Abbreviation for months
            />
            <YAxis
              label={{
                value: "Hours Focused",
                angle: -90,
                position: "insideLeft",
              }}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip cursor={false} />
            {/* Use color from chartConfig */}
            <Bar dataKey="hours" fill="var(--color-hours)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}


export default FocusTime;
