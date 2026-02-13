
export interface Game {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  iconColorClass: string;
  gradientFrom: string; 
  isPremium: boolean;
  category: string;
  categoryColorClass: string;
  metaIcon: string;
  metaText: string;
  tag?: string;
}

export interface HeroGame {
  id: string;
  title: string;
  description: string;
  tag: string;
  buttonText: string;
  gradientClass: string;
  icon: string;
  textColorClass: string; 
  buttonTextColorClass: string;
}

export interface NavItem {
  icon: string;
  label: string;
  isActive?: boolean;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  group?: string; // e.g., "Table 1", "Red Team"
  skillLevel?: 'low' | 'medium' | 'high';
}

export interface ClassGroup {
  id: string;
  name: string;
  students: Student[];
  createdAt: number;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  soundEnabled: boolean;
  animations: boolean;
}
