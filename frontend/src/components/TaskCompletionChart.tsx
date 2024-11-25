'use client';

import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 250, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 200, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 180, fill: 'var(--color-edge)' },
  { browser: 'opera', visitors: 150, fill: 'var(--color-opera)' },
  { browser: 'brave', visitors: 140, fill: 'var(--color-brave)' },
  { browser: 'vivaldi', visitors: 130, fill: 'var(--color-vivaldi)' },
  { browser: 'duckduckgo', visitors: 120, fill: 'var(--color-duckduckgo)' },
  { browser: 'maxthon', visitors: 110, fill: 'var(--color-maxthon)' },
  { browser: 'ucbrowser', visitors: 100, fill: 'var(--color-ucbrowser)' },
  { browser: 'yandex', visitors: 90, fill: 'var(--color-yandex)' },
  { browser: 'avant', visitors: 85, fill: 'var(--color-avant)' },
  { browser: 'seamonkey', visitors: 80, fill: 'var(--color-seamonkey)' },
  { browser: 'torch', visitors: 75, fill: 'var(--color-torch)' },
  { browser: 'comodo', visitors: 70, fill: 'var(--color-comodo)' },
  { browser: 'midori', visitors: 65, fill: 'text-wabi-red' },
  { browser: 'konqueror', visitors: 60, fill: 'var(--color-konqueror)' },
  { browser: 'netscape', visitors: 55, fill: 'var(--color-netscape)' },
  { browser: 'epiphany', visitors: 50, fill: 'var(--color-epiphany)' },
  { browser: 'lynx', visitors: 45, fill: 'var(--color-lynx)' },
];
const chartConfig = chartData.reduce((config, { browser, fill }) => {
  config[browser] = { label: browser.charAt(0).toUpperCase() + browser.slice(1), color: fill };
  return config;
}, {} as ChartConfig);

const TaskCompletionChart = () => {
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
          >
            <YAxis
              dataKey="browser"
              type="category"
              interval={0}
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) => String(chartConfig[value as keyof typeof chartConfig]?.label || value)}
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="visitors" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TaskCompletionChart;
