import { BlobProvider } from "@react-pdf/renderer";
import ResumePDF from "./ResumePdf";
import React, { useMemo, useState, useEffect } from "react";

interface ResumeData {
  name: string;
  email: string;
  // Add other fields
}

const ResumePreview = ({ resumeData }: { resumeData: ResumeData }) => {
  const [debouncedData, setDebouncedData] = useState(resumeData);

  // Debounce the update
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedData(resumeData);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [resumeData]);

  const memoizedDocument = useMemo(() => <ResumePDF data={debouncedData} />, [debouncedData]);

  return (
    <BlobProvider document={memoizedDocument}>
      {({ url, loading }) => (
        url && !loading ? (
          <div style={{
            width: "100%",
            height: "80vh",
            overflow: "hidden",
            position: "relative",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}>
            <iframe
              src={`${url}#toolbar=0&navpanes=0`}
              style={{
                width: "100%",
                height: "100%",
                border: "none",
                position: "absolute",
                top: 0,
                left: 0
              }}
            />
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <p>Loading PDF...</p>
          </div>
        )
      )}
    </BlobProvider>
  );
};

export default ResumePreview;
