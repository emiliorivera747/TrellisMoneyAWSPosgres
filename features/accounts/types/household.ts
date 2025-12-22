export interface Member {
  user_id: string;
  head_of_household_id: string;
  name: string;
  url: string;
}

export interface StepProps {
  members: Member[];
  clickFn?: (id: string) => void;
  handleSetRoute: (route: string) => void;
}

export interface MemberCardProp {
  members: Member[];
  clickFn?: (id: string) => void;
  handleSetRoute: (route: string) => void;
}
export interface AddMemberProps {
  handleSetRoute: (route: string) => void;
}
export interface Step {
  title: string;
  description: string;
  content: React.ReactNode;
  route?: string;
}
