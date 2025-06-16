import { GQL_EmployeeStatus, GQL_EmploymentType } from '@/generated/graphql/index.js';
import { EmployeeEmploymentType, EmployeeStatus } from '../schema/index.js';

export function mapGQLEmploymentTypeToInternal(value: GQL_EmploymentType): EmployeeEmploymentType {
  switch (value) {
    case GQL_EmploymentType.CONTRACT:
      return EmployeeEmploymentType.CONTRACT;
    case GQL_EmploymentType.FULL_TIME:
      return EmployeeEmploymentType.FULL_TIME;
    case GQL_EmploymentType.INTERN:
      return EmployeeEmploymentType.INTERN;
    case GQL_EmploymentType.PART_TIME:
      return EmployeeEmploymentType.PART_TIME;
    default:
      throw new Error(`Unknown GQL_EmploymentType: ${value}`);
  }
}

export function mapGQLEmployeeStatusToInternal(value: GQL_EmployeeStatus): EmployeeStatus {
  switch (value) {
    case GQL_EmployeeStatus.ACTIVE:
      return EmployeeStatus.ACTIVE;
    case GQL_EmployeeStatus.ON_LEAVE:
      return EmployeeStatus.ON_LEAVE;
    case GQL_EmployeeStatus.TERMINATED:
      return EmployeeStatus.TERMINATED;
    default:
      throw new Error(`Unknown GQL_EmployeeStatus: ${value}`);
  }
}
