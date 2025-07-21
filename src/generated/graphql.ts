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
  data?: Maybe<Array<Maybe<AssignmentSubmission>>>;
  meta?: Maybe<PaginationMeta>;
};

export type PaginatedAssignments = {
  __typename?: 'PaginatedAssignments';
  data?: Maybe<Array<Maybe<Assignment>>>;
  meta?: Maybe<PaginationMeta>;
};

export type PaginatedAttendanceSessions = {
  __typename?: 'PaginatedAttendanceSessions';
  data?: Maybe<Array<Maybe<AttendanceSession>>>;
  meta?: Maybe<PaginationMeta>;
};

export type PaginatedBatches = {
  __typename?: 'PaginatedBatches';
  data?: Maybe<Array<Maybe<Batch>>>;
  meta?: Maybe<PaginationMeta>;
};

export type PaginatedCourses = {
  __typename?: 'PaginatedCourses';
  data?: Maybe<Array<Maybe<Course>>>;
  meta?: Maybe<PaginationMeta>;
};

export type PaginatedEnrollments = {
  __typename?: 'PaginatedEnrollments';
  data?: Maybe<Array<Maybe<Enrollment>>>;
  meta?: Maybe<PaginationMeta>;
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  data?: Maybe<Array<Maybe<User>>>;
  meta?: Maybe<PaginationMeta>;
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

export type CreateAssignmentMutationVariables = Exact<{
  createAssignmentInput: CreateAssignmentInput;
}>;


export type CreateAssignmentMutation = { __typename?: 'Mutation', createAssignment: { __typename?: 'Assignment', batchId: string, createdAt: any, description: string, dueDate?: any | null, id: string, isActive: boolean, title: string, updatedAt: any, batch?: { __typename?: 'Batch', id: string, name: string } | null } };

export type UpdateAssignmentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  updateAssignmentInput: UpdateAssignmentInput;
}>;


export type UpdateAssignmentMutation = { __typename?: 'Mutation', updateAssignment: { __typename?: 'Assignment', batchId: string, createdAt: any, description: string, dueDate?: any | null, id: string, isActive: boolean, title: string, updatedAt: any, batch?: { __typename?: 'Batch', id: string, name: string } | null } };

export type RemoveAssignmentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveAssignmentMutation = { __typename?: 'Mutation', removeAssignment: { __typename?: 'Assignment', batchId: string, createdAt: any, description: string, dueDate?: any | null, id: string, isActive: boolean, title: string, updatedAt: any, batch?: { __typename?: 'Batch', id: string, name: string } | null } };

export type SubmitAssignmentMutationVariables = Exact<{
  submitAssignmentInput: SubmitAssignmentInput;
}>;


export type SubmitAssignmentMutation = { __typename?: 'Mutation', submitAssignment: { __typename?: 'AssignmentSubmission', assignmentId: string, createdAt: any, feedback?: string | null, gradedAt?: any | null, id: string, score?: number | null, status: string, studentId: string, submissionFiles?: string | null, submittedAt: any, updatedAt: any, assignment?: { __typename?: 'Assignment', id: string, title: string } | null, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null } };

export type GradeAssignmentMutationVariables = Exact<{
  gradeAssignmentInput: GradeAssignmentInput;
}>;


export type GradeAssignmentMutation = { __typename?: 'Mutation', gradeAssignment: { __typename?: 'AssignmentSubmission', assignmentId: string, createdAt: any, feedback?: string | null, gradedAt?: any | null, id: string, score?: number | null, status: string, studentId: string, submissionFiles?: string | null, submittedAt: any, updatedAt: any, assignment?: { __typename?: 'Assignment', id: string, title: string } | null, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null } };

export type CreateAttendanceSessionMutationVariables = Exact<{
  createSessionInput: CreateAttendanceSessionInput;
}>;


export type CreateAttendanceSessionMutation = { __typename?: 'Mutation', createAttendanceSession: { __typename?: 'AttendanceSession', batchId: string, createdAt: any, id: string, sessionDate: any, sessionTitle: string, updatedAt: any, batch?: { __typename?: 'Batch', id: string, name: string, course?: { __typename?: 'Course', id: string, title: string } | null } | null, attendanceRecords?: Array<{ __typename?: 'AttendanceRecord', id: string, isPresent: boolean, studentId: string, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null }> | null } };

export type DeleteAttendanceSessionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteAttendanceSessionMutation = { __typename?: 'Mutation', deleteAttendanceSession: boolean };

export type MarkAttendanceMutationVariables = Exact<{
  markAttendanceInput: Array<MarkAttendanceInput> | MarkAttendanceInput;
}>;


