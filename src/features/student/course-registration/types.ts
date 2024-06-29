export interface timingrow {
  name: string;
  timeTable: TimingTableT[];
}
export interface TimingTableT {
  Day: string;
  StartAt: string;
  EndAt: string;
  Type: string;
}
