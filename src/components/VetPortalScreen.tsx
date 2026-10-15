import React, { useState } from 'react';
import { Appointment, PatientVitals, ScreenView } from '../types';

interface VetPortalScreenProps {
  appointments: Appointment[];
  activePatient: PatientVitals;
  onNavigate: (view: ScreenView) => void;
  onOpenNewAppointmentModal: () => void;
  onOpenClinicalHistory: (patient: PatientVitals) => void;
  onOpenPrescription: (patient: PatientVitals) => void;
  onUpdateAppointmentStatus: (id: string, status: Appointment['status']) => void;
}

export const VetPortalScreen: React.FC<VetPortalScreenProps> = ({
  appointments,
  activePatient,
  onNavigate,
  onOpenNewAppointmentModal,
  onOpenClinicalHistory,
  onOpenPrescription,
  onUpdateAppointmentStatus
}) => {
  const [activeTab, setActiveTab] = useState<'todas' | 'en_sala' | 'pendientes' | 'completadas'>('todas');
  const [selectedBox, setSelectedBox] = useState('Box Quirúrgico 1 • Sede Central');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSideNav, setActiveSideNav] = useState('citas');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [inConsultation, setInConsultation] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const filteredAppointments = appointments.filter((apt) => {
    // Search filter
    if (searchTerm.trim() !== '') {
      const match =
        apt.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.reason.toLowerCase().includes(searchTerm.toLowerCase());
      if (!match) return false;
    }

    // Status filter
    if (activeTab === 'en_sala') return apt.status === 'en_sala';
    if (activeTab === 'pendientes') return apt.status === 'proxima' || apt.status === 'pendiente';
    if (activeTab === 'completadas') return apt.status === 'completada';
    return true;
  });

  const totalCount = appointments.length;
  const inLoungeCount = appointments.filter((a) => a.status === 'en_sala').length;
  const pendingCount = appointments.filter((a) => a.status === 'proxima' || a.status === 'pendiente').length;
  const completedCount = appointments.filter((a) => a.status === 'completada').length;

  return (
    <div className="bg-[#f6f3ed] min-h-screen text-[#1c1c18] flex flex-col xl:flex-row relative">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 p-4 bg-[#26170c] text-white rounded-xl shadow-2xl border border-[#ffdcc3] flex items-center gap-3 animate-fadeIn">
          <span className="material-symbols-outlined text-[#ffdcc3]">info</span>
          <span className="text-xs font-semibold">{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="ml-2 text-white/70 hover:text-white">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* LEFT SIDEBAR (Desktop 72 width) */}
      <aside className="w-full xl:w-72 bg-white border-r border-[#e8dfd3] shadow-[0_1px_16px_rgba(61,43,31,0.06)] flex flex-col justify-between p-6 shrink-0">
        <div className="flex flex-col gap-6">
          {/* Logo & Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#f0eee8]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#3d2b1f] flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[24px]">medical_services</span>
              </div>
              <div>
                <span className="font-bold text-base text-[#26170c] leading-tight block">
                  Clínica Hashiko
                </span>
                <span className="text-xs text-[#83532b] font-semibold">Panel Profesional</span>
              </div>
            </div>
          </div>

          {/* Section: GESTIÓN CLÍNICA */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-[#81756e] font-bold uppercase tracking-wider px-3 mb-1">
              Gestión Clínica
            </span>
            <nav className="flex flex-col gap-1">
              <button
                onClick={() => setActiveSideNav('citas')}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-xs font-semibold cursor-pointer ${
                  activeSideNav === 'citas'
                    ? 'bg-[#3d2b1f] text-white shadow-[0_2px_8px_rgba(61,43,31,0.08)]'
                    : 'text-[#4f453f] hover:bg-[#f0eee8] hover:text-[#1c1c18]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                <span>Citas y Consultas</span>
              </button>

              <button
                onClick={() => {
                  setActiveSideNav('expedientes');
                  onOpenClinicalHistory(activePatient);
                }}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-xs font-semibold cursor-pointer ${
                  activeSideNav === 'expedientes'
                    ? 'bg-[#3d2b1f] text-white shadow-[0_2px_8px_rgba(61,43,31,0.08)]'
                    : 'text-[#4f453f] hover:bg-[#f0eee8] hover:text-[#1c1c18]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">pets</span>
                <span>Expedientes y Altas</span>
              </button>

              <button
                onClick={() => {
                  setActiveSideNav('triaje');
                  showToast('Triaje SOS: Red de emergencias en calma. 0 ingresos críticos.');
                }}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-xs font-semibold cursor-pointer ${
                  activeSideNav === 'triaje'
                    ? 'bg-[#3d2b1f] text-white'
                    : 'text-[#4f453f] hover:bg-[#f0eee8] hover:text-[#1c1c18]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">emergency</span>
                <span>Triaje & Alertas SOS</span>
              </button>

              <button
                onClick={() => {
                  setActiveSideNav('farmacia');
                  onOpenPrescription(activePatient);
                }}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all text-xs font-semibold cursor-pointer ${
                  activeSideNav === 'farmacia'
                    ? 'bg-[#3d2b1f] text-white'
                    : 'text-[#4f453f] hover:bg-[#f0eee8] hover:text-[#1c1c18]'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">medication</span>
                <span>Farmacia e Insumos</span>
              </button>
            </nav>
          </div>

          {/* Section: COMUNIDAD */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-[#81756e] font-bold uppercase tracking-wider px-3 mb-1">
              Comunidad
            </span>
            <nav className="flex flex-col gap-1">
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold text-[#4f453f] hover:bg-[#f0eee8] hover:text-[#1c1c18] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">home</span>
                <span>Portal Principal</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Doctor profile bottom badge */}
        <div className="pt-4 border-t border-[#f0eee8] flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#ffdcc3] flex items-center justify-center text-[#2f1500] font-bold text-xs ring-2 ring-white">
            Dr
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-bold text-xs text-[#1c1c18] truncate">Dra. Karina García</span>
            <span className="text-[11px] text-[#81756e] truncate">Cirugía & Triaje SOS</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white/90 backdrop-blur-md border-b border-[#e8dfd3] shadow-[0_1px_8px_rgba(61,43,31,0.04)] z-30 flex items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-4 w-72 sm:w-96 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#81756e] text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por chip, tutor o paciente..."
              className="w-full bg-[#f6f3ed] pl-10 pr-4 py-2 rounded-lg text-xs text-[#1c1c18] placeholder:text-[#81756e] focus:outline-none focus:bg-white shadow-[0_0_0_1px_rgba(232,223,211,0.6)] focus:shadow-[0_0_0_2px_#c28a64] transition-all"
            />
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffdcc3]/50 text-[#2f1500] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#83532b]"></span>
              <span>Turno: Guardia Matutina</span>
            </div>

            <button
              onClick={() => showToast('Sin alertas críticas de urgencia en los últimos 30 min.')}
              aria-label="Alertas Clínicas"
              className="w-10 h-10 rounded-lg flex items-center justify-center text-[#4f453f] hover:bg-[#f0eee8] hover:text-[#1c1c18] transition-colors relative cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            </button>

            <button
              onClick={() => onNavigate('home')}
              title="Volver a página pública"
              className="w-8 h-8 rounded-full bg-[#26170c] flex items-center justify-center text-white hover:bg-[#3d2b1f] transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <main className="p-6 lg:p-10 flex flex-col gap-6 w-full max-w-[1440px] mx-auto">
          {/* CABECERA RESUMEN MÉDICO & CONTROL DE TURNO */}
          <section className="w-full bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(61,43,31,0.05)] border border-[#e8dfd3] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  className="w-16 h-16 rounded-full object-cover shadow-[0_2px_8px_rgba(61,43,31,0.12)] border-2 border-white"
                  alt="Dra. Karina García"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDGmyYvgDasP8z_r2KYwKyiA0JbZagni6-3nfov9hApe4rMSjAoI9qngsNX83tR0BdcOxf8EQDcf0bKrbNqiOlZa0BURYUfHgcq0I3dXMjc--m3Csu8zeT5MzqcVPeHVIu__NufE9KU7BBgoqALvK7Snme9puYSyQxEmnLWLh-GZJiBubTOqw8fNAI_IMuHym0ptkR83x4N63I_PxOdp-9nAcoLlO3de-PhnBnZuIYQX67w4kuszMH"
                />
                <span
                  className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-600 ring-2 ring-white"
                  title="Activa en sistema"
                ></span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#26170c]">
                    Dra. Karina García
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ffdcc3] text-[#2f1500] text-xs font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#83532b] animate-pulse"></span>
                    En consulta activa
                  </span>
                </div>
                <p className="text-xs text-[#4f453f] flex items-center gap-2 mt-0.5 flex-wrap">
                  <span>Médica Veterinaria Cirujana • Colegiado MPV #4829</span>
                  <span className="text-[#d2c4bc]">•</span>
                  <span className="flex items-center gap-1 text-[#1c1c18]">
                    <span className="material-symbols-outlined text-[16px] text-[#83532b]">today</span>
                    Jueves, 24 de Octubre
                  </span>
                </p>
              </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2 bg-[#f6f3ed] px-3 py-2 rounded-lg text-[#1c1c18] border border-[#e8dfd3]">
                <span className="material-symbols-outlined text-[#83532b] text-[20px]">location_on</span>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#81756e] leading-none">Box & Sucursal</span>
                  <span className="text-xs font-bold text-[#26170c] leading-tight">
                    {selectedBox}
                  </span>
                </div>
              </div>

              <button
                onClick={onOpenNewAppointmentModal}
                className="flex items-center gap-2 bg-[#3d2b1f] hover:bg-[#26170c] text-white px-4 py-2.5 rounded-lg text-xs font-bold shadow-[0_2px_8px_rgba(61,43,31,0.15)] transition-all cursor-pointer active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>+ Nueva Cita</span>
              </button>

              <button
                onClick={() => showToast('Agenda sincronizada con servidor central.')}
                className="w-10 h-10 rounded-lg bg-[#f0eee8] flex items-center justify-center text-[#4f453f] hover:text-[#26170c] hover:bg-[#ebe8e2] transition-colors cursor-pointer"
                title="Sincronizar agenda"
              >
                <span className="material-symbols-outlined text-[20px]">sync</span>
              </button>
            </div>
          </section>

          {/* FILA BENTO KPI CARDS (4 COLUMNAS) */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
            {/* Card 1: Citas de Hoy */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(61,43,31,0.04)] border border-[#e8dfd3] flex flex-col justify-between hover:shadow-[0_8px_20px_rgba(61,43,31,0.08)] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#81756e] font-bold uppercase tracking-wider">Citas de Hoy</span>
                <span className="w-8 h-8 rounded-lg bg-[#f6f3ed] text-[#83532b] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">event_note</span>
                </span>
              </div>
              <div className="my-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-[#26170c] leading-none">{totalCount}</span>
                  <span className="text-xs text-[#4f453f] font-medium">programadas</span>
                </div>
                {/* Progress bar dual */}
                <div className="w-full h-2 rounded-full bg-[#f0eee8] mt-3 overflow-hidden flex">
                  <div className="bg-[#26170c] h-full" style={{ width: `${(completedCount / totalCount) * 100}%` }}></div>
                  <div className="bg-[#ffbf8e] h-full" style={{ width: `${(inLoungeCount / totalCount) * 100}%` }}></div>
                  <div className="bg-[#ebe8e2] h-full" style={{ width: `${(pendingCount / totalCount) * 100}%` }}></div>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-2 text-[#4f453f] border-t border-[#f0eee8]">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#26170c]"></span> {completedCount} Finalizadas
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#ffbf8e]"></span> {inLoungeCount} En espera
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#ebe8e2]"></span> {pendingCount} Pendientes
                </span>
              </div>
            </div>

            {/* Card 2: En Sala de Espera */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(61,43,31,0.04)] border border-[#e8dfd3] flex flex-col justify-between hover:shadow-[0_8px_20px_rgba(61,43,31,0.08)] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#81756e] font-bold uppercase tracking-wider">En Sala de Espera</span>
                <span className="w-8 h-8 rounded-lg bg-[#ffdcc3]/60 text-[#83532b] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">meeting_room</span>
                </span>
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-[#26170c] leading-none">{inLoungeCount}</span>
                  <span className="text-xs text-[#83532b] font-bold">paciente listo</span>
                </div>
                <div className="mt-2 p-2 bg-[#f6f3ed] rounded-lg flex items-center gap-2 border border-[#ebe8e2]">
                  <span className="w-2 h-2 rounded-full bg-[#83532b] animate-ping"></span>
                  <p className="text-xs text-[#1c1c18] truncate">
                    <strong className="text-[#26170c] font-bold">Luna</strong> (Gata Siamés) • Box 1
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#4f453f] pt-2 border-t border-[#f0eee8]">
                <span>Tiempo de espera: 8 min</span>
                <span className="text-[#83532b] font-bold">Ingreso 10:07 AM</span>
              </div>
            </div>

            {/* Card 3: Urgencias & Triage */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(61,43,31,0.04)] border border-[#e8dfd3] flex flex-col justify-between hover:shadow-[0_8px_20px_rgba(61,43,31,0.08)] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#81756e] font-bold uppercase tracking-wider">Urgencias / Triage</span>
                <span className="w-8 h-8 rounded-lg bg-[#f6f3ed] text-[#4f453f] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">monitor_heart</span>
                </span>
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-[#26170c] leading-none">0</span>
                  <span className="text-xs text-[#4f453f]">casos críticos</span>
                </div>
                <p className="text-xs text-[#4f453f] mt-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#83532b] text-[18px]">verified_user</span>
                  Capacidad de quirófano al 100% disponible
                </p>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#4f453f] pt-2 border-t border-[#f0eee8]">
                <span>Red SOS Alertas: Calma</span>
                <span className="text-[#26170c] font-semibold">Box Reanimación Libre</span>
              </div>
            </div>

            {/* Card 4: Facturación / Ingresos del Día */}
            <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(61,43,31,0.04)] border border-[#e8dfd3] flex flex-col justify-between hover:shadow-[0_8px_20px_rgba(61,43,31,0.08)] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#81756e] font-bold uppercase tracking-wider">Consultas Facturadas</span>
                <span className="w-8 h-8 rounded-lg bg-[#f6f3ed] text-[#26170c] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">payments</span>
                </span>
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#26170c] leading-tight">$185.000</span>
                  <span className="text-[11px] text-[#81756e] font-bold">CLP</span>
                </div>
                <div className="flex items-center gap-1 text-[#83532b] text-xs mt-1">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  <span>2 consultas liquidadas + farmacia</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#4f453f] pt-2 border-t border-[#f0eee8]">
                <span>Meta proyectada diaria</span>
                <span className="text-[#26170c] font-bold">62% alcanzado</span>
              </div>
            </div>
          </section>

          {/* ÁREA PRINCIPAL DOS COLUMNAS (AGENDA / FICHA EXPRESS) */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full items-start">
            {/* COLUMNA IZQUIERDA: AGENDA CRONOLÓGICA (8 COLS) */}
            <div className="lg:col-span-8 flex flex-col gap-4 w-full">
              {/* Filtros y Título */}
              <div className="bg-white rounded-2xl p-4 shadow-[0_2px_8px_rgba(61,43,31,0.04)] border border-[#e8dfd3] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#83532b] text-[24px]">schedule</span>
                  <div>
                    <h2 className="text-base font-bold text-[#26170c]">Agenda Quirúrgica y Consultas</h2>
                    <p className="text-xs text-[#4f453f]">Turno de mañana y tarde con asignación directa</p>
                  </div>
                </div>

                {/* Filtros Píldora */}
                <div className="flex items-center bg-[#f6f3ed] p-1 rounded-xl gap-1 border border-[#e8dfd3]">
                  <button
                    onClick={() => setActiveTab('todas')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'todas' ? 'bg-[#26170c] text-white shadow-xs' : 'text-[#4f453f] hover:text-[#26170c]'
                    }`}
                  >
                    Todas ({totalCount})
                  </button>
                  <button
                    onClick={() => setActiveTab('en_sala')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'en_sala' ? 'bg-[#26170c] text-white shadow-xs' : 'text-[#4f453f] hover:text-[#26170c]'
                    }`}
                  >
                    En espera ({inLoungeCount})
                  </button>
                  <button
                    onClick={() => setActiveTab('pendientes')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'pendientes' ? 'bg-[#26170c] text-white shadow-xs' : 'text-[#4f453f] hover:text-[#26170c]'
                    }`}
                  >
                    Pendientes ({pendingCount})
                  </button>
                  <button
                    onClick={() => setActiveTab('completadas')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'completadas' ? 'bg-[#26170c] text-white shadow-xs' : 'text-[#4f453f] hover:text-[#26170c]'
                    }`}
                  >
                    Completadas ({completedCount})
                  </button>
                </div>
              </div>

              {/* LISTA DE CITAS */}
              <div className="flex flex-col gap-3">
                {filteredAppointments.length === 0 ? (
                  <div className="bg-white p-8 rounded-2xl border border-[#e8dfd3] text-center text-xs text-[#81756e]">
                    No hay citas que coincidan con este filtro.
                  </div>
                ) : (
                  filteredAppointments.map((apt) => {
                    const isLuna = apt.id === 'apt-1';
                    const isMilo = apt.id === 'apt-2';
                    const isRocky = apt.id === 'apt-3';

                    if (isLuna) {
                      return (
                        <article
                          key={apt.id}
                          className="bg-white rounded-2xl p-5 shadow-[0_3px_12px_rgba(131,83,43,0.12)] border border-[#ffdcc3] relative overflow-hidden transition-all hover:shadow-[0_6px_20px_rgba(131,83,43,0.16)]"
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#83532b]"></div>
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className="relative shrink-0">
                                <img
                                  className="w-16 h-16 rounded-xl object-cover shadow-[0_2px_6px_rgba(61,43,31,0.1)]"
                                  alt="Luna"
                                  src={apt.image}
                                />
                                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#ffdcc3] text-[#2f1500] text-[10px] font-bold">
                                  {apt.box}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="px-2.5 py-0.5 rounded-full bg-[#ffdcc3] text-[#2f1500] text-xs font-bold flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#83532b] animate-pulse"></span>
                                    {apt.statusLabel}
                                  </span>
                                  <span className="font-bold text-lg text-[#26170c]">{apt.petName}</span>
                                  <span className="text-xs text-[#4f453f]">
                                    {apt.species} ({apt.age})
                                  </span>
                                </div>
                                <div className="mt-1 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#1c1c18]">
                                  <span className="flex items-center gap-1 text-[#4f453f]">
                                    <span className="material-symbols-outlined text-[16px]">person</span>
                                    {apt.ownerName}
                                  </span>
                                  <span className="text-[#d2c4bc]">•</span>
                                  <span className="flex items-center gap-1 font-semibold text-[#83532b]">
                                    <span className="material-symbols-outlined text-[16px]">stethoscope</span>
                                    {apt.reason}
                                  </span>
                                </div>
                                {apt.notes && (
                                  <p className="text-xs text-[#4f453f] mt-2 bg-[#f6f3ed] p-2.5 rounded-lg border border-[#ebe8e2]">
                                    <strong className="text-[#26170c]">Nota de ingreso:</strong> {apt.notes}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="flex md:flex-col items-end justify-center gap-2 shrink-0">
                              <button
                                onClick={() => {
                                  setInConsultation(!inConsultation);
                                  showToast(
                                    inConsultation
                                      ? 'Consulta de Luna finalizada y guardada.'
                                      : 'Llamando a Luna y Sofía Castro a Box 1...'
                                  );
                                }}
                                className="w-full md:w-auto px-4 py-2.5 rounded-lg bg-[#26170c] hover:bg-[#3d2b1f] text-white text-xs font-bold shadow-[0_2px_6px_rgba(61,43,31,0.2)] flex items-center justify-center gap-2 transition-all cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[18px]">
                                  {inConsultation ? 'task_alt' : 'notifications_active'}
                                </span>
                                <span>{inConsultation ? 'Finalizar Consulta' : 'Llamar a Consulta'}</span>
                              </button>
                              <button
                                onClick={() => onOpenClinicalHistory(activePatient)}
                                className="w-full md:w-auto px-3 py-1.5 rounded-lg text-xs font-semibold text-[#83532b] hover:bg-[#ffdcc3]/30 flex items-center justify-center gap-1 transition-all cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[16px]">folder_shared</span>
                                <span>Ver Pre-Anamnesis</span>
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    }

                    if (isMilo) {
                      return (
                        <article
                          key={apt.id}
                          className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(61,43,31,0.03)] border border-[#e8dfd3] opacity-90 hover:opacity-100 transition-all"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="relative shrink-0">
                                <img
                                  className="w-14 h-14 rounded-xl object-cover grayscale-[20%]"
                                  alt="Milo"
                                  src={apt.image}
                                />
                                <span className="material-symbols-outlined absolute -bottom-1 -right-1 text-[18px] text-[#83532b] bg-white rounded-full">
                                  check_circle
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="px-2 py-0.5 rounded-full bg-[#f0eee8] text-[#4f453f] text-xs font-medium">
                                    {apt.statusLabel}
                                  </span>
                                  <span className="font-bold text-base text-[#26170c]">{apt.petName}</span>
                                  <span className="text-xs text-[#4f453f]">{apt.species} ({apt.age})</span>
                                </div>
                                <div className="mt-0.5 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#4f453f]">
                                  <span>Tutor: {apt.ownerName}</span>
                                  <span>•</span>
                                  <span>{apt.reason}</span>
                                </div>
                                <span className="text-xs text-[#81756e] mt-1">
                                  {apt.completedSummary}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => showToast('Receta Séxtuple + Rabia enviada al tutor.')}
                                className="px-3 py-1.5 rounded-lg bg-[#f6f3ed] hover:bg-[#ebe8e2] text-[#26170c] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#e8dfd3]"
                              >
                                <span className="material-symbols-outlined text-[16px] text-[#83532b]">description</span>
                                <span>Ver Receta</span>
                              </button>
                              <button
                                onClick={() => showToast('Liquidación de Milo: $45.000 CLP pagada.')}
                                className="p-2 rounded-lg text-[#4f453f] hover:text-[#26170c] hover:bg-[#f0eee8] transition-colors cursor-pointer"
                                title="Detalle facturación"
                              >
                                <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    }

                    if (isRocky) {
                      return (
                        <article
                          key={apt.id}
                          className="bg-white rounded-2xl p-4 shadow-[0_1px_4px_rgba(61,43,31,0.03)] border border-[#e8dfd3] hover:shadow-[0_4px_12px_rgba(61,43,31,0.06)] transition-all"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="relative shrink-0">
                                <img
                                  className="w-14 h-14 rounded-xl object-cover"
                                  alt="Rocky"
                                  src={apt.image}
                                />
                                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full bg-[#ebe8e2] text-[#1c1c18] text-[10px] font-bold">
                                  {apt.box}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="px-2 py-0.5 rounded-full bg-[#f0eee8] text-[#1c1c18] text-xs font-medium">
                                    {apt.statusLabel}
                                  </span>
                                  <span className="font-bold text-base text-[#26170c]">{apt.petName}</span>
                                  <span className="text-xs text-[#4f453f]">{apt.species} ({apt.age})</span>
                                </div>
                                <div className="mt-0.5 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#4f453f]">
                                  <span>Tutora: {apt.ownerName}</span>
                                  <span>•</span>
                                  <span className="text-[#83532b] font-semibold">{apt.reason}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="px-2 py-0.5 rounded bg-[#f6f3ed] text-[#4f453f] text-[10px] flex items-center gap-1 border border-[#ebe8e2]">
                                    <span className="material-symbols-outlined text-[13px]">attach_file</span>
                                    Ficha citológica previa adjunta
                                  </span>
                                  <span className="px-2 py-0.5 rounded bg-[#ffdcc3]/60 text-[#2f1500] text-[10px] font-bold">
                                    Control alérgico
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => showToast('SMS de cortesía enviado a Andrea: Demora estimada de 15 minutos.')}
                                className="px-3 py-1.5 rounded-lg bg-[#f0eee8] text-[#26170c] hover:bg-[#ebe8e2] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                              >
                                <span className="material-symbols-outlined text-[16px]">contact_phone</span>
                                <span>Notificar Demora</span>
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    }

                    // Afternoon general cards
                    return (
                      <article
                        key={apt.id}
                        className="bg-white rounded-xl p-3 border border-[#e8dfd3] flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={apt.image}
                            alt={apt.petName}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#83532b]">{apt.time}</span>
                              <span className="font-bold text-sm text-[#26170c]">{apt.petName}</span>
                              <span className="text-xs text-[#81756e]">({apt.species})</span>
                            </div>
                            <p className="text-xs text-[#4f453f]">{apt.reason} • {apt.ownerName}</p>
                          </div>
                        </div>
                        <span className="text-xs bg-[#f6f3ed] px-2.5 py-1 rounded-md text-[#26170c] font-semibold border border-[#ebe8e2]">
                          {apt.box}
                        </span>
                      </article>
                    );
                  })
                )}
              </div>

              {/* CITAS DE LA TARDE (MINIATURAS BENTO) */}
              <div className="bg-white rounded-2xl p-5 shadow-[0_1px_4px_rgba(61,43,31,0.03)] border border-[#e8dfd3] flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#81756e] font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#83532b]">wb_twilight</span>
                    Citas del Bloque de la Tarde
                  </span>
                  <span className="text-xs text-[#83532b] font-bold">2 Consultas Agendadas</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1">
                  {/* Cita Tarde 1: Simba */}
                  <div className="p-3 bg-[#f6f3ed] rounded-xl flex items-center justify-between hover:bg-[#f0eee8] transition-colors border border-[#ebe8e2]">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        className="w-11 h-11 rounded-lg object-cover shrink-0"
                        alt="Simba"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuApoJ3EPRmm2zr4sFw-XanRxB7y99JTnvdhvCCkjxzILNOzmOT7n9vORZhALihSxcf9HGj7HRu9H2o5OQOLKnGg_nVO2YnULmxQ85MRkHSYjd4EinRo-7PQp4uT8ZADZ7QPNNPA65lgMoIsCFJPf0CEtsgrxRo6geMv6wM2aty_XvgJY4_GsuLRYR-2e8zPZrOle9CVXI9bwws4vpaJHqMElWBDp9358BPEmLkFgTJj8Vd5bKB5Q5Bc"
                      />
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[#83532b]">02:00 PM</span>
                          <span className="font-bold text-sm text-[#26170c] truncate">Simba</span>
                        </div>
                        <span className="text-xs text-[#4f453f] truncate">Gato Común • Control Renal</span>
                      </div>
                    </div>
                    <span className="text-xs text-[#4f453f] bg-white px-2 py-1 rounded border border-[#e8dfd3]">
                      Box 1
                    </span>
                  </div>

                  {/* Cita Tarde 2: Canela */}
                  <div className="p-3 bg-[#f6f3ed] rounded-xl flex items-center justify-between hover:bg-[#f0eee8] transition-colors border border-[#ebe8e2]">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        className="w-11 h-11 rounded-lg object-cover shrink-0"
                        alt="Canela"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7c2BFpi9ihrQGj8mPVyZjY8jbo1a9bCfN0bfTfyfqDwyFyhC2ucQUzP12ugH-GUyuORwPzFYoO2-UzRCm-7Mu2Pn5OpVOW5C7SWGImBblwQ9LfLDwfQLy8htwp1C3kYgWNK2oedss_m5AEF6aAgcmIgUHTbMWroLzgZBNKrZB1aHvGiOUT6gbaEApJHVQY95el-_RWRgFVocRBRpsQoHlfejHrVuHcP1WUBhjzW_YsVEOoEtqvmDX"
                      />
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[#83532b]">03:30 PM</span>
                          <span className="font-bold text-sm text-[#26170c] truncate">Canela</span>
                        </div>
                        <span className="text-xs text-[#4f453f] truncate">Cocker Spaniel • Limpieza dental</span>
                      </div>
                    </div>
                    <span className="text-xs text-[#4f453f] bg-white px-2 py-1 rounded border border-[#e8dfd3]">
                      Box Qx
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMNA DERECHA: FICHA CLÍNICA EXPRESS (4 COLS) */}
            <aside className="lg:col-span-4 flex flex-col gap-4 w-full">
              <div className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(61,43,31,0.06)] border border-[#e8dfd3] flex flex-col gap-4">
                {/* Header Paciente Activo */}
                <div className="flex items-center justify-between pb-3 border-b border-[#f0eee8]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#83532b] text-[22px]">pets</span>
                    <span className="font-bold text-base text-[#26170c]">Paciente Activo en Sala</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ffdcc3] text-[#2f1500] text-[11px] font-bold">
                    Turno Actual
                  </span>
                </div>

                {/* Perfil Breve */}
                <div className="flex items-center gap-3">
                  <img
                    className="w-16 h-16 rounded-xl object-cover shadow-[0_2px_8px_rgba(61,43,31,0.08)] border border-[#e8dfd3]"
                    alt={activePatient.petName}
                    src={activePatient.image}
                  />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-[#26170c] leading-tight">
                      {activePatient.petName}
                    </h3>
                    <span className="text-xs text-[#4f453f]">
                      {activePatient.species} • {activePatient.gender} ({activePatient.sterilized ? 'Esterilizada' : 'Entera'})
                    </span>
                    <span className="text-[11px] text-[#83532b] font-mono mt-0.5">
                      Chip: {activePatient.microchip}
                    </span>
                  </div>
                </div>

                {/* Bento Tiles de Constantes Vitales */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-[#f6f3ed] p-2.5 rounded-xl border border-[#ebe8e2] flex flex-col items-center">
                    <span className="text-[11px] text-[#81756e]">Peso Actual</span>
                    <span className="font-bold text-base text-[#26170c] mt-0.5">
                      {activePatient.currentWeight}
                    </span>
                    <span className="text-[10px] text-[#83532b] font-medium leading-none">
                      {activePatient.weightDelta}
                    </span>
                  </div>

                  <div className="bg-[#f6f3ed] p-2.5 rounded-xl border border-[#ebe8e2] flex flex-col items-center">
                    <span className="text-[11px] text-[#81756e]">Vacunación</span>
                    <span className="font-bold text-sm text-green-700 mt-0.5">
                      {activePatient.vaccineStatus}
                    </span>
                    <span className="text-[10px] text-[#81756e] truncate max-w-full">
                      {activePatient.vaccineNote}
                    </span>
                  </div>

                  <div className="bg-[#f6f3ed] p-2.5 rounded-xl border border-[#ebe8e2] flex flex-col items-center">
                    <span className="text-[11px] text-[#81756e]">Desparasit.</span>
                    <span className="font-bold text-sm text-[#26170c] mt-0.5">
                      {activePatient.dewormingStatus}
                    </span>
                    <span className="text-[10px] text-[#81756e] truncate max-w-full">
                      {activePatient.dewormingNote}
                    </span>
                  </div>
                </div>

                {/* ALERTAS CLÍNICAS & CUIDADOS CRÍTICOS */}
                <div className="bg-[#f6f3ed] rounded-xl p-3 border border-[#ffdcc3] flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-[#83532b]">
                    <span className="material-symbols-outlined text-[18px]">warning</span>
                    <span className="text-xs font-bold">Alertas y Cuidados Especiales</span>
                  </div>
                  <ul className="flex flex-col gap-1.5 pl-1">
                    <li className="text-xs text-[#1c1c18] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#83532b] mt-1.5 shrink-0"></span>
                      <span>
                        <strong>Sensibilidad a AINEs:</strong> Usar Meloxicam felino con dosificación estricta por peso.
                      </span>
                    </li>
                    <li className="text-xs text-[#1c1c18] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#83532b] mt-1.5 shrink-0"></span>
                      <span>
                        <strong>Herida quirúrgica:</strong> Inspeccionar línea de incisión alba. Test de palpación sin dolor reactivo.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* GRÁFICO HISTÓRICO DE PESO (INLINE SVG SPARKLINE) */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs text-[#4f453f]">
                    <span>Evolución de Peso (Últimos 4 controles)</span>
                    <span className="text-[#26170c] font-bold">Estable</span>
                  </div>
                  <div className="w-full bg-[#f6f3ed] p-2.5 rounded-xl border border-[#ebe8e2] flex items-center justify-center">
                    <svg className="w-full h-12 text-[#83532b]" fill="none" viewBox="0 0 200 48" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M 10 38 Q 40 35, 70 32 T 130 20 T 190 14"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                      />
                      <circle cx="10" cy="38" r="3" fill="#ffffff" stroke="currentColor" strokeWidth="2" />
                      <circle cx="70" cy="32" r="3" fill="#ffffff" stroke="currentColor" strokeWidth="2" />
                      <circle cx="130" cy="20" r="3" fill="#ffffff" stroke="currentColor" strokeWidth="2" />
                      <circle cx="190" cy="14" r="4" fill="#83532b" stroke="#ffffff" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[10px] text-[#81756e] px-1 font-mono">
                    <span>May (3.4kg)</span>
                    <span>Jul (3.6kg)</span>
                    <span>Sep (3.7kg)</span>
                    <span className="font-bold text-[#26170c]">Hoy (3.8kg)</span>
                  </div>
                </div>

                {/* DATOS DEL TUTOR */}
                <div className="bg-[#f6f3ed] p-3 rounded-xl border border-[#ebe8e2] flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#81756e]">Tutor Registrado</span>
                    <span className="font-bold text-xs text-[#26170c]">{activePatient.ownerName}</span>
                    <span className="text-xs text-[#4f453f]">{activePatient.ownerPhone}</span>
                  </div>
                  <button
                    onClick={() => showToast(`Iniciando chat seguro con ${activePatient.ownerName}...`)}
                    className="w-9 h-9 rounded-lg bg-white text-[#26170c] hover:bg-[#ffdcc3] flex items-center justify-center transition-colors border border-[#e8dfd3] cursor-pointer"
                    title="Contactar Tutor"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                  </button>
                </div>

                {/* ACCIONES CLÍNICAS DIRECTAS */}
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={() => onOpenClinicalHistory(activePatient)}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#26170c] hover:bg-[#3d2b1f] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_2px_8px_rgba(61,43,31,0.12)] transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">clinical_notes</span>
                    <span>Abrir Historial Clínico Completo</span>
                  </button>

                  <button
                    onClick={() => onOpenPrescription(activePatient)}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#f0eee8] hover:bg-[#ebe8e2] text-[#26170c] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#e8dfd3]"
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#83532b]">prescriptions</span>
                    <span>Emitir Receta Digital</span>
                  </button>

                  <button
                    onClick={() => showToast('Solicitud de derivación a Laboratorio Central emitida.')}
                    className="w-full py-2 px-4 rounded-lg text-[#83532b] hover:bg-[#ffdcc3]/30 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">forward_to_inbox</span>
                    <span>Derivar a Especialista / Laboratorio</span>
                  </button>
                </div>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
};
