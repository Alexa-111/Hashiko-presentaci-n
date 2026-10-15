import { PetAdoptionCandidate, LostPetAlert, ShopProduct, Appointment, PatientVitals } from '../types';

export const MOCK_ADOPTION_PETS: PetAdoptionCandidate[] = [
  {
    id: 'milo',
    name: 'Milo',
    breed: 'Mestizo sociable',
    age: '4 meses',
    ageCategory: 'Cachorro',
    size: 'Talla mediana',
    status: 'En proceso de tutela',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvNdr7cjlHHLD7o6xm3WsfP6iGArMycnryotZPUOGfrCNR0A_v8tSnZcFldGJZm5dSjfOz4M5mZi8CI8Cf1Zoi0kXnEcK5qP9ZPUloVq3Ry5kSC-MrU8Xm0X5xxjIcsO0nhO0XHq-QzqLeXt53hEBqsu-XDE4Fgcke4lYoLUnhS9mez9FW8aKsgIVPpQC2104GMaInwrzpOku-w6VL0y9lIhWQdyghwgbMVOea7N2wmt6ySznk0FWm',
    vaccinated: true,
    sterilized: false,
    traits: ['Apto con niños 👶', 'Apto con gatos 🐱'],
    description: 'Milo es un cachorro rescatado en excelente estado de salud, lleno de energía y sumamente sociable con personas y otros animales.',
    sanctuary: 'Santuario Central'
  },
  {
    id: 'canela',
    name: 'Canela',
    breed: 'Gata Calicó',
    age: '1.5 años',
    ageCategory: 'Joven',
    size: 'Talla estándar',
    status: 'En proceso de tutela',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhCgxoTceDYYEdFAYY_VCSOzjry1XwQmYzXeSfhWA7orkl9q6k5ahTsXqiZZri-IMLOn3jU4diHNkCnO_pEK0QZEoOsmM88nnLcYSnGvuKOqk3mThoAtUZQXWo4HIgAPv7mcgYzF9T4ZUGUMLxggzZafLzKP_Ba-GHExpA59CinoUtY_Q6H3xOmB3EPqJtOASvuAqQ7VB77iHpWCUCfFw0EPIYI_C9uVEHZ8BY7AE0oXiSGQtEjH56',
    vaccinated: true,
    sterilized: true,
    traits: ['Esterilizada 🩺', 'Hogareña 🏠'],
    description: 'Canela es una gata tranquila y afectuosa, perfecta para departamentos o espacios relajados. Adora las caricias y los rincones soleados.',
    sanctuary: 'Santuario Oriente'
  },
  {
    id: 'bruno',
    name: 'Bruno',
    breed: 'Golden Retriever Mestizo',
    age: '2 años',
    ageCategory: 'Adulto Joven',
    size: 'Talla grande',
    status: 'Esperando adopción',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOsSpvOyPZps4nuduCqfFeQLZi9RFhMEA0a0p-J6RCdM5ROil3QTiAQGZuLo2is6XODsHSXdaSUZjz78hPLqcKTpbCiNHEP4vzDsbJWMXY6mIBjQa0cMm5j1rO6oZb63NvPe4rd3MRQA6utEmnYULWh4XgHAJEkrc2--6ptKVRwawT8xAXcNq1ZrjEMio8dXvti4ypmflrhIVsdcOA1Mw8nj9TMYgz6izE6aKMDIMVtUsSEhYyp6a-',
    vaccinated: true,
    sterilized: true,
    traits: ['Noble 💛', 'Paseos largos 🌿'],
    description: 'Rescate semanal #492. Bruno es un perro protector, bondadoso y muy leal que busca una familia activa.',
    sanctuary: 'Santuario Norte'
  }
];

export const MOCK_LOST_PET: LostPetAlert = {
  id: 'toby-beagle',
  name: 'Toby',
  breed: 'Beagle',
  reward: '$350 USD Recompensa',
  location: 'Sector Las Camelias, Parque Central',
  collarDetails: 'Collar rojo con placa de Hashiko',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgJKtjtADW_djlnKUex0K8QEdaG33OZTwBcqGTqWnzhXSipKWY3rtJAIkUjvqq6wymNOgrVsfRdWXyZKqUcsDdFEdPr0gBl57jujhwTnTqw_gZGyiLu3yua6D5-k4Q_TfanfBXJ897sZwgjj1bLuXI0GKx90YbpeP1PJ9p7fqnOGytv8x7GMnH4Wkqt_iC5c93li1Ow-VbazgQ4pBPtCCKsk3rNDZ6urfDdWOsBhkwuR3i-yz2UZ4-',
  timeAgo: 'Hace 2h',
  alertedNeighbors: 38,
  gpsActive: true,
  description: 'Se extravió cerca de la fuente de agua de Parque Central. Responde alegremente a su nombre y a silbidos suaves. Llevaba placa con código QR de Hashiko.'
};

