import { useCallback, useEffect, useRef, useState } from 'react';

export const TOAST_EXIT_MS = 220;

interface UseToastItemLifecycleOptions {
  duration: number;
  exiting: boolean;
  onRemove: () => void;
  onRequestExit: () => void;
}

export function useToastItemLifecycle({
  duration,
  exiting,
  onRemove,
  onRequestExit,
}: UseToastItemLifecycleOptions) {
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [progressDurationMs, setProgressDurationMs] = useState(duration);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endAtRef = useRef(0);
  const remainingRef = useRef(duration);

  const clearTimer = useCallback(() => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const scheduleExit = useCallback(
    (ms: number) => {
      clearTimer();
      if (ms <= 0) {
        onRequestExit();
        return;
      }
      endAtRef.current = Date.now() + ms;
      remainingRef.current = ms;
      timerRef.current = window.setTimeout(onRequestExit, ms);
    },
    [clearTimer, onRequestExit],
  );

  useEffect(() => {
    if (!exiting) return;
    const timer = window.setTimeout(onRemove, TOAST_EXIT_MS);
    return () => window.clearTimeout(timer);
  }, [exiting, onRemove]);

  useEffect(() => {
    if (duration <= 0 || exiting) return;
    setProgressDurationMs(duration);
    remainingRef.current = duration;
    scheduleExit(duration);
    return clearTimer;
  }, [duration, exiting, scheduleExit, clearTimer]);

  const handlePause = useCallback(() => {
    if (duration <= 0 || exiting) return;
    remainingRef.current = Math.max(0, endAtRef.current - Date.now());
    clearTimer();
    setPaused(true);
  }, [clearTimer, duration, exiting]);

  const handleResume = useCallback(() => {
    if (duration <= 0 || exiting) return;
    setPaused(false);
    setProgressDurationMs(remainingRef.current);
    setProgressKey((key) => key + 1);
    scheduleExit(remainingRef.current);
  }, [duration, exiting, scheduleExit]);

  return {
    paused,
    progressKey,
    progressDurationMs,
    pauseHandlers: {
      onMouseEnter: handlePause,
      onMouseLeave: handleResume,
      onFocus: handlePause,
      onBlur: handleResume,
    },
  };
}
