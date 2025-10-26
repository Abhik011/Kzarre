'use client';

import React, { useState, useRef } from 'react';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  X,
  Upload,
  Image as ImageIcon,
  Save,
  FileText,
  Package,
  ShoppingCart,
  TrendingUp,
  RotateCcw,
  Filter,
  Download,
  MoreVertical,
  AlertCircle,
  Check,
  ChevronDown,
  Tag,
  DollarSign,
  Percent,
  Box,
  Barcode as BarcodeIcon,
  Grid,
  List
} from 'lucide-react';

const ECommerceSection = () => {
  // Navigation states
  const [currentView, setCurrentView] = useState('inventory'); // 'inventory', 'addProduct', 'orders', 'discounts'
  const [activeTab, setActiveTab] = useState('product');
  
  // Product management states
  const [products, setProducts] = useState([
    { id: 1, name: 'Blue Varsity Jacket', stock: 77, threshold: 20, purchase: '$45', price: '$89', valuation: '$6,853', supplier: 'Fashion Hub', status: 'In Stock', sku: '2324kvbs-2', category: 'Mens', variants: [
      { size: 'M', color: 'Blue', material: 'Wool', price: 89, stock: 20 },
      { size: 'L', color: 'Blue', material: 'Wool', price: 89, stock: 25 },
      { size: 'XL', color: 'Blue', material: 'Wool', price: 89, stock: 32 }
    ]},
    { id: 2, name: 'Classic White Sneakers', stock: 145, threshold: 30, purchase: '$32', price: '$75', valuation: '$10,875', supplier: 'Shoe World', status: 'In Stock', sku: '2324kvbs-3', category: 'Footwear' },
    { id: 3, name: 'Leather Handbag', stock: 12, threshold: 15, purchase: '$58', price: '$120', valuation: '$1,440', supplier: 'Luxury Goods Co', status: 'Low Stock', sku: '2324kvbs-4', category: 'Accessories' },
    { id: 4, name: 'Denim Jeans', stock: 89, threshold: 25, purchase: '$28', price: '$65', valuation: '$5,785', supplier: 'Denim Direct', status: 'In Stock', sku: '2324kvbs-5', category: 'Mens' },
    { id: 5, name: 'Summer Dress', stock: 5, threshold: 10, purchase: '$22', price: '$55', valuation: '$275', supplier: 'Fashion Hub', status: 'Critical', sku: '2324kvbs-6', category: 'Womens' },
  ]);

  // Stats
  const stats = {
    totalProducts: products.length,
    totalStock: products.reduce((sum, p) => sum + p.stock, 0),
    sold: 342,
    returns: 12
  };

  // Add Product Form States
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    gender: [],
    basePrice: '',
    sellPrice: '',
    discount: '',
    discountType: 'percentage',
    category: '',
    vendor: '',
    tags: [],
    primaryTag: '',
    secondaryTag: '',
    sku: '',
    barcode: ''
  });

  const [variants, setVariants] = useState([
    { id: 1, size: 'M', color: 'Black', material: 'Wool', price: 40, stock: 77 },
    { id: 2, size: 'S', color: 'Yellow', material: 'Wool', price: 40, stock: 77 },
    { id: 3, size: 'XXL', color: 'Black', material: 'Wool', price: 40, stock: 77 },
    { id: 4, size: 'XL', color: 'Black', material: 'Wool', price: 40, stock: 77 },
  ]);

  const [newVariant, setNewVariant] = useState({
    size: '',
    color: '',
    material: '',
    lowStockAlert: '',
    stock: '',
    barcode: ''
  });

  const [showAddVariant, setShowAddVariant] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Orders data
  const [orders] = useState([
    { id: 'ORD001', customer: 'John Doe', date: '2024-01-20', total: '$234', status: 'Pending', items: 3 },
    { id: 'ORD002', customer: 'Jane Smith', date: '2024-01-20', total: '$567', status: 'Shipped', items: 5 },
    { id: 'ORD003', customer: 'Bob Wilson', date: '2024-01-19', total: '$120', status: 'Delivered', items: 2 },
  ]);

  // File upload handlers
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    handleMultipleFileUpload(files);
  };

  const handleMultipleFileUpload = (files) => {
    const newImages = [];
    Array.from(files).forEach(file => {
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newImages.push({
            id: Date.now() + Math.random(),
            url: e.target.result,
            name: file.name
          });
          if (newImages.length === files.length) {
            setUploadedImages(prev => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files) {
      handleMultipleFileUpload(files);
    }
  };

  const removeImage = (id) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
    if (selectedImage >= uploadedImages.length - 1) {
      setSelectedImage(0);
    }
  };

  // Product form handlers
  const handleProductInputChange = (field, value) => {
    setProductForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenderChange = (gender) => {
    setProductForm(prev => ({
      ...prev,
      gender: prev.gender.includes(gender) 
        ? prev.gender.filter(g => g !== gender)
        : [...prev.gender, gender]
    }));
  };

  const handleAddVariant = () => {
    if (newVariant.size) {
      const variant = {
        id: Date.now(),
        ...newVariant,
        price: productForm.sellPrice || 0,
        stock: parseInt(newVariant.stock) || 0
      };
      setVariants(prev => [...prev, variant]);
      setNewVariant({
        size: '',
        color: '',
        material: '',
        lowStockAlert: '',
        stock: '',
        barcode: ''
      });
      setShowAddVariant(false);
    }
  };

  const removeVariant = (id) => {
    setVariants(prev => prev.filter(v => v.id !== id));
  };

  const generateSKU = () => {
    const sku = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`.toUpperCase();
    handleProductInputChange('sku', sku);
  };

  const generateBarcode = () => {
    const barcode = Array.from({length: 12}, () => Math.floor(Math.random() * 10)).join('');
    return barcode;
  };

  const handleSaveProduct = () => {
    const newProduct = {
      id: products.length + 1,
      name: productForm.name || 'New Product',
      stock: variants.reduce((sum, v) => sum + (parseInt(v.stock) || 0), 0),
      threshold: 20,
      purchase: `$${productForm.basePrice}`,
      price: `$${productForm.sellPrice}`,
      valuation: `$${variants.reduce((sum, v) => sum + (parseInt(v.stock) || 0), 0) * parseInt(productForm.sellPrice || 0)}`,
      supplier: productForm.vendor || 'Unknown',
      status: 'In Stock',
      sku: productForm.sku,
      category: productForm.category,
      variants: variants
    };
    
    setProducts(prev => [...prev, newProduct]);
    // Reset form
    setProductForm({
      name: '',
      description: '',
      gender: [],
      basePrice: '',
      sellPrice: '',
      discount: '',
      discountType: 'percentage',
      category: '',
      vendor: '',
      tags: [],
      primaryTag: '',
      secondaryTag: '',
      sku: '',
      barcode: ''
    });
    setVariants([]);
    setUploadedImages([]);
    setCurrentView('inventory');
  };

  const getStockStatus = (stock, threshold) => {
    if (stock <= 5) return { text: 'Critical', color: 'text-red-600 bg-red-50' };
    if (stock <= threshold) return { text: 'Low Stock', color: 'text-yellow-600 bg-yellow-50' };
    return { text: 'In Stock', color: 'text-green-600 bg-green-50' };
  };

  // Render Inventory View
  const renderInventory = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Products</span>
            <Package className="text-gray-400" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalProducts}</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Total Stock</span>
            <Box className="text-gray-400" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalStock}</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Sold</span>
            <ShoppingCart className="text-gray-400" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.sold}</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Return</span>
            <RotateCcw className="text-gray-400" size={20} />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.returns}</div>
        </div>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Product List</h2>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Filter size={20} className="text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Download size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Threshold</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Purchase</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Valuation</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Supplier</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const status = getStockStatus(product.stock, product.threshold);
                return (
                  <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">SKU: {product.sku}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900">{product.stock}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${status.color}`}>
                          {status.text}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.threshold}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.purchase}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.valuation}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.supplier}</td>
                    <td className="px-6 py-4">
                      <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                        <MoreVertical size={18} className="text-gray-500" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Render Add Product View
  const renderAddProduct = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Product Details */}
      <div className="lg:col-span-2 space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-900 rounded-lg">
              <FileText size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Add New Product</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name Product
              </label>
              <input
                type="text"
                value={productForm.name}
                onChange={(e) => handleProductInputChange('name', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description Product
              </label>
              <textarea
                value={productForm.description}
                onChange={(e) => handleProductInputChange('description', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                placeholder="Enter product description"
                rows="4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="text-xs text-gray-500 mb-3">Pick available gender</div>
              <div className="flex gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.gender.includes('Men')}
                    onChange={() => handleGenderChange('Men')}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Men</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.gender.includes('Women')}
                    onChange={() => handleGenderChange('Women')}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Women</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.gender.includes('Unisex')}
                    onChange={() => handleGenderChange('Unisex')}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="text-sm text-gray-700">Unisex</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing and Stock */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-900 rounded-lg">
              <DollarSign size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Pricing and Stock</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Base Pricing
              </label>
              <input
                type="number"
                value={productForm.basePrice}
                onChange={(e) => handleProductInputChange('basePrice', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sell Price
              </label>
              <input
                type="number"
                value={productForm.sellPrice}
                onChange={(e) => handleProductInputChange('sellPrice', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount
              </label>
              <input
                type="number"
                value={productForm.discount}
                onChange={(e) => handleProductInputChange('discount', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount type
              </label>
              <select
                value={productForm.discountType}
                onChange={(e) => handleProductInputChange('discountType', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Add Variants</h2>
            {!showAddVariant && (
              <button
                onClick={() => setShowAddVariant(true)}
                className="px-4 py-2 text-black text-sm font-medium rounded-lg hover:opacity-90"
                style={{ backgroundColor: '#A0EDA8' }}
              >
                Add Variants
              </button>
            )}
          </div>

          {showAddVariant && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                  <input
                    type="text"
                    value={newVariant.size}
                    onChange={(e) => setNewVariant({...newVariant, size: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., M, L, XL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <input
                    type="text"
                    value={newVariant.color}
                    onChange={(e) => setNewVariant({...newVariant, color: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Black, Blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                  <input
                    type="text"
                    value={newVariant.material}
                    onChange={(e) => setNewVariant({...newVariant, material: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g., Wool, Cotton"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Low Stock Alert</label>
                  <input
                    type="number"
                    value={newVariant.lowStockAlert}
                    onChange={(e) => setNewVariant({...newVariant, lowStockAlert: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="21"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                  <input
                    type="number"
                    value={newVariant.stock}
                    onChange={(e) => setNewVariant({...newVariant, stock: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="77"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Barcode value</label>
                  <input
                    type="text"
                    value={newVariant.barcode}
                    onChange={(e) => setNewVariant({...newVariant, barcode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="2324kvbs-2"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                  <input
                    type="text"
                    value={productForm.sku}
                    onChange={(e) => handleProductInputChange('sku', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="2324kvbs-2"
                  />
                </div>
                <div className="flex items-center gap-3 mt-7">
                  <button
                    onClick={handleAddVariant}
                    className="px-4 py-2 text-black text-sm font-medium rounded-lg hover:opacity-90"
                    style={{ backgroundColor: '#A0EDA8' }}
                  >
                    Add Variants
                  </button>
                  <button
                    onClick={generateSKU}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
                  >
                    Generate SKU
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Variants Table */}
          {variants.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Size</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Color</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Material</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Stock</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((variant) => (
                    <tr key={variant.id} className="border-b border-gray-200">
                      <td className="px-4 py-3 text-sm text-gray-900">{variant.size}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{variant.color}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{variant.material}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">${variant.price}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{variant.stock}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => removeVariant(variant.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Upload & Metadata */}
      <div className="lg:col-span-1 space-y-6">
        {/* Upload Images */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload img</h3>
          
          {/* Main Image Display */}
          {uploadedImages.length > 0 ? (
            <div className="space-y-4">
              <div className="relative rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={uploadedImages[selectedImage]?.url} 
                  alt="Product"
                  className="w-full h-64 object-contain"
                />
                <button
                  onClick={() => removeImage(uploadedImages[selectedImage]?.id)}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:shadow-lg"
                >
                  <X size={16} className="text-gray-600" />
                </button>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex gap-2">
                {uploadedImages.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-green-500' : 'border-gray-200'
                    }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
                {uploadedImages.length < 4 && (
                  <label
                    htmlFor="add-more-images"
                    className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-green-500"
                  >
                    <Plus size={20} className="text-gray-400" />
                    <input
                      id="add-more-images"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          ) : (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">Drag and drop images here</p>
              <p className="text-xs text-gray-500 mb-4">or</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="px-4 py-2 text-black text-sm font-medium rounded-lg cursor-pointer hover:opacity-90 inline-block"
                style={{ backgroundColor: '#A0EDA8' }}
              >
                Browse Files
              </label>
            </div>
          )}
        </div>

        {/* Category */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Categories
            </label>
            <select
              value={productForm.category}
              onChange={(e) => handleProductInputChange('category', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select category</option>
              <option value="Mens">Mens</option>
              <option value="Womens">Womens</option>
              <option value="Accessories">Accessories</option>
              <option value="Footwear">Footwear</option>
            </select>
          </div>
        </div>

        {/* Vendor */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vendor</h3>
          <input
            type="text"
            value={productForm.vendor}
            onChange={(e) => handleProductInputChange('vendor', e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter vendor name"
          />
        </div>

        {/* Tags */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tag</h3>
          <input
            type="text"
            value={productForm.tags.join(', ')}
            onChange={(e) => handleProductInputChange('tags', e.target.value.split(', '))}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-3"
            placeholder="Enter tags separated by comma"
          />
          <button
            className="w-full px-4 py-2 text-black text-sm font-medium rounded-lg hover:opacity-90"
            style={{ backgroundColor: '#A0EDA8' }}
          >
            Save
          </button>
        </div>

        {/* Custom Product Metadata */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Custom Product Metadata</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary tag</label>
              <input
                type="text"
                value={productForm.primaryTag}
                onChange={(e) => handleProductInputChange('primaryTag', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter primary tag"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Secondary tag</label>
              <input
                type="text"
                value={productForm.secondaryTag}
                onChange={(e) => handleProductInputChange('secondaryTag', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter secondary tag"
              />
            </div>
            <button
              className="w-full px-4 py-2 text-black text-sm font-medium rounded-lg hover:opacity-90"
              style={{ backgroundColor: '#A0EDA8' }}
            >
              Add Metadata
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Orders View
  const renderOrders = () => (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Orders Management</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Items</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.customer}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.items}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.total}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
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
  );

  // Main Component Render
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">E-Commerce Management</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your website's Ecommerce</p>
          </div>
          
          <div className="flex items-center gap-3">
            {currentView === 'inventory' && (
              <>
                <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <FileText size={18} />
                  Draft
                </button>
                <button
                  onClick={() => setCurrentView('addProduct')}
                  className="px-4 py-2 text-black font-medium rounded-lg hover:opacity-90 flex items-center gap-2"
                  style={{ backgroundColor: '#A0EDA8' }}
                >
                  <Plus size={18} />
                  Save & Publish
                </button>
              </>
            )}
            {currentView === 'addProduct' && (
              <>
                <button
                  onClick={() => setCurrentView('inventory')}
                  className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProduct}
                  className="px-4 py-2 text-black font-medium rounded-lg hover:opacity-90 flex items-center gap-2"
                  style={{ backgroundColor: '#A0EDA8' }}
                >
                  <Save size={18} />
                  Save & Publish
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex gap-6">
          <button
            onClick={() => setActiveTab('product')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'product'
                ? 'text-green-600 border-green-500'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            Product
          </button>
          <button
            onClick={() => {
              setActiveTab('inventory');
              setCurrentView('inventory');
            }}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'inventory'
                ? 'text-green-600 border-green-500'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            Inventory
          </button>
          <button
            onClick={() => {
              setActiveTab('order');
              setCurrentView('orders');
            }}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'order'
                ? 'text-green-600 border-green-500'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            Order
          </button>
          <button
            onClick={() => setActiveTab('discounts')}
            className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'discounts'
                ? 'text-green-600 border-green-500'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
          >
            Discounts & Coupons
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        {currentView === 'inventory' && renderInventory()}
        {currentView === 'addProduct' && renderAddProduct()}
        {currentView === 'orders' && renderOrders()}
        {activeTab === 'discounts' && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-600">Discounts & Coupons management coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ECommerceSection;