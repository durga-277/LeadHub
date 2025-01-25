import React, { useState } from 'react';
import { Lead, LeadStatus, SalesPerson } from '../types';
import { Clock, User, Phone, Mail, Car, FileText } from 'lucide-react';

interface LeadDetailsProps {
  lead: Lead;
  salespeople: SalesPerson[];
  onClose: () => void;
  onUpdate: (leadId: string, updates: Partial<Lead>) => void;
}

const LeadDetails: React.FC<LeadDetailsProps> = ({
  lead,
  salespeople,
  onClose,
  onUpdate,
}) => {
  const [notes, setNotes] = useState(lead.notes);
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [assignedTo, setAssignedTo] = useState(lead.assignedTo);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(lead.id, {
      notes,
      status,
      assignedTo,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Lead Details</h2>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex items-center mb-4">
            <User className="w-5 h-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="text-base font-medium">{lead.name}</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <Phone className="w-5 h-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-base font-medium">{lead.phone}</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <Mail className="w-5 h-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-base font-medium">{lead.email}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-4">
            <Car className="w-5 h-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Car Interest</p>
              <p className="text-base font-medium">{lead.carInterest}</p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Created</p>
              <p className="text-base font-medium">
                {new Date(lead.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <Clock className="w-5 h-5 text-gray-400 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-base font-medium">
                {new Date(lead.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as LeadStatus)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="interested">Interested</option>
            <option value="not_interested">Not Interested</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assign To
          </label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="">Unassigned</option>
            {salespeople.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <FileText className="w-4 h-4 inline-block mr-1" />
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Add notes about the lead..."
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadDetails;