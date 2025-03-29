import axios from "axios";
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const AnalyticsPage = () => {
    const [leadPerDatData, setLeadPerDayData] = useState(null);
    const [industryChartData, setIndustryChartData] = useState(null);
    const [pipelineChartData, setPipelineChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem("token");

        try {
            const [lineChartRes, industryChartRes, pipelineChartRes] = await Promise.all([
                axios.get("http://localhost:8000/api/leads_per_day_chart/", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get("http://localhost:8000/api/leads_per_industry_chart/", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get("http://localhost:8000/api/leads_per_pipeline_chart/", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            setLeadPerDayData(JSON.parse(lineChartRes.data.chart));
            setIndustryChartData(JSON.parse(industryChartRes.data.chart));
            setPipelineChartData(JSON.parse(pipelineChartRes.data.chart));

            setLoading(false);
        } catch (error) {
            console.error("❌ Error fetching chart data:", error);
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 pt-24 px-4 pb-4">
            <h1 className="text-2xl font-bold pb-8">Analytics</h1>

            <div className="w-full bg-white p-6 rounded-lg shadow-lg">
                <div className="w-full h-[400px] flex justify-center items-center">
                    {loading ? (
                        <p className="text-gray-400">Loading...</p>
                    ) : (
                        leadPerDatData && (
                            <Plot
                                data={leadPerDatData.data.map(trace => ({
                                    ...trace,
                                    text: trace.y,
                                    textposition: "auto",
                                }))}
                                layout={{
                                    ...leadPerDatData.layout,
                                    height: 400,
                                    margin: { l: 50, r: 50, b: 80, t: 40, pad: 10 },
                                    title: { text: "Leads Added Per Day", font: { size: 20 } },
                                    xaxis: {
                                        title: "Date",
                                        tickangle: -45,
                                        tickmode: "array",
                                        tickvals: leadPerDatData.data[0].x,
                                        ticktext: leadPerDatData.data[0].x,
                                    },
                                    yaxis: { title: "Leads Count", showgrid: true },
                                }}
                                config={{ responsive: true }}
                                style={{ width: "100%" }}
                            />
                        )
                    )}
                </div>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <div className="w-full h-full flex justify-center items-center">
                        {loading ? (
                            <p className="text-gray-400">Loading...</p>
                        ) : (
                            industryChartData && (
                                <Plot
                                    data={industryChartData.data}
                                    layout={{
                                        ...industryChartData.layout,
                                        autosize: true,
                                        margin: { l: 20, r: 20, t: 40, b: 20 },
                                    }}
                                    config={{ responsive: true }}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            )
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    <div className="w-full h-full flex justify-center items-center">
                        {loading ? (
                            <p className="text-gray-400">Loading...</p>
                        ) : (
                            pipelineChartData && (
                                <Plot
                                    data={pipelineChartData.data}
                                    layout={{
                                        ...pipelineChartData.layout,
                                        autosize: true,
                                        margin: { l: 20, r: 20, t: 40, b: 20 },
                                    }}
                                    config={{ responsive: true }}
                                    style={{ width: "100%", height: "100%" }}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AnalyticsPage;