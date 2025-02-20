import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell, Label, Legend as PieLegend } from 'recharts';

const lineData = [
    { year: 2014, dealsWon: 20 },
    { year: 2015, dealsWon: 35 },
    { year: 2016, dealsWon: 50 },
    { year: 2017, dealsWon: 60 },
    { year: 2018, dealsWon: 40 },
    { year: 2019, dealsWon: 80 },
];

const pieData = [
    { name: 'Content 1', value: 400, position: 'center' },
    { name: 'Content 2', value: 300, position: 'center' },
    { name: 'Content 3', value: 300, position: 'center' },
];

const COLORS = ['#6366F1', '#EC4899', '#FBBF24'];

// Funkcja do renderowania etykiet
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5; // Pozycjonowanie bliżej środka
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={14}>
            {`${(percent * 100).toFixed(1)}%`}
        </text>
    );
};

const AnalyticsPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-24 px-4 pb-4">
            <div className="bg-blue-50 p-8 rounded-lg shadow-lg w-full max-w-8xl">

                <h1 className="text-2xl font-bold pb-8">Analytics</h1>

                {/* Sekcja 1: Dwa wykresy Liniowe jeden pod drugim */}
                <div className="pb-6">
                    <h2 className="text-lg font-semibold pb-2">Number of deals won</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="dealsWon" stroke="#6366F1" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Drugi wykres liniowy */}
                <div className="pb-6">
                    <h2 className="text-lg font-semibold pb-2">Number of deals lost</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="dealsWon" stroke="#EC4899" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Sekcja 2: Trzy wykresy kołowe obok siebie */}
                <div className="flex justify-between pb-6">
                    <div className="w-1/3">
                        <h3 className="text-center text-sm pb-2">Leads statistics 1</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    outerRadius={120}
                                    label={renderLabel}
                                    labelLine={false}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                {/* Dodanie legendy */}
                                <PieLegend layout="horizontal" align="center" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="w-1/3">
                        <h3 className="text-center text-sm pb-2">Leads statistics 2</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    outerRadius={120}
                                    label={renderLabel}
                                    labelLine={false}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                {/* Dodanie legendy */}
                                <PieLegend layout="horizontal" align="center" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="w-1/3">
                        <h3 className="text-center text-sm pb-2">Leads statistics 3</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    outerRadius={120}
                                    label={renderLabel}
                                    labelLine={false}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                {/* Dodanie legendy */}
                                <PieLegend layout="horizontal" align="center" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AnalyticsPage;