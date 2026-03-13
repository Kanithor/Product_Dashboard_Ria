// jest.setup.js
import '@testing-library/jest-dom'

// If you are using 'fetch' in your components, you might need to polyfill it for Node
// This ensures 'fetch' is available in your Jest environment
import 'whatwg-fetch'