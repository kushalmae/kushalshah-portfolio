import { Linkedin, Twitter, Link2 } from "lucide-react";
import { useState } from "react";
import { absoluteUrl } from "@/lib/seo/urls";

interface ShareLinksProps {
  /** Site-relative path of the page being shared. */
  path: string;
  /** Plain-text title used in the share intent (no markup). */
  title: string;
  /** Optional extra classes for the wrapping container. */
  className?: string;
}

/** LinkedIn-first share row. LinkedIn is intentionally the first item because
 * it's the channel hiring managers actually use; Twitter and copy-link are
 * secondary. No external trackers are added. */
const ShareLinks = ({ path, title, className }: ShareLinksProps) => {
  const url = absoluteUrl(path);
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    url
  )}`;
  const twitterHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(title)}`;

  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore — older browser or insecure context */
    }
  };

  const linkClass =
    "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground tracking-wider uppercase transition-colors";

  return (
    <div
      className={`flex flex-wrap items-center gap-5 ${className ?? ""}`}
      aria-label="Share this article"
    >
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
        Share
      </span>
      <a
        href={linkedinHref}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <Linkedin size={14} aria-hidden />
        LinkedIn
      </a>
      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <Twitter size={14} aria-hidden />
        Twitter
      </a>
      <button type="button" onClick={onCopy} className={linkClass}>
        <Link2 size={14} aria-hidden />
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
};

export default ShareLinks;
