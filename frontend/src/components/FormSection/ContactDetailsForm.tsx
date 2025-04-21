import React from 'react';

interface ContactDetailsFormProps {
  formData: {
    email: string;
    phone: string;
  };
  onChange: (field: string, value: string) => void;
}

const ContactDetailsForm: React.FC<ContactDetailsFormProps> = ({ formData, onChange }) => {
  const { email, phone } = formData;

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Contact Details</h3>
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
    </div>
  );
};

export default ContactDetailsForm;
