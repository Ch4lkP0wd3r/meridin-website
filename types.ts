
export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface ReportSample {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'LOW';
  date: string;
}

export interface LabTool {
  name: string;
  category: string;
  description: string;
  icon: string;
}
