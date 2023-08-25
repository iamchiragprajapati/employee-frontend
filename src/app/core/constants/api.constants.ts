import { environment } from "@environment/environment";

export const API_ROUTES = {
    loginApi: `${environment.hostName}/api/auth/login`,
    forgotPasswordApi: `${environment.hostName}/api/auth/forgotPassword`,
    setPasswordApi: `${environment.hostName}/api/auth/resetPassword`,
    partnerListApi: `${environment.hostName}/api/partner`,
    addPartnerApi: `${environment.hostName}/api/partner`,
    cardListApi: `${environment.hostName}/api/cards`,
    downloadExcelApi: `${environment.hostName}/api/cards/excel`,
    accountingStatsApi: `${environment.hostName}/api/cards/accountingStats`,
    buyingBillApi: `${environment.hostName}/api/accounts/buy`,
    redeemBillApi: `${environment.hostName}/api/accounts/redeem`,
    accountStatusChangeApi: `${environment.hostName}/api/accounts`,
    dashboardAccountingStatsApi: `${environment.hostName}/api/dashboard/accountingStats`,
    redemptionListApi: `${environment.hostName}/api/dashboard/shopifyOrders`,
    dashboardPerformanceOverviewApi: `${environment.hostName}/api/dashboard/performanceOverview`,
    dashboardTopPartnersApi: `${environment.hostName}/api/dashboard/topPartners`,
    exchangeRateApi: `${environment.hostName}/api/exchangerates`,
    openInvoiceListApi: `${environment.hostName}/api/dashboard/openBillList`
};