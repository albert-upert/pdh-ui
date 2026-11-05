import { useCallback, useMemo, useState } from "react";
import type { KeyboardEvent } from "react";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/dropdown";
import {
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CloseIcon,
  SearchIcon,
} from "@/components/icon";
import Typography from "@/components/typography/typography";
import { cn } from "@/lib/utils";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  pageSizeOptions?: Array<number>;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  showPageSizeSelector?: boolean;
  showResultsInfo?: boolean;
  showSearchPage?: boolean;
  iconOnly?: boolean;
  className?: string;
}

type PageItem = number | "ellipsis";

function getPageNumbers(
  currentPage: number,
  totalPages: number
): Array<PageItem> {
  if (totalPages <= 7) {
    return Array.from(
      { length: Math.max(0, totalPages) },
      (_, index) => index + 1
    );
  }

  const page = Math.min(Math.max(currentPage, 1), totalPages);
  const visible = new Set([1, totalPages, page - 1, page, page + 1]);

  if (page <= 3) {
    [2, 3, 4].forEach((number) => visible.add(number));
  }
  if (page >= totalPages - 2) {
    [totalPages - 3, totalPages - 2, totalPages - 1].forEach((number) =>
      visible.add(number)
    );
  }

  const sorted = [...visible]
    .filter((number) => number >= 1 && number <= totalPages)
    .sort((left, right) => left - right);
  const items: Array<PageItem> = [];

  sorted.forEach((number, index) => {
    const previous = sorted[index - 1];
    if (previous !== undefined && number - previous === 2) {
      items.push(previous + 1);
    } else if (previous !== undefined && number - previous > 2) {
      items.push("ellipsis");
    }
    items.push(number);
  });

  return items;
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems: _totalItems,
  pageSize = 10,
  pageSizeOptions = [10, 20, 30, 40, 50],
  onPageChange,
  onPageSizeChange,
  showPageSizeSelector = true,
  showResultsInfo = true,
  showSearchPage = true,
  iconOnly = false,
  className,
}: PaginationProps) {
  const [searchPageOpen, setSearchPageOpen] = useState(false);
  const [searchPageValue, setSearchPageValue] = useState("");

  const handlePageChange = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        onPageChange(page);
      }
    },
    [currentPage, totalPages, onPageChange]
  );

  const handleSearchPageSubmit = useCallback(() => {
    const pageNum = parseInt(searchPageValue);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setSearchPageOpen(false);
      setSearchPageValue("");
    }
  }, [searchPageValue, totalPages, onPageChange]);

  const handleSearchPageKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSearchPageSubmit();
      } else if (event.key === "Escape") {
        setSearchPageOpen(false);
        setSearchPageValue("");
      }
    },
    [handleSearchPageSubmit]
  );

  const handleClearSearch = useCallback(() => {
    setSearchPageValue("");
  }, []);

  const handleToggleSearchPage = useCallback(() => {
    setSearchPageOpen((prev) => !prev);
  }, []);

  const handleCloseSearchPage = useCallback(() => {
    setSearchPageOpen(false);
  }, []);

  const pageNumbers = useMemo(
    () => getPageNumbers(currentPage, totalPages),
    [currentPage, totalPages]
  );
  const activeIndex = pageNumbers.findIndex((page) => page === currentPage);

  return (
    <div className={cn("gap-4 flex flex-wrap items-center", className)}>
      {/* Page Size Selector */}
      {showPageSizeSelector && onPageSizeChange && (
        <div className="gap-3 px-4 flex items-center">
          <Typography variant="body-small" as="span">
            Tampilkan
          </Typography>
          <Dropdown>
            <DropdownTrigger asChild>
              <button
                type="button"
                className="h-10 gap-2 px-3 flex w-[72px] items-center justify-between border border-border bg-background text-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none motion-reduce:transition-none ios:rounded-lg material:rounded-sm"
              >
                <Typography variant="body-small" as="span">
                  {pageSize}
                </Typography>
                <CaretDownIcon className="size-4 opacity-50" />
              </button>
            </DropdownTrigger>
            <DropdownContent>
              {pageSizeOptions.map((size) => (
                <DropdownItem
                  key={size}
                  onClick={() => onPageSizeChange(size)}
                  className={cn(size === pageSize && "bg-muted")}
                >
                  {size}
                </DropdownItem>
              ))}
            </DropdownContent>
          </Dropdown>
          <Typography variant="body-small" as="span">
            Per Halaman
          </Typography>
        </div>
      )}

      {/* Results Info */}
      {showResultsInfo && (
        <div className="h-10 px-4 flex items-center">
          <Typography variant="body-small" as="span">
            Hasil: {currentPage} dari {totalPages}
          </Typography>
        </div>
      )}

      {/* Page Numbers */}
      <nav
        className="h-10 gap-1 relative flex items-center"
        aria-label="Halaman"
      >
        {activeIndex >= 0 && (
          <span
            aria-hidden="true"
            className="left-0 top-0 h-10 w-10 ease-out pointer-events-none absolute rounded-xl bg-primary-light transition-transform duration-300 motion-reduce:transition-none"
            style={{ transform: `translateX(${activeIndex * 44}px)` }}
          />
        )}
        {pageNumbers.map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              aria-hidden="true"
              className="h-10 w-10 animate-in fade-in-0 relative flex items-center justify-center text-muted-foreground duration-200 motion-reduce:animate-none"
            >
              …
            </span>
          ) : (
            <button
              key={page}
              type="button"
              aria-label={`Halaman ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              onClick={() => handlePageChange(page)}
              className={cn(
                "h-10 w-10 text-sm font-normal animate-in fade-in-0 zoom-in-95 relative flex items-center justify-center rounded-xl transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none motion-reduce:animate-none motion-reduce:transition-none",
                page === currentPage
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {page}
            </button>
          )
        )}
      </nav>

      {/* Previous/Next Buttons */}
      <div className="gap-2 flex items-center">
        <button
          type="button"
          aria-label="Halaman sebelumnya"
          disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="h-10 gap-1 px-4 py-2 flex items-center rounded-lg border border-primary bg-background text-primary transition-colors duration-200 hover:border-primary/70 hover:text-primary/70 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
        >
          <CaretLeftIcon className="size-5" />
          {!iconOnly && (
            <Typography variant="body-small" className="text-primary" as="span">
              Sebelumnya
            </Typography>
          )}
        </button>

        <button
          type="button"
          aria-label="Halaman selanjutnya"
          disabled={currentPage >= totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="h-10 gap-1 px-4 py-2 flex items-center rounded-lg border border-primary bg-background text-primary transition-colors duration-200 hover:border-primary/70 hover:text-primary/70 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
        >
          {!iconOnly && (
            <Typography variant="body-small" className="text-primary" as="span">
              Selanjutnya
            </Typography>
          )}
          <CaretRightIcon className="size-5" />
        </button>
      </div>

      {/* Search Page */}
      {showSearchPage && (
        <div className="relative">
          {!searchPageOpen ? (
            <button
              type="button"
              onClick={handleToggleSearchPage}
              className="h-10 gap-1 px-4 py-2 flex items-center rounded-lg border border-primary bg-background text-primary transition-colors duration-200 hover:border-primary/70 hover:text-primary/70 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none motion-reduce:transition-none"
            >
              <SearchIcon className="size-5" />
              <Typography
                variant="body-small"
                className="text-primary"
                as="span"
              >
                Cari Halaman
              </Typography>
            </button>
          ) : (
            <div className="h-10 w-80 bg-white flex items-center rounded-lg border border-primary">
              <button
                type="button"
                onClick={handleCloseSearchPage}
                className="h-10 gap-1 px-4 py-2 flex items-center rounded-l-lg border-r border-primary bg-background text-primary transition-colors duration-200 hover:text-primary/70 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none motion-reduce:transition-none"
              >
                <SearchIcon className="size-5" />
                <Typography
                  variant="body-small"
                  className="text-primary"
                  as="span"
                >
                  Cari Halaman
                </Typography>
              </button>
              <input
                type="text"
                value={searchPageValue}
                onChange={(e) => setSearchPageValue(e.target.value)}
                onKeyDown={handleSearchPageKeyDown}
                placeholder="Mulai ketik Angka"
                className="px-3 py-2 text-sm font-normal flex-1 text-foreground outline-none placeholder:text-muted-foreground"
                autoFocus
              />
              {searchPageValue && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="px-3 flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                >
                  <CloseIcon className="size-5" />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
