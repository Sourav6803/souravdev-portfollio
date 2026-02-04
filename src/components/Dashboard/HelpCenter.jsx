import { useState } from 'react';
import { FiSearch, FiChevronDown, FiChevronRight, FiExternalLink, FiMail, FiMessageSquare, FiHelpCircle } from 'react-icons/fi';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(null);

  // Sample data
  const helpCategories = [
    {
      id: 1,
      title: "Getting Started",
      icon: <FiHelpCircle className="text-purple-400" />,
      questions: [
        {
          id: 101,
          question: "How do I set up my portfolio?",
          answer: "To set up your portfolio, navigate to the Dashboard and click on 'Portfolio Setup'. Follow the step-by-step wizard to add your projects, skills, and personal information. You can always edit these later from your profile settings."
        },
        {
          id: 102,
          question: "What file formats can I upload?",
          answer: "We support JPG, PNG, GIF for images, MP4 for videos, and PDF for documents. Maximum file size is 20MB for images and 100MB for videos."
        },
        {
          id: 103,
          question: "How do I customize my theme?",
          answer: "Go to Settings > Appearance to customize colors, fonts, and layout. You can choose from preset themes or create your own custom theme."
        }
      ]
    },
    {
      id: 2,
      title: "Account Settings",
      icon: <FiHelpCircle className="text-blue-400" />,
      questions: [
        {
          id: 201,
          question: "How do I change my password?",
          answer: "Navigate to Settings > Account Security. Click 'Change Password' and follow the prompts. You'll need to verify your current password first."
        },
        {
          id: 202,
          question: "Can I use two-factor authentication?",
          answer: "Yes, we support 2FA via authenticator apps. Go to Settings > Account Security to set it up."
        }
      ]
    },
    {
      id: 3,
      title: "Troubleshooting",
      icon: <FiHelpCircle className="text-pink-400" />,
      questions: [
        {
          id: 301,
          question: "My images aren't loading properly",
          answer: "First, try clearing your browser cache. If that doesn't work, check that your images are in supported formats and under the size limit. Still having trouble? Contact support."
        },
        {
          id: 302,
          question: "I'm getting a 404 error",
          answer: "This usually means the page you're trying to access doesn't exist. Try refreshing the page or navigating from the main menu. If the problem persists, it might be a temporary server issue."
        }
      ]
    },
    {
      id: 4,
      title: "Billing & Payments",
      icon: <FiHelpCircle className="text-green-400" />,
      questions: [
        {
          id: 401,
          question: "Where can I find my invoices?",
          answer: "All invoices are available in your Billing section. You can download PDF copies or view them online."
        },
        {
          id: 402,
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
        }
      ]
    }
  ];

  const popularArticles = [
    { id: 1, title: "Optimizing your portfolio for SEO", category: "Getting Started" },
    { id: 2, title: "Connecting your custom domain", category: "Account Settings" },
    { id: 3, title: "Troubleshooting image uploads", category: "Troubleshooting" },
    { id: 4, title: "Understanding analytics data", category: "Getting Started" }
  ];

  const filteredCategories = helpCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const toggleCategory = (categoryId) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
    setActiveQuestion(null);
  };

  const toggleQuestion = (questionId) => {
    setActiveQuestion(activeQuestion === questionId ? null : questionId);
  };

  return (
    <div className="max-w-7xl mt-10 md:ml-64 mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Help Center
        </h1>
        <p className="text-gray-400 mb-8">Find answers to common questions or contact our support team</p>
        
        {/* Search Section */}
        <div className="mb-12 bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">How can we help you?</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search help articles..."
                className="w-full bg-gray-800 border border-gray-700 rounded-full pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {/* Popular Articles */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-gray-300">Popular Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularArticles.map(article => (
              <div 
                key={article.id} 
                className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-purple-500 transition-colors cursor-pointer"
              >
                <div className="flex items-center mb-2">
                  <FiHelpCircle className="text-purple-400 mr-2" />
                  <span className="text-xs text-gray-400">{article.category}</span>
                </div>
                <h4 className="font-medium">{article.title}</h4>
              </div>
            ))}
          </div>
        </div>
        
        {/* FAQ Sections */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-6 text-gray-300">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {filteredCategories.map(category => (
              <div key={category.id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <div 
                  className="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-800 transition-colors"
                  onClick={() => toggleCategory(category.id)}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{category.icon}</span>
                    <h3 className="font-medium">{category.title}</h3>
                  </div>
                  {activeCategory === category.id ? (
                    <FiChevronDown className="text-gray-400" />
                  ) : (
                    <FiChevronRight className="text-gray-400" />
                  )}
                </div>
                
                {activeCategory === category.id && (
                  <div className="border-t border-gray-800 divide-y divide-gray-800">
                    {category.questions.map(question => (
                      <div key={question.id} className="p-6">
                        <div 
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() => toggleQuestion(question.id)}
                        >
                          <h4 className="font-medium">{question.question}</h4>
                          {activeQuestion === question.id ? (
                            <FiChevronDown className="text-gray-400" />
                          ) : (
                            <FiChevronRight className="text-gray-400" />
                          )}
                        </div>
                        
                        {activeQuestion === question.id && (
                          <div className="mt-4 pl-6 text-gray-300">
                            <p>{question.answer}</p>
                            <div className="mt-4 flex items-center text-sm text-purple-400">
                              <span>Was this helpful?</span>
                              <button className="ml-4 px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700">Yes</button>
                              <button className="ml-2 px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700">No</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Contact Support */}
        <div className="bg-gray-900 rounded-xl p-8 shadow-lg border border-gray-800">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4 text-center">Still need help?</h3>
            <p className="text-gray-400 mb-8 text-center max-w-2xl mx-auto">
              Our support team is available 24/7 to help you with any questions or issues you might have.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
                <div className="w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMail className="text-purple-400 text-xl" />
                </div>
                <h4 className="font-medium mb-2">Email Us</h4>
                <p className="text-sm text-gray-400 mb-4">Get a response within 24 hours</p>
                <a href="mailto:support@yourportfolio.com" className="text-purple-400 text-sm hover:underline">
                  support@yourportfolio.com
                </a>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
                <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiMessageSquare className="text-blue-400 text-xl" />
                </div>
                <h4 className="font-medium mb-2">Live Chat</h4>
                <p className="text-sm text-gray-400 mb-4">Available 9AM-5PM EST</p>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                  Start Chat
                </button>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
                <div className="w-12 h-12 bg-pink-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiExternalLink className="text-pink-400 text-xl" />
                </div>
                <h4 className="font-medium mb-2">Community</h4>
                <p className="text-sm text-gray-400 mb-4">Get help from other users</p>
                <a 
                  href="https://community.yourportfolio.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pink-400 text-sm hover:underline flex items-center justify-center"
                >
                  Visit Forum <FiExternalLink className="ml-1" size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;