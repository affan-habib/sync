import {ProductType} from "../../types";
import {ColumnDef} from "@tanstack/react-table";
import {Avatar, Stack, Typography} from "@mui/material";
import React from "react";


export const ProductsColumns: ColumnDef<ProductType>[] = [
    {
        id: 'id',
        header: '',
        cell: ({row}) => <Stack alignItems="center" direction="row" spacing={2}>
            <Avatar
                src={row.original.image ? row.original.image : "https://via.placeholder.com/150"}
                alt={row.original.name}
                variant="square"
                sx={{
                    width: 50,
                    height: 50
                }}
            />
            <Typography variant="subtitle2">{row.original.SKUs.join(", ")}</Typography>
        </Stack>
    },
    {
        accessorKey: 'name',
        header: 'Product',
    },
    {
        id: 'price',
        header: 'Price',
        cell: ({row}) => parseFloat(row.original.price).toLocaleString(undefined, {
            style: "currency",
            currency: row.original.currency,
        })
    },
    {
        accessorKey: 'vendor',
        header: 'Vendor',
    },
    {
        id: 'video',
        header: 'Video',
        cell: ({row}) => row.original.video && (
            <a href={row.original.video} target="_blank" rel="noopener noreferrer">
                View Video
            </a>
        )
    },
    {
        accessorKey: 'category',
        header: 'Category',
    }
];