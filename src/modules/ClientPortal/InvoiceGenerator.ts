import { jsPDF } from 'jspdf';

export function generateInvoicePDF(invoice: any) {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(30, 41, 59); // slate-900
  doc.text('INVOICE', 20, 30);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text(`Invoice Number: ${invoice.id}`, 20, 40);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 45);
  doc.text(`Status: ${invoice.status.toUpperCase()}`, 20, 50);

  // Company Details
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text('From:', 140, 30);
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text('GullG Technology', 140, 40);
  doc.text('hello@gullgtech.online', 140, 45);
  doc.text('+92 336 5656071', 140, 50);

  // Client Details
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text('Bill To:', 20, 70);
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text(localStorage.getItem('gullg_client_name') || 'Demo Client', 20, 80);

  // Line Items Header
  doc.setFillColor(248, 250, 252); // slate-50
  doc.rect(20, 100, 170, 10, 'F');
  
  doc.setFontSize(10);
  doc.setTextColor(30, 41, 59);
  doc.text('Description', 25, 107);
  doc.text('Amount', 160, 107);

  // Line Item
  doc.setTextColor(100, 116, 139);
  doc.text(invoice.title, 25, 120);
  doc.text(invoice.amount, 160, 120);
  
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.line(20, 125, 190, 125);

  // Total
  doc.setFontSize(12);
  doc.setTextColor(30, 41, 59);
  doc.text('Total', 120, 140);
  doc.text(invoice.amount, 160, 140);

  // Footer
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  if (invoice.status === 'Paid') {
    doc.text('Payment Method: ' + (invoice.method || 'Card/PayPal'), 20, 170);
    doc.text('Thank you for your business!', 20, 180);
  }

  // Save the PDF
  doc.save(`${invoice.id}_Receipt.pdf`);
}
