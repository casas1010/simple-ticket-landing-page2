type Detail = {
  icon: string;
  description: string;
};

export type DetailedCardProps = {
  title: string;
  description: string;
  animationPath: string;
  details: Detail[];
  gradient: string;
};


export const allModulesAndFeatures: (DetailedCardProps & { gradient: string })[] = [
  // modules1
  {
    title: 'Marketing',
    description: 'Enhance your marketing efforts with targeted campaigns, detailed analytics, and automated marketing tools. Optimize your strategies to reach more customers effectively.',
    animationPath: 'https://lottie.host/bddd9424-7625-4528-bac0-4cb741f1be05/FIsyTVgp2o.json',
    gradient: '',
    details: [
      { icon: '📣', description: 'Targeted campaigns' },
      { icon: '📊', description: 'Detailed analytics' },
      { icon: '📧', description: 'Automatic notifications' },
    ],
  },
  {
    title: 'Recruiting',
    description: 'Streamline your recruitment process. Post job openings, review applications, track candidates, and collaborate with your hiring team to find the perfect match for your organization.',
    animationPath: 'https://lottie.host/06922141-ea60-45da-9862-b085209f056c/RwBLNL0DZp.json',
    gradient: '',
    details: [
      { icon: '💼', description: 'Automatically post job openings' },
      { icon: '🔍', description: 'Track candidates through interview/background checks' },
      { icon: '📄', description: 'Create offer letters' },
      { icon: '🤖', description: 'AI filter candidates' },
      { icon: '📋', description: 'Extract data from resumes' },
    ],
  },
  {
    title: 'Customer Management',
    description: 'Build stronger relationships with your customers. Track interactions, manage customer data, and personalize services to improve satisfaction and retention.',
    animationPath: 'https://lottie.host/4ed7ce26-7491-4516-8c9d-ee5e0258f720/l7UQzhbH1t.json',
    gradient: '',
    details: [
      { icon: '📇', description: 'Track interactions, incidents, memberships' },
      { icon: '👥', description: 'Manage customer segments' },
      { icon: '📜', description: 'Access complete service history' },
    ],
  },

  // modules2
  {
    title: 'Sales Management',
    description: 'Efficiently manage your sales process. From tracking leads to closing deals, streamline your sales workflow to boost performance and conversion rates.',
    animationPath: 'https://lottie.host/712ca8ea-8b00-4615-825f-ab76a3a15042/Cb4dHj5nHH.json',
    gradient: '',
    details: [
      { icon: '📈', description: 'Track leads' },
      { icon: '🤝', description: 'Close deals' },
      { icon: '⚡', description: 'Streamline workflow' },
    ],
  },
  {
    title: 'Financial Documentation',
    description: 'Organize and manage all financial records in one place. Simplify accounting, track expenses, generate invoices, and ensure compliance with ease.',
    animationPath: 'https://lottie.host/ca635384-4d5e-4fa1-8036-62aa4316be9f/FjoUUvbQUR.json',
    gradient: '',
    details: [
      { icon: '🧾', description: 'Track expenses' },
      { icon: '🧮', description: 'Simplify accounting' },
      { icon: '✅', description: 'Ensure compliance' },
      { icon: '📑', description: 'Tax ready' },
    ],
  },
  {
    title: 'Task Management',
    description: 'Efficiently manage, track, and automate tasks across your organization. The Task Management module in ServiceNow helps streamline workflows, improve collaboration, and ensure timely resolution of tasks.',
    animationPath: 'https://lottie.host/9e5ba739-65f8-4cc4-96a8-25dbeb79d0a6/tP4BkPdq3P.json',
    gradient: '',
    details: [
      { icon: '☑️', description: 'Track and manage tasks' },
      { icon: '🤖', description: 'Automate workflows' },
      { icon: '👥', description: 'Collaborate across teams' },
      { icon: '⏱️', description: 'Ensure timely task resolution' },
      { icon: '🚩', description: 'Set and track priorities' },
    ],
  },

  // features1
  {
    title: 'Fully Automated',
    description: 'Experience seamless automation for a variety of tasks, from sending emails to generating reports. Automate routine processes to save time, reduce human error, and increase efficiency.',
    animationPath: 'https://lottie.host/83d6e419-0d6d-44f2-82ca-1203953dcac8/4L1XMErZg1.json',
    gradient: '',
    details: [
      { icon: '🗓️', description: 'Automate scheduling' },
      { icon: '📧', description: 'Send emails' },
      { icon: '📊', description: 'Generate reports' },
    ],
  },
  {
    title: 'Notifications',
    description: 'Stay informed with real-time notifications. Receive updates and alerts for important events, tasks, and deadlines so you never miss critical information.',
    animationPath: 'https://lottie.host/74844795-53af-4b85-bec9-9f74c15a76b4/HgOg2QI9Aw.json',
    gradient: '',
    details: [
      { icon: '🔔', description: 'Real-time alerts' },
      { icon: '📅', description: 'Event updates' },
      { icon: '📌', description: 'Task reminders' },
    ],
  },
  {
    title: 'AI Agents',
    description: 'Deploy autonomous agents to handle data processing, customer support, and routine operations.',
    animationPath: 'https://lottie.host/aee38d53-ce70-492c-a745-5b526199ebd0/hXQO8892mP.json',
    gradient: '',
    details: [
      { icon: '🚨', description: 'Monitor critical metrics with instant alerts' },
      { icon: '⚙️', description: 'Trigger automated workflows based on system events' },
      { icon: '🤖', description: 'Scale operations with intelligent task handling' },
    ],
  },

  // features2
  {
    title: 'Access Control',
    description: 'Manage user access with advanced controls. Ensure secure, role-based access to sensitive data and GlobalCards, empowering only authorized users with specific privileges.',
    animationPath: 'https://lottie.host/01a7eb11-ca93-46a2-a2db-f784890a581d/ZQuuChnwIM.json',
    gradient: '',
    details: [
      { icon: '🔒', description: 'Secure data' },
      { icon: '🛡️', description: 'Role-based access' },
      { icon: '👤', description: 'Ensure privacy' },
    ],
  },
];