export const MOCK_SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: 'cama-ortopedica',
    name: 'Cama Ortopédica Memory Foam',
    price: 48.00,
    currency: 'USD',
    subtitle: 'Funda lavable con soporte articular.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJnooQspOLBO2Aoe5S13v5k52N4BqkyiJam8rInk9mrRASWS795XXj36heHUN22ul-NsIKJYKXElKIrDhBZMXw_SZhFUzDWsO2zTNQOXK7UVFT7Ig-Ks60S-fu35O0KQTH58Krea8LWUsN0Ci72gH-KC8jG4v0AQXu91m1OM7mJvxsbeDZj4ejGO0VQ5QjzdOlv47PnwinAXzv6w2MbkDZj6B-MKR5LSsnb4YWcpSMfwun9HEb8t9a',
    category: 'Descanso'
  },
  {
    id: 'alimento-holistico',
    name: 'Alimento Holístico Grain-Free 5kg',
    price: 34.50,
    currency: 'USD',
    subtitle: 'Nutrición balanceada con salmón y batata.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_tUMkAl_8k2WUWV_YRaB27VsOnaEH4C1ES6gZRPf4Lo84xBO4KbuO_T5yQ1GtKLx9ZWBNLO5nM-c_HP-twlHIMcAeJTXpdE5RY7HldTMVoQRWb5GyE4kCN1385mtxUEPhobEZmQ-LOum9jK-qQXMhg70j-1iUmOO1wUP5WmbAni-XWUYT3fBhFkCAjoQBSSl8TMBfeMvnIj8ANPa0JLfFvxisTrUEIXkQFC1BOb394sbzVYVzbYVV',
    category: 'Alimentación'
  },
  {
    id: 'arnes-ergonomico',
    name: 'Arnés Ergonómico Antitirones',
    price: 22.90,
    currency: 'USD',
    subtitle: 'Acolchado transpirable y reflectante.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy5JYhoZ7R_SjN8elJGGUrN5KyIVTwLgxjRDnX12kbJAvX-jxNl3aAis_GsjzAT-baie4W9qGrqU7-SZsTD1srfRq4uZkwGfolpXC67hGHaxGW_DVFDYUy4FgFEWkADygHT0CUzsdBjNNxh9fJq3DtLspwSS3IANL6-YlIfYwTlCTdylq87Kd2WkyB2J2YxMEJx2SMQGQEG0hU5yS7qZOq0x95-U5e390ge0aVxnzyVml4F4ZmYJgu',
    category: 'Paseo'
  }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    time: '10:15 AM',
    status: 'en_sala',
    statusLabel: '10:15 AM • En Sala',
    petName: 'Luna',
    species: 'Gata Siamés',
    age: '4 años',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJf2M9PTjB6ZkR9ZidfxKSOEKvmNL31QU1UWSgWVXUfQcHfVX6o7yIt9llakXIqZtp-8-y-_UmdF4QsbM_m4Al1JfwO_o7rMql9XK67dmZEbLd-VKZeasNKuHtTU5L0_i0bwmtgVJgrBeCi88TZA-FEa0eywzGNEJz7uNzoGPhI5unUe-J_i3366BTCYvjVKcGQ4aJCleb4sJeB1E4wFXFHtgllo1isb7Ydi2hB0PXE-k4bf5wu0jp',
    box: 'Box 1',
    ownerName: 'Sofía Castro (Tutora)',
    reason: 'Revisión postoperatoria (Esterilización)',
    notes: 'Paciente retirada de collar isabelino temporalmente. Herida seca, sin signos de exudado. Requiere retiro de sutura intradérmica.',
    badge: 'Box 1'
  },
  {
    id: 'apt-2',
    time: '09:00 AM',
    status: 'completada',
    statusLabel: '09:00 AM • Completada',
    petName: 'Milo',
    species: 'Golden Retriever',
    age: '6 meses',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOn7uRcH6Qjvr5LhZTGOp-jD4VbtueBHHTKNXF2OLaFgYyWIL_BleaCdZ7DGDGdjM6b0v5yf6J-4xdN2bmiYWWWbeEBgv61AOGV4deWFiGYSJrpSwG6K-8dIzmt_rSNWCrhle9JHsXb6XG6wmmqst402PnTQErsYdKCOO4RGgvvrQecj5Mwj-YgZdjIy1zbBwk-J6WdgUe7NEDZ3_wwCJpOXYfc1Rxt7-ajFTNe3rWYTWzjToFqSYy',
    box: 'Box 1',
    ownerName: 'Carlos Morales',
    reason: 'Chequeo general & Refuerzo Séxtuple + Rabia',
    completedSummary: 'Evolución: Excelente condición corporal (BCS 5/9). Próxima cita en 6 meses.'
  },
  {
    id: 'apt-3',
    time: '11:30 AM',
    status: 'proxima',
    statusLabel: '11:30 AM • Próxima (en 45 min)',
    petName: 'Rocky',
    species: 'Bulldog Francés',
    age: '3 años',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoCr_aIe9xDwAF4o2PkWrC_DEWT3vPUI7LfmwpR5D7DvB5_skblDfEQyP1S7VxfJbrxY0vNSBWDlFgGrV2o9LFAkUIFNPsGiZClTBK5RFIKMh35hWQezb-HAFYYSsGa_V94wZF9SvDPflLeqcnCXCoEYGWCV1_psi10EgoJqZNMkaRByOIbbDs2PfPKA5QLC08-w4KNYBkVX8w8jct9xkJkHZvs4JXcHqFfnHhw1m4qr6bZulBd0Cs',
    box: 'Box 2',
    ownerName: 'Andrea Valenzuela',
    reason: 'Dermatología (Prurito podal recidivante)',
    attachments: ['Ficha citológica previa adjunta', 'Control alérgico']
  },
  {
    id: 'apt-4',
    time: '02:00 PM',
    status: 'pendiente',
    statusLabel: '02:00 PM • Pendiente Tarde',
    petName: 'Simba',
    species: 'Gato Común',
    age: '5 años',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApoJ3EPRmm2zr4sFw-XanRxB7y99JTnvdhvCCkjxzILNOzmOT7n9vORZhALihSxcf9HGj7HRu9H2o5OQOLKnGg_nVO2YnULmxQ85MRkHSYjd4EinRo-7PQp4uT8ZADZ7QPNNPA65lgMoIsCFJPf0CEtsgrxRo6geMv6wM2aty_XvgJY4_GsuLRYR-2e8zPZrOle9CVXI9bwws4vpaJHqMElWBDp9358BPEmLkFgTJj8Vd5bKB5Q5Bc',
    box: 'Box 1',
    ownerName: 'Felipe Sandoval',
    reason: 'Control Renal periódico'
  },
  {
    id: 'apt-5',
    time: '03:30 PM',
    status: 'pendiente',
    statusLabel: '03:30 PM • Pendiente Tarde',
    petName: 'Canela',
    species: 'Cocker Spaniel',
    age: '4 años',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7c2BFpi9ihrQGj8mPVyZjY8jbo1a9bCfN0bfTfyfqDwyFyhC2ucQUzP12ugH-GUyuORwPzFYoO2-UzRCm-7Mu2Pn5OpVOW5C7SWGImBblwQ9LfLDwfQLy8htwp1C3kYgWNK2oedss_m5AEF6aAgcmIgUHTbMWroLzgZBNKrZB1aHvGiOUT6gbaEApJHVQY95el-_RWRgFVocRBRpsQoHlfejHrVuHcP1WUBhjzW_YsVEOoEtqvmDX',
    box: 'Box Qx',
    ownerName: 'Beatriz Lagos',
    reason: 'Limpieza dental ultrasónica'
  },
  {
    id: 'apt-6',
    time: '05:00 PM',
    status: 'pendiente',
    statusLabel: '05:00 PM • Pendiente Tarde',
    petName: 'Thor',
    species: 'Pastor Alemán',
    age: '2 años',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOsSpvOyPZps4nuduCqfFeQLZi9RFhMEA0a0p-J6RCdM5ROil3QTiAQGZuLo2is6XODsHSXdaSUZjz78hPLqcKTpbCiNHEP4vzDsbJWMXY6mIBjQa0cMm5j1rO6oZb63NvPe4rd3MRQA6utEmnYULWh4XgHAJEkrc2--6ptKVRwawT8xAXcNq1ZrjEMio8dXvti4ypmflrhIVsdcOA1Mw8nj9TMYgz6izE6aKMDIMVtUsSEhYyp6a-',
    box: 'Box 2',
    ownerName: 'Ricardo Méndez',
    reason: 'Control ortopédico y displasia de cadera preventiva'
  }
];

