/* eslint-disable @next/next/no-img-element */
import '../src/i18n';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next'
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '../types/types';

const AppMenu = () => {
    const { t, i18n } = useTranslation();

    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: '仪表盘', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {




            label: 'ERP',
            items: [

                {

                    label: '经典例子',
                    icon: 'pi pi-fw pi-qrcode',
                    items: [
                    {
                      label: '采购查询1',
                      icon: 'pi pi-fw pi-qrcode',
                      to:'/myfhtestfht2',
                      },
                    {
                    label: '采购查询2',
                    icon: 'pi pi-fw pi-qrcode',
                    to:'/fhtestfht2',
                    }, 
     
                    {
                      label: '图表分析',
                      icon: 'pi pi-fw pi-qrcode',
                      to:'/uikit/charts',
                    }, 

                      {
                        label: 'myCookies',
                        icon: 'pi pi-fw pi-qrcode',
                        items:[
                          {
                            label: '报表设计器',
                            icon: 'pi pi-fw pi-qrcode',
                            to:'/mytest',
                          },  
                          {
                            label: '导出PDF',
                            icon: 'pi pi-fw pi-qrcode',
                            to:'/myjspdf2',
                          },                                        
                          {
                            label: '导出PDF套打',
                            icon: 'pi pi-fw pi-qrcode',
                            to:'/myjspdf',
                          }, 
                          {
                            label: '导出docx',
                            icon: 'pi pi-fw pi-qrcode',
                            to:'/mydoc',
                          }, 
                          {
                            label: '导出EXCLE',
                            icon: 'pi pi-fw pi-qrcode',
                            to:'/myexcle',
                          },
                          {
                            label: '上传图片',
                            icon: 'pi pi-fw pi-qrcode',
                            to:'/uploadmany',
                          },
  
                          
                        ]
                      },                    
                       {
                      label: 'dataTable例子',
                      icon: 'pi pi-fw pi-qrcode',
                      items: [  
                       
                        {
                          label: 'dataTable行内编辑',
                          icon: 'pi pi-fw pi-qrcode',
                          to:'/dataTableEdit',
                        }, 
                        // {
                        //   label: 'dataTable行内编辑2',
                        //   icon: 'pi pi-fw pi-qrcode',
                        //   to:'/cellEditingDemo',
                        // },    
                        // {
                        //   label: 'dataTable行拖动1',
                        //   icon: 'pi pi-fw pi-qrcode',
                        //   to:'/dataTableReorder',
                        // }, 
                        {
                          label: 'dataTable行拖动',
                          icon: 'pi pi-fw pi-qrcode',
                          to:'/reorderDemo',
                        },       
                        
                        {
                          label: 'dataTable头部筛选',
                          icon: 'pi pi-fw pi-qrcode',
                          to:'/dataTableState',
                        }, 
                        {
                          label: 'VerticalScroll头部固定',
                          icon: 'pi pi-fw pi-qrcode',
                          to:'/verticalScrollDemo',
                        },  
                        {
                          label: '弹出窗体-头部固定',
                          icon: 'pi pi-fw pi-qrcode',
                          to:'/flexibleScrollDemo',
                        },                                      
                        {
                          label: 'columnGroup复杂表头',
                          icon: 'pi pi-fw pi-qrcode',
                          to:'/columnGroupDemo',
                        },
                        ] 
                      }, 
                    //   {
                    //   label: 'ODOO16',
                    //   icon: 'pi pi-fw pi-qrcode',
                    //   to:'#',
                    // },   
                    // {
                    //   label: 'NEXT带子表',
                    //   icon: 'pi pi-fw pi-qrcode',
                    //   to:'/opportunity',
                    // },    
                    
                    // {
                    //   label: 'ODOO16带子表2',
                    //   icon: 'pi pi-fw pi-qrcode',
                    //   to:'/quotation',
                    // },                    
                    {
                        label: 'UI Components',
                        items: [
                            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
                            { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
                            { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
                            { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', to: '/uikit/invalidstate' },
                            { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button', class: 'rotated-icon' },
                            { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
                            { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
                            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
                            { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
                            { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
                            { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
                            { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu', preventExact: true },
                            { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
                            { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
                            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' },
                            { label: 'Misc', icon: 'pi pi-fw pi-circle', to: '/uikit/misc' }
                        ]
                    },
                    {
                        label: 'Prime Blocks',
                        items: [
                            { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
                            { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: 'https://blocks.primereact.org', target: '_blank' }
                        ]
                    },
                    {
                        label: 'Utilities',
                        items: [
                            { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/utilities/icons' },
                            { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: 'https://primeflex.org/', target: '_blank' }
                        ]
                    },
                    {
                        label: 'Pages',
                        icon: 'pi pi-fw pi-briefcase',
                        to: '/pages',
                        items: [
                            {
                                label: 'Landing',
                                icon: 'pi pi-fw pi-globe',
                                to: '/landing'
                            },
                            {
                                label: 'Auth',
                                icon: 'pi pi-fw pi-user',
                                items: [
                                    {
                                        label: 'Login',
                                        icon: 'pi pi-fw pi-sign-in',
                                        to: '/auth/login'
                                    },
                                    {
                                        label: 'Error',
                                        icon: 'pi pi-fw pi-times-circle',
                                        to: '/auth/error'
                                    },
                                    {
                                        label: 'Access Denied',
                                        icon: 'pi pi-fw pi-lock',
                                        to: '/auth/access'
                                    }
                                ]
                            },
                            {
                                label: 'Crud',
                                icon: 'pi pi-fw pi-pencil',
                                to: '/pages/crud'
                            },
                            {
                                label: 'Timeline',
                                icon: 'pi pi-fw pi-calendar',
                                to: '/pages/timeline'
                            },
                            {
                                label: 'Not Found',
                                icon: 'pi pi-fw pi-exclamation-circle',
                                to: '/pages/notfound'
                            },
                            {
                                label: 'Empty',
                                icon: 'pi pi-fw pi-circle-off',
                                to: '/pages/empty'
                            }
                        ]
                    },
                    {
                        label: 'Hierarchy',
                        items: [
                            {
                                label: 'Submenu 1',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 1.1',
                                        icon: 'pi pi-fw pi-bookmark',
                                        items: [
                                            { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                            { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                            { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
                                        ]
                                    },
                                    {
                                        label: 'Submenu 1.2',
                                        icon: 'pi pi-fw pi-bookmark',
                                        items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
                                    }
                                ]
                            },
                            {
                                label: 'Submenu 2',
                                icon: 'pi pi-fw pi-bookmark',
                                items: [
                                    {
                                        label: 'Submenu 2.1',
                                        icon: 'pi pi-fw pi-bookmark',
                                        items: [
                                            { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                            { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                                        ]
                                    },
                                    {
                                        label: 'Submenu 2.2',
                                        icon: 'pi pi-fw pi-bookmark',
                                        items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Get Started',
                        items: [
                            {
                                label: '技术文档',
                                icon: 'pi pi-fw pi-question',
                                to: '/documentation'
                            },
                            {
                                label: '项目源码',
                                icon: 'pi pi-fw pi-search',
                                url: 'https://github.com/primefaces/sakai-react',
                                target: '_blank'
                            }
                        ]
                    }
                      
                    ]
                  },

                { 
                label: t('Menu.Opportunity'), 
                icon: 'pi pi-fw pi-qrcode', 
                to:'/opportunity' 
      
               },

                {
                  label: t('Menu.Leads'),
                  icon: 'pi pi-fw pi-qrcode',
                  items: [
                   
                    {
                      label: t('Menu.Campaingn'),
                      icon: 'pi pi-fw pi-qrcode',
                      to:'/campaign',
                    },
                  
                    {
                      label: t('Menu.LeadPools'),
                      icon: 'pi pi-fw pi-qrcode',
                      to:'/leadpools',
                    },
                    {
                      label: t('Menu.Leads'),
                      icon: 'pi pi-fw pi-qrcode',
                      to:'/leads',
                    },
                  ],
                },
                {
                  label: t('Menu.ClientManagement'),
                  icon: 'pi pi-fw pi-qrcode',
                  items: [
                    { label: t('Menu.Client'), icon: 'pi pi-fw pi-qrcode', to:'/client' },
                    { label: t('Menu.ContacPerson'), icon: 'pi pi-fw pi-qrcode', to:'/contacperson' },
                  ],
                },
                {
                  label: t('Menu.Activity'),
                  icon: 'pi pi-fw pi-qrcode',
                  items: [
                    { label: t('Menu.FHActivity'), icon: 'pi pi-fw pi-qrcode', to:'/activity' },
                    {
                      label: t('Menu.SaleCalendar'),
                      icon: 'pi pi-fw pi-qrcode',
                      to:'/pages/fullcalendar',
        
                    },
                    //2023-11-04 注销任务菜单
                    {
                      label: t('Menu.Task'),
                      icon: 'pi pi-fw pi-qrcode',
                      to:'/task',
                    },
                    { 
                    label: t('Menu.Note'), 
                    icon: 'pi pi-fw pi-qrcode', 
                    to:'/note'
                   },
                  ],
                },
          


               { label: t('Menu.Sale'), icon: 'pi pi-fw pi-qrcode', 
                items: [
                  { label: t('Menu.Quotation'), icon: 'pi pi-fw pi-qrcode',  to:'/quotation'},
                  //ERP
                  // { label: t('Menu.SalePrice'), icon: 'pi pi-fw pi-qrcode', to:'/sellingprice' },
                  { label: t('Menu.InvoiceDetails'), icon: 'pi pi-fw pi-qrcode', to:'/invoicedetails' },
                  //ERP                 
                  // { label: t('Menu.SalesContract'), icon: 'pi pi-fw pi-qrcode', to:'/salecontract' },

                  // //V6.1暂时隐藏
                  // { label: t('Menu.SalesContract'), icon: 'pi pi-fw pi-qrcode', to:'/salecontract' },
                  //  //V6.1暂时隐藏 销售价格
                  // { label: t('Menu.SalePrice'), icon: 'pi pi-fw pi-qrcode', to:'/sellingprice' },

                ]
               },

                  { label: t('Menu.Purchase'), icon: 'pi pi-fw pi-qrcode', 
                  items: [
                      { label: t('Menu.PurchaseOrder'), icon: 'pi pi-fw pi-qrcode', to:'/purchaseorder' },
                      //  //V6.1暂时隐藏
                      //  //ERP
                      // { label: t('Menu.SupplierBids'), icon: 'pi pi-fw pi-qrcode', to:'#' },
                      // {
                      //   label: t('Menu.purchaseRequisition'),
                      //   icon: 'pi pi-fw pi-qrcode',
                      //   to:'/procureplan',

                      // },   
                      // //ERP
                      // { label: t('Menu.SupplierContract'), icon: 'pi pi-fw pi-qrcode', to:'/salecontract2' },
                      // //V6.1暂时隐藏 采购价格
                      // //ERP
                      // { label: t('Menu.PurchasePrice'), icon: 'pi pi-fw pi-qrcode', to:'/procureprice' },


                  ] },

                  { label: t('Menu.DeliveryOrder'), icon: 'pi pi-fw pi-qrcode', to:'/deliveryorder' },                 
                  {
                  label: t('Menu.Work'),
                  icon: 'pi pi-fw pi-qrcode',
                  items: [
                      {
                        label: t('Menu.cheduleCalendar'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/pages/fullcalendar2',
                      },
                      {
                        label: t('Menu.WorkOrder'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/work',
                      },
                      

                    //ERP
                      {
                        label: t('Menu.Job'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/job',
                      }, 
                    //   //暂时隐藏
                    //  //ERP                     
                    //   {
                    //     label: t('Menu.myworkcenter'),
                    //     icon: 'pi pi-fw pi-qrcode',
                    //     to:'/myworkcenter',
                    //   },                    
                    //   // {
                    //   //   label: t('Menu.mywork'),
                    //   //   icon: 'pi pi-fw pi-qrcode',
                    //   //   to:'/mywork',
                    //   // },
                      
                    //  //ERP                     
                    //   {
                    //     label: t('生产成本'),
                    //     icon: 'pi pi-fw pi-qrcode',
                    //     to:'#',
                    //   }, 
                    //  //ERP                                                               
                    //   {
                    //     label: t('Menu.Bom'),
                    //     icon: 'pi pi-fw pi-qrcode',
                    //     to:'/mybom',
                    //   }                  
                    
                  ],
                },
                //V6.1暂时隐藏 
                //ERP               
                // {
                //   label: t('Menu.Device'),
                //   icon: 'pi pi-fw pi-qrcode',
                //   items: [
                //     {
                //       label: t('设备基础信息'),
                //       icon: 'pi pi-fw pi-qrcode',
                //       to:'/fhtestfht1',
                //     },                                     
                //       {
                //         label: t('设备故障管理'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/fhfault',
                //       },

                //       {
                //         label: t('计量器具调校记录'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/fhmeasuring',
                //       },
                //       {
                //         label: t('设备改造及技改'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/fhreform',
                //       },
                //       {
                //         label: t('设备检定记录'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'#',
                //       }, 
                //       {
                //         label: t('设备检修计划'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/fhserviceplan',
                //       },                                        
                //       {
                //         label: t('设备巡检记录'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/fhinspection',
                //       },                    

                //       {
                //         label: t('设备运行管理'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/fhrunning',
                //       }, 
                                                         
                //   ]
                // },
                //ERP
                // {
                //   label: t('Menu.wms'),
                //   icon: 'pi pi-fw pi-qrcode',
                //   items: [
                //       {
                //         label: t('Menu.wmsin'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/storeMove',
                //       },
            
                //       {
                //         label: t('Menu.wmsto'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/storeMove2',
                //       },
                  
                //       {
                //         label: t('Menu.wmstotal'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/inventory',
                //       },
                      

                //       {
                //         label: t('Menu.wmsshownum'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/stockValuationLayer',
                //       },
                      
                //       {
                //         label: t('Menu.inventoryDetails'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/stormovelist',
                //       },

                //       {
                //         label: t('Menu.inventorySafety'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/stockWarehouseOrderpoint',
                //       },   
                //       {
                //         label: t('Menu.batchnumber'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/batch',
                //       },                                    

                //       {
                //         label: t('Menu.warehouse'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/warehouse',
                //       },
                //       {
                //         label: t('Menu.Storagelocation'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/storagelocation',
                //       },                                      
                //   ],
                // },
                //ERP
                // {
                //   label: t('样品管理'),
                //   icon: 'pi pi-fw pi-qrcode',
                //   items: [
                //      //V6.1暂时隐藏
                //       {
                //         label: t('样品登记'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/mytbmatching',
                //       },                   
                //       {
                //         label: t('样品项目'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/mytbmatchingline',
                //       },             
                //   ]
                //   },

                //ERP
                // {
                //   label: t('Menu.QualityInspection'),
                //   icon: 'pi pi-fw pi-qrcode',
                //   items: [
                //      //V6.1暂时隐藏
                //       {
                //         label: t('Menu.TestApplication'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'#',
                //       },                   
                //       {
                //         label: t('Menu.QualityOrder'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/qualityinspection',
                //       },
            
                //       {
                //         label: t('Menu.QualityItems'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/qualitylnspectionitem',
                //       }, 
                //        //V6.1暂时隐藏
                //       {
                //         label: t('Menu.QualityDevice'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'#',
                //       },                    
                //   ]
                //   },
                //ERP
                // {
                //   label: t('Menu.finance'),
                //   icon: 'pi pi-fw pi-qrcode',
                //   items: [
                //       {
                //         label: t('Menu.customerPayable'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/accountingVoucher',
                //       },
            
                //       {
                //         label: t('Menu.supplierReceivable'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/accountingVoucher2',
                //       },
                //       {
                //         label: t('Menu.accountingvoucher'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/accountingVoucher3',
                //       },
                //       {
                //         label: t('Menu.bankcash'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'/bankCash',
                //       },
                //       //V6.1暂时隐藏                     
                //       {
                //         label: t('Menu.balanceSheet'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'#',
                //       },  
  
                //       {
                //         label: t('Menu.incomeStatement'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'#',
                //       },  
                //       {
                //         label: t('Menu.cashFlowStatement'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'#',
                //       },  
                //       {
                //         label: t('Menu.ownerEquity'),
                //         icon: 'pi pi-fw pi-qrcode',
                //         to:'#',
                //       },                                         
                    
                    
                //   ],
                // },

                {
                  label: t('Menu.StaffManagement'),
                  icon: 'pi pi-fw pi-qrcode',
                  items: [
                      {
                        label: t('Menu.StaffList'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/stafflist',
                      },
                      //ERP
                      // {
                      //   label: t('人事合同'),
                      //   icon: 'pi pi-fw pi-qrcode',
                      //   to:'/hrcontract',
                      // },            
                      {
                        label: t('Menu.Attendance'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/attence',
                      },
                      // //ERP
                      // {
                      //   label: t('费用报销'),
                      //   icon: 'pi pi-fw pi-qrcode',
                      //   to:'#',
                      // }, 
                      //  //ERP    
                      // {
                      //   label: t('人员工资'),
                      //   icon: 'pi pi-fw pi-qrcode',
                      //   to:'#',
                      // },                                     
                  ],
                },


                { label: t('Menu.ServiceContract'), icon: 'pi pi-fw pi-qrcode', to:'/servicecontract' },
                { label: t('Menu.Feedback'), icon: 'pi pi-fw pi-qrcode', to:'/feedback' },
                { label: t('Menu.Warranty'), icon: 'pi pi-fw pi-qrcode', to:'/warranty' },       
                {
                  label: t('Menu.Product'),
                  icon: 'pi pi-fw pi-qrcode',
                  items: [
                      {
                        label: t('Menu.Product'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/product',
                      },
                      // //V6.1暂时隐藏 
                      //ERP       
                      // {
                      //   label: t('Menu.ProductResearchDevelopment'),
                      //   icon: 'pi pi-fw pi-qrcode',
                      //   to:'#',
                      // },
                      {
                        label: t('Menu.ProductType'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/productType',
                      },                   
                  ],
                },
      
                {
                  label: t('Menu.Report'),
                  icon: 'pi pi-fw pi-qrcode',
                  items: [
                    {
                      label: t('Menu.Transactions'),
                      icon: 'pi pi-fw pi-qrcode',
                      to:'/chart',
                    },
          
                    {
                      label: t('Menu.QuotesBySales'),
                      icon: 'pi pi-fw pi-qrcode',
                      to:'/pieChart',
                  
                    },
                    {
                      label: t('Menu.QuotesByClients'),
                      icon: 'pi pi-fw pi-qrcode',
                      to:'/barChart',
                      
                    },
                    //ERP
                    // {
                    //   label: t('Menu.DailySalesReport'),
                    //   icon: 'pi pi-fw pi-qrcode',
                    //   to:'#',
                    // },
                    {
                      label: t('Menu.OpportunitesBySales'),
                      icon: 'pi pi-fw pi-qrcode',
                      to:'/radarChart',
                      
                    },
                    {
                      label:t('Menu.OpportunitesByClients'),
                      icon: 'pi pi-fw pi-qrcode',
                      to:'/comboChart',
                      
                    }
                    ,
                    {
                      label: t('Menu.OpportunitesByCounts'),
                      icon: 'pi pi-fw pi-qrcode',
                      to:'/uikit/charts',
                    },
                    // //ERP
                    // {
                    //   label: t('Menu.DailyActivties'),
                    //   icon: 'pi pi-fw pi-qrcode',
                    //   to:'#',
                    // },
                    // //ERP
                    // {
                    //   label: t('Menu.ActivtiesBySales'),
                    //   icon: 'pi pi-fw pi-qrcode',
                    //   to:'#',
                    // },
                    // //ERP
                    // {
                    //   label:t('Menu.NewAccounts'),
                    //   icon: 'pi pi-fw pi-qrcode',
                    //   to:'#',
                    // },
                  ],
                },
        
                {
                  label: t('Menu.Bast'),
                  icon: 'pi pi-fw pi-qrcode',
                  items: [
                      {
                        label:  t('Menu.AccountTag'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/account',
                        
                      },
                      {
                        label: t('Menu.Parameter'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/parameter',
                        
                      },
              
                      {
                        label: t('Menu.Translate'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/translate',
                        
                      },
                      {
                        label: t('Menu.MonthlyGoal'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/monthlyGoal',
                        
                      },
              
                      {
                        label: t('Menu.Skill'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/skill',
                        
                      },
              
                      {
                        label: t('Menu.ExchangeRate'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/exchangeRate',
                        
                      },
              
                      {
                        label: t('Menu.Industry'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/industry',
                      
                      },
                      {
                        label:t('Menu.Country'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/country',
                        
                      },
                      {
                        label: t('Menu.Languages'),
                        icon: 'pi pi-fw pi-qrcode',
                        to: '/languages',
                        
                      },
                      {
                        label: t('Menu.Currency'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/currency',
                        
                      },
                      {
                        label: t('Menu.Taxes'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/taxes',
                        
                      },
                      {
                        label: t('Menu.Unit'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/unit',
                        
                      },
              
                      {
                        label: t('Menu.Terms'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/terms',
                        
                      },
                    
              
                      {
                        label: t('Menu.PaymentTerm'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/paymentTerm',
                        
                      },
                      {
                        label: t('Menu.TermCondition'),
                        icon: 'pi pi-fw pi-qrcode',
                        to:'/termCondition',
                        
                      },
                  ],
                },
              ],
        },

  
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}

                {/* <Link href="https://blocks.primereact.org" target="_blank" style={{ cursor: 'pointer' }}>
                    <img alt="Prime Blocks" className="w-full mt-3" src={`/layout/images/banner-primeblocks${layoutConfig.colorScheme === 'light' ? '' : '-dark'}.png`} />
                </Link> */}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
