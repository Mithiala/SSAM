const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/listar",
        name: "listar",
        component: () => import("src/pages/ResumenPacientesPage.vue"),
      },
    ],
  },
  {
    path: "/trabajosocial",
    component: () => import("layouts/WorkLayout.vue"),
    children: [
      {
        path: "iniciots",
        name: "iniciots",
        component: () => import("src/pages/TrabajoSocial/IndexWorkPage.vue"),
      },
      {
        path: "datospacientes",
        name: "datospacientes",
        component: () => import("src/pages/TrabajoSocial/DateGeneralPage.vue"),
      },
      {
        path: "familiarests",
        name: "familiarests",
        component: () =>
          import("src/pages/TrabajoSocial/CompositionFamily.vue"),
      },
      {
        path: "pasests",
        name: "pasests",
        component: () => import("src/pages/TrabajoSocial/ControlExitPage.vue"),
      },
      {
        path: "encuestats",
        name: "encuestats",
        component: () =>
          import("src/pages/TrabajoSocial/InitialSurveyPage.vue"),
      },
      {
        path: "trabajodiariots",
        name: "trabajodiariots",
        component: () => import("src/pages/TrabajoSocial/WorkDiaryPage.vue"),
      },
      {
        path: "discapacidad",
        name: "discapacidad",
        component: () => import("src/pages/TrabajoSocial/DisabilityPage.vue"),
      },
      {
        path: "estadistica",
        name: "estadistica",
        component: () => import("src/pages/TrabajoSocial/EstadisticAsistenceMedicalPage.vue"),
      },
    ],
  },
  {
    path: "/psicologia",
    component: () => import("layouts/PsicologyLayout.vue"),
    children: [
      {
        path: "iniciops",
        name: "iniciops",
        component: () => import("src/pages/Psicologia/IndexPsicologyPage.vue"),
      },
      {
        path: "afectivops",
        name: "afectivops",
        component: () => import("src/pages/Psicologia/AffectivePage.vue"),
      },
      {
        path: "cognitivops",
        name: "cognitivops",
        component: () => import("src/pages/Psicologia/CognitivePage.vue"),
      },
      {
        path: "defectologiaps",
        name: "defectologiaps",
        component: () => import("src/pages/Psicologia/DefectologyPage.vue"),
      },
    ],
  },
  {
    path: "/asistenciamedica",
    component: () => import("layouts/AsistenceMedicalLayout.vue"),
    children: [
      {
        path: "inicioas",
        name: "inicioas",
        component: () =>
          import("src/pages/AsistenciaMedica/IndexAsistencePage.vue"),
      },
      {
        path: "controlas",
        name: "controlas",
        component: () => import("src/pages/AsistenciaMedica/ControlPage.vue"),
      },
      {
        path: "indiceas",
        name: "indiceas",
        component: () =>
          import("src/pages/AsistenciaMedica/IndiceValuePage.vue"),
      },
      {
        path: "termometriaas",
        name: "termometriaas",
        component: () =>
          import("src/pages/AsistenciaMedica/TermometryPage.vue"),
      },
      {
        path: "trasladoas",
        name: "trasladoas",
        component: () =>
          import("src/pages/AsistenciaMedica/TranslatePage.vue"),
      },
      {
        path: "vacunasas",
        name: "vacunasas",
        component: () =>
          import("src/pages/AsistenciaMedica/ControlVacunasPage.vue"),
      },
      {
        path: "solicitudas",
        name: "solicitudas",
        component: () =>
          import("src/pages/AsistenciaMedica/MedicationRequestPage.vue"),
      },
      {
        path: "datosas",
        name: "datosas",
        component: () =>
          import("src/pages/AsistenciaMedica/DateEnfermPage.vue"),
      },
      {
        path: "valueas",
        name: "valueas",
        component: () =>
          import("src/pages/AsistenciaMedica/EnfValuePage.vue"),
      },
      {
        path: "sindromeas",
        name: "sindromeas",
        component: () =>
          import("src/pages/AsistenciaMedica/SindromePage.vue"),
      },
      {
        path: "mntas",
        name: "mntas",
        component: () =>
          import("src/pages/AsistenciaMedica/MntPage.vue"),
      },
      {
        path: "lawton",
        name: "lawton",
        component: () =>
          import("src/pages/AsistenciaMedica/LawtonPage.vue"),
      },
      {
        path: "indicaciones",
        name: "indicaciones",
        component: () =>
          import("src/pages/AsistenciaMedica/IndicacionesPages.vue"),
      },
    ],
  },
  {
    path: "/farmacia",
    component: () => import("layouts/FarmacyLayout.vue"),
    children: [
      {
        path: "iniciofr",
        name: "iniciofr",
        component: () => import("src/pages/Farmacia/IndexFarmacyPage.vue"),
      },
      {
        path: "coberturafr",
        name: "coberturafr",
        component: () => import("src/pages/Farmacia/CoveragePage.vue"),
      },
      {
        path: "dispensacionfr",
        name: "dispensacionfr",
        component: () => import("src/pages/Farmacia/DispensationPage.vue"),
      },
      {
        path: "lotefr",
        name: "lotefr",
        component: () => import("src/pages/Farmacia/LotePage.vue"),
      },
      {
        path: "donacionfr",
        name: "donacionfr",
        component: () => import("src/pages/Farmacia/DonationsPage.vue"),
      },
      {
        path: "enviada",
        name: "enviada",
        component: () => import("src/pages/Farmacia/SolicitudrecibidaPage.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/AdministratorLayout.vue"),
    children: [
      {
        path: "dashboard",
        component: () => import("src/pages/Admin/DashboardPage.vue"),
      },
      {
        path: "users",
        component: () => import("src/pages/Admin/TableUsersPage.vue"),
      },
      {
        path: "test",
        name: "test",
        component: () => import("src/pages/Admin/TestPage.vue"),
      },
      {
        path: "salva",
        name: "salva",
        component: () => import("src/pages/Admin/BackupPage.vue"),
      },
    ],
  },
  {
    path: "/",
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("src/pages/Admin/LoginPage.vue"),
      },
      {
        path: "register",
        name: "register",
        component: () => import("src/pages/admin/RegisterPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
