import { useCallback, useState } from "react";

/**
 * The app's generated ms-media upload function (`postFilesByModule` from
 * `src/services/media/sdk.gen.ts`). It is passed in, so pdh-ui stays free of
 * any API client.
 */
export type MediaUploadCall = (options: {
  path: { module: string };
  body: { file: File };
  throwOnError: true;
}) => Promise<{ data?: { data?: { id?: string } } }>;

/**
 * An upload that failed, shaped like the other backends' error envelope
 * (`message` outside, `error.message` inside) so a dialog's existing error
 * handling reads it as it is.
 */
export type MediaUploadError = {
  success: false;
  message: string;
  error: { code: "MEDIA_UPLOAD_FAILED"; message: string };
  /** The original error from ms-media or the network, for debugging. */
  cause?: unknown;
};

const UPLOAD_FAILED_MESSAGE = "Berkas gagal diunggah. Coba unggah lagi.";
const CONNECTION_FAILED_MESSAGE =
  "Sambungan ke server sedang bermasalah. Coba lagi sebentar.";

/**
 * ms-media's reasons for refusing a file (400 VALIDATION_ERROR, or 503 while
 * it is busy) are written for users, e.g. "isi berkas tidak sesuai dengan
 * format .pptx" or "ukuran berkas melebihi batas 50 MB": shown as they are,
 * so the user knows what to change. Other errors get a general message.
 */
function mediaReason(cause: unknown): string | undefined {
  if (!cause || typeof cause !== "object") return undefined;
  const error = (cause as { error?: { code?: string; message?: string } })
    .error;
  const message = error?.message?.trim();
  const code = error?.code;
  if (
    !message ||
    (code !== "VALIDATION_ERROR" && code !== "SERVICE_UNAVAILABLE")
  ) {
    return undefined;
  }
  return message.charAt(0).toUpperCase() + message.slice(1);
}

export function toMediaUploadError(cause?: unknown): MediaUploadError {
  const message =
    cause instanceof Error
      ? CONNECTION_FAILED_MESSAGE
      : (mediaReason(cause) ?? UPLOAD_FAILED_MESSAGE);
  return {
    success: false,
    message,
    error: { code: "MEDIA_UPLOAD_FAILED", message },
    cause,
  };
}

/**
 * Uploads a user's file straight to ms-media in `folder` and gives its id;
 * the feature's own service takes only that id, never the file.
 *
 * `uploadFile` rejects with a {@link MediaUploadError} when it fails;
 * `uploadOptionalFile` gives `undefined` when no file was picked.
 * `isPending` is true while an upload runs.
 *
 * @example
 * import { postFilesByModule } from "@/services/media/sdk.gen";
 * const { uploadFile, isPending } = useMediaUpload("contracts", postFilesByModule);
 * const fileId = await uploadFile(file);
 */
export function useMediaUpload(folder: string, upload: MediaUploadCall) {
  const [running, setRunning] = useState(0);

  const uploadFile = useCallback(
    async (file: File): Promise<string> => {
      let fileId: string | undefined;
      setRunning((n) => n + 1);
      try {
        const response = await upload({
          path: { module: folder },
          body: { file },
          throwOnError: true,
        });
        fileId = response.data?.data?.id;
      } catch (cause) {
        throw toMediaUploadError(cause);
      } finally {
        setRunning((n) => n - 1);
      }
      if (!fileId) throw toMediaUploadError();
      return fileId;
    },
    [folder, upload]
  );

  const uploadOptionalFile = useCallback(
    (file: File | undefined): Promise<string | undefined> =>
      file ? uploadFile(file) : Promise.resolve(undefined),
    [uploadFile]
  );

  return { uploadFile, uploadOptionalFile, isPending: running > 0 };
}
