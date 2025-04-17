import React from "react";

const ResumePreview = ({ data }: { data: any }) => {
  return (
    <div
      style={{
        display: "flex",
        fontFamily: "Segoe UI, sans-serif",
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
       
      }}
    >
      {/* Sidebar */}
      <div style={{ background: "#2E3B55", color: "#fff", width: "30%", padding: "20px" }}>
        <h2 style={{ marginTop: 0 }}>{data.name}</h2>
        <p>{data.email}</p>
        <p>{data.phone}</p>
        <p>{data.city}</p>

        <h3 style={{ marginTop: "40px", borderBottom: "1px solid #fff" }}>Skills</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {data.skills.map((skill: string, index: number) => (
            <li key={index} style={{ marginBottom: "8px" }}>• {skill}</li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ padding: "20px", width: "70%" }}>
        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ borderBottom: "2px solid #eee", paddingBottom: "4px" }}>
            Professional Summary
          </h2>
          <p>{data.description}</p>
        </section>

        <section style={{ marginBottom: "20px" }}>
          <h2 style={{ borderBottom: "2px solid #eee", paddingBottom: "4px" }}>
            Education
          </h2>
          {data.education.map((edu: any, index: number) => (
            <div key={index} style={{ marginBottom: "12px" }}>
              <strong>{edu.degree}</strong>, {edu.institution}
              <p style={{ margin: 0, color: "#555" }}>
                {edu.startYear}  {edu.endYear}
              </p>
            </div>
          ))}
        </section>

        <section>
          <h2 style={{ borderBottom: "2px solid #eee", paddingBottom: "4px" }}>
            Projects
          </h2>
          {data.projects.map((proj: any, index: number) => (
            <div key={index} style={{ marginBottom: "12px" }}>
              <strong>{proj.name}</strong>
              <p style={{ margin: "4px 0", color: "#555" }}>{proj.description}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ResumePreview;
