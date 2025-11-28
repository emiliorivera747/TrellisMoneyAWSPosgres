export interface Member {
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
}

export interface Step {
  title: string;
  description: string;
  content: JSX.Element;
}
