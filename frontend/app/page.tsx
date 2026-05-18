"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Job {
  _id: string;
  title: string;
  category: string;
  location: string;
  status: string;
}

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, [category]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const url = category
        ? `http://localhost:5000/api/jobs?category=${category}`
        : "http://localhost:5000/api/jobs";
      
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Available Jobs</h1>
        <select 
          className="border border-gray-300 p-2 rounded bg-white shadow-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrical">Electrical</option>
          <option value="Painting">Painting</option>
          <option value="Joinery">Joinery</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading jobs...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-10 text-gray-500 bg-white rounded shadow-sm">No jobs found in this category.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm hover:shadow-md transition">
              <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-1">{job.title}</h2>
              <div className="text-sm text-gray-600 mb-3 space-y-1">
                <p>📍 {job.location || "Location not specified"}</p>
                <p>🛠️ {job.category || "General"}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${job.status === 'Open' ? 'bg-green-500' : job.status === 'In Progress' ? 'bg-yellow-500' : 'bg-gray-500'}`}>
                  {job.status}
                </span>
                <Link href={`/job/${job._id}`} className="text-blue-600 hover:text-blue-800 text-sm font-semibold underline">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}