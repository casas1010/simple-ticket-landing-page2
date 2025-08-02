import { Detail } from "./detail";
import { Features } from "./feature";
import { Video } from "./video";

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
  videos?: Video[];
  features: Features[];
};
