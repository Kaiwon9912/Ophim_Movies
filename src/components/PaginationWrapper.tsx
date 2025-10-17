import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"

type Props = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number // số trang hiện bên cạnh trang hiện tại
}

export default function PaginationWrapper({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
}: Props) {
  if (totalPages <= 1) return null

  const getPages = () => {
    const pages: (number | string)[] = []

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - siblingCount && i <= currentPage + siblingCount)
      ) {
        pages.push(i)
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...")
      }
    }

    return pages
  }

  const pages = getPages()

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationPrevious
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          className={`${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
          }`}
        />

        {/* Pages */}
        {pages.map((p, idx) =>
          p === "..." ? (
            <PaginationEllipsis key={idx} />
          ) : (
            <PaginationItem key={idx}>
              <PaginationLink
                isActive={p === currentPage}
                onClick={() => onPageChange(Number(p))}
                className={`transition-colors ${
                  p === currentPage
                    ? "bg-blue-600 text-white hover:bg-blue-600"
                    : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                }`}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationNext
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          className={`${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
          }`}
        />
      </PaginationContent>
    </Pagination>
  )
}
