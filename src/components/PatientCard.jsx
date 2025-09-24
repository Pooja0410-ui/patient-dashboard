import React, { useState } from "react";
import PatientModal from "./PatientModal";

function PatientCard({ patient }) {
  const [showModal, setShowModal] = useState(false);

  if (!patient) return null; // ✅ defensive check

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="font-bold text-lg">{patient.name}</h2>
      <p>Username: {patient.username}</p>
      <p>Email: {patient.email}</p>
      <button
        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
        onClick={() => setShowModal(true)}
      >
        View Details
      </button>

      {showModal && patient && (
        <PatientModal patient={patient} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default PatientCard;
