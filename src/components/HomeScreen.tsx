import React, { useState } from 'react';
import { PetAdoptionCandidate, LostPetAlert, ShopProduct, ScreenView } from '../types';

interface HomeScreenProps {
  adoptionPets: PetAdoptionCandidate[];
  lostPet: LostPetAlert;
  products: ShopProduct[];
  onOpenAdoptionModal: (pet: PetAdoptionCandidate) => void;
  onOpenSosSightingModal: (pet: LostPetAlert) => void;
  onOpenNewSosModal: () => void;
  onAddToCart: (product: ShopProduct) => void;
  onNavigate: (view: ScreenView) => void;
  onOpenAuthModal: (context: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  adoptionPets,
  lostPet,
  products,
  onOpenAdoptionModal,
  onOpenSosSightingModal,
  onOpenNewSosModal,
  onAddToCart,
  onNavigate,
  onOpenAuthModal
}) => {
  const [tutorshipForm, setTutorshipForm] = useState({
    name: '',
    email: '',
    interest: 'Adoptar un perro o gato'
  });
  const [formSuccess, setFormSuccess] = useState(false);

  const handleTutorshipSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      onNavigate('auth');
    }, 1500);
  };

  const miloPet = adoptionPets.find((p) => p.id === 'milo') || adoptionPets[0];
  const canelaPet = adoptionPets.find((p) => p.id === 'canela') || adoptionPets[1];
  const brunoPet = adoptionPets.find((p) => p.id === 'bruno') || adoptionPets[2];

  return (
    <div className="flex flex-col w-full bg-[#f6f3ed] min-h-screen">
      {/* SECTION 1: Widescreen Hero Section */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 pt-6 pb-10">
        <div className="grid grid-cols-12 gap-6 items-stretch">
          {/* Main Content Block */}
          <div className="col-span-12 lg:col-span-8 flex flex-col justify-between bg-white p-6 sm:p-10 rounded-2xl shadow-[0_2px_12px_rgba(61,43,31,0.04)] border border-[#e8dfd3] relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#ffdcc3]/20 pointer-events-none blur-3xl"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0eee8] mb-6 text-[#794b24]">
                <span className="w-2 h-2 rounded-full bg-[#83532b] animate-pulse"></span>
                <span className="text-[11px] tracking-wide uppercase font-bold">
                  Red Nacional de Bienestar Animal Activa
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold text-[#26170c] tracking-tight max-w-2xl leading-[1.08] mb-5">
                Cuidamos, protegemos y encontramos un hogar para cada patita.
              </h1>
              <p className="text-base sm:text-lg text-[#4f453f] max-w-xl leading-relaxed mb-8">
                La plataforma centralizada que conecta familias amorosas con mascotas rescatadas, coordina brigadas de extravío en tiempo real y gestiona atención clínica certificada bajo estándares humanitarios.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-3 pt-4 border-t border-[#f0eee8]">
              <a
                href="#adopciones-bento"
                className="px-6 py-3 rounded-lg bg-[#26170c] text-white font-semibold text-sm hover:bg-[#3d2b1f] transition-all shadow-[0_4px_14px_rgba(38,23,12,0.22)] flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">favorite</span>
                Explorar Adopciones
              </a>

              <button
                onClick={() => onOpenSosSightingModal(lostPet)}
                className="px-6 py-3 rounded-lg bg-[#ffdcc3] text-[#2f1500] font-semibold text-sm hover:bg-[#f9b989] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] text-[#ba1a1a]">emergency_home</span>
                Reportar Extravío SOS
              </button>

              <a
                href="#tienda-bento"
                className="px-6 py-3 rounded-lg bg-[#f0eee8] hover:bg-[#ebe8e2] text-[#26170c] font-semibold text-sm transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">storefront</span>
                Tienda Solidaria
              </a>
            </div>
          </div>

          {/* Hero Visual & Floating Metrics Block */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            {/* Visual Hero Image Card */}
            <div
              onClick={() => onOpenAdoptionModal(brunoPet)}
              className="relative h-72 lg:h-80 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(61,43,31,0.04)] border border-[#e8dfd3] group cursor-pointer"
            >
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Bruno rescue dog"
                src={brunoPet.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#26170c]/85 via-[#26170c]/25 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <span className="text-xs text-[#fbddca] block font-medium">Rescate Semanal #492</span>
                  <span className="text-base sm:text-lg font-bold">Bruno • Esperando adopción</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                  Santuario Norte
                </span>
              </div>
            </div>

            {/* Floating Stat Tiles */}
            <div className="grid grid-cols-2 gap-3 flex-1">
              <div className="bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(61,43,31,0.03)] border border-[#e8dfd3] flex flex-col justify-between">
                <div className="w-10 h-10 rounded-lg bg-[#fbddca] flex items-center justify-center text-[#26170c] mb-2">
                  <span className="material-symbols-outlined text-[22px]">pets</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-[#26170c] block tracking-tight">
                    +1,240
                  </span>
                  <span className="text-xs text-[#4f453f] font-medium leading-tight block">
                    Adopciones exitosas y verificadas
                  </span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-[0_2px_8px_rgba(61,43,31,0.03)] border border-[#e8dfd3] flex flex-col justify-between">
                <div className="w-10 h-10 rounded-lg bg-[#ffdcc3] flex items-center justify-center text-[#83532b] mb-2">
                  <span className="material-symbols-outlined text-[22px]">radar</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-bold text-[#83532b] block tracking-tight">
                    98.2%
                  </span>
                  <span className="text-xs text-[#4f453f] font-medium leading-tight block">
                    Tasa de reencuentro en red SOS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Notice of Protection & Authentication Required */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-2">
        <div className="bg-gradient-to-r from-[#3d2b1f] via-[#26170c] to-[#3d2b1f] text-white rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 border border-[#574335]">
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
            <span className="material-symbols-outlined text-[200px]">security</span>
          </div>

          <div className="flex items-start gap-4 z-10 max-w-3xl">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 text-[#ffdcc3]">
              <span className="material-symbols-outlined text-[28px]">verified</span>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#83532b] text-white text-[11px] font-semibold mb-2">
                Aviso de Integridad & Seguridad de Hashiko
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white mb-1.5">
                Garantizamos adopciones transparentes y compras benéficas protegidas
              </h2>
              <p className="text-xs sm:text-sm text-[#fbddca] leading-relaxed">
                Para postularte como tutor de adopción, difundir avisos geolocalizados de extravío o gestionar tu carrito benéfico, es obligatorio iniciar sesión con tu cuenta verificada. Esto erradica el abandono reincidente y salvaguarda cada donativo.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 z-10 w-full md:w-auto">
            <button
              onClick={() => onNavigate('auth')}
              className="w-full md:w-auto px-5 py-3 rounded-lg bg-white text-[#26170c] text-sm font-semibold hover:bg-[#f0eee8] transition-all shadow-md text-center cursor-pointer"
            >
              Crear Cuenta Gratuita
            </button>
            <button
              onClick={() => onNavigate('auth')}
              className="w-full md:w-auto px-4 py-3 rounded-lg bg-white/15 hover:bg-white/25 text-white text-sm font-semibold transition-all text-center cursor-pointer"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 3: Main Bento Grid (Asymmetrical Multi-Cell Core) */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-10" id="adopciones-bento">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
          <div>
            <span className="text-xs text-[#83532b] uppercase font-bold tracking-wider">
              Ecosistema Integral
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#26170c] tracking-tight">
              Módulos de Atención & Rescate
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4f453f] max-w-md">
            Servicios sincronizados con brigadas veterinarias, refugios auditados y red civil de acogida permanente.
          </p>
        </div>

        {/* Bento 12-Column Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* MODULE 1: Adopción Responsable (Span 8 Cols) */}
          <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(61,43,31,0.03)] border border-[#e8dfd3] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#83532b] text-[24px]">favorite</span>
                <h3 className="text-lg font-bold text-[#26170c]">Candidatos a Adopción Prioritaria</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#f0eee8] text-xs text-[#4f453f] font-medium">
                32 en proceso de tutela
              </span>
            </div>

            {/* Mini Cards Grid inside Bento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Pet 1: Milo */}
              <div className="bg-[#f6f3ed] rounded-xl p-3 flex flex-col gap-3 hover:shadow-md transition-shadow border border-[#ebe8e2]">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    alt={miloPet.name}
                    src={miloPet.image}
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-sm text-xs text-[#26170c] font-semibold">
                    {miloPet.ageCategory} • {miloPet.age}
                  </span>
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#83532b] text-white text-xs font-semibold">
                    Vacunado
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-[#26170c] text-base">{miloPet.name}</h4>
                    <p className="text-xs text-[#4f453f]">{miloPet.breed} • {miloPet.size}</p>
                  </div>
                  <div className="flex gap-1">
                    <span className="w-7 h-7 rounded-full bg-[#e5e2dc] flex items-center justify-center text-xs" title="Apto con niños">
                      👶
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#e5e2dc] flex items-center justify-center text-xs" title="Apto con gatos">
                      🐱
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onOpenAdoptionModal(miloPet)}
                  className="w-full py-2.5 rounded-lg bg-[#26170c] text-white text-xs font-semibold hover:bg-[#3d2b1f] transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  Quiero Adoptar a Milo
                </button>
              </div>

              {/* Pet 2: Canela */}
              <div className="bg-[#f6f3ed] rounded-xl p-3 flex flex-col gap-3 hover:shadow-md transition-shadow border border-[#ebe8e2]">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    alt={canelaPet.name}
                    src={canelaPet.image}
                  />
                  <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-sm text-xs text-[#26170c] font-semibold">
                    {canelaPet.ageCategory} • {canelaPet.age}
                  </span>
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#26170c] text-white text-xs font-semibold">
                    Esterilizada
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-[#26170c] text-base">{canelaPet.name}</h4>
                    <p className="text-xs text-[#4f453f]">{canelaPet.breed} • {canelaPet.description.slice(0, 24)}...</p>
                  </div>
                  <div className="flex gap-1">
                    <span className="w-7 h-7 rounded-full bg-[#e5e2dc] flex items-center justify-center text-xs" title="Esterilizada">
                      🩺
                    </span>
                    <span className="w-7 h-7 rounded-full bg-[#e5e2dc] flex items-center justify-center text-xs" title="Hogareña">
                      🏠
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onOpenAdoptionModal(canelaPet)}
                  className="w-full py-2.5 rounded-lg bg-[#26170c] text-white text-xs font-semibold hover:bg-[#3d2b1f] transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  Quiero Adoptar a Canela
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-[#f0eee8] flex items-center justify-between">
              <span className="text-xs text-[#4f453f] flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-[#83532b]">info</span>
                Todas las adopciones incluyen chip identificatorio y cartilla digital.
              </span>
              <button
                onClick={() => onOpenAuthModal('Catálogo Completo')}
                className="text-xs font-bold text-[#83532b] hover:text-[#26170c] transition-colors flex items-center gap-1 cursor-pointer"
              >
                Ver catálogo completo <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* MODULE 2: Red SOS Mascotas Extraviadas (Span 4 Cols) */}
          <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(61,43,31,0.03)] border border-[#e8dfd3] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-[#83532b] to-[#ba1a1a]"></div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffdcc3] text-[#2f1500] text-xs font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-ping"></span>
                  Alerta Activa Comunitario
                </div>
                <span className="text-xs text-[#81756e] font-mono">{lostPet.timeAgo}</span>
              </div>
              <h3 className="text-xl font-bold text-[#26170c] mb-1">
                Búsqueda Urgente
              </h3>
              <p className="text-xs text-[#4f453f] mb-4">
                Radio de patrullaje civil activado a 5 km a la redonda con aviso a veterinarias asociadas.
              </p>

              {/* Lost Pet Detail Card */}
              <div className="bg-[#f6f3ed] rounded-xl p-3 mb-4 flex gap-3 border border-[#ebe8e2]">
                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 relative">
                  <img
                    className="w-full h-full object-cover"
                    alt={lostPet.name}
                    src={lostPet.image}
                  />
                </div>
                <div className="flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="font-bold text-sm text-[#26170c]">{lostPet.name} ({lostPet.breed})</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#fbddca] text-[#28180d] font-bold">
                        {lostPet.reward}
                      </span>
                    </div>
                    <p className="text-xs text-[#4f453f] flex items-center gap-1 mt-1 truncate">
                      <span className="material-symbols-outlined text-[14px] text-[#83532b]">location_on</span>
                      {lostPet.location}
                    </p>
                  </div>
                  <span className="text-[11px] text-[#83532b] font-medium truncate">
                    {lostPet.collarDetails}
                  </span>
                </div>
              </div>

              <div className="bg-[#f0eee8] rounded-lg p-3 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#83532b] text-[20px]">groups</span>
                  <span className="text-xs text-[#1c1c18] font-medium">38 vecinos alertados en la zona</span>
                </div>
                <span className="text-xs font-bold text-[#26170c] font-mono bg-white px-2 py-0.5 rounded">GPS OK</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => onOpenSosSightingModal(lostPet)}
                className="w-full py-3 rounded-lg bg-[#83532b] text-white font-semibold text-sm hover:bg-[#4a2507] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">visibility</span>
                Vi a Toby / Aportar Pista
              </button>
              <button
                onClick={onOpenNewSosModal}
                className="w-full py-2.5 rounded-lg bg-[#f0eee8] text-[#26170c] font-semibold text-xs hover:bg-[#ebe8e2] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add_alert</span>
                Publicar Mascota Extraviada
              </button>
            </div>
          </div>

          {/* MODULE 3: Tienda Solidaria (Span 8 Cols) */}
          <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(61,43,31,0.03)] border border-[#e8dfd3] flex flex-col justify-between" id="tienda-bento">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#83532b] text-[24px]">shopping_bag</span>
                <div>
                  <h3 className="text-lg font-bold text-[#26170c]">Tienda Solidaria y Suministros</h3>
                  <p className="text-xs text-[#4f453f]">El 100% del margen neto financia cirugías y alimentos de refugios afiliados.</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#ffdcc3] text-[#2f1500] text-xs font-bold">
                10% Donativo Directo
              </span>
            </div>

            {/* 3 Product Showcase Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-[#f6f3ed] rounded-xl p-3 flex flex-col justify-between hover:shadow-md transition-shadow border border-[#ebe8e2]"
                >
                  <div className="relative h-36 rounded-lg overflow-hidden mb-2 bg-white">
                    <img
                      className="w-full h-full object-cover"
                      alt={prod.name}
                      src={prod.image}
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#3d2b1f] text-white text-xs font-bold">
                      ${prod.price.toFixed(2)} USD
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#26170c] text-sm leading-tight">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-[#4f453f] mt-1 line-clamp-1">{prod.subtitle}</p>
                  </div>
                  <button
                    onClick={() => onAddToCart(prod)}
                    className="w-full mt-3 py-2 rounded-lg bg-[#f0eee8] hover:bg-[#26170c] hover:text-white text-[#26170c] text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">shopping_cart</span>
                    Añadir al Carrito
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-[#f0eee8] rounded-xl px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#4f453f] text-xs">
                <span className="material-symbols-outlined text-[#83532b] text-[20px]">local_shipping</span>
                <span>Envíos gratuitos en pedidos mayores a $45 USD en todo el territorio</span>
              </div>
              <span className="text-xs font-bold text-[#26170c]">Garantía Veterinaria 30 días</span>
            </div>
          </div>

          {/* MODULE 4: Sello Clínico y Confianza (Span 4 Cols) */}
          <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(61,43,31,0.03)] border border-[#e8dfd3] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-[#83532b] text-[24px]">verified</span>
                <h3 className="text-lg font-bold text-[#26170c]">Sello Clínico y Confianza</h3>
              </div>
              <p className="text-xs text-[#4f453f] mb-4 leading-relaxed">
                Cada mascota y producto pasa por una auditoría rigurosa coordinada por el Colegio Veterinario y santuarios regulados.
              </p>

              <div className="flex flex-col gap-2.5">
                <div className="p-3 bg-[#f6f3ed] rounded-xl flex items-start gap-2.5 border border-[#ebe8e2]">
                  <span className="material-symbols-outlined text-[#26170c] text-[22px] shrink-0 mt-0.5">
                    health_and_safety
                  </span>
                  <div>
                    <h5 className="font-bold text-xs text-[#26170c]">100% Mascotas Auditadas</h5>
                    <p className="text-xs text-[#4f453f]">Pruebas virales negativas, desparasitación interna y vacunas al día registradas en blockchain.</p>
                  </div>
                </div>

                <div className="p-3 bg-[#f6f3ed] rounded-xl flex items-start gap-2.5 border border-[#ebe8e2]">
                  <span className="material-symbols-outlined text-[#26170c] text-[22px] shrink-0 mt-0.5">
                    home_health
                  </span>
                  <div>
                    <h5 className="font-bold text-xs text-[#26170c]">Santuarios Certificados</h5>
                    <p className="text-xs text-[#4f453f]">Visitas periódicas in situ para comprobar espacio libre, nutrición y descanso digno.</p>
                  </div>
                </div>

                <div className="p-3 bg-[#f6f3ed] rounded-xl flex items-start gap-2.5 border border-[#ebe8e2]">
                  <span className="material-symbols-outlined text-[#26170c] text-[22px] shrink-0 mt-0.5">
                    policy
                  </span>
                  <div>
                    <h5 className="font-bold text-xs text-[#26170c]">Contrato Ético de Tutela</h5>
                    <p className="text-xs text-[#4f453f]">Seguimiento semestral posadopción con asistencia médica bonificada al 50%.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#f0eee8] flex items-center justify-between">
              <div className="flex items-center -space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#26170c] text-white flex items-center justify-center font-bold text-[11px] ring-2 ring-white">
                  Dr
                </div>
                <div className="w-8 h-8 rounded-full bg-[#83532b] text-white flex items-center justify-center font-bold text-[11px] ring-2 ring-white">
                  MV
                </div>
                <div className="w-8 h-8 rounded-full bg-[#3d2b1f] text-white flex items-center justify-center font-bold text-[11px] ring-2 ring-white">
                  Bio
                </div>
              </div>
              <span className="text-xs text-[#81756e] font-medium">Más de 85 veterinarios activos</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Impacto Comunitario y Testimonios */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-8">
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-[0_2px_12px_rgba(61,43,31,0.03)] border border-[#e8dfd3]">
          <div className="grid grid-cols-12 gap-6 items-center mb-8">
            <div className="col-span-12 lg:col-span-6">
              <span className="text-xs text-[#83532b] uppercase font-bold tracking-wider">
                Voces de Nuestra Manada
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#26170c] mt-1">
                Historias Reales de Amor y Reencuentro
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-6 flex lg:justify-end gap-3">
              <div className="flex items-center gap-2 bg-[#f6f3ed] px-4 py-2.5 rounded-xl border border-[#ebe8e2]">
                <span className="material-symbols-outlined text-[#83532b] text-[24px]">star</span>
                <div>
                  <span className="font-bold text-[#26170c] text-base block">4.9 / 5.0</span>
                  <span className="text-[11px] text-[#4f453f]">Valoración de 890 tutores</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-[#f6f3ed] p-6 rounded-xl flex flex-col justify-between border border-[#ebe8e2]">
              <div>
                <div className="flex items-center gap-1 text-[#83532b] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]">star</span>
                  ))}
                </div>
                <p className="text-sm text-[#1c1c18] leading-relaxed mb-4 italic">
                  “Adoptar a Luna mediante Hashiko fue impecable. Saber que cada vacuna estaba registrada y tener el acompañamiento veterinario los primeros 6 meses nos dio una tranquilidad inmensa.”
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#ebe8e2]">
                <div className="w-10 h-10 rounded-full bg-[#fbddca] flex items-center justify-center text-[#26170c] font-bold text-xs">
                  MG
                </div>
                <div>
                  <h5 className="font-bold text-xs text-[#26170c]">Mariana & Carlos</h5>
                  <span className="text-[11px] text-[#4f453f]">Tutores de Luna (Galgo Mestizo)</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[#f6f3ed] p-6 rounded-xl flex flex-col justify-between border border-[#ebe8e2]">
              <div>
                <div className="flex items-center gap-1 text-[#83532b] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]">star</span>
                  ))}
                </div>
                <p className="text-sm text-[#1c1c18] leading-relaxed mb-4 italic">
                  “Cuando Simón escapó durante los fuegos artificiales, la alerta SOS movilizó a 12 vecinos y dos clínicas en 40 minutos. Lo recuperamos sano y salvo al amanecer. Eternamente agradecida.”
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#ebe8e2]">
                <div className="w-10 h-10 rounded-full bg-[#ffdcc3] flex items-center justify-center text-[#83532b] font-bold text-xs">
                  VT
                </div>
                <div>
                  <h5 className="font-bold text-xs text-[#26170c]">Valeria Torres</h5>
                  <span className="text-[11px] text-[#4f453f]">Reencuentro SOS con Simón</span>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[#f6f3ed] p-6 rounded-xl flex flex-col justify-between border border-[#ebe8e2]">
              <div>
                <div className="flex items-center gap-1 text-[#83532b] mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[18px]">star</span>
                  ))}
                </div>
                <p className="text-sm text-[#1c1c18] leading-relaxed mb-4 italic">
                  “Compro todo el alimento de mis 3 gatos en la Tienda Solidaria. Los precios son excelentes y el reporte mensual muestra con claridad cómo mi compra apoya a los refugios rurales.”
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-[#ebe8e2]">
                <div className="w-10 h-10 rounded-full bg-[#dec1af] flex items-center justify-center text-[#26170c] font-bold text-xs">
                  DR
                </div>
                <div>
                  <h5 className="font-bold text-xs text-[#26170c]">Diego Ramírez</h5>
                  <span className="text-[11px] text-[#4f453f]">Comprador Solidario Activo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Grand Bottom Call-to-Action */}
      <section className="w-full max-w-[1440px] mx-auto px-6 lg:px-10 py-10">
        <div className="bg-[#26170c] text-white rounded-2xl p-6 sm:p-12 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10 border border-[#3d2b1f]">
          {/* Ambient Backing Elements */}
          <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-[#83532b]/20 blur-3xl pointer-events-none"></div>
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#3d2b1f] blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#ffdcc3] text-xs font-semibold mb-4">
              <span className="material-symbols-outlined text-[16px]">volunteer_activism</span>
              Únete a la Red de Cuidado Más Grande del País
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
              Sé parte del cambio: tutela, voluntariado o rescate.
            </h2>

            <p className="text-sm sm:text-base text-[#fbddca] opacity-90 leading-relaxed mb-6">
              Crea tu perfil en menos de 2 minutos. Ya sea que desees abrir tu casa temporal, colaborar en brigadas de búsqueda SOS o postular a tu próximo compañero de vida.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => onNavigate('auth')}
                className="px-6 py-3.5 rounded-lg bg-white text-[#26170c] font-bold text-sm hover:bg-[#f0eee8] transition-all shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">person_add</span>
                Registrarme como Tutor
              </button>

              <button
                onClick={() => onNavigate('auth')}
                className="px-6 py-3.5 rounded-lg bg-[#83532b] text-white font-bold text-sm hover:bg-[#4a2507] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">handshake</span>
                Sumarme como Voluntario
              </button>
            </div>
          </div>

          <div className="relative z-10 w-full lg:w-96 bg-white text-[#1c1c18] p-6 rounded-2xl shadow-xl border border-[#e8dfd3]">
            <h4 className="text-lg font-bold text-[#26170c] mb-1">Registro de Tutoría</h4>
            <p className="text-xs text-[#4f453f] mb-4">Completa tus datos iniciales para validación:</p>

            {formSuccess ? (
              <div className="py-6 text-center">
                <span className="material-symbols-outlined text-green-700 text-[40px] mb-2">check_circle</span>
                <p className="font-bold text-[#26170c] text-sm">¡Datos recibidos!</p>
                <p className="text-xs text-[#4f453f] mt-1">Redirigiendo a verificación segura...</p>
              </div>
            ) : (
              <form onSubmit={handleTutorshipSubmit} className="flex flex-col gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#4f453f] block mb-1">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={tutorshipForm.name}
                    onChange={(e) => setTutorshipForm({ ...tutorshipForm, name: e.target.value })}
                    placeholder="Ej. Ana Sofía Morales"
                    className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-xs text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#4f453f] block mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={tutorshipForm.email}
                    onChange={(e) => setTutorshipForm({ ...tutorshipForm, email: e.target.value })}
                    placeholder="ana@ejemplo.com"
                    className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-xs text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#4f453f] block mb-1">Tipo de Interés</label>
                  <select
                    value={tutorshipForm.interest}
                    onChange={(e) => setTutorshipForm({ ...tutorshipForm, interest: e.target.value })}
                    className="w-full bg-[#f6f3ed] px-3 py-2 rounded-lg text-xs text-[#1c1c18] border border-[#e8dfd3] focus:outline-none focus:bg-white"
                  >
                    <option>Adoptar un perro o gato</option>
                    <option>Hogar temporal de emergencia</option>
                    <option>Voluntariado de rescate SOS</option>
                    <option>Colaboración veterinaria</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-lg bg-[#26170c] text-white font-bold text-xs hover:bg-[#3d2b1f] transition-all shadow-md cursor-pointer"
                >
                  Continuar con Verificación
                </button>
                <span className="text-[10px] text-[#81756e] text-center block mt-1">
                  Sin spam • Datos protegidos por el protocolo Hashiko
                </span>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-[#e5e2dc] shadow-[0_-1px_12px_rgba(61,43,31,0.03)] mt-8 border-t border-[#d2c4bc]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-[#3d2b1f] flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[18px]">pets</span>
                </div>
                <span className="font-bold text-base text-[#26170c]">Hashiko</span>
              </div>
              <p className="text-xs text-[#4f453f] leading-relaxed">
                Santuario integral dedicado al rescate responsable, la adopción ética y la atención clínica veterinaria de alta precisión en comunidades locales.
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f6f3ed] text-[11px] text-[#4f453f] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#83532b]"></span> Red Activa 24/7
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-sm text-[#1c1c18] mb-1">Navegación Rápida</span>
              <a href="#" className="text-xs text-[#4f453f] hover:text-[#1c1c18] transition-colors">Inicio y Rescate</a>
              <a href="#adopciones-bento" className="text-xs text-[#4f453f] hover:text-[#1c1c18] transition-colors">Catálogo de Adopciones</a>
              <button onClick={() => onOpenSosSightingModal(lostPet)} className="text-left text-xs text-[#4f453f] hover:text-[#1c1c18] transition-colors">
                Alerta SOS Extravíos
              </button>
              <a href="#tienda-bento" className="text-xs text-[#4f453f] hover:text-[#1c1c18] transition-colors">Tienda Benéfica</a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-sm text-[#1c1c18] mb-1">Atención Veterinaria</span>
              <button onClick={() => onNavigate('vet-portal')} className="text-left text-xs text-[#4f453f] hover:text-[#1c1c18] transition-colors">
                Gestión de Pacientes & Citas
              </button>
              <button onClick={() => onNavigate('vet-portal')} className="text-left text-xs text-[#4f453f] hover:text-[#1c1c18] transition-colors">
                Urgencias y Triaje
              </button>
              <button onClick={() => onNavigate('vet-portal')} className="text-left text-xs text-[#4f453f] hover:text-[#1c1c18] transition-colors">
                Historial de Vacunación
              </button>
              <button onClick={() => onNavigate('vet-portal')} className="text-left text-xs text-[#4f453f] hover:text-[#1c1c18] transition-colors">
                Directorio Médico
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-sm text-[#1c1c18] mb-1">Legal y Comunidad</span>
              <a href="#" className="text-xs text-[#4f453f] hover:text-[#1c1c18] transition-colors">Políticas de Bienestar Animal</a>
              <a href="#" className="text-xs text-[#4f453f] hover:text-[#1c1c18] transition-colors">Términos y Transparencia</a>
              <a href="#" className="text-xs text-[#4f453f] hover:text-[#1c1c18] transition-colors">Protección de Datos SOS</a>
              <div className="flex items-center gap-3 mt-2 text-[#4f453f]">
                <span className="material-symbols-outlined text-[20px] hover:text-[#26170c] cursor-pointer">public</span>
                <span className="material-symbols-outlined text-[20px] hover:text-[#26170c] cursor-pointer">mail</span>
                <span className="material-symbols-outlined text-[20px] hover:text-[#26170c] cursor-pointer">share</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#d2c4bc]/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs text-[#4f453f]">
            <span>© 2026 Hashiko. Plataforma unificada de rescate y salud animal.</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-[#1c1c18] transition-colors">Privacidad</a>
              <a href="#" className="hover:text-[#1c1c18] transition-colors">Protocolo Clínico</a>
              <a href="#" className="hover:text-[#1c1c18] transition-colors">Contacto SOS</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
