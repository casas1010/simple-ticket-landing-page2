

// types/custom-elements.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'lottie-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      autoplay?: boolean;
      loop?: boolean;
      mode?: string;
      style?: React.CSSProperties;
    };
  }
}