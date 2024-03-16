'use client'
import { SubmitHandler, useForm } from 'react-hook-form';
import cx from './login.module.css'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import Image from 'next/image';
import { adminLogin } from './data/data';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Loading from './loading';

const App = () => {
  const { handleSubmit,  register, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [loginSuccessfull, setLoginSuccessfull] = useState<boolean>(false)
  const router = useRouter();
  const [messageLogin, setMessageLogin] = useState('');

  const onSubmit = (data: any) => {
    setLoading(true); 
    setTimeout(() => {
      setLoading(false); 
      if (data.username === adminLogin.username && data.password === adminLogin.password) {
        setMessageLogin("Đăng nhập thành công")
        reset();
        setLoginSuccessfull(true)
        router.push('/dashboard'); 
      } else {
        setMessageLogin('Đăng nhập thất bại, hãy kiểm tra lại thông tin tài khoản.');
        setLoginSuccessfull(false)
      }
    }, 1000);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center'}}>
      {loading && <Loading />}
      <form onSubmit={handleSubmit(onSubmit)} className={cx.formSubmit}>
        <h4>CHÀO MỪNG ĐẾN VỚI TRANG QUẢN TRỊ</h4>
        <label htmlFor='username' className={cx.label}>Tài khoản</label>
        <InputText
          placeholder='Tài khoản' 
          id="username" className={cx.input} 
          {...register('username', { required: true })} 
        />
        {errors.username && <p style={{color: 'red'}}>Tài khoản là bắt buộc</p>}
        <label htmlFor='password' className={cx.label}>Mật khẩu</label>
        <InputText 
          placeholder='Mật khẩu' 
          type='password'
          id="password" className={cx.input} 
          {...register('password', { required: true })} 
        />
        {errors.password && <p style={{color: 'red'}}>Mật khẩu là bắt buộc</p>}
        <Button label='Đăng nhập' className={cx.button} type='submit' />
        <div style={{marginTop: '12px'}}></div>
        {messageLogin && <span style={{color: messageLogin.includes("thành công") ? 'green' : 'red'}}>{messageLogin}</span>}
        <div className={cx.background}>
          <Image alt="login-image" src='/astronaut.png' className={cx.image} fill sizes='' />
        </div>
      </form>
    </div>
  );
}

export default App;