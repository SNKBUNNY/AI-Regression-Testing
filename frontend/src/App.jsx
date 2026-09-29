import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import * as XLSX from 'xlsx';
import { Play, CheckCircle, XCircle, AlertTriangle, Loader, Globe, FileSpreadsheet, Terminal, Monitor, Bot, Send } from 'lucide-react';
import './index.css';

const socket = io('http://localhost:5001');

const AIRegressionTestingPlatform = () => {
  const [url, setUrl] = useState('https://example.com');
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState({});
  const [botActivity, setBotActivity] = useState([]);
  const [videoFrame, setVideoFrame] = useState(null);
  const [recordedFrames, setRecordedFrames] = useState([]);
  const [playbackFrame, setPlaybackFrame] = useState(null);
  const [testComplete, setTestComplete] = useState(false);
  
  // Chat State
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  const terminalRef = useRef(null);
  const playbackRef = useRef(null);
  const chatTimeoutRef = useRef(null);

  useEffect(() => {
    socket.on('test-update', (data) => setResults((prev) => ({ ...prev, [data.module]: data })));

    socket.on('bot-activity', (data) => {
      setBotActivity((prev) => [...prev, data]);
      if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    });

    socket.on('video-frame', (frame) => {
      setVideoFrame(frame);
      setRecordedFrames(prev => prev.length < 150 ? [...prev, frame] : prev);
    });

    socket.on('ai-chat-response', (response) => {
      clearTimeout(chatTimeoutRef.current); // Cancel the timeout
      setChatMessages(prev => [...prev, { role: 'ai', text: response }]);
      setIsAiThinking(false);
    });

    socket.on('test-complete', () => {
      setIsRunning(false);
      setTestComplete(true);
      setVideoFrame(null);
      
      // Start video replay
      let i = 0;
      if (playbackRef.current) clearInterval(playbackRef.current);
      playbackRef.current = setInterval(() => {
        setPlaybackFrame(recordedFrames[i]);
        i++;
        if (i >= recordedFrames.length) i = 0;
      }, 100);
    });

    return () => {
      socket.off('test-update'); socket.off('bot-activity'); socket.off('video-frame');
      socket.off('ai-chat-response'); socket.off('test-complete');
      if (playbackRef.current) clearInterval(playbackRef.current);
    };
  }, [recordedFrames]);

  const startTest = () => {
    setIsRunning(true);
    setTestComplete(false);
    setResults({});
    setBotActivity([]);
    setVideoFrame(null);
    setPlaybackFrame(null);
    setRecordedFrames([]);
    setChatMessages([]);
    if (playbackRef.current) clearInterval(playbackRef.current);
    socket.emit('start-regression-test', url);
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    const question = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: question }]);
    setChatInput('');
    setIsAiThinking(true);
    socket.emit('ask-ai', { question, results });

    // 16-second frontend timeout
    clearTimeout(chatTimeoutRef.current);
    chatTimeoutRef.current = setTimeout(() => {
      setChatMessages(prev => [...prev, { role: 'ai', text: '⚠️ The AI is taking too long to respond. Please check your backend terminal for API errors.' }]);
      setIsAiThinking(false);
    }, 16000);
  };

  const exportToExcel = () => {
    const exportData = [];
    Object.entries(results).forEach(([module, res]) => {
      if (res.data) {
        let row = {
          'Test Module': module,
          'Status': res.data.status || 'N/A',
          'Summary': res.data.summary || 'No summary available.'
        };
        Object.entries(res.data).forEach(([k, v]) => {
          if (!['status', 'summary', 'screenshot'].includes(k)) {
            row[k] = typeof v === 'object' ? JSON.stringify(v) : v;
          }
        });
        exportData.push(row);
      }
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Full Test Report');
    XLSX.writeFile(wb, `QA_Report_${new Date().getTime()}.xlsx`);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-left">
          <h1>AI Regression Testing Platform</h1>
          <p>Real-Time Visual Automation | 13 Suites | 100-User Stress | AI Chat</p>
        </div>
        <div className="header-right">
          {testComplete && (
            <button onClick={exportToExcel} className="btn-secondary">
              <FileSpreadsheet size={20} /> Export Full Report
            </button>
          )}
        </div>
      </header>

      <div className="input-section">
        <div className="input-wrapper">
          <Globe size={20} />
          <input 
            type="text" 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            placeholder="Enter website URL"
          />
        </div>
        <button onClick={startTest} disabled={isRunning} className="btn-primary">
          {isRunning ? <Loader size={20} className="animate-spin" /> : <Play size={20} />}
          {isRunning ? 'Executing...' : 'Run Test'}
        </button>
      </div>

      <div className="dashboard-grid">
        {/* LEFT PANEL: Video & Logs */}
        <div className="left-panel">
          <div className="video-panel">
            <div className="terminal-header">
              <Monitor size={18} /> {testComplete ? 'Video Replay' : 'Live Chromium View'}
              <div className="terminal-controls">
                <span className="dot red"></span><span className="dot yellow"></span><span className="dot green"></span>
              </div>
            </div>
            <div className="video-container">
              {isRunning && videoFrame ? (
                <img src={videoFrame} alt="Live" className="live-video-feed" />
              ) : testComplete && playbackFrame ? (
                <img src={playbackFrame} alt="Replay" className="live-video-feed" />
              ) : (
                <div className="video-placeholder">
                  <Monitor size={48} />
                  <p>{isRunning ? 'Starting...' : 'Awaiting test.'}</p>
                </div>
              )}
            </div>
          </div>

          <div className="terminal-panel">
            <div className="terminal-header"><Terminal size={18} /> Execution Logs</div>
            <div className="terminal-body" ref={terminalRef}>
              {botActivity.map((log, idx) => (
                <div key={idx} className="terminal-line">
                  <span className="terminal-time">[{log.timestamp}]</span>
                  <span className="terminal-msg">{log.message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Chatbot, Modules, Screenshots */}
        <div className="results-panel">
          
          {/* AI CHATBOT */}
          <div className="ai-chat-panel">
            <div className="ai-header"><Bot size={20} /> AI QA Assistant</div>
            <div className="ai-chat-body" ref={terminalRef}>
              {chatMessages.length === 0 ? (
                <p className="chat-empty">Test complete. Ask me about the metrics, failures, or how the bot calculated them!</p>
              ) : (
                chatMessages.map((msg, idx) => (
                  <div key={idx} className={`chat-msg ${msg.role}`}>
                    {msg.text}
                  </div>
                ))
              )}
              {isAiThinking && <div className="chat-msg ai">Thinking...</div>}
            </div>
            <div className="ai-chat-input">
              <input 
                type="text" 
                value={chatInput} 
                onChange={(e) => setChatInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && !isAiThinking && handleChatSend()}
                disabled={isAiThinking}
                placeholder="Ask about test results..."
              />
              <button onClick={handleChatSend} disabled={isAiThinking} className="chat-send-btn"><Send size={16} /></button>
            </div>
          </div>

          <div className="modules-grid">
            {Array.from({ length: 13 }, (_, i) => i + 1).map(num => {
              const prefix = num.toString().padStart(2, '0');
              const moduleName = Object.keys(results).find(k => k.startsWith(prefix));
              const moduleTitle = moduleName || `${prefix} Test Module`;
              return <ModuleCard key={moduleTitle} title={moduleTitle} data={results[moduleTitle]} />;
            })}
            <ModuleCard title="Stress & Resources" data={results['Stress & Resources']} />
          </div>

          {results['03 UI/UX Testing']?.data?.screenshot && (
            <div className="screenshot-preview">
              <h3>Final UI Screenshot</h3>
              <img src={`data:image/png;base64,${results['03 UI/UX Testing'].data.screenshot}`} alt="Screenshot" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ModuleCard = ({ title, data }) => {
  const status = data?.data?.status || 'pending';
  const statusConfig = {
    pending: { text: 'Pending', icon: Loader },
    passed: { text: 'Passed', icon: CheckCircle },
    failed: { text: 'Failed', icon: XCircle },
    warning: { text: 'Warning', icon: AlertTriangle }
  };
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className={`module-card ${status}`}>
      <div className="module-header">
        <span className="module-title">{title}</span>
        <div className="module-status-badge">
          <StatusIcon size={12} className={status === 'pending' ? 'animate-spin' : ''} />
          {config.text}
        </div>
      </div>
      <div className="module-body">
        {status !== 'pending' && data?.data?.summary && <p className="summary-text">{data.data.summary}</p>}
        {data?.data?.metrics && (
          <div className="metrics-grid">
            {Object.entries(data.data.metrics).map(([k, v]) => (
              <div key={k} className="metric-item">
                <span className="metric-label">{k}</span>
                <span className="metric-value">{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRegressionTestingPlatform;