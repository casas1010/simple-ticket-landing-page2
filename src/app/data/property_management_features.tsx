

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

export const PROPERTY_MANAGEMENT_FEATURES: Features[] = [

  {
    title: 'Fully Automated',
    mode: 'automation',
    main_description: 'Streamline repetitive workflows',
    main_description_highlight: 'with powerful automation tools.',
    sub_description: 'Save time and reduce error through intelligent task automation.',
    main_icon_animation_path: 'https://lottie.host/83d6e419-0d6d-44f2-82ca-1203953dcac8/4L1XMErZg1.json',
    gradient: '#10b981',
    icon: CalendarClock,
    color: 'bg-green-600',
    details: [
      { icon: CalendarClock, description: 'Automate scheduling', iconColor: 'text-white', iconBg: 'bg-green-600' },
      { icon: Send, description: 'Send emails', iconColor: 'text-white', iconBg: 'bg-green-700' },
      { icon: FileText, description: 'Generate reports', iconColor: 'text-white', iconBg: 'bg-green-800' },
    ],
  },

];