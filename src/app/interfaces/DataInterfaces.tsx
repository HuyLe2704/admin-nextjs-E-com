declare namespace DataInterfaces {
    interface SuggestItems {
        id?: string | number;
        name: string;
        img: string;
        imgBackground: string;
        price: number;
        discount: number;
        liked: number;
        point: number;
        rating: number;
        discountPrime: number;
        sold: number;
        quantity: number;
        hidden: number;
    }

    interface Vouchers {
        id?: string | number;
        description: string;
        hidden: number;
        img: string;
        maxDiscount: number;
        minPrice: number;
        name: string;
        timeDiscount: number;
    }

    interface CategoriesItem {
        categoryId?: string | number;
        img: string;
        name: string;
    }

    interface ItemCorresponding {
        id?: string | number;
        corrId?: string | number;
        name: string;
        img: string;
        imgBackground: string;
        price: number;
        discount: number;
        liked: number;
        point: number;
        rating: number;
        discountPrime: number;
        sold: number;
        quantity: number;
        hidden: number;
    }

    interface Orders {
        id: any,
        orderAt: string;
        orderDetail: OrdersDetail[];
        customerId: any
    }

    interface OrdersDetail {
        id?: number,
        orderId?: string | number,
        productName: string;
        price: number;
        newPrice: number,
        buyTime: string;
        quantityOrder: number;
    }
}