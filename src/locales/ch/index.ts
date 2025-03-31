import { user } from '../ch/user';
import { fullCalendar } from '../ch/fullCalendar';
import { chart } from '../ch/chart';
import { Home } from '../ch/Home';
import { Menu } from '../ch/Menu';
import { account } from '../ch/account';
import { Dashboard } from '../ch/Dashboard';
import { dataTable } from './dataTable';
import { AccountTag } from './AccountTag';
import { Quotation } from './Quotation';


import { Country } from './country';
import { Currency } from './currency';
import { Customization } from './customization';
import { ExchangeRate } from './exchangeRate';
import { Fhrole } from './fhrole';
import { Fhuser } from './fhuser';
import { Industry } from './industry';
import { Languages } from './languages';
import { MonthlyGoal } from './monthlyGoal';
import { PaymentTerm } from './paymentTerm';
import { Skill } from './skill';
import { Stage } from './stage';
import { Taxes } from './taxes';
import { TermCondition } from './termCondition';
import { Terms } from './terms';
import { translate } from './translate';
import { Unit } from './unit';
import { Parameter } from './parameter';
import { FHcrmTable1 } from './FHcrmTable1';
import { Campaign } from './Campaign';
import { ProductType } from './ProductType';
import { Product } from './Product';
import { Opportunity } from './Opportunity';
import { OpportunityComments } from './OpportunityComments';
import { Role } from './Role';

import { Activity } from './Activity';
import { Client } from './Client';
import { ContacPerson } from './ContacPerson';
import { DeliveryItem } from './DeliveryItem';
import { DeliveryOrder } from './DeliveryOrder';
import { Feedback } from './Feedback';
import { InvoiceDetails } from './InvoiceDetails';
import { InvoiceItem } from './InvoiceItem';
import { InvoicePayment } from './InvoicePayment';
import { Job } from './Job';
import { JobItem } from './JobItem';
import { LeadPools } from './LeadPools';
import { Leads } from './Leads';
import { PurchaseItem } from './PurchaseItem';
import { PurchaseOrder } from './PurchaseOrder';
import { QuotationComments } from './QuotationComments';
import { QuotationItem } from './QuotationItem';
import { ServiceContract } from './ServiceContract';
import { Template } from './Template';
import { Ticket } from './Ticket';
import { Warranty } from './Warranty';
import { Work } from './Work';
import { WorkItem } from './WorkItem';
import {WorkNote } from './WorkNote';
import {Attence} from './Attence';
import {StaffList } from './StaffList';
import {Note} from './Note';

import {FhtestFht1} from './FhtestFht1';
import {FhtestFht1fhf7} from './FhtestFht1fhf7';

import {AccountingVoucher} from './AccountingVoucher';
import {AccountingVoucherList} from './AccountingVoucherList';
import {BankCash} from './BankCash';
import {Batch} from './Batch';
import {Inventory} from './Inventory';
import {InventoryList} from './InventoryList';
import {mybom} from './mybom';
import {myBomProduct} from './myBomProduct';
import {myWork} from './myWork';
import {myWorkCenter} from './myWorkCenter';
import {Storagelocation} from './Storagelocation';
import {StoreMove} from './StoreMove';
import {StoreMoveList} from './StoreMoveList';
import {Warehouse} from './Warehouse';

import {StockQuant} from './StockQuant';
import {StockValuationLayer} from './StockValuationLayer';
import {StockWarehouseOrderpoint} from './StockWarehouseOrderpoint';



import {Fhfault} from './Fhfault';
import {Fhinspection} from './Fhinspection';
import {Fhmeasuring} from './Fhmeasuring';
import {Fhreform } from './Fhreform';
import {Fhrunning} from './Fhrunning';
import {FhservicePlan} from './FhservicePlan';
import {Fhservicetb} from './Fhservicetb';
// import {StockQuant} from './Fhtest';
// import {StockQuant} from './FhtestFht1';
import {HrContract} from './HrContract';
import {ProcurePlan} from './ProcurePlan';
import {ProcurePlanList} from './ProcurePlanList';
import {ProcurePrice} from './ProcurePrice';
import {QualityInspection} from './QualityInspection';
import {QualitylnspectionItem} from './QualitylnspectionItem';
import {Returnorder} from './Returnorder';
import {SaleContract} from './SaleContract';
import {SellingPrice} from './SellingPrice';
import {SellingPriceList} from './SellingPriceList';
// import {StockQuant} from './StoreMoveList';
import {Tbaftersale } from './Tbaftersale';
import {MyTbmatching} from './MyTbmatching';
import {MyTbmatchingline } from './MyTbmatchingline';
import {Tbpackag} from './Tbpackag';
import {Tbreturnvisit} from './Tbreturnvisit';

