import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area, ComposedChart } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown, DollarSign, Building, Users, Shield, Wrench, Zap, Droplet, Briefcase, ChevronDown, ChevronUp, Info, AlertCircle, CheckCircle, Eye, Globe } from 'lucide-react';

// Exchange rate (average 2023)
const MXN_TO_USD = 17.5;

// Color palette inspired by Paraiso Residences - coastal luxury
const colors = {
  primary: '#0D4F6E',
  secondary: '#1A7BA8',
  accent: '#2DD4BF',
  warning: '#F59E0B',
  danger: '#EF4444',
  success: '#10B981',
  neutral: '#64748B',
  light: '#F1F5F9',
  gold: '#D4AF37',
  sand: '#E7D5C5',
  white: '#FFFFFF',
};

const chartColors = ['#0D4F6E', '#1A7BA8', '#2DD4BF', '#F59E0B', '#10B981', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6', '#F97316'];

// Translations
const translations = {
  en: {
    // Header
    title: 'The Paraíso Residences',
    subtitle: 'Administradora de Inmuebles Paraíso, A.C. • Marina Cabo San Lucas',
    dashboardTitle: 'HOA Financial Analysis Dashboard',
    year: 'Year',
    currency: 'Currency',
    language: 'Language',
    
    // Navigation
    overview: 'Overview',
    budgetAnalysis: 'Budget Analysis',
    forensicInsights: 'Forensic Insights',
    collections: 'Collections',
    
    // Metrics
    totalIncome: 'Total Income',
    totalExpenses: 'Total Expenses',
    netResult: 'Net Result',
    outstandingAR: 'Outstanding A/R',
    totalBudget: 'Total Budget',
    totalExecuted: 'Total Executed',
    netVariance: 'Net Variance',
    underBudget: 'Under Budget',
    overBudget: 'Over Budget',
    
    // Spanish subtitles
    ingresosTotales: 'Ingresos Totales',
    gastosTotales: 'Gastos Totales',
    resultadoNeto: 'Resultado Neto',
    cuentasPorCobrar: 'Cuentas por Cobrar',
    presupuestoTotal: 'Presupuesto Total 2023',
    gastosEjecutados: 'Gastos Ejecutados 2023',
    
    // Charts
    expenseDistribution: 'Expense Distribution',
    distribucionGastos: 'Distribución de Gastos',
    monthlyExpensesBudget: 'Monthly Expenses vs Budget',
    gastosMensuales: 'Gastos Mensuales vs Presupuesto',
    budgetVsActualCategory: 'Budget vs Actual by Category',
    detailedBudgetAnalysis: 'Detailed Budget Analysis',
    
    // Balance Sheet
    balanceSheetSummary: 'Balance Sheet Summary',
    posicionFinanciera: 'Posición Financiera al 31/Dic/2023',
    assets: 'Assets',
    activos: 'Activos',
    liabilities: 'Liabilities',
    pasivos: 'Pasivos',
    equity: 'Equity',
    capital: 'Capital',
    totalAssets: 'Total Assets',
    totalLiabilities: 'Total Liabilities',
    totalEquity: 'Total Equity',
    cashBank: 'Cash & Bank',
    efectivo: 'Efectivo',
    accountsReceivable: 'Accounts Receivable',
    clientes: 'Clientes',
    prepaid: 'Prepaid',
    pagosAnticipados: 'Pagos Anticipados',
    fixedAssets: 'Fixed Assets',
    activoFijo: 'Activo Fijo',
    accountsPayable: 'Accounts Payable',
    proveedores: 'Proveedores',
    longTermDebt: 'Long-Term Debt',
    largoPlazo: 'Largo Plazo',
    retainedEarnings: 'Retained Earnings',
    currentYearResult: 'Current Year Result',
    
    // Table headers
    category: 'Category',
    categoria: 'Categoría',
    budget: 'Budget',
    actual: 'Actual',
    variance: 'Variance',
    status: 'Status',
    over: 'OVER',
    under: 'UNDER',
    onBudget: 'ON BUDGET',
    
    // Forensic
    forensicAccountingAnalysis: 'Forensic Accounting Analysis',
    forensicDescription: 'This section provides an in-depth forensic analysis of the HOA\'s financial statements, identifying areas of concern, budget variances, and recommendations for improved financial management. Analysis is based on the 2023 fiscal year data.',
    highPriority: 'High Priority',
    mediumPriority: 'Medium Priority',
    lowPriority: 'Low Priority',
    informational: 'Informational',
    findingDetails: 'Finding Details',
    recommendation: 'Recommendation',
    
    // Collections
    totalOutstanding: 'Total Outstanding',
    cuentasPorCobrarTotales: 'Cuentas por Cobrar Totales',
    hoaFeesOutstanding: 'HOA Fees Outstanding',
    cuotasMantenimiento: 'Cuotas de Mantenimiento',
    delinquentUnits: 'Delinquent Units',
    unitsWithOutstanding: 'Units with Outstanding HOA Fees',
    outstandingFeesByUnit: 'Outstanding Fees by Unit',
    cuotasPendientes: 'Cuotas Pendientes por Unidad',
    unit: 'Unit',
    hoaFees: 'HOA Fees',
    extraordinary: 'Extraordinary',
    waterFees: 'Water Fees',
    total: 'Total',
    priority: 'Priority',
    high: 'HIGH',
    medium: 'MEDIUM',
    low: 'LOW',
    
    // Collection Risk
    collectionRiskAlert: 'Collection Risk Alert',
    collectionRiskDescription: 'represents a significant concentration risk, accounting for',
    ofTotalReceivables: 'of total outstanding receivables',
    thisUnitOwes: 'This unit owes',
    inHOAFees: 'in HOA fees',
    inExtraordinaryFees: 'in extraordinary fees, and',
    inWaterFees: 'in water fees.',
    unitTotal: 'Unit 1105 Total',
    ofTotalAR: '% of Total A/R',
    recommendedAction: 'Recommended Action',
    immediateCollection: 'Immediate Collection',
    
    // Footer
    financialDashboard: 'HOA Financial Dashboard',
    dataAsOf: 'Data as of December 31, 2023',
    exchangeRate: 'Exchange Rate',
    avg2023: '(2023 Avg)',
    
    // Misc
    others: 'Others',
  },
  es: {
    // Header
    title: 'The Paraíso Residences',
    subtitle: 'Administradora de Inmuebles Paraíso, A.C. • Marina Cabo San Lucas',
    dashboardTitle: 'Panel de Análisis Financiero HOA',
    year: 'Año',
    currency: 'Moneda',
    language: 'Idioma',
    
    // Navigation
    overview: 'Resumen',
    budgetAnalysis: 'Análisis Presupuestal',
    forensicInsights: 'Análisis Forense',
    collections: 'Cobranza',
    
    // Metrics
    totalIncome: 'Ingresos Totales',
    totalExpenses: 'Gastos Totales',
    netResult: 'Resultado Neto',
    outstandingAR: 'Cuentas por Cobrar',
    totalBudget: 'Presupuesto Total',
    totalExecuted: 'Total Ejecutado',
    netVariance: 'Variación Neta',
    underBudget: 'Bajo Presupuesto',
    overBudget: 'Sobre Presupuesto',
    
    // Spanish subtitles (same in Spanish)
    ingresosTotales: 'Total Income',
    gastosTotales: 'Total Expenses',
    resultadoNeto: 'Net Result',
    cuentasPorCobrar: 'Accounts Receivable',
    presupuestoTotal: 'Total Budget 2023',
    gastosEjecutados: 'Executed Expenses 2023',
    
    // Charts
    expenseDistribution: 'Distribución de Gastos',
    distribucionGastos: 'Expense Distribution',
    monthlyExpensesBudget: 'Gastos Mensuales vs Presupuesto',
    gastosMensuales: 'Monthly Expenses vs Budget',
    budgetVsActualCategory: 'Presupuesto vs Real por Categoría',
    detailedBudgetAnalysis: 'Análisis Detallado del Presupuesto',
    
    // Balance Sheet
    balanceSheetSummary: 'Resumen de Posición Financiera',
    posicionFinanciera: 'Balance Sheet as of Dec 31, 2023',
    assets: 'Activos',
    activos: 'Assets',
    liabilities: 'Pasivos',
    pasivos: 'Liabilities',
    equity: 'Capital',
    capital: 'Equity',
    totalAssets: 'Total Activos',
    totalLiabilities: 'Total Pasivos',
    totalEquity: 'Total Capital',
    cashBank: 'Efectivo y Bancos',
    efectivo: 'Cash & Bank',
    accountsReceivable: 'Cuentas por Cobrar',
    clientes: 'Accounts Receivable',
    prepaid: 'Pagos Anticipados',
    pagosAnticipados: 'Prepaid',
    fixedAssets: 'Activo Fijo',
    activoFijo: 'Fixed Assets',
    accountsPayable: 'Proveedores',
    proveedores: 'Accounts Payable',
    longTermDebt: 'Deuda a Largo Plazo',
    largoPlazo: 'Long-Term Debt',
    retainedEarnings: 'Resultados Acumulados',
    currentYearResult: 'Resultado del Ejercicio',
    
    // Table headers
    category: 'Categoría',
    categoria: 'Category',
    budget: 'Presupuesto',
    actual: 'Real',
    variance: 'Variación',
    status: 'Estado',
    over: 'EXCEDIDO',
    under: 'AHORRO',
    onBudget: 'EN PRESUPUESTO',
    
    // Forensic
    forensicAccountingAnalysis: 'Análisis Contable Forense',
    forensicDescription: 'Esta sección proporciona un análisis forense profundo de los estados financieros del HOA, identificando áreas de preocupación, variaciones presupuestales y recomendaciones para mejorar la gestión financiera. El análisis se basa en los datos del año fiscal 2023.',
    highPriority: 'Alta Prioridad',
    mediumPriority: 'Prioridad Media',
    lowPriority: 'Baja Prioridad',
    informational: 'Informativo',
    findingDetails: 'Detalles del Hallazgo',
    recommendation: 'Recomendación',
    
    // Collections
    totalOutstanding: 'Total Pendiente',
    cuentasPorCobrarTotales: 'Total Outstanding',
    hoaFeesOutstanding: 'Cuotas HOA Pendientes',
    cuotasMantenimiento: 'HOA Fees Outstanding',
    delinquentUnits: 'Unidades Morosas',
    unitsWithOutstanding: 'Unidades con Cuotas Pendientes',
    outstandingFeesByUnit: 'Cuotas Pendientes por Unidad',
    cuotasPendientes: 'Outstanding Fees by Unit',
    unit: 'Unidad',
    hoaFees: 'Cuotas HOA',
    extraordinary: 'Extraordinarias',
    waterFees: 'Cuota Agua',
    total: 'Total',
    priority: 'Prioridad',
    high: 'ALTA',
    medium: 'MEDIA',
    low: 'BAJA',
    
    // Collection Risk
    collectionRiskAlert: 'Alerta de Riesgo de Cobranza',
    collectionRiskDescription: 'representa un riesgo de concentración significativo, representando',
    ofTotalReceivables: 'del total de cuentas por cobrar',
    thisUnitOwes: 'Esta unidad debe',
    inHOAFees: 'en cuotas HOA',
    inExtraordinaryFees: 'en cuotas extraordinarias, y',
    inWaterFees: 'en cuotas de agua.',
    unitTotal: 'Total Unidad 1105',
    ofTotalAR: '% del Total C×C',
    recommendedAction: 'Acción Recomendada',
    immediateCollection: 'Cobranza Inmediata',
    
    // Footer
    financialDashboard: 'Panel Financiero HOA',
    dataAsOf: 'Datos al 31 de Diciembre de 2023',
    exchangeRate: 'Tipo de Cambio',
    avg2023: '(Promedio 2023)',
    
    // Misc
    others: 'Otros',
  }
};

// Forensic findings with translations
const getForensicFindings = (lang) => [
  {
    severity: 'high',
    category: lang === 'en' ? 'Budget Variance' : 'Variación Presupuestal',
    title: lang === 'en' 
      ? 'Other Expenses exceeded budget by 246%'
      : 'Otros Gastos excedieron el presupuesto en 246%',
    description: lang === 'en'
      ? 'Other expenses totaled $345,845 MXN against a budget of $100,000 MXN. This $245,845 overrun requires detailed itemization and justification.'
      : 'Los otros gastos totalizaron $345,845 MXN contra un presupuesto de $100,000 MXN. Este exceso de $245,845 requiere desglose detallado y justificación.',
    recommendation: lang === 'en'
      ? 'Request detailed breakdown of all items categorized as "Other Expenses". Establish stricter expense categorization policies.'
      : 'Solicitar desglose detallado de todos los conceptos categorizados como "Otros Gastos". Establecer políticas más estrictas de categorización de gastos.',
    amount: -245845.19,
  },
  {
    severity: 'high',
    category: lang === 'en' ? 'Cash Flow' : 'Flujo de Efectivo',
    title: lang === 'en'
      ? 'Significant accounts receivable concentration'
      : 'Concentración significativa de cuentas por cobrar',
    description: lang === 'en'
      ? 'Unit 1105 owes $21,452.81 USD (70% of total A/R), including $19,960 in HOA fees and $1,050 in extraordinary fees. This concentration risk threatens cash flow stability.'
      : 'La Unidad 1105 debe $21,452.81 USD (70% del total de C×C), incluyendo $19,960 en cuotas HOA y $1,050 en cuotas extraordinarias. Este riesgo de concentración amenaza la estabilidad del flujo de efectivo.',
    recommendation: lang === 'en'
      ? 'Implement immediate collection procedures for Unit 1105. Consider legal action or late fee penalties per HOA bylaws.'
      : 'Implementar procedimientos de cobranza inmediata para la Unidad 1105. Considerar acción legal o penalizaciones por mora según los estatutos del HOA.',
    amount: 21452.81,
    isUSD: true,
  },
  {
    severity: 'medium',
    category: lang === 'en' ? 'Operating Loss' : 'Pérdida Operativa',
    title: lang === 'en'
      ? 'Net operating loss of $769,200 MXN'
      : 'Pérdida operativa neta de $769,200 MXN',
    description: lang === 'en'
      ? 'Total expenses exceeded income by $769,200 MXN (9.4% deficit). The organization spent more than it earned despite being budgeted for a surplus.'
      : 'Los gastos totales excedieron los ingresos por $769,200 MXN (déficit del 9.4%). La organización gastó más de lo que ganó a pesar de tener presupuestado un superávit.',
    recommendation: lang === 'en'
      ? 'Review fee structure adequacy. Consider extraordinary assessment or dues increase for 2024.'
      : 'Revisar la adecuación de la estructura de cuotas. Considerar una cuota extraordinaria o aumento de cuotas para 2024.',
    amount: -769200,
  },
  {
    severity: 'medium',
    category: lang === 'en' ? 'Budget Variance' : 'Variación Presupuestal',
    title: lang === 'en'
      ? 'January and July expenses significantly over budget'
      : 'Gastos de Enero y Julio significativamente sobre presupuesto',
    description: lang === 'en'
      ? 'January exceeded budget by $597,720 (88% over) primarily due to insurance premium timing. July exceeded by $447,200 (60% over) due to insurance and irregular expenses.'
      : 'Enero excedió el presupuesto por $597,720 (88% arriba) principalmente por el momento del pago de la póliza de seguro. Julio excedió por $447,200 (60% arriba) debido al seguro y gastos irregulares.',
    recommendation: lang === 'en'
      ? 'Adjust monthly budget to reflect insurance payment timing. Smooth large payments across fiscal year.'
      : 'Ajustar el presupuesto mensual para reflejar el momento de pago del seguro. Distribuir pagos grandes a lo largo del año fiscal.',
    amount: -1044920,
  },
  {
    severity: 'medium',
    category: lang === 'en' ? 'Maintenance' : 'Mantenimiento',
    title: lang === 'en'
      ? 'Elevator maintenance 27% over budget'
      : 'Mantenimiento de elevador 27% sobre presupuesto',
    description: lang === 'en'
      ? 'Elevator maintenance costs reached $207,945 vs $180,000 budget. Recurring unplanned repairs suggest equipment aging or maintenance quality issues.'
      : 'Los costos de mantenimiento del elevador alcanzaron $207,945 vs $180,000 presupuestados. Las reparaciones recurrentes no planificadas sugieren envejecimiento del equipo o problemas de calidad de mantenimiento.',
    recommendation: lang === 'en'
      ? 'Evaluate elevator service contract. Consider equipment assessment and potential capital improvement reserve.'
      : 'Evaluar el contrato de servicio del elevador. Considerar una evaluación del equipo y una potencial reserva para mejoras de capital.',
    amount: -27945.02,
  },
  {
    severity: 'medium',
    category: lang === 'en' ? 'Utilities' : 'Servicios',
    title: lang === 'en'
      ? 'Electricity costs 8.4% over budget'
      : 'Costos de electricidad 8.4% sobre presupuesto',
    description: lang === 'en'
      ? 'Electricity expenses totaled $368,918 against $340,200 budget. Consistent overage suggests rates increased or consumption grew.'
      : 'Los gastos de electricidad totalizaron $368,918 contra $340,200 presupuestados. El exceso consistente sugiere que las tarifas aumentaron o el consumo creció.',
    recommendation: lang === 'en'
      ? 'Conduct energy audit of common areas. Evaluate LED upgrades and timer systems for lights.'
      : 'Realizar auditoría energética de áreas comunes. Evaluar actualización a LED y sistemas de temporizadores para luces.',
    amount: -28718,
  },
  {
    severity: 'low',
    category: lang === 'en' ? 'Positive Variance' : 'Variación Positiva',
    title: lang === 'en'
      ? 'Payroll under budget by $687,219'
      : 'Nómina bajo presupuesto por $687,219',
    description: lang === 'en'
      ? 'Personnel costs were 14% under budget, saving significant funds. May indicate understaffing or vacant positions.'
      : 'Los costos de personal estuvieron 14% bajo presupuesto, ahorrando fondos significativos. Puede indicar falta de personal o posiciones vacantes.',
    recommendation: lang === 'en'
      ? 'Verify staffing levels meet operational needs. Reallocate savings to cover other overages.'
      : 'Verificar que los niveles de personal cumplan con las necesidades operativas. Reasignar ahorros para cubrir otros excesos.',
    amount: 687219.47,
  },
  {
    severity: 'low',
    category: lang === 'en' ? 'Positive Variance' : 'Variación Positiva',
    title: lang === 'en'
      ? 'Bank fees significantly under budget'
      : 'Comisiones bancarias significativamente bajo presupuesto',
    description: lang === 'en'
      ? 'Bank commissions totaled $116,460 against $180,000 budget - 35% savings.'
      : 'Las comisiones bancarias totalizaron $116,460 contra $180,000 presupuestados - 35% de ahorro.',
    recommendation: lang === 'en'
      ? 'Continue current banking arrangements. Bank fee savings can offset other variances.'
      : 'Continuar con los arreglos bancarios actuales. Los ahorros en comisiones pueden compensar otras variaciones.',
    amount: 63540.11,
  },
  {
    severity: 'info',
    category: lang === 'en' ? 'Balance Sheet' : 'Balance General',
    title: lang === 'en'
      ? 'Strong liquidity position despite operating loss'
      : 'Posición de liquidez sólida a pesar de pérdida operativa',
    description: lang === 'en'
      ? 'Cash and bank balances of $2.19M MXN with quick ratio of approximately 2.2. Organization can meet short-term obligations.'
      : 'Saldo en efectivo y bancos de $2.19M MXN con razón rápida de aproximadamente 2.2. La organización puede cumplir con obligaciones a corto plazo.',
    recommendation: lang === 'en'
      ? 'Maintain reserves while addressing collection of receivables and expense control.'
      : 'Mantener reservas mientras se atiende la cobranza de cuentas por cobrar y el control de gastos.',
    amount: 2191119.19,
  },
  {
    severity: 'info',
    category: lang === 'en' ? 'Compliance' : 'Cumplimiento',
    title: lang === 'en'
      ? 'Tax compliant - No ISR due'
      : 'Cumplimiento fiscal - Sin ISR a pagar',
    description: lang === 'en'
      ? 'As a non-profit (AC), the organization properly filed Form F21 with no tax liability due to fiscal loss.'
      : 'Como asociación civil (AC), la organización presentó correctamente el formulario F21 sin responsabilidad fiscal debido a la pérdida fiscal.',
    recommendation: lang === 'en'
      ? 'Maintain documentation of fiscal loss for potential future offset against positive results.'
      : 'Mantener documentación de la pérdida fiscal para posible compensación futura contra resultados positivos.',
    amount: 0,
  },
];

// Financial data from the documents (2023)
const financialData = {
  2023: {
    summary: {
      totalIncome: 8212347,
      totalExpenses: 8981547,
      netResult: -769200,
      interestIncome: 234772,
      otherIncome: 7977575,
    },
    balanceSheet: {
      totalAssets: 3950114.99,
      totalLiabilities: 3136181.95,
      equity: 813933.04,
      cashAndBank: 2191119.19,
      accountsReceivable: 557547.66,
      prepaidExpenses: 1094052.63,
      fixedAssets: 97732.59,
      accountsPayable: 1094068.46,
      longTermDebt: 1869989.73,
    },
    cashFlowUSD: {
      bankBalance: 18931.36,
      accountsReceivable: 30687.95,
      initialCapital: 105000,
      remainingBalance: 49619.31,
    },
    monthlyExpenses: [
      { month: 'Ene', monthEn: 'Jan', budget: 680000, actual: 1277719.93, variance: -597719.93 },
      { month: 'Feb', monthEn: 'Feb', budget: 680000, actual: 479610.72, variance: 200389.28 },
      { month: 'Mar', monthEn: 'Mar', budget: 680000, actual: 597178.60, variance: 82821.40 },
      { month: 'Abr', monthEn: 'Apr', budget: 680000, actual: 581539.66, variance: 98460.34 },
      { month: 'May', monthEn: 'May', budget: 680000, actual: 628565.34, variance: 51434.66 },
      { month: 'Jun', monthEn: 'Jun', budget: 680000, actual: 496074.46, variance: 183925.54 },
      { month: 'Jul', monthEn: 'Jul', budget: 745213.73, actual: 1192413.98, variance: -447200.25 },
      { month: 'Ago', monthEn: 'Aug', budget: 745213.73, actual: 541879.66, variance: 203334.07 },
      { month: 'Sep', monthEn: 'Sep', budget: 745213.73, actual: 616480.88, variance: 128732.85 },
      { month: 'Oct', monthEn: 'Oct', budget: 745213.73, actual: 494863.27, variance: 250350.46 },
      { month: 'Nov', monthEn: 'Nov', budget: 745213.73, actual: 748367.28, variance: -3153.55 },
      { month: 'Dic', monthEn: 'Dec', budget: 745213.73, actual: 693450.08, variance: 51763.65 },
    ],
    expenseCategories: [
      { categoryEn: 'Payroll', categoryEs: 'Nómina', budgeted: 4859451.21, actual: 4172231.74, variance: 687219.47, icon: Users },
      { categoryEn: 'Insurance', categoryEs: 'Seguro', budgeted: 1148853.82, actual: 1090047.12, variance: 58806.70, icon: Shield },
      { categoryEn: 'Office Rent', categoryEs: 'Renta Oficina', budgeted: 584640.00, actual: 493120.90, variance: 91519.10, icon: Building },
      { categoryEn: 'Water', categoryEs: 'Agua', budgeted: 504000.00, actual: 468672.48, variance: 35327.52, icon: Droplet },
      { categoryEn: 'Electricity', categoryEs: 'Electricidad', budgeted: 340200.00, actual: 368918.00, variance: -28718.00, icon: Zap },
      { categoryEn: 'Other Expenses', categoryEs: 'Otros Gastos', budgeted: 100000.00, actual: 345845.19, variance: -245845.19, icon: Briefcase },
      { categoryEn: 'Garden', categoryEs: 'Jardinería', budgeted: 269200.00, actual: 288425.39, variance: -19225.39, icon: Building },
      { categoryEn: 'Staff Meals', categoryEs: 'Alimentos Personal', budgeted: 216000.00, actual: 232690.05, variance: -16690.05, icon: Users },
      { categoryEn: 'Elevator', categoryEs: 'Elevador', budgeted: 180000.00, actual: 207945.02, variance: -27945.02, icon: Building },
      { categoryEn: 'Bank Fees', categoryEs: 'Comisiones Bancarias', budgeted: 180000.00, actual: 116459.89, variance: 63540.11, icon: DollarSign },
      { categoryEn: 'Fumigation', categoryEs: 'Fumigación', budgeted: 150336.00, actual: 150336.00, variance: 0, icon: Shield },
      { categoryEn: 'Maintenance', categoryEs: 'Mantenimiento', budgeted: 29900.00, actual: 81193.97, variance: -51293.97, icon: Wrench },
      { categoryEn: 'Garbage', categoryEs: 'Basura', budgeted: 68600.00, actual: 67369.00, variance: 1231.00, icon: Building },
      { categoryEn: 'Uniforms', categoryEs: 'Uniformes', budgeted: 63880.00, actual: 59073.75, variance: 4806.25, icon: Users },
      { categoryEn: 'Telephone', categoryEs: 'Teléfono', budgeted: 52628.00, actual: 34614.00, variance: 18014.00, icon: Building },
      { categoryEn: 'Office Supplies', categoryEs: 'Papelería', budgeted: 35000.00, actual: 38925.30, variance: -3925.30, icon: Briefcase },
      { categoryEn: 'Cleaning Supplies', categoryEs: 'Limpieza', budgeted: 35000.00, actual: 36390.34, variance: -1390.34, icon: Building },
      { categoryEn: 'Year End', categoryEs: 'Fin de Año', budgeted: 17000.00, actual: 25975.40, variance: -8975.40, icon: Briefcase },
      { categoryEn: 'Printing', categoryEs: 'Impresión', budgeted: 24000.00, actual: 20660.99, variance: 3339.01, icon: Briefcase },
      { categoryEn: 'Tech Support', categoryEs: 'Soporte CONTPAQ', budgeted: 23850.75, actual: 19243.82, variance: 4606.93, icon: Wrench },
      { categoryEn: 'Tools', categoryEs: 'Herramientas', budgeted: 15000.00, actual: 9333.00, variance: 5667.00, icon: Wrench },
      { categoryEn: 'Training', categoryEs: 'Capacitación', budgeted: 12000.00, actual: 0, variance: 12000.00, icon: Users },
      { categoryEn: 'Licenses', categoryEs: 'Licencias', budgeted: 11025.00, actual: 7500.00, variance: 3525.00, icon: Shield },
      { categoryEn: 'Lobby Doors', categoryEs: 'Puertas Lobby', budgeted: 8000.00, actual: 6960.00, variance: 1040.00, icon: Building },
      { categoryEn: 'Hurricane Prep', categoryEs: 'Huracanes', budgeted: 5000.00, actual: 6212.51, variance: -1212.51, icon: AlertTriangle },
      { categoryEn: 'Notary', categoryEs: 'Notariales', budgeted: 6000.00, actual: 0, variance: 6000.00, icon: Briefcase },
      { categoryEn: 'Fountains', categoryEs: 'Fuentes', budgeted: 3000.00, actual: 0, variance: 3000.00, icon: Droplet },
    ],
    outstandingFees: [
      { unit: '1101', hoaFees: 2100, extraordinaryFees: 0, waterFees: 64.43 },
      { unit: '1105', hoaFees: 19960, extraordinaryFees: 1050, waterFees: 442.81 },
      { unit: '1113', hoaFees: 5274, extraordinaryFees: 0, waterFees: 50.11 },
      { unit: '1405', hoaFees: 1605, extraordinaryFees: 0, waterFees: 0 },
      { unit: '1117', hoaFees: 0, extraordinaryFees: 0, waterFees: 7.38 },
      { unit: '1201', hoaFees: 0, extraordinaryFees: 0, waterFees: 6.98 },
      { unit: '1309', hoaFees: 0, extraordinaryFees: 0, waterFees: 101.45 },
      { unit: '1400', hoaFees: 0, extraordinaryFees: 0, waterFees: 25.78 },
    ],
  }
};

// Format currency helper
const formatCurrency = (amount, currency = 'MXN', showSign = false) => {
  const isUSD = currency === 'USD';
  const value = isUSD ? amount / MXN_TO_USD : amount;
  const prefix = showSign && amount > 0 ? '+' : '';
  return `${prefix}$${Math.abs(value).toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })} ${currency}`;
};

// Severity badge component
const SeverityBadge = ({ severity, lang }) => {
  const styles = {
    high: { bg: '#FEE2E2', color: '#991B1B', labelEn: 'High Priority', labelEs: 'Alta Prioridad' },
    medium: { bg: '#FEF3C7', color: '#92400E', labelEn: 'Medium Priority', labelEs: 'Prioridad Media' },
    low: { bg: '#D1FAE5', color: '#065F46', labelEn: 'Low Priority', labelEs: 'Baja Prioridad' },
    info: { bg: '#DBEAFE', color: '#1E40AF', labelEn: 'Information', labelEs: 'Informativo' },
  };
  const style = styles[severity];
  return (
    <span style={{
      backgroundColor: style.bg,
      color: style.color,
      padding: '4px 12px',
      borderRadius: '9999px',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    }}>
      {lang === 'en' ? style.labelEn : style.labelEs}
    </span>
  );
};

// Main Dashboard Component
export default function ParaisoHOADashboard() {
  const [currency, setCurrency] = useState('MXN');
  const [selectedYear, setSelectedYear] = useState(2023);
  const [expandedFinding, setExpandedFinding] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [language, setLanguage] = useState('en');

  const t = translations[language];
  const data = financialData[selectedYear];
  const convertAmount = (amount) => currency === 'USD' ? amount / MXN_TO_USD : amount;
  const forensicFindings = getForensicFindings(language);

  // Get month name based on language
  const getMonthName = (m) => language === 'en' ? m.monthEn : m.month;

  // Prepare chart data
  const expenseBreakdown = useMemo(() => {
    const topExpenses = [...data.expenseCategories]
      .sort((a, b) => b.actual - a.actual)
      .slice(0, 8)
      .map(e => ({
        name: language === 'en' ? e.categoryEn : e.categoryEs,
        value: convertAmount(e.actual),
        fullName: `${e.categoryEn} / ${e.categoryEs}`,
      }));
    const othersTotal = data.expenseCategories
      .sort((a, b) => b.actual - a.actual)
      .slice(8)
      .reduce((sum, e) => sum + e.actual, 0);
    topExpenses.push({ name: t.others, value: convertAmount(othersTotal), fullName: 'Others / Otros' });
    return topExpenses;
  }, [data, currency, language, t.others]);

  const budgetVsActualData = useMemo(() => {
    return data.expenseCategories
      .filter(e => e.actual > 50000)
      .map(e => ({
        name: (language === 'en' ? e.categoryEn : e.categoryEs).substring(0, 12),
        budgeted: convertAmount(e.budgeted),
        actual: convertAmount(e.actual),
        variance: convertAmount(e.variance),
      }));
  }, [data, currency, language]);

  const totalBudget = data.expenseCategories.reduce((sum, e) => sum + e.budgeted, 0);
  const totalActual = data.expenseCategories.reduce((sum, e) => sum + e.actual, 0);
  const totalOutstandingUSD = data.outstandingFees.reduce((sum, u) => sum + u.hoaFees + u.extraordinaryFees + u.waterFees, 0);

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: colors.light,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      {/* Header */}
      <header style={{
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        color: 'white',
        padding: '24px 32px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <Building size={32} strokeWidth={1.5} />
                <h1 style={{ fontSize: '28px', fontWeight: '700', margin: 0, letterSpacing: '-0.02em' }}>
                  {t.title}
                </h1>
              </div>
              <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>
                {t.subtitle}
              </p>
              <p style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                {t.dashboardTitle} • RFC: AIP180215RP4
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Language Selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.05em' }}>{t.language}</label>
                <div style={{
                  display: 'flex',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '4px',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}>
                  {[
                    { code: 'en', label: 'EN', flag: '🇺🇸' },
                    { code: 'es', label: 'ES', flag: '🇲🇽' }
                  ].map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: language === lang.code ? 'white' : 'transparent',
                        color: language === lang.code ? colors.primary : 'white',
                        fontWeight: '600',
                        fontSize: '13px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>{lang.flag}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Year Selector */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.05em' }}>{t.year}</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  <option value={2023} style={{ color: colors.primary }}>2023</option>
                </select>
              </div>

              {/* Currency Toggle */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.05em' }}>{t.currency}</label>
                <div style={{
                  display: 'flex',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '4px',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}>
                  {['MXN', 'USD'].map(c => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      style={{
                        padding: '6px 16px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: currency === c ? 'white' : 'transparent',
                        color: currency === c ? colors.primary : 'white',
                        fontWeight: '600',
                        fontSize: '13px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav style={{
        backgroundColor: 'white',
        borderBottom: `1px solid ${colors.light}`,
        padding: '0 32px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', gap: '4px' }}>
          {[
            { id: 'overview', label: t.overview },
            { id: 'budget', label: t.budgetAnalysis },
            { id: 'forensic', label: t.forensicInsights },
            { id: 'collections', label: t.collections },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '16px 24px',
                border: 'none',
                backgroundColor: 'transparent',
                color: activeTab === tab.id ? colors.primary : colors.neutral,
                fontWeight: activeTab === tab.id ? '600' : '500',
                fontSize: '14px',
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? `3px solid ${colors.primary}` : '3px solid transparent',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 32px' }}>
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Key Metrics */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              marginBottom: '32px',
            }}>
              {[
                {
                  label: t.totalIncome,
                  value: formatCurrency(convertAmount(data.summary.totalIncome), currency),
                  sublabel: t.ingresosTotales,
                  icon: TrendingUp,
                  color: colors.success,
                },
                {
                  label: t.totalExpenses,
                  value: formatCurrency(convertAmount(data.summary.totalExpenses), currency),
                  sublabel: t.gastosTotales,
                  icon: TrendingDown,
                  color: colors.danger,
                },
                {
                  label: t.netResult,
                  value: formatCurrency(convertAmount(data.summary.netResult), currency, true),
                  sublabel: t.resultadoNeto,
                  icon: data.summary.netResult >= 0 ? TrendingUp : TrendingDown,
                  color: data.summary.netResult >= 0 ? colors.success : colors.danger,
                  highlight: true,
                },
                {
                  label: t.outstandingAR,
                  value: formatCurrency(currency === 'USD' ? totalOutstandingUSD : totalOutstandingUSD * MXN_TO_USD, currency),
                  sublabel: t.cuentasPorCobrar,
                  icon: AlertCircle,
                  color: colors.warning,
                },
              ].map((metric, i) => (
                <div key={i} style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  border: metric.highlight ? `2px solid ${metric.color}` : '1px solid #E2E8F0',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <p style={{ fontSize: '13px', color: colors.neutral, marginBottom: '8px', fontWeight: '500' }}>
                        {metric.label}
                      </p>
                      <p style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        color: metric.color,
                        margin: '0 0 4px 0',
                        letterSpacing: '-0.02em',
                      }}>
                        {metric.value}
                      </p>
                      <p style={{ fontSize: '11px', color: colors.neutral, opacity: 0.7, margin: 0 }}>
                        {metric.sublabel}
                      </p>
                    </div>
                    <div style={{
                      backgroundColor: `${metric.color}15`,
                      borderRadius: '12px',
                      padding: '12px',
                    }}>
                      <metric.icon size={24} color={metric.color} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              {/* Expense Breakdown Pie */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.primary, marginBottom: '20px' }}>
                  {t.expenseDistribution}
                  <span style={{ fontSize: '12px', color: colors.neutral, fontWeight: '400', marginLeft: '8px' }}>
                    ({t.distribucionGastos})
                  </span>
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={110}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={{ stroke: colors.neutral, strokeWidth: 1 }}
                    >
                      {expenseBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(value, currency)}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Monthly Trend */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.primary, marginBottom: '20px' }}>
                  {t.monthlyExpensesBudget}
                  <span style={{ fontSize: '12px', color: colors.neutral, fontWeight: '400', marginLeft: '8px' }}>
                    ({t.gastosMensuales})
                  </span>
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={data.monthlyExpenses.map(m => ({
                    ...m,
                    month: getMonthName(m),
                    budget: convertAmount(m.budget),
                    actual: convertAmount(m.actual),
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis 
                      tickFormatter={(v) => `${(v/1000).toFixed(0)}K`}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value) => formatCurrency(value, currency)}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                    />
                    <Legend />
                    <Bar dataKey="actual" name={t.actual} fill={colors.secondary} radius={[4, 4, 0, 0]} />
                    <Line dataKey="budget" name={t.budget} stroke={colors.warning} strokeWidth={2} dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Balance Sheet Summary */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              marginBottom: '32px',
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.primary, marginBottom: '20px' }}>
                {t.balanceSheetSummary}
                <span style={{ fontSize: '12px', color: colors.neutral, fontWeight: '400', marginLeft: '8px' }}>
                  ({t.posicionFinanciera})
                </span>
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                {/* Assets */}
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: colors.success, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {t.assets} ({t.activos})
                  </h4>
                  {[
                    { label: `${t.cashBank} / ${t.efectivo}`, value: data.balanceSheet.cashAndBank },
                    { label: `${t.accountsReceivable} / ${t.clientes}`, value: data.balanceSheet.accountsReceivable },
                    { label: `${t.prepaid} / ${t.pagosAnticipados}`, value: data.balanceSheet.prepaidExpenses },
                    { label: `${t.fixedAssets} / ${t.activoFijo}`, value: data.balanceSheet.fixedAssets },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #E2E8F0' }}>
                      <span style={{ fontSize: '13px', color: colors.neutral }}>{item.label}</span>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: colors.primary }}>
                        {formatCurrency(convertAmount(item.value), currency)}
                      </span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', marginTop: '8px', backgroundColor: `${colors.success}10`, borderRadius: '8px', paddingLeft: '12px', paddingRight: '12px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: colors.success }}>{t.totalAssets}</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: colors.success }}>
                      {formatCurrency(convertAmount(data.balanceSheet.totalAssets), currency)}
                    </span>
                  </div>
                </div>

                {/* Liabilities */}
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: colors.danger, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {t.liabilities} ({t.pasivos})
                  </h4>
                  {[
                    { label: `${t.accountsPayable} / ${t.proveedores}`, value: data.balanceSheet.accountsPayable },
                    { label: `${t.longTermDebt} / ${t.largoPlazo}`, value: data.balanceSheet.longTermDebt },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #E2E8F0' }}>
                      <span style={{ fontSize: '13px', color: colors.neutral }}>{item.label}</span>
                      <span style={{ fontSize: '13px', fontWeight: '600', color: colors.primary }}>
                        {formatCurrency(convertAmount(item.value), currency)}
                      </span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', marginTop: '8px', backgroundColor: `${colors.danger}10`, borderRadius: '8px', paddingLeft: '12px', paddingRight: '12px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: colors.danger }}>{t.totalLiabilities}</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: colors.danger }}>
                      {formatCurrency(convertAmount(data.balanceSheet.totalLiabilities), currency)}
                    </span>
                  </div>
                </div>

                {/* Equity */}
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '600', color: colors.primary, marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {t.equity} ({t.capital})
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '13px', color: colors.neutral }}>{t.retainedEarnings}</span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: colors.primary }}>
                      {formatCurrency(convertAmount(1583132.68), currency)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '13px', color: colors.neutral }}>{t.currentYearResult}</span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: colors.danger }}>
                      {formatCurrency(convertAmount(-769199.64), currency, true)}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', marginTop: '8px', backgroundColor: `${colors.primary}10`, borderRadius: '8px', paddingLeft: '12px', paddingRight: '12px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: colors.primary }}>{t.totalEquity}</span>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: colors.primary }}>
                      {formatCurrency(convertAmount(data.balanceSheet.equity), currency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Budget Analysis Tab */}
        {activeTab === 'budget' && (
          <>
            {/* Summary Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '32px',
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #E2E8F0',
              }}>
                <p style={{ fontSize: '13px', color: colors.neutral, marginBottom: '8px' }}>{t.totalBudget}</p>
                <p style={{ fontSize: '32px', fontWeight: '700', color: colors.primary, margin: 0 }}>
                  {formatCurrency(convertAmount(totalBudget), currency)}
                </p>
                <p style={{ fontSize: '12px', color: colors.neutral, marginTop: '8px' }}>{t.presupuestoTotal}</p>
              </div>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: '1px solid #E2E8F0',
              }}>
                <p style={{ fontSize: '13px', color: colors.neutral, marginBottom: '8px' }}>{t.totalExecuted}</p>
                <p style={{ fontSize: '32px', fontWeight: '700', color: colors.secondary, margin: 0 }}>
                  {formatCurrency(convertAmount(totalActual), currency)}
                </p>
                <p style={{ fontSize: '12px', color: colors.neutral, marginTop: '8px' }}>{t.gastosEjecutados}</p>
              </div>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: `2px solid ${totalBudget - totalActual >= 0 ? colors.success : colors.danger}`,
              }}>
                <p style={{ fontSize: '13px', color: colors.neutral, marginBottom: '8px' }}>{t.netVariance}</p>
                <p style={{ 
                  fontSize: '32px', 
                  fontWeight: '700', 
                  color: totalBudget - totalActual >= 0 ? colors.success : colors.danger, 
                  margin: 0 
                }}>
                  {formatCurrency(convertAmount(totalBudget - totalActual), currency, true)}
                </p>
                <p style={{ fontSize: '12px', color: colors.neutral, marginTop: '8px' }}>
                  {((totalBudget - totalActual) / totalBudget * 100).toFixed(1)}% {totalBudget - totalActual >= 0 ? t.underBudget : t.overBudget}
                </p>
              </div>
            </div>

            {/* Budget vs Actual Chart */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              marginBottom: '32px',
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.primary, marginBottom: '20px' }}>
                {t.budgetVsActualCategory}
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={budgetVsActualData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis type="number" tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
                  <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(value) => formatCurrency(value, currency)}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                  />
                  <Legend />
                  <Bar dataKey="budgeted" name={t.budget} fill={colors.neutral} radius={[0, 4, 4, 0]} />
                  <Bar dataKey="actual" name={t.actual} fill={colors.secondary} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Table */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.primary, marginBottom: '20px' }}>
                {t.detailedBudgetAnalysis}
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: colors.light }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: colors.primary }}>{t.category} / {t.categoria}</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: colors.primary }}>{t.budget}</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: colors.primary }}>{t.actual}</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: colors.primary }}>{t.variance}</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: colors.primary }}>{t.status}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.expenseCategories
                      .sort((a, b) => b.actual - a.actual)
                      .map((exp, i) => {
                        const variance = exp.variance;
                        const variancePct = exp.budgeted > 0 ? (variance / exp.budgeted * 100) : 0;
                        const isOver = variance < 0;
                        return (
                          <tr key={i} style={{ borderBottom: '1px solid #E2E8F0' }}>
                            <td style={{ padding: '12px 16px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <exp.icon size={16} color={colors.neutral} />
                                {exp.categoryEn} / {exp.categoryEs}
                              </div>
                            </td>
                            <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace' }}>
                              {formatCurrency(convertAmount(exp.budgeted), currency)}
                            </td>
                            <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace' }}>
                              {formatCurrency(convertAmount(exp.actual), currency)}
                            </td>
                            <td style={{ 
                              padding: '12px 16px', 
                              textAlign: 'right', 
                              fontFamily: 'monospace',
                              color: isOver ? colors.danger : colors.success,
                              fontWeight: '600',
                            }}>
                              {formatCurrency(convertAmount(variance), currency, true)}
                              <span style={{ fontSize: '11px', marginLeft: '4px', opacity: 0.8 }}>
                                ({variancePct.toFixed(0)}%)
                              </span>
                            </td>
                            <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                              {isOver ? (
                                <span style={{ 
                                  backgroundColor: `${colors.danger}15`,
                                  color: colors.danger,
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  fontWeight: '600',
                                }}>{t.over}</span>
                              ) : variance === 0 ? (
                                <span style={{ 
                                  backgroundColor: `${colors.neutral}15`,
                                  color: colors.neutral,
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  fontWeight: '600',
                                }}>{t.onBudget}</span>
                              ) : (
                                <span style={{ 
                                  backgroundColor: `${colors.success}15`,
                                  color: colors.success,
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  fontWeight: '600',
                                }}>{t.under}</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Forensic Insights Tab */}
        {activeTab === 'forensic' && (
          <>
            <div style={{
              backgroundColor: `${colors.primary}10`,
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '32px',
              border: `1px solid ${colors.primary}30`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <Eye size={24} color={colors.primary} />
                <h2 style={{ fontSize: '20px', fontWeight: '700', color: colors.primary, margin: 0 }}>
                  {t.forensicAccountingAnalysis}
                </h2>
              </div>
              <p style={{ color: colors.neutral, fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
                {t.forensicDescription}
              </p>
            </div>

            {/* Findings Summary */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              marginBottom: '32px',
            }}>
              {[
                { severity: 'high', count: forensicFindings.filter(f => f.severity === 'high').length, label: t.highPriority },
                { severity: 'medium', count: forensicFindings.filter(f => f.severity === 'medium').length, label: t.mediumPriority },
                { severity: 'low', count: forensicFindings.filter(f => f.severity === 'low').length, label: t.lowPriority },
                { severity: 'info', count: forensicFindings.filter(f => f.severity === 'info').length, label: t.informational },
              ].map((item, i) => {
                const colorMap = { high: colors.danger, medium: colors.warning, low: colors.success, info: colors.secondary };
                return (
                  <div key={i} style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '20px',
                    textAlign: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    borderTop: `4px solid ${colorMap[item.severity]}`,
                  }}>
                    <p style={{ fontSize: '36px', fontWeight: '700', color: colorMap[item.severity], margin: '0 0 4px 0' }}>
                      {item.count}
                    </p>
                    <p style={{ fontSize: '12px', color: colors.neutral, margin: 0, fontWeight: '500' }}>{item.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Detailed Findings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {forensicFindings.map((finding, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    overflow: 'hidden',
                    border: expandedFinding === i ? `2px solid ${colors.secondary}` : '1px solid #E2E8F0',
                  }}
                >
                  <button
                    onClick={() => setExpandedFinding(expandedFinding === i ? null : i)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: 'none',
                      backgroundColor: 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                      <SeverityBadge severity={finding.severity} lang={language} />
                      <div>
                        <p style={{ fontSize: '11px', color: colors.neutral, margin: '0 0 4px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          {finding.category}
                        </p>
                        <h4 style={{ fontSize: '15px', fontWeight: '600', color: colors.primary, margin: 0 }}>
                          {finding.title}
                        </h4>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      {finding.amount !== 0 && (
                        <span style={{
                          fontSize: '16px',
                          fontWeight: '700',
                          color: finding.amount >= 0 ? colors.success : colors.danger,
                        }}>
                          {formatCurrency(
                            finding.isUSD ? (currency === 'USD' ? finding.amount : finding.amount * MXN_TO_USD) : convertAmount(finding.amount),
                            currency,
                            true
                          )}
                        </span>
                      )}
                      {expandedFinding === i ? <ChevronUp size={20} color={colors.neutral} /> : <ChevronDown size={20} color={colors.neutral} />}
                    </div>
                  </button>
                  
                  {expandedFinding === i && (
                    <div style={{
                      padding: '0 24px 24px 24px',
                      borderTop: '1px solid #E2E8F0',
                    }}>
                      <div style={{ paddingTop: '20px' }}>
                        <div style={{ marginBottom: '16px' }}>
                          <h5 style={{ fontSize: '12px', fontWeight: '600', color: colors.neutral, marginBottom: '8px', textTransform: 'uppercase' }}>
                            {t.findingDetails}
                          </h5>
                          <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', margin: 0 }}>
                            {finding.description}
                          </p>
                        </div>
                        <div style={{
                          backgroundColor: `${colors.accent}10`,
                          borderRadius: '8px',
                          padding: '16px',
                          borderLeft: `4px solid ${colors.accent}`,
                        }}>
                          <h5 style={{ fontSize: '12px', fontWeight: '600', color: colors.primary, marginBottom: '8px', textTransform: 'uppercase' }}>
                            {t.recommendation}
                          </h5>
                          <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', margin: 0 }}>
                            {finding.recommendation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Collections Tab */}
        {activeTab === 'collections' && (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '32px',
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                border: `2px solid ${colors.warning}`,
              }}>
                <p style={{ fontSize: '13px', color: colors.neutral, marginBottom: '8px' }}>{t.totalOutstanding}</p>
                <p style={{ fontSize: '32px', fontWeight: '700', color: colors.warning, margin: 0 }}>
                  {formatCurrency(currency === 'USD' ? totalOutstandingUSD : totalOutstandingUSD * MXN_TO_USD, currency)}
                </p>
                <p style={{ fontSize: '12px', color: colors.neutral, marginTop: '8px' }}>{t.cuentasPorCobrarTotales}</p>
              </div>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}>
                <p style={{ fontSize: '13px', color: colors.neutral, marginBottom: '8px' }}>{t.hoaFeesOutstanding}</p>
                <p style={{ fontSize: '32px', fontWeight: '700', color: colors.danger, margin: 0 }}>
                  {formatCurrency(currency === 'USD' ? 28939 : 28939 * MXN_TO_USD, currency)}
                </p>
                <p style={{ fontSize: '12px', color: colors.neutral, marginTop: '8px' }}>{t.cuotasMantenimiento}</p>
              </div>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}>
                <p style={{ fontSize: '13px', color: colors.neutral, marginBottom: '8px' }}>{t.delinquentUnits}</p>
                <p style={{ fontSize: '32px', fontWeight: '700', color: colors.primary, margin: 0 }}>
                  4
                </p>
                <p style={{ fontSize: '12px', color: colors.neutral, marginTop: '8px' }}>{t.unitsWithOutstanding}</p>
              </div>
            </div>

            {/* Outstanding Fees Table */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              marginBottom: '32px',
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.primary, marginBottom: '20px' }}>
                {t.outstandingFeesByUnit}
                <span style={{ fontSize: '12px', color: colors.neutral, fontWeight: '400', marginLeft: '8px' }}>
                  ({t.cuotasPendientes})
                </span>
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: colors.light }}>
                      <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: '600', color: colors.primary }}>{t.unit}</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: colors.primary }}>{t.hoaFees}</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: colors.primary }}>{t.extraordinary}</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: colors.primary }}>{t.waterFees}</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right', fontWeight: '600', color: colors.primary }}>{t.total}</th>
                      <th style={{ padding: '12px 16px', textAlign: 'center', fontWeight: '600', color: colors.primary }}>{t.priority}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.outstandingFees
                      .map(u => ({ ...u, total: u.hoaFees + u.extraordinaryFees + u.waterFees }))
                      .sort((a, b) => b.total - a.total)
                      .map((unit, i) => {
                        const total = unit.total;
                        const convertedTotal = currency === 'USD' ? total : total * MXN_TO_USD;
                        const priority = total > 10000 ? 'HIGH' : total > 1000 ? 'MEDIUM' : 'LOW';
                        const priorityLabel = total > 10000 ? t.high : total > 1000 ? t.medium : t.low;
                        const priorityColor = priority === 'HIGH' ? colors.danger : priority === 'MEDIUM' ? colors.warning : colors.success;
                        
                        return (
                          <tr key={i} style={{ borderBottom: '1px solid #E2E8F0' }}>
                            <td style={{ padding: '12px 16px', fontWeight: '600' }}>
                              {t.unit} {unit.unit}
                            </td>
                            <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace' }}>
                              {formatCurrency(currency === 'USD' ? unit.hoaFees : unit.hoaFees * MXN_TO_USD, currency)}
                            </td>
                            <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace' }}>
                              {formatCurrency(currency === 'USD' ? unit.extraordinaryFees : unit.extraordinaryFees * MXN_TO_USD, currency)}
                            </td>
                            <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace' }}>
                              {formatCurrency(currency === 'USD' ? unit.waterFees : unit.waterFees * MXN_TO_USD, currency)}
                            </td>
                            <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace', fontWeight: '700', color: colors.primary }}>
                              {formatCurrency(convertedTotal, currency)}
                            </td>
                            <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                              {total > 0 && (
                                <span style={{ 
                                  backgroundColor: `${priorityColor}15`,
                                  color: priorityColor,
                                  padding: '4px 12px',
                                  borderRadius: '4px',
                                  fontSize: '11px',
                                  fontWeight: '600',
                                }}>{priorityLabel}</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                  <tfoot>
                    <tr style={{ backgroundColor: colors.light }}>
                      <td style={{ padding: '12px 16px', fontWeight: '700', color: colors.primary }}>TOTAL</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace', fontWeight: '700' }}>
                        {formatCurrency(currency === 'USD' ? 28939 : 28939 * MXN_TO_USD, currency)}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace', fontWeight: '700' }}>
                        {formatCurrency(currency === 'USD' ? 1050 : 1050 * MXN_TO_USD, currency)}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace', fontWeight: '700' }}>
                        {formatCurrency(currency === 'USD' ? 698.95 : 698.95 * MXN_TO_USD, currency)}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace', fontWeight: '700', color: colors.danger }}>
                        {formatCurrency(currency === 'USD' ? totalOutstandingUSD : totalOutstandingUSD * MXN_TO_USD, currency)}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Collection Risk Analysis */}
            <div style={{
              backgroundColor: `${colors.danger}05`,
              borderRadius: '16px',
              padding: '24px',
              border: `1px solid ${colors.danger}20`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <AlertTriangle size={24} color={colors.danger} />
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: colors.danger, margin: 0 }}>
                  {t.collectionRiskAlert}
                </h3>
              </div>
              <p style={{ color: colors.neutral, fontSize: '14px', lineHeight: '1.6', margin: '0 0 16px 0' }}>
                <strong>{t.unit} 1105</strong> {t.collectionRiskDescription} <strong>70% {t.ofTotalReceivables}</strong>. 
                {t.thisUnitOwes} $19,960 USD {t.inHOAFees}, $1,050 {t.inExtraordinaryFees} $442.81 {t.inWaterFees}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}>
                  <p style={{ fontSize: '12px', color: colors.neutral, marginBottom: '4px' }}>{t.unitTotal}</p>
                  <p style={{ fontSize: '20px', fontWeight: '700', color: colors.danger, margin: 0 }}>
                    {formatCurrency(currency === 'USD' ? 21452.81 : 21452.81 * MXN_TO_USD, currency)}
                  </p>
                </div>
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}>
                  <p style={{ fontSize: '12px', color: colors.neutral, marginBottom: '4px' }}>{t.ofTotalAR}</p>
                  <p style={{ fontSize: '20px', fontWeight: '700', color: colors.warning, margin: 0 }}>70%</p>
                </div>
                <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px' }}>
                  <p style={{ fontSize: '12px', color: colors.neutral, marginBottom: '4px' }}>{t.recommendedAction}</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: colors.primary, margin: 0 }}>{t.immediateCollection}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: colors.primary,
        color: 'white',
        padding: '24px 32px',
        marginTop: '48px',
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0' }}>
              {t.title} • Marina Cabo San Lucas
            </p>
            <p style={{ fontSize: '12px', opacity: 0.8, margin: 0 }}>
              {t.financialDashboard} • {t.dataAsOf}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '11px', opacity: 0.7, margin: 0 }}>
              {t.exchangeRate}: 1 USD = {MXN_TO_USD} MXN {t.avg2023}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
