import { useState, useEffect } from 'react';
import { TextField, Button, Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export default function AddJobForm({ onAddJob, onEditJob, editingJob }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: 'Remote',
    job_type: 'Full-time',
    tags: '',
    posting_date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (editingJob) {
      setFormData({
        ...editingJob,
        tags: Array.isArray(editingJob.tags) ? editingJob.tags.join(', ') : editingJob.tags
      });
    } else {
      setFormData({
        title: '',
        company: '',
        location: 'Remote',
        job_type: 'Full-time',
        tags: '',
        posting_date: new Date().toISOString().split('T')[0]
      });
    }
  }, [editingJob]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const processedData = {
      ...formData,
      tags: formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag)
    };

    if (editingJob) {
      onEditJob(processedData);
    } else {
      onAddJob({
        ...processedData,
        id: Date.now()
      });
    }

    if (!editingJob) {
      setFormData({
        title: '',
        company: '',
        location: 'Remote',
        job_type: 'Full-time',
        tags: '',
        posting_date: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
        <TextField
          label="Job Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          fullWidth
        />

        <TextField
          label="Company"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          required
          fullWidth
        />

        <TextField
          label="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>Job Type</InputLabel>
          <Select
            value={formData.job_type}
            onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}
            label="Job Type"
          >
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Part-time">Part-time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Tags (comma separated)"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          helperText="Separate tags with commas"
          fullWidth
        />

        <Button 
          type="submit" 
          variant="contained" 
          size="large"
          fullWidth
        >
          {editingJob ? 'Update Job' : 'Post Job'}
        </Button>
      </Stack>
    </form>
  );
}


/*import { useState } from 'react';
import { TextField, Button, Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

export default function AddJobForm({ onAddJob, onEditJob, editingJob }) {
  const [formData, setFormData] = useState(editingJob || {
    title: '',
    company: '',
    location: 'Remote',
    job_type: 'Full-time',
    tags: [],
    posting_date: new Date().toISOString().split('T')[0] // Add posting date
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert tags string to array if needed
    const processedData = {
      ...formData,
      tags: typeof formData.tags === 'string' ? 
           formData.tags.split(',').map(tag => tag.trim()) : 
           formData.tags
    };

    if (editingJob) {
      onEditJob(processedData);
    } else {
      onAddJob({
        ...processedData,
        id: Date.now() // Generate unique ID
      });
    }
    
    // Only reset if not in edit mode
    if (!editingJob) {
      setFormData({
        title: '',
        company: '',
        location: 'Remote',
        job_type: 'Full-time',
        tags: [],
        posting_date: new Date().toISOString().split('T')[0]
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
        <TextField
          label="Job Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
          fullWidth
        />
        
        <TextField
          label="Company"
          value={formData.company}
          onChange={(e) => setFormData({...formData, company: e.target.value})}
          required
          fullWidth
        />
        
        <TextField
          label="Location"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          fullWidth
        />
        
        <FormControl fullWidth>
          <InputLabel>Job Type</InputLabel>
          <Select
            value={formData.job_type}
            onChange={(e) => setFormData({...formData, job_type: e.target.value})}
            label="Job Type"
          >
            <MenuItem value="Full-time">Full-time</MenuItem>
            <MenuItem value="Part-time">Part-time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
            <MenuItem value="Internship">Internship</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          label="Tags (comma separated)"
          value={typeof formData.tags === 'string' ? formData.tags : formData.tags.join(', ')}
          onChange={(e) => setFormData({...formData, tags: e.target.value})}
          helperText="Separate tags with commas"
          fullWidth
        />
        
        <Button 
          type="submit" 
          variant="contained" 
          size="large"
          fullWidth
        >
          {editingJob ? 'Update Job' : 'Post Job'}
        </Button>
      </Stack>
    </form>
  );
}*/
