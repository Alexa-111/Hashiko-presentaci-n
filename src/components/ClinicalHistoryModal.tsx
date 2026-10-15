import React from 'react';
import { PatientVitals } from '../types';

interface ClinicalHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientVitals;
}

export const ClinicalHistoryModal: React.FC<ClinicalHistoryModalProps> = ({
  isOpen,
  onClose,
  patient
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26170c]/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative border border-[#e8dfd3] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f0eee8] flex items-center justify-center text-[#1c1c18] hover:bg-[#ebe8e2] transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-[#f0eee8]">
          <img
            src={patient.image}
            alt={patient.petName}
            className="w-16 h-16 rounded-xl object-cover shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-[#26170c]">{patient.petName}</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#ffdcc3] text-[#2f1500] text-xs font-bold">
                Expediente Digital #VET-9810
              </span>
            </div>
            <p className="text-xs text-[#4f453f] mt-0.5">
              {patient.species} • {patient.gender} ({patient.sterilized ? 'Esterilizada' : 'Entera'}) • Chip: <span className="font-mono text-[#83532b]">{patient.microchip}</span>
            </p>
            <p className="text-xs text-[#81756e]">Tutora: {patient.ownerName} ({patient.ownerPhone})</p>
          </div>
        </div>

        {/* Quick Vitals Strip */}
        <div className="grid grid-cols-4 gap-2 my-4">
          <div className="p-2.5 bg-[#f6f3ed] rounded-lg text-center">
            <span className="text-[11px] text-[#4f453f] block">Peso Actual</span>
            <span className="font-bold text-[#26170c] text-sm">{patient.currentWeight}</span>
          </div>
          <div className="p-2.5 bg-[#f6f3ed] rounded-lg text-center">
            <span className="text-[11px] text-[#4f453f] block">Vacunación</span>
            <span className="font-bold text-[#83532b] text-sm">Al día</span>
          </div>
          <div className="p-2.5 bg-[#f6f3ed] rounded-lg text-center">
            <span className="text-[11px] text-[#4f453f] block">Desparasitación</span>
            <span className="font-bold text-[#26170c] text-sm">1 mes</span>
          </div>
          <div className="p-2.5 bg-[#f6f3ed] rounded-lg text-center">
            <span className="text-[11px] text-[#4f453f] block">Condición Corporal</span>
            <span className="font-bold text-[#26170c] text-sm">BCS 5/9</span>
          </div>
        </div>

        {/* Clinical History Timeline */}
        <div className="flex flex-col gap-4">
          <div>
            <h4 className="text-sm font-bold text-[#26170c] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#83532b]">medical_information</span>
              Historial Quirúrgico & Procedimientos
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-[#f6f3ed] rounded-xl border border-[#ebe8e2]">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-xs text-[#26170c]">
                    Ovariohisterectomía por Línea Alba (Esterilización Preventiva)
                  </span>
                  <span className="text-[11px] text-[#81756e]">14 de Octubre, 2026</span>
                </div>
                <p className="text-xs text-[#4f453f] leading-relaxed">
                  Cirujana: Dra. Karina García (MPV #4829). Protocolo anestésico con inducción propofol y mantención isoflurano. Cierre de plano muscular con Vicryl 3-0 y sutura subdérmica Monocryl 4-0. Recuperación inmediata sin incidentes.
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[10px] bg-white border border-[#d2c4bc] px-2 py-0.5 rounded text-[#26170c]">
                    Sutura Subcuticular
                  </span>
                  <span className="text-[10px] bg-white border border-[#d2c4bc] px-2 py-0.5 rounded text-[#26170c]">
                    Monitoreo Multiparámetro OK
                  </span>
                </div>
              </div>

              <div className="p-3 bg-[#f6f3ed] rounded-xl border border-[#ebe8e2]">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-xs text-[#26170c]">
                    Implantación de Microchip Identificatorio ISO 11784/11785
                  </span>
                  <span className="text-[11px] text-[#81756e]">02 de Agosto, 2026</span>
                </div>
                <p className="text-xs text-[#4f453f]">
                  Aplicación en región interescapular. Lectura confirmada en lector Datamars. Registrada en Plataforma Nacional Hashiko & Registro Central Veterinario.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#26170c] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-[#83532b]">vaccines</span>
              Esquema de Inmunización Activo
            </h4>
            <div className="bg-[#fcf9f3] p-3 rounded-xl border border-[#ebe8e2] text-xs space-y-2">
              <div className="flex justify-between pb-1 border-b border-[#f0eee8]">
                <span>Triple Felina (Panleucopenia, Rinotraqueítis, Calicivirus)</span>
                <span className="font-semibold text-green-700">Vigente hasta Mayo 2027</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-[#f0eee8]">
                <span>Antirrábica Rabisin</span>
                <span className="font-semibold text-green-700">Vigente hasta Septiembre 2027</span>
              </div>
              <div className="flex justify-between">
                <span>Test Retroviral FeLV / FIV</span>
                <span className="font-semibold text-[#26170c]">Seronegativo (-)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-[#f0eee8] flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#26170c] text-white text-xs font-semibold hover:bg-[#3d2b1f] transition-all"
          >
            Cerrar Expediente
          </button>
        </div>
      </div>
    </div>
  );
};
