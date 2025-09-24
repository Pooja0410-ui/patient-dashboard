import React from "react";

function PatientModal({ patient, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96 relative">
        <button className="absolute top-2 right-2" onClick={onClose}>
          ✖
        </button>
        <h2 className="text-xl font-bold mb-2">{patient.name}</h2>
        <p>Username: {patient.username}</p>
        <p>Email: {patient.email}</p>
        <p>Phone: {patient.phone}</p>
        <p>Website: {patient.website}</p>
        <p>Company: {patient.company.name}</p>
      </div>
    </div>
  );
}

export default PatientModal;
