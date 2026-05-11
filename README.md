# AI Regression Testing Platform

A comprehensive web-based testing platform powered by AI, designed to automate and streamline regression testing across multiple testing types including functional, performance, UI/visual, security, accessibility, integration, and code/algorithm testing.

## 🎯 Project Overview

This platform provides an interactive interface for creating, managing, and executing various types of automated tests against web applications and coding problems. It features:

- **Functional Testing**: Validate user workflows and application flows
- **Performance Testing**: Monitor load times and performance metrics
- **UI/Visual Regression Testing**: Detect unintended visual changes
- **Security Testing**: Identify OWASP Top 10 vulnerabilities
- **Accessibility Testing**: Ensure WCAG 2.1 compliance
- **Integration Testing**: Test API endpoints and data contracts
- **Code Testing**: Validate algorithms with auto-generated or database test cases
- **AI Chat Assistant**: Interactive help with test management and validation

## 📋 Features

### Test Management
- Create and manage multiple test suites
- Support for different test types (functional, performance, UI, security, accessibility, integration, code)
- Real-time test execution status tracking
- Detailed test results and metrics
- Edit and delete tests
- Global URL configuration for batch testing

### Code Problem Testing
- Generate test cases from 2,437+ LeetCode-style problem database
- Automatic test case generation based on problem patterns
- Support for easy, medium, and hard difficulty levels
- Constraint validation and edge case coverage
- Direct database lookup for real validation test cases

### AI Chat Assistant
- Interactive guidance on how tests are validated
- Explanation of validation metrics for each test type
- Daily testing summary and statistics
- Real-time help with test configuration

### Smart Features
- Domain validation (URL format, reachability, whitelist checking)
- TLD validation for legitimate domains
- Test step completion tracking
- Visual regression detection with pixel-level analysis
- Security header verification
- WCAG compliance checking

## 🛠️ Technology Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 7.3.1
- **Styling**: Tailwind CSS 4.1.18
- **Icons**: Lucide React 0.562.0
- **PostCSS**: 8.5.6
- **Autoprefixer**: 10.4.23

## 📁 Project Structure

```
ai-regression-testing/
├── src/
│   ├── App.jsx                 # Main application component
│   ├── App.css                 # Application styles
│   ├── main.jsx                # React entry point
│   ├── index.css               # Global styles
│   ├── problemsDatabase.js     # 2,437+ LeetCode problem database
│   └── testCaseGenerator.js    # Automatic test case generation
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js           # PostCSS configuration
├── package.json                # Project dependencies
└── README.md                   # This file
```

## ⚙️ Prerequisites

- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher
- **Web Browser**: Modern browser (Chrome, Firefox, Safari, Edge)
- **Internet Connection**: For testing against external URLs

## 🚀 Installation & Setup

### Step 1: Clone or Extract the Project

```bash
# Navigate to project directory
cd ai-regression-testing
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- React and React DOM
- Vite and build tools
- Tailwind CSS and PostCSS
- Lucide React icons

## 📝 Execution Steps

### Development Mode (Recommended for testing)

```bash
npm run dev
```

**What happens:**
- Starts the Vite development server
- Typically runs on `http://localhost:5173`
- Hot Module Replacement (HMR) enabled for real-time updates
- Open your browser and navigate to the provided URL

### Production Build

```bash
npm run build
```

**What happens:**
- Creates an optimized production build
- Output directory: `dist/`
- Minified code and optimized assets
- Ready for deployment

### Preview Production Build Locally

```bash
npm run build
npm run preview
```

**What happens:**
- Builds the project
- Starts a preview server for the production build
- Typically runs on `http://localhost:4173`
- Verify production build locally before deployment

## 🎮 How to Use

### 1. **Creating a Functional Test**

```
1. Click on "Tests" tab
2. Click "Add Functional Test"
3. Enter test name (e.g., "Login Flow Test")
4. Provide target URL
5. Define test steps:
   - Navigate: Go to URL
   - Input: Enter text in fields
   - Click: Click elements
   - Verify: Check element visibility
6. Click "Save Test"
```

### 2. **Creating a Performance Test**

```
1. Click "Add Performance Test"
2. Enter test name
3. Provide URL to test
4. Set expected load time threshold
5. Target performance score (0-100)
6. Run test to measure actual metrics
```

### 3. **Testing Code/Algorithms**

```
1. Click "Code Tests" tab
2. Click "Add Code Test"
3. Enter problem name or description
4. Platform auto-generates test cases from database
5. Fallback: Pattern-based generation if not in database
6. Review generated test cases
7. Input your solution and run tests
```

### 4. **Running Tests**

```
1. Select a test from the list
2. Click "Run" button
3. View real-time execution status
4. Check results:
   - Status: Passed/Failed
   - Metrics: Specific to test type
   - Logs: Detailed execution information
```

### 5. **Using AI Assistant**

