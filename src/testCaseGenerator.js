import { problemsDatabase } from './problemsDatabase';

// Generate test cases - First try real database, then pattern matching
export function generateTestCasesFromDescription(description, problemName) {
  // PRIORITY 1: Search the problemsDatabase by problem name (LeetTest-like functionality)
  const dbTestCases = searchProblemInDatabase(problemName);
  if (dbTestCases.length > 0) {
    return dbTestCases;
  }

  // PRIORITY 2: Generate based on description patterns
  return generateFromDescriptionPatterns(description, problemName);
}

// LeetTest-like: Search problemsDatabase by problem title
function searchProblemInDatabase(problemName) {
  if (!problemName || problemName.trim() === '') return [];

  const searchTerm = problemName.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Direct search with normalization
  for (const [key, problem] of Object.entries(problemsDatabase)) {
    const keyNorm = key.replace(/[^a-z0-9]/g, '');
    const nameNorm = (problem.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Exact match, substring, or bidirectional match
    if (keyNorm === searchTerm || 
        nameNorm === searchTerm ||
        keyNorm.includes(searchTerm) || 
        searchTerm.includes(keyNorm) ||
        nameNorm.includes(searchTerm) || 
        searchTerm.includes(nameNorm)) {
      
      // Return real test cases from database
      if (problem.testCases && Array.isArray(problem.testCases) && problem.testCases.length > 0) {
        return problem.testCases.slice(0, 5); // Return up to 5 test cases
      }
    }
  }
  
  return [];
}

// Fallback: Pattern-based test case generation
function generateFromDescriptionPatterns(description, problemName) {
  const testCases = [];
  const desc = description.toLowerCase();
  const name = problemName.toLowerCase();

  // Two Sum type problems
  if (desc.includes('two') && (desc.includes('sum') || desc.includes('pair'))) {
    testCases.push({
      input: 'nums = [2,7,11,15], target = 9',
      expectedOutput: '[0,1]',
      description: 'Example: Return the indices of the two numbers',
      type: 'normal'
    });
    testCases.push({
      input: 'nums = [3,2,4], target = 6',
      expectedOutput: '[1,2]',
      description: 'Another valid pair',
      type: 'normal'
    });
  }

  // Array sum/target problems
  else if ((desc.includes('sum') || desc.includes('target')) && desc.includes('array')) {
    testCases.push({
      input: '[1,2,3,4,5]',
      expectedOutput: 'true (or count)',
      description: 'Normal array case',
      type: 'normal'
    });
    testCases.push({
      input: '[]',
      expectedOutput: '0 (or false)',
      description: 'Empty array edge case',
      type: 'edge'
    });
  }

  // String reversal/manipulation
  else if ((desc.includes('reverse') || desc.includes('reverse')) && desc.includes('string')) {
    testCases.push({
      input: '"hello"',
      expectedOutput: '"olleh"',
      description: 'Reverse a normal string',
      type: 'normal'
    });
    testCases.push({
      input: '""',
      expectedOutput: '""',
      description: 'Empty string edge case',
      type: 'edge'
    });
  }

  // Palindrome problems
  else if (desc.includes('palindrome')) {
    testCases.push({
      input: '"A man, a plan, a canal: Panama"',
      expectedOutput: 'true',
      description: 'Valid palindrome ignoring spaces and punctuation',
      type: 'normal'
    });
    testCases.push({
      input: '"race a car"',
      expectedOutput: 'false',
      description: 'Not a palindrome',
      type: 'normal'
    });
  }

  // Fibonacci
  else if (desc.includes('fibonacci')) {
    testCases.push({
      input: 'n = 0',
      expectedOutput: '0',
      description: 'Base case F(0)',
      type: 'edge'
    });
    testCases.push({
      input: 'n = 6',
      expectedOutput: '8',
      description: 'Normal case F(6) = 8',
      type: 'normal'
    });
  }

  // Linked list problems
  else if (desc.includes('linked list') || desc.includes('list node')) {
    testCases.push({
      input: '[1,2,3,4,5]',
      expectedOutput: '[5,4,3,2,1]',
      description: 'Normal linked list case',
      type: 'normal'
    });
    testCases.push({
      input: '[1]',
      expectedOutput: '[1]',
      description: 'Single node edge case',
      type: 'edge'
    });
  }

  // Tree problems
  else if (desc.includes('tree') || desc.includes('binary')) {
    testCases.push({
      input: '[3,9,20,null,null,15,7]',
      expectedOutput: '3',
      description: 'Binary tree example',
      type: 'normal'
    });
    testCases.push({
      input: '[]',
      expectedOutput: '0',
      description: 'Empty tree edge case',
      type: 'edge'
    });
  }

  // Graph problems
  else if (desc.includes('graph') || desc.includes('island')) {
    testCases.push({
      input: 'grid = [[1,1,0],[1,1,0],[0,0,1]]',
      expectedOutput: '2',
      description: 'Find connected components',
      type: 'normal'
    });
    testCases.push({
      input: 'grid = [[0]]',
      expectedOutput: '0',
      description: 'Empty grid edge case',
      type: 'edge'
    });
  }

  // Sorting problems
  else if (desc.includes('sort')) {
    testCases.push({
      input: '[3,1,4,1,5,9,2,6]',
      expectedOutput: '[1,1,2,3,4,5,6,9]',
      description: 'Sort array with duplicates',
      type: 'normal'
    });
    testCases.push({
      input: '[1]',
      expectedOutput: '[1]',
      description: 'Single element edge case',
      type: 'edge'
    });
  }

  // Substring/pattern problems
  else if (desc.includes('substring') || desc.includes('pattern')) {
    testCases.push({
      input: 's = "abcabcbb"',
      expectedOutput: '3',
      description: 'Longest substring without repeating characters',
      type: 'normal'
    });
    testCases.push({
      input: 's = ""',
      expectedOutput: '0',
      description: 'Empty string edge case',
      type: 'edge'
    });
  }

  // DP problems
  else if (desc.includes('dynamic') || desc.includes('recursion')) {
    testCases.push({
      input: 'n = 5',
      expectedOutput: '5 (or result)',
      description: 'Normal recursive case',
      type: 'normal'
    });
    testCases.push({
      input: 'n = 0',
      expectedOutput: '0 (or base)',
      description: 'Base case for recursion',
      type: 'edge'
    });
  }

  // Number problems
  else if (desc.includes('integer') || desc.includes('number')) {
    testCases.push({
      input: '123',
      expectedOutput: '321',
      description: 'Normal positive number',
      type: 'normal'
    });
    testCases.push({
      input: '-123',
      expectedOutput: '-321',
      description: 'Negative number case',
      type: 'normal'
    });
  }

  // Greedy problems
  else if (desc.includes('maximum') || desc.includes('minimum')) {
    testCases.push({
      input: '[7,1,5,3,6,4]',
      expectedOutput: '5',
      description: 'Find maximum profit/value',
      type: 'normal'
    });
    testCases.push({
      input: '[1]',
      expectedOutput: '0',
      description: 'Single element edge case',
      type: 'edge'
    });
  }

  // Default generic test cases if no pattern matches
  if (testCases.length === 0) {
    testCases.push({
      input: 'sample_input',
      expectedOutput: 'sample_output',
      description: 'Example test case - update with actual LeetCode example',
      type: 'normal'
    });
    testCases.push({
      input: 'edge_case_input',
      expectedOutput: 'edge_case_output',
      description: 'Edge case - check problem constraints',
      type: 'edge'
    });
  }

  return testCases.slice(0, 5); // Return max 5 test cases
}
