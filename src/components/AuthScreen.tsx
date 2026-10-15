import React, { useState } from 'react';
import { ScreenView } from '../types';

interface AuthScreenProps {
  onNavigate: (view: ScreenView) => void;
  onLoginSuccess: (role: 'tutor' | 'vet', email: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onNavigate, onLoginSuccess }) => {
  const [role, setRole] = useState<'tutor' | 'vet'>('tutor');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onLoginSuccess(role, email || (role === 'vet' ? 'dra.jenkins@huellitas.vet' : 'tutor@huellitas.org'));

      if (role === 'vet') {
        onNavigate('vet-portal');
      } else {
        onNavigate('home');
      }
    }, 1000);
  };

  const handleForgotPassword = () => {
    setToastMessage('Se ha enviado un enlace de recuperación seguro a tu correo electrónico.');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="bg-[#f6f3ed] min-h-[calc(100vh-80px)] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-10 relative">
      {/* Back button */}
      <div className="w-full max-w-5xl mb-4 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#83532b] hover:text-[#26170c] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Volver al Portal Principal
        </button>

        <button
          onClick={() => onNavigate('vet-portal')}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#4f453f] hover:text-[#26170c] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">stethoscope</span>
          Ir a Clínica Profesional (Demo)
        </button>
      </div>

      {toastMessage && (
        <div className="w-full max-w-5xl mb-3 p-3 bg-[#ffdcc3] text-[#2f1500] text-xs font-semibold rounded-lg flex items-center justify-between border border-[#f9b989]">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)}>
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Main Bento Authentication Shell Container */}
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-[#e8dfd3] relative">
        {/* Left Column: Emotional Storytelling, Visual Presence & Bento Trust Indicators (5 Cols) */}
        <div className="lg:col-span-5 bg-[#f0eee8] p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Ambient Decorative Warm Glow */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#ffbf8e]/20 blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-[#fbddca]/30 blur-3xl pointer-events-none"></div>

          {/* Top Section: Brand Badge & Micro-Story */}
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#83532b] text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                pets
              </span>
              <span className="font-bold text-base text-[#26170c] tracking-tight">
                Hashiko
              </span>
            </div>
            <p className="text-xs text-[#4f453f] leading-relaxed">
              Plataforma integral de acompañamiento veterinario, adopción ética y resguardo seguro para tu compañero de vida.
            </p>
          </div>

          {/* Center Section: Hero Imagery with Live Overlay Badge */}
          <div className="relative my-4 z-10">
            <div className="w-full h-48 sm:h-52 rounded-xl overflow-hidden shadow-md relative group border border-[#e8dfd3]">
              <img
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                alt="Woman hugging dog"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ2mJOkCqGozNGez3wlLjhQdaa4CZzoZ1h2eL6Kbfrnl3Rym0WLfY16s0PZIhClNkwMN62BMd5pNZg0ke4RGMtQ1jg50XhT36gR0DDAL2RZU07NYHVyU-BOmRSC9ZhwAH8d8VqhbiCJ5F9hVYiPBeNOcm5mQskGGZhUOWSy5S2x3M9yV_HDTeJ4EJAc1cMELtHi-YGFOThR7qasJYwOAFdj2sLvbQzec41i3fnebKDwE3E-qBoQ3Sx"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#26170c]/70 via-transparent to-transparent"></div>

              {/* Live Status Pill in Hero */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#26170c] text-[11px] font-semibold shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#83532b] animate-pulse"></span>
                  Red Activa de Resguardo
                </span>
                <span className="text-[11px] text-white drop-shadow font-medium">
                  +14.2k Vidas Cuidadas
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bento Cluster: Core Benefits */}
          <div className="relative z-10 flex flex-col gap-2">
            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg flex items-center gap-3 transition-colors hover:bg-white border border-[#ebe8e2]">
              <div className="w-8 h-8 rounded-full bg-[#ffdcc3] flex items-center justify-center shrink-0 text-[#2f1500]">
                <span className="material-symbols-outlined text-base">clinical_notes</span>
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs text-[#26170c] leading-tight truncate">
                  Historial Médico Sincronizado
                </p>
                <p className="text-[11px] text-[#4f453f] leading-none mt-0.5">
                  Vacunas, desparasitaciones y alergias
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg flex items-center gap-3 transition-colors hover:bg-white border border-[#ebe8e2]">
              <div className="w-8 h-8 rounded-full bg-[#fbddca] flex items-center justify-center shrink-0 text-[#28180d]">
                <span className="material-symbols-outlined text-base">partner_exchange</span>
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs text-[#26170c] leading-tight truncate">
                  Seguimiento de Adopción
                </p>
                <p className="text-[11px] text-[#4f453f] leading-none mt-0.5">
                  Actualizaciones directas en tiempo real
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg flex items-center gap-3 transition-colors hover:bg-white border border-[#ebe8e2]">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-[#ba1a1a]">
                <span className="material-symbols-outlined text-base">share_location</span>
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs text-[#26170c] leading-tight truncate">
                  Alertas SOS Geolocalizadas
                </p>
                <p className="text-[11px] text-[#4f453f] leading-none mt-0.5">
                  Red inmediata en caso de extravío
                </p>
              </div>
            </div>
          </div>

          {/* Trust Anchor Footer */}
          <div className="relative z-10 pt-3 flex items-center justify-between text-[#81756e] border-t border-[#e5e2dc] mt-2">
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="material-symbols-outlined text-sm text-[#83532b]">verified_user</span>
              <span>Cifrado SSL 256-bit</span>
            </div>
            <span className="text-[11px] font-medium">Certificado VetCare</span>
          </div>
        </div>

        {/* Right Column: Authentication Hub & Interactive Form (7 Cols) */}
        <div className="lg:col-span-7 p-6 lg:p-10 flex flex-col justify-between">
          <div>
            {/* Role Selector Tabs */}
            <div className="w-full bg-[#f6f3ed] p-1 rounded-xl flex items-center mb-6 border border-[#e8dfd3]">
              <button
                type="button"
                onClick={() => setRole('tutor')}
                className={`flex-1 py-2 px-3 rounded-lg text-center text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  role === 'tutor'
                    ? 'bg-white text-[#26170c] shadow-xs border border-[#e8dfd3]'
                    : 'text-[#81756e] hover:text-[#26170c]'
                }`}
              >
                <span className="material-symbols-outlined text-base text-[#83532b]">cruelty_free</span>
                <span>Tutor / Adoptante</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('vet')}
                className={`flex-1 py-2 px-3 rounded-lg text-center text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  role === 'vet'
                    ? 'bg-white text-[#26170c] shadow-xs border border-[#e8dfd3]'
                    : 'text-[#81756e] hover:text-[#26170c]'
                }`}
              >
                <span className="material-symbols-outlined text-base text-[#83532b]">local_hospital</span>
                <span>Veterinario / Clínica</span>
              </button>
            </div>

            {/* Greeting & Description */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#26170c] tracking-tight">
                  {isRegisterMode ? 'Crea tu cuenta' : '¡Hola de nuevo!'}
                </h1>
                <span className="text-xl">🐾</span>
              </div>
              <p className="text-xs sm:text-sm text-[#4f453f] leading-relaxed">
                {role === 'tutor'
                  ? isRegisterMode
                    ? 'Únete como tutor verificado para postular a adopciones y activar alertas de extravío.'
                    : 'Inicia sesión para gestionar tus adopciones, reportes clínicos o próximas citas veterinarias.'
                  : isRegisterMode
                  ? 'Registra tu clínica o credencial profesional ante la red nacional de salud animal.'
                  : 'Acceso a expediente clínico digital, recetario médico y gestión de cirugías programadas.'}
              </p>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              {isRegisterMode && (
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-[#4f453f]">Nombre Completo</label>
                  <div className="relative flex items-center bg-[#f6f3ed] rounded-lg border border-[#e8dfd3] focus-within:bg-white focus-within:border-[#83532b]">
                    <span className="material-symbols-outlined absolute left-3 text-[#81756e] text-[18px]">badge</span>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Sofía Castro"
                      className="w-full pl-10 pr-4 py-2.5 bg-transparent rounded-lg text-xs text-[#1c1c18] outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#4f453f]">Correo Electrónico</label>
                <div className="relative flex items-center bg-[#f6f3ed] rounded-lg border border-[#e8dfd3] focus-within:bg-white focus-within:border-[#83532b]">
                  <span className="material-symbols-outlined absolute left-3 text-[#81756e] text-[18px]">mail</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={role === 'tutor' ? 'ejemplo@tutor.com' : 'clinica@colegiovet.org'}
                    className="w-full pl-10 pr-4 py-2.5 bg-transparent rounded-lg text-xs text-[#1c1c18] outline-none"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-[#4f453f]">Contraseña</label>
                <div className="relative flex items-center bg-[#f6f3ed] rounded-lg border border-[#e8dfd3] focus-within:bg-white focus-within:border-[#83532b]">
                  <span className="material-symbols-outlined absolute left-3 text-[#81756e] text-[18px]">lock</span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-transparent rounded-lg text-xs text-[#1c1c18] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-[#81756e] hover:text-[#26170c]"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Utility Row */}
              {!isRegisterMode && (
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-[#3d2b1f] accent-[#3d2b1f] cursor-pointer"
                    />
                    <span className="text-xs text-[#4f453f]">Recordarme en este equipo</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs text-[#83532b] hover:text-[#26170c] transition-colors underline-offset-2 hover:underline cursor-pointer"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              )}

              {/* Primary Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3 px-5 rounded-lg bg-[#3d2b1f] hover:bg-[#26170c] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
              >
                <span>
                  {loading
                    ? 'Comprobando credenciales...'
                    : isRegisterMode
                    ? 'Crear Cuenta Verificada'
                    : role === 'tutor'
                    ? 'Iniciar Sesión'
                    : 'Acceder al Portal Médico'}
                </span>
                {!loading && (
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                )}
              </button>
            </form>
          </div>

          {/* Bottom Segment: Registration Card & Medical Privacy Footnote */}
          <div className="mt-4 pt-3 flex flex-col gap-2">
            <div className="bg-[#f6f3ed] p-3 rounded-xl flex items-center justify-between border border-[#e8dfd3]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#83532b] text-lg">badge</span>
                <p className="text-xs text-[#1c1c18]">
                  {isRegisterMode ? '¿Ya tienes una cuenta?' : '¿Aún no tienes cuenta en'} <span className="font-semibold text-[#26170c]">Hashiko</span>?
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="px-3 py-1.5 rounded-lg bg-white text-xs font-bold text-[#83532b] hover:text-[#26170c] transition-colors shadow-xs border border-[#e8dfd3] cursor-pointer"
              >
                {isRegisterMode ? 'Iniciar Sesión' : 'Crea tu cuenta gratis'}
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-center px-2 py-1">
              <span className="material-symbols-outlined text-xs text-[#81756e]">encrypted</span>
              <p className="text-[11px] text-[#81756e]">
                Tus historiales médicos y datos de adopción están protegidos conforme a normativas de confidencialidad veterinaria.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
