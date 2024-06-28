interface IDashboard {
    studentName: string;
    GPA: number;
    creditHours: number;
    TotalCreditHours: number;
    LeftCreditHours: number;
    Level: string;
    State: string;
    Specialization: string;
}
export const studentDashboard: IDashboard = {
    studentName: "Hazem Elshater",
    GPA: 3.8,
    creditHours: 18,
    TotalCreditHours: 128,
    LeftCreditHours: 18,
    Level: "4th Level",
    State: "Senior",
    Specialization: "Computer Science",
}

interface IPaymentInformation {
    paymentCode: string;
    paymentStatus: string;
    paymentDate: string;
}

export const PaymentInformationData: IPaymentInformation = {
    paymentCode: "GWxz1587",
    paymentStatus: "paid",
    paymentDate: "2024-04-14",
}