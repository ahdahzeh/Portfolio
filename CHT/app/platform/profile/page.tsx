"use client";

import { Card, CardHeader, CardContent } from "@/components/ui";
import { Input } from "@/components/ui";
import { Button } from "@/components/ui";
import { mockUser } from "@/lib/mock/user";

export default function ProfilePage() {
  return (
    <div className="max-w-3xl space-y-8">
      <h2 className="text-xl font-semibold text-gray-900">Profile & Settings</h2>

      <Card>
        <CardHeader>
          <h3 className="font-medium">Profile</h3>
        </CardHeader>
        <CardContent className="flex gap-6">
          <div className="flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <Input label="Name" defaultValue={mockUser.name} />
            <Input label="Email" type="email" defaultValue={mockUser.email} />
            <Input label="Role" defaultValue={mockUser.role} />
            <Input label="Organization" defaultValue={mockUser.organization} />
            <Button variant="outline" size="sm">Change avatar</Button>
          </div>
        </CardContent>
        <div className="px-4 pb-4">
          <Button>Save changes</Button>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-medium">Activity Summary</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-2xl font-bold text-teal-600">{mockUser.stats.webinarsCompleted}</p>
              <p className="text-sm text-gray-600">Webinars completed</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-2xl font-bold text-teal-600">{mockUser.stats.surveysCompleted}</p>
              <p className="text-sm text-gray-600">Surveys completed</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-2xl font-bold text-teal-600">{mockUser.stats.contentWatched}</p>
              <p className="text-sm text-gray-600">Content watched</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="font-medium">Achievements</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockUser.achievements.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-4 p-4 border border-[var(--border)] rounded-lg"
              >
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{a.title}</p>
                  <p className="text-sm text-gray-600">{a.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Earned {a.earnedAt}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
