export interface LeaveModel {
    EmployeeId: string;
    PayWith: string;
    ExtendedLeave1: string;
    ExtendedLeave2: string;
    VacationType: string;
    VacationTypeEx2: string;
    VacationTypeEx1: string;
    TicketEntitlement: string;
    Ticketfor: string;
    StartDate: string;
    VacationDays: number;
    // AdultTicketBlance: number;
    // AdultTicketsUsed: number;
    // ChildTicketBalance: number;
    // InfantTicketsUsed: number;
    VisaFor: string;
    EndDate: string;
    DestinationCity: string;
    PaymentMethod: string;
    destinationType: string | null;
    visaEntitlement: string;
    visaDays: number;
    VisaUsed: number;
}