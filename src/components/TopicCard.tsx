
import { Link } from 'react-router-dom';
import { TopicCard as TopicCardType } from '../types';

interface TopicCardProps {
  topic: TopicCardType;
}

const TopicCard = ({ topic }: TopicCardProps) => {
  const progressPercentage = Math.round(topic.progress);
  const circumference = 2 * Math.PI * 20;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <Link to={topic.route} className="group">
      <div className={`topic-card ${topic.gradient}`}>
        <div className="topic-card-gradient"></div>
        
        <div className="relative z-10 flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
            <div className="space-y-1 text-sm opacity-90">
              {Object.entries(topic.stats).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                  <span className="font-semibold">{value}+</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="progress-ring ml-4">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r="20"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="opacity-30"
              />
              <circle
                cx="22"
                cy="22"
                r="20"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500 ease-in-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold">{progressPercentage}%</span>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 text-6xl opacity-20 group-hover:opacity-30 transition-opacity duration-300">
          {topic.icon}
        </div>
      </div>
    </Link>
  );
};

export default TopicCard;
