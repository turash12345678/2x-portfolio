# Complete Guide to n8n Expressions

## Table of Contents
1. [Introduction](#introduction)
2. [Expression Basics](#expression-basics)
3. [Data Types and Structure](#data-types-and-structure)
4. [Core Objects and Variables](#core-objects-and-variables)
5. [String Operations](#string-operations)
6. [Number Operations](#number-operations)
7. [Date and Time](#date-and-time)
8. [Array Operations](#array-operations)
9. [Object Operations](#object-operations)
10. [Conditional Logic](#conditional-logic)
11. [Regular Expressions](#regular-expressions)
12. [Advanced Techniques](#advanced-techniques)
13. [Common Use Cases](#common-use-cases)
14. [Best Practices](#best-practices)
15. [Troubleshooting](#troubleshooting)

## Introduction

n8n expressions are JavaScript-based formulas that allow you to dynamically manipulate and transform data in your workflows. They use a templating syntax with double curly braces `{{ }}` and provide access to powerful built-in functions and variables.

### When to Use Expressions
- Transform data between nodes
- Create dynamic field values
- Implement conditional logic
- Format dates and strings
- Perform calculations
- Filter and manipulate arrays

## Expression Basics

### Syntax
All expressions are wrapped in double curly braces:
```javascript
{{ expression_here }}
```

### Simple Examples
```javascript
// Static value
{{ "Hello World" }}

// Accessing input data
{{ $json.name }}

// Simple calculation
{{ 10 + 5 }}

// String concatenation
{{ "Hello " + $json.firstName }}
```

### Multi-line Expressions
For complex expressions, you can use multiple lines:
```javascript
{{
  const userName = $json.firstName + " " + $json.lastName;
  return userName.toUpperCase();
}}
```

## Data Types and Structure

### Understanding n8n Data Structure
n8n passes data between nodes as an array of items, where each item contains:
- `json`: The main data object
- `binary`: Binary data (files, images, etc.)
- `pairedItem`: Reference to source item

### Data Type Examples
```javascript
// String
{{ "This is a string" }}

// Number
{{ 42 }}
{{ 3.14159 }}

// Boolean
{{ true }}
{{ false }}

// Array
{{ ["apple", "banana", "cherry"] }}

// Object
{{ { name: "John", age: 30 } }}

// Null/Undefined
{{ null }}
{{ undefined }}
```

## Core Objects and Variables

### $json - Current Item Data
```javascript
// Access properties
{{ $json.email }}
{{ $json.user.name }}
{{ $json["field-with-spaces"] }}

// Nested access
{{ $json.address.street }}
{{ $json.items[0].price }}
```

### $input - Input Data Access
```javascript
// Get data from specific input
{{ $input.first().json.name }}
{{ $input.last().json.timestamp }}
{{ $input.item.json.value }}

// Access all items
{{ $input.all() }}

// Get specific item by index
{{ $input.item(0).json.name }}
```

### $node - Access Data from Specific Nodes
```javascript
// Get data from a named node
{{ $node["HTTP Request"].json.response }}
{{ $node["Set"].json.processedData }}

// Access specific item from node
{{ $node["Webhook"].first().json.body }}
```

### $vars - Workflow Variables
```javascript
// Access workflow variables
{{ $vars.apiKey }}
{{ $vars.environment }}
```

### $env - Environment Variables
```javascript
// Access environment variables
{{ $env.API_URL }}
{{ $env.DATABASE_PASSWORD }}
```

### $now - Current Timestamp
```javascript
// Current Unix timestamp
{{ $now }}

// Current ISO date
{{ new Date($now).toISOString() }}
```

### $today - Today's Date
```javascript
// Today as ISO string
{{ $today }}

// Format today's date
{{ new Date($today).toLocaleDateString() }}
```

## String Operations

### Basic String Methods
```javascript
// Length
{{ $json.message.length }}

// Case conversion
{{ $json.name.toLowerCase() }}
{{ $json.name.toUpperCase() }}
{{ $json.name.charAt(0).toUpperCase() + $json.name.slice(1).toLowerCase() }}

// Trimming
{{ $json.text.trim() }}
{{ $json.text.trimStart() }}
{{ $json.text.trimEnd() }}
```

### String Manipulation
```javascript
// Substring
{{ $json.text.substring(0, 10) }}
{{ $json.text.slice(2, -1) }}

// Replace
{{ $json.text.replace("old", "new") }}
{{ $json.text.replaceAll("old", "new") }}

// Split and join
{{ $json.text.split(",") }}
{{ $json.array.join(", ") }}

// Character at position
{{ $json.text.charAt(0) }}
{{ $json.text[0] }}
```

### String Searching
```javascript
// Check if string contains
{{ $json.text.includes("search term") }}
{{ $json.text.indexOf("search") !== -1 }}

// Starts/ends with
{{ $json.text.startsWith("Hello") }}
{{ $json.text.endsWith("World") }}

// Find position
{{ $json.text.indexOf("search") }}
{{ $json.text.lastIndexOf("search") }}
```

### Template Literals
```javascript
// Using template literals
{{ `Hello ${$json.firstName} ${$json.lastName}!` }}
{{ `Order #${$json.orderId} total: $${$json.amount}` }}

// Multi-line templates
{{
  `Dear ${$json.customerName},
  
  Your order ${$json.orderNumber} has been processed.
  Total: $${$json.total}
  
  Thank you!`
}}
```

## Number Operations

### Basic Math
```javascript
// Arithmetic operations
{{ $json.price * 1.08 }}  // Add 8% tax
{{ $json.total - $json.discount }}
{{ $json.quantity / 2 }}
{{ $json.base ** 2 }}  // Power

// Rounding
{{ Math.round($json.price) }}
{{ Math.floor($json.value) }}
{{ Math.ceil($json.value) }}
{{ Number($json.price.toFixed(2)) }}
```

### Number Utilities
```javascript
// Convert string to number
{{ Number($json.stringValue) }}
{{ parseInt($json.stringValue) }}
{{ parseFloat($json.stringValue) }}

// Check if number
{{ !isNaN($json.value) }}
{{ Number.isInteger($json.value) }}

// Min/Max
{{ Math.min($json.a, $json.b, $json.c) }}
{{ Math.max($json.values[0], $json.values[1]) }}

// Random numbers
{{ Math.random() }}
{{ Math.floor(Math.random() * 100) }}  // 0-99
```

### Advanced Math
```javascript
// Math functions
{{ Math.abs($json.value) }}
{{ Math.sqrt($json.number) }}
{{ Math.pow($json.base, $json.exponent) }}

// Trigonometry
{{ Math.sin($json.angle) }}
{{ Math.cos($json.angle) }}
{{ Math.PI }}
```

## Date and Time

### Creating Dates
```javascript
// Current date
{{ new Date() }}
{{ new Date().toISOString() }}

// From timestamp
{{ new Date($json.timestamp) }}
{{ new Date($json.timestamp * 1000) }}  // Unix timestamp

// From string
{{ new Date($json.dateString) }}
{{ new Date("2024-01-15T10:30:00Z") }}
```

### Date Formatting
```javascript
// ISO format
{{ new Date($json.date).toISOString() }}

// Locale formatting
{{ new Date($json.date).toLocaleDateString() }}
{{ new Date($json.date).toLocaleTimeString() }}
{{ new Date($json.date).toLocaleString() }}

// Custom formatting
{{ new Date($json.date).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}) }}
```

### Date Manipulation
```javascript
// Get components
{{ new Date($json.date).getFullYear() }}
{{ new Date($json.date).getMonth() + 1 }}  // Month is 0-indexed
{{ new Date($json.date).getDate() }}
{{ new Date($json.date).getHours() }}

// Set components
{{
  const date = new Date($json.date);
  date.setDate(date.getDate() + 7);  // Add 7 days
  return date.toISOString();
}}

// Date arithmetic
{{
  const now = new Date();
  const future = new Date(now.getTime() + (24 * 60 * 60 * 1000));  // Add 1 day
  return future;
}}
```

### Date Comparisons
```javascript
// Compare dates
{{ new Date($json.startDate) < new Date($json.endDate) }}
{{ new Date($json.date) > new Date() }}  // Is in future

// Days between dates
{{
  const start = new Date($json.startDate);
  const end = new Date($json.endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}}
```

## Array Operations

### Basic Array Methods
```javascript
// Array length
{{ $json.items.length }}

// Access elements
{{ $json.items[0] }}
{{ $json.items[$json.items.length - 1] }}  // Last element

// Check if array
{{ Array.isArray($json.items) }}

// Convert to array
{{ Array.from($json.items) }}
```

### Array Manipulation
```javascript
// Add elements
{{ $json.items.concat(["new item"]) }}
{{ [...$json.items, "new item"] }}  // Spread operator

// Remove/modify elements
{{ $json.items.slice(1) }}  // Remove first
{{ $json.items.slice(0, -1) }}  // Remove last
{{ $json.items.slice(1, 3) }}  // Get elements 1-2
```

### Array Searching
```javascript
// Find elements
{{ $json.items.find(item => item.id === $json.targetId) }}
{{ $json.items.findIndex(item => item.name === "target") }}

// Check existence
{{ $json.items.includes("search term") }}
{{ $json.items.some(item => item.active === true) }}
{{ $json.items.every(item => item.status === "complete") }}
```

### Array Transformation
```javascript
// Map - transform each element
{{ $json.items.map(item => item.name) }}
{{ $json.items.map(item => ({ ...item, processed: true })) }}

// Filter - select elements
{{ $json.items.filter(item => item.price > 100) }}
{{ $json.items.filter(item => item.category === $json.targetCategory) }}

// Reduce - aggregate
{{ $json.items.reduce((sum, item) => sum + item.price, 0) }}
{{ $json.items.reduce((acc, item) => {
  acc[item.category] = (acc[item.category] || 0) + 1;
  return acc;
}, {}) }}
```

### Array Sorting
```javascript
// Sort numbers
{{ $json.numbers.sort((a, b) => a - b) }}  // Ascending
{{ $json.numbers.sort((a, b) => b - a) }}  // Descending

// Sort objects
{{ $json.items.sort((a, b) => a.name.localeCompare(b.name)) }}
{{ $json.items.sort((a, b) => new Date(a.date) - new Date(b.date)) }}

// Sort by multiple criteria
{{ $json.items.sort((a, b) => {
  if (a.priority !== b.priority) return b.priority - a.priority;
  return a.name.localeCompare(b.name);
}) }}
```

## Object Operations

### Object Access
```javascript
// Property access
{{ $json.user.name }}
{{ $json["property-with-dashes"] }}
{{ $json[propertyName] }}  // Dynamic property access

// Safe access (prevents errors)
{{ $json.user?.address?.street }}
{{ $json.optional?.property || "default value" }}
```

### Object Manipulation
```javascript
// Get keys/values
{{ Object.keys($json.user) }}
{{ Object.values($json.user) }}
{{ Object.entries($json.user) }}

// Merge objects
{{ Object.assign({}, $json.user, { updated: true }) }}
{{ { ...$json.user, modified: new Date() } }}  // Spread syntax

// Create new object
{{ {
  id: $json.id,
  name: $json.firstName + " " + $json.lastName,
  email: $json.email.toLowerCase(),
  timestamp: new Date().toISOString()
} }}
```

### Object Validation
```javascript
// Check if property exists
{{ $json.hasOwnProperty('email') }}
{{ 'email' in $json }}

// Check if object is empty
{{ Object.keys($json.data).length === 0 }}

// Get nested property safely
{{
  function getNestedProperty(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }
  return getNestedProperty($json, 'user.profile.settings.theme');
}}
```

## Conditional Logic

### If-Else Statements
```javascript
// Ternary operator
{{ $json.status === "active" ? "✅ Active" : "❌ Inactive" }}
{{ $json.price > 100 ? "expensive" : "affordable" }}

// Multiple conditions
{{ $json.score >= 90 ? "A" : $json.score >= 80 ? "B" : "C" }}

// Complex conditions
{{ ($json.age >= 18 && $json.hasLicense) ? "Can drive" : "Cannot drive" }}
```

### Complex Conditionals
```javascript
// Using if statements in functions
{{
  if ($json.type === "premium") {
    return $json.price * 0.9;  // 10% discount
  } else if ($json.type === "regular") {
    return $json.price * 0.95;  // 5% discount
  } else {
    return $json.price;
  }
}}

// Switch-like behavior
{{
  const statusMessages = {
    pending: "⏳ Waiting for approval",
    approved: "✅ Approved",
    rejected: "❌ Rejected",
    default: "❓ Unknown status"
  };
  return statusMessages[$json.status] || statusMessages.default;
}}
```

### Null/Undefined Handling
```javascript
// Default values
{{ $json.name || "Anonymous" }}
{{ $json.email ?? "no-email@example.com" }}  // Nullish coalescing

// Check for existence
{{ $json.optionalField ? $json.optionalField.toUpperCase() : "N/A" }}

// Safe method calls
{{ $json.text?.trim().toLowerCase() }}
```

## Regular Expressions

### Basic Pattern Matching
```javascript
// Test if pattern matches
{{ /^[A-Z]{2,3}-\d{4}$/.test($json.code) }}  // Format: AB-1234
{{ $json.email.match(/^[^@]+@[^@]+\.[^@]+$/) !== null }}  // Basic email validation

// Extract matches
{{ $json.text.match(/\d+/g) }}  // All numbers
{{ $json.phone.match(/\((\d{3})\) (\d{3})-(\d{4})/) }}  // Phone number groups
```

### String Replacement with Regex
```javascript
// Replace patterns
{{ $json.text.replace(/\s+/g, " ") }}  // Replace multiple spaces with single space
{{ $json.phone.replace(/[^\d]/g, "") }}  // Remove all non-digits

// Replace with captured groups
{{ $json.name.replace(/(\w+),\s*(\w+)/, "$2 $1") }}  // "Last, First" → "First Last"
```

### Common Regex Patterns
```javascript
// Email validation
{{ /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($json.email) }}

// Phone number extraction
{{ $json.text.match(/(?:\+1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/) }}

// URL detection
{{ /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test($json.text) }}

// Extract hashtags
{{ $json.text.match(/#\w+/g) }}
```

## Advanced Techniques

### Custom Functions
```javascript
{{
  // Define reusable functions
  function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  }
  
  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  
  return {
    formattedPrice: formatCurrency($json.price),
    slug: slugify($json.title)
  };
}}
```

### Error Handling
```javascript
{{
  try {
    const result = JSON.parse($json.jsonString);
    return result.value;
  } catch (error) {
    return "Invalid JSON";
  }
}}

// Safe property access
{{
  function safeGet(obj, path, defaultValue = null) {
    try {
      return path.split('.').reduce((current, key) => current[key], obj);
    } catch {
      return defaultValue;
    }
  }
  
  return safeGet($json, 'user.profile.settings.theme', 'default');
}}
```

### Working with Multiple Items
```javascript
// Process all input items
{{
  const allItems = $input.all();
  const processed = allItems.map(item => ({
    id: item.json.id,
    processedAt: new Date().toISOString(),
    data: item.json
  }));
  return processed;
}}

// Aggregate data from multiple items
{{
  const items = $input.all();
  return {
    totalRevenue: items.reduce((sum, item) => sum + item.json.amount, 0),
    averageOrder: items.reduce((sum, item) => sum + item.json.amount, 0) / items.length,
    orderCount: items.length
  };
}}
```

### Dynamic Property Access
```javascript
// Access properties dynamically
{{
  const fieldName = $json.dynamicField;
  return $json[fieldName];
}}

// Build object with dynamic keys
{{
  const key = $json.categoryName;
  return {
    [key]: $json.value,
    timestamp: new Date(),
    processed: true
  };
}}
```

## Common Use Cases

### Data Transformation
```javascript
// Transform API response
{{
  {
    id: $json.user_id,
    name: `${$json.first_name} ${$json.last_name}`,
    email: $json.email_address.toLowerCase(),
    isActive: $json.status === 'active',
    lastLogin: new Date($json.last_login_timestamp * 1000).toISOString(),
    profile: {
      avatar: $json.avatar_url,
      bio: $json.bio || 'No bio available'
    }
  }
}}
```

### URL Building
```javascript
// Build API endpoint
{{ `https://api.example.com/v1/users/${$json.userId}/orders?status=${$json.status}&limit=10` }}

// Build webhook URL with query parameters
{{
  const baseUrl = 'https://webhook.site/';
  const params = new URLSearchParams({
    source: 'n8n',
    timestamp: Date.now(),
    userId: $json.userId
  });
  return `${baseUrl}?${params.toString()}`;
}}
```

### Form Data Processing
```javascript
// Process form submission
{{
  const requiredFields = ['name', 'email', 'message'];
  const missingFields = requiredFields.filter(field => !$json[field] || $json[field].trim() === '');
  
  if (missingFields.length > 0) {
    return {
      success: false,
      error: `Missing required fields: ${missingFields.join(', ')}`
    };
  }
  
  return {
    success: true,
    data: {
      name: $json.name.trim(),
      email: $json.email.toLowerCase().trim(),
      message: $json.message.trim(),
      submittedAt: new Date().toISOString()
    }
  };
}}
```

### Text Processing
```javascript
// Clean and process text
{{
  const text = $json.content || '';
  return {
    original: text,
    cleaned: text.trim().replace(/\s+/g, ' '),
    wordCount: text.trim().split(/\s+/).length,
    hasHashtags: text.includes('#'),
    hashtags: text.match(/#\w+/g) || [],
    mentions: text.match(/@\w+/g) || [],
    links: text.match(/https?:\/\/[^\s]+/g) || []
  };
}}
```

### CSV/Data Export Formatting
```javascript
// Prepare data for CSV export
{{
  const items = $input.all();
  return items.map(item => ({
    'Order ID': item.json.id,
    'Customer Name': `${item.json.firstName} ${item.json.lastName}`,
    'Email': item.json.email,
    'Total Amount': `$${item.json.total.toFixed(2)}`,
    'Order Date': new Date(item.json.createdAt).toLocaleDateString(),
    'Status': item.json.status.toUpperCase()
  }));
}}
```

## Best Practices

### Performance Optimization
- Use `$input.first().json` instead of `$json` when you need the first item specifically
- Cache expensive operations in variables
- Avoid nested loops when possible
- Use built-in methods like `map`, `filter`, `reduce` instead of manual loops

### Code Organization
```javascript
// Good: Organize complex logic
{{
  // Configuration
  const config = {
    taxRate: 0.08,
    discountThreshold: 100,
    discountRate: 0.1
  };
  
  // Helper functions
  const calculateDiscount = (amount) => {
    return amount >= config.discountThreshold ? amount * config.discountRate : 0;
  };
  
  const calculateTax = (amount) => {
    return amount * config.taxRate;
  };
  
  // Main logic
  const subtotal = $json.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = calculateDiscount(subtotal);
  const taxableAmount = subtotal - discount;
  const tax = calculateTax(taxableAmount);
  const total = taxableAmount + tax;
  
  return {
    subtotal,
    discount,
    tax,
    total: Math.round(total * 100) / 100  // Round to 2 decimal places
  };
}}
```

### Error Prevention
```javascript
// Always validate data before processing
{{
  if (!$json || typeof $json !== 'object') {
    return { error: 'Invalid input data' };
  }
  
  if (!$json.email || typeof $json.email !== 'string') {
    return { error: 'Email is required' };
  }
  
  // Safe processing
  return {
    email: $json.email.toLowerCase().trim(),
    domain: $json.email.split('@')[1] || 'unknown'
  };
}}
```

### Debugging Techniques
```javascript
// Add debugging information
{{
  const debugInfo = {
    inputType: typeof $json,
    inputKeys: Object.keys($json || {}),
    nodeData: $node,
    timestamp: new Date().toISOString()
  };
  
  console.log('Debug info:', debugInfo);  // Visible in browser console
  
  return {
    result: $json.processedValue,
    debug: debugInfo
  };
}}
```

## Troubleshooting

### Common Errors and Solutions

#### "Cannot read property of undefined"
```javascript
// Problem: Accessing undefined properties
{{ $json.user.name }}  // Error if user is undefined

// Solution: Use optional chaining
{{ $json.user?.name }}
{{ $json.user?.name || "Unknown" }}
```

#### "Expression failed to resolve"
```javascript
// Problem: Syntax errors or undefined variables
{{ $json.nonExistentField.toUpperCase() }}

// Solution: Add existence checks
{{ $json.nonExistentField ? $json.nonExistentField.toUpperCase() : "" }}
```

#### "Unexpected token" in JSON
```javascript
// Problem: Malformed JSON strings
{{ JSON.parse($json.jsonString) }}

// Solution: Add error handling
{{
  try {
    return JSON.parse($json.jsonString);
  } catch (error) {
    return { error: "Invalid JSON", original: $json.jsonString };
  }
}}
```

### Debugging Tips

1. **Use console.log()**: Add `console.log()` statements to see intermediate values
2. **Break down complex expressions**: Split complex logic into smaller, testable parts
3. **Check data structure**: Use `Object.keys($json)` to see available properties
4. **Validate assumptions**: Always check if data exists before using it
5. **Test with sample data**: Create test nodes with known data structures

### Testing Expressions

Create a "Set" node to test expressions:
```javascript
{{
  // Test data
  const testData = {
    name: "John Doe",
    email: "john@example.com",
    orders: [
      { id: 1, total: 100 },
      { id: 2, total: 250 }
    ]
  };
  
  // Test your expression logic here
  const result = testData.orders.reduce((sum, order) => sum + order.total, 0);
  
  return {
    testData,
    result,
    success: true
  };
}}
```

## Conclusion

n8n expressions are a powerful tool for data manipulation and workflow automation. Master these concepts and techniques to build more sophisticated and reliable workflows. Remember to:

- Start simple and build complexity gradually
- Always handle edge cases and errors
- Use meaningful variable names and comments
- Test thoroughly with various data inputs
- Keep expressions readable and maintainable

With practice, you'll be able to handle complex data transformations and create dynamic, responsive workflows that adapt to your specific needs.