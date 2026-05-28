"use client";

/* eslint-disable react-hooks/immutability, react-hooks/refs */

import { useEffect, useRef, useCallback, useState } from "react";

type WebSocketStatus = "connecting" | "connected" | "disconnected" | "error";

interface UseWebSocketOptions {
  url: string;
  onMessage?: (data: unknown) => void;
  reconnectInterval?: number;
  maxReconnects?: number;
}

export function useWebSocket({
  url,
  onMessage,
  reconnectInterval = 5000,
  maxReconnects = 10,
}: UseWebSocketOptions) {
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectCount = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [status, setStatus] = useState<WebSocketStatus>("disconnected");
  const stableCallbacks = useRef({ onMessage, reconnectInterval, maxReconnects });
  stableCallbacks.current = { onMessage, reconnectInterval, maxReconnects };

  const connect = useCallback(() => {
    if (reconnectCount.current >= maxReconnects) return;
    setStatus("connecting");

    const ws = new WebSocket(url);
    ws.onopen = () => {
      setStatus("connected");
      reconnectCount.current = 0;
    };
    ws.onmessage = (event) => {
      const { onMessage: msgCb } = stableCallbacks.current;
      try {
        const data = JSON.parse(event.data);
        msgCb?.(data);
      } catch {
        msgCb?.(event.data);
      }
    };
    ws.onclose = () => {
      setStatus("disconnected");
      reconnectCount.current++;
      const fn = connect;
      timerRef.current = setTimeout(() => fn(), reconnectInterval);
    };
    ws.onerror = () => {
      setStatus("error");
      ws.close();
    };
    wsRef.current = ws;
  }, [url, reconnectInterval, maxReconnects]);

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(timerRef.current);
      wsRef.current?.close();
    };
  }, [connect]);

  const send = useCallback((data: unknown) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    }
  }, []);

  return { status, send };
}