//FHcrmTable1.ts
export const fhcn = {
    stockQuant:StockQuant,
    stockValuationLayer:StockValuationLayer,
    stockWarehouseOrderpoint:StockWarehouseOrderpoint,
    accountingVoucher:AccountingVoucher,
    accountingVoucherList:AccountingVoucherList,
    bankCash:BankCash,
    batch:Batch,
    inventory:Inventory,
    inventoryList:InventoryList,
    mybom:mybom,
    mybomProduct:myBomProduct,
    mywork:myWork,
    myworkCenter:myWorkCenter,
    storagelocation:Storagelocation,
    storeMove:StoreMove,
    storeMoveList:StoreMoveList,
    warehouse:Warehouse,
    user:user,
    fullCalendar:fullCalendar,
    chart:chart,
    Home:Home,
    Menu:Menu,
    account:account,
    Dashboard:Dashboard,
    dataTable:dataTable,
    AccountTag:AccountTag,
    quotation:Quotation,
    translate:translate,
    country:Country,
    currency:Currency,
    customization: Customization,
    exchangeRate:ExchangeRate,
    fhrole: Fhrole,
    fhuser: Fhuser,
    industry:Industry,
    languages:Languages,
    monthlyGoal:MonthlyGoal,
    paymentTerm:PaymentTerm,
    parameter:Parameter,
    skill:Skill,
    stage:Stage,
    taxes:Taxes,
    termCondition:TermCondition,
    terms:Terms,
    unit: Unit,
    fhcrmTable1:FHcrmTable1,
    campaign:Campaign,
    producttype:ProductType,
    product:Product,
    opportunityComments:OpportunityComments,
    opportunity:Opportunity,
    role:Role,
    activity:Activity,
    client:Client,
    contacPerson:ContacPerson,
    deliveryItem:DeliveryItem,
    deliveryOrder:DeliveryOrder,
    feedback:Feedback,
    invoiceDetails:InvoiceDetails,
    invoiceItem:InvoiceItem,
    invoicePayment:InvoicePayment,
    job:Job,
    jobItem:JobItem,
    leadPools:LeadPools,
    leads:Leads,
    purchaseItem:PurchaseItem,
    purchaseOrder:PurchaseOrder,
    quotationComments:QuotationComments,
    quotationItem:QuotationItem,
    serviceContract:ServiceContract,
    template:Template,
    ticket:Ticket,
    warranty:Warranty,
    work:Work,
    workItem:WorkItem,
    workNote:WorkNote,
    attence:Attence,
    staffList:StaffList,
    note:Note,
    fhtestFht1:FhtestFht1,
    fhtestFht1fhf7:FhtestFht1fhf7,

    fhfault:Fhfault,
    fhinspection:Fhinspection,
    fhmeasuring:Fhmeasuring,
    fhreform:Fhreform ,
    fhrunning:Fhrunning,
    fhservicePlan:FhservicePlan,
    fhservicetb:Fhservicetb,
    hrContract:HrContract,
    procurePlan:ProcurePlan,
    procurePlanList:ProcurePlanList,
    procurePrice:ProcurePrice,
    qualityInspection:QualityInspection,
    qualitylnspectionItem:QualitylnspectionItem,
    returnorder:Returnorder,
    saleContract:SaleContract,
    sellingPrice:SellingPrice,
    sellingPriceList:SellingPriceList,
    tbaftersale:Tbaftersale,
    mytbmatching:MyTbmatching,
    mytbmatchingline:MyTbmatchingline,
    tbpackag:Tbpackag,
    tbreturnvisit:Tbreturnvisit,
}




