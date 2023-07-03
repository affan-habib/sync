import React, {useCallback, useMemo, useState, useEffect} from "react";
import {useDispatch} from 'react-redux';
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {
    Box,
    Button,
    Container,
    Drawer,
    Stack,
    SvgIcon,
    Typography,
    Skeleton,
} from "@mui/material";
import {DashboardLayout} from "../../components/layouts/DashboardLayout";
import {ProductsTable} from "../../components/products/ProductsTable";
import {ProductsSearch} from "../../components/products/ProductsSearch";
import {applyPagination} from "../../utils/ApplyPagination";
import {ProductOverview} from "../../components/products/ProductOverview";
import {ProductDetailsInfo} from "../../components/products/ProductDetailsInfo";
import {ProductVideo} from "../../components/products/ProductVideo";
import {ProductReviews} from "../../components/products/ProductReviews";
import {ProductFormModal} from "../../components/products/ProductFormModal";
import {useProductsQuery} from '../../hooks/useProductsQuery';
import {getProductsStart, getProductsSuccess, getProductsFailure} from './productsSlice';


const useProducts = (page: number, rowsPerPage: number, data: any[]) => {
    return useMemo(() => {
        return applyPagination(data, page, rowsPerPage);
    }, [page, rowsPerPage, data]);
};

const useProductIds = (products: any[]) => {
    return useMemo(() => {
        return products.map((product) => product.id);
    }, [products]);
};

const ProductsPage: React.FC = () => {
    const dispatch = useDispatch();
    const {
        data,
        isLoading,
        error
    } = useProductsQuery();

    useEffect(() => {
        dispatch(getProductsStart());

        if (data) {
            dispatch(getProductsSuccess(data));
        }

        if (error) {
            dispatch(getProductsFailure(error.toString()));
        }
    }, [data, error, isLoading, dispatch]);


    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        console.log("data", data);
    }, [data]);

    const products = useProducts(
        page,
        rowsPerPage,
        searchResults.length > 0
            ? searchResults
            : data
                ? data.filter((product: any) => product.isActive === (activeTab === 0))
                : []
    );


    useEffect(() => {
        console.log("products", products);
    }, [products]);

    // const productIds = useProductIds(products);
    // const productSelection = useSelection(productIds);

    const handlePageChange = useCallback((event: unknown, newPage: number) => {
        setPage(newPage);
    }, []);

    const handleRowsPerPageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(Number(event.target.value));
    }, []);

    const handleDrawerClose = () => {
        setSelectedProduct(null);
    };

    const handleProductClick = (product: any) => {
        setSelectedProduct(product);
    };

    const handleOpenAddModal = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    return (
        <DashboardLayout>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack direction="row" justifyContent="space-between" spacing={4}>
                            <Stack spacing={1}>
                                <Typography variant="h4">Products</Typography>
                                <Stack alignItems="center" direction="row" spacing={1}>
                                    {isLoading ? (
                                        <>
                                            <Skeleton variant="rectangular" width={100} height={32}/>
                                            <Skeleton variant="rectangular" width={100} height={32}/>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                color="inherit"
                                                startIcon={
                                                    <SvgIcon fontSize="small">
                                                        <ArrowUpOnSquareIcon/>
                                                    </SvgIcon>
                                                }
                                            >
                                                Import from CSV
                                            </Button>
                                            <Button
                                                color="inherit"
                                                startIcon={
                                                    <SvgIcon fontSize="small">
                                                        <ArrowDownOnSquareIcon/>
                                                    </SvgIcon>
                                                }
                                            >
                                                Export
                                            </Button>
                                        </>
                                    )}
                                </Stack>
                            </Stack>
                            <div>
                                {isLoading ? (
                                    <Skeleton variant="rectangular" width={100} height={32}/>
                                ) : (
                                    <Button
                                        startIcon={
                                            <SvgIcon fontSize="small">
                                                <PlusIcon/>
                                            </SvgIcon>
                                        }
                                        variant="contained"
                                        onClick={handleOpenAddModal}
                                    >
                                        Add
                                    </Button>
                                )}
                            </div>
                        </Stack>
                        <ProductsSearch
                            data={products}
                            setSearchResults={setSearchResults}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                        {isLoading ? (
                            Array.from(new Array(3)).map((_, index) => (
                                <Box key={index}>
                                    <Skeleton variant="rectangular" height={50}/>
                                </Box>
                            ))
                        ) : (
                            <ProductsTable
                                count={searchResults.length > 0 ? searchResults.length : products.length}
                                items={products}
                                onPageChange={handlePageChange}
                                onRowsPerPageChange={handleRowsPerPageChange}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onProductClick={(product) => handleProductClick(product)}
                            />
                        )}
                        <Drawer anchor="right" open={!!selectedProduct} onClose={handleDrawerClose}>
                            {selectedProduct && (
                                <Box sx={{
                                    width: 500,
                                    display: "flex",
                                    flexDirection: "column",
                                    height: "100%"
                                }}>
                                    <Box sx={{
                                        p: 2,
                                        overflowY: "auto"
                                    }}>
                                        <Box mb={2}>
                                            <ProductOverview product={selectedProduct}/>
                                        </Box>
                                        <ProductDetailsInfo product={selectedProduct}/>
                                        {selectedProduct.video && (
                                            <Box mt={2}>
                                                <ProductVideo product={selectedProduct}/>
                                            </Box>
                                        )}
                                        {selectedProduct.reviews && (
                                            <Box mt={2}>
                                                <ProductReviews product={selectedProduct}/>
                                            </Box>
                                        )}
                                    </Box>
                                    <Box sx={{
                                        p: 2,
                                        position: "sticky",
                                        bottom: 0,
                                        backgroundColor: "#fff"
                                    }}>
                                        <Button fullWidth variant="contained" color="primary">
                                            Edit
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                        </Drawer>

                        <ProductFormModal open={isAddModalOpen} onClose={handleCloseAddModal}/>
                    </Stack>
                </Container>
            </Box>
        </DashboardLayout>
    );
};

export default ProductsPage;
