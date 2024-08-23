import { createLazyFileRoute } from '@tanstack/react-router';
import { CheckIcon, LockIcon, MilestoneIcon } from 'lucide-react';
import { Button } from 'ui-library/ui/button';

export const Route = createLazyFileRoute('/milestones/')({
  component: () => (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 px-4 md:px-6 py-12 md:py-16">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Milestones</h1>
          <p className="mt-4 text-muted-foreground">
            Track your progress and unlock new features as you complete each
            milestone.
          </p>
          <div className="mt-8 grid gap-8">
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-primary rounded-full p-2 text-primary-foreground">
                  <MilestoneIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Complete Profile</h3>
                  <p className="text-muted-foreground">
                    Fill out your profile information to get started.
                  </p>
                </div>
                <div className="ml-auto bg-primary rounded-full p-2 text-primary-foreground">
                  <CheckIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-muted rounded-full p-2 text-muted-foreground">
                  <MilestoneIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Connect Accounts</h3>
                  <p className="text-muted-foreground">
                    Link your social media accounts to share your progress.
                  </p>
                </div>
                <div className="ml-auto bg-muted rounded-full p-2 text-muted-foreground">
                  <LockIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-muted rounded-full p-2 text-muted-foreground">
                  <MilestoneIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Invite Friends</h3>
                  <p className="text-muted-foreground">
                    Invite your friends to join and compete with you.
                  </p>
                </div>
                <div className="ml-auto bg-muted rounded-full p-2 text-muted-foreground">
                  <LockIcon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-muted rounded-full p-2 text-muted-foreground">
                  <MilestoneIcon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Earn Badges</h3>
                  <p className="text-muted-foreground">
                    Complete challenges to earn badges and level up.
                  </p>
                </div>
                <div className="ml-auto bg-muted rounded-full p-2 text-muted-foreground">
                  <LockIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-muted rounded-lg p-6">
          <h2 className="text-2xl font-bold">Unlock More Features</h2>
          <p className="mt-4 text-muted-foreground">
            Upgrade to our Pro plan to unlock all milestones and features.
          </p>
          <div className="mt-6">
            <Button className="w-full">Upgrade to Pro</Button>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-bold">Your Current Plan</h3>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Free</p>
                <p className="text-sm text-muted-foreground">
                  Unlock 1 milestone
                </p>
              </div>
              <div>
                <p className="text-sm font-medium">$0/month</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="border-t bg-muted/50 px-4 md:px-6 py-4">
        <div className="container flex items-center justify-center gap-4">
          <div className="group relative flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <MilestoneIcon className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium">Complete Profile</p>
            <div className="absolute left-1/2 bottom-full mb-4 z-10 w-64 -translate-x-1/2 transform rounded-lg bg-background p-4 shadow-lg group-hover:block hidden">
              <p className="text-sm font-medium">
                Unlock this milestone by upgrading to our Pro plan.
              </p>
              <div className="mt-4">
                <Button className="w-full">Upgrade to Pro</Button>
              </div>
            </div>
          </div>
          <div className="group relative flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <MilestoneIcon className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium">Connect Accounts</p>
            <div className="absolute left-1/2 bottom-full mb-4 z-10 w-64 -translate-x-1/2 transform rounded-lg bg-background p-4 shadow-lg group-hover:block hidden">
              <p className="text-sm font-medium">
                Unlock this milestone by upgrading to our Pro plan.
              </p>
              <div className="mt-4">
                <Button className="w-full">Upgrade to Pro</Button>
              </div>
            </div>
          </div>
          <div className="group relative flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <MilestoneIcon className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium">Invite Friends</p>
            <div className="absolute left-1/2 bottom-full mb-4 z-10 w-64 -translate-x-1/2 transform rounded-lg bg-background p-4 shadow-lg group-hover:block hidden">
              <p className="text-sm font-medium">
                Unlock this milestone by upgrading to our Pro plan.
              </p>
              <div className="mt-4">
                <Button className="w-full">Upgrade to Pro</Button>
              </div>
            </div>
          </div>
          <div className="group relative flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <MilestoneIcon className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium">Earn Badges</p>
            <div className="absolute left-1/2 bottom-full mb-4 z-10 w-64 -translate-x-1/2 transform rounded-lg bg-background p-4 shadow-lg group-hover:block hidden">
              <p className="text-sm font-medium">
                Unlock this milestone by upgrading to our Pro plan.
              </p>
              <div className="mt-4">
                <Button className="w-full">Upgrade to Pro</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
});
