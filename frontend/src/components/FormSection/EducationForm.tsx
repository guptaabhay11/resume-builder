import React from 'react';

interface EducationFormProps {
  formData: {
    education: string;
  };
  onChange: (field: string, value: string) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ formData, onChange }) => {
  const { education } = formData;

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Education</h3>
      <div className="mb-2">
        <label className="block text-sm font-medium">Education</label>
        <textarea
          value={education}
          onChange={(e) => onChange('education', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
        />
      </div>
    </div>
  );
};

export default EducationForm;
