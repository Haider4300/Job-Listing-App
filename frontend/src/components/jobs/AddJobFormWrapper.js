// src/components/jobs/AddJobFormWrapper.js
import AddJobForm from './AddJobForm';
import { addJob } from '../../services/api';

export default function AddJobFormWrapper() {
  const handleAddJob = async (job) => {
  try {
    const jobWithDate = {
      ...job,
      posting_date: new Date().toISOString()
    };
    await addJob(jobWithDate);
    alert('Job added successfully');
  } catch (err) {
    alert('Failed to add job');
  }
};


  return <AddJobForm onAddJob={handleAddJob} />;
}
