import React from 'react';
import {SvgIcon} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';

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

];
