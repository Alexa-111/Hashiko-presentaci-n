import React from 'react';

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToLogin: () => void;
  onGoToRegister: () => void;
  sourceContext?: string;
}

export const AuthRequiredModal: React.FC<AuthRequiredModalProps> = ({
  isOpen,
  onClose,
  onGoToLogin,
  onGoToRegister,
  sourceContext
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#26170c]/60 backdrop-blur-sm transition-all duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-[#e8dfd3] transform transition-all animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f0eee8] flex items-center justify-center text-[#1c1c18] hover:bg-[#ebe8e2] transition-colors"
          onClick={onClose}
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="w-12 h-12 rounded-xl bg-[#3d2b1f] text-white flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-[26px]">verified_user</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffdcc3] text-[#2f1500] text-xs font-semibold mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#83532b]"></span>
          Protocolo de Seguridad Animal
        </div>

        <h3 className="text-xl font-bold text-[#26170c] mt-1 mb-2 tracking-tight">
          Identidad Verificada Necesaria
        </h3>

        {sourceContext && (
          <p className="text-xs text-[#83532b] font-medium mb-2 bg-[#f6f3ed] px-3 py-1.5 rounded-md">
            Acción solicitada: <strong>{sourceContext}</strong>
          </p>
        )}

        <p className="text-sm text-[#4f453f] mb-6 leading-relaxed">
          Para salvaguardar el bienestar de los animales y evitar fraudes en alertas SOS o adopciones irregulares, necesitas acceder con tu perfil de tutor o rescatista validado.
        </p>

        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => {
              onClose();
              onGoToLogin();
            }}
            className="w-full py-3 px-4 rounded-lg bg-[#26170c] text-white text-center text-sm font-semibold hover:bg-[#3d2b1f] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">lock_open</span> Iniciar Sesión Rápida
          </button>

          <button
            onClick={() => {
              onClose();
              onGoToRegister();
            }}
            className="w-full py-3 px-4 rounded-lg bg-[#f0eee8] text-[#26170c] text-center text-sm font-semibold hover:bg-[#ebe8e2] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">badge</span> Registrarse como Tutor Verificado
          </button>
        </div>
      </div>
    </div>
  );
};
