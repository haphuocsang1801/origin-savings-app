export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // Cấu hình absolute import @/
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy' // Mock CSS modules
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
}
