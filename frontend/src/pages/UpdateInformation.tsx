// src/components/UpdateInformation.tsx
import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  IconButton,
  Stack,
  Box,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Paper,
  Divider,
  Avatar,
  Chip,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import {
  Add,
  Delete,
  NavigateNext,
  NavigateBefore,
  Send,
  School,
  Description,
  Person,
  Email,
  Code,
  WorkspacePremium,
  Download,
} from "@mui/icons-material";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import ResumePDF from "./ResumePdf";
import ResumePreview from "./ResumePreview";
import LiveResumePreview from "./LivePreview";
import { useSendFileMutation, useUploadPdfMutation } from "../services/api"; // adjust path if needed
import { toast } from "react-toastify";

// Data types
interface Education {
  institution: string;
  degree: string; 
  startYear: string;
  endYear: string;
}
interface Project {
  name: string;
  description: string;
}
interface ResumeData {
  name: string;
  email: string;
  phone: string;
  city: string;
  description: string;
  education: Education[];
  projects: Project[];
  skills: string[];
}
interface ValidationErrors {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  description?: string;
  education?: Record<keyof Education, string>[];
  projects?: Record<keyof Project, string>[];
  skills?: string[];
}

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#2E3B55",
      light: "#4e5b75",
      dark: "#1e2a44",
    },
    secondary: {
      main: "#3d5afe",
      light: "#6385ff",
      dark: "#0031ca",
    },
    background: {
      default: "#f8f9fa",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          padding: "8px 16px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        },
      },
    },
  },
});

