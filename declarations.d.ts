declare module '*.css' {
  const content: { [className: string]: string };
  export = content;
}

interface Window {
  __data: never;
}

interface navigator {
  getUserMedia(
    options: { video?: boolean; audio?: boolean },
    success: (stream: any) => void,
    error?: (error: string) => void
  ): void;
}
