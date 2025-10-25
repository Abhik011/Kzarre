'use client';

import React, { useState } from 'react';
import { MoreVertical, Plus, Search } from 'lucide-react';

const usersData = [
  {
    id: 1,
    name: 'Abhijeet kulkarni',
    email: 'abhijeetkulkarni.work@outlook.com',
    status: 'Active',
    lastLogin: 'Jan 10, 2024',
    role: 'PM',
    avatar: '👤',
  },
  {
    id: 2,
    name: 'Harshit Jhawar',
    email: 'harshitjwr.work@gmail.com',
    status: 'Active',
    lastLogin: 'Jan 10, 2024',
    role: 'Editor',
    avatar: '👤',
  },
  {
    id: 3,
    name: 'Harshal Pawar',
    email: 'harshalpawar.work@gmail.com',
    status: 'Active',
    lastLogin: 'Jan 10, 2024',
    role: 'Support',
    avatar: '👤',
  },
  {
    id: 4,
    name: 'Rahul Jagdale',
    email: 'rahuljagdale.work@gmail.com',
    status: 'Active',
    lastLogin: 'Jan 10, 2024',
    role: 'Admin',
    avatar: '👤',
  },
  {
    id: 5,
    name: 'Chinmay Kambale',
    email: 'chinmayk.work@gmail.com',
    status: 'Active',
    lastLogin: 'Jan 10, 2024',
    role: 'CE',
    avatar: '👤',
  },
  {
    id: 6,
    name: 'Jeesi gems',
    email: 'jeesigms.work@gmail.com',
    status: 'Active',
    lastLogin: 'Jan 10, 2024',
    role: 'AR',
    avatar: '👤',
  },
  {
    id: 7,
    name: 'Jasmit k',
    email: 'jasmitk.work@gmail.com',
    status: 'Active',
    lastLogin: 'Jan 10, 2024',
    role: 'ACSR',
    avatar: '👤',
  },
  {
    id: 8,
    name: 'Rohit dere',
    email: 'rohitdere.work@gmail.com',
    status: 'Active',
    lastLogin: 'Jan 10, 2024',
    role: 'AMS',
    avatar: '👤',
  },
];

const activityData = [
  {
    id: 1,
    timestamp: '2025-01-18 10:30:15',
    user: 'Abhijeet kulkarni',
    action: 'Edited Title',
    details: 'Old Title to New title page1',
    ip: '192.168.1.5',
  },
  {
    id: 2,
    timestamp: '2025-01-18 10:30:15',
    user: 'Abhijeet kulkarni',
    action: 'Edited Title',
    details: 'Old Title to New title page1',
    ip: '192.168.1.5',
  },
  {
    id: 3,
    timestamp: '2025-01-18 10:30:15',
    user: 'Abhijeet kulkarni',
    action: 'Edited Title',
    details: 'Old Title to New title page1',
    ip: '192.168.1.5',
  },
  {
    id: 4,
    timestamp: '2025-01-18 10:30:15',
    user: 'Abhijeet kulkarni',
    action: 'Edited Title',
    details: 'Old Title to New title page1',
    ip: '192.168.1.5',
  },
  {
    id: 5,
    timestamp: '2025-01-18 10:30:15',
    user: 'Abhijeet kulkarni',
    action: 'Edited Title',
    details: 'Old Title to New title page1',
    ip: '192.168.1.5',
  },
  {
    id: 6,
    timestamp: '2025-01-18 10:30:15',
    user: 'Abhijeet kulkarni',
    action: 'Edited Title',
    details: 'Old Title to New title page1',
    ip: '192.168.1.5',
  },
  {
    id: 7,
    timestamp: '2025-01-18 10:30:15',
    user: 'Abhijeet kulkarni',
    action: 'Edited Title',
    details: 'Old Title to New title page1',
    ip: '192.168.1.5',
  },
  {
    id: 8,
    timestamp: '2025-01-18 10:30:15',
    user: 'Abhijeet kulkarni',
    action: 'Edited Title',
    details: 'Old Title to New title page1',
    ip: '192.168.1.5',
  },
];

const rolesData = [
  {
    id: 1,
    role: 'Admin',
    description: 'Full access to all models',
    assigned: 4,
  },
  {
    id: 2,
    role: 'Editor',
    description: 'Can add/update content, no deletion',
    assigned: 12,
  },
  {
    id: 3,
    role: 'Support',
    description: 'Can view / manage tickets & users',
    assigned: 7,
  },
  {
    id: 4,
    role: 'Customer',
    description: 'End-user with restricted access',
    assigned: 240,
  },
];

