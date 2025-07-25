

// Featuress_data.ts



import {
  Zap,
  Megaphone,
  BarChart,
  Mail,
  CalendarClock,
  Send,
  FileText,
  Bell,
  CalendarDays,
  ClipboardCheck,
  ShieldCheck,
  Lock,
  UserCheck,
  Bot
} from 'lucide-react';
import { Features } from '../types/feature';

export const FEATURES: Features[] = [

  {
    title: 'Fully Automated',
    mode: 'automation',
    main_description: 'Streamline repetitive workflows',
    main_description_highlight: 'with powerful automation tools.',
    sub_description: 'Save time and reduce error through intelligent task automation.',
    animationPath: 'https://lottie.host/83d6e419-0d6d-44f2-82ca-1203953dcac8/4L1XMErZg1.json',
    gradient: '#10b981',
    icon: CalendarClock,
    color: 'bg-green-600',
    details: [
      { icon: CalendarClock, description: 'Automate scheduling', iconColor: 'text-white', iconBg: 'bg-green-600' },
      { icon: Send, description: 'Send emails', iconColor: 'text-white', iconBg: 'bg-green-700' },
      { icon: FileText, description: 'Generate reports', iconColor: 'text-white', iconBg: 'bg-green-800' },
    ],
  },
  {
    title: 'Notifications',
    mode: 'notifications',
    main_description: 'Stay in the loop',
    main_description_highlight: 'with real-time alerts.',
    sub_description: 'Get updates and reminders for what matters most.',
    animationPath: 'https://lottie.host/74844795-53af-4b85-bec9-9f74c15a76b4/HgOg2QI9Aw.json',
    gradient: '#f97316',
    icon: Bell,
    color: 'bg-orange-600',
    details: [
      { icon: Bell, description: 'Real-time alerts', iconColor: 'text-white', iconBg: 'bg-orange-600' },
      { icon: CalendarDays, description: 'Event updates', iconColor: 'text-white', iconBg: 'bg-orange-700' },
      { icon: ClipboardCheck, description: 'Task reminders', iconColor: 'text-white', iconBg: 'bg-orange-800' },
    ],
  },
  {
    title: 'AI Agents',
    mode: 'ai',
    main_description: 'Deploy smart systems',
    main_description_highlight: 'for complex operations.',
    sub_description: 'Let intelligent agents handle tasks and scale your workflows.',
    animationPath: 'https://lottie.host/aee38d53-ce70-492c-a745-5b526199ebd0/hXQO8892mP.json',
    gradient: '#8b5cf6',
    icon: Bot,
    color: 'bg-purple-600',
    details: [
      { icon: Bell, description: 'Instant metric alerts', iconColor: 'text-white', iconBg: 'bg-purple-600' },
      { icon: CalendarDays, description: 'Trigger workflows', iconColor: 'text-white', iconBg: 'bg-purple-700' },
      { icon: Bot, description: 'Intelligent task handling', iconColor: 'text-white', iconBg: 'bg-purple-800' },
    ],
  },
  {
    title: 'Access Control',
    mode: 'security',
    main_description: 'Keep data safe',
    main_description_highlight: 'with smart access management.',
    sub_description: 'Control who sees what with role-based permissions.',
    animationPath: 'https://lottie.host/01a7eb11-ca93-46a2-a2db-f784890a581d/ZQuuChnwIM.json',
    gradient: '#ef4444',
    icon: ShieldCheck,
    color: 'bg-red-600',
    details: [
      { icon: Lock, description: 'Secure data', iconColor: 'text-white', iconBg: 'bg-red-600' },
      { icon: UserCheck, description: 'Role-based access', iconColor: 'text-white', iconBg: 'bg-red-700' },
      { icon: ShieldCheck, description: 'Ensure privacy', iconColor: 'text-white', iconBg: 'bg-red-800' },
    ],
  },
];