export type MarkAttendanceMutation = { __typename?: 'Mutation', markAttendance: Array<{ __typename?: 'AttendanceRecord', createdAt: any, enrollmentId: string, id: string, isPresent: boolean, sessionId: string, studentId: string, updatedAt: any, enrollment?: { __typename?: 'Enrollment', id: string, enrollmentDate: any, status: string } | null, session?: { __typename?: 'AttendanceSession', id: string, sessionDate: any, sessionTitle: string, batchId: string } | null, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null }> };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', createdAt: any, email: string, firstName: string, id: string, isActive: boolean, lastName: string, phone?: string | null, role: UserRole, updatedAt: any, username: string } } };

export type MutationMutationVariables = Exact<{ [key: string]: never; }>;


export type MutationMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', token: string, user: { __typename?: 'User', createdAt: any, email: string, firstName: string, id: string, isActive: boolean, lastName: string, phone?: string | null, role: UserRole, updatedAt: any, username: string } } };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', createdAt: any, email: string, firstName: string, id: string, isActive: boolean, lastName: string, phone?: string | null, role: UserRole, updatedAt: any, username: string } };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', createdAt: any, email: string, firstName: string, id: string, isActive: boolean, lastName: string, phone?: string | null, role: UserRole, updatedAt: any, username: string } };

export type RemoveUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', createdAt: any, email: string, firstName: string, id: string, isActive: boolean, lastName: string, phone?: string | null, role: UserRole, updatedAt: any, username: string } };

export type AssignmentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AssignmentQuery = { __typename?: 'Query', assignment: { __typename?: 'Assignment', batchId: string, createdAt: any, description: string, dueDate?: any | null, id: string, isActive: boolean, title: string, updatedAt: any, batch?: { __typename?: 'Batch', id: string, name: string, course?: { __typename?: 'Course', id: string, title: string } | null } | null, submissions?: Array<{ __typename?: 'AssignmentSubmission', id: string, status: string, submittedAt: any, score?: number | null, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null }> | null } };