export const MOCK_ACTIVE_PATIENT: PatientVitals = {
  petName: 'Luna',
  species: 'Felino Siamés',
  breed: 'Siamés Tradicional',
  gender: 'Hembra',
  sterilized: true,
  microchip: '981098102948172',
  image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmS88tWpuK8ij97YGH9y3_R5nwUJWhTXuLJ0m9BuiDjc0SLzoHRHpkFa9Y9EP5YviKkk-_mzE36JfOn-iKmGxRzSGCt_GlchlCagpIigVVnF9bdZooOlqKorrAVnJmAS498XGn83sMa-m3XIlXMxyRSadMeimlJfayouIRyAtN45Hs0xz29VJriymQYHWbnfHVs2HigL7cvw9k0bAEhLkaFShVHnLckrWB1rqb7c7bY09o3xvDxaSl',
  currentWeight: '3.8 kg',
  weightDelta: '+100g vs mes anterior',
  vaccineStatus: 'Al día',
  vaccineNote: 'Triple Felina vigente',
  dewormingStatus: '1 mes',
  dewormingNote: 'Pipeta Broadline',
  criticalAlerts: [
    'Sensibilidad a AINEs: Usar Meloxicam felino con dosificación estricta por peso.',
    'Herida quirúrgica: Inspeccionar línea de incisión alba. Test de palpación sin dolor reactivo.'
  ],
  weightHistory: [
    { month: 'May', weight: 3.4 },
    { month: 'Jul', weight: 3.6 },
    { month: 'Sep', weight: 3.7 },
    { month: 'Hoy', weight: 3.8 }
  ],
  ownerName: 'Sofía Castro M.',
  ownerPhone: '+56 9 8241 9022'
};
