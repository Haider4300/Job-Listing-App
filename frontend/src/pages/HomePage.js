import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Stack
} from '@mui/material';
import JobList from '../components/jobs/JobList';
import AddJobForm from '../components/jobs/AddJobForm';
import { getJobs, addJob, updateJob, deleteJob } from '../services/api';

export default function HomePage() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [editingJob, setEditingJob] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const loadJobs = async () => {
    try {
      const filters = {
        title: searchTerm,
        job_type: jobTypeFilter,
        location: locationFilter,
        tag: selectedTag
      };
      const fetchedJobs = await getJobs(filters);
      setJobs(fetchedJobs);
    } catch (error) {
      console.error('Failed to fetch jobs:', error.message);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [searchTerm, jobTypeFilter, locationFilter, selectedTag]);

  const uniqueTags = Array.from(
    new Set(
      jobs.flatMap(job =>
        typeof job.tags === 'string'
          ? job.tags.split(',').map(t => t.trim())
          : job.tags || []
      )
    )
  );

  const handleAddJob = async newJob => {
    try {
      await addJob(newJob);
      await loadJobs();
      navigate('/');
    } catch (error) {
      console.error('Error adding job:', error.message);
    }
  };

  const handleDeleteJob = async id => {
    try {
      await deleteJob(id);
      await loadJobs();
    } catch (error) {
      console.error('Error deleting job:', error.message);
    }
  };

  const handleStartEdit = job => {
    setEditingJob(job);
    navigate('/add-job');
  };

  const handleEditJob = async updatedJob => {
    try {
      await updateJob(updatedJob.id, updatedJob);
      await loadJobs();
      setEditingJob(null);
      navigate('/');
    } catch (error) {
      console.error('Error updating job:', error.message);
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setJobTypeFilter('all');
    setLocationFilter('');
    setSelectedTag('');
  };

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Typography variant="h4" align="center" sx={{ mt: 4 }}>
                Job Listings
              </Typography>

              <Box sx={{ px: 3, py: 2 }}>
                <Stack
  direction="row"
  spacing={2}
  alignItems="center"
  flexWrap="wrap"
  justifyContent="center"
  sx={{
    maxWidth: '100%',
    overflowX: 'auto',
    px: 2,
    py: 2,
    '& > *': {
      height: '40px', // ensures uniform height for inputs
    }
  }}
>
  <TextField
    label="Search by title"
    value={searchTerm}
    onChange={e => setSearchTerm(e.target.value)}
    size="small"
    sx={{ minWidth: 200 }}
  />

  <TextField
    label="Filter by location"
    value={locationFilter}
    onChange={e => setLocationFilter(e.target.value)}
    size="small"
    sx={{ minWidth: 200 }}
  />

  <Select
    value={jobTypeFilter}
    onChange={e => setJobTypeFilter(e.target.value)}
    displayEmpty
    size="small"
    sx={{ minWidth: 150 }}
  >
    <MenuItem value="all">All Types</MenuItem>
    <MenuItem value="Full-time">Full-time</MenuItem>
    <MenuItem value="Part-time">Part-time</MenuItem>
    <MenuItem value="Contract">Contract</MenuItem>
    <MenuItem value="Internship">Internship</MenuItem>
  </Select>

  <Select
    value={selectedTag}
    onChange={e => setSelectedTag(e.target.value)}
    displayEmpty
    size="small"
    sx={{ minWidth: 150 }}
  >
    <MenuItem value="">All Tags</MenuItem>
    {uniqueTags.map((tag, idx) => (
      <MenuItem key={idx} value={tag}>
        {tag}
      </MenuItem>
    ))}
  </Select>

  <Button
    variant="outlined"
    onClick={resetFilters}
    size="small"
    sx={{ whiteSpace: 'nowrap', minWidth: 120 }}
  >
    Reset Filters
  </Button>

  <Button
    variant="contained"
    onClick={() => navigate('/add-job')}
    size="small"
    sx={{ whiteSpace: 'nowrap', minWidth: 100 }}
  >
    Add Job
  </Button>
  </Stack>
              </Box>
              <Box sx={{ px: 3, pb: 6 }}>
                <JobList
                  jobs={jobs}
                  onDelete={handleDeleteJob}
                  onEdit={handleStartEdit}
                />
              </Box>
            </>
          }
        />

        <Route
          path="/add-job"
          element={
            <AddJobForm
              onAddJob={handleAddJob}
              onEditJob={handleEditJob}
              editingJob={editingJob || location.state?.job || null}
            />
          }
        />
      </Routes>
    </>
  );
}


