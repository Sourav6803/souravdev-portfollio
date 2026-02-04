import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { FiBarChart2, FiPieChart, FiTrendingUp, FiDollarSign, FiClock, FiLayers } from 'react-icons/fi';

ChartJS.register(...registerables);

const Performance = () => {
  const [timeRange, setTimeRange] = useState('1y');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock performance data
  const [performanceData, setPerformanceData] = useState({
    totalValue: 0,
    growthRate: 0,
    bestProject: '',
    worstProject: '',
    projectPerformance: [],
    skillDistribution: [],
    timeline: []
  });

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setPerformanceData({
        totalValue: 125000,
        growthRate: 24.7,
        bestProject: 'E-commerce Platform',
        worstProject: 'Weather App',
        projectPerformance: [
          { name: 'E-commerce Platform', value: 45000, growth: 32.5 },
          { name: 'Portfolio Website', value: 38000, growth: 18.2 },
          { name: 'AI Chatbot', value: 28000, growth: 22.1 },
          { name: 'Mobile Game', value: 12000, growth: 8.7 },
          { name: 'Weather App', value: 2000, growth: -4.2 },
        ],
        skillDistribution: [
          { skill: 'React', percentage: 35 },
          { skill: 'Node.js', percentage: 25 },
          { skill: 'UI/UX', percentage: 20 },
          { skill: 'Python', percentage: 15 },
          { skill: 'Other', percentage: 5 },
        ],
        timeline: Array.from({ length: 12 }, (_, i) => ({
          month: new Date(Date.now() - (11 - i) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
          value: Math.floor(Math.random() * 30000) + 80000,
          visitors: Math.floor(Math.random() * 500) + 200,
        }))
      });
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  const valueTimelineData = {
    labels: performanceData.timeline.map(item => item.month),
    datasets: [
      {
        label: 'Portfolio Value',
        data: performanceData.timeline.map(item => item.value),
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        tension: 0.4,
        fill: true,
        yAxisID: 'y',
      },
      {
        label: 'Visitors',
        data: performanceData.timeline.map(item => item.visitors),
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        tension: 0.4,
        fill: true,
        yAxisID: 'y1',
      }
    ]
  };

  const projectPerformanceData = {
    labels: performanceData.projectPerformance.map(item => item.name),
    datasets: [{
      data: performanceData.projectPerformance.map(item => item.value),
      backgroundColor: [
        '#6366f1',
        '#8b5cf6',
        '#ec4899',
        '#f43f5e',
        '#f59e0b'
      ],
      borderWidth: 0,
    }]
  };

  const skillDistributionData = {
    labels: performanceData.skillDistribution.map(item => item.skill),
    datasets: [{
      data: performanceData.skillDistribution.map(item => item.percentage),
      backgroundColor: [
        '#3b82f6',
        '#10b981',
        '#f59e0b',
        '#ec4899',
        '#8b5cf6'
      ],
      borderWidth: 0,
    }]
  };

  return (
    <div className="max-w-7xl mt-10 md:ml-64 mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Portfolio Performance
            </h1>
            <p className="text-gray-400 mt-1">Track your portfolio growth and project metrics</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2 bg-gray-900 rounded-lg p-1">
            {['1m', '3m', '6m', '1y', 'All'].map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 text-sm rounded-md transition-all ${timeRange === range ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
              >
                {range}
              </button>
            ))}
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-800 mb-6">
          {['overview', 'projects', 'skills', 'analytics'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium capitalize ${activeTab === tab ? 'text-indigo-400 border-b-2 border-indigo-500' : 'text-gray-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <StatCard 
                    icon={<FiDollarSign className="text-green-400" size={24} />} 
                    title="Total Value" 
                    value={`$${performanceData.totalValue.toLocaleString()}`} 
                    change={`+${performanceData.growthRate}%`} 
                    isPositive 
                  />
                  <StatCard 
                    icon={<FiTrendingUp className="text-blue-400" size={24} />} 
                    title="Best Project" 
                    value={performanceData.bestProject} 
                    change="Top performer" 
                    isPositive 
                  />
                  <StatCard 
                    icon={<FiBarChart2 className="text-yellow-400" size={24} />} 
                    title="Needs Improvement" 
                    value={performanceData.worstProject} 
                    change="Lowest growth" 
                    isPositive={false} 
                  />
                </div>

                {/* Main Chart */}
                <div className="bg-gray-900 rounded-xl p-4 md:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Portfolio Value & Visitors</h2>
                    <div className="flex space-x-2">
                      <span className="flex items-center text-sm">
                        <span className="w-3 h-3 rounded-full bg-purple-500 mr-1"></span>
                        Portfolio Value
                      </span>
                      <span className="flex items-center text-sm">
                        <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                        Visitors
                      </span>
                    </div>
                  </div>
                  <div className="h-80">
                    <Chart 
                      type="line"
                      data={valueTimelineData} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: { display: false },
                          tooltip: { 
                            mode: 'index', 
                            intersect: false,
                            backgroundColor: '#1f2937',
                            titleColor: '#f3f4f6',
                            bodyColor: '#e5e7eb',
                            borderColor: '#4b5563',
                            borderWidth: 1,
                          }
                        },
                        scales: {
                          y: { 
                            type: 'linear',
                            display: true,
                            position: 'left',
                            grid: { color: 'rgba(255,255,255,0.1)' },
                            ticks: {
                              callback: function(value) {
                                return '$' + value.toLocaleString();
                              }
                            }
                          },
                          y1: {
                            type: 'linear',
                            display: true,
                            position: 'right',
                            grid: { drawOnChartArea: false },
                          },
                          x: { grid: { color: 'rgba(255,255,255,0.1)' } }
                        },
                        elements: {
                          point: { radius: 0, hoverRadius: 6 }
                        }
                      }} 
                    />
                  </div>
                </div>

                {/* Project Performance */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-900 rounded-xl p-4 md:p-6">
                    <h2 className="text-lg font-semibold mb-4">Project Value Distribution</h2>
                    <div className="h-64">
                      <Chart 
                        type="bar"
                        data={projectPerformanceData} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: { display: false },
                            tooltip: { 
                              backgroundColor: '#1f2937',
                              titleColor: '#f3f4f6',
                              bodyColor: '#e5e7eb',
                              borderColor: '#4b5563',
                              borderWidth: 1,
                              callbacks: {
                                label: function(context) {
                                  return `$${context.raw.toLocaleString()}`;
                                }
                              }
                            }
                          },
                          scales: {
                            y: { 
                              grid: { color: 'rgba(255,255,255,0.1)' },
                              ticks: {
                                callback: function(value) {
                                  return '$' + value.toLocaleString();
                                }
                              }
                            },
                            x: { grid: { color: 'rgba(255,255,255,0.1)' } }
                          }
                        }} 
                      />
                    </div>
                  </div>

                  <div className="bg-gray-900 rounded-xl p-4 md:p-6">
                    <h2 className="text-lg font-semibold mb-4">Skill Distribution</h2>
                    <div className="h-64">
                      <Chart 
                        type="pie"
                        data={skillDistributionData} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: { 
                              position: 'right',
                              labels: { color: '#e5e7eb' }
                            },
                            tooltip: { 
                              backgroundColor: '#1f2937',
                              titleColor: '#f3f4f6',
                              bodyColor: '#e5e7eb',
                              borderColor: '#4b5563',
                              borderWidth: 1,
                              callbacks: {
                                label: function(context) {
                                  return `${context.label}: ${context.raw}%`;
                                }
                              }
                            }
                          }
                        }} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="bg-gray-900 rounded-xl p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-4">Project Performance Details</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-800">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Project</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Value</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Growth</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Visitors</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {performanceData.projectPerformance.map((project, index) => (
                        <tr key={index} className="hover:bg-gray-800 transition-colors">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-100">{project.name}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">${project.value.toLocaleString()}</td>
                          <td className={`px-4 py-3 whitespace-nowrap text-sm ${project.growth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {project.growth >= 0 ? '+' : ''}{project.growth}%
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                            {Math.floor(project.value / 100).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${project.growth >= 20 ? 'bg-green-900 text-green-300' : project.growth >= 0 ? 'bg-yellow-900 text-yellow-300' : 'bg-red-900 text-red-300'}`}>
                              {project.growth >= 20 ? 'Excellent' : project.growth >= 0 ? 'Moderate' : 'Needs Work'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="bg-gray-900 rounded-xl p-4 md:p-6">
                <h2 className="text-lg font-semibold mb-4">Skill Impact Analysis</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="h-96">
                      <Chart 
                        type="doughnut"
                        data={skillDistributionData} 
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: { 
                              position: 'right',
                              labels: { color: '#e5e7eb' }
                            },
                            tooltip: { 
                              backgroundColor: '#1f2937',
                              titleColor: '#f3f4f6',
                              bodyColor: '#e5e7eb',
                              borderColor: '#4b5563',
                              borderWidth: 1,
                              callbacks: {
                                label: function(context) {
                                  return `${context.label}: ${context.raw}%`;
                                }
                              }
                            }
                          }
                        }} 
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {performanceData.skillDistribution.map((skill, index) => (
                      <div key={index} className="bg-gray-800 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium text-gray-100">{skill.skill}</h3>
                          <span className="text-sm font-medium text-indigo-400">{skill.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-indigo-500 h-2 rounded-full" 
                            style={{ width: `${skill.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-900 rounded-xl p-4 md:p-6">
                    <h2 className="text-lg font-semibold mb-4">Engagement Metrics</h2>
                    <div className="space-y-4">
                      <MetricItem 
                        icon={<FiLayers className="text-blue-400" />}
                        title="Avg. Pages per Visit"
                        value="3.2"
                        change="+12%"
                        isPositive
                      />
                      <MetricItem 
                        icon={<FiClock className="text-purple-400" />}
                        title="Avg. Session Duration"
                        value="2m 45s"
                        change="+8%"
                        isPositive
                      />
                      <MetricItem 
                        icon={<FiTrendingUp className="text-green-400" />}
                        title="Bounce Rate"
                        value="42%"
                        change="-5%"
                        isPositive
                      />
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded-xl p-4 md:p-6">
                    <h2 className="text-lg font-semibold mb-4">Conversion Metrics</h2>
                    <div className="space-y-4">
                      <MetricItem 
                        icon={<FiDollarSign className="text-yellow-400" />}
                        title="Lead Conversion"
                        value="8.5%"
                        change="+2.3%"
                        isPositive
                      />
                      <MetricItem 
                        icon={<FiPieChart className="text-red-400" />}
                        title="Project Interest"
                        value="64%"
                        change="+14%"
                        isPositive
                      />
                      <MetricItem 
                        icon={<FiBarChart2 className="text-indigo-400" />}
                        title="Contact Rate"
                        value="22%"
                        change="+7%"
                        isPositive
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900 rounded-xl p-4 md:p-6">
                  <h2 className="text-lg font-semibold mb-4">Performance Recommendations</h2>
                  <div className="space-y-3">
                    <Recommendation 
                      title="Improve Weather App"
                      description="Consider adding more features or redesigning the UI to increase engagement."
                      priority="High"
                    />
                    <Recommendation 
                      title="Highlight E-commerce Platform"
                      description="This is your top performer. Consider featuring it more prominently."
                      priority="Medium"
                    />
                    <Recommendation 
                      title="Expand AI Skills"
                      description="Your AI projects are performing well. Consider adding more AI/ML projects."
                      priority="Medium"
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Reuse StatCard component from Visitors page
const StatCard = ({ icon, title, value, change, isPositive }) => {
  return (
    <div className="bg-gray-900 rounded-xl p-4 md:p-6 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/10">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-gray-400 text-sm font-medium mb-1">{title}</div>
          <div className="text-2xl font-bold text-white">{value}</div>
        </div>
        <div className="p-2 rounded-lg bg-gray-800">{icon}</div>
      </div>
      <div className={`mt-4 text-sm flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        <span>{change}</span>
        <svg
          className={`w-4 h-4 ml-1 ${isPositive ? 'rotate-0' : 'rotate-180'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </div>
    </div>
  );
};

const MetricItem = ({ icon, title, value, change, isPositive }) => {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
      <div className="flex items-center">
        <div className="p-2 rounded-full bg-gray-800 mr-3">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-300">{title}</h3>
          <p className="text-xl font-semibold text-white">{value}</p>
        </div>
      </div>
      <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
        {change}
      </span>
    </div>
  );
};

const Recommendation = ({ title, description, priority }) => {
  const priorityColors = {
    High: 'red',
    Medium: 'yellow',
    Low: 'green'
  };

  return (
    <div className="flex items-start p-4 border border-gray-800 rounded-lg hover:border-indigo-500 transition-colors">
      <div className={`w-3 h-3 rounded-full mt-1 mr-3 bg-${priorityColors[priority]}-500`}></div>
      <div>
        <h3 className="font-medium text-gray-100">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
        <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full bg-${priorityColors[priority]}-900 text-${priorityColors[priority]}-300`}>
          {priority} Priority
        </span>
      </div>
    </div>
  );
};

export default Performance;