const UpdateInformation: React.FC = (): React.ReactElement => {
  const steps = [
    { label: "Personal Info", icon: <Person /> },
    { label: "Contact Details", icon: <Email /> },
    { label: "Description", icon: <Description /> },
    { label: "Education", icon: <School /> },
    { label: "Projects", icon: <WorkspacePremium /> },
    { label: "Skills", icon: <Code /> },
    { label: "Review", icon: <Download /> },
  ];


  const [uploadPdf, { isLoading }] = useUploadPdfMutation();
  const [uploading, setUploading] = useState(false);
  

  const [activeStep, setActiveStep] = useState(0);

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "",
    email: "",
    phone: "",
    city: "",
    description: "",
    education: [{ institution: "", degree: "", startYear: "", endYear: "" }],
    projects: [{ name: "", description: "" }],
    skills: [""],
  });

  // RTK Query mutation for sending file
  const [sendFile, { isLoading: sending, isSuccess }] = useSendFileMutation();

  // Generic field change handler
  const handleChange = (field: keyof ResumeData, value: any) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const e = { ...prev };
      delete (e as any)[field];
      return e;
    });
  };

  // Array handlers
  const handleEducationChange = (
    i: number,
    field: keyof Education,
    value: string
  ) => {
    const arr = [...resumeData.education];
    arr[i] = { ...arr[i], [field]: value };
    handleChange("education", arr);
  };
  const handleProjectChange = (
    i: number,
    field: keyof Project,
    value: string
  ) => {
    const arr = [...resumeData.projects];
    arr[i] = { ...arr[i], [field]: value };
    handleChange("projects", arr);
  };
  const handleSkillChange = (i: number, value: string) => {
    const arr = [...resumeData.skills];
    arr[i] = value;
    handleChange("skills", arr);
  };

  // Add/remove items
  const addEducation = () =>
    handleChange("education", [
      ...resumeData.education,
      { institution: "", degree: "", startYear: "", endYear: "" },
    ]);
  const removeEducation = (i: number) =>
    handleChange(
      "education",
      resumeData.education.filter((_, idx) => idx !== i)
    );
  const addProject = () =>
    handleChange("projects", [...resumeData.projects, { name: "", description: "" }]);
  const removeProject = (i: number) =>
    handleChange(
      "projects",
      resumeData.projects.filter((_, idx) => idx !== i)
    );
  const addSkill = () => handleChange("skills", [...resumeData.skills, ""]);
  const removeSkill = (i: number) =>
    handleChange(
      "skills",
      resumeData.skills.filter((_, idx) => idx !== i)
    );


    const handleSaveResume = async () => {
      if (uploading) return;
      setUploading(true);
      toast.info("Generating your resume...");
    
      try {
        const blob = await pdf(<ResumePDF data={resumeData} />).toBlob();
        const formData = new FormData();
        formData.append('file', blob, `${resumeData.name}_resume.pdf`);
    
        await uploadPdf(formData).unwrap();
        toast.success("Resume saved to your profile!");
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Failed to save resume. Please try again.");
      } finally {
        setUploading(false);
      }
    };

  // Validation for each step
  const validateCurrentStep = (): boolean => {
    const newErrors: ValidationErrors = {};
    switch (activeStep) {
      case 0:
        if (!resumeData.name.trim()) newErrors.name = "Name is required";
        else if (!/^[a-zA-Z\s]+$/.test(resumeData.name))
          newErrors.name = "Letters only";
        break;
      case 1:
        if (!resumeData.email.trim()) newErrors.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(resumeData.email))
          newErrors.email = "Invalid email";
        if (!resumeData.phone.trim()) newErrors.phone = "Phone is required";
        else if (!/^\d+$/.test(resumeData.phone))
          newErrors.phone = "Digits only";
        if (!resumeData.city.trim()) newErrors.city = "City is required";
        break;
      case 2:
        if (!resumeData.description.trim())
          newErrors.description = "Description is required";
        break;
      case 3:
        const eduErrs = resumeData.education.map((edu) => {
          const err: Record<string, string> = {};
          if (!edu.institution) err.institution = "Required";
          if (!edu.degree) err.degree = "Required";
          if (!/^[0-9]{4}$/.test(edu.startYear)) err.startYear = "YYYY";
          if (!/^[0-9]{4}$/.test(edu.endYear)) err.endYear = "YYYY";
          return err;
        });
        if (eduErrs.some((e) => Object.keys(e).length))
          newErrors.education = eduErrs;
        break;
      case 4:
        const projErrs = resumeData.projects.map((p) => {
          const err: Record<string, string> = {};
          if (!p.name) err.name = "Required";
          if (!p.description) err.description = "Required";
          return err;
        });
        if (projErrs.some((e) => Object.keys(e).length))
          newErrors.projects = projErrs;
        break;
      case 5:
        const skillErrs = resumeData.skills.map((s) => (s ? "" : "Required"));
        if (skillErrs.some((e) => e)) newErrors.skills = skillErrs;
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) setActiveStep((s) => s + 1);
  };
  const handleBack = () => setActiveStep((s) => s - 1);

  // Handler to send email
  const handleSendEmail = async () => {
    try {
      const blob = await pdf(<ResumePDF data={resumeData} />).toBlob();
      const file = new File(
        [blob],
        `${resumeData.name.replace(/\s/g, "_")}_resume.pdf`,
        { type: "application/pdf" }
      );
      const formData = new FormData();
      formData.append("file", file);
      formData.append("email", resumeData.email);
      await sendFile(formData).unwrap();
    } catch (err) {
      console.error("Error sending email:", err);
    }
  };

  // Render content per step
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box mt={4}>
            <TextField
              label="Full Name"
              fullWidth
              value={resumeData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={!!errors.name}
              helperText={errors.name}
              variant="outlined"
              InputProps={{
                startAdornment: <Person color="primary" sx={{ mr: 1 }} />,
              }}
            />
          </Box>
        );
      case 1:
        return (
          <Stack spacing={3} mt={4}>
            <TextField
              label="Email"
              fullWidth
              value={resumeData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
              InputProps={{
                startAdornment: <Email color="primary" sx={{ mr: 1 }} />,
              }}
            />
            <TextField
              label="Phone"
              fullWidth
              value={resumeData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone}
              variant="outlined"
              InputProps={{
                startAdornment: <Person color="primary" sx={{ mr: 1 }} />,
              }}
            />
            <TextField
              label="City"
              fullWidth
              value={resumeData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              error={!!errors.city}
              helperText={errors.city}
              variant="outlined"
              InputProps={{
                startAdornment: <Person color="primary" sx={{ mr: 1 }} />,
              }}
            />
          </Stack>
        );
      case 2:
        return (
          <Box mt={4}>
            <TextField
              label="Professional Summary"
              fullWidth
              multiline
              minRows={4}
              value={resumeData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              error={!!errors.description}
              helperText={errors.description}
              variant="outlined"
              placeholder="Write a brief summary of your professional background, skills, and career goals..."
            />
          </Box>
        );
      case 3:
        return (
          <Box mt={4}>
            <Typography variant="h6" fontWeight="500" color="primary" mb={2}>
              Education
            </Typography>
            {resumeData.education.map((edu, i) => (
              <Paper
                key={i}
                elevation={1}
                sx={{
                  mt: 2,
                  p: 3,
                  borderRadius: 2,
                  borderLeft: "4px solid #2E3B55",
                }}
              >
                <Stack spacing={3}>
                  <TextField
                    label="Institution"
                    fullWidth
                    value={edu.institution}
                    onChange={(e) =>
                      handleEducationChange(i, "institution", e.target.value)
                    }
                    error={!!errors.education?.[i]?.institution}
                    helperText={errors.education?.[i]?.institution}
                    variant="outlined"
                  />
                  <TextField
                    label="Degree"
                    fullWidth
                    value={edu.degree}
                    onChange={(e) =>
                      handleEducationChange(i, "degree", e.target.value)
                    }
                    error={!!errors.education?.[i]?.degree}
                    helperText={errors.education?.[i]?.degree}
                    variant="outlined"
                  />
                  <Stack direction="row" spacing={2}>
                    <TextField
                      label="Start Year"
                      fullWidth
                      value={edu.startYear}
                      onChange={(e) =>
                        handleEducationChange(i, "startYear", e.target.value)
                      }
                      error={!!errors.education?.[i]?.startYear}
                      helperText={errors.education?.[i]?.startYear}
                      variant="outlined"
                    />
                    <TextField
                      label="End Year"
                      fullWidth
                      value={edu.endYear}
                      onChange={(e) =>
                        handleEducationChange(i, "endYear", e.target.value)
                      }
                      error={!!errors.education?.[i]?.endYear}
                      helperText={errors.education?.[i]?.endYear}
                      variant="outlined"
                    />
                  </Stack>
                  {resumeData.education.length > 1 && (
                    <Box textAlign="right">
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => removeEducation(i)}
                        startIcon={<Delete />}
                      >
                        Remove
                      </Button>
                    </Box>
                  )}
                </Stack>
              </Paper>
            ))}
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={addEducation}
              sx={{ mt: 3 }}
            >
              Add Education
            </Button>
          </Box>
        );
      case 4:
        return (
          <Box mt={4}>
            <Typography variant="h6" fontWeight="500" color="primary" mb={2}>
              Projects
            </Typography>
            {resumeData.projects.map((p, i) => (
              <Paper
                key={i}
                elevation={1}
                sx={{
                  mt: 2,
                  p: 3,
                  borderRadius: 2,
                  borderLeft: "4px solid #3d5afe",
                }}
              >
                <Stack spacing={3}>
                  <TextField
                    label="Project Name"
                    fullWidth
                    value={p.name}
                    onChange={(e) =>
                      handleProjectChange(i, "name", e.target.value)
                    }
                    error={!!errors.projects?.[i]?.name}
                    helperText={errors.projects?.[i]?.name}
                    variant="outlined"
                  />
                  <TextField
                    label="Description"
                    fullWidth
                    multiline
                    minRows={2}
                    value={p.description}
                    onChange={(e) =>
                      handleProjectChange(i, "description", e.target.value)
                    }
                    error={!!errors.projects?.[i]?.description}
                    helperText={errors.projects?.[i]?.description}
                    variant="outlined"
                    placeholder="Describe the project, technologies used, and your role..."
                  />
                  {resumeData.projects.length > 1 && (
                    <Box textAlign="right">
                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => removeProject(i)}
                        startIcon={<Delete />}
                      >
                        Remove
                      </Button>
                    </Box>
                  )}
                </Stack>
              </Paper>
            ))}
            <Button
              variant="outlined"
              startIcon={<Add />}
              onClick={addProject}
              sx={{ mt: 3 }}
            >
              Add Project
            </Button>
          </Box>
        );
      case 5:
        return (
          <Box mt={4}>
            <Typography variant="h6" fontWeight="500" color="primary" mb={2}>
              Skills
            </Typography>
            <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
              <Stack spacing={3}>
                {resumeData.skills.map((s, i) => (
                  <Stack
                    key={i}
                    direction="row"
                    spacing={2}
                    alignItems="center"
                  >
                    <TextField
                      label={`Skill ${i + 1}`}
                      fullWidth
                      value={s}
                      onChange={(e) => handleSkillChange(i, e.target.value)}
                      error={!!errors.skills?.[i]}
                      helperText={errors.skills?.[i]}
                      variant="outlined"
                    />
                    {resumeData.skills.length > 1 && (
                      <IconButton
                        color="error"
                        onClick={() => removeSkill(i)}
                        sx={{ bgcolor: "error.light", color: "white" }}
                      >
                        <Delete />
                      </IconButton>
                    )}
                  </Stack>
                ))}
              </Stack>
              <Button
                variant="outlined"
                startIcon={<Add />}
                onClick={addSkill}
                sx={{ mt: 3 }}
              >
                Add Skill
              </Button>
            </Paper>
          </Box>
        );
        case 6:
          return (
            <Box mt={4} textAlign="center">
              <Typography
                variant="h5"
                gutterBottom
                color="primary"
                fontWeight="bold"
                mb={3}
              >
                Review Your Resume
              </Typography>
        
              <div className="p-4 rounded-xl shadow-md border border-gray-200 bg-white">
                
            <ResumePreview resumeData={resumeData} />
             </div>
        
              <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="center"
                spacing={2}
                sx={{ mt: 4 }}
              >
                <PDFDownloadLink
                  document={<ResumePDF data={resumeData} />}
                  fileName={`${resumeData.name.replace(/\s/g, "_")}_resume.pdf`}
                  style={{ textDecoration: "none" }}
                >
                  {({ loading }) =>
                    loading ? (
                      <Button disabled variant="contained">
                        <CircularProgress size={20} sx={{ mr: 1 }} />
                        Preparing PDF…
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Download />}
                        size="large"
                      >
                        Download PDF
                      </Button>
                    )
                  }
                </PDFDownloadLink>
        
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={sending ? <CircularProgress size={20} /> : <Send />}
                  onClick={handleSendEmail}
                  disabled={sending}
                  size="large"
                >
                  {sending ? "Sending…" : "Send to Email"}
                </Button>
        
                <Button
                  variant="contained"
                  color="success"
                  startIcon={
                    uploading || isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : undefined
                  }
                  onClick={handleSaveResume}
                  disabled={uploading || isLoading}
                  size="large"
                >
                  {uploading ? "Saving…" : "Save to Profile"}
                </Button>
              </Stack>
        
              {isSuccess && (
                <Chip
                  label="Email sent successfully!"
                  color="success"
                  variant="outlined"
                  sx={{ mt: 3 }}
                />
              )}
            </Box>
          );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Box textAlign="center" mb={4}>
            <Typography
              variant="h4"
              color="primary"
              gutterBottom
              fontWeight="bold"
            >
              Professional Resume Builder
            </Typography>
            <Typography color="text.secondary" variant="subtitle1">
              Create a stunning resume in minutes
            </Typography>
          </Box>
  
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            sx={{ mb: 5, pt: 2 }}
          >
            {steps.map((step) => (
              <Step key={step.label}>
                <StepLabel
                  StepIconProps={{
                    icon: (
                      <Avatar
                        sx={{
                          bgcolor:
                            activeStep === steps.indexOf(step)
                              ? "primary.main"
                              : "grey.400",
                          width: 28,
                          height: 28,
                        }}
                      >
                        {step.icon}
                      </Avatar>
                    ),
                  }}
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
  
          <Divider sx={{ mb: 4 }} />
  
          <Box
            display="flex"
            gap={4}
            flexDirection={{ xs: "column", md: "row" }}
          >
            {/* Left: Form Steps */}
            <Box flex={1}>
              <Paper elevation={1} sx={{ p: 3, borderRadius: 2, height: "100%" }}>
                {renderStepContent()}
                <Box display="flex" justifyContent="space-between" mt={4}>
                  <Button
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    startIcon={<NavigateBefore />}
                    variant="outlined"
                  >
                    Back
                  </Button>
                  {activeStep < steps.length - 1 && (
                    <Button
                      onClick={handleNext}
                      variant="contained"
                      endIcon={<NavigateNext />}
                    >
                      Next
                    </Button>
                  )}
                </Box>
              </Paper>
            </Box>
  
            {/* Right: Live Preview */}
            <Box flex={1}>
  <Paper
    elevation={1}
    sx={{
      borderRadius: 2,
      maxHeight: "80vh",
      overflow: "hidden", // Changed from auto to prevent double scrollbars
      bgcolor: "#fff",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Box sx={{ p: 3, flexShrink: 0 }}>
      <Typography variant="h6" mb={2} color="primary" fontWeight="500">
        Live Preview
      </Typography>
      <Divider sx={{ mb: 2 }} />
    </Box>
    
    <Box sx={{ 
 flex: 1,
 overflow: "auto",
 p: 3, // Add padding here instead
 pt: 0, // Remove// Allow scrolling if content overflows
    }}>
      <LiveResumePreview data={resumeData} />

    </Box>
  </Paper>
</Box>
          </Box>
        </Paper>
      </Container>
    </ThemeProvider>
  );
  }
  

export default UpdateInformation;