import React from 'react';
import {
  MousePointer,
  Square,
  Type,
  Circle,
  Workflow,
  Move,
  
} from 'lucide-react';
import { ToolType } from '../types/ToolType';



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
  activeTool: ToolType;
  setActiveTool: (tool: ToolType) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ 
  className = '', 
  activeTool, 
  setActiveTool 
}) => {
  return (
    <div className={`toolbar ${className}`}>
      <ToolbarButton 
        isActive={activeTool === 'move'}
        onClick={() => setActiveTool('move')}
      >
        <Move size={16} />
      </ToolbarButton>
      <div className="divider" />
      <ToolbarButton 
        isActive={activeTool === 'square'}
        onClick={() => setActiveTool('square')}
      >
        <Square size={16} />
      </ToolbarButton>
      <ToolbarButton
        isActive={activeTool === 'circle'}
        onClick={() => setActiveTool('circle')}
      >
        <Circle size={16} />
      </ToolbarButton>
      <ToolbarButton
        isActive={activeTool === 'select'}
        onClick={() => setActiveTool('select')}
      >
        <MousePointer size={16} />
      </ToolbarButton>
      <ToolbarButton
        isActive={activeTool === 'text'}
        onClick={() => setActiveTool('text')}
      >
        <Type size={16} />
      </ToolbarButton>
      <div className="divider" />
      <ToolbarButton
        isActive={activeTool === 'flow'}
        onClick={() => setActiveTool('flow')}
      >
        <Workflow size={16} />
      </ToolbarButton>
    </div>
  );
};

export default Toolbar;