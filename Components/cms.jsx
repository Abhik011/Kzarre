'use client';

import React, { useState } from 'react';
import { Plus, MoreVertical, FileText, Search, Edit, Trash2, X } from 'lucide-react';

const CMSDashboard = () => {
  const [activeTab, setActiveTab] = useState('pagesAndPosts');
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [categoryFormData, setCategoryFormData] = useState({
    name: '',
    description: '',
    status: 'Active',
  });

  const [categories, setCategories] = useState([
    { id: 1, name: 'Mens', description: 'Men clothing and accessories', posts: 24, status: 'Active' },
    { id: 2, name: 'Womens', description: 'Women clothing and accessories', posts: 18, status: 'Active' },
    { id: 3, name: 'Accessories', description: 'Belts, bags, and more', posts: 12, status: 'Active' },
    { id: 4, name: 'Footwear', description: 'Shoes and boots', posts: 8, status: 'Active' },
    { id: 5, name: 'Seasonal', description: 'Seasonal collections', posts: 5, status: 'Inactive' },
  ]);

  const pagesData = [
    { id: 1, title: 'Home', type: 'Landing page', lastModified: '2025-10-19', status: 'Published' },
    { id: 2, title: 'Heritage', type: 'Collection Page', lastModified: '2025-10-19', status: 'Published' },
    { id: 3, title: 'Womens', type: 'Collection Page', lastModified: '2025-10-19', status: 'Published' },
    { id: 4, title: 'Mens', type: 'Collection Page', lastModified: '2025-10-19', status: 'Published' },
    { id: 5, title: 'Accessories', type: 'Collection Page', lastModified: '2025-10-19', status: 'Published' },
    { id: 6, title: 'About Us', type: 'Standard Page', lastModified: '2025-10-19', status: 'Published' },
  ];

  const postsData = [
    { id: 1, title: 'Jacket', type: 'Mens', author: 'Abhijeet.k', lastModified: '2025-10-19', status: 'Published' },
    { id: 2, title: 'Jacket', type: 'Mens', author: 'Abhijeet.k', lastModified: '2025-10-19', status: 'Draft' },
    { id: 3, title: 'Jacket', type: 'Mens', author: 'Abhijeet.k', lastModified: '2025-10-19', status: 'Pending Review' },
    { id: 4, title: 'Jacket', type: 'Mens', author: 'Abhijeet.k', lastModified: '2025-10-19', status: 'Scheduled' },
    { id: 5, title: 'Jacket', type: 'Mens', author: 'Abhijeet.k', lastModified: '2025-10-19', status: 'Inactive' },
  ];

  // Category Functions
  const handleAddCategory = () => {
    if (categoryFormData.name.trim()) {
      if (editingCategoryId) {
        setCategories(categories.map(cat => 
          cat.id === editingCategoryId ? { ...cat, ...categoryFormData } : cat
        ));
        setEditingCategoryId(null);
      } else {
        setCategories([
          ...categories,
          {
            id: Math.max(...categories.map(c => c.id), 0) + 1,
            ...categoryFormData,
            posts: 0,
          }
        ]);
      }
      setCategoryFormData({ name: '', description: '', status: 'Active' });
      setShowAddCategoryModal(false);
    }
  };

  const handleEditCategory = (category) => {
    setCategoryFormData({
      name: category.name,
      description: category.description,
      status: category.status,
    });
    setEditingCategoryId(category.id);
    setShowAddCategoryModal(true);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  const handleCloseCategoryModal = () => {
    setShowAddCategoryModal(false);
    setCategoryFormData({ name: '', description: '', status: 'Active' });
    setEditingCategoryId(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      case 'Pending Review':
        return 'bg-purple-100 text-purple-800';
      case 'Scheduled':
        return 'bg-yellow-100 text-yellow-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'Active':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Management</h1>
          <p className="text-gray-600">Manage your website's pages, post & media</p>
        </div>

        {/* Tabs and Action Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex gap-4 border-b border-gray-200 w-full sm:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab('pagesAndPosts')}
              className={`pb-3 px-4 font-medium text-sm whitespace-nowrap transition-all ${
                activeTab === 'pagesAndPosts'
                  ? 'text-green-600 border-b-2 border-green-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Pages & Posts
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`pb-3 px-4 font-medium text-sm whitespace-nowrap transition-all ${
                activeTab === 'categories'
                  ? 'text-green-600 border-b-2 border-green-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveTab('scheduled')}
              className={`pb-3 px-4 font-medium text-sm whitespace-nowrap transition-all ${
                activeTab === 'scheduled'
                  ? 'text-green-600 border-b-2 border-green-500'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Scheduled Content
            </button>
          </div>

          {/* Action Buttons - Show different buttons based on active tab */}
          {activeTab === 'pagesAndPosts' && (
            <div className="flex gap-3 w-full sm:w-auto">
              <button className="w-full sm:w-auto px-4 py-2 text-black rounded-lg transition-all flex items-center justify-center gap-2 font-medium text-sm hover:opacity-90" style={{ backgroundColor: '#A0EDA8' }}>
                <FileText size={18} />
                Create Page
              </button>
              <button className="w-full sm:w-auto px-4 py-2 text-black rounded-lg transition-all flex items-center justify-center gap-2 font-medium text-sm hover:opacity-90" style={{ backgroundColor: '#A0EDA8' }}>
                <Plus size={18} />
                Create Post
              </button>
            </div>
          )}

          {activeTab === 'categories' && (
            <button
              onClick={() => setShowAddCategoryModal(true)}
              className="w-full sm:w-auto px-4 py-2 text-black rounded-lg transition-all flex items-center justify-center gap-2 font-medium text-sm hover:opacity-90"
              style={{ backgroundColor: '#A0EDA8' }}
            >
              <Plus size={18} />
              Add Category
            </button>
          )}
        </div>

        {/* Pages Section */}
        {activeTab === 'pagesAndPosts' && (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Pages</h2>
              <p className="text-sm text-gray-600 mb-4">Show all Pages</p>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Modified</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagesData.map((page) => (
                        <tr key={page.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{page.title}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{page.type}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{page.lastModified}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(page.status)}`}>
                              {page.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                              <MoreVertical size={18} className="text-gray-500" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Posts Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Posts</h2>
              <p className="text-sm text-gray-600 mb-4">Show all post</p>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 bg-gray-50">
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Author</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Last Modified</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {postsData.map((post) => (
                        <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                                <FileText size={18} className="text-blue-600" />
                              </div>
                              <span className="text-sm font-medium text-gray-900">{post.title}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">{post.type}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{post.author}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{post.lastModified}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(post.status)}`}>
                              {post.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                              <MoreVertical size={18} className="text-gray-500" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Categories Section */}
        {activeTab === 'categories' && (
            <div> <h2 className="text-xl font-bold text-gray-900 mb-4">Categories</h2>
              <p className="text-sm text-gray-600 mb-4">Show all Categories</p>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Posts</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{category.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{category.description}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{category.posts}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(category.status)}`}>
                          {category.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditCategory(category)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} className="text-gray-500" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="p-1 hover:bg-red-100 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} className="text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        )}

        {/* Scheduled Section */}
        {activeTab === 'scheduled' && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-600">Scheduled content coming soon</p>
          </div>
        )}
      </div>

      {/* Add/Edit Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingCategoryId ? 'Edit Category' : 'Add Category'}
                </h2>
                <button
                  onClick={handleCloseCategoryModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddCategory();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={categoryFormData.name}
                    onChange={(e) =>
                      setCategoryFormData({ ...categoryFormData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter category name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Description
                  </label>
                  <textarea
                    value={categoryFormData.description}
                    onChange={(e) =>
                      setCategoryFormData({ ...categoryFormData, description: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    placeholder="Enter category description"
                    rows="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Status
                  </label>
                  <select
                    value={categoryFormData.status}
                    onChange={(e) =>
                      setCategoryFormData({ ...categoryFormData, status: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <button
                    type="button"
                    onClick={handleCloseCategoryModal}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-black rounded-lg font-medium text-sm hover:opacity-90"
                    style={{ backgroundColor: '#A0EDA8' }}
                  >
                    {editingCategoryId ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CMSDashboard;