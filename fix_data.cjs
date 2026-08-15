const fs = require('fs');
let data = fs.readFileSync('src/data.ts', 'utf8');

// The clientProjectsData array is at the end of the original file, before the new mock data.
// Let's just rewrite the bottom of data.ts starting from `export const clientProjectsData`.

const splitPoint = data.indexOf("export const clientProjectsData: any[] = [");
if (splitPoint !== -1) {
  data = data.slice(0, splitPoint);
  const appendedData = `export const clientProjectsData: any[] = [
  { 
    id: 'cp1', 
    name: 'Nexus Mobile App V2', 
    status: 'in-progress', 
    progress: 65, 
    dueDate: 'Nov 15, 2026',
    milestones: [
      { id: 'm1', name: 'UI/UX Design', targetDate: '2024-10-01T00:00:00Z', status: 'Completed', completionDate: '2024-10-05T00:00:00Z' },
      { id: 'm2', name: 'Backend API Integration', targetDate: '2024-10-20T00:00:00Z', status: 'Completed', completionDate: '2024-10-25T00:00:00Z' },
      { id: 'm3', name: 'Frontend Implementation', targetDate: '2024-11-05T00:00:00Z', status: 'In Progress' },
      { id: 'm4', name: 'QA & Testing', targetDate: '2024-11-12T00:00:00Z', status: 'Not Started' }
    ],
    contract: {
      id: 'ctr-001',
      title: 'Corporate Website Redesign Agreement',
      content: 'This agreement outlines the scope of work, deliverables, and payment terms for the redesign of the Corporate Website.\\n\\nTotal Contract Value: $5,000.',
      signed: true,
      signedBy: 'Demo Client',
      signedAt: '2024-10-01T14:30:00Z',
      ipAddress: '192.168.1.1'
    }
  },
  { id: 'cp2', name: 'Logistix AI Integration', status: 'qa', progress: 90, dueDate: 'Oct 20, 2026' },
  { id: 'cp3', name: 'AlphaCorp Rebranding', status: 'completed', progress: 100, dueDate: 'Sep 01, 2026' }
];

export const supportTicketsMock: any[] = [
  {
    id: 'tk-001',
    subject: 'Cannot access staging environment',
    category: 'Technical Issue',
    description: 'I get a 403 error when trying to access the staging link for the mobile app.',
    status: 'In Progress',
    createdAt: '2024-10-25T09:15:00Z',
    messages: [
      { sender: 'Client', text: 'I get a 403 error when trying to access the staging link for the mobile app.', timestamp: '2024-10-25T09:15:00Z' },
      { sender: 'Admin', text: 'We are looking into this. It seems your IP might not be whitelisted. Can you provide your public IP?', timestamp: '2024-10-25T10:05:00Z' }
    ]
  },
  {
    id: 'tk-002',
    subject: 'Billing question regarding invoice INV-2024-081',
    category: 'Billing Question',
    description: 'Is it possible to pay this via wire transfer instead of PayPal?',
    status: 'Resolved',
    createdAt: '2024-10-10T14:20:00Z',
    messages: [
      { sender: 'Client', text: 'Is it possible to pay this via wire transfer instead of PayPal?', timestamp: '2024-10-10T14:20:00Z' },
      { sender: 'Admin', text: 'Yes, we have added the wire transfer details to your portal under Billing.', timestamp: '2024-10-11T09:00:00Z' }
    ]
  }
];

export const activityLogMock: any[] = [
  { id: 'act-1', description: 'Milestone "Backend API Integration" completed', timestamp: '2024-10-25T16:30:00Z', triggeredBy: 'Admin' },
  { id: 'act-2', description: 'Support ticket "Cannot access staging environment" opened', timestamp: '2024-10-25T09:15:00Z', triggeredBy: 'Client' },
  { id: 'act-3', description: 'File "Wireframes_v2.pdf" uploaded', timestamp: '2024-10-14T11:20:00Z', triggeredBy: 'Admin' },
  { id: 'act-4', description: 'Contract "Corporate Website Redesign Agreement" signed', timestamp: '2024-10-01T14:30:00Z', triggeredBy: 'Client' },
];

export const notificationsMock: any[] = [
  { id: 'notif-1', message: 'New invoice INV-2024-082 issued.', timestamp: '2024-10-26T10:00:00Z', read: false, type: 'invoice' },
  { id: 'notif-2', message: 'Milestone "Backend API Integration" completed.', timestamp: '2024-10-25T16:30:00Z', read: true, type: 'milestone' },
  { id: 'notif-3', message: 'Admin responded to your support ticket.', timestamp: '2024-10-25T10:05:00Z', read: true, type: 'admin' },
];
`;
  fs.writeFileSync('src/data.ts', data + appendedData);
}