export type AssignmentsQueryVariables = Exact<{
  filter?: InputMaybe<AssignmentFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type AssignmentsQuery = { __typename?: 'Query', assignments: { __typename?: 'PaginatedAssignments', data?: Array<{ __typename?: 'Assignment', batchId: string, createdAt: any, description: string, dueDate?: any | null, id: string, isActive: boolean, title: string, updatedAt: any, batch?: { __typename?: 'Batch', id: string, name: string, course?: { __typename?: 'Course', id: string, title: string } | null } | null } | null> | null, meta?: { __typename?: 'PaginationMeta', hasNext: boolean, hasPrev: boolean, limit: number, page: number, total: number, totalPages: number } | null } };

export type BatchAssignmentsQueryVariables = Exact<{
  batchId: Scalars['ID']['input'];
  filter?: InputMaybe<AssignmentFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type BatchAssignmentsQuery = { __typename?: 'Query', batchAssignments: { __typename?: 'PaginatedAssignments', data?: Array<{ __typename?: 'Assignment', batchId: string, createdAt: any, description: string, dueDate?: any | null, id: string, isActive: boolean, title: string, updatedAt: any, batch?: { __typename?: 'Batch', id: string, name: string } | null } | null> | null, meta?: { __typename?: 'PaginationMeta', hasNext: boolean, hasPrev: boolean, limit: number, page: number, total: number, totalPages: number } | null } };

export type MyAssignmentsQueryVariables = Exact<{
  filter?: InputMaybe<AssignmentFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type MyAssignmentsQuery = { __typename?: 'Query', myAssignments: { __typename?: 'PaginatedAssignments', data?: Array<{ __typename?: 'Assignment', batchId: string, createdAt: any, description: string, dueDate?: any | null, id: string, isActive: boolean, title: string, updatedAt: any, batch?: { __typename?: 'Batch', id: string, name: string, course?: { __typename?: 'Course', id: string, title: string } | null } | null } | null> | null, meta?: { __typename?: 'PaginationMeta', hasNext: boolean, hasPrev: boolean, limit: number, page: number, total: number, totalPages: number } | null } };

export type AssignmentSubmissionQueryVariables = Exact<{
  assignmentId: Scalars['ID']['input'];
  studentId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type AssignmentSubmissionQuery = { __typename?: 'Query', assignmentSubmission?: { __typename?: 'AssignmentSubmission', assignmentId: string, createdAt: any, feedback?: string | null, gradedAt?: any | null, id: string, score?: number | null, status: string, studentId: string, submissionFiles?: string | null, submittedAt: any, updatedAt: any, assignment?: { __typename?: 'Assignment', id: string, title: string, description: string, dueDate?: any | null } | null, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null } | null };

export type AssignmentSubmissionsQueryVariables = Exact<{
  assignmentId: Scalars['ID']['input'];
}>;


export type AssignmentSubmissionsQuery = { __typename?: 'Query', assignmentSubmissions: Array<{ __typename?: 'AssignmentSubmission', assignmentId: string, createdAt: any, feedback?: string | null, gradedAt?: any | null, id: string, score?: number | null, status: string, studentId: string, submissionFiles?: string | null, submittedAt: any, updatedAt: any, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null }> };

export type PendingGradingQueryVariables = Exact<{
  filter?: InputMaybe<AssignmentFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type PendingGradingQuery = { __typename?: 'Query', pendingGrading: { __typename?: 'PaginatedAssignmentSubmissions', data?: Array<{ __typename?: 'AssignmentSubmission', assignmentId: string, createdAt: any, feedback?: string | null, gradedAt?: any | null, id: string, score?: number | null, status: string, studentId: string, submissionFiles?: string | null, submittedAt: any, updatedAt: any, assignment?: { __typename?: 'Assignment', id: string, title: string, dueDate?: any | null, batch?: { __typename?: 'Batch', id: string, name: string } | null } | null, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null } | null> | null, meta?: { __typename?: 'PaginationMeta', hasNext: boolean, hasPrev: boolean, limit: number, page: number, total: number, totalPages: number } | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', createdAt: any, email: string, firstName: string, id: string, isActive: boolean, lastName: string, phone?: string | null, role: UserRole, updatedAt: any, username: string } };

export type UserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', createdAt: any, email: string, firstName: string, id: string, isActive: boolean, lastName: string, phone?: string | null, role: UserRole, updatedAt: any, username: string } };

export type UsersQueryVariables = Exact<{
  filter?: InputMaybe<UserFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUsers', data?: Array<{ __typename?: 'User', createdAt: any, email: string, firstName: string, id: string, isActive: boolean, lastName: string, phone?: string | null, role: UserRole, updatedAt: any, username: string } | null> | null, meta?: { __typename?: 'PaginationMeta', hasNext: boolean, hasPrev: boolean, limit: number, page: number, total: number, totalPages: number } | null } };

export type StudentsQueryVariables = Exact<{ [key: string]: never; }>;


export type StudentsQuery = { __typename?: 'Query', students: Array<{ __typename?: 'User', createdAt: any, email: string, firstName: string, id: string, isActive: boolean, lastName: string, phone?: string | null, role: UserRole, updatedAt: any, username: string }> };


export const CreateAssignmentDocument = gql`
    mutation CreateAssignment($createAssignmentInput: CreateAssignmentInput!) {
  createAssignment(createAssignmentInput: $createAssignmentInput) {
    batchId
    createdAt
    description
    dueDate
    id
    isActive
    title
    updatedAt
    batch {
      id
      name
    }
  }
}
    `;
export type CreateAssignmentMutationFn = Apollo.MutationFunction<CreateAssignmentMutation, CreateAssignmentMutationVariables>;

/**
 * __useCreateAssignmentMutation__
 *
 * To run a mutation, you first call `useCreateAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssignmentMutation, { data, loading, error }] = useCreateAssignmentMutation({
 *   variables: {
 *      createAssignmentInput: // value for 'createAssignmentInput'
 *   },
 * });
 */
export function useCreateAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<CreateAssignmentMutation, CreateAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAssignmentMutation, CreateAssignmentMutationVariables>(CreateAssignmentDocument, options);
      }
export type CreateAssignmentMutationHookResult = ReturnType<typeof useCreateAssignmentMutation>;
export type CreateAssignmentMutationResult = Apollo.MutationResult<CreateAssignmentMutation>;
export type CreateAssignmentMutationOptions = Apollo.BaseMutationOptions<CreateAssignmentMutation, CreateAssignmentMutationVariables>;
export const UpdateAssignmentDocument = gql`
    mutation UpdateAssignment($id: ID!, $updateAssignmentInput: UpdateAssignmentInput!) {
  updateAssignment(id: $id, updateAssignmentInput: $updateAssignmentInput) {
    batchId
    createdAt
    description
    dueDate
    id
    isActive
    title
    updatedAt
    batch {
      id
      name
    }
  }
}
    `;
export type UpdateAssignmentMutationFn = Apollo.MutationFunction<UpdateAssignmentMutation, UpdateAssignmentMutationVariables>;

/**
 * __useUpdateAssignmentMutation__
 *
 * To run a mutation, you first call `useUpdateAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAssignmentMutation, { data, loading, error }] = useUpdateAssignmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateAssignmentInput: // value for 'updateAssignmentInput'
 *   },
 * });
 */
export function useUpdateAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAssignmentMutation, UpdateAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAssignmentMutation, UpdateAssignmentMutationVariables>(UpdateAssignmentDocument, options);
      }
export type UpdateAssignmentMutationHookResult = ReturnType<typeof useUpdateAssignmentMutation>;
export type UpdateAssignmentMutationResult = Apollo.MutationResult<UpdateAssignmentMutation>;
export type UpdateAssignmentMutationOptions = Apollo.BaseMutationOptions<UpdateAssignmentMutation, UpdateAssignmentMutationVariables>;
export const RemoveAssignmentDocument = gql`
    mutation RemoveAssignment($id: ID!) {
  removeAssignment(id: $id) {
    batchId
    createdAt
    description
    dueDate
    id
    isActive
    title
    updatedAt
    batch {
      id
      name
    }
  }
}
    `;
export type RemoveAssignmentMutationFn = Apollo.MutationFunction<RemoveAssignmentMutation, RemoveAssignmentMutationVariables>;

/**
 * __useRemoveAssignmentMutation__
 *
 * To run a mutation, you first call `useRemoveAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAssignmentMutation, { data, loading, error }] = useRemoveAssignmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAssignmentMutation, RemoveAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveAssignmentMutation, RemoveAssignmentMutationVariables>(RemoveAssignmentDocument, options);
      }
export type RemoveAssignmentMutationHookResult = ReturnType<typeof useRemoveAssignmentMutation>;
export type RemoveAssignmentMutationResult = Apollo.MutationResult<RemoveAssignmentMutation>;
export type RemoveAssignmentMutationOptions = Apollo.BaseMutationOptions<RemoveAssignmentMutation, RemoveAssignmentMutationVariables>;
export const SubmitAssignmentDocument = gql`
    mutation SubmitAssignment($submitAssignmentInput: SubmitAssignmentInput!) {
  submitAssignment(submitAssignmentInput: $submitAssignmentInput) {
    assignmentId
    createdAt
    feedback
    gradedAt
    id
    score
    status
    studentId
    submissionFiles
    submittedAt
    updatedAt
    assignment {
      id
      title
    }
    student {
      id
      firstName
      lastName
      username
    }
  }
}
    `;
export type SubmitAssignmentMutationFn = Apollo.MutationFunction<SubmitAssignmentMutation, SubmitAssignmentMutationVariables>;

/**
 * __useSubmitAssignmentMutation__
 *
 * To run a mutation, you first call `useSubmitAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitAssignmentMutation, { data, loading, error }] = useSubmitAssignmentMutation({
 *   variables: {
 *      submitAssignmentInput: // value for 'submitAssignmentInput'
 *   },
 * });
 */
export function useSubmitAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<SubmitAssignmentMutation, SubmitAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitAssignmentMutation, SubmitAssignmentMutationVariables>(SubmitAssignmentDocument, options);
      }
export type SubmitAssignmentMutationHookResult = ReturnType<typeof useSubmitAssignmentMutation>;
export type SubmitAssignmentMutationResult = Apollo.MutationResult<SubmitAssignmentMutation>;
export type SubmitAssignmentMutationOptions = Apollo.BaseMutationOptions<SubmitAssignmentMutation, SubmitAssignmentMutationVariables>;
export const GradeAssignmentDocument = gql`
    mutation GradeAssignment($gradeAssignmentInput: GradeAssignmentInput!) {
  gradeAssignment(gradeAssignmentInput: $gradeAssignmentInput) {
    assignmentId
    createdAt
    feedback
    gradedAt
    id
    score
    status
    studentId
    submissionFiles
    submittedAt
    updatedAt
    assignment {
      id
      title
    }
    student {
      id
      firstName
      lastName
      username
    }
  }
}
    `;
export type GradeAssignmentMutationFn = Apollo.MutationFunction<GradeAssignmentMutation, GradeAssignmentMutationVariables>;

/**
 * __useGradeAssignmentMutation__
 *
 * To run a mutation, you first call `useGradeAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGradeAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [gradeAssignmentMutation, { data, loading, error }] = useGradeAssignmentMutation({
 *   variables: {
 *      gradeAssignmentInput: // value for 'gradeAssignmentInput'
 *   },
 * });
 */
export function useGradeAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<GradeAssignmentMutation, GradeAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GradeAssignmentMutation, GradeAssignmentMutationVariables>(GradeAssignmentDocument, options);
      }
export type GradeAssignmentMutationHookResult = ReturnType<typeof useGradeAssignmentMutation>;
export type GradeAssignmentMutationResult = Apollo.MutationResult<GradeAssignmentMutation>;
export type GradeAssignmentMutationOptions = Apollo.BaseMutationOptions<GradeAssignmentMutation, GradeAssignmentMutationVariables>;
export const CreateAttendanceSessionDocument = gql`
    mutation CreateAttendanceSession($createSessionInput: CreateAttendanceSessionInput!) {
  createAttendanceSession(createSessionInput: $createSessionInput) {
    batchId
    createdAt
    id
    sessionDate
    sessionTitle
    updatedAt
    batch {
      id
      name
      course {
        id
        title
      }
    }
    attendanceRecords {
      id
      isPresent
      studentId
      student {
        id
        firstName
        lastName
        username
      }
    }
  }
}
    `;
export type CreateAttendanceSessionMutationFn = Apollo.MutationFunction<CreateAttendanceSessionMutation, CreateAttendanceSessionMutationVariables>;

/**
 * __useCreateAttendanceSessionMutation__
 *
 * To run a mutation, you first call `useCreateAttendanceSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAttendanceSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAttendanceSessionMutation, { data, loading, error }] = useCreateAttendanceSessionMutation({
 *   variables: {
 *      createSessionInput: // value for 'createSessionInput'
 *   },
 * });
 */
export function useCreateAttendanceSessionMutation(baseOptions?: Apollo.MutationHookOptions<CreateAttendanceSessionMutation, CreateAttendanceSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAttendanceSessionMutation, CreateAttendanceSessionMutationVariables>(CreateAttendanceSessionDocument, options);
      }
export type CreateAttendanceSessionMutationHookResult = ReturnType<typeof useCreateAttendanceSessionMutation>;
export type CreateAttendanceSessionMutationResult = Apollo.MutationResult<CreateAttendanceSessionMutation>;
export type CreateAttendanceSessionMutationOptions = Apollo.BaseMutationOptions<CreateAttendanceSessionMutation, CreateAttendanceSessionMutationVariables>;
export const DeleteAttendanceSessionDocument = gql`
    mutation DeleteAttendanceSession($id: ID!) {
  deleteAttendanceSession(id: $id)
}
    `;
export type DeleteAttendanceSessionMutationFn = Apollo.MutationFunction<DeleteAttendanceSessionMutation, DeleteAttendanceSessionMutationVariables>;

/**
 * __useDeleteAttendanceSessionMutation__
 *
 * To run a mutation, you first call `useDeleteAttendanceSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAttendanceSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAttendanceSessionMutation, { data, loading, error }] = useDeleteAttendanceSessionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAttendanceSessionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAttendanceSessionMutation, DeleteAttendanceSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAttendanceSessionMutation, DeleteAttendanceSessionMutationVariables>(DeleteAttendanceSessionDocument, options);
      }
export type DeleteAttendanceSessionMutationHookResult = ReturnType<typeof useDeleteAttendanceSessionMutation>;
export type DeleteAttendanceSessionMutationResult = Apollo.MutationResult<DeleteAttendanceSessionMutation>;
export type DeleteAttendanceSessionMutationOptions = Apollo.BaseMutationOptions<DeleteAttendanceSessionMutation, DeleteAttendanceSessionMutationVariables>;
export const MarkAttendanceDocument = gql`
    mutation MarkAttendance($markAttendanceInput: [MarkAttendanceInput!]!) {
  markAttendance(markAttendanceInput: $markAttendanceInput) {
    createdAt
    enrollmentId
    id
    isPresent
    sessionId
    studentId
    updatedAt
    enrollment {
      id
      enrollmentDate
      status
    }
    session {
      id
      sessionDate
      sessionTitle
      batchId
    }
    student {
      id
      firstName
      lastName
      username
      email
    }
  }
}
    `;
export type MarkAttendanceMutationFn = Apollo.MutationFunction<MarkAttendanceMutation, MarkAttendanceMutationVariables>;

/**
 * __useMarkAttendanceMutation__
 *
 * To run a mutation, you first call `useMarkAttendanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAttendanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAttendanceMutation, { data, loading, error }] = useMarkAttendanceMutation({
 *   variables: {
 *      markAttendanceInput: // value for 'markAttendanceInput'
 *   },
 * });
 */
export function useMarkAttendanceMutation(baseOptions?: Apollo.MutationHookOptions<MarkAttendanceMutation, MarkAttendanceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkAttendanceMutation, MarkAttendanceMutationVariables>(MarkAttendanceDocument, options);
      }
export type MarkAttendanceMutationHookResult = ReturnType<typeof useMarkAttendanceMutation>;
export type MarkAttendanceMutationResult = Apollo.MutationResult<MarkAttendanceMutation>;
export type MarkAttendanceMutationOptions = Apollo.BaseMutationOptions<MarkAttendanceMutation, MarkAttendanceMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    token
    user {
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
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MutationDocument = gql`
    mutation Mutation {
  logout
}
    `;
export type MutationMutationFn = Apollo.MutationFunction<MutationMutation, MutationMutationVariables>;

/**
 * __useMutationMutation__
 *
 * To run a mutation, you first call `useMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationMutation, { data, loading, error }] = useMutationMutation({
 *   variables: {
 *   },
 * });
 */
export function useMutationMutation(baseOptions?: Apollo.MutationHookOptions<MutationMutation, MutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationMutation, MutationMutationVariables>(MutationDocument, options);
      }
export type MutationMutationHookResult = ReturnType<typeof useMutationMutation>;
export type MutationMutationResult = Apollo.MutationResult<MutationMutation>;
export type MutationMutationOptions = Apollo.BaseMutationOptions<MutationMutation, MutationMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    token
    user {
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
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
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
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($id: ID!, $updateUserInput: UpdateUserInput!) {
  updateUser(id: $id, updateUserInput: $updateUserInput) {
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
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const RemoveUserDocument = gql`
    mutation RemoveUser($id: ID!) {
  removeUser(id: $id) {
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
export type RemoveUserMutationFn = Apollo.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;
export const AssignmentDocument = gql`
    query Assignment($id: ID!) {
  assignment(id: $id) {
    batchId
    createdAt
    description
    dueDate
    id
    isActive
    title
    updatedAt
    batch {
      id
      name
      course {
        id
        title
      }
    }
    submissions {
      id
      status
      submittedAt
      score
      student {
        id
        firstName
        lastName
        username
      }
    }
  }
}
    `;

/**
 * __useAssignmentQuery__
 *
 * To run a query within a React component, call `useAssignmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssignmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssignmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAssignmentQuery(baseOptions: Apollo.QueryHookOptions<AssignmentQuery, AssignmentQueryVariables> & ({ variables: AssignmentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AssignmentQuery, AssignmentQueryVariables>(AssignmentDocument, options);
      }
export function useAssignmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AssignmentQuery, AssignmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AssignmentQuery, AssignmentQueryVariables>(AssignmentDocument, options);
        }
export function useAssignmentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AssignmentQuery, AssignmentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AssignmentQuery, AssignmentQueryVariables>(AssignmentDocument, options);
        }
export type AssignmentQueryHookResult = ReturnType<typeof useAssignmentQuery>;
export type AssignmentLazyQueryHookResult = ReturnType<typeof useAssignmentLazyQuery>;
export type AssignmentSuspenseQueryHookResult = ReturnType<typeof useAssignmentSuspenseQuery>;
export type AssignmentQueryResult = Apollo.QueryResult<AssignmentQuery, AssignmentQueryVariables>;
export const AssignmentsDocument = gql`
    query Assignments($filter: AssignmentFilterInput, $pagination: PaginationInput, $sort: SortInput) {
  assignments(filter: $filter, pagination: $pagination, sort: $sort) {
    data {
      batchId
      createdAt
      description
      dueDate
      id
      isActive
      title
      updatedAt
      batch {
        id
        name
        course {
          id
          title
        }
      }
    }
    meta {
      hasNext
      hasPrev
      limit
      page
      total
      totalPages
    }
  }
}
    `;

/**
 * __useAssignmentsQuery__
 *
 * To run a query within a React component, call `useAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssignmentsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useAssignmentsQuery(baseOptions?: Apollo.QueryHookOptions<AssignmentsQuery, AssignmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AssignmentsQuery, AssignmentsQueryVariables>(AssignmentsDocument, options);
      }
export function useAssignmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AssignmentsQuery, AssignmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AssignmentsQuery, AssignmentsQueryVariables>(AssignmentsDocument, options);
        }
export function useAssignmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AssignmentsQuery, AssignmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AssignmentsQuery, AssignmentsQueryVariables>(AssignmentsDocument, options);
        }
export type AssignmentsQueryHookResult = ReturnType<typeof useAssignmentsQuery>;
export type AssignmentsLazyQueryHookResult = ReturnType<typeof useAssignmentsLazyQuery>;
export type AssignmentsSuspenseQueryHookResult = ReturnType<typeof useAssignmentsSuspenseQuery>;
export type AssignmentsQueryResult = Apollo.QueryResult<AssignmentsQuery, AssignmentsQueryVariables>;
export const BatchAssignmentsDocument = gql`
    query BatchAssignments($batchId: ID!, $filter: AssignmentFilterInput, $pagination: PaginationInput, $sort: SortInput) {
  batchAssignments(
    batchId: $batchId
    filter: $filter
    pagination: $pagination
    sort: $sort
  ) {
    data {
      batchId
      createdAt
      description
      dueDate
      id
      isActive
      title
      updatedAt
      batch {
        id
        name
      }
    }
    meta {
      hasNext
      hasPrev
      limit
      page
      total
      totalPages
    }
  }
}
    `;

/**
 * __useBatchAssignmentsQuery__
 *
 * To run a query within a React component, call `useBatchAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBatchAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBatchAssignmentsQuery({
 *   variables: {
 *      batchId: // value for 'batchId'
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useBatchAssignmentsQuery(baseOptions: Apollo.QueryHookOptions<BatchAssignmentsQuery, BatchAssignmentsQueryVariables> & ({ variables: BatchAssignmentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BatchAssignmentsQuery, BatchAssignmentsQueryVariables>(BatchAssignmentsDocument, options);
      }
export function useBatchAssignmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BatchAssignmentsQuery, BatchAssignmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BatchAssignmentsQuery, BatchAssignmentsQueryVariables>(BatchAssignmentsDocument, options);
        }
export function useBatchAssignmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BatchAssignmentsQuery, BatchAssignmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BatchAssignmentsQuery, BatchAssignmentsQueryVariables>(BatchAssignmentsDocument, options);
        }
export type BatchAssignmentsQueryHookResult = ReturnType<typeof useBatchAssignmentsQuery>;
export type BatchAssignmentsLazyQueryHookResult = ReturnType<typeof useBatchAssignmentsLazyQuery>;
export type BatchAssignmentsSuspenseQueryHookResult = ReturnType<typeof useBatchAssignmentsSuspenseQuery>;
export type BatchAssignmentsQueryResult = Apollo.QueryResult<BatchAssignmentsQuery, BatchAssignmentsQueryVariables>;
export const MyAssignmentsDocument = gql`
    query MyAssignments($filter: AssignmentFilterInput, $pagination: PaginationInput, $sort: SortInput) {
  myAssignments(filter: $filter, pagination: $pagination, sort: $sort) {
    data {
      batchId
      createdAt
      description
      dueDate
      id
      isActive
      title
      updatedAt
      batch {
        id
        name
        course {
          id
          title
        }
      }
    }
    meta {
      hasNext
      hasPrev
      limit
      page
      total
      totalPages
    }
  }
}
    `;

/**
 * __useMyAssignmentsQuery__
 *
 * To run a query within a React component, call `useMyAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyAssignmentsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useMyAssignmentsQuery(baseOptions?: Apollo.QueryHookOptions<MyAssignmentsQuery, MyAssignmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyAssignmentsQuery, MyAssignmentsQueryVariables>(MyAssignmentsDocument, options);
      }
export function useMyAssignmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyAssignmentsQuery, MyAssignmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyAssignmentsQuery, MyAssignmentsQueryVariables>(MyAssignmentsDocument, options);
        }
export function useMyAssignmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyAssignmentsQuery, MyAssignmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyAssignmentsQuery, MyAssignmentsQueryVariables>(MyAssignmentsDocument, options);
        }
export type MyAssignmentsQueryHookResult = ReturnType<typeof useMyAssignmentsQuery>;
export type MyAssignmentsLazyQueryHookResult = ReturnType<typeof useMyAssignmentsLazyQuery>;
export type MyAssignmentsSuspenseQueryHookResult = ReturnType<typeof useMyAssignmentsSuspenseQuery>;
export type MyAssignmentsQueryResult = Apollo.QueryResult<MyAssignmentsQuery, MyAssignmentsQueryVariables>;
export const AssignmentSubmissionDocument = gql`
    query AssignmentSubmission($assignmentId: ID!, $studentId: ID) {
  assignmentSubmission(assignmentId: $assignmentId, studentId: $studentId) {
    assignmentId
    createdAt
    feedback
    gradedAt
    id
    score
    status
    studentId
    submissionFiles
    submittedAt
    updatedAt
    assignment {
      id
      title
      description
      dueDate
    }
    student {
      id
      firstName
      lastName
      username
      email
    }
  }
}
    `;

/**
 * __useAssignmentSubmissionQuery__
 *
 * To run a query within a React component, call `useAssignmentSubmissionQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssignmentSubmissionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssignmentSubmissionQuery({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useAssignmentSubmissionQuery(baseOptions: Apollo.QueryHookOptions<AssignmentSubmissionQuery, AssignmentSubmissionQueryVariables> & ({ variables: AssignmentSubmissionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AssignmentSubmissionQuery, AssignmentSubmissionQueryVariables>(AssignmentSubmissionDocument, options);
      }
export function useAssignmentSubmissionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AssignmentSubmissionQuery, AssignmentSubmissionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AssignmentSubmissionQuery, AssignmentSubmissionQueryVariables>(AssignmentSubmissionDocument, options);
        }
export function useAssignmentSubmissionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AssignmentSubmissionQuery, AssignmentSubmissionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AssignmentSubmissionQuery, AssignmentSubmissionQueryVariables>(AssignmentSubmissionDocument, options);
        }
export type AssignmentSubmissionQueryHookResult = ReturnType<typeof useAssignmentSubmissionQuery>;
export type AssignmentSubmissionLazyQueryHookResult = ReturnType<typeof useAssignmentSubmissionLazyQuery>;
export type AssignmentSubmissionSuspenseQueryHookResult = ReturnType<typeof useAssignmentSubmissionSuspenseQuery>;
export type AssignmentSubmissionQueryResult = Apollo.QueryResult<AssignmentSubmissionQuery, AssignmentSubmissionQueryVariables>;
export const AssignmentSubmissionsDocument = gql`
    query AssignmentSubmissions($assignmentId: ID!) {
  assignmentSubmissions(assignmentId: $assignmentId) {
    assignmentId
    createdAt
    feedback
    gradedAt
    id
    score
    status
    studentId
    submissionFiles
    submittedAt
    updatedAt
    student {
      id
      firstName
      lastName
      username
      email
    }
  }
}
    `;

/**
 * __useAssignmentSubmissionsQuery__
 *
 * To run a query within a React component, call `useAssignmentSubmissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssignmentSubmissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssignmentSubmissionsQuery({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function useAssignmentSubmissionsQuery(baseOptions: Apollo.QueryHookOptions<AssignmentSubmissionsQuery, AssignmentSubmissionsQueryVariables> & ({ variables: AssignmentSubmissionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AssignmentSubmissionsQuery, AssignmentSubmissionsQueryVariables>(AssignmentSubmissionsDocument, options);
      }
export function useAssignmentSubmissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AssignmentSubmissionsQuery, AssignmentSubmissionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AssignmentSubmissionsQuery, AssignmentSubmissionsQueryVariables>(AssignmentSubmissionsDocument, options);
        }
export function useAssignmentSubmissionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AssignmentSubmissionsQuery, AssignmentSubmissionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AssignmentSubmissionsQuery, AssignmentSubmissionsQueryVariables>(AssignmentSubmissionsDocument, options);
        }
export type AssignmentSubmissionsQueryHookResult = ReturnType<typeof useAssignmentSubmissionsQuery>;
export type AssignmentSubmissionsLazyQueryHookResult = ReturnType<typeof useAssignmentSubmissionsLazyQuery>;
export type AssignmentSubmissionsSuspenseQueryHookResult = ReturnType<typeof useAssignmentSubmissionsSuspenseQuery>;
export type AssignmentSubmissionsQueryResult = Apollo.QueryResult<AssignmentSubmissionsQuery, AssignmentSubmissionsQueryVariables>;
export const PendingGradingDocument = gql`
    query PendingGrading($filter: AssignmentFilterInput, $pagination: PaginationInput, $sort: SortInput) {
  pendingGrading(filter: $filter, pagination: $pagination, sort: $sort) {
    data {
      assignmentId
      createdAt
      feedback
      gradedAt
      id
      score
      status
      studentId
      submissionFiles
      submittedAt
      updatedAt
      assignment {
        id
        title
        dueDate
        batch {
          id
          name
        }
      }
      student {
        id
        firstName
        lastName
        username
        email
      }
    }
    meta {
      hasNext
      hasPrev
      limit
      page
      total
      totalPages
    }
  }
}
    `;

/**
 * __usePendingGradingQuery__
 *
 * To run a query within a React component, call `usePendingGradingQuery` and pass it any options that fit your needs.
 * When your component renders, `usePendingGradingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePendingGradingQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function usePendingGradingQuery(baseOptions?: Apollo.QueryHookOptions<PendingGradingQuery, PendingGradingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PendingGradingQuery, PendingGradingQueryVariables>(PendingGradingDocument, options);
      }
export function usePendingGradingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PendingGradingQuery, PendingGradingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PendingGradingQuery, PendingGradingQueryVariables>(PendingGradingDocument, options);
        }
export function usePendingGradingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PendingGradingQuery, PendingGradingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PendingGradingQuery, PendingGradingQueryVariables>(PendingGradingDocument, options);
        }
export type PendingGradingQueryHookResult = ReturnType<typeof usePendingGradingQuery>;
export type PendingGradingLazyQueryHookResult = ReturnType<typeof usePendingGradingLazyQuery>;
export type PendingGradingSuspenseQueryHookResult = ReturnType<typeof usePendingGradingSuspenseQuery>;
export type PendingGradingQueryResult = Apollo.QueryResult<PendingGradingQuery, PendingGradingQueryVariables>;
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
export const UserDocument = gql`
    query User($id: ID!) {
  user(id: $id) {
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
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables> & ({ variables: UserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UsersDocument = gql`
    query Users($filter: UserFilterInput, $pagination: PaginationInput, $sort: SortInput) {
  users(filter: $filter, pagination: $pagination, sort: $sort) {
    data {
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
    meta {
      hasNext
      hasPrev
      limit
      page
      total
      totalPages
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export function useUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersSuspenseQueryHookResult = ReturnType<typeof useUsersSuspenseQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
export const StudentsDocument = gql`
    query Students {
  students {
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
 * __useStudentsQuery__
 *
 * To run a query within a React component, call `useStudentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useStudentsQuery(baseOptions?: Apollo.QueryHookOptions<StudentsQuery, StudentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StudentsQuery, StudentsQueryVariables>(StudentsDocument, options);
      }
export function useStudentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentsQuery, StudentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StudentsQuery, StudentsQueryVariables>(StudentsDocument, options);
        }
export function useStudentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StudentsQuery, StudentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StudentsQuery, StudentsQueryVariables>(StudentsDocument, options);
        }
export type StudentsQueryHookResult = ReturnType<typeof useStudentsQuery>;
export type StudentsLazyQueryHookResult = ReturnType<typeof useStudentsLazyQuery>;
export type StudentsSuspenseQueryHookResult = ReturnType<typeof useStudentsSuspenseQuery>;
export type StudentsQueryResult = Apollo.QueryResult<StudentsQuery, StudentsQueryVariables>;