const permissions = [
  'Permission1',
  'Permission1',
  'Permission1',
  'Permission1',
  'Permission1',
  'Permission1',
  'Permission1',
  'Permission1',
  'Permission1',
  'Permission1',
  'Permission1',
  'Permission1',
  'Permission1',
  'Permission1',
  'Permission1',
  'Permission1',
];

const UserActionMenu = () => (
  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm">
      Edit Profile
    </button>
    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm border-t border-gray-200">
      Change Status
    </button>
    <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 text-sm border-t border-gray-200">
      Reset Password
    </button>
    <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 text-sm border-t border-gray-200">
      Delete User
    </button>
  </div>
);

const UserList = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <h3 className="text-lg font-bold text-gray-900 mb-4">User List</h3>
    <p className="text-sm text-gray-600 mb-6">Showing all users</p>
    
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">User</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Last Login</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-gray-900">{user.name}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold flex items-center w-fit gap-2">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{user.lastLogin}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.role}</td>
              <td className="px-6 py-4 relative">
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreVertical size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const ActivityLog = () => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <h3 className="text-lg font-bold text-gray-900 mb-4">Activity Log</h3>
    <p className="text-sm text-gray-600 mb-6">Showing all users</p>
    
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">TimeStamp</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">User</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Action</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Details</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">IP address</th>
          </tr>
        </thead>
        <tbody>
          {activityData.map((activity) => (
            <tr key={activity.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-600">{activity.timestamp}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{activity.user}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{activity.action}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{activity.details}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{activity.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const RolesPermissions = ({ onAddRoleClick }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Roles & Permissions</h3>
        <p className="text-sm text-gray-600">Showing all users</p>
      </div>
      <button
        onClick={onAddRoleClick}
        className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center gap-2 text-sm font-medium"
      >
        <Plus size={18} />
        Add Role
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Role</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">User Assigned</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rolesData.map((role) => (
            <tr key={role.id} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{role.role}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{role.description}</td>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{role.assigned}</td>
              <td className="px-6 py-4">
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreVertical size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const AddRoleModal = ({ isOpen, onClose }) => {
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState({});

  const handlePermissionChange = (permission) => {
    setSelectedPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Roles</h2>
          <p className="text-gray-600 text-sm mb-6">Define describe the role's responsibilities</p>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Role Name</label>
                <input
                  type="text"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="Enter role name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Role Description</label>
                <input
                  type="text"
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="Enter role description"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-4">Permissions</label>
              <div className="grid grid-cols-4 gap-4">
                {permissions.map((permission, index) => (
                  <label key={index} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedPermissions[permission + index] || false}
                      onChange={() => handlePermissionChange(permission + index)}
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-600">{permission}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end mt-8">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
              Create Role
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function UserManagement() {
  const [activeTab, setActiveTab] = useState('userList');
  const [isAddRoleModalOpen, setIsAddRoleModalOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1">Manage and control system users</p>
      </div>

      {/* Content Container */}
      <div className="">
        {/* Tab Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('userList')}
              className={`pb-3 px-1 font-medium text-sm transition-colors ${
                activeTab === 'userList'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              User List
            </button>
            <button
              onClick={() => setActiveTab('rolesPermissions')}
              className={`pb-3 px-1 font-medium text-sm transition-colors ${
                activeTab === 'rolesPermissions'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Roles & Permissions
            </button>
            <button
              onClick={() => setActiveTab('activityLog')}
              className={`pb-3 px-1 font-medium text-sm transition-colors ${
                activeTab === 'activityLog'
                  ? 'text-gray-900 border-b-2 border-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Activity Log
            </button>
          </div>

          {activeTab === 'userList' && (
            <button className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500 flex items-center gap-2 font-medium">
              <Plus size={18} />
              Add User
            </button>
          )}
        </div>

        {/* Tab Content */}
        {activeTab === 'userList' && <UserList />}
        {activeTab === 'rolesPermissions' && (
          <RolesPermissions onAddRoleClick={() => setIsAddRoleModalOpen(true)} />
        )}
        {activeTab === 'activityLog' && <ActivityLog />}

        {/* Add Role Modal */}
        <AddRoleModal
          isOpen={isAddRoleModalOpen}
          onClose={() => setIsAddRoleModalOpen(false)}
        />
      </div>
    </div>
  );
}