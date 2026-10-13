import React from 'react';
import { User, Tractor, Store, Building2, Sprout, Check } from 'lucide-react';

export type RoleType = 'user' | 'farmer' | 'shop_owner' | 'business' | 'nursery';

export interface RoleConfig {
  id: RoleType;
  title: string;
}

export const ROLE_CONFIGS: RoleConfig[] = [
  { id: 'user', title: 'User' },
  { id: 'farmer', title: 'Farmer' },
  { id: 'shop_owner', title: 'Shop Owner' },
  { id: 'business', title: 'Business' },
  { id: 'nursery', title: 'Nursery' }
];

interface RoleCardProps {
  role: RoleConfig;
  isSelected: boolean;
  onSelect: (roleId: RoleType) => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({ role, isSelected, onSelect }) => {
  const renderIcon = () => {
    const iconProps = {
      className: `w-7 h-7 transition-colors duration-200 ${
        isSelected ? 'text-emerald-600' : 'text-slate-600 group-hover:text-emerald-600'
      }`,
      strokeWidth: 1.75
    };

    switch (role.id) {
      case 'user':
        return <User {...iconProps} />;
      case 'farmer':
        return <Tractor {...iconProps} />;
      case 'shop_owner':
        return <Store {...iconProps} />;
      case 'business':
        return <Building2 {...iconProps} />;
      case 'nursery':
        return <Sprout {...iconProps} />;
      default:
        return <User {...iconProps} />;
    }
  };

  return (
    <button
      type="button"
      onClick={() => onSelect(role.id)}
      className={`group relative w-full flex items-center justify-between px-6 py-4 rounded-xl border text-left transition-all duration-200 focus:outline-none ${
        isSelected
          ? 'bg-emerald-50/30 border-emerald-500 shadow-sm ring-1 ring-emerald-500'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      <div className="flex items-center gap-6">
        <div className="flex items-center justify-center">
          {renderIcon()}
        </div>
        <span className={`text-lg font-bold tracking-tight transition-colors duration-200 ${
          isSelected ? 'text-emerald-950' : 'text-slate-900'
        }`}>
          {role.title}
        </span>
      </div>

      {isSelected && (
        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white shadow-xs">
          <Check className="w-3.5 h-3.5 stroke-[3]" />
        </div>
      )}
    </button>
  );
};
