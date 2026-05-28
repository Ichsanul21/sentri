"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Heart, Share2, MoreHorizontal } from "lucide-react";

interface Mention {
  id: string;
  text: string;
  author: string;
  avatar: string;
  platform: string;
  sentiment: "positive" | "neutral" | "negative";
  engagement: { likes: number; replies: number; shares: number };
  timestamp: string;
}

const generateMentions = (start: number, count: number): Mention[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `m-${start + i}`,
    text: [
      "Just tried the new product and it's absolutely amazing! ✨",
      "Customer service was super helpful today, great experience.",
      "Not sure about the new update, feels a bit clunky honestly.",
      "Best purchase I've made this year, highly recommend! 🙌",
      "Can someone help me with the login issue? Been stuck for hours.",
      "The quality has really improved lately, keep it up!",
      "Anyone else experiencing delays with shipping?",
      "Love the new features, especially the dark mode! 🌙",
      "Pretty decent overall, but pricing could be better.",
      "Worst experience ever. Will not be coming back.",
    ][(start + i) % 10],
    author: `@user${(start + i) % 50 + 1}`,
    avatar: `U${(start + i) % 50 + 1}`,
    platform: ["Twitter", "Reddit", "Instagram", "Facebook", "TikTok"][(start + i) % 5],
    sentiment: (["positive", "positive", "neutral", "positive", "negative", "positive", "neutral", "positive", "neutral", "negative"] as const)[(start + i) % 10],
    engagement: {
      likes: Math.floor(Math.random() * 500),
      replies: Math.floor(Math.random() * 50),
      shares: Math.floor(Math.random() * 100),
    },
    timestamp: `${Math.floor(Math.random() * 24)}h ago`,
  }));

interface MentionFeedProps {
  searchQuery?: string;
}

export function MentionFeed({ searchQuery }: MentionFeedProps) {
  const [mentions, setMentions] = useState<Mention[]>(() => generateMentions(0, 20));
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      const newMentions = generateMentions(mentions.length, 10);
      setMentions((prev) => [...prev, ...newMentions]);
      setLoading(false);
      if (mentions.length > 100) setHasMore(false);
    }, 800);
  }, [loading, hasMore, mentions.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadMore]);

  const filtered = searchQuery
    ? mentions.filter((m) => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : mentions;

  return (
    <div className="space-y-0 divide-y divide-hairline-violet">
      {filtered.map((mention) => (
        <div key={mention.id} className="flex items-start gap-3 p-4 hover:bg-ink-deep/30 transition-colors">
          <div className="w-9 h-9 rounded-full bg-accent-violet-mid/30 flex items-center justify-center text-[12px] font-bold shrink-0">
            {mention.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-medium">{mention.author}</span>
              <span className="text-[12px] text-on-dark-muted">· {mention.platform}</span>
              <span className="text-[12px] text-on-dark-muted">· {mention.timestamp}</span>
              <div className="ml-auto">
                <Badge variant={
                  mention.sentiment === "positive" ? "lime" :
                  mention.sentiment === "negative" ? "default" : "default"
                } className="text-[10px]">
                  {mention.sentiment}
                </Badge>
              </div>
            </div>
            <p className="text-[14px] leading-[1.5] mt-1">{mention.text}</p>
            <div className="flex items-center gap-4 mt-2 text-on-dark-muted">
              <button className="flex items-center gap-1 text-[12px] hover:text-accent-lime transition-colors">
                <Heart size={14} /> {mention.engagement.likes}
              </button>
              <button className="flex items-center gap-1 text-[12px] hover:text-accent-lime transition-colors">
                <MessageCircle size={14} /> {mention.engagement.replies}
              </button>
              <button className="flex items-center gap-1 text-[12px] hover:text-accent-lime transition-colors">
                <Share2 size={14} /> {mention.engagement.shares}
              </button>
              <button className="ml-auto text-on-dark-muted hover:text-on-primary transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
      <div ref={loaderRef} className="flex justify-center py-4">
        {loading && <span className="text-on-dark-muted text-[14px]">Loading more mentions...</span>}
        {!hasMore && <span className="text-on-dark-muted text-[14px]">No more mentions to load</span>}
      </div>
    </div>
  );
}
