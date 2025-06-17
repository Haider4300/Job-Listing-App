import { Grid, Typography } from '@mui/material';
import JobCard from './JobCard';

export default function JobList({ jobs, onDelete, onEdit }) {
  return (
    <>
      {jobs.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ py: 4 }}>
          No jobs found. Try adjusting your filters.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job.id}>
              <JobCard job={job} onDelete={onDelete} onEdit={onEdit} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}


/*import JobCard from './JobCard';
import { Typography } from '@mui/material';

export default function JobList({ jobs, onDelete, onEdit }) {
  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      {jobs.length === 0 ? (
        <Typography variant="body1" align="center" sx={{ py: 4 }}>
          No jobs found. Try adjusting your filters.
        </Typography>
      ) : (
        jobs.map(job => (
          <JobCard 
            key={job.id} 
            job={job} 
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}*/
