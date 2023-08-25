import { AccountingStatus } from "@constants/app.constants";

export const MockAccountingStats = {
  message: "Success",
  status: 200,
  data: {
    activated: 4,
    billingPositions: 160,
    revenueInitialCost: 200,
    totalCards: 20,
    revenueActivations: 160
  },
  error: []
};

export const MockPerformanceOverview = {
  message: "Success",
  status: 200,
  data: [
    {
      day: 1,
      count: 0
    },
    {
      day: 2,
      count: 0
    },
    {
      day: 3,
      count: 0
    },
    {
      day: 4,
      count: 0
    },
    {
      day: 5,
      count: 0
    },
    {
      day: 6,
      count: 0
    },
    {
      day: 7,
      count: 0
    }
  ],
  error: []
};

export const MockTopPartnerDetail = {
  message: "Success",
  status: 200,
  data: [
    {
      companyName: "Calopad AG",
      totalRevenue: 200
    },
    {
      companyName: "Braincept AG",
      totalRevenue: 160
    }
  ],
  error: []
};

export const MockRedemptionList = {
  records: [
    {
      cardType: "one",
      shopStatus: "Done",
      trackingUrl: "https://shop.calopad.com/56691359929/orders/fccacf4c790e85a3ba38ca9034b8a4ab/" +
        "authenticate?key=dc89973fabd6d96a730dd702a32a477b",
      affiliatePartner: "Braincept AG",
      cardCode: "7eIPhzfQA",
      billingPositions: 30,
      shopOrderNumber: "#1880",
      date: "2023-03-29T08:54:24.949Z",
      action: [],
    },
    {
      cardType: "one",
      shopStatus: "Done",
      trackingUrl: "https://shop.calopad.com/56691359929/orders/49209ade3c6e1c4bea443b427ef1f368/authenticate?" +
        "key=01abf601a274971040e0bb81f03c9a13",
      affiliatePartner: "Braincept AG",
      cardCode: "7ZBfGeKfe",
      billingPositions: 30,
      shopOrderNumber: "#1877",
      date: "2023-03-24T13:09:39.683Z",
      action: [],
    },
    {
      cardType: "one",
      shopStatus: "Done",
      trackingUrl: "https://shop.calopad.com/56691359929/orders/58fbdbed96b9f79c670b315e7ec79850/authenticate?" +
        "key=d50e60be72e3d4180d055f7d0df08a94",
      affiliatePartner: "Calopad AG",
      cardCode: "6knpPVGoX",
      billingPositions: 50,
      shopOrderNumber: "#1876",
      date: "2023-03-24T12:54:08.552Z",
      action: [],
    }
  ],
  totalCount: 3
};

export const MockOpenInvoiceList = {
  totalCount: 8,
  records: [
    {
      type: "redeem",
      status: AccountingStatus.open,
      billable: 0,
      uuid: "649f6c801b8ebf88a2f6fcaa",
      accountingDate: "2023-07-01T00:00:00.109Z",
      affiliatePartner: "Calopad AG"
    },
    {
      type: "redeem",
      status: AccountingStatus.open,
      billable: 0,
      uuid: "649f6c801b8ebf88a2f6fca8",
      accountingDate: "2023-07-01T00:00:00.104Z",
      affiliatePartner: "Braincept AG"
    },
    {
      type: "redeem",
      status: AccountingStatus.open,
      billable: 0,
      uuid: "6477df803fbd270555b916a2",
      accountingDate: "2023-06-01T00:00:00.363Z",
      affiliatePartner: "Braincept AG"
    },
    {
      type: "redeem",
      status: AccountingStatus.open,
      billable: 50,
      uuid: "6477df803fbd270555b916a0",
      accountingDate: "2023-06-01T00:00:00.301Z",
      affiliatePartner: "Calopad AG"
    },
    {
      type: "redeem",
      status: AccountingStatus.open,
      billable: 0,
      uuid: "644f01013fbd270555b9158b",
      accountingDate: "2023-05-01T00:00:01.251Z",
      affiliatePartner: "Braincept AG"
    },
    {
      type: "redeem",
      status: AccountingStatus.open,
      billable: 0,
      uuid: "644f01003fbd270555b91589",
      accountingDate: "2023-05-01T00:00:00.776Z",
      affiliatePartner: "Calopad AG"
    },
    {
      type: "redeem",
      status: AccountingStatus.open,
      billable: 60,
      uuid: "642774003fbd270555b91433",
      accountingDate: "2023-04-01T00:00:00.102Z",
      affiliatePartner: "Braincept AG"
    },
    {
      type: "redeem",
      status: AccountingStatus.open,
      billable: 50,
      uuid: "642774003fbd270555b91431",
      accountingDate: "2023-04-01T00:00:00.093Z",
      affiliatePartner: "Calopad AG"
    }
  ]
};