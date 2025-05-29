
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const ProblemDetail = () => {
  const { id } = useParams();
  const [code, setCode] = useState('// Write your solution here\nfunction twoSum(nums, target) {\n    \n}');
  const [language, setLanguage] = useState('javascript');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock problem data - replace with actual API call
  const problem = {
    id: 1,
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: `• 2 ≤ nums.length ≤ 10⁴
• -10⁹ ≤ nums[i] ≤ 10⁹  
• -10⁹ ≤ target ≤ 10⁹
• Only one valid answer exists.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    timeLimit: 1000,
    memoryLimit: 256
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Show result toast or redirect to submissions
    }, 2000);
  };

  const handleRun = () => {
    // Implement code execution logic
    console.log('Running code:', code);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-12rem)]">
          {/* Problem Description */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <h1 className="text-2xl font-bold">{problem.title}</h1>
                <Badge className={getDifficultyColor(problem.difficulty)}>
                  {problem.difficulty}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {problem.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Tabs defaultValue="description" className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
                <TabsTrigger value="solutions">Solutions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="flex-1 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Problem Statement</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{problem.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Examples</h3>
                    <div className="space-y-4">
                      {problem.examples.map((example, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="text-base">Example {index + 1}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div>
                              <span className="font-medium">Input:</span> {example.input}
                            </div>
                            <div>
                              <span className="font-medium">Output:</span> {example.output}
                            </div>
                            <div>
                              <span className="font-medium">Explanation:</span> {example.explanation}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Constraints</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{problem.constraints}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="submissions">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Your submissions will appear here</p>
                </div>
              </TabsContent>

              <TabsContent value="solutions">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Solutions and discussions</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Code Editor */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 rounded-md border border-border bg-background text-foreground"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleRun}>
                  Run
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </div>

            <div className="flex-1 border border-border rounded-lg overflow-hidden">
              <Editor
                height="100%"
                defaultLanguage={language}
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  automaticLayout: true,
                }}
              />
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Time Limit: {problem.timeLimit}ms</span>
                <span>Memory Limit: {problem.memoryLimit}MB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
