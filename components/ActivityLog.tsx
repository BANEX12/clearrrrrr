interface Activity {
  id: number;
  type: string;
  description: string;
  timestamp: string;
}

const activities: Activity[] = [
  {
    id: 1,
    type: 'search',
    description: 'Searched for John Smith',
    timestamp: '2 mins ago'
  },
  {
    id: 2,
    type: 'export',
    description: 'Exported search results',
    timestamp: '1 hour ago'
  },
  {
    id: 3,
    type: 'filter',
    description: 'Applied new search filters',
    timestamp: '3 hours ago'
  }
];

export function ActivityLog() {
  return (
    <div className="bg-white/5 rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center justify-between py-2 border-b border-white/10">
            <div>
              <p className="font-medium">{activity.description}</p>
              <p className="text-sm text-gray-400">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}