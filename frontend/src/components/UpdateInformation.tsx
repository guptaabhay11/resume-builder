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
} from "@mui/material";
import { Add, Delete, NavigateNext, NavigateBefore, Send } from "@mui/icons-material";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import ResumePDF from "./ResumePdf";
import ResumePreview from "./ResumePreview";
import { useSendFileMutation } from "../services/api";  // adjust path if needed

// Data types
interface Education { institution: string; degree: string; startYear: string; endYear: string; }
interface Project   { name: string; description: string; }
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

const UpdateInformation: React.FC = (): React.ReactElement => {
  const steps = [
    "Personal Info",
    "Contact Details",
    "Description",
    "Education",
    "Projects",
    "Skills",
    "Review",
  ];

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
    setResumeData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => {
      const e = { ...prev };
      delete (e as any)[field];
      return e;
    });
  };

  // Array handlers
  const handleEducationChange = (i: number, field: keyof Education, value: string) => {
    const arr = [...resumeData.education];
    arr[i] = { ...arr[i], [field]: value };
    handleChange("education", arr);
  };
  const handleProjectChange = (i: number, field: keyof Project, value: string) => {
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
  const addEducation = () => handleChange("education", [...resumeData.education, { institution: "", degree: "", startYear: "", endYear: "" }]);
  const removeEducation = (i: number) => handleChange("education", resumeData.education.filter((_, idx) => idx !== i));
  const addProject = () => handleChange("projects", [...resumeData.projects, { name: "", description: "" }]);
  const removeProject = (i: number) => handleChange("projects", resumeData.projects.filter((_, idx) => idx !== i));
  const addSkill = () => handleChange("skills", [...resumeData.skills, ""]);
  const removeSkill = (i: number) => handleChange("skills", resumeData.skills.filter((_, idx) => idx !== i));

  // Validation for each step
  const validateCurrentStep = (): boolean => {
    const newErrors: ValidationErrors = {};
    switch (activeStep) {
      case 0:
        if (!resumeData.name.trim()) newErrors.name = "Name is required";
        else if (!/^[a-zA-Z\s]+$/.test(resumeData.name)) newErrors.name = "Letters only";
        break;
      case 1:
        if (!resumeData.email.trim()) newErrors.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(resumeData.email)) newErrors.email = "Invalid email";
        if (!resumeData.phone.trim()) newErrors.phone = "Phone is required";
        else if (!/^\d+$/.test(resumeData.phone)) newErrors.phone = "Digits only";
        if (!resumeData.city.trim()) newErrors.city = "City is required";
        break;
      case 2:
        if (!resumeData.description.trim()) newErrors.description = "Description is required";
        break;
      case 3:
        const eduErrs = resumeData.education.map(edu => {
          const err: Record<string,string> = {};
          if (!edu.institution) err.institution = "Required";
          if (!edu.degree) err.degree = "Required";
          if (!/^[0-9]{4}$/.test(edu.startYear)) err.startYear = "YYYY";
          if (!/^[0-9]{4}$/.test(edu.endYear)) err.endYear = "YYYY";
          return err;
        });
        if (eduErrs.some(e => Object.keys(e).length)) newErrors.education = eduErrs;
        break;
      case 4:
        const projErrs = resumeData.projects.map(p => {
          const err: Record<string,string> = {};
          if (!p.name) err.name = "Required";
          if (!p.description) err.description = "Required";
          return err;
        });
        if (projErrs.some(e => Object.keys(e).length)) newErrors.projects = projErrs;
        break;
      case 5:
        const skillErrs = resumeData.skills.map(s => s ? "" : "Required");
        if (skillErrs.some(e => e)) newErrors.skills = skillErrs;
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => { if (validateCurrentStep()) setActiveStep(s => s + 1); };
  const handleBack = () => setActiveStep(s => s - 1);

  // Handler to send email
  const handleSendEmail = async () => {
    try {
      const blob = await pdf(<ResumePDF data={resumeData} />).toBlob();
      const file = new File([blob], `${resumeData.name.replace(/\s/g,"_")}_resume.pdf`, { type: "application/pdf" });
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
        return (<Box mt={4}><TextField label="Full Name" fullWidth value={resumeData.name} onChange={e=>handleChange("name",e.target.value)} error={!!errors.name} helperText={errors.name} /></Box>);
      case 1:
        return (<Stack spacing={2} mt={4}><TextField label="Email" fullWidth value={resumeData.email} onChange={e=>handleChange("email",e.target.value)} error={!!errors.email} helperText={errors.email} /><TextField label="Phone" fullWidth value={resumeData.phone} onChange={e=>handleChange("phone",e.target.value)} error={!!errors.phone} helperText={errors.phone} /><TextField label="City" fullWidth value={resumeData.city} onChange={e=>handleChange("city",e.target.value)} error={!!errors.city} helperText={errors.city} /></Stack>);
      case 2:
        return (<Box mt={4}><TextField label="Description" fullWidth multiline minRows={4} value={resumeData.description} onChange={e=>handleChange("description",e.target.value)} error={!!errors.description} helperText={errors.description} /></Box>);
      case 3:
        return (<Box mt={4}><Typography variant="h6">Education</Typography>{resumeData.education.map((edu,i)=>(<Box key={i} mt={2} p={2} border="1px solid #ccc" borderRadius={2}><Stack spacing={2}><TextField label="Institution" fullWidth value={edu.institution} onChange={e=>handleEducationChange(i,"institution",e.target.value)} error={!!errors.education?.[i]?.institution} helperText={errors.education?.[i]?.institution} /><TextField label="Degree" fullWidth value={edu.degree} onChange={e=>handleEducationChange(i,"degree",e.target.value)} error={!!errors.education?.[i]?.degree} helperText={errors.education?.[i]?.degree} /><Stack direction="row" spacing={2}><TextField label="Start Year" fullWidth value={edu.startYear} onChange={e=>handleEducationChange(i,"startYear",e.target.value)} error={!!errors.education?.[i]?.startYear} helperText={errors.education?.[i]?.startYear} /><TextField label="End Year" fullWidth value={edu.endYear} onChange={e=>handleEducationChange(i,"endYear",e.target.value)} error={!!errors.education?.[i]?.endYear} helperText={errors.education?.[i]?.endYear} /></Stack>{resumeData.education.length>1&&<IconButton color="error" onClick={()=>removeEducation(i)}><Delete/></IconButton>}</Stack></Box>))}<Button variant="outlined" startIcon={<Add/>} onClick={addEducation} sx={{mt:2}}>Add Education</Button></Box>);
      case 4:
        return (<Box mt={4}><Typography variant="h6">Projects</Typography>{resumeData.projects.map((p,i)=>(<Box key={i} mt={2} p={2} border="1px solid #ccc" borderRadius={2}><Stack spacing={2}><TextField label="Project Name" fullWidth value={p.name} onChange={e=>handleProjectChange(i,"name",e.target.value)} error={!!errors.projects?.[i]?.name} helperText={errors.projects?.[i]?.name} /><TextField label="Description" fullWidth multiline minRows={2} value={p.description} onChange={e=>handleProjectChange(i,"description",e.target.value)} error={!!errors.projects?.[i]?.description} helperText={errors.projects?.[i]?.description} />{resumeData.projects.length>1&&<IconButton color="error" onClick={()=>removeProject(i)}><Delete/></IconButton>}</Stack></Box>))}<Button variant="outlined" startIcon={<Add/>} onClick={addProject} sx={{mt:2}}>Add Project</Button></Box>);
      case 5:
        return (<Box mt={4}><Typography variant="h6">Skills</Typography><Stack spacing={2}>{resumeData.skills.map((s,i)=>(<Stack key={i} direction="row" spacing={2} alignItems="center"><TextField label={`Skill ${i+1}`} fullWidth value={s} onChange={e=>handleSkillChange(i,e.target.value)} error={!!errors.skills?.[i]} helperText={errors.skills?.[i]} />{resumeData.skills.length>1&&<IconButton color="error" onClick={()=>removeSkill(i)}><Delete/></IconButton>}</Stack>))}<Button variant="outlined" startIcon={<Add/>} onClick={addSkill} sx={{mt:2}}>Add Skill</Button></Stack></Box>);
      case 6:
        return (<Box mt={4} textAlign="center"><Typography variant="h5" gutterBottom>Review Your Resume</Typography><ResumePreview data={resumeData} /><Stack direction="row" justifyContent="center" spacing={2} sx={{mt:4}}><PDFDownloadLink document={<ResumePDF data={resumeData} />} fileName={`${resumeData.name.replace(/\s/g,"_")}_resume.pdf`} style={{textDecoration:"none"}}>{({loading})=>loading?<Button disabled>Preparing PDF…</Button>:<Button variant="contained" color="primary">Download PDF</Button>}</PDFDownloadLink><Button variant="outlined" color="secondary" startIcon={sending?<CircularProgress size={20}/>:<Send/>} onClick={handleSendEmail} disabled={sending}>{sending?"Sending…":"Send to Email"}</Button></Stack>{isSuccess&&<Typography color="success.main" mt={2}>Email sent successfully!</Typography>}</Box>);
      default: return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Resume Builder
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
  
      <Box display="flex" gap={4}>
        {/* Left: Form Steps */}
        <Box flex={1}>
          {renderStepContent()}
          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button
              onClick={handleBack}
              disabled={activeStep === 0}
              startIcon={<NavigateBefore />}
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
        </Box>
  
        {/* Right: Live Preview */}
        <Box
          flex={1}
          p={2}
          border="1px solid #ccc"
          borderRadius={2}
          maxHeight="80vh"
          overflow="auto"
          sx={{ backgroundColor: "#f9f9f9" }}
        >
          <Typography variant="h6" mb={2}>
              Live Preview
          </Typography>
          <ResumePreview data={resumeData} />
        </Box>
      </Box>
    </Container>
  );
}  

export default UpdateInformation;
