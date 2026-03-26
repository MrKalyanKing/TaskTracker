import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../Context/Context";

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";
import Navbar from "../Navbar/Navbar";

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend
);

const Analytics = () => {
    const { url } = useContext(AppContext);

    const [stats, setStats] = useState({});
    const [trend, setTrend] = useState([]);
    const [loading, setLoading] = useState(false);




    const getLast7Days = () => {
        const today = new Date();
        const past = new Date();

        past.setDate(today.getDate() - 6); // last 7 days including today

        const format = (date) => date.toISOString().split("T")[0];

        return {
            from: format(past),
            to: format(today),
        };
    };

    const [filters, setFilters] = useState(getLast7Days())
    const fetchAnalytics = async (customfilter = filters) => {
        try {
            setLoading(true);

            const query = new URLSearchParams(customfilter).toString();

            console.log("URL:", `${url}/analytics?${query}`);

            const res = await axios.get(`${url}/analytics?${query}`, {
                withCredentials: true,
            });


            setStats(res.data.stats || {});
            setTrend(res.data.trend || []);
        } catch (err) {
            console.log(err.response?.data || err.message);
        }

        setLoading(false)
    };

    console.log(filters)
    useEffect(() => {
        fetchAnalytics();
    }, []);

    //  Bar Chart Data
    const barData = {
        labels: trend.map((item) => item.date),
        datasets: [
            {
                label: "Todo",
                data: trend.map((item) => item.todo || 0),
                backgroundColor: "#f97316",
            },
            {
                label: "In Progress",
                data: trend.map((item) => item["in-progress"] || 0),
                backgroundColor: "#3b82f6",
            },
            {
                label: "Done",
                data: trend.map((item) => item.done || 0),
                backgroundColor: "#22c55e",
            },
        ],
    };
    //  Doughnut Data
    const doughnutData = {
        labels: ["Todo", "In Progress", "Done"],
        datasets: [
            {
                data: [
                    stats.todo || 0,
                    stats["in-progress"] || 0,
                    stats.done || 0,
                ],
                backgroundColor: [
                    "#f97316",
                    "#3b82f6",
                    "#22c55e",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <Navbar />
            <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Analytics</h1>

                    {/* Filters */}
                    <div className="flex gap-3">
                        <input
                            type="date"
                            value={filters.from}
                            onChange={(e) =>
                                setFilters({ ...filters, from: e.target.value })
                            }
                            className="border px-3 py-2 rounded"
                        />

                        <input
                            type="date"
                            value={filters.to}
                            onChange={(e) =>
                                setFilters({ ...filters, to: e.target.value })
                            }
                            className="border px-3 py-2 rounded"
                        />

                        <button
                            onClick={() => fetchAnalytics(filters)}
                            className="bg-purple-600 text-white px-4 py-2 rounded"
                        >
                            Apply
                        </button>
                    </div>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="text-center py-10 text-gray-500">
                        Loading analytics...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Bar Chart */}
                        <div className="col-span-2 bg-white p-6 rounded-xl shadow">
                            <h2 className="font-semibold mb-4">Task Status Trend</h2>

                            {trend.length > 0 ? (
                                <Bar data={barData} />
                            ) : (
                                <p className="text-gray-400">No data available</p>
                            )}
                        </div>

                        {/* Doughnut */}
                        <div className="bg-white p-6 rounded-xl shadow">
                            <h2 className="font-semibold mb-4">Task Distribution</h2>

                            <Doughnut data={doughnutData} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Analytics;