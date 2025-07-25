import { Detail } from "./detail";
import { Features } from "./feature";

export type Module = {
  title: string;
  mode: string;
  main_description: string;
  main_description_highlight: string;
  sub_description: string;
  animationPath: string;
  details: Detail[];
  gradient: string;
  icon: React.ElementType;
  color: string;
  features: Features[];
};
