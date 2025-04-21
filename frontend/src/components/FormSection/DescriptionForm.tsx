import React from 'react';

interface DescriptionFormProps {
  formData: {
    description: string;
  };
  onChange: (field: string, value: string) => void;
}

const DescriptionForm: React.FC<DescriptionFormProps> = ({ formData, onChange }) => {
  const { description } = formData;

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Description</h3>
      <div className="mb-2">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => onChange('description', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
        />
      </div>
    </div>
  );
};

export default DescriptionForm;
