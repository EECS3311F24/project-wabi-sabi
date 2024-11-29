'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { useAuth } from './AuthProviderUtils';

interface TaskCompletionData {
  tag_text: string;
  percentage: number;
}
const TaskCompletionChart = () => {
  const { authToken } = useAuth();
  const [chartData, setChartData] = useState([{ tag: '', percent: 0 }]);
  const chartConfig = chartData.reduce((config, { tag }) => {
    config[tag] = { label: tag.charAt(0).toUpperCase() + tag.slice(1), color: '#FF7D59' };
    return config;
  }, {} as ChartConfig);

  const getTaskCompletionChart = async () => {
    const response = await fetch('http://localhost:5000/chart/completion/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTaskCompletionChart();

        const processedData = data.map((item: TaskCompletionData) => ({
          tag: item.tag_text,
          percent: item.percentage,
          fill: '#FF7D59',
        }));

        setChartData(processedData);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  console.log(chartData);
  return (
    <Card className="shadow-none border-none">
      <CardHeader>
        <CardTitle>Task Completion by Tag (%)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 27,
            }}
            width={600}
            height={600}
          >
            <YAxis
              dataKey="tag"
              type="category"
              interval={0}
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) => String(chartConfig[value as keyof typeof chartConfig]?.label || value)}
            />
            <XAxis dataKey="percent" type="number" domain={[0, 100]} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="percent" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TaskCompletionChart;
