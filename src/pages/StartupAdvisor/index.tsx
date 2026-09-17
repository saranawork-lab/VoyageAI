import React from 'react';
import { Rocket, Target, ListTodo, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { PageHeader } from '@/components/layout/PageHeader';
import { useStartupPlan } from '@/hooks/useStartupPlan';
import { RoleGuard } from '@/components/guards/RoleGuard';

export const StartupAdvisorPage: React.FC = () => {
  const { startup, completionPercentage, todoTasks, inProgressTasks, doneTasks, updateTaskStatus } = useStartupPlan();

  const KanbanColumn = ({ title, tasks, status, icon: Icon, colorClass }: any) => (
    <div className="flex flex-col h-full bg-surface/50 rounded-xl border border-border overflow-hidden">
      <div className={`p-3 border-b border-border flex items-center justify-between bg-white`}>
        <div className="flex items-center gap-2">
          <Icon size={16} className={colorClass} />
          <h3 className="font-semibold text-text-dark text-sm">{title}</h3>
        </div>
        <Badge variant="default" size="sm">{tasks.length}</Badge>
      </div>
      
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        {tasks.map((task: any) => (
          <div key={task.id} className="bg-white p-3 rounded-lg border border-border shadow-sm hover:shadow-card transition-shadow cursor-pointer">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="default" size="sm">{task.category}</Badge>
              <button className="text-text-light hover:text-text-mid"><MoreHorizontal size={16} /></button>
            </div>
            <p className="text-sm font-medium text-text-dark mb-1">{task.title}</p>
            <p className="text-xs text-text-light line-clamp-2 mb-3">{task.description}</p>
            
            {/* Status Actions */}
            <div className="pt-2 border-t border-border flex gap-2">
              {status !== 'todo' && (
                <button 
                  onClick={() => updateTaskStatus({ milestoneId: task.id, status: 'todo' })}
                  className="text-[10px] uppercase font-bold text-text-light hover:text-text-mid"
                >
                  Move to Todo
                </button>
              )}
              {status !== 'in_progress' && (
                <button 
                  onClick={() => updateTaskStatus({ milestoneId: task.id, status: 'in_progress' })}
                  className="text-[10px] uppercase font-bold text-warning hover:text-warning-dark ml-auto"
                >
                  Start Work
                </button>
              )}
              {status !== 'done' && (
                <button 
                  onClick={() => updateTaskStatus({ milestoneId: task.id, status: 'done' })}
                  className="text-[10px] uppercase font-bold text-success hover:text-success-dark ml-auto"
                >
                  Mark Done
                </button>
              )}
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="h-24 flex items-center justify-center border-2 border-dashed border-border rounded-lg text-sm text-text-light">
            No tasks here
          </div>
        )}
      </div>
    </div>
  );

  return (
    <RoleGuard roles={['founder']} fallback={<div className="p-8 text-center text-accent">Access Denied</div>}>
      <div className="h-[calc(100vh-6rem)] flex flex-col space-y-4">
        <PageHeader 
          title="Startup Advisor" 
          subtitle="Your AI-generated YC-style action plan."
          action={<Button size="sm"><Rocket size={16} /> Generate Pitch Deck</Button>}
        />

        {startup && (
          <Card className="flex-shrink-0">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-text-dark">{startup.name}</h2>
                  <Badge variant="purple">{startup.stage}</Badge>
                </div>
                <p className="text-sm text-text-light">{startup.sector} • {startup.description}</p>
              </div>
              <div className="md:w-64">
                <ProgressBar value={completionPercentage} variant="purple" label="Plan Progress" />
              </div>
            </div>
          </Card>
        )}

        {/* Kanban Board */}
        <div className="flex-1 min-h-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full overflow-x-auto pb-2">
            <KanbanColumn 
              title="To Do" 
              tasks={todoTasks} 
              status="todo"
              icon={ListTodo}
              colorClass="text-text-mid"
            />
            <KanbanColumn 
              title="In Progress" 
              tasks={inProgressTasks} 
              status="in_progress"
              icon={Target}
              colorClass="text-warning"
            />
            <KanbanColumn 
              title="Completed" 
              tasks={doneTasks} 
              status="done"
              icon={CheckCircle2}
              colorClass="text-success"
            />
          </div>
        </div>
      </div>
    </RoleGuard>
  );
};

export default StartupAdvisorPage;
