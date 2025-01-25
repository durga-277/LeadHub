import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import LeadTable from './components/LeadTable';
import LeadDetails from './components/LeadDetails';
import { Lead, LeadStatus, SalesPerson } from './types';

// Mock data for demonstration
const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '(555) 123-4567',
    email: 'john@example.com',
    carInterest: '2024 HSR Sport',
    status: 'new',
    notes: 'Interested in test drive next week',
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-10T10:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Smith',
    phone: '(555) 987-6543',
    email: 'jane@example.com',
    carInterest: '2024 HSR Luxury',
    status: 'contacted',
    notes: 'Following up on financing options',
    assignedTo: '1',
    createdAt: '2024-03-09T15:30:00Z',
    updatedAt: '2024-03-10T09:15:00Z',
  },
];

const mockSalespeople: SalesPerson[] = [
  { id: '1', name: 'Mike Johnson' },
  { id: '2', name: 'Sarah Williams' },
];

function App() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  const handleStatusChange = (leadId: string, status: LeadStatus) => {
    setLeads(leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, status, updatedAt: new Date().toISOString() }
        : lead
    ));
  };

  const handleLeadUpdate = (leadId: string, updates: Partial<Lead>) => {
    setLeads(leads.map(lead =>
      lead.id === leadId
        ? { ...lead, ...updates }
        : lead
    ));
    setSelectedLead(null);
  };

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard leads={leads} />} />
          <Route
            path="/leads"
            element={
              <>
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Lead Management</h1>
                </div>
                <LeadTable
                  leads={leads}
                  onViewLead={setSelectedLead}
                  onStatusChange={handleStatusChange}
                />
                {selectedLead && (
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                      <LeadDetails
                        lead={selectedLead}
                        salespeople={mockSalespeople}
                        onClose={() => setSelectedLead(null)}
                        onUpdate={handleLeadUpdate}
                      />
                    </div>
                  </div>
                )}
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <div className="bg-white shadow rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
                <p className="text-gray-600">System settings and configuration options will be available here.</p>
              </div>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;