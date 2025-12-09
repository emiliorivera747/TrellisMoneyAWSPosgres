export interface Member {
  user_id: string;
  head_of_household_id: string;
  name: string;
  url: string;
}

export interface StepProps {
  householdResponse: {
    data: {
      members: Member[];
    };
  };
  clickFn?: (id: string) => void;
}

export interface Step {
  title: string;
  description: string;
  content: React.ReactNode;
}
