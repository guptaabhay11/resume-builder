import React from 'react';

interface PersonalInfoFormProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    city: string;
  };
  onChange: (field: string, value: string) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ formData, onChange }) => {
  const { name, email, phone, city } = formData;

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Personal Information</h3>
      <div className="mb-2">
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => onChange('name', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => onChange('email', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">Phone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => onChange('phone', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium">City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => onChange('city', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
    </div>
  );
};

export default PersonalInfoForm;
