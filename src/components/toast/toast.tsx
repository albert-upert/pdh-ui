import type { CSSProperties, ReactElement } from "react";
import { Toaster as ToasterPrimitive, toast as sonnerToast } from "sonner";
import type { ExternalToast, ToasterProps } from "sonner";
import { cn } from "@/lib/utils";

type ToastOptions = ExternalToast & {
  showDefaultAction?: boolean;
};

function Toaster({ ...props }: ToasterProps) {
  return (
    <ToasterPrimitive
      className="toaster group"
      style={
        {
          "--normal-bg": "#262626",
          "--normal-text": "#ffffff",
          "--normal-border": "transparent",
          "--error-bg": "#ca161c",
          "--error-text": "#ffffff",
          "--error-border": "transparent",
          "--border-radius": "16px",
        } as CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: cn(
            "gap-2 px-4 py-3 text-base leading-6 text-white flex w-[690px] items-start rounded-2xl font-['Poppins'] shadow-[0px_16px_36px_0px_rgba(61,65,81,0.1)]"
          ),
          title: "flex-1 whitespace-pre-wrap",
          description: "flex-1 whitespace-pre-wrap",
          actionButton: "shrink-0",
          cancelButton: "shrink-0",
          error: "bg-[#ca161c]",
          success: "bg-[#262626]",
          warning: "bg-[#262626]",
          info: "bg-[#262626]",
        },
      }}
      {...props}
    />
  );
}

const getAction = (options?: ToastOptions) => {
  if (options?.action) {
    return options.action;
  }

  if (options?.showDefaultAction === false) {
    return undefined;
  }

  return {
    label: "Oke",
    onClick: () => {},
  };
};

const getToastOptions = (options?: ToastOptions): ExternalToast => {
  if (!options) {
    return {};
  }

  const toastOptions = { ...options };
  delete toastOptions.showDefaultAction;
  return toastOptions;
};

const toast = {
  default: (message: string, options?: ToastOptions) => {
    return sonnerToast(message, {
      ...getToastOptions(options),
      className: "bg-[#262626]",
      action: getAction(options),
    });
  },
  error: (message: string, options?: ToastOptions) => {
    return sonnerToast.error(message, {
      ...getToastOptions(options),
      className: "bg-[#ca161c]",
      action: getAction(options),
    });
  },
  success: (message: string, options?: ToastOptions) => {
    return sonnerToast.success(message, {
      ...getToastOptions(options),
      className: "bg-[#262626]",
      action: getAction(options),
    });
  },
  info: (message: string, options?: ToastOptions) => {
    return sonnerToast.info(message, {
      ...getToastOptions(options),
      className: "bg-[#262626]",
      action: getAction(options),
    });
  },
  warning: (message: string, options?: ToastOptions) => {
    return sonnerToast.warning(message, {
      ...getToastOptions(options),
      className: "bg-[#262626]",
      action: getAction(options),
    });
  },
  custom: (
    render: (id: string | number) => ReactElement,
    options?: ToastOptions
  ) => {
    return sonnerToast.custom(render, options);
  },
  promise: sonnerToast.promise as typeof sonnerToast.promise,
  loading: sonnerToast.loading,
  dismiss: sonnerToast.dismiss,
};

export { Toaster, toast };
