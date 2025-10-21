declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        "ar-status"?: string;
        // Add other model-viewer attributes as needed, e.g.:
        "camera-controls"?: boolean;
        "auto-rotate"?: boolean;
        exposure?: number;
        // ... and so on
      };
    }
  }
}
