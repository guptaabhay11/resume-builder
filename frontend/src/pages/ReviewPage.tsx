// ReviewPage.tsx
import React from 'react';
import ResumePreview from './ResumePreview';
import ResumePDF from './ResumePdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
 
interface ReviewPageProps {
  resumeData: any;
}
 
const ReviewPage: React.FC<ReviewPageProps> = ({ resumeData }) => {
  return (
    <div style={{ padding: '40px' }}>
      <ResumePreview data={resumeData} />
 
      <div style={{ marginTop: '20px' }}>
        <PDFDownloadLink
          document={<ResumePDF data={resumeData} />}
          fileName={`${resumeData.name}_resume.pdf`}
        >
          {({ loading }) =>
            loading ? (
              <span>Generating PDF...</span>
            ) : (
              <button>Download PDF</button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};
 
export default ReviewPage;