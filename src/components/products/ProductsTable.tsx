import {
    Avatar,
    Box,
    Card,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import { Scrollbar } from '../common/Scrollbar';
import {
    PencilSquareIcon,
    TrashIcon,
    EyeIcon,
    CheckCircleIcon,
    EllipsisVerticalIcon,
} from "@heroicons/react/24/outline/index";
import XCircleIcon from "@heroicons/react/24/outline/XCircleIcon";
import React, { useState } from 'react';
import {ProductType} from "../../types";

interface Props {
    count?: number,
    items?: ProductType[],
    onPageChange?: (event: unknown, newPage: number) => void,
    onRowsPerPageChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
    page?: number,
    rowsPerPage?: number,
    onProductClick?: (product: ProductType) => void,
}

export const ProductsTable: React.FC<Props> = ({
                                            count = 0,
                                            items = [],
                                            onPageChange = () => {},
                                            onRowsPerPageChange,
                                            page = 0,
                                            rowsPerPage = 0,
                                            onProductClick = (product: ProductType) => {}
                                        }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);


    const handleClick = (event: React.MouseEvent<HTMLElement>, product: ProductType) => {
        setAnchorEl(event.currentTarget);
        setSelectedProduct(product);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        handleClose();
    };

    const handleDelete = () => {
        // Implement your delete product logic here
        handleClose();
    };

    const handleToggleActive = () => {
        // Implement your toggle product active/inactive logic here
        handleClose();
    };

    return (
        <Card>
            <Scrollbar>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Product</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Vendor</TableCell>
                                <TableCell>Video</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((product) =>
                                (
                                    <TableRow
                                        key={product.id}
                                        hover
                                        style={{cursor: "pointer"}}
                                    >

                                        <TableCell>
                                            <Stack alignItems="center" direction="row" spacing={2}>
                                                <Avatar
                                                    src={product.image ? product.image : "https://via.placeholder.com/150"}
                                                    alt={product.name}
                                                    variant="square"
                                                    sx={{
                                                        width: 50,
                                                        height: 50
                                                    }}
                                                />
                                                <Typography variant="subtitle2">{product.SKUs.join(", ")}</Typography>
                                            </Stack>
                                        </TableCell>

                                        <TableCell>
                                            <Typography variant="subtitle2">{product.name}</Typography>
                                        </TableCell>

                                        <TableCell>
                                            {parseFloat(product.price).toLocaleString(undefined, {
                                                style: "currency",
                                                currency: product.currency,
                                            })}
                                        </TableCell>
                                        <TableCell>{product.vendor}</TableCell>
                                        <TableCell>
                                            {product.video && (
                                                <a href={product.video} target="_blank" rel="noopener noreferrer">
                                                    View Video
                                                </a>
                                            )}
                                        </TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={() => onProductClick(product)}>
                                                <SvgIcon>
                                                    <EyeIcon/>
                                                </SvgIcon>
                                            </IconButton>
                                            <IconButton
                                                aria-label="more"
                                                aria-controls="long-menu"
                                                aria-haspopup="true"
                                                onClick={(event) => handleClick(event, product)}
                                            >
                                                <SvgIcon>
                                                    <EllipsisVerticalIcon/>
                                                </SvgIcon>
                                            </IconButton>
                                            <Menu
                                                id="long-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                            >
                                                <MenuItem onClick={handleEdit}>
                                                    <SvgIcon fontSize="small">
                                                        <PencilSquareIcon/>
                                                    </SvgIcon>
                                                    Edit
                                                </MenuItem>
                                                <MenuItem onClick={handleDelete}>
                                                    <SvgIcon fontSize="small">
                                                        <TrashIcon/>
                                                    </SvgIcon>
                                                    Delete
                                                </MenuItem>
                                                <MenuItem onClick={handleToggleActive}>
                                                    <SvgIcon fontSize="small">
                                                        {product.isActive ? <XCircleIcon/> : <CheckCircleIcon/>}
                                                    </SvgIcon>
                                                    {product.isActive ? "Make Inactive" : "Make Active"}
                                                </MenuItem>
                                            </Menu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </Box>
            </Scrollbar>
            <TablePagination
                component="div"
                count={count}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};
