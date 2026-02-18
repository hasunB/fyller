"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, ReferenceLine, Tooltip, ResponsiveContainer } from "recharts"
import { BrainCircuit } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
} from "@/Components/ui/card"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/Components/ui/chart"

const chartConfig = {
    sales: {
        label: "Actual Revenue",
        color: "#818cf8", // Indigo 400
    },
    predicted: {
        label: "AI Forecast",
        color: "#10b981", // Emerald 500
    },
} satisfies ChartConfig

export function ChartAreaInteractive({ data }: { data: any }) {
    return (
        <Card className="flex flex-col h-full pt-0 bg-transparent border-none shadow-none">
            <CardHeader className="flex items-center gap-2 space-y-0 sm:flex-row px-0">
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <BrainCircuit className="w-5 h-5 text-indigo-500" />
                        {data.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                        AI model confidence: <span className="text-green-400 font-mono">{data.confidence * 100}%</span>
                    </p>
                </div>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 px-0 pt-4 sm:px-0 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-full w-full"
                >
                    <AreaChart data={data.data}>
                        <defs>
                            {/* Gradient for Actual Sales */}
                            <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-sales)" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="var(--color-sales)" stopOpacity={0.01} />
                            </linearGradient>

                            {/* Gradient for AI Prediction */}
                            <linearGradient id="fillPredicted" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-predicted)" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="var(--color-predicted)" stopOpacity={0.01} />
                            </linearGradient>

                            {/* Pattern for Prediction Line (Dashed Look) */}
                            <pattern id="patternPredicted" patternUnits="userSpaceOnUse" width="10" height="10">
                                <path d="M 0,10 l 10,-10 M -2.5,2.5 l 5,-5 M 7.5,12.5 l 5,-5" stroke="var(--color-predicted)" strokeWidth="1" opacity="0.2" />
                            </pattern>
                        </defs>

                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#374151" opacity={0.5} />

                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value)
                                return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                })
                            }}
                            stroke="#9ca3af"
                            fontSize={12}
                        />

                        {/* Tooltip Configuration */}
                        <ChartTooltip
                            cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '5 5' }}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric"
                                        })
                                    }}
                                    indicator="dot"
                                />
                            }
                        />

                        {/* 1. Actual Sales Area (Solid Line) */}
                        <Area
                            dataKey="sales"
                            type="monotone"
                            fill="url(#fillSales)"
                            stroke="var(--color-sales)"
                            strokeWidth={3}
                            connectNulls={true} // Important: Stops line from breaking if data is missing
                        />

                        {/* 2. Predicted Sales Area (Dashed/Different Color) */}
                        <Area
                            dataKey="predicted"
                            type="monotone"
                            fill="url(#fillPredicted)"
                            stroke="var(--color-predicted)"
                            strokeWidth={3}
                            strokeDasharray="5 5" // Makes the prediction line dashed
                            connectNulls={true}
                        />

                        {/* Reference Line for "Today" */}
                        <ReferenceLine
                            x="2024-06-15"
                            stroke="#fff"
                            strokeOpacity={0.5}
                            strokeDasharray="3 3"
                            label={{
                                value: "Today",
                                position: "insideTopRight",
                                fill: "#9ca3af",
                                fontSize: 12
                            }}
                        />

                        <ChartLegend content={<ChartLegendContent className="text-white" />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}