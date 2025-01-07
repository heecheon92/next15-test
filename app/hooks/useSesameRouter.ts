"use client";

import {
  AppRouterInstance,
  NavigateOptions,
  PrefetchOptions,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useTransition } from "react";

import { useNProgress } from "./useNProgress";

export function useSesameRouter() {
  const _router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { NProgress } = useNProgress();

  useEffect(() => {
    if (isPending) {
      NProgress.start();
    } else {
      NProgress.done();
    }
    return () => {
      NProgress.done();
    };
  }, [isPending]);

  const router = useMemo<AppRouterInstance>(() => {
    return {
      back: function (): void {
        startTransition(() => {
          _router.back();
        });
      },
      forward: function (): void {
        startTransition(() => {
          _router.forward();
        });
      },
      refresh: function (): void {
        startTransition(() => {
          _router.refresh();
        });
      },
      push: function (
        href: string,
        options?: NavigateOptions | undefined,
      ): void {
        startTransition(() => {
          _router.push(href, options);
        });
      },
      replace: function (
        href: string,
        options?: NavigateOptions | undefined,
      ): void {
        startTransition(() => {
          _router.replace(href, options);
        });
      },
      prefetch: function (
        href: string,
        options?: PrefetchOptions | undefined,
      ): void {
        _router.prefetch(href, options);
      },
    };
  }, [_router]);

  return router;
}
