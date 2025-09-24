import React, { useState, useEffect } from "react";
import PatientCard from "../components/PatientCard";
import SearchBar from "../components/SearchBar";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPatients(data);
        else setError("Invalid data format");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.email) return;

    const newId = patients.length
      ? Math.max(...patients.map((p) => p.id)) + 1
      : 1;
    setPatients([...patients, { ...newPatient, id: newId }]);
    setNewPatient({ name: "", username: "", email: "", phone: "" });
    setShowAddModal(false);
  };

  const filteredPatients = Array.isArray(patients)
    ? patients.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  if (loading)
    return <div className="p-6 text-center text-blue-600">Loading...</div>;
  if (error)
    return (
      <div className="p-6 text-center text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="p-6">
      {/* Top controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:space-x-4 space-y-2 md:space-y-0 mb-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setShowAddModal(true)}
        >
          Add Patient
        </button>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-2">
        {filteredPatients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
        {filteredPatients.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No patients found.
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-11/12 md:w-1/2 relative">
            <button
              className="absolute top-2 right-2 text-xl font-bold"
              onClick={() => setShowAddModal(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Patient</h2>
            <form className="space-y-2" onSubmit={handleAddPatient}>
              <input
                type="text"
                placeholder="Name"
                value={newPatient.name}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, name: e.target.value })
                }
                className="border p-2 rounded w-full"
                required
              />
              <input
                type="text"
                placeholder="Username"
                value={newPatient.username}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, username: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <input
                type="email"
                placeholder="Email"
                value={newPatient.email}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, email: e.target.value })
                }
                className="border p-2 rounded w-full"
                required
              />
              <input
                type="text"
                placeholder="Phone"
                value={newPatient.phone}
                onChange={(e) =>
                  setNewPatient({ ...newPatient, phone: e.target.value })
                }
                className="border p-2 rounded w-full"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded mt-2"
              >
                Add Patient
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Patients;
