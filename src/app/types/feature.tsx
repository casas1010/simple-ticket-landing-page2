import { Detail } from "./detail";



export type Features = {
  title: string;
  mode: string;
  main_description: string;
  main_description_highlight: string;
  sub_description: string;
  main_icon_animation_path?: string;
  main_icon_path?: string;
  details: Detail[];
  gradient: string;
  icon: React.ElementType;
  color: string;
};
