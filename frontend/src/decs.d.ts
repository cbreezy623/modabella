declare module "react-widgets-moment"

// appointment types
interface appointment {
    id: number;
    startDate: string;
    endDate: string;
    title: string;
    allDay: boolean;
    rRule: string;
    notes: string;
    customer: number;
}

// customer types

interface newCustomer {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    notes: string;
}

interface customer extends newCustomer { id: number; }

// product types

interface category {
    name: string;
}

interface newProduct {
    name: string;
    price: string;
    brand: number;
}

interface product extends newProduct { id: number; }

// table types

interface appointmentTableEntry {
    id: number;
    c_id: number;
    first_name: string;
    last_name: string;
    startDate: string;
    endDate: string;
    cash: string;
    card: string;
    check: string;
    subtotal: string;
    tax: string;
    p_sub: string;
    s_sub: string;
}

// sale types

interface newPsale {
    appointment: number;
    quantity: number;
    unitSalePrice: string;
    product: number;
    payment: string;
}

interface newSsale {
    appointment: number;
    salePrice: string;
    service: number;
    payment: string;
}

// service types

interface newModifier {
    name: string;
    price: string;
}

interface modifier extends newModifier { id: number; }

interface newService {
    name: string;
    price: string;
    category: number;
}

interface service extends newService { id: number; }

interface serviceDetailed {
    id: number;
    name: string;
    price: string;
    category: {
        id: number;
        name: string;
    }
}

interface servmod {
    service: number,
    modifier: number,
}

interface newBrand { name: string; }

// misc types

interface totals {
    appointment: number;
    cash: number;
    card: number;
    check: number;
    tax: number;
    subtotal: number;
    p_sub: number;
    s_sub: number;
}