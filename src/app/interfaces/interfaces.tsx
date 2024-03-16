declare namespace Interfaces {
    interface MenuItem {
        title: string;
        list: SubMenuItem[];
    }
    
    interface SubMenuItem {
        title: string;
        path: string;
        icon: string
    }

    interface SearchProps {
        placeholder: string;
        className?: string;
    }

    interface DataHeaderProps {
        header: string;
        field: string;
    }

    interface DataTableProps {
        data: any[]; 
        headerClassName: string;
        dataHeader: DataHeaderProps[];
        columnClassName: string;
        handleDelete?: any;
        handleEdit?: any;
        handleDetail?: any;
        passwordColumnBodyTemplate?: any;
        edit: boolean;
        createdDateTemplate?: any;
    }

    interface DataUsers {
        id: string,
        img?: string,
        userName: string,
        userPassword: string,
        userEmail: string,
        created_at: string,
        status?: number
    }

    interface DataCardInfo {
        id: string,
        title: string,
        number: number,
        desc: string,
        icon: string,
        rate: number
    }

    interface UpdateProductPayload {
        itemId: string;
        productData: DataInterfaces.SuggestItems;
    }

    interface UpdateVoucherPayload {
        voucherId: string;
        voucherData: DataInterfaces.Vouchers;
    }
    
    interface ILogin {
        username: string;
        password: string;
    }

    interface UpdateCategoriesPayload {
        itemId: string;
        categoriesData: DataInterfaces.CategoriesItem
    }

    interface UpdateItemCorrPayload {
        itemId: string;
        itemCorrData: DataInterfaces.ItemCorresponding
    }
}
