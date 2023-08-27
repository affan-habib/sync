import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { ProductsSearch } from "../../components/products/ProductsSearch";
import { ProductOverview } from "../../components/products/ProductOverview";
import { ProductDetailsInfo } from "../../components/products/ProductDetailsInfo";
import { ProductVideo } from "../../components/products/ProductVideo";
import { ProductReviews } from "../../components/products/ProductReviews";
import { ProductFormModal } from "../../components/products/ProductFormModal";
import { useProductsQuery } from "../../hooks/useProductsQuery";
import {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
} from "../../store/productsSlice";
import ReactTable from "../../components/tables/ReactTable";
import { ProductsColumns } from "./productsColumns";
import { ImportDialog } from "../importing/ImportDialog";
import { ProductType } from "../../types";

const ProductsPage: React.FC = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [searchResults, setSearchResults] = useState<ProductType[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading, error, isFetching } = useProductsQuery(
    currentPage,
    rowsPerPage,
    searchTerm
  );

  useEffect(() => {
    if (!isFetching) {
      dispatch(getProductsStart());

      if (data) {
        const filteredData = data.data.filter(
          (product) => product.isActive === (activeTab === 0)
        );
        setSearchResults(filteredData);
        dispatch(getProductsSuccess(filteredData));
      }

      if (error) {
        dispatch(getProductsFailure(error.toString()));
      }
    }
  }, [data, error, isFetching, dispatch, activeTab]);

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);

  const columns = useMemo(() => ProductsColumns, []);

  const products = data?.data || [];

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

  const handleSearch = (term: string) => {
    console.log("searching...", term);
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        {showImportDialog && (
          <ImportDialog
            show={showImportDialog}
            hide={() => setShowImportDialog(false)}
          />
        )}
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Products</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  {isLoading ? (
                    <>
                      <Skeleton variant="rectangular" width={100} height={32} />
                      <Skeleton variant="rectangular" width={100} height={32} />
                    </>
                  ) : (
                    <>
                      <Button
                        color="inherit"
                        startIcon={
                          <SvgIcon fontSize="small">
                            <ArrowUpOnSquareIcon />
                          </SvgIcon>
                        }
                        onClick={() => setShowImportDialog(true)}
                      >
                        Import from CSV
                      </Button>
                      <Button
                        color="inherit"
                        startIcon={
                          <SvgIcon fontSize="small">
                            <ArrowDownOnSquareIcon />
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
                  <Skeleton variant="rectangular" width={100} height={32} />
                ) : (
                  <Button
                    startIcon={
                      <SvgIcon fontSize="small">
                        <PlusIcon />
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
              onSearch={handleSearch}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            {isLoading ? (
              Array.from(new Array(3)).map((_, index) => (
                <Box key={index}>
                  <Skeleton variant="rectangular" height={50} />
                </Box>
              ))
            ) : (
              <ReactTable
                data={products}
                columns={columns}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                totalCount={data?.meta?.total || 0}
                currentPage={data?.meta?.current_page || 0}
              />
            )}
            <Drawer
              anchor="right"
              open={!!selectedProduct}
              onClose={handleDrawerClose}
            >
              {selectedProduct && (
                <Box
                  sx={{
                    width: 500,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      overflowY: "auto",
                    }}
                  >
                    <Box mb={2}>
                      <ProductOverview product={selectedProduct} />
                    </Box>
                    <ProductDetailsInfo product={selectedProduct} />
                    {selectedProduct.video && (
                      <Box mt={2}>
                        <ProductVideo product={selectedProduct} />
                      </Box>
                    )}
                    {selectedProduct.reviews && (
                      <Box mt={2}>
                        <ProductReviews product={selectedProduct} />
                      </Box>
                    )}
                  </Box>
                  <Box
                    sx={{
                      p: 2,
                      position: "sticky",
                      bottom: 0,
                      backgroundColor: "#fff",
                    }}
                  >
                    <Button fullWidth variant="contained" color="primary">
                      Edit
                    </Button>
                  </Box>
                </Box>
              )}
            </Drawer>

            <ProductFormModal
              open={isAddModalOpen}
              onClose={handleCloseAddModal}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default ProductsPage;
