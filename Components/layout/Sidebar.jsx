'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Layers,
  BarChart3,
  ShoppingCart,
  Truck,
  TrendingUp,
  DollarSign,
  Shield,
  Settings,
  MoreVertical,
} from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { label: 'User Management', icon: Users, href: '/user-management' },
    { label: 'CMS', icon: Layers, href: '/cms' },
    { label: 'Analytics', icon: BarChart3, href: '/analytics' },
    { label: 'E-Commerce', icon: ShoppingCart, href: '/ecommerce' },
    { label: 'S&L', icon: Truck, href: '/shipping-logistics' },
    { label: 'Marketing', icon: TrendingUp, href: '/marketing' },
    { label: 'Payments & Finance', icon: DollarSign, href: '/payments' },
    { label: 'Security & Compliance', icon: Shield, href: '/security' },
    { label: 'Website Settings', icon: Settings, href: '/settings' },
  ];

  const isActive = (href) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-white border-r border-gray-200 h-screen flex flex-col transition-all duration-300 overflow-y-auto`}
    >
      {/* Logo Section */}
      <div className="p-3.5 border-b border-gray-200">
        <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">KZ</span>
          </div>
          {isOpen && <span className="font-semibold text-lg tracking-wide">KZARRÈ</span>}
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    active
                      ? 'bg-[#A0EDA8] text-black font-bold'
                      : 'text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {isOpen && <span className="text-sm font-medium">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-yellow-50 rounded-lg p-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold">
              A
            </div>
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">Abhijeet Kulkarni</p>
                <p className="text-xs text-gray-600 truncate">abhijeet.work@kzarre.com</p>
              </div>
            )}
            {isOpen && (
              <button className="p-1 hover:bg-yellow-100 rounded transition-colors">
                <MoreVertical size={16} className="text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <span className="text-gray-600 font-bold">{isOpen ? '←' : '→'}</span>
        </button>
      </div>
    </aside>
  );
}