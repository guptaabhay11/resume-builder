import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardActionArea, 
  CardContent, 
  useTheme,
  Paper,
  Container,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/PostAdd';
import ListIcon from '@mui/icons-material/Article';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const options = [
    {
      title: 'Create Resume',
      description: 'Start building a new professional resume from scratch.',
      icon: <CreateIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      onClick: () => navigate('/update'),
    },
    {
      title: 'My Resumes',
      description: 'View and download resumes you\'ve created.',
      icon: <ListIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      onClick: () => navigate('/my-resumes'),
    },
  ];

  return (
    <Container maxWidth="md">
      <Paper 
        elevation={0} 
        sx={{ 
          borderRadius: 2, 
          overflow: 'hidden',
          mt: 4,
          mb: 6,
          backgroundColor: 'transparent'
        }}
      >
        <Box 
          p={4} 
          pb={2}
          sx={{
            backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
            borderRadius: '16px 16px 0 0',
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="white">
            Resume Builder Dashboard
          </Typography>
          <Typography variant="subtitle1" color="white" sx={{ opacity: 0.9, mt: 1 }}>
            Build professional resumes with our easy-to-use tools
          </Typography>
        </Box>

        <Box sx={{ p: 3 }}>
          {options.map((option, idx) => (
            <Card 
              key={idx} 
              elevation={2}
              sx={{ 
                mb: 3, 
                borderRadius: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                }
              }}
            >
              <CardActionArea onClick={option.onClick} sx={{ p: 1 }}>
                <CardContent sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 3,
                  p: 3
                }}>
                  <Box 
                    sx={{ 
                      backgroundColor: theme.palette.primary.light, 
                      borderRadius: '50%',
                      width: 64,
                      height: 64,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {option.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" fontWeight="500">
                      {option.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                      {option.description}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>

        <Divider />
        
        <Box p={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Choose an option above to get started with your resume
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Dashboard;