import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

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
    <div className="flex flex-col md:flex-row font-sans rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200">
      {/* Sidebar */}
      <aside className="bg-blue-50 text-gray-800 w-full md:w-1/3 p-8 space-y-8">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-500">
            {data.name.charAt(0)}
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-blue-600">{data.name}</h1>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex items-center space-x-2">
            <Mail size={16} className="text-blue-500" />
            <span>{data.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone size={16} className="text-blue-500" />
            <span>{data.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-blue-500" />
            <span>{data.city}</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700 mb-3 border-b border-blue-200 pb-2">
            Skills
          </h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
            {data.skills.map((skill, i) => (
              <li
                key={i}
                className="text-sm bg-white border border-gray-200 rounded-lg py-1 px-2 text-gray-700"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-2/3 p-8 space-y-10">
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 inline-block border-b-2 border-blue-500 pb-1">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.description}</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 inline-block border-b-2 border-blue-500 pb-1">
            Education
          </h2>
          <div className="space-y-6">
            {data.education.map((edu, idx) => (
              <div key={idx} className="">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-500">
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{edu.institution}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4 inline-block border-b-2 border-blue-500 pb-1">
            Projects
          </h2>
          <div className="space-y-6">
            {data.projects.map((proj, idx) => (
              <div key={idx} className="">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{proj.name}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {proj.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResumePreview;
