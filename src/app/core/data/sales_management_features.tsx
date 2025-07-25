import { BarChart, Bell, Bot, CalendarClock, CalendarDays, ClipboardCheck, FileText, History, Lock, Mail, Megaphone, Send, ShieldCheck, UserCheck, Zap } from "lucide-react";
import { Features } from "../types/feature";


export const SALES_MANAGEMENT_FEATURES: Features[] = [
  {
    title: 'Lead & Opportunity Tracking',
    mode: 'lead_tracking',
    main_description: 'Capture and track leads',
    main_description_highlight: 'from contact to close',
    sub_description: '',
    main_icon_path: '📋',
    gradient: '#3b82f6',
    icon: ClipboardCheck,
    color: 'bg-blue-600',
    details: [
      { icon: ClipboardCheck, description: 'Kanban-style lead pipeline', iconColor: 'text-white', iconBg: 'bg-blue-600' },
      { icon: UserCheck, description: 'Lead scoring and qualification', iconColor: 'text-white', iconBg: 'bg-blue-600' },
      { icon: CalendarClock, description: 'Next steps and activity scheduling', iconColor: 'text-white', iconBg: 'bg-blue-600' },
      { icon: Mail, description: 'Lead source attribution and contact history', iconColor: 'text-white', iconBg: 'bg-blue-600' },
      { icon: FileText, description: 'Opportunity notes and deal documents', iconColor: 'text-white', iconBg: 'bg-blue-600' },
    ],
  },
  {
    title: 'Sales Pipeline Analytics',
    mode: 'pipeline_analytics',
    main_description: 'Visualize sales performance',
    main_description_highlight: 'with real-time insights',
    sub_description: '',
    main_icon_path: '📊',
    gradient: '#10b981',
    icon: BarChart,
    color: 'bg-green-600',
    details: [
      { icon: BarChart, description: 'Deal stage conversion rates', iconColor: 'text-white', iconBg: 'bg-green-600' },
      { icon: CalendarDays, description: 'Sales velocity and cycle tracking', iconColor: 'text-white', iconBg: 'bg-green-600' },
      { icon: Bot, description: 'Forecasting with AI assistance', iconColor: 'text-white', iconBg: 'bg-green-600' },
      { icon: FileText, description: 'Custom dashboards and reports', iconColor: 'text-white', iconBg: 'bg-green-600' },
      { icon: ClipboardCheck, description: 'Exportable KPIs for stakeholders', iconColor: 'text-white', iconBg: 'bg-green-600' },
    ],
  },
  {
    title: 'Contact & Account Management',
    mode: 'account_management',
    main_description: 'Maintain complete profiles',
    main_description_highlight: 'for all clients and organizations',
    sub_description: '',
    main_icon_path: '👥',
    gradient: '#6366f1',
    icon: UserCheck,
    color: 'bg-indigo-600',
    details: [
      { icon: UserCheck, description: 'Unified contact records and account views', iconColor: 'text-white', iconBg: 'bg-indigo-600' },
      { icon: Mail, description: 'Email sync and communication history', iconColor: 'text-white', iconBg: 'bg-indigo-600' },
      { icon: CalendarClock, description: 'Meeting notes and timelines', iconColor: 'text-white', iconBg: 'bg-indigo-600' },
      { icon: FileText, description: 'Attach contracts and key documents', iconColor: 'text-white', iconBg: 'bg-indigo-600' },
      { icon: Lock, description: 'Permission-based contact visibility', iconColor: 'text-white', iconBg: 'bg-indigo-600' },
    ],
  },
  {
    title: 'Quotes & Proposals',
    mode: 'quote_proposals',
    main_description: 'Generate and send proposals',
    main_description_highlight: 'with just a few clicks',
    sub_description: '',
    main_icon_path: '📑',
    gradient: '#f59e0b',
    icon: FileText,
    color: 'bg-yellow-600',
    details: [
      { icon: FileText, description: 'Create branded quotes and proposals', iconColor: 'text-white', iconBg: 'bg-yellow-600' },
      { icon: Send, description: 'Send documents for review or approval', iconColor: 'text-white', iconBg: 'bg-yellow-600' },
      { icon: ClipboardCheck, description: 'Quote templates with product/service bundles', iconColor: 'text-white', iconBg: 'bg-yellow-600' },
      { icon: History, description: 'Track opens, views, and revisions', iconColor: 'text-white', iconBg: 'bg-yellow-600' },
      { icon: ShieldCheck, description: 'Legally binding e-signatures supported', iconColor: 'text-white', iconBg: 'bg-yellow-600' },
    ],
  },
  {
    title: 'Task & Activity Management',
    mode: 'task_management',
    main_description: 'Stay on top of sales actions',
    main_description_highlight: 'with smart reminders and tasks',
    sub_description: '',
    main_icon_path: '✅',
    gradient: '#0ea5e9',
    icon: CalendarClock,
    color: 'bg-sky-600',
    details: [
      { icon: CalendarClock, description: 'Log calls, meetings, and follow-ups', iconColor: 'text-white', iconBg: 'bg-sky-600' },
      { icon: Bell, description: 'Automated reminders and alerts', iconColor: 'text-white', iconBg: 'bg-sky-600' },
      { icon: Bot, description: 'AI suggestions for next best actions', iconColor: 'text-white', iconBg: 'bg-sky-600' },
      { icon: ClipboardCheck, description: 'Shared team task views', iconColor: 'text-white', iconBg: 'bg-sky-600' },
      { icon: Zap, description: 'Integrate with calendars and Slack', iconColor: 'text-white', iconBg: 'bg-sky-600' },
    ],
  },
  {
    title: 'Email & Communication Tracking',
    mode: 'communication_tracking',
    main_description: 'Monitor all interactions',
    main_description_highlight: 'for better engagement',
    sub_description: '',
    main_icon_path: '📬',
    gradient: '#ec4899',
    icon: Mail,
    color: 'bg-pink-600',
    details: [
      { icon: Mail, description: 'Email sync with Gmail/Outlook', iconColor: 'text-white', iconBg: 'bg-pink-600' },
      { icon: History, description: 'Track opens, clicks, and replies', iconColor: 'text-white', iconBg: 'bg-pink-600' },
      { icon: Send, description: 'Send emails directly from CRM', iconColor: 'text-white', iconBg: 'bg-pink-600' },
      { icon: CalendarClock, description: 'Schedule follow-up sequences', iconColor: 'text-white', iconBg: 'bg-pink-600' },
      { icon: Megaphone, description: 'Log calls and social messages', iconColor: 'text-white', iconBg: 'bg-pink-600' },
    ],
  },
];