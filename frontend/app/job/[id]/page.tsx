"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Job {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  contactName: string;
  contactEmail: string;
  status: string;
  createdAt: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`);
      if (!res.ok) {
        if (res.status === 404) router.push("/not-found");
        return;
      }
      const data = await res.json();
      setJob(data);
    } catch (error) {
      console.error("Error fetching job details", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) setJob((prev) => prev ? { ...prev, status: newStatus } : null);
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this job?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/api/jobs/${id}`, { method: "DELETE" });
      if (res.ok) router.push("/");
    } catch (error) {
      console.error("Failed to delete job", error);
    }
  };

  if (loading) return <div className="text-center py-10 text-gray-500">Loading details...</div>;
  if (!job) return null;

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
          <p className="text-sm text-gray-500">Posted on {new Date(job.createdAt).toLocaleDateString()}</p>
        </div>
        <span className={`px-4 py-1.5 rounded-full text-sm font-bold text-white ${job.status === 'Open' ? 'bg-green-500' : job.status === 'In Progress' ? 'bg-yellow-500' : 'bg-gray-500'}`}>
          {job.status}
        </span>
      </div>

      <div className="bg-gray-50 p-4 rounded border mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">Description</h3>
        <p className="text-gray-800 whitespace-pre-wrap">{job.description}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8 text-gray-700">
        <p><strong>Category:</strong> {job.category || "N/A"}</p>
        <p><strong>Location:</strong> {job.location || "N/A"}</p>
        <p><strong>Contact Name:</strong> {job.contactName || "N/A"}</p>
        <p><strong>Contact Email:</strong> {job.contactEmail || "N/A"}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t gap-4">
        <div className="flex items-center gap-3">
          <label className="font-semibold text-gray-700">Update Status:</label>
          <select 
            value={job.status} 
            onChange={(e) => handleStatusChange(e.target.value)}
            className="border p-2 rounded bg-white"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <button 
          onClick={handleDelete}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition font-semibold"
        >
          Delete Job
        </button>
      </div>
    </div>
  );
}