import type {VehicleId} from '@/constants/vehicles';

// TODO: everything in this file is sample data. Load it from your API.

// ---------- Payout History ----------
export type PayoutStatus = 'processing' | 'paid' | 'failed';

export type Payout = {
  id: string;
  period: string; // "Oct 16 - Oct 22"
  amount: number;
  bank: string;
  last4: string;
  status: PayoutStatus;
};

export const PAYOUT_SUMMARY = {monthTotal: 2450, changePercent: 12};

export const PAYOUTS: Payout[] = [
  {id: 'p4', period: 'Oct 16 - Oct 22', amount: 845.5, bank: 'Chase Bank', last4: '4598', status: 'processing'},
  {id: 'p3', period: 'Oct 09 - Oct 15', amount: 720, bank: 'Chase Bank', last4: '4598', status: 'paid'},
  {id: 'p2', period: 'Oct 02 - Oct 08', amount: 884.5, bank: 'Chase Bank', last4: '4598', status: 'paid'},
  {id: 'p1', period: 'Sep 25 - Oct 01', amount: 650, bank: 'Wells Fargo', last4: '1122', status: 'failed'},
];

// ---------- Earnings Activity ----------
export type ActivityKind = 'trip' | 'incentive' | 'adjustment';

export type ActivityItem = {
  id: string;
  kind: ActivityKind;
  title?: string; // incentives / adjustments
  tripId?: string; // trips
  time: string;
  vehicle?: VehicleId; // trips
  amount: number;
};

export type ActivityGroup = {
  id: string;
  day: 'today' | 'yesterday';
  dateText?: string; // shown for "yesterday": "Oct 21"
  total: number;
  items: ActivityItem[];
};

export const WEEK_ACTIVITY = {period: 'Oct 16 - Oct 22', total: 482.5};

export const ACTIVITY: ActivityGroup[] = [
  {
    id: 'g1',
    day: 'today',
    total: 124,
    items: [
      {id: 'a1', kind: 'trip', tripId: '8492A', time: '2:15 PM', vehicle: 'cab', amount: 24.5},
      {id: 'a2', kind: 'trip', tripId: '8491B', time: '11:30 AM', vehicle: 'bike', amount: 12},
    ],
  },
  {
    id: 'g2',
    day: 'yesterday',
    dateText: 'Oct 21',
    total: 85.5,
    items: [
      {id: 'a3', kind: 'incentive', title: 'Peak Hour Incentive', time: '5:00 PM', amount: 15},
      {id: 'a4', kind: 'trip', tripId: '8480X', time: '4:45 PM', vehicle: 'cab', amount: 45.5},
    ],
  },
];

// ---------- Weekly Payout detail ----------
export const PAYOUT_DETAIL = {
  period: 'OCT 16 - OCT 22, 2023',
  amount: 842.5,
  bank: 'Chase Checking',
  last4: '4892',
  transferredAt: 'Oct 24, 2:15 AM',
  grossFares: 985,
  trips: 42,
  tips: 112.5,
  commissionPercent: 20,
  platformFee: 197,
  surgeBonus: 42,
  initiatedAt: 'Oct 23, 2023 - 4:00 AM',
  utr: 'CHX-99823-XYZ-11',
};