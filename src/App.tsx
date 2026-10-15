import React, { useState } from 'react';
import {
  ScreenView,
  PetAdoptionCandidate,
  LostPetAlert,
  ShopProduct,
  CartItem,
  Appointment,
  PatientVitals
} from './types';
import {
  MOCK_ADOPTION_PETS,
  MOCK_LOST_PET,
  MOCK_SHOP_PRODUCTS,
  MOCK_APPOINTMENTS,
  MOCK_ACTIVE_PATIENT
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { AuthScreen } from './components/AuthScreen';
import { VetPortalScreen } from './components/VetPortalScreen';
import { AuthRequiredModal } from './components/AuthRequiredModal';
import { CartDrawer } from './components/CartDrawer';
import { AdoptionModal } from './components/AdoptionModal';
import { SosReportModal } from './components/SosReportModal';
import { ClinicalHistoryModal } from './components/ClinicalHistoryModal';
import { PrescriptionModal } from './components/PrescriptionModal';
import { NewAppointmentModal } from './components/NewAppointmentModal';

export default function App() {
  // Navigation View State
  const [currentView, setCurrentView] = useState<ScreenView>('home');

  // Application Data States
  const [adoptionPets] = useState<PetAdoptionCandidate[]>(MOCK_ADOPTION_PETS);
  const [lostPet, setLostPet] = useState<LostPetAlert>(MOCK_LOST_PET);
  const [products] = useState<ShopProduct[]>(MOCK_SHOP_PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: MOCK_SHOP_PRODUCTS[0], quantity: 1 }
  ]);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [activePatient] = useState<PatientVitals>(MOCK_ACTIVE_PATIENT);
  const [, setCurrentUser] = useState<{ role: 'tutor' | 'vet'; email: string } | null>(null);

  // Modal Dialog States
  const [authModalState, setAuthModalState] = useState<{ isOpen: boolean; context: string }>({
    isOpen: false,
    context: ''
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedPetForAdoption, setSelectedPetForAdoption] = useState<PetAdoptionCandidate | null>(null);
  const [sosModalState, setSosModalState] = useState<{
    isOpen: boolean;
    isNewAlert: boolean;
    targetPet?: LostPetAlert;
  }>({
    isOpen: false,
    isNewAlert: false
  });
  const [isClinicalHistoryOpen, setIsClinicalHistoryOpen] = useState(false);
  const [isPrescriptionOpen, setIsPrescriptionOpen] = useState(false);
  const [isNewAppointmentOpen, setIsNewAppointmentOpen] = useState(false);

  // Global Toast
  const [globalToast, setGlobalToast] = useState<string | null>(null);

  const showGlobalToast = (message: string) => {
    setGlobalToast(message);
    setTimeout(() => setGlobalToast(null), 3500);
  };

  // Cart Handlers
  const handleAddToCart = (product: ShopProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showGlobalToast(`¡${product.name} añadido a tu Carrito Solidario!`);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setCartItems([]);
    setIsCartOpen(false);
    showGlobalToast('¡Compra y donativo completados! Gracias por apoyar a los refugios.');
  };

  // Auth Handlers
  const handleLoginSuccess = (role: 'tutor' | 'vet', email: string) => {
    setCurrentUser({ role, email });
    showGlobalToast(
      role === 'vet'
        ? `Bienvenida Dra. Karina García al Panel Clínico.`
        : `Bienvenido/a ${email} a Hashiko.`
    );
  };

  // SOS Handlers
  const handleSosSubmit = (data: any) => {
    if (data.isNewAlert) {
      showGlobalToast(`Alerta SOS creada para ${data.petName}. 38 vecinos notificados.`);
    } else {
      setLostPet((prev) => ({
        ...prev,
        alertedNeighbors: prev.alertedNeighbors + 1
      }));
      showGlobalToast(`Pista registrada para ${data.petName || 'la mascota'}. ¡Gracias por colaborar!`);
    }
  };

  // Appointment Handlers
  const handleAddAppointment = (newApt: Partial<Appointment>) => {
    setAppointments((prev) => [newApt as Appointment, ...prev]);
    showGlobalToast(`Cita para ${newApt.petName} agendada en ${newApt.box}.`);
  };

  const handleUpdateAppointmentStatus = (id: string, newStatus: Appointment['status']) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
  };

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fcf9f3] text-[#1c1c18] font-['Plus_Jakarta_Sans',sans-serif] selection:bg-[#ffdcc3] selection:text-[#26170c]">
      {/* Toast Notification Banner */}
      {globalToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#26170c] text-white rounded-xl shadow-2xl border border-[#ffdcc3] flex items-center gap-3 animate-bounce">
          <span className="material-symbols-outlined text-[#ffdcc3] text-[20px]">pets</span>
          <span className="text-xs font-semibold">{globalToast}</span>
          <button
            onClick={() => setGlobalToast(null)}
            className="ml-2 text-white/70 hover:text-white"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Public Navbar (Only on Home & Auth views; Vet Portal has its own integrated header) */}
      {currentView !== 'vet-portal' && (
        <Navbar
          currentView={currentView}
          onNavigate={setCurrentView}
          onOpenSos={() => setSosModalState({ isOpen: true, isNewAlert: true })}
          onOpenCart={() => setIsCartOpen(true)}
          cartCount={cartTotalCount}
        />
      )}

      {/* Screen 1: Home Screen */}
      {currentView === 'home' && (
        <HomeScreen
          adoptionPets={adoptionPets}
          lostPet={lostPet}
          products={products}
          onOpenAdoptionModal={(pet) => setSelectedPetForAdoption(pet)}
          onOpenSosSightingModal={(pet) =>
            setSosModalState({ isOpen: true, isNewAlert: false, targetPet: pet })
          }
          onOpenNewSosModal={() => setSosModalState({ isOpen: true, isNewAlert: true })}
          onAddToCart={handleAddToCart}
          onNavigate={setCurrentView}
          onOpenAuthModal={(context) => setAuthModalState({ isOpen: true, context })}
        />
      )}

      {/* Screen 2: Authentication Screen */}
      {currentView === 'auth' && (
        <AuthScreen onNavigate={setCurrentView} onLoginSuccess={handleLoginSuccess} />
      )}

      {/* Screen 3: Veterinary Clinical Portal Screen */}
      {currentView === 'vet-portal' && (
        <>
          {/* Quick return pill when inside Vet Portal to guarantee 100% accessible switching */}
          <div className="bg-[#26170c] text-white py-1.5 px-4 text-xs flex items-center justify-between border-b border-[#3d2b1f] z-50">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="font-semibold text-[#fbddca]">Panel Clínico Activo</span>
              <span className="text-[#dec1af] hidden sm:inline">· Dra. Karina García (MPV #4829)</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentView('home')}
                className="px-2.5 py-1 rounded bg-[#3d2b1f] hover:bg-[#83532b] text-white text-[11px] font-medium flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">home</span>
                <span>Ir al Portal Principal</span>
              </button>
              <button
                onClick={() => setCurrentView('auth')}
                className="px-2.5 py-1 rounded bg-[#3d2b1f] hover:bg-[#83532b] text-white text-[11px] font-medium flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">lock</span>
                <span>Cambiar Usuario</span>
              </button>
            </div>
          </div>

          <VetPortalScreen
            appointments={appointments}
            activePatient={activePatient}
            onNavigate={setCurrentView}
            onOpenNewAppointmentModal={() => setIsNewAppointmentOpen(true)}
            onOpenClinicalHistory={() => setIsClinicalHistoryOpen(true)}
            onOpenPrescription={() => setIsPrescriptionOpen(true)}
            onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
          />
        </>
      )}

      {/* Modals & Slide-overs */}
      <AuthRequiredModal
        isOpen={authModalState.isOpen}
        onClose={() => setAuthModalState({ isOpen: false, context: '' })}
        onGoToLogin={() => setCurrentView('auth')}
        onGoToRegister={() => setCurrentView('auth')}
        sourceContext={authModalState.context}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <AdoptionModal
        pet={selectedPetForAdoption}
        isOpen={Boolean(selectedPetForAdoption)}
        onClose={() => setSelectedPetForAdoption(null)}
        onSubmit={(data) => {
          showGlobalToast(`Postulación para ${data.petName} registrada con éxito.`);
        }}
      />

      <SosReportModal
        isOpen={sosModalState.isOpen}
        onClose={() => setSosModalState({ isOpen: false, isNewAlert: false })}
        targetPet={sosModalState.targetPet}
        isNewAlert={sosModalState.isNewAlert}
        onSubmit={handleSosSubmit}
      />

      <ClinicalHistoryModal
        isOpen={isClinicalHistoryOpen}
        onClose={() => setIsClinicalHistoryOpen(false)}
        patient={activePatient}
      />

      <PrescriptionModal
        isOpen={isPrescriptionOpen}
        onClose={() => setIsPrescriptionOpen(false)}
        patient={activePatient}
        onEmitSuccess={(rx) => {
          showGlobalToast(`Receta para ${rx.patient} emitida y firmada digitalmente.`);
        }}
      />

      <NewAppointmentModal
        isOpen={isNewAppointmentOpen}
        onClose={() => setIsNewAppointmentOpen(false)}
        onAddAppointment={handleAddAppointment}
      />
    </div>
  );
}
