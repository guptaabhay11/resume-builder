import React from "react";

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  city: string;
  skills: string[];
  description: string;
  education: {
    degree: string;
    institution: string;
    startYear: string;
    endYear: string;
  }[];
  projects: {
    name: string;
    description: string;
  }[];
}

const ResumePreview: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <div className="flex flex-col md:flex-row w-full h-auto font-sans text-sm">
      {/* Sidebar */}
      <aside className="md:w-3/10 w-full bg-[#2E3B55] text-white p-5">
        <h1 className="text-xl font-bold mb-3">{data.name}</h1>
        <p className="mb-2">{data.email}</p>
        <p className="mb-2">{data.phone}</p>
        <p className="mb-2">{data.city}</p>
        <h1>hey there</h1>
        
        <h3 className="mt-6 text-base font-bold border-b border-white pb-1 mb-2">
          Skillssssssss
        </h3>
        <ul>
          {data.skills.map((skill, i) => (
            <li key={i} className="flex mb-1">
              <span className="w-2 mr-1">•</span>
              <span className="flex-1">{skill}</span>
            </li>
          ))}
        </ul>
      </aside>
      
      {/* Main Content */}
      <main className="md:w-7/10 w-full bg-white p-5">
        {/* Summary */}
        <section className="mb-5">
          <h2 className="text-base font-bold border-b border-[#2E3B55] text-[#2E3B55] pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="mb-1 leading-relaxed">{data.description}</p>
        </section>
        
        {/* Education */}
        <section className="mb-5">
          <h2 className="text-base font-bold border-b border-[#2E3B55] text-[#2E3B55] pb-1 mb-2">
            Education
          </h2>
          {data.education.map((edu, idx) => (
            <div key={idx} className="mb-3">
              <p className="font-bold text-sm">{edu.degree}</p>
              <p className="text-sm text-gray-700">{edu.institution}</p>
              <p className="text-xs italic text-gray-600 mb-1">
                {edu.startYear} - {edu.endYear}
              </p>
            </div>
          ))}
        </section>
        
        {/* Projects */}
        <section className="mb-5">
          <h2 className="text-base font-bold border-b border-[#2E3B55] text-[#2E3B55] pb-1 mb-2">
            Projects
          </h2>
          {data.projects.map((proj, idx) => (
            <div key={idx} className="mb-3">
              <p className="font-bold text-sm">{proj.name}</p>
              <p className="mb-1">{proj.description}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default ResumePreview;