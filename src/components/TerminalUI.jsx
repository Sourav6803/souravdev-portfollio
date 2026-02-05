import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTerminal, FiCopy, FiCheck, FiChevronRight, FiCode, FiCpu, FiShield, FiCloud, FiDatabase, FiZap, FiX, FiMaximize2 } from 'react-icons/fi';
import { VscTerminalBash } from 'react-icons/vsc';

const TerminalUI = () => {
  const [commands, setCommands] = useState([
    { id: 1, text: 'whoami', output: '> sourav_bhukta', showCursor: false },
    { id: 2, text: 'cat skills.txt', output: '> full_stack_developer, problem_solver, clean_coder', showCursor: false },
    { id: 3, text: 'pwd', output: '> /home/sourav/portfolio', showCursor: false },
    { id: 4, text: 'ls -la', output: '> projects/  experience/  skills/  contact/', showCursor: false },
    { id: 5, text: 'status --current', output: '> 🚀 open_to_opportunities', showCursor: true },
  ]);
  
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(true);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commands]);

  const handleCommand = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      setIsTyping(true);
      const newCommand = {
        id: Date.now(),
        text: input,
        output: getCommandOutput(input),
        showCursor: false
      };
      
      setCommands([...commands, newCommand]);
      setInput('');
      
      // Reset typing indicator
      setTimeout(() => setIsTyping(false), 500);
    }
  };

  const getCommandOutput = (cmd) => {
    const cmdLower = cmd.toLowerCase();
    if (cmdLower.includes('help') || cmdLower === '?') {
      return `> Available commands: about, skills, projects, experience, contact, clear`;
    } else if (cmdLower.includes('about')) {
      return `> Developer based in Croatia 🇭🇷 | Passion for code & problem-solving`;
    } else if (cmdLower.includes('skills')) {
      return `> React, Node.js, Python, TypeScript, MongoDB, AWS, Docker, Kubernetes`;
    } else if (cmdLower.includes('projects')) {
      return `> Check out my work section for 15+ completed projects`;
    } else if (cmdLower.includes('experience')) {
      return `> ${new Date().getFullYear() - 2020}+ years building digital solutions`;
    } else if (cmdLower.includes('contact')) {
      return `> Reach me at: email@example.com | Available for collaborations`;
    } else if (cmdLower.includes('clear')) {
      setCommands([]);
      return '';
    } else {
      return `> Command not found: ${cmd}. Type 'help' for available commands.`;
    }
  };

  const copyTerminalContent = () => {
    const content = commands.map(c => `$ ${c.text}\n${c.output}`).join('\n');
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickCommands = ['help', 'about', 'skills', 'projects', 'contact'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative ${isFullscreen ? 'fixed inset-0 z-[9999] p-4 bg-gray-950' : 'w-full'}`}
    >
      {/* Terminal Container */}
      <div className={`rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-black/50 ${isFullscreen ? 'h-full' : ''}`}>
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-3 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <button 
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="w-3 h-3 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors flex items-center justify-center"
              >
                <FiMaximize2 className="w-2 h-2 text-gray-300" />
              </button>
              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
            </div>
            <div className="flex items-center space-x-2">
              <VscTerminalBash className="w-4 h-4 text-green-400" />
              <span className="text-xs font-mono text-gray-300">terminal</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xs font-mono text-gray-500">sourav@portfolio:~</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={copyTerminalContent}
              className="flex items-center space-x-1 px-2 py-1 rounded-md bg-gray-800 hover:bg-gray-700 border border-gray-600 transition-colors"
            >
              {copied ? <FiCheck className="w-3 h-3 text-green-400" /> : <FiCopy className="w-3 h-3 text-gray-400" />}
              <span className="text-xs font-mono text-gray-300">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            {isFullscreen && (
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-1 rounded-md hover:bg-gray-700"
              >
                <FiX className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          className={`font-mono overflow-y-auto terminal-scrollbar ${isFullscreen ? 'h-[calc(100%-3rem)]' : 'h-[400px]'}`}
          style={{
            background: 'linear-gradient(165deg, rgba(10, 10, 12, 0.98), rgba(5, 5, 7, 1))',
          }}
        >
          {/* Content Container - Properly Aligned */}
          <div className="p-4 sm:p-6 space-y-4">
            {/* Welcome Message */}
            <div className="space-y-1">
              <div className="text-green-400 text-sm">╭─🚀 Welcome to Sourav's Portfolio Terminal</div>
              <div className="text-cyan-400 text-sm">╰─$ Type 'help' to see available commands</div>
            </div>

            {/* Command History - Minimal Gap */}
            <div className="space-y-3">
              {commands.map((cmd) => (
                <div key={cmd.id} className="space-y-0">
                  <div className="flex items-start">
                    <span className="text-purple-400 text-sm mr-2 flex-shrink-0">$</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-gray-200 text-sm font-medium">{cmd.text}</span>
                      {cmd.showCursor && (
                        <motion.span
                          className="ml-1 inline-block w-[3px] h-4 bg-green-400 align-middle"
                          animate={{ opacity: [1, 0, 1] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                        />
                      )}
                    </div>
                  </div>
                  {cmd.output && (
                    <motion.div
                      initial={{ opacity: 0, x: 5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-green-300 text-sm ml-4 pl-1 border-l border-gray-800"
                    >
                      {cmd.output}
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Commands - Compact */}
            <div className="pt-2">
              <div className="text-gray-500 text-xs mb-2">Quick commands:</div>
              <div className="flex flex-wrap gap-1.5">
                {quickCommands.map((cmd) => (
                  <motion.button
                    key={cmd}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setInput(cmd);
                      inputRef.current?.focus();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-300 text-xs font-mono transition-all duration-150"
                  >
                    {cmd}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Stats Grid - Tight Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-800">
              <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-800">
                <div className="text-green-400 text-xs font-mono mb-1">$ system_info</div>
                <div className="space-y-0.5">
                  <div className="text-gray-400 text-xs">OS: Ubuntu 22.04</div>
                  <div className="text-gray-400 text-xs">Shell: zsh 5.8</div>
                  <div className="text-gray-400 text-xs">Editor: VS Code</div>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-800">
                <div className="text-cyan-400 text-xs font-mono mb-1">$ current_status</div>
                <div className="space-y-0.5">
                  <div className="text-gray-400 text-xs">📍 Infomaticae Technology Pvt LTD</div>
                  <div className="text-gray-400 text-xs">💼 Open to Work</div>
                  <div className="text-gray-400 text-xs">⏱️ &lt; 24h</div>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-800">
                <div className="text-yellow-400 text-xs font-mono mb-1">$ cat .env</div>
                <div className="space-y-0.5">
                  <div className="text-gray-400 text-xs">NODE_ENV=production</div>
                  <div className="text-gray-400 text-xs">REACT_APP_MODE=awesome</div>
                  <div className="text-gray-400 text-xs">VERSION=2.0</div>
                </div>
              </div>
            </div>

            {/* Input Line - Fixed at bottom */}
            <div className="pt-4 border-t border-gray-800">
              <div className="flex items-center">
                <div className="flex items-center mr-2 flex-shrink-0">
                  <span className="text-purple-400 text-sm">$</span>
                  <FiChevronRight className="text-green-400 w-3 h-3 mx-1" />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleCommand}
                  className="flex-1 bg-transparent text-gray-200 text-sm outline-none font-mono placeholder-gray-600"
                  placeholder="Type a command..."
                  autoFocus
                />
                {isTyping && (
                  <motion.div
                    className="ml-2 w-1 h-4 bg-green-400 rounded"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6 }}
                  />
                )}
              </div>
              <div className="mt-2 text-gray-600 text-xs">
                Press <span className="text-gray-400">↑↓</span> for history • <span className="text-gray-400">Tab</span> to autocomplete
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TerminalUI;