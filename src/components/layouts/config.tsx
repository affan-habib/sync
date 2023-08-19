import React from 'react';
import {SvgIcon} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
interface Item {
    title: string;
    path: string;
    icon: React.ReactNode;
}

export const items: Item[] = [
    {
        title: 'Products',
        path: '/products',
        icon: (
            <SvgIcon fontSize="small">
                <InventoryIcon/>
            </SvgIcon>
        )
    },
    {
        title: 'Sales Order',
        path: '/sales',
        icon: (
            <SvgIcon fontSize="small">
                <ShoppingCartCheckoutIcon/>
            </SvgIcon>
        )
    },

];
