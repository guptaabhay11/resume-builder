import React from 'react';

interface ProjectsFormProps {
  formData: {
    projects: string;
  };
  onChange: (field: string, value: string) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ formData, onChange }) => {
  const { projects } = formData;

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Projects</h3>
      <div className="mb-2">
        <label className="block text-sm font-medium">Projects</label>
        <textarea
          value={projects}
          onChange={(e) => onChange('projects', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
        />
      </div>
    </div>
  );
};

export default ProjectsForm;
