export const sampleMetrics = {
  kpis: [
    { label: 'Clientes activos', value: 24, trend: 12 },
    { label: 'Sesiones mes', value: 68, trend: 5 },
    { label: 'NPS', value: 72, trend: -3 }
  ],
  pipeline: [
    { name: 'Ana', engagement: 82 },
    { name: 'Luis', engagement: 75 },
    { name: 'Marta', engagement: 90 },
    { name: 'Carlos', engagement: 65 }
  ],
  goals: [
    { label: 'En curso', value: 18 },
    { label: 'Completados', value: 9 },
    { label: 'En riesgo', value: 5 }
  ],
  sessions: [
    { id: 1, client: 'Ana', topic: 'Liderazgo', date: '12 Feb 2026', time: '10:00' },
    { id: 2, client: 'Luis', topic: 'Productividad', date: '12 Feb 2026', time: '12:00' },
    { id: 3, client: 'Marta', topic: 'Cambio de rol', date: '13 Feb 2026', time: '09:00' }
  ]
};

export const sampleClients = [
  { id: 1, name: 'Ana', goal: 'Liderazgo', status: 'activo', statusLabel: 'Activo', nextSession: '12 Feb 2026', score: 82 },
  { id: 2, name: 'Luis', goal: 'Productividad', status: 'riesgo', statusLabel: 'En riesgo', nextSession: '15 Feb 2026', score: 68 },
  { id: 3, name: 'Marta', goal: 'Cambio de rol', status: 'activo', statusLabel: 'Activo', nextSession: '20 Feb 2026', score: 90 }
];

export const sampleSessions = [
  { id: 1, client: 'Ana', topic: 'Liderazgo', date: '12 Feb 2026', time: '10:00' },
  { id: 2, client: 'Luis', topic: 'Productividad', date: '12 Feb 2026', time: '12:00' },
  { id: 3, client: 'Marta', topic: 'Cambio de rol', date: '13 Feb 2026', time: '09:00' }
];
