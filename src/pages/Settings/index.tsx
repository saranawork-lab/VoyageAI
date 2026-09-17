import React, { useState } from 'react';
import { User, Lock, Bell, Globe, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useUIStore } from '@/store/ui.store';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { PageHeader } from '@/components/layout/PageHeader';
import { Tabs, TabPanel } from '@/components/ui/Tabs';

export const SettingsPage: React.FC = () => {
  const { user, tier, role, clearAuth } = useAuthStore();
  const addToast = useUIStore(s => s.addToast);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast({ type: 'success', message: 'Settings saved successfully', duration: 3000 });
    }, 800);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={16} /> },
    { id: 'account', label: 'Account Security', icon: <Lock size={16} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
    { id: 'preferences', label: 'Preferences', icon: <Globe size={16} /> },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader title="Settings" subtitle="Manage your account settings and preferences." />

      <Tabs tabs={tabs}>
        {/* Profile Tab */}
        <TabPanel tabId="profile" activeTab="profile">
          <Card>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center space-y-4">
                <Avatar name={user?.name || 'User'} size="xl" className="w-24 h-24 text-2xl" />
                <Button variant="secondary" size="sm">Change Avatar</Button>
              </div>
              
              <div className="flex-1 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input id="name" label="Full Name" defaultValue={user?.name} />
                  <Input id="email" label="Email Address" defaultValue={user?.email} disabled />
                  <Input id="phone" label="Phone Number" defaultValue={user?.phone} />
                  
                  <div>
                    <label className="text-sm font-medium text-text-dark mb-1.5 block">Account Type</label>
                    <div className="h-10 px-3 flex items-center bg-surface border border-border rounded-lg text-sm text-text-mid capitalize">
                      {role} Account
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border flex justify-end">
                  <Button onClick={handleSave} loading={isSaving}>Save Changes</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabPanel>

        {/* Account Tab */}
        <TabPanel tabId="account" activeTab="profile">
          <div className="space-y-6">
            <Card title="Current Subscription">
              <div className="flex items-center justify-between mt-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg font-bold text-text-dark capitalize">{tier} Plan</span>
                    {tier === 'pro' && <Badge variant="success">Active</Badge>}
                  </div>
                  <p className="text-sm text-text-light">
                    {tier === 'free' ? 'Upgrade to Pro for unlimited AI and mentor access.' : 'Your subscription renews on Nov 15, 2026.'}
                  </p>
                </div>
                {tier === 'free' ? (
                  <Button onClick={() => window.location.href = '/upgrade'}>Upgrade</Button>
                ) : (
                  <Button variant="secondary">Manage Billing</Button>
                )}
              </div>
            </Card>

            <Card title="Change Password">
              <div className="space-y-4 mt-2 max-w-md">
                <Input id="current-pwd" type="password" label="Current Password" />
                <Input id="new-pwd" type="password" label="New Password" />
                <Input id="confirm-pwd" type="password" label="Confirm New Password" />
                <Button variant="secondary">Update Password</Button>
              </div>
            </Card>

            <Card className="border-accent/20 bg-accent-light/10">
              <h3 className="text-lg font-bold text-accent mb-2">Danger Zone</h3>
              <p className="text-sm text-text-mid mb-4">Permanently delete your account and all associated data.</p>
              <Button variant="danger">Delete Account</Button>
            </Card>
          </div>
        </TabPanel>

        {/* Notifications Tab */}
        <TabPanel tabId="notifications" activeTab="profile">
          <Card>
            <div className="space-y-6">
              {[
                { title: 'Email Summaries', desc: 'Receive weekly AI-generated progress reports.', defaultChecked: true },
                { title: 'Push Notifications', desc: 'Get alerted for new milestones or mentor messages.', defaultChecked: true },
                { title: 'Marketing Emails', desc: 'Receive updates about new features and offers.', defaultChecked: false },
                { title: 'Job Alerts', desc: 'Get notified when new jobs match your profile.', defaultChecked: role !== 'parent' },
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-text-dark">{setting.title}</h4>
                    <p className="text-xs text-text-light mt-0.5">{setting.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={setting.defaultChecked} />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
              
              <div className="pt-4 border-t border-border flex justify-end">
                <Button onClick={handleSave} loading={isSaving}>Save Preferences</Button>
              </div>
            </div>
          </Card>
        </TabPanel>

        {/* Preferences Tab */}
        <TabPanel tabId="preferences" activeTab="profile">
          <Card>
            <div className="space-y-6 max-w-md">
              <div>
                <h4 className="text-sm font-semibold text-text-dark mb-3">Language</h4>
                <div className="flex gap-2">
                  <Badge variant="primary" className="px-4 py-2 cursor-pointer">English</Badge>
                  <Badge variant="default" className="px-4 py-2 cursor-pointer">Hindi (Coming Soon)</Badge>
                </div>
              </div>
              
              <div className="pt-6 border-t border-border">
                <Button variant="secondary" className="text-accent hover:bg-accent-light/20 border-accent/20" onClick={clearAuth}>
                  <LogOut size={16} className="mr-2" /> Log Out Everywhere
                </Button>
              </div>
            </div>
          </Card>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
