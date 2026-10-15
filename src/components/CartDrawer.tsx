import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const donation = subtotal * 0.10;
  const isFreeShipping = subtotal >= 45.0;
  const shippingCost = items.length === 0 ? 0 : isFreeShipping ? 0 : 5.0;
  const total = subtotal + shippingCost;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-[#26170c]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#e8dfd3]">
          {/* Header */}
          <div className="p-5 border-b border-[#f0eee8] flex items-center justify-between bg-[#fcf9f3]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#83532b] text-[24px]">shopping_bag</span>
              <div>
                <h3 className="font-bold text-[#26170c] text-lg leading-tight">Carrito Solidario</h3>
                <span className="text-xs text-[#83532b] font-medium">10% de tu compra financia rescates</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#f0eee8] flex items-center justify-center text-[#1c1c18] hover:bg-[#ebe8e2] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-[#4f453f]">
                <div className="w-16 h-16 rounded-full bg-[#f6f3ed] flex items-center justify-center text-[#83532b] mb-3">
                  <span className="material-symbols-outlined text-[32px]">production_quantity_limits</span>
                </div>
                <h4 className="font-bold text-[#26170c] mb-1">Tu carrito solidario está vacío</h4>
                <p className="text-xs text-[#81756e] max-w-xs mb-4">
                  Explora nuestros suministros auditados para apoyar la atención veterinaria de mascotas rescatadas.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-[#26170c] text-white rounded-lg text-xs font-semibold hover:bg-[#3d2b1f] transition-all"
                >
                  Ver Productos
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 p-3 bg-[#f6f3ed] rounded-xl border border-[#ebe8e2] items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-white shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-xs text-[#26170c] leading-snug line-clamp-1">
                      {item.product.name}
                    </h5>
                    <p className="text-[11px] text-[#81756e]">{item.product.subtitle}</p>
                    <span className="text-xs font-bold text-[#83532b]">
                      ${(item.product.price * item.quantity).toFixed(2)} USD
                    </span>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center border border-[#d2c4bc] rounded-md bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-[#1c1c18] hover:bg-[#f0eee8]"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-[#26170c]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-xs text-[#1c1c18] hover:bg-[#f0eee8]"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[11px] text-red-600 hover:underline flex items-center gap-0.5 ml-auto"
                      >
                        <span className="material-symbols-outlined text-[13px]">delete</span> Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Impact Banner & Totals */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#f0eee8] bg-[#fcf9f3] flex flex-col gap-3">
              <div className="p-3 rounded-lg bg-[#ffdcc3]/50 border border-[#f9b989]/50 flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[#83532b] text-[20px] shrink-0">
                  volunteer_activism
                </span>
                <p className="text-xs text-[#2f1500] leading-tight">
                  <strong>Impacto directo:</strong> Con este pedido aportas{' '}
                  <span className="font-bold text-[#83532b]">${donation.toFixed(2)} USD</span> al fondo de cirugías del Santuario.
                </p>
              </div>

              <div className="flex flex-col gap-1.5 text-xs text-[#4f453f] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal productos</span>
                  <span className="font-medium text-[#26170c]">${subtotal.toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío clínico verificado</span>
                  <span className="font-medium">
                    {isFreeShipping ? (
                      <span className="text-green-700 font-bold">¡Gratis! (mayor a $45)</span>
                    ) : (
                      `$${shippingCost.toFixed(2)} USD`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#26170c] pt-2 border-t border-[#ebe8e2]">
                  <span>Total a Pagar</span>
                  <span className="text-[#26170c]">${total.toFixed(2)} USD</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-3 rounded-lg bg-[#26170c] text-white font-semibold text-sm hover:bg-[#3d2b1f] transition-all shadow-md flex items-center justify-center gap-2 mt-2"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>Completar Donación & Compra</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
