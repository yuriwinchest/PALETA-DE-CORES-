export interface ColorDef {
  id: string;
  hex: string;
  name: string;
  description?: string; // Manual description
  psychology?: string; // AI generated psychology
  usage?: string; // AI generated usage suggestion (e.g., "Primary Button", "Background")
  contrastError?: boolean;
}

export interface Palette {
  id: string;
  name: string;
  colors: ColorDef[];
  description?: string;
}

export enum ViewMode {
  HOME = 'HOME',
  EDITOR = 'EDITOR',
  VISUALIZER = 'VISUALIZER',
  ANALYSIS = 'ANALYSIS',
  EXTRACTOR = 'EXTRACTOR',
  FEATURE_GENERATE = 'FEATURE_GENERATE',
  FEATURE_MEANING = 'FEATURE_MEANING',
  FEATURE_VISUALIZE = 'FEATURE_VISUALIZE',
  SCREENSHOT_ANALYSIS = 'SCREENSHOT_ANALYSIS'
}

export interface AIAnalysisResult {
  overallVibe: string;
  colorAnalysis: {
    hex: string;
    psychology: string;
    recommendedUsage: string;
  }[];
}