```
1. Click on the chat icon (bottom right)
2. Ask questions like:
   - "How is functional testing validated?"
   - "Show me today's testing summary"
   - "Explain performance metrics"
3. Get instant AI-powered responses
```

## 🔍 Test Types Explained

### Functional Testing
- **Validates**: User workflows and application flows
- **Metrics**: Steps completed, pass/fail status
- **Pass Criteria**: Valid URL + all steps complete

### Performance Testing
- **Validates**: Load times and responsiveness
- **Metrics**: Load time, FCP, TTI, Performance score
- **Pass Criteria**: Load time < 2500ms AND Score > 70

### UI/Visual Regression Testing
- **Validates**: Visual changes in UI
- **Metrics**: Screenshot match, visual diff, elements found
- **Pass Criteria**: Screenshot matches baseline AND diff ≤ 3 pixels

### Security Testing
- **Validates**: OWASP Top 10 vulnerabilities
- **Metrics**: Vulnerabilities found, risk level
- **Pass Criteria**: No vulnerabilities, Risk level = Low

### Accessibility Testing
- **Validates**: WCAG 2.1 compliance
- **Metrics**: Violations count, WCAG level
- **Pass Criteria**: All violations = 0, WCAG ≥ AA

### Integration Testing
- **Validates**: API endpoints and responses
- **Metrics**: Endpoints tested, success rate, response time
- **Pass Criteria**: Status 200-299 AND valid response

### Code Testing
- **Validates**: Algorithm implementations
- **Metrics**: Test cases passed/failed
- **Pass Criteria**: All test cases pass

## 💾 Sample Tests Included

The platform comes with pre-configured sample tests:

- **Login Flow Test** (Functional): Tests a typical login workflow
- **Two Sum Problem** (Code): LeetCode problem with auto-generated test cases

Feel free to:
- Modify existing tests
- Add new tests of different types
- Delete sample tests

## 🌐 Domain Validation

The platform includes smart domain validation:

1. **URL Format Check**: Validates HTTP/HTTPS protocol
2. **Whitelist Check**: Known good domains (Google, GitHub, AWS, etc.)
3. **Reachability Test**: Fetch request with 3-second timeout
4. **TLD Validation**: Checks common TLDs (.com, .org, .net, .io, .dev)

## 📊 Test Results & Metrics

Each test execution provides:
- **Status**: Passed, Failed, or In Progress
- **Timestamp**: When the test was run
- **Detailed Metrics**: Specific to test type
- **Execution Logs**: Step-by-step execution information
- **Expandable Details**: Click to see full test trace

## 🔧 Configuration Files

### `vite.config.js`
- Vite build configuration
- React plugin setup
- Development server settings

### `tailwind.config.js`
- Tailwind CSS customization
- Theme configuration
- Plugin setup

### `postcss.config.js`
- PostCSS processor setup
- Tailwind integration

## 📦 Dependencies

### Production Dependencies
- `react` (18.2.0): UI library
- `react-dom` (18.2.0): React DOM bindings
- `lucide-react` (0.562.0): Icon library

### Development Dependencies
- `vite` (7.3.1): Build tool
- `@vitejs/plugin-react` (4.0.0): React support in Vite
- `tailwindcss` (4.1.18): Utility-first CSS framework
- `@tailwindcss/postcss` (4.1.18): Tailwind PostCSS plugin
- `postcss` (8.5.6): CSS processing
- `autoprefixer` (10.4.23): CSS vendor prefixes

## 🐛 Troubleshooting

### Port Already in Use
```bash
# If port 5173 is busy, Vite will try next available port
# You'll see the correct URL in terminal output
npm run dev
```

### Module Not Found Errors
```bash
# Ensure all dependencies are installed
rm -rf node_modules package-lock.json
npm install
```

### Hot Module Replacement Issues
```bash
# Restart development server
npm run dev
```

### Styling Not Applied
```bash
# Rebuild Tailwind cache
npm run build
npm run preview
```

## 📚 Learning Resources

### Understanding Test Types
- Each test type has different validation metrics
- Use the AI chat assistant to learn about specific metrics
- Check test results to understand what was validated

### Creating Effective Tests
- Use functional tests for user workflows
- Add performance tests for critical paths
- Include accessibility tests for compliance
- Set up security tests for sensitive areas

### Debugging Failed Tests
1. Check the test execution logs
2. Verify the target URL is accessible
3. Review test steps or assertions
4. Use browser DevTools for debugging
5. Ask the AI assistant for guidance

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Various Platforms

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm run build
# Drag dist/ folder to Netlify
```

**Traditional Server:**
```bash
# Upload dist/ folder contents to your server
npm run build
# Copy dist/* to /var/www/html/ (or similar)
```

## 📧 Support

For questions or issues:
1. Check the AI chat assistant built into the platform
2. Review test execution logs
3. Consult the troubleshooting section above

---

**Last Updated**: May 11, 2026
**Version**: 0.0.1
**Status**: Active Development
