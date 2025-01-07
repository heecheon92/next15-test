"use client";

import { cn } from "@/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useMemo } from "react";

import { useClassNames } from "@/app/hooks/useClassNames";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";
import { ToasterToast, useToast } from "./useToast";

export function Toaster() {
  const { toasts } = useToast();
  const { cns } = useClassNames();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            className={cn(
              props.className,
              "m-0 my-2 w-[343px] flex-shrink p-0"
            )}
          >
            <div className="flex w-full flex-row items-center justify-start p-[17px] pl-2">
              <ToasterLottiePlayer {...props} />

              <section className="flex flex-row items-center justify-between pl-[6px]">
                <div className="flex flex-col items-start justify-start text-start">
                  {title && (
                    <ToastTitle className={cns.toast.title}>{title}</ToastTitle>
                  )}
                  {description && (
                    <ToastDescription className={cns.toast.description}>
                      {description}
                    </ToastDescription>
                  )}
                </div>
                {action}
              </section>
            </div>

            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

function ToasterLottiePlayer(props: Pick<ToasterToast, "variant">) {
  const { cns } = useClassNames();
  const src = useMemo(() => {
    if (props.variant === "success") return "/lottie/success.lottie";
    if (props.variant === "fail") return "/lottie/failed.lottie";
    if (props.variant === "deleted") return "/lottie/deleted.lottie";
    if (props.variant === "card_fail") return "/lottie/card_failed.lottie";
    if (props.variant === "card_success") return "/lottie/card_success.lottie";
    return "";
  }, [props.variant]);

  if (!src) return null;

  return (
    <>
      <DotLottieReact className={cn(cns.toast.icon)} src={src} autoplay />
    </>
  );
}
