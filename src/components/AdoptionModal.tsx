import React, { useState } from 'react';
import { PetAdoptionCandidate } from '../types';

interface AdoptionModalProps {
  pet: PetAdoptionCandidate | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
}

export const AdoptionModal: React.FC<AdoptionModalProps> = ({
  pet,
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    housingType: 'casa_con_patio',
    hasOtherPets: 'si',
    experienceYears: 'media',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !pet) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ petId: pet.id, petName: pet.name, ...formData });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26170c]/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl relative border border-[#e8dfd3] max-h-[90vh] overflow-y-auto"
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
            <div className="w-16 h-16 rounded-full bg-[#ffdcc3] text-[#83532b] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h3 className="text-xl font-bold text-[#26170c] mb-2">
              ¡Postulación recibida para {pet.name}!
            </h3>
            <p className="text-sm text-[#4f453f] max-w-sm mb-4">
              El equipo del {pet.sanctuary} revisará tus antecedentes para coordinar una videollamada de pre-evaluación y visita al santuario.
            </p>
            <span className="text-xs text-[#83532b] font-medium">
              Te hemos enviado un correo con la cartilla de tutela ética.
            </span>
          </div>
        ) : (
          <div>
            {/* Pet Preview Banner */}
            <div className="flex items-center gap-4 p-3 bg-[#f6f3ed] rounded-xl mb-5 border border-[#ebe8e2]">
              <img
                src={pet.image}
                alt={pet.name}
                className="w-20 h-20 rounded-lg object-cover shadow-xs"
              />
              <div>
                <span className="text-[11px] font-semibold text-[#83532b] uppercase tracking-wider">
                  Postulación de Tutela Ética
                </span>
                <h3 className="text-lg font-bold text-[#26170c] flex items-center gap-2">
                  {pet.name} <span className="text-xs font-normal text-[#81756e]">({pet.breed})</span>
                </h3>
                <p className="text-xs text-[#4f453f] line-clamp-1">{pet.description}</p>
                <div className="flex gap-2 mt-1">
                  <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-[#d2c4bc] text-[#26170c] font-medium">
                    {pet.ageCategory} • {pet.age}
                  </span>
                  <span className="text-[10px] bg-[#ffdcc3] px-2 py-0.5 rounded text-[#2f1500] font-semibold">
                    {pet.sanctuary}
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#4f453f] block mb-1">
                    Tu Nombre y Apellido
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Ej. Carolina Gómez"
                    className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white focus:border-[#83532b]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#4f453f] block mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="carolina@ejemplo.com"
                    className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white focus:border-[#83532b]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#4f453f] block mb-1">
                    Teléfono / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+56 9 1234 5678"
                    className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white focus:border-[#83532b]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#4f453f] block mb-1">
                    Tipo de Vivienda
                  </label>
                  <select
                    value={formData.housingType}
                    onChange={(e) => setFormData({ ...formData, housingType: e.target.value })}
                    className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
                  >
                    <option value="casa_con_patio">Casa con patio cerrado</option>
                    <option value="departamento_malla">Departamento con malla de seguridad</option>
                    <option value="casa_sin_patio">Casa sin patio (parques cercanos)</option>
                    <option value="parcela">Parcela / Campo</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#4f453f] block mb-1">
                  ¿Por qué deseas adoptar a {pet.name}?
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Cuéntanos brevemente sobre tu rutina, familia y el espacio donde vivirá..."
                  className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-sm text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white focus:border-[#83532b]"
                />
              </div>

              <div className="p-3 bg-[#f0eee8] rounded-lg text-xs text-[#574335] flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#83532b] shrink-0 mt-0.5">
                  policy
                </span>
                <span>
                  Al postularte aceptas el <strong>Contrato Ético de Tutela</strong>, que incluye seguimiento semestral y cartilla de salud digital garantizada.
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#26170c] text-white font-semibold text-sm hover:bg-[#3d2b1f] transition-all shadow-md flex items-center justify-center gap-2 mt-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                Enviar Postulación de Tutela
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
