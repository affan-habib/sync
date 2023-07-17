import React, {useEffect, useMemo, useState} from "react";
import {
    useReactTable,
    getCoreRowModel,
    getPaginationRowModel,
    flexRender, ColumnDef, PaginationState,
} from "@tanstack/react-table";
import {
    Box, Card, Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";

interface ReactTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onPageChange: (page: number) => void;
    rowsPerPage: number;
    totalCount: number;
    currentPage: number;
    onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ReactTable = <TData, TValue>({
                                       columns,
                                       data,
                                       onPageChange,
                                       rowsPerPage,
                                       totalCount,
                                       currentPage,
                                       onChangeRowsPerPage
                                   }: ReactTableProps<TData, TValue>) => {

    const [pageIndex, setPageIndex] = useState(0);


    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
    });

    useEffect(() => {
        setPageIndex(currentPage - 1);
    }, [currentPage]);


    return <Card>
        <Box sx={{minWidth: 800}}>
            <Table>
                <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableCell key={header.id}>
                                    {
                                        flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )
                                    }
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {table.getRowModel().rows.map(
                        (row) => (
                            <TableRow
                                key={row.id}
                                hover
                                style={{cursor: "pointer"}}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {
                                            flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )
                                        }
                                    </TableCell>
                                ))}

                            </TableRow>
                        ))
                    }

                </TableBody>


            </Table></Box>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={pageIndex}
            onPageChange={(event, newPage) => onPageChange(newPage + 1)}
            onRowsPerPageChange={onChangeRowsPerPage}
        />
    </Card>
};

export default ReactTable;
