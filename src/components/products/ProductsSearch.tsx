import React, {useCallback, useEffect, useRef, useState} from "react";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import {
    Box,
    Button,
    ButtonGroup,
    Card,
    InputAdornment,
    OutlinedInput,
    SvgIcon,
} from "@mui/material";
import debounce from 'lodash.debounce';

interface Props {
    onSearch: (value: string) => void,
    activeTab: number,
    setActiveTab: (value: number) => void,
}

export const ProductsSearch: React.FC<Props> = ({
                                                    onSearch,
                                                    activeTab,
                                                    setActiveTab
                                                }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useRef(debounce(onSearch, 500));

    useEffect(() => {
        debouncedSearchTerm.current(searchTerm);

        return () => {
            debouncedSearchTerm.current.cancel();
        };
    }, [searchTerm]);


    const handleTabChange = (newValue: number) => {
        setActiveTab(newValue);
    };

    return (
        <Card sx={{p: 2}}>
            <Box display="flex" justifyContent="space-between">
                <OutlinedInput
                    fullWidth
                    placeholder="Search products"
                    startAdornment={
                        <InputAdornment position="start">
                            <SvgIcon color="action" fontSize="small">
                                <MagnifyingGlassIcon/>
                            </SvgIcon>
                        </InputAdornment>
                    }
                    sx={{maxWidth: 500}}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <ButtonGroup variant="contained" sx={{mt: 2}}>
                    <Button
                        variant={activeTab === 0 ? "contained" : "outlined"}
                        onClick={() => handleTabChange(0)}
                        sx={{
                            "&:hover": {
                                backgroundColor: activeTab === 0 ? "primary.main" : "grey.200",
                                color: activeTab === 0 ? "primary.contrastText" : "text.primary",
                            },
                            borderColor: activeTab === 0 ? "primary.main" : "grey.200",
                        }}
                    >
                        Active
                    </Button>
                    <Button
                        variant={activeTab === 1 ? "contained" : "outlined"}
                        onClick={() => handleTabChange(1)}
                        sx={{
                            "&:hover": {
                                backgroundColor: activeTab === 1 ? "primary.main" : "grey.200",
                                color: activeTab === 1 ? "primary.contrastText" : "text.primary",
                            },
                            borderColor: activeTab === 1 ? "primary.main" : "grey.200",
                        }}
                    >
                        Inactive
                    </Button>
                </ButtonGroup>
            </Box>
        </Card>
    );
};