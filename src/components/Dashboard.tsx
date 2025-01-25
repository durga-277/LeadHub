import React, { useState } from 'react';
import { Lead, LeadStatus } from '../types';
import { BarChart, Users, PhoneCall, UserX, Plus, Upload } from 'lucide-react';

interface DashboardProps {
  leads: Lead[];
}

const Dashboard: React.FC<DashboardProps> = ({ leads }) => {
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);

  const getLeadsByStatus = (status: LeadStatus) => {
    return leads.filter(lead => lead.status === status).length;
  };

  const stats = [
    {
      name: 'New Leads',
      value: getLeadsByStatus('new'),
      icon: Users,
      color: 'bg-yellow-500',
      percentage: (getLeadsByStatus('new') / leads.length) * 100,
    },
    {
      name: 'Contacted',
      value: getLeadsByStatus('contacted'),
      icon: PhoneCall,
      color: 'bg-blue-500',
      percentage: (getLeadsByStatus('contacted') / leads.length) * 100,
    },
    {
      name: 'Interested',
      value: getLeadsByStatus('interested'),
      icon: BarChart,
      color: 'bg-green-500',
      percentage: (getLeadsByStatus('interested') / leads.length) * 100,
    },
    {
      name: 'Not Interested',
      value: getLeadsByStatus('not_interested'),
      icon: UserX,
      color: 'bg-red-500',
      percentage: (getLeadsByStatus('not_interested') / leads.length) * 100,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="space-x-4">
          <button
            onClick={() => setShowNewLeadModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Lead
          </button>
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import Leads
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <dt>
              <div className={`absolute rounded-md p-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
              <p className="ml-2 text-sm font-medium text-gray-500">
                ({stat.percentage.toFixed(1)}%)
              </p>
            </dd>
          </div>
        ))}
      </div>

      {/* Percentage Graph */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Lead Distribution</h2>
        <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
          {stats.map((stat, index) => (
            <div
              key={stat.name}
              style={{ 
                width: `${stat.percentage}%`,
                marginLeft: index === 0 ? '0' : undefined
              }}
              className={`h-full ${stat.color} transition-all duration-300 inline-block`}
              title={`${stat.name}: ${stat.percentage.toFixed(1)}%`}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-between">
          {stats.map((stat) => (
            <div key={stat.name} className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${stat.color} mr-2`} />
              <span className="text-sm text-gray-600">{stat.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
        <div className="flow-root">
          <ul className="-mb-8">
            {leads.slice(0, 5).map((lead, leadIdx) => (
              <li key={lead.id}>
                <div className="relative pb-8">
                  {leadIdx !== leads.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                          lead.status === 'new'
                            ? 'bg-yellow-500'
                            : lead.status === 'contacted'
                            ? 'bg-blue-500'
                            : lead.status === 'interested'
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        }`}
                      >
                        <Users className="h-5 w-5 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          New lead: <span className="font-medium text-gray-900">{lead.name}</span>
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time dateTime={lead.createdAt}>
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;