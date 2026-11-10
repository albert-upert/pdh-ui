import type {
  ComponentProps,
  CSSProperties,
  ReactElement,
  ReactNode,
} from "react";
import { Toaster as ToasterPrimitive, toast as sonnerToast } from "sonner";
import type { ExternalToast, ToasterProps } from "sonner";
import { Glass } from "@/components/glass";
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
            "gap-2 px-4 py-3 text-base leading-6 text-white flex w-[690px] items-start rounded-2xl font-sans shadow-[0px_16px_36px_0px_rgba(61,65,81,0.1)]"
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

export interface ToastProps extends Omit<ComponentProps<"div">, "children"> {
  /** Tampil atau tersembunyi. Kendalikan dari luar, mis. dengan `useState`. */
  opened?: boolean;
  /** Posisi horizontal di bagian bawah layar. */
  position?: "left" | "center" | "right";
  /** Tombol di kanan pesan, mis. `<Button variant="tertiary" size="sm">Tutup</Button>`. */
  button?: ReactNode;
  children?: ReactNode;
}

const TOAST_POSITION = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
} as const;

/**
 * Toast deklaratif (Konsta `Toast`): muncul dari bawah saat `opened`.
 * Gunakan `toast.*` + `Toaster` bila butuh antrean otomatis tanpa state.
 * iOS: kapsul kaca. Material: panel `card` dengan teks primary.
 */
function Toast({
  className,
  opened = false,
  position = "left",
  button,
  children,
  ...props
}: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={!opened}
      inert={!opened}
      data-slot="toast"
      data-state={opened ? "open" : "closed"}
      className={cn(
        "inset-x-4 fixed bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex transition-[transform,opacity]",
        "ios:duration-300 material:duration-200",
        TOAST_POSITION[position],
        !opened && "pointer-events-none translate-y-full opacity-0",
        className
      )}
      {...props}
    >
      <Glass
        className={cn(
          "max-w-lg rounded-2xl text-foreground",
          "material:shadow-lg material:border material:border-border material:text-primary"
        )}
      >
        <div className="px-4 py-3 material:px-6 material:py-3.5 flex items-center justify-between">
          {children}
          {button && (
            <div className="-my-2 ms-4 material:-me-2 shrink-0">{button}</div>
          )}
        </div>
      </Glass>
    </div>
  );
}

export { Toast, Toaster, toast };
