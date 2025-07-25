// modules_data.ts
import {
  Megaphone, BarChart, Mail, Briefcase, Search, FileText, Bot, ClipboardList, Users,
  History, Contact, TrendingUp, CheckCircle, Workflow, Receipt, Calculator, FileBarChart,
  CheckSquare, Timer, Settings, Shield, Lock, CheckLine, Home, Wrench, CalendarCheck,
  AlertTriangle, Zap, Droplets
} from 'lucide-react';
import { Module } from '../types/module';




export const MODULES: Module[] = [
  {
    title: 'Marketing',
    mode: 'marketing',
    main_description: 'Drive campaigns and engagement',
    main_description_highlight: 'with smart automation.',
    sub_description: 'Grow your audience through automation and analytics.',
    animationPath: 'https://github.com/casas1010/front-end-animations/raw/refs/heads/main/marketing.lottie',
    gradient: '#2563eb',
    icon: Zap,
    color: 'bg-blue-600',
    details: [
      { icon: Megaphone, description: 'Targeted campaigns', iconColor: 'text-white', iconBg: 'bg-blue-600' },
      { icon: BarChart, description: 'Detailed analytics', iconColor: 'text-white', iconBg: 'bg-blue-700' },
      { icon: Mail, description: 'Automatic notifications', iconColor: 'text-white', iconBg: 'bg-blue-800' },
    ],
  },
  {
    title: 'Recruiting',
    mode: 'recruiting',

    main_description: 'Simplify hiring and screening',
    main_description_highlight: 'with powerful AI tools.',
    sub_description: 'Automate posting, tracking, and candidate evaluation.',
    animationPath: 'https://raw.githubusercontent.com/casas1010/front-end-animations/main/recruitment_management.lottie',
    gradient: '#9333ea',
    icon: FileText,
    color: 'bg-purple-600',
    details: [
      { icon: Briefcase, description: 'Automatically post job openings', iconColor: 'text-white', iconBg: 'bg-purple-600' },
      { icon: Search, description: 'Track candidates through interview/background checks', iconColor: 'text-white', iconBg: 'bg-purple-700' },
      { icon: FileText, description: 'Create offer letters', iconColor: 'text-white', iconBg: 'bg-purple-800' },
      { icon: Bot, description: 'Use AI to filter candidates', iconColor: 'text-white', iconBg: 'bg-purple-900' },
      { icon: ClipboardList, description: 'Automatically extract resume data', iconColor: 'text-white', iconBg: 'bg-purple-950' },
    ],
  },
  {
    title: 'Customer Management',
    mode: 'customer_management',
    main_description: 'Unify all customer data',
    main_description_highlight: 'for better service.',
    sub_description: 'Track interactions and manage relationships effectively.',
    animationPath: 'https://raw.githubusercontent.com/casas1010/front-end-animations/main/customer_management.lottie',
    gradient: '#0d9488',
    icon: Users,
    color: 'bg-teal-600',
    details: [
      { icon: Contact, description: 'Track interactions, incidents, memberships', iconColor: 'text-white', iconBg: 'bg-teal-600' },
      { icon: Users, description: 'Manage customer segments', iconColor: 'text-white', iconBg: 'bg-teal-700' },
      { icon: History, description: 'Access complete service history', iconColor: 'text-white', iconBg: 'bg-teal-800' },
    ],
  },
  {
    title: 'Sales Management',
    mode: 'sales_management',
    main_description: 'Track deals and revenue',
    main_description_highlight: 'with live metrics.',
    sub_description: 'Boost sales using lead tracking and automation.',
    animationPath: 'https://raw.githubusercontent.com/casas1010/front-end-animations/main/sales_management.lottie',
    gradient: '#16a34a',
    icon: Droplets,
    color: 'bg-green-600',
    details: [
      { icon: TrendingUp, description: 'Track leads', iconColor: 'text-white', iconBg: 'bg-green-600' },
      { icon: CheckCircle, description: 'Close deals', iconColor: 'text-white', iconBg: 'bg-green-700' },
      { icon: Workflow, description: 'Streamline workflow', iconColor: 'text-white', iconBg: 'bg-green-800' },
    ],
  },
  {
    title: 'Financial Documentation',
    mode: 'financial_documentation',
    main_description: 'Organize your finances',
    main_description_highlight: 'for clarity and control.',
    sub_description: 'Track expenses, simplify taxes, and ensure compliance.',
    animationPath: 'https://raw.githubusercontent.com/casas1010/front-end-animations/main/financial_documentation.lottie',
    gradient: '#ca8a04',
    icon: Lock,
    color: 'bg-yellow-600',
    details: [
      { icon: Receipt, description: 'Track expenses', iconColor: 'text-white', iconBg: 'bg-yellow-600' },
      { icon: Calculator, description: 'Simplify accounting', iconColor: 'text-white', iconBg: 'bg-yellow-700' },
      { icon: CheckLine, description: 'Ensure compliance', iconColor: 'text-white', iconBg: 'bg-yellow-800' },
      { icon: FileBarChart, description: 'Tax ready documentation', iconColor: 'text-white', iconBg: 'bg-yellow-900' },
    ],
  },
  {
    title: 'Task Management',
    mode: 'task_mnagement',
    main_description: 'Manage team tasks',
    main_description_highlight: 'with speed and clarity.',
    sub_description: 'Assign, monitor, and complete work in real-time.',
    animationPath: 'https://raw.githubusercontent.com/casas1010/front-end-animations/main/task_management.lottie',
    gradient: '#db2777',
    icon: Shield,
    color: 'bg-pink-600',
    details: [
      { icon: CheckSquare, description: 'Track and manage tasks', iconColor: 'text-white', iconBg: 'bg-pink-600' },
      { icon: Settings, description: 'Automate workflows', iconColor: 'text-white', iconBg: 'bg-pink-700' },
      { icon: Users, description: 'Collaborate across teams', iconColor: 'text-white', iconBg: 'bg-pink-800' },
      { icon: Timer, description: 'Ensure timely resolution', iconColor: 'text-white', iconBg: 'bg-pink-900' },
      { icon: AlertTriangle, description: 'Set and track priorities', iconColor: 'text-white', iconBg: 'bg-pink-950' },
    ],
  },
  {
    title: 'Property Management',
    mode: 'property_management',
    main_description: 'Oversee tenants and assets',
    main_description_highlight: 'from one place.',
    sub_description: 'Track leases, maintenance, and unit history easily.',
    animationPath: 'https://raw.githubusercontent.com/casas1010/front-end-animations/main/property_management.lottie',
    gradient: '#e11d48',
    icon: Settings,
    color: 'bg-rose-600',
    details: [
      { icon: Home, description: 'Track assets and tenants', iconColor: 'text-white', iconBg: 'bg-rose-600' },
      { icon: Wrench, description: 'Manage maintenance requests', iconColor: 'text-white', iconBg: 'bg-rose-700' },
      { icon: CalendarCheck, description: 'Monitor lease schedules', iconColor: 'text-white', iconBg: 'bg-rose-800' },
    ],
  },
];


