// pages/EditJobPage.js
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddJobForm from './AddJobForm';
import { getJobs, updateJob } from '../../services/api';

export default function EditJobPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    async function fetchJob() {
      try {
        const jobs = await getJobs();
        const found = jobs.find(j => j.id.toString() === id);
        if (found) setJob(found);
      } catch (error) {
        console.error('Failed to fetch job:', error);
      }
    }
    fetchJob();
  }, [id]);

  const handleEditJob = async (updatedData) => {
    try {
      await updateJob(id, updatedData);
      navigate('/');
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  if (!job) return <p>Loading job...</p>;

  return <AddJobForm editingJob={job} onEditJob={handleEditJob} />;
}
