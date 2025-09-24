import React, { useState } from 'react'
import { usePatientDispatch } from '../context/PatientContext'

const makeId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 9)

export default function AddPatientForm() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', age: '', phone: '', email: '', address: '' })
  const dispatch = usePatientDispatch()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const newPatient = {
      id: makeId(),
      name: form.name || 'Unnamed',
      age: form.age ? Number(form.age) : null,
      phone: form.phone || '—',
      email: form.email || '—',
      address: form.address || '—',
      picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name || 'P')}`,
    }
    dispatch({ type: 'ADD_PATIENT', payload: newPatient })
    setForm({ name: '', age: '', phone: '', email: '', address: '' })
    setOpen(false)
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700">
        Add Patient
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Add New Patient</h3>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="w-full px-3 py-2 border rounded" required />
              <input name="age" value={form.age} onChange={handleChange} placeholder="Age" className="w-full px-3 py-2 border rounded" type="number" />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full px-3 py-2 border rounded" />
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full px-3 py-2 border rounded" />
              <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="w-full px-3 py-2 border rounded" />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setOpen(false)} className="px-3 py-2 border rounded">Cancel</button>
                <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
