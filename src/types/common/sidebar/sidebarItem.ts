export interface SidebarItem {
  title: string;
  link: string;
  icon?: string;
  children?: SidebarItem[];
}
