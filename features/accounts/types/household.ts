import { HouseholdMember } from "@/drizzle/schema";

/**
 * Represents a member of a household.
 * @export
 * @interface Member
 */
export interface Member extends HouseholdMember {
  /**
   * The URL associated with the member.
   * @type {string}
   * @memberof Member
   */
  url: string;
}

/**
 * Represents the properties for a step component.
 * @export
 * @interface StepProps
 */
export interface StepProps {
  /**
   * The list of members.
   * @type {Member[]}
   * @memberof StepProps
   */
  members: Member[];
  /**
   * The function to handle click events.
   * @type {(id: string) => void}
   * @memberof StepProps
   */
  clickFn?: (id: string) => void;
  /**
   * The function to handle route changes.
   * @type {(route: string) => void}
   * @memberof StepProps
   */
  handleSetRoute: (route: string) => void;
}

/**
 * Represents the properties for a member card component.
 * @export
 * @interface MemberCardProp
 */
export interface MemberCardProp {
  /**
   * The list of members.
   * @type {Member[]}
   * @memberof MemberCardProp
   */
  members: Member[];
}

/**
 * Represents the properties for adding a member.
 * @export
 * @interface AddMemberProps
 */
export interface AddMemberProps {
  /**
   * The function to handle route changes.
   * @type {(route: string) => void}
   * @memberof AddMemberProps
   */
  handleSetRoute: (route: string) => void;
}

/**
 * Represents a step in a multi-step process.
 * @export
 * @interface Step
 */
export interface Step {
  /**
   * The title of the step.
   * @type {string}
   * @memberof Step
   */
  title: string;
  /**
   * The description of the step.
   * @type {string}
   * @memberof Step
   */
  description: string;
  /**
   * The content to be rendered in the step.
   * @type {React.ReactNode}
   * @memberof Step
   */
  content: React.ReactNode;
  /**
   * The route associated with the step.
   * @type {string}
   * @memberof Step
   */
  route?: string;
}
