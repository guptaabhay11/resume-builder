import React, { useState } from 'react';
import ResumePreview from './ResumePreview';
import ResumePDF from './ResumePdf';
import { PDFDownloadLink, pdf } from '@react-pdf/renderer';
import { useUploadPdfMutation } from '../services/api';
import { toast } from 'react-toastify';

interface ReviewPageProps {
  resumeData: any;
}

const ReviewPage: React.FC<ReviewPageProps> = ({ resumeData }) => {
  const [uploadPdf, { isLoading }] = useUploadPdfMutation();
  const [uploading, setUploading] = useState(false);

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

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Scrollable content area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '40px' }}>
        <ResumePreview resumeData={resumeData} />
      </div>

      {/* Sticky action bar */}
      <div style={{
        padding: '20px',
        borderTop: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        backgroundColor: '#fff',
        position: 'sticky',
        bottom: 0,
        zIndex: 10
      }}>

        <button
          onClick={handleSaveResume}
          disabled={uploading || isLoading}
          style={{
            backgroundColor: '#1976d2',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: uploading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {uploading ? 'Saving...' : 'Save this resume to profile'}
        </button>
      </div>
    </div>
  );
};

export default ReviewPage;
