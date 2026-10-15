import React, { useState } from 'react';
import { LostPetAlert } from '../types';

interface SosReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetPet?: LostPetAlert;
  isNewAlert?: boolean;
  onSubmit: (data: any) => void;
}

export const SosReportModal: React.FC<SosReportModalProps> = ({
  isOpen,
  onClose,
  targetPet,
  isNewAlert = false,
  onSubmit
}) => {
  const [sightingLocation, setSightingLocation] = useState('');
  const [sightingTime, setSightingTime] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // For new lost pet
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState('Perro');
  const [lastSeen, setLastSeen] = useState('');
  const [rewardAmount, setRewardAmount] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      targetPetId: targetPet?.id,
      isNewAlert,
      petName: isNewAlert ? petName : targetPet?.name,
      sightingLocation,
      sightingTime,
      contactName,
      contactPhone,
      notes
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26170c]/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-[#e8dfd3] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f0eee8] flex items-center justify-center text-[#1c1c18] hover:bg-[#ebe8e2] transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-red-100 text-[#ba1a1a] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[36px]">emergency</span>
            </div>
            <h3 className="text-xl font-bold text-[#26170c] mb-2">
              {isNewAlert ? '¡Alerta SOS Activada en la Red!' : '¡Pista Registrada Exitosamente!'}
            </h3>
            <p className="text-sm text-[#4f453f] max-w-sm mb-4">
              {isNewAlert
                ? 'Se han notificado a las 38 veterinarias asociadas y voluntarios en un radio de 5km.'
                : 'La familia de Toby y las brigadas civiles activas en el sector han recibido tu notificación geolocalizada.'}
            </p>
            <span className="text-xs text-green-700 font-semibold bg-green-50 px-3 py-1 rounded-full">
              Protocolo SOS de Búsqueda en Curso
            </span>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 text-[#ba1a1a] flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">emergency_share</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#26170c] leading-tight">
                  {isNewAlert ? 'Publicar Alerta SOS de Mascota Extraviada' : `Aportar Pista sobre ${targetPet?.name || 'Mascota'}`}
                </h3>
                <span className="text-xs text-[#83532b] font-medium">Red de Resguardo & Patrullaje Inmediato</span>
              </div>
            </div>

            {!isNewAlert && targetPet && (
              <div className="p-3 bg-[#f6f3ed] rounded-xl mb-4 border border-[#ebe8e2] flex items-center gap-3">
                <img
                  src={targetPet.image}
                  alt={targetPet.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#26170c]">{targetPet.name} ({targetPet.breed})</span>
                    <span className="text-[10px] bg-[#ffdcc3] px-2 py-0.5 rounded text-[#2f1500] font-bold">
                      {targetPet.reward}
                    </span>
                  </div>
                  <p className="text-xs text-[#4f453f] truncate">{targetPet.location}</p>
                  <p className="text-[11px] text-[#83532b] font-medium">{targetPet.collarDetails}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {isNewAlert ? (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#4f453f] block mb-1">Nombre de la Mascota</label>
                      <input
                        type="text"
                        required
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        placeholder="Ej. Bruno, Toby..."
                        className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#4f453f] block mb-1">Especie</label>
                      <select
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                        className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
                      >
                        <option>Perro</option>
                        <option>Gato</option>
                        <option>Otro animal de compañía</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#4f453f] block mb-1">Último lugar visto (Dirección o punto de referencia)</label>
                    <input
                      type="text"
                      required
                      value={lastSeen}
                      onChange={(e) => setLastSeen(e.target.value)}
                      placeholder="Ej. Av. Kennedy con Las Tranqueras"
                      className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#4f453f] block mb-1">Recompensa Ofrecida (Opcional)</label>
                    <input
                      type="text"
                      value={rewardAmount}
                      onChange={(e) => setRewardAmount(e.target.value)}
                      placeholder="Ej. $200 USD"
                      className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-semibold text-[#4f453f] block mb-1">
                      ¿Dónde lo viste o crees haberlo visto?
                    </label>
                    <input
                      type="text"
                      required
                      value={sightingLocation}
                      onChange={(e) => setSightingLocation(e.target.value)}
                      placeholder="Ej. Frente a la plaza, cerca del café..."
                      className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#4f453f] block mb-1">
                      ¿A qué hora aproximada?
                    </label>
                    <input
                      type="text"
                      required
                      value={sightingTime}
                      onChange={(e) => setSightingTime(e.target.value)}
                      placeholder="Ej. Hoy a las 11:45 AM"
                      className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
                    />
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#4f453f] block mb-1">Tu Nombre</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Ej. Tomás Rojas"
                    className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#4f453f] block mb-1">Teléfono Móvil</label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+56 9 ..."
                    className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#4f453f] block mb-1">Detalles adicionales o dirección hacia donde iba</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Se veía asustado, iba en dirección al norte..."
                  className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-lg bg-[#ba1a1a] text-white font-semibold text-sm hover:bg-[#93000a] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">cell_tower</span>
                {isNewAlert ? 'Activar Difusión SOS Inmediata' : 'Enviar Pista a la Brigada'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
