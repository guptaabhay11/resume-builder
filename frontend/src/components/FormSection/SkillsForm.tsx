import React from 'react';

interface SkillsFormProps {
  formData: {
    skills: string;
  };
  onChange: (field: string, value: string) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ formData, onChange }) => {
  const { skills } = formData;

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Skills</h3>
      <div className="mb-2">
        <label className="block text-sm font-medium">Skills</label>
        <textarea
          value={skills}
          onChange={(e) => onChange('skills', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
        />
      </div>
    </div>
  );
};

export default SkillsForm;
