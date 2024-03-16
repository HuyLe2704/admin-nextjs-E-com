import cx from './footer.module.css'

const Footer = () => {
    return ( 
        <div className={cx.wrapper}>
            <div className={cx.logo}>Adminstrator Reactjs Web</div>
            <div className={cx.text}>All rights reserved</div>
        </div>
    );
}
 
export default Footer;
