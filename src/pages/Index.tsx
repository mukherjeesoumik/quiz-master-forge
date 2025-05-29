
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Code, Users, Trophy, BookOpen } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuthStore();

  const features = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "Coding Problems",
      description: "Practice with thousands of carefully curated DSA problems"
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "MCQ & Aptitude",
      description: "Master quantitative aptitude and logical reasoning"
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Contests",
      description: "Participate in weekly contests and climb the leaderboard"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description: "Learn with thousands of aspiring programmers"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">Q</span>
              </div>
              <span className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                QuizMaster
              </span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Master DSA & 
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"> Competitive Programming</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Practice coding problems, master data structures & algorithms, and ace your technical interviews 
            with our comprehensive platform designed for aspiring developers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="text-lg px-8 py-6">
                  <Link to="/register">Start Learning Free</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Link to="/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From basic concepts to advanced algorithms, we've got you covered
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="mx-auto mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">2000+</div>
              <div className="text-xl text-muted-foreground">Coding Problems</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">50K+</div>
              <div className="text-xl text-muted-foreground">Active Students</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">95%</div>
              <div className="text-xl text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to start your coding journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students who have already improved their coding skills
          </p>
          {!isAuthenticated && (
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/register">Get Started Now</Link>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
