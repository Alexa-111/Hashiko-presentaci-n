import React, { useState } from 'react';
import { Appointment } from '../types';

interface NewAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAppointment: (appointment: Partial<Appointment>) => void;
}

export const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({
  isOpen,
  onClose,
  onAddAppointment
}) => {
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState('Canino Mestizo');
  const [age, setAge] = useState('2 años');
  const [ownerName, setOwnerName] = useState('');
  const [time, setTime] = useState('12:15 PM');
  const [box, setBox] = useState('Box Quirúrgico 1');
  const [reason, setReason] = useState('Evaluación Prequirúrgica');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAppointment({
      id: `apt-${Date.now()}`,
      petName,
      species,
      age,
      ownerName,
      time,
      status: 'proxima',
      statusLabel: `${time} • Programada`,
      box: box.includes('Quirúrgico') ? 'Box Qx' : 'Box 1',
      reason,
      notes,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOsSpvOyPZps4nuduCqfFeQLZi9RFhMEA0a0p-J6RCdM5ROil3QTiAQGZuLo2is6XODsHSXdaSUZjz78hPLqcKTpbCiNHEP4vzDsbJWMXY6mIBjQa0cMm5j1rO6oZb63NvPe4rd3MRQA6utEmnYULWh4XgHAJEkrc2--6ptKVRwawT8xAXcNq1ZrjEMio8dXvti4ypmflrhIVsdcOA1Mw8nj9TMYgz6izE6aKMDIMVtUsSEhYyp6a-'
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26170c]/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-[#e8dfd3]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f0eee8] flex items-center justify-center text-[#1c1c18] hover:bg-[#ebe8e2] transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#ffdcc3] text-[#83532b] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">calendar_add_on</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#26170c] leading-tight">Agendar Nueva Cita Clínica</h3>
            <span className="text-xs text-[#83532b] font-medium">Asignación directa a box de atención</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#4f453f] block mb-1">Nombre Mascota</label>
              <input
                type="text"
                required
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Ej. Max, Mia..."
                className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4f453f] block mb-1">Especie y Raza</label>
              <input
                type="text"
                required
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                placeholder="Ej. Felino Angora, Canino..."
                className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#4f453f] block mb-1">Nombre Tutor</label>
              <input
                type="text"
                required
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                placeholder="Ej. Marcela Pinto"
                className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4f453f] block mb-1">Hora Estimada</label>
              <input
                type="text"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="12:15 PM"
                className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-[#4f453f] block mb-1">Box Clínico</label>
              <select
                value={box}
                onChange={(e) => setBox(e.target.value)}
                className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
              >
                <option>Box Quirúrgico 1</option>
                <option>Box 1 - Consultas Generales</option>
                <option>Box 2 - Dermatología & Triaje</option>
                <option>Box Reanimación</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-[#4f453f] block mb-1">Edad del Paciente</label>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#4f453f] block mb-1">Motivo de Consulta / Cirugía</label>
            <input
              type="text"
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ej. Chequeo preventivo o esterilización"
              className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[#4f453f] block mb-1">Notas de Recepción</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Antecedentes médicos relevantes, ayuno previo..."
              className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-lg bg-[#26170c] text-white font-semibold text-sm hover:bg-[#3d2b1f] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add_task</span>
            Confirmar en Agenda Quirúrgica
          </button>
        </form>
      </div>
    </div>
  );
};
