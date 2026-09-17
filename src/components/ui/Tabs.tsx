import React, { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabPanelProps {
  tabId: string;
  activeTab: string;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab: controlledActive,
  onChange,
  children,
  className = '',
}) => {
  const [internalActive, setInternalActive] = useState(tabs[0]?.id || '');
  const activeTab = controlledActive ?? internalActive;

  const handleTabClick = (tabId: string) => {
    setInternalActive(tabId);
    onChange?.(tabId);
  };

  return (
    <div className={className}>
      {/* Tab list */}
      <div className="flex border-b border-border overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-3 text-sm font-medium
              whitespace-nowrap transition-all duration-200 border-b-2 -mb-px
              ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-light hover:text-text-mid'
              }
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div className="pt-4">
        {React.Children.map(children, (child) => {
          if (React.isValidElement<TabPanelProps>(child)) {
            return child.props.tabId === activeTab ? child : null;
          }
          return child;
        })}
      </div>
    </div>
  );
};

export const TabPanel: React.FC<TabPanelProps> = ({ children, tabId, activeTab }) => {
  if (tabId !== activeTab) return null;
  return <div className="animate-fade-in">{children}</div>;
};
