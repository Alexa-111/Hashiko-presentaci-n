import React, { useState } from 'react';
import { PatientVitals } from '../types';

interface PrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientVitals;
  onEmitSuccess: (prescription: any) => void;
}

export const PrescriptionModal: React.FC<PrescriptionModalProps> = ({
  isOpen,
  onClose,
  patient,
  onEmitSuccess
}) => {
  const [medication, setMedication] = useState('Meloxicam suspensión oral 0.5 mg/ml');
  const [dosage, setDosage] = useState('0.1 mg/kg el día 1, luego 0.05 mg/kg cada 24 hrs');
  const [duration, setDuration] = useState('3 días (postquirúrgico)');
  const [indications, setIndications] = useState('Administrar con alimento húmedo para proteger mucosa gástrica. Suspender si hay vómitos o inapetencia.');
  const [signed, setSigned] = useState(false);
  const [emitted, setEmitted] = useState(false);

  if (!isOpen) return null;

  const handleEmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmitted(true);
    onEmitSuccess({
      patient: patient.petName,
      chip: patient.microchip,
      medication,
      dosage,
      duration,
      doctor: 'Dra. Karina García (MPV #4829)',
      date: new Date().toLocaleDateString('es-ES')
    });
    setTimeout(() => {
      setEmitted(false);
      onClose();
    }, 2000);
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

        {emitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[36px]">verified</span>
            </div>
            <h3 className="text-xl font-bold text-[#26170c] mb-2">
              ¡Receta Digital Emitida y Firmada!
            </h3>
            <p className="text-xs text-[#4f453f] max-w-sm mb-4">
              Se ha remitido copia firmada digitalmente con sello QR al correo de {patient.ownerName} y registrado en el dispensario de Farmacia Hashiko.
            </p>
            <span className="text-[11px] font-mono text-[#83532b] bg-[#f6f3ed] px-3 py-1 rounded">
              Hash Certificado: RX-2026-9810-LK77
            </span>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#83532b] text-[24px]">prescriptions</span>
              <div>
                <h3 className="text-lg font-bold text-[#26170c] leading-tight">Emitir Receta Médica Digital</h3>
                <span className="text-xs text-[#4f453f]">Paciente: <strong>{patient.petName}</strong> ({patient.species})</span>
              </div>
            </div>

            <form onSubmit={handleEmit} className="flex flex-col gap-3">
              <div>
                <label className="text-xs font-semibold text-[#4f453f] block mb-1">Medicamento Prescrito</label>
                <input
                  type="text"
                  required
                  value={medication}
                  onChange={(e) => setMedication(e.target.value)}
                  className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#4f453f] block mb-1">Dosis y Posología</label>
                  <input
                    type="text"
                    required
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#4f453f] block mb-1">Duración Tratamiento</label>
                  <input
                    type="text"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#4f453f] block mb-1">Indicaciones al Tutor</label>
                <textarea
                  rows={3}
                  value={indications}
                  onChange={(e) => setIndications(e.target.value)}
                  className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
                />
              </div>

              {/* Digital Doctor Signature Box */}
              <div className="p-3 bg-[#f6f3ed] rounded-xl border border-[#ebe8e2] flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-[#81756e] block">Profesional Firmante:</span>
                  <span className="font-bold text-xs text-[#26170c]">Dra. Karina García</span>
                  <span className="text-[10px] text-[#83532b] block">Colegio Médico Veterinario MPV #4829</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSigned(!signed)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                    signed ? 'bg-green-700 text-white' : 'bg-[#e8dfd3] text-[#26170c]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {signed ? 'verified' : 'draw'}
                  </span>
                  {signed ? 'Firma Token OK' : 'Firmar con Token'}
                </button>
              </div>

              <button
                type="submit"
                disabled={!signed}
                className={`w-full py-3 rounded-lg text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-2 ${
                  signed ? 'bg-[#26170c] hover:bg-[#3d2b1f] cursor-pointer' : 'bg-gray-400 cursor-not-allowed opacity-70'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">verified_user</span>
                Emitir y Registrar en Red Clínica
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
