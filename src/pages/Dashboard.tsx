
import { useAuthStore } from '../store/authStore';
import TopicCard from '../components/TopicCard';
import { TopicCard as TopicCardType } from '../types';

const Dashboard = () => {
  const { user } = useAuthStore();

  const topicCards: TopicCardType[] = [
    {
      id: 'dsa',
      title: 'Data Structures & Algorithms',
      icon: '📦',
      gradient: 'from-teal-500 to-teal-700',
      stats: { topics: 19, contests: 16, problems: 473 },
      progress: 86,
      route: '/problems?category=dsa'
    },
    {
      id: 'arrays',
      title: 'Arrays & Strings',
      icon: '📊',
      gradient: 'from-blue-500 to-blue-700',
      stats: { modules: 10, quizzes: 10, chapters: 50 },
      progress: 65,
      route: '/problems?category=arrays'
    },
    {
      id: 'trees',
      title: 'Trees & Graphs',
      icon: '🌳',
      gradient: 'from-purple-500 to-purple-700',
      stats: { topics: 12, problems: 38 },
      progress: 42,
      route: '/problems?category=trees'
    },
    {
      id: 'dp',
      title: 'Dynamic Programming',
      icon: '🧮',
      gradient: 'from-pink-500 to-pink-700',
      stats: { topics: 8, problems: 52 },
      progress: 28,
      route: '/problems?category=dp'
    },
    {
      id: 'aptitude',
      title: 'Aptitude & Reasoning',
      icon: '🧠',
      gradient: 'from-orange-500 to-orange-700',
      stats: { modules: 15, quizzes: 25, chapters: 78 },
      progress: 73,
      route: '/quizzes?category=aptitude'
    }
  ];

  const currentDate = new Date();
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Continue your coding journey and master new concepts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Recently Used Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6">Recently Used</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topicCards.slice(0, 3).map((topic) => (
                  <TopicCard key={topic.id} topic={topic} />
                ))}
              </div>
            </div>

            {/* All Topics Sections */}
            <div className="space-y-8">
              <section>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Data Structures and Algorithms</h2>
                  <button className="text-primary hover:underline">View All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topicCards.slice(0, 2).map((topic) => (
                    <TopicCard key={topic.id} topic={topic} />
                  ))}
                </div>
              </section>

              <section>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Core Subjects</h2>
                  <button className="text-primary hover:underline">View All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topicCards.slice(2, 4).map((topic) => (
                    <TopicCard key={topic.id} topic={topic} />
                  ))}
                </div>
              </section>

              <section>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Aptitude & Skills</h2>
                  <button className="text-primary hover:underline">View All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {topicCards.slice(4).map((topic) => (
                    <TopicCard key={topic.id} topic={topic} />
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Monthly Streak */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="text-lg font-semibold mb-4">Monthly Streak</h3>
              <p className="text-sm text-muted-foreground mb-4">{monthName}</p>
              
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                  <div key={day} className="text-xs text-center text-muted-foreground p-1">
                    {day.slice(0, 1)}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => (
                  <div key={i} className="aspect-square rounded-sm flex items-center justify-center text-lg">
                    {i % 3 === 0 ? '🔥' : i % 7 === 0 ? '😊' : '😎'}
                  </div>
                ))}
              </div>
            </div>

            {/* Current Streak */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground">Current Streak</span>
                <span className="text-sm text-muted-foreground">Max Streak</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🔥</span>
                  <span className="text-2xl font-bold">0</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">⚡</span>
                  <span className="text-2xl font-bold">38</span>
                </div>
              </div>
            </div>

            {/* Daily Planner */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Daily Planner</h3>
                <button className="text-primary text-sm hover:underline">📝</button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input 
                    type="text" 
                    placeholder="Add a task"
                    className="flex-1 bg-muted/50 border border-border rounded px-3 py-2 text-sm"
                  />
                  <button className="bg-primary text-primary-foreground px-3 py-2 rounded text-sm">
                    Add
                  </button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="text-orange-500">📍</span>
                    <span className="text-muted-foreground">25-05-2025</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="text-orange-500">⭐</span> Linear Search
                    <div className="text-xs text-muted-foreground ml-4">27-01-2025 • Overdue by 118 days</div>
                  </div>
                </div>

                <div className="pt-4">
                  <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    📋 Completed (2)
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
