export const metadata = {
  title: {
    template: "%s | Image Tools",
    default: "Image Tools",
  },
  description: "Resize, compress, convert, and upscale images",
};

export default function ImageToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
