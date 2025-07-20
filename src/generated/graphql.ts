import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Assignment = {
  __typename?: 'Assignment';
  batch?: Maybe<Batch>;
  batchId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  dueDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  submissions?: Maybe<Array<AssignmentSubmission>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AssignmentFilterInput = {
  batchId?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  hasSubmissions?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isPastDue?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<AssignmentStatus>;
};

/** The status of assignment submission */
export enum AssignmentStatus {
  Graded = 'GRADED',
  Submitted = 'SUBMITTED'
}

export type AssignmentSubmission = {
  __typename?: 'AssignmentSubmission';
  assignment?: Maybe<Assignment>;
  assignmentId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  feedback?: Maybe<Scalars['String']['output']>;
  gradedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  score?: Maybe<Scalars['Int']['output']>;
  status: Scalars['String']['output'];
  student?: Maybe<User>;
  studentId: Scalars['String']['output'];
  submissionFiles?: Maybe<Scalars['String']['output']>;
  submittedAt: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AttendanceFilterInput = {
  batchId?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isPresent?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  studentId?: InputMaybe<Scalars['String']['input']>;
};

export type AttendanceRecord = {
  __typename?: 'AttendanceRecord';
  createdAt: Scalars['DateTime']['output'];
  enrollment?: Maybe<Enrollment>;
  enrollmentId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isPresent: Scalars['Boolean']['output'];
  session?: Maybe<AttendanceSession>;
  sessionId: Scalars['String']['output'];
  student?: Maybe<User>;
  studentId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AttendanceSession = {
  __typename?: 'AttendanceSession';
  attendanceRecords?: Maybe<Array<AttendanceRecord>>;
  batch?: Maybe<Batch>;
  batchId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  sessionDate: Scalars['DateTime']['output'];
  sessionTitle: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  token: Scalars['String']['output'];
  user: User;
};

export type Batch = {
  __typename?: 'Batch';
  attendanceSessions?: Maybe<Array<AttendanceSession>>;
  course?: Maybe<Course>;
  courseId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  enrollments?: Maybe<Array<Enrollment>>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type BatchFilterInput = {
  courseId?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  hasEnrollments?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type Chapter = {
  __typename?: 'Chapter';
  course?: Maybe<Course>;
  courseId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  modules?: Maybe<Array<Module>>;
  orderIndex: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Course = {
  __typename?: 'Course';
  chapters?: Maybe<Array<Chapter>>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  creator?: Maybe<User>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CourseFilterInput = {
  categoryId?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  hasActiveBatches?: InputMaybe<Scalars['Boolean']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAssignmentInput = {
  batchId: Scalars['String']['input'];
  description: Scalars['String']['input'];
  dueDate?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
};

export type CreateAttendanceSessionInput = {
  batchId: Scalars['String']['input'];
  sessionDate: Scalars['String']['input'];
  sessionTitle: Scalars['String']['input'];
};

export type CreateBatchInput = {
  courseId: Scalars['String']['input'];
  endDate?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  startDate: Scalars['String']['input'];
};

export type CreateChapterInput = {
  courseId: Scalars['String']['input'];
  orderIndex: Scalars['Float']['input'];
  title: Scalars['String']['input'];
};

export type CreateCourseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
};

export type CreateModuleInput = {
  chapterId: Scalars['String']['input'];
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileUrl?: InputMaybe<Scalars['String']['input']>;
  orderIndex: Scalars['Float']['input'];
  title: Scalars['String']['input'];
  type: ModuleType;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
  username: Scalars['String']['input'];
};

export type Enrollment = {
  __typename?: 'Enrollment';
  batch?: Maybe<Batch>;
  batchId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  enrollmentDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  status: Scalars['String']['output'];
  student?: Maybe<User>;
  studentId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EnrollmentFilterInput = {
  batchId?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EnrollmentStatus>;
  studentId?: InputMaybe<Scalars['String']['input']>;
};

/** The status of enrollment */
export enum EnrollmentStatus {
  Active = 'ACTIVE',
  Completed = 'COMPLETED'
}

export type GradeAssignmentInput = {
  feedback?: InputMaybe<Scalars['String']['input']>;
  score?: InputMaybe<Scalars['Int']['input']>;
  submissionId: Scalars['String']['input'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type MarkAttendanceInput = {
  isPresent: Scalars['Boolean']['input'];
  sessionId: Scalars['String']['input'];
  studentId: Scalars['String']['input'];
};

export type Module = {
  __typename?: 'Module';
  chapter?: Maybe<Chapter>;
  chapterId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  fileName?: Maybe<Scalars['String']['output']>;
  fileUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  orderIndex: Scalars['Float']['output'];
  studentProgress?: Maybe<Array<StudentProgress>>;
  title: Scalars['String']['output'];
  type: ModuleType;
  updatedAt: Scalars['DateTime']['output'];
};

export enum ModuleType {
  Document = 'DOCUMENT',
  Pdf = 'PDF',
  Video = 'VIDEO'
}

export type Mutation = {
  __typename?: 'Mutation';
  createAssignment: Assignment;
  createAttendanceSession: AttendanceSession;
  createBatch: Batch;
  createChapter: Chapter;
  createCourse: Course;
  createModule: Module;
  createOfflineCache: Scalars['String']['output'];
  createUser: User;
  deleteAttendanceSession: Scalars['Boolean']['output'];
  enrollStudent: Scalars['Boolean']['output'];
  generateSecureStreamUrl: Scalars['String']['output'];
  gradeAssignment: AssignmentSubmission;
  login: AuthResponse;
  logout: Scalars['Boolean']['output'];
  markAllNotificationsAsRead: Scalars['Boolean']['output'];
  markAttendance: Array<AttendanceRecord>;
  markNotificationAsRead: Scalars['Boolean']['output'];
  register: AuthResponse;
  removeAssignment: Assignment;
  removeBatch: Batch;
  removeChapter: Chapter;
  removeCourse: Course;
  removeModule: Module;
  removeUser: User;
  reorderChapters: Array<Chapter>;
  reorderModules: Array<Module>;
  submitAssignment: AssignmentSubmission;
  unenrollStudent: Scalars['Boolean']['output'];
  updateAssignment: Assignment;
  updateBatch: Batch;
  updateChapter: Chapter;
  updateCourse: Course;
  updateModule: Module;
  updateModuleProgress: StudentProgress;
  updateUser: User;
};


export type MutationCreateAssignmentArgs = {
  createAssignmentInput: CreateAssignmentInput;
};


export type MutationCreateAttendanceSessionArgs = {
  createSessionInput: CreateAttendanceSessionInput;
};


export type MutationCreateBatchArgs = {
  createBatchInput: CreateBatchInput;
};


export type MutationCreateChapterArgs = {
  createChapterInput: CreateChapterInput;
};


export type MutationCreateCourseArgs = {
  createCourseInput: CreateCourseInput;
};


export type MutationCreateModuleArgs = {
  createModuleInput: CreateModuleInput;
};


export type MutationCreateOfflineCacheArgs = {
  moduleId: Scalars['String']['input'];
  quality?: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDeleteAttendanceSessionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationEnrollStudentArgs = {
  batchId: Scalars['ID']['input'];
  studentId: Scalars['ID']['input'];
};


export type MutationGenerateSecureStreamUrlArgs = {
  moduleId: Scalars['String']['input'];
};


export type MutationGradeAssignmentArgs = {
  gradeAssignmentInput: GradeAssignmentInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationMarkAttendanceArgs = {
  markAttendanceInput: Array<MarkAttendanceInput>;
};


export type MutationMarkNotificationAsReadArgs = {
  notificationId: Scalars['ID']['input'];
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationRemoveAssignmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveBatchArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveChapterArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveCourseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveModuleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationReorderChaptersArgs = {
  chapterIds: Array<Scalars['ID']['input']>;
  courseId: Scalars['ID']['input'];
};


export type MutationReorderModulesArgs = {
  chapterId: Scalars['ID']['input'];
  moduleIds: Array<Scalars['ID']['input']>;
};


export type MutationSubmitAssignmentArgs = {
  submitAssignmentInput: SubmitAssignmentInput;
};


export type MutationUnenrollStudentArgs = {
  batchId: Scalars['ID']['input'];
  studentId: Scalars['ID']['input'];
};


export type MutationUpdateAssignmentArgs = {
  id: Scalars['ID']['input'];
  updateAssignmentInput: UpdateAssignmentInput;
};


export type MutationUpdateBatchArgs = {
  id: Scalars['ID']['input'];
  updateBatchInput: UpdateBatchInput;
};


export type MutationUpdateChapterArgs = {
  id: Scalars['ID']['input'];
  updateChapterInput: UpdateChapterInput;
};


export type MutationUpdateCourseArgs = {
  id: Scalars['ID']['input'];
  updateCourseInput: UpdateCourseInput;
};


export type MutationUpdateModuleArgs = {
  id: Scalars['ID']['input'];
  updateModuleInput: UpdateModuleInput;
};


export type MutationUpdateModuleProgressArgs = {
  updateProgressInput: UpdateProgressInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  updateUserInput: UpdateUserInput;
};

export type PaginatedAssignmentSubmissions = {
  __typename?: 'PaginatedAssignmentSubmissions';
  data: Array<AssignmentSubmission>;
  meta: PaginationMeta;
};

export type PaginatedAssignments = {
  __typename?: 'PaginatedAssignments';
  data: Array<Assignment>;
  meta: PaginationMeta;
};

export type PaginatedAttendanceSessions = {
  __typename?: 'PaginatedAttendanceSessions';
  data: Array<AttendanceSession>;
  meta: PaginationMeta;
};

export type PaginatedBatches = {
  __typename?: 'PaginatedBatches';
  data: Array<Batch>;
  meta: PaginationMeta;
};

export type PaginatedCourses = {
  __typename?: 'PaginatedCourses';
  data: Array<Course>;
  meta: PaginationMeta;
};

export type PaginatedEnrollments = {
  __typename?: 'PaginatedEnrollments';
  data: Array<Enrollment>;
  meta: PaginationMeta;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  data: Array<User>;
  meta: PaginationMeta;
};

export type PaginationInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type PaginationMeta = {
  __typename?: 'PaginationMeta';
  hasNext: Scalars['Boolean']['output'];
  hasPrev: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  assignment: Assignment;
  assignmentAnalytics: Scalars['String']['output'];
  assignmentStats: Scalars['String']['output'];
  assignmentSubmission?: Maybe<AssignmentSubmission>;
  assignmentSubmissions: Array<AssignmentSubmission>;
  assignments: PaginatedAssignments;
  attendanceAnalytics: Scalars['String']['output'];
  attendanceSession: AttendanceSession;
  attendanceSessions: PaginatedAttendanceSessions;
  attendanceStats: Scalars['String']['output'];
  batch: Batch;
  batchAssignments: PaginatedAssignments;
  batchAttendance: Array<AttendanceRecord>;
  batchAttendanceSessions: Array<AttendanceSession>;
  batchEnrollments: Array<Enrollment>;
  batchStats: Scalars['String']['output'];
  batches: PaginatedBatches;
  chapter: Chapter;
  chapters: Array<Chapter>;
  checkEnrollmentAccess: Scalars['Boolean']['output'];
  course: Course;
  courseAnalytics: Scalars['String']['output'];
  courseBatches: Array<Batch>;
  courseProgress: Scalars['String']['output'];
  courses: PaginatedCourses;
  enrollment: Enrollment;
  enrollmentProgress: Scalars['String']['output'];
  enrollments: PaginatedEnrollments;
  hasValidOfflineCache: Scalars['Boolean']['output'];
  me: User;
  module: Module;
  moduleProgress?: Maybe<StudentProgress>;
  modules: Array<Module>;
  myAnalytics: Scalars['String']['output'];
  myAssignments: PaginatedAssignments;
  myAttendance: Array<AttendanceRecord>;
  myCourses: PaginatedCourses;
  myEnrollments: Array<Enrollment>;
  notifications: Scalars['String']['output'];
  pendingGrading: PaginatedAssignmentSubmissions;
  progressAnalytics: Scalars['String']['output'];
  recentActivity: Scalars['String']['output'];
  studentAnalytics: Scalars['String']['output'];
  studentAttendance: Array<AttendanceRecord>;
  studentAttendanceStats: Scalars['String']['output'];
  studentEnrollments: Array<Enrollment>;
  students: Array<User>;
  systemOverview: Scalars['String']['output'];
  unreadNotificationCount: Scalars['Int']['output'];
  user: User;
  userStats: Scalars['String']['output'];
  users: PaginatedUsers;
};


export type QueryAssignmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAssignmentAnalyticsArgs = {
  courseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryAssignmentStatsArgs = {
  assignmentId: Scalars['ID']['input'];
};


export type QueryAssignmentSubmissionArgs = {
  assignmentId: Scalars['ID']['input'];
  studentId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryAssignmentSubmissionsArgs = {
  assignmentId: Scalars['ID']['input'];
};


export type QueryAssignmentsArgs = {
  filter?: InputMaybe<AssignmentFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryAttendanceAnalyticsArgs = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryAttendanceSessionArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAttendanceSessionsArgs = {
  filter?: InputMaybe<AttendanceFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryAttendanceStatsArgs = {
  batchId: Scalars['ID']['input'];
};


export type QueryBatchArgs = {
  id: Scalars['ID']['input'];
};


export type QueryBatchAssignmentsArgs = {
  batchId: Scalars['ID']['input'];
  filter?: InputMaybe<AssignmentFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryBatchAttendanceArgs = {
  batchId: Scalars['ID']['input'];
};


export type QueryBatchAttendanceSessionsArgs = {
  batchId: Scalars['ID']['input'];
};


export type QueryBatchEnrollmentsArgs = {
  batchId: Scalars['ID']['input'];
};


export type QueryBatchStatsArgs = {
  batchId: Scalars['ID']['input'];
};


export type QueryBatchesArgs = {
  filter?: InputMaybe<BatchFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryChapterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryChaptersArgs = {
  courseId: Scalars['ID']['input'];
};


export type QueryCheckEnrollmentAccessArgs = {
  courseId: Scalars['ID']['input'];
};


export type QueryCourseArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCourseAnalyticsArgs = {
  courseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryCourseBatchesArgs = {
  courseId: Scalars['ID']['input'];
};


export type QueryCourseProgressArgs = {
  courseId: Scalars['ID']['input'];
};


export type QueryCoursesArgs = {
  filter?: InputMaybe<CourseFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryEnrollmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEnrollmentProgressArgs = {
  enrollmentId: Scalars['ID']['input'];
};


export type QueryEnrollmentsArgs = {
  filter?: InputMaybe<EnrollmentFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryHasValidOfflineCacheArgs = {
  moduleId: Scalars['String']['input'];
};


export type QueryModuleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryModuleProgressArgs = {
  moduleId: Scalars['ID']['input'];
};


export type QueryModulesArgs = {
  chapterId: Scalars['ID']['input'];
};


export type QueryMyAssignmentsArgs = {
  filter?: InputMaybe<AssignmentFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryMyCoursesArgs = {
  filter?: InputMaybe<CourseFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryNotificationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPendingGradingArgs = {
  filter?: InputMaybe<AssignmentFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryProgressAnalyticsArgs = {
  courseId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryRecentActivityArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryStudentAnalyticsArgs = {
  studentId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryStudentAttendanceArgs = {
  studentId: Scalars['ID']['input'];
};


export type QueryStudentAttendanceStatsArgs = {
  batchId?: InputMaybe<Scalars['ID']['input']>;
  studentId?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryStudentEnrollmentsArgs = {
  studentId: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<UserFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};

export type RegisterInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
  username: Scalars['String']['input'];
};

export type SortInput = {
  field?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Scalars['String']['input']>;
};

export type StudentProgress = {
  __typename?: 'StudentProgress';
  completedAt?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isCompleted: Scalars['Boolean']['output'];
  module?: Maybe<Module>;
  moduleId: Scalars['String']['output'];
  student?: Maybe<User>;
  studentId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SubmitAssignmentInput = {
  assignmentId: Scalars['String']['input'];
  submissionFiles?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateAssignmentInput = {
  batchId?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateBatchInput = {
  courseId?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateChapterInput = {
  courseId?: InputMaybe<Scalars['String']['input']>;
  orderIndex?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCourseInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateModuleInput = {
  chapterId?: InputMaybe<Scalars['String']['input']>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileUrl?: InputMaybe<Scalars['String']['input']>;
  orderIndex?: InputMaybe<Scalars['Float']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ModuleType>;
};

export type UpdateProgressInput = {
  isCompleted: Scalars['Boolean']['input'];
  moduleId: Scalars['String']['input'];
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type UserFilterInput = {
  createdBy?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
  search?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export enum UserRole {
  Admin = 'ADMIN',
  Student = 'STUDENT'
}

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', createdAt: any, email: string, firstName: string, id: string, isActive: boolean, lastName: string, phone?: string | null, role: UserRole, updatedAt: any, username: string } };


export const MeDocument = gql`
    query Me {
  me {
    createdAt
    email
    firstName
    id
    isActive
    lastName
    phone
    role
    updatedAt
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;