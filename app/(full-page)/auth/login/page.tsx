/* eslint-disable @next/next/no-img-element */
'use client';
import { useRouter } from 'next/navigation';
import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

import { UserController } from '../../../../src/controllers/UserController';
import { globalStorage } from '../../../../src/utils/Globalstorage';

const LoginPage = () => {
    const [email, setEmail] = useState('admin');
    const [password, setPassword] = useState('admin');
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);

    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    const ctl=new UserController();
    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />
                <div
                    style={{
                        borderRadius: '56px',
                        padding: '0.3rem',
                        background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                    }}
                >
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <img src="/demo/images/login/avatar.png" alt="Image" height="50" className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">苏州丰禾ERP-V5.8</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                                账号
                            </label>
                            <InputText id="email1"  value={email}    type="text" placeholder="Email address" onChange={(e) => setEmail(e.target.value)}  className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                密码
                            </label>
                            <Password inputId="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">记住我</label>
                                </div>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    忘记密码?
                                </a>
                            </div>
                            <Button label="登录系统" className="w-full p-3 text-xl" onClick={() =>{


                                // 存储数据
                                localStorage.setItem('key', 'value');
                                sessionStorage.setItem('key', 'value');
                                // 读取数据
                                const data = localStorage.getItem('key');
                                console.log("data:",data);
                                // 删除数据
                                localStorage.removeItem('key');
                                // 清空所有数据
                                localStorage.clear();


                                const fhojt=ctl.longin(email,password);
                                fhojt.then((data)=>{
                                    console.log("data:");
                                    console.log(data["fhok"]);
                                    var ojt=eval('(' + data["fhok"] + ')');
                                     console.log(ojt["fhlist"][0]["id"]);
                                    
                                    var uid=ojt["fhlist"][0]["id"];
                                   // console.log(ojt[0]["id"]);
                                    if(!_.isNil(uid))
                                    {
                                        globalStorage.set("userID",uid);
                                        globalStorage.set("locale",'cn');
                                        router.push('/');
                                    }


                                  });

                                // console.log("fhojt:");
                                // var ojt=eval('(' + fhojt + ')');
                                // console.log(JSON.stringify(ojt));
                                // const uid=JSON.parse(fhojt["fhok"])[0];
                                // console.log(uid);

                                // var ojt=eval('(' + data + ')');


                                //const uid2=JSON.parse(uid);
                                //console.log(uid2);
                               // console.log(uid2[0]);
                                // console.log(uid);
                                // if(!_.isNil(uid))
                                // {
                                //     globalStorage.set("userID",uid);
                                //     globalStorage.set("locale",'cn');
                                //     router.push('/');
                                // }
                              
                                // globalStorage.set("userID",1);
                                // globalStorage.set("locale",'cn');
                                // router.push('/');


                            } }></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
