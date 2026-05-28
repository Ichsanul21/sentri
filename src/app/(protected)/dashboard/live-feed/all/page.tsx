"use client";

import { useState } from "react";
import { WidgetCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MentionFeed } from "@/components/feed/mention-feed";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/components/ui/toast";
import { generateId } from "@/lib/storage";
import { Search, Filter, Plus, X, MessageCircle } from "lucide-react";

export default function AllMentionsPage() {
  const { mentions, addMention, addNotification } = useApp();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newPlatform, setNewPlatform] = useState("Twitter");
  const [newSentiment, setNewSentiment] = useState<"positive" | "neutral" | "negative">("positive");

  const handleAddMention = () => {
    if (!newContent.trim()) { toast("Please enter mention content", "error"); return; }
    addMention({
      author: { name: newAuthor || "Anonymous", handle: `@${(newAuthor || "anonymous").toLowerCase().replace(/\s+/g, "_")}` },
      platform: newPlatform,
      content: newContent,
      timestamp: "just now",
      sentiment: newSentiment,
      confidence: 85,
      likes: 0,
      comments: 0,
      shares: 0,
      new: true,
    });
    addNotification({ title: "New mention added", message: `New ${newPlatform} mention from ${newAuthor || "Anonymous"}`, type: "info" });
    setShowAdd(false);
    setNewContent("");
    setNewAuthor("");
    toast("Mention added to feed", "success");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-semibold leading-[1.3]">All Mentions</h1>
          <p className="text-[14px] text-on-dark-muted mt-1">Every mention across all platforms in real-time. {mentions.length} total.</p>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowAdd(true)}>
          <Plus size={16} /> Add Mention
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-dark-muted" />
          <input
            type="text"
            placeholder="Search all mentions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-hairline-violet bg-ink-deep text-on-primary text-[14px] outline-none focus:border-accent-lime/50"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-hairline-violet text-on-dark-muted hover:text-on-primary text-[14px] transition-colors">
          <Filter size={16} /> Filters
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="lime">All</Badge>
        <Badge variant="default">Positive</Badge>
        <Badge variant="default">Neutral</Badge>
        <Badge variant="default">Negative</Badge>
        <Badge variant="default">Twitter/X</Badge>
        <Badge variant="default">Instagram</Badge>
        <Badge variant="default">Reddit</Badge>
      </div>

      <WidgetCard>
        <MentionFeed searchQuery={search} />
      </WidgetCard>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowAdd(false)}>
          <div className="bg-surface-night border border-hairline-violet rounded-xl p-6 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-semibold flex items-center gap-2"><MessageCircle size={18} /> Add Mention</h3>
              <button onClick={() => setShowAdd(false)} className="text-on-dark-muted hover:text-on-primary"><X size={18} /></button>
            </div>
            <div className="space-y-4 animate-stagger">
              <div>
                <label className="block text-[14px] font-medium text-on-dark-muted mb-1">Content</label>
                <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)}
                  rows={3} placeholder="What was said..."
                  className="w-full bg-ink-deep border border-hairline-violet rounded-lg px-3 py-2 text-[14px] text-on-primary outline-none focus:border-accent-lime resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[14px] font-medium text-on-dark-muted mb-1">Author</label>
                  <input type="text" value={newAuthor} onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Name"
                    className="w-full bg-ink-deep border border-hairline-violet rounded-lg px-3 py-2 text-[14px] text-on-primary outline-none focus:border-accent-lime" />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-on-dark-muted mb-1">Platform</label>
                  <select value={newPlatform} onChange={(e) => setNewPlatform(e.target.value)}
                    className="w-full bg-ink-deep border border-hairline-violet rounded-lg px-3 py-2 text-[14px] text-on-primary outline-none focus:border-accent-lime">
                    <option>Twitter</option>
                    <option>Instagram</option>
                    <option>TikTok</option>
                    <option>Facebook</option>
                    <option>Reddit</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[14px] font-medium text-on-dark-muted mb-1">Sentiment</label>
                <div className="flex gap-2">
                  {(["positive", "neutral", "negative"] as const).map((s) => (
                    <button key={s} onClick={() => setNewSentiment(s)}
                      className={`px-4 py-2 rounded-lg text-[13px] font-medium uppercase transition-all ${
                        newSentiment === s
                          ? s === "positive" ? "bg-sentiment-positive/20 text-sentiment-positive border border-sentiment-positive/40"
                            : s === "negative" ? "bg-sentiment-negative/20 text-sentiment-negative border border-sentiment-negative/40"
                            : "bg-sentiment-neutral/20 text-sentiment-neutral border border-sentiment-neutral/40"
                          : "bg-accent-violet-mid/30 text-on-dark-muted border border-transparent"
                      }`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <Button variant="ghost" onClick={() => setShowAdd(false)}>Cancel</Button>
                <Button variant="primary" onClick={handleAddMention}>Add to Feed</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
