import React from 'react';
import {
  MousePointer,
  Square,
  Type,
  Circle,
  Code,
  Users,
  Move
} from 'lucide-react';

interface ToolbarButtonProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ 
  children, 
  isActive = false,
  onClick
}) => (
  <button 
    onClick={onClick}
    className={`toolbar-button ${isActive ? 'active' : ''}`}
  >
    {children}
  </button>
);

interface ToolbarProps {
  className?: string;
}

const FigmaToolbar: React.FC<ToolbarProps> = ({ className = '' }) => {
  return (
    <div className={`toolbar ${className}`}>
      <ToolbarButton>
        <Move size={16} />
      </ToolbarButton>
      <div className="divider" />
      <ToolbarButton>
        <Square size={16} />
      </ToolbarButton>
      <ToolbarButton>
        <Circle size={16} />
      </ToolbarButton>
      <ToolbarButton>
        <MousePointer size={16} />
      </ToolbarButton>
      <ToolbarButton>
        <Type size={16} />
      </ToolbarButton>
      <div className="divider" />
      <ToolbarButton>
        <Code size={16} />
      </ToolbarButton>
      <ToolbarButton>
        <Users size={16} />
      </ToolbarButton>
    </div>
  );
};

export default FigmaToolbar;