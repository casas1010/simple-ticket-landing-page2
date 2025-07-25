import { CalendarClock, Bell, ClipboardCheck, Send, UserCheck, Mail, FileText, ShieldCheck, BarChart, CalendarDays, Megaphone, Zap, Bot, History } from "lucide-react";
import { Features } from "../types/feature";




export const TASK_MANAGEMENT_FEATURES: Features[] = [
  {
    title: 'Task Scheduling & Deadlines',
    mode: 'task_scheduling',
    main_description: 'Stay on top of every task and deadline',
    main_description_highlight: 'with calendar-integrated scheduling',
    sub_description: '',
    main_icon_path: '🗓️',
    gradient: '#3b82f6',
    icon: CalendarClock,
    color: 'bg-blue-600',
    details: [
      { icon: CalendarClock, description: 'Calendar-based task planning', iconColor: 'text-white', iconBg: 'bg-blue-600' },
      { icon: Bell, description: 'Automated deadline reminders', iconColor: 'text-white', iconBg: 'bg-blue-600' },
      { icon: ClipboardCheck, description: 'Recurring task support', iconColor: 'text-white', iconBg: 'bg-blue-600' },
      { icon: History, description: 'Task history and audit trail', iconColor: 'text-white', iconBg: 'bg-blue-600' },
      { icon: Send, description: 'Real-time task updates across teams', iconColor: 'text-white', iconBg: 'bg-blue-600' },
    ],
  },
  {
    title: 'Team Collaboration',
    mode: 'team_collaboration',
    main_description: 'Empower teams to work together',
    main_description_highlight: 'in real time',
    sub_description: '',
    main_icon_path: '🤝',
    gradient: '#10b981',
    icon: UserCheck,
    color: 'bg-green-600',
    details: [
      { icon: UserCheck, description: 'Assign tasks with roles and permissions', iconColor: 'text-white', iconBg: 'bg-green-600' },
      { icon: Mail, description: 'Comment threads and internal messaging', iconColor: 'text-white', iconBg: 'bg-green-600' },
      { icon: FileText, description: 'Document sharing on tasks', iconColor: 'text-white', iconBg: 'bg-green-600' },
      { icon: ClipboardCheck, description: 'Shared checklists and subtasks', iconColor: 'text-white', iconBg: 'bg-green-600' },
      { icon: ShieldCheck, description: 'Access control for sensitive projects', iconColor: 'text-white', iconBg: 'bg-green-600' },
    ],
  },
  {
    title: 'Project Dashboards',
    mode: 'project_dashboards',
    main_description: 'Visualize progress and workload',
    main_description_highlight: 'with dynamic dashboards',
    sub_description: '',
    main_icon_path: '📊',
    gradient: '#f59e0b',
    icon: BarChart,
    color: 'bg-yellow-600',
    details: [
      { icon: BarChart, description: 'Task status overviews', iconColor: 'text-white', iconBg: 'bg-yellow-600' },
      { icon: CalendarDays, description: 'Timeline and milestone views', iconColor: 'text-white', iconBg: 'bg-yellow-600' },
      { icon: History, description: 'Activity tracking and reporting', iconColor: 'text-white', iconBg: 'bg-yellow-600' },
      { icon: ClipboardCheck, description: 'Filter and group by teams or projects', iconColor: 'text-white', iconBg: 'bg-yellow-600' },
      { icon: Megaphone, description: 'Status updates and announcements', iconColor: 'text-white', iconBg: 'bg-yellow-600' },
    ],
  },
  {
    title: 'Workflow Automation',
    mode: 'workflow_automation',
    main_description: 'Automate repetitive tasks and notifications',
    main_description_highlight: 'with smart workflows',
    sub_description: '',
    main_icon_path: '⚙️',
    gradient: '#6366f1',
    icon: Zap,
    color: 'bg-indigo-600',
    details: [
      { icon: Zap, description: 'Trigger-based task automation', iconColor: 'text-white', iconBg: 'bg-indigo-600' },
      { icon: Bell, description: 'Custom alerts and triggers', iconColor: 'text-white', iconBg: 'bg-indigo-600' },
      { icon: Bot, description: 'AI suggestions for task priorities', iconColor: 'text-white', iconBg: 'bg-indigo-600' },
      { icon: ClipboardCheck, description: 'Auto-status transitions', iconColor: 'text-white', iconBg: 'bg-indigo-600' },
      { icon: Send, description: 'Email and app integrations', iconColor: 'text-white', iconBg: 'bg-indigo-600' },
    ],
  },
  {
    title: 'Task Templates',
    mode: 'task_templates',
    main_description: 'Standardize and accelerate task creation',
    main_description_highlight: 'with reusable templates',
    sub_description: '',
    main_icon_path: '📁',
    gradient: '#8b5cf6',
    icon: FileText,
    color: 'bg-purple-600',
    details: [
      { icon: FileText, description: 'Create and reuse task templates', iconColor: 'text-white', iconBg: 'bg-purple-600' },
      { icon: ClipboardCheck, description: 'Template-based checklists', iconColor: 'text-white', iconBg: 'bg-purple-600' },
      { icon: CalendarClock, description: 'Pre-filled due dates and assignees', iconColor: 'text-white', iconBg: 'bg-purple-600' },
      { icon: ShieldCheck, description: 'Role-based template access', iconColor: 'text-white', iconBg: 'bg-purple-600' },
      { icon: Zap, description: 'Auto-triggered templates for new projects', iconColor: 'text-white', iconBg: 'bg-purple-600' },
    ],
  },
  {
    title: 'Notifications & Alerts',
    mode: 'notifications_alerts',
    main_description: 'Keep your team informed',
    main_description_highlight: 'at every step',
    sub_description: '',
    main_icon_path: '🔔',
    gradient: '#ec4899',
    icon: Bell,
    color: 'bg-pink-600',
    details: [
      { icon: Bell, description: 'Real-time push notifications', iconColor: 'text-white', iconBg: 'bg-pink-600' },
      { icon: Mail, description: 'Task and deadline email alerts', iconColor: 'text-white', iconBg: 'bg-pink-600' },
      { icon: Send, description: 'Customizable notification settings', iconColor: 'text-white', iconBg: 'bg-pink-600' },
      { icon: Megaphone, description: 'Broadcast important updates', iconColor: 'text-white', iconBg: 'bg-pink-600' },
      { icon: History, description: 'Notification logs and audit trails', iconColor: 'text-white', iconBg: 'bg-pink-600' },
    ],
  },
];