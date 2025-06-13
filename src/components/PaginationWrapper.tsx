"use client";

import { Pagination, Stack } from "@mui/material";

type Props = {
  totalPages: number;
  currentPage: number;
};

export default function PaginationWrapper({ totalPages, currentPage }: Props) {
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    window.location.href = `/products?page=${value}`;
  };

  return (
    <Stack alignItems="center" mt={4}>
      <Pagination
        count={totalPages}
        page={currentPage}
        variant="outlined"
        color="primary"
        siblingCount={1}
        boundaryCount={1}
        onChange={handleChange}
      />
    </Stack>
  );
}
