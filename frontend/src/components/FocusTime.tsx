'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import TagDropdown from './SelectTag';
import { useAuth } from './AuthProviderUtils';

/**
 * define color of the chart
 */
const chartConfig = {
  hours: {
    label: 'Focus Hours',
    color: '#FF7D59',
  },
} satisfies ChartConfig;

/**
 * focus time chart component to render the focus time bar chart
 * @returns the chart
 */
const FocusTime = () => {
  const [selectedTag, setSelectedTag] = useState<string>(''); //state to hold the selected tag which is initially empty
  const [chartData, setChartData] = useState([]); //state to hold the chart data
  const { authToken } = useAuth(); //needed for connecting with backend to authenticate

  /**
   * fetches the weekly data from the backend API
   * if a tag is selected the tag id is also added to the URL
   * for the data to be filtered by the tag.
   * @returns
   */
  const fetchWeeklyData = async () => {
    try {
      const baseURL = 'http://localhost:5000'; // Base URL of backend
      const endpoint = selectedTag ? `/chart/weekly/${selectedTag}` : `/chart/weekly`; //based on tag selection URL is different
      const url = `${baseURL}${endpoint}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch weekly data:', await response.text());
        return;
      }

      const { data } = await response.json();

      // Map data for the chart
      const formattedData = data.map((item: any) => ({
        Day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][item.weekday], //set the day to actual week days
        hours: (item.minutes / 60).toFixed(2), // Convert minutes to hours
      }));

      //update the data for the chart
      setChartData(formattedData);
    } catch (error) {
      console.error('Error fetching weekly data:', error);
    }
  };

  /**
   * sets the selected tag value to the value user selects
   * @param value
   */
  const handleTagChange = (value: string) => {
    setSelectedTag(value);
    //console.log('Selected Tag', value);
  };

  // Fetch data when selectedTag changes
  useEffect(() => {
    fetchWeeklyData();
  }, [selectedTag]);
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
                value: 'Hours Focused',
                angle: -90,
                position: 'insideLeft',
                dx: -5,
              }}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip cursor={false} />
            <Bar dataKey="hours" fill="var(--color-hours)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default FocusTime;
