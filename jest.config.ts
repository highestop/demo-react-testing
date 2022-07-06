import { InitialOptionsTsJest } from "ts-jest";

export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  testMatch: [`**/*.(spec|test).(ts|tsx)`],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
} as InitialOptionsTsJest;
