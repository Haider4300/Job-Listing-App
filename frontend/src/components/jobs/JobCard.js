import { Card, CardContent, Typography, Stack, Box, IconButton } from '@mui/material'; 
import { Business, LocationOn, Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // 

export default function JobCard({ job = {}, onDelete = () => {} }) {
  const navigate = useNavigate(); // 

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    const date = new Date(dateString);
    return isNaN(date.getTime())
      ? dateString
      : date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const processTags = () => {
    if (!job.tags) return [];
    return Array.isArray(job.tags)
      ? job.tags
      : job.tags.split(',').map(tag => tag.trim());
  };

  const tagStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 8px',
    margin: '4px 4px 4px 0',
    fontSize: '0.8125rem',
    borderRadius: '16px',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    color: 'text.secondary',
    backgroundColor: 'background.paper'
  };

  return (
    <Card
      sx={{
        mb: 3,
        boxShadow: 3,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          {job.title || 'Untitled Position'}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
          <Business fontSize="small" color="action" />
          <Typography variant="body2">{job.company || 'Unknown Company'}</Typography>

          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2">{job.location || 'Remote'}</Typography>
        </Stack>

        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
          Posted: {formatDate(job.posting_date)}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Box component="span" sx={tagStyle}>
            {job.job_type || 'Full-time'}
          </Box>

          {processTags().map((tag, index) => (
            <Box key={index} component="span" sx={tagStyle}>
              {tag}
            </Box>
          ))}
        </Stack>

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <IconButton
            color="primary"
            onClick={() => navigate(`/edit-job/${job.id}`)} // Navigate instead of onEdit()
            aria-label="edit"
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => onDelete(job.id)}
            aria-label="delete"
          >
            <Delete fontSize="small" />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}



/*import { Card, CardContent, Typography, Stack, Box, IconButton } from '@mui/material';
import { Business, LocationOn, Edit, Delete } from '@mui/icons-material';

export default function JobCard({ job = {}, onEdit = () => {}, onDelete = () => {} }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) 
        ? dateString 
        : date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          });
    } catch {
      return dateString;
    }
  };

  const processTags = () => {
    if (!job.tags) return [];
    
    if (typeof job.tags === 'string') {
      try {
        const parsed = JSON.parse(job.tags);
        return Array.isArray(parsed) ? parsed : [job.tags];
      } catch {
        return job.tags.split(',').map(tag => tag.trim());
      }
    }
    
    return job.tags;
  };

  return (
    <Card sx={{ 
      mb: 3, 
      boxShadow: 3,
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: 6,
        transform: 'translateY(-2px)'
      }
    }}>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          {job.title || 'Untitled Position'}
        </Typography>
        
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <Business fontSize="small" color="action" />
          <Typography variant="body2">{job.company || 'Unknown Company'}</Typography>
          
          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2">{job.location || 'Remote'}</Typography>
        </Stack>
        
        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
          Posted: {formatDate(job.posting_date)}
        </Typography>
        
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '4px 8px',
              margin: '4px 4px 4px 0',
              fontSize: '0.8125rem',
              borderRadius: '16px',
              border: '1px solid rgba(0, 0, 0, 0.23)',
              color: 'text.secondary',
              backgroundColor: 'background.paper'
            }}
          >
            {job.job_type || 'Full-time'}
          </Box>
          
          {processTags().map((tag, index) => (
            <Box
              key={index}
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '4px 8px',
                margin: '4px 4px 4px 0',
                fontSize: '0.8125rem',
                borderRadius: '16px',
                border: '1px solid rgba(0, 0, 0, 0.23)',
                color: 'text.secondary',
                backgroundColor: 'background.paper'
              }}
            >
              {tag}
            </Box>
          ))}
        </Stack>

        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <IconButton 
            color="primary"
            onClick={() => onEdit(job)}
            aria-label="edit"
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton 
            color="error"
            onClick={() => onDelete(job.id)}
            aria-label="delete"
          >
            <Delete fontSize="small" />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}*/
