import {
  originalDocuments,
  type OriginalPageName,
} from "@/lib/original-pages.generated";

type OriginalPageProps = {
  page: OriginalPageName;
  title: string;
};

export function OriginalPage({ page, title }: OriginalPageProps) {
  return (
    <iframe
      aria-label={title}
      srcDoc={originalDocuments[page]}
      style={{
        background: "#070709",
        border: 0,
        display: "block",
        height: "100dvh",
        width: "100%",
      }}
      title={title}
    />
  );
}
