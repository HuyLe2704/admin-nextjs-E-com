import { Toast } from "primereact/toast";

interface IToast {
    toast: string;
}

const ToastComponent = (props: IToast) => {
    return ( 
        <Toast ref={props.toast} />
    );
}
 
export default ToastComponent;