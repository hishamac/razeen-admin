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
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
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
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
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

export type BulkCreateUsersInput = {
  users: Array<CreateUserInput>;
};

export type BulkCreateUsersResponse = {
  __typename?: 'BulkCreateUsersResponse';
  createdUsers: Array<User>;
  failedUsers: Array<Scalars['String']['output']>;
  failureCount: Scalars['Int']['output'];
  successCount: Scalars['Int']['output'];
  totalProcessed: Scalars['Int']['output'];
};

export type BulkDeleteInput = {
  ids: Array<Scalars['String']['input']>;
  options: DeleteOptionsInput;
};

export type BulkDeleteResponse = {
  __typename?: 'BulkDeleteResponse';
  deletedCount: Scalars['Float']['output'];
  deletedIds: Array<Scalars['String']['output']>;
  errorMessages: Array<Scalars['String']['output']>;
  failedIds: Array<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type BulkEnrollStudentsInput = {
  batchId: Scalars['ID']['input'];
  studentIds: Array<Scalars['ID']['input']>;
};

export type BulkRemoveAssignmentsInput = {
  assignmentIds: Array<Scalars['ID']['input']>;
};

export type BulkRemoveAssignmentsResponse = {
  __typename?: 'BulkRemoveAssignmentsResponse';
  deletedCount: Scalars['Int']['output'];
  deletedIds: Array<Scalars['String']['output']>;
  errorMessages: Array<Scalars['String']['output']>;
  failedIds: Array<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type BulkRemoveAttendanceSessionsInput = {
  sessionIds: Array<Scalars['ID']['input']>;
};

export type BulkRemoveAttendanceSessionsResponse = {
  __typename?: 'BulkRemoveAttendanceSessionsResponse';
  deletedCount: Scalars['Int']['output'];
  deletedIds: Array<Scalars['String']['output']>;
  errorMessages: Array<Scalars['String']['output']>;
  failedIds: Array<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type BulkRemoveBatchesInput = {
  batchIds: Array<Scalars['ID']['input']>;
};

export type BulkRemoveBatchesResponse = {
  __typename?: 'BulkRemoveBatchesResponse';
  deletedCount: Scalars['Int']['output'];
  deletedIds: Array<Scalars['String']['output']>;
  errorMessages: Array<Scalars['String']['output']>;
  failedIds: Array<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type BulkRemoveChaptersInput = {
  chapterIds: Array<Scalars['ID']['input']>;
  courseId: Scalars['String']['input'];
};

export type BulkRemoveCoursesInput = {
  courseIds: Array<Scalars['ID']['input']>;
};

export type BulkRemoveCoursesResponse = {
  __typename?: 'BulkRemoveCoursesResponse';
  deletedCount: Scalars['Int']['output'];
  deletedIds: Array<Scalars['String']['output']>;
  errorMessages: Array<Scalars['String']['output']>;
  failedIds: Array<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type BulkRemoveEnrollmentsInput = {
  enrollmentIds: Array<Scalars['ID']['input']>;
};

export type BulkRemoveEnrollmentsResponse = {
  __typename?: 'BulkRemoveEnrollmentsResponse';
  deletedCount: Scalars['Int']['output'];
  deletedIds: Array<Scalars['String']['output']>;
  errorMessages: Array<Scalars['String']['output']>;
  failedIds: Array<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type BulkRemoveModulesInput = {
  moduleIds: Array<Scalars['ID']['input']>;
};

export type BulkRemoveModulesResponse = {
  __typename?: 'BulkRemoveModulesResponse';
  deletedCount: Scalars['Int']['output'];
  deletedIds: Array<Scalars['String']['output']>;
  errorMessages: Array<Scalars['String']['output']>;
  failedIds: Array<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type BulkRemoveUsersInput = {
  userIds: Array<Scalars['String']['input']>;
};

export type BulkRemoveUsersResponse = {
  __typename?: 'BulkRemoveUsersResponse';
  deletedCount: Scalars['Int']['output'];
  deletedIds: Array<Scalars['String']['output']>;
  errorMessages: Array<Scalars['String']['output']>;
  failedIds: Array<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type BulkRestoreInput = {
  ids: Array<Scalars['String']['input']>;
  options?: InputMaybe<RestoreOptionsInput>;
};

export type BulkRestoreResponse = {
  __typename?: 'BulkRestoreResponse';
  errorMessages: Array<Scalars['String']['output']>;
  failedIds: Array<Scalars['String']['output']>;
  restoredCount: Scalars['Float']['output'];
  restoredIds: Array<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Chapter = {
  __typename?: 'Chapter';
  course?: Maybe<Course>;
  courseId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  modules?: Maybe<Array<Module>>;
  orderIndex: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ChapterFilterInput = {
  courseId?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
};

export type Course = {
  __typename?: 'Course';
  chapters?: Maybe<Array<Chapter>>;
  coverImage?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  createdBy: Scalars['String']['output'];
  creator?: Maybe<User>;
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  thumbnail?: Maybe<Scalars['String']['output']>;
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
  coverImage?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
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

export type DeleteOptionsInput = {
  force?: InputMaybe<Scalars['Boolean']['input']>;
  reason?: InputMaybe<Scalars['String']['input']>;
  type: DeleteType;
};

/** Type of delete operation */
export enum DeleteType {
  Hard = 'HARD',
  Soft = 'SOFT'
}

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

export type HardDeleteResponse = {
  __typename?: 'HardDeleteResponse';
  deleted: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
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
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  fileUrl?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  orderIndex: Scalars['Float']['output'];
  studentProgress?: Maybe<Array<StudentProgress>>;
  title: Scalars['String']['output'];
  type: ModuleType;
  updatedAt: Scalars['DateTime']['output'];
};

export type ModuleFilterInput = {
  chapterId?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ModuleType>;
};

export enum ModuleType {
  Document = 'DOCUMENT',
  Image = 'IMAGE',
  Pdf = 'PDF',
  Video = 'VIDEO'
}

export type Mutation = {
  __typename?: 'Mutation';
  bulkCreateUsers: BulkCreateUsersResponse;
  bulkEnrollStudents: Scalars['Boolean']['output'];
  bulkHardDeleteAssignments: BulkDeleteResponse;
  bulkHardDeleteBatches: BulkDeleteResponse;
  bulkHardDeleteChapters: BulkDeleteResponse;
  bulkHardDeleteCourses: BulkDeleteResponse;
  bulkHardDeleteModules: BulkDeleteResponse;
  bulkHardDeleteUsers: BulkDeleteResponse;
  bulkRemoveAssignments: BulkRemoveAssignmentsResponse;
  bulkRemoveAttendanceSessions: BulkRemoveAttendanceSessionsResponse;
  bulkRemoveBatches: BulkRemoveBatchesResponse;
  bulkRemoveChapters: Array<Chapter>;
  bulkRemoveCourses: BulkRemoveCoursesResponse;
  bulkRemoveEnrollments: BulkRemoveEnrollmentsResponse;
  bulkRemoveModules: BulkRemoveModulesResponse;
  bulkRemoveUsers: BulkRemoveUsersResponse;
  bulkRestoreAssignments: BulkRestoreResponse;
  bulkRestoreBatches: BulkRestoreResponse;
  bulkRestoreChapters: BulkRestoreResponse;
  bulkRestoreCourses: BulkRestoreResponse;
  bulkRestoreModules: BulkRestoreResponse;
  bulkRestoreUsers: BulkRestoreResponse;
  bulkSoftDeleteAssignments: BulkDeleteResponse;
  bulkSoftDeleteBatches: BulkDeleteResponse;
  bulkSoftDeleteChapters: BulkDeleteResponse;
  bulkSoftDeleteCourses: BulkDeleteResponse;
  bulkSoftDeleteModules: BulkDeleteResponse;
  bulkSoftDeleteUsers: BulkDeleteResponse;
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
  hardDeleteAssignment: HardDeleteResponse;
  hardDeleteBatch: HardDeleteResponse;
  hardDeleteChapter: HardDeleteResponse;
  hardDeleteCourse: HardDeleteResponse;
  hardDeleteModule: HardDeleteResponse;
  hardDeleteUser: HardDeleteResponse;
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
  restoreAssignment: RestoreResponse;
  restoreBatch: RestoreResponse;
  restoreChapter: RestoreResponse;
  restoreCourse: RestoreResponse;
  restoreModule: RestoreResponse;
  restoreUser: RestoreResponse;
  softDeleteAssignment: SoftDeleteResponse;
  softDeleteBatch: SoftDeleteResponse;
  softDeleteChapter: SoftDeleteResponse;
  softDeleteCourse: SoftDeleteResponse;
  softDeleteModule: SoftDeleteResponse;
  softDeleteUser: SoftDeleteResponse;
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


export type MutationBulkCreateUsersArgs = {
  bulkCreateUsersInput: BulkCreateUsersInput;
};


export type MutationBulkEnrollStudentsArgs = {
  bulkEnrollStudentsInput: BulkEnrollStudentsInput;
};


export type MutationBulkHardDeleteAssignmentsArgs = {
  input: BulkDeleteInput;
};


export type MutationBulkHardDeleteBatchesArgs = {
  input: BulkDeleteInput;
};


export type MutationBulkHardDeleteChaptersArgs = {
  input: BulkDeleteInput;
};


export type MutationBulkHardDeleteCoursesArgs = {
  input: BulkDeleteInput;
};


export type MutationBulkHardDeleteModulesArgs = {
  input: BulkDeleteInput;
};


export type MutationBulkHardDeleteUsersArgs = {
  force?: Scalars['Boolean']['input'];
  ids: Array<Scalars['String']['input']>;
};


export type MutationBulkRemoveAssignmentsArgs = {
  bulkRemoveAssignmentsInput: BulkRemoveAssignmentsInput;
};


export type MutationBulkRemoveAttendanceSessionsArgs = {
  bulkRemoveAttendanceSessionsInput: BulkRemoveAttendanceSessionsInput;
};


export type MutationBulkRemoveBatchesArgs = {
  bulkRemoveBatchesInput: BulkRemoveBatchesInput;
};


export type MutationBulkRemoveChaptersArgs = {
  bulkRemoveChaptersInput: BulkRemoveChaptersInput;
};


export type MutationBulkRemoveCoursesArgs = {
  bulkRemoveCoursesInput: BulkRemoveCoursesInput;
};


export type MutationBulkRemoveEnrollmentsArgs = {
  bulkRemoveEnrollmentsInput: BulkRemoveEnrollmentsInput;
};


export type MutationBulkRemoveModulesArgs = {
  bulkRemoveModulesInput: BulkRemoveModulesInput;
};


export type MutationBulkRemoveUsersArgs = {
  bulkRemoveUsersInput: BulkRemoveUsersInput;
};


export type MutationBulkRestoreAssignmentsArgs = {
  input: BulkRestoreInput;
};


export type MutationBulkRestoreBatchesArgs = {
  input: BulkRestoreInput;
};


export type MutationBulkRestoreChaptersArgs = {
  input: BulkRestoreInput;
};


export type MutationBulkRestoreCoursesArgs = {
  input: BulkRestoreInput;
};


export type MutationBulkRestoreModulesArgs = {
  input: BulkRestoreInput;
};


export type MutationBulkRestoreUsersArgs = {
  ids: Array<Scalars['String']['input']>;
};


export type MutationBulkSoftDeleteAssignmentsArgs = {
  input: BulkDeleteInput;
};


export type MutationBulkSoftDeleteBatchesArgs = {
  input: BulkDeleteInput;
};


export type MutationBulkSoftDeleteChaptersArgs = {
  input: BulkDeleteInput;
};


export type MutationBulkSoftDeleteCoursesArgs = {
  input: BulkDeleteInput;
};


export type MutationBulkSoftDeleteModulesArgs = {
  input: BulkDeleteInput;
};


export type MutationBulkSoftDeleteUsersArgs = {
  ids: Array<Scalars['String']['input']>;
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


export type MutationHardDeleteAssignmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationHardDeleteBatchArgs = {
  id: Scalars['ID']['input'];
};


export type MutationHardDeleteChapterArgs = {
  id: Scalars['ID']['input'];
};


export type MutationHardDeleteCourseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationHardDeleteModuleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationHardDeleteUserArgs = {
  force?: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
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


export type MutationRestoreAssignmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRestoreBatchArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRestoreChapterArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRestoreCourseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRestoreModuleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRestoreUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSoftDeleteAssignmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSoftDeleteBatchArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSoftDeleteChapterArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSoftDeleteCourseArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSoftDeleteModuleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationSoftDeleteUserArgs = {
  id: Scalars['ID']['input'];
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

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  isRead: Scalars['Boolean']['output'];
  message: Scalars['String']['output'];
  relatedId?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type: NotificationType;
  updatedAt: Scalars['DateTime']['output'];
  user?: Maybe<User>;
  userId: Scalars['String']['output'];
};

export type NotificationFilterInput = {
  createdBy?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isRead?: InputMaybe<Scalars['Boolean']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<NotificationType>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export enum NotificationType {
  Assignment = 'ASSIGNMENT',
  Attendance = 'ATTENDANCE',
  Course = 'COURSE',
  Grade = 'GRADE',
  System = 'SYSTEM'
}

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

export type PaginatedChapters = {
  __typename?: 'PaginatedChapters';
  data?: Maybe<Array<Maybe<Chapter>>>;
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

export type PaginatedModules = {
  __typename?: 'PaginatedModules';
  data?: Maybe<Array<Maybe<Module>>>;
  meta?: Maybe<PaginationMeta>;
};

export type PaginatedNotifications = {
  __typename?: 'PaginatedNotifications';
  data?: Maybe<Array<Maybe<Notification>>>;
  meta?: Maybe<PaginationMeta>;
};

export type PaginatedStudentProgress = {
  __typename?: 'PaginatedStudentProgress';
  data?: Maybe<Array<Maybe<StudentProgress>>>;
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
  chaptersPaginated: PaginatedChapters;
  checkEnrollmentAccess: Scalars['Boolean']['output'];
  course: Course;
  courseAnalytics: Scalars['String']['output'];
  courseBatches: Array<Batch>;
  courseProgress: Scalars['String']['output'];
  courses: PaginatedCourses;
  enrollment: Enrollment;
  enrollmentProgress: Scalars['String']['output'];
  enrollments: PaginatedEnrollments;
  findUserWithDeleted?: Maybe<User>;
  getDeletedAssignments: Array<Assignment>;
  getDeletedBatches: Array<Batch>;
  getDeletedChapters: Array<Chapter>;
  getDeletedCourses: Array<Course>;
  getDeletedModules: Array<Module>;
  getDeletedUsers: Array<User>;
  hasValidOfflineCache: Scalars['Boolean']['output'];
  me: User;
  module: Module;
  moduleProgress?: Maybe<StudentProgress>;
  modules: Array<Module>;
  modulesPaginated: PaginatedModules;
  myAnalytics: Scalars['String']['output'];
  myAssignments: PaginatedAssignments;
  myAttendance: Array<AttendanceRecord>;
  myCourses: PaginatedCourses;
  myEnrollments: Array<Enrollment>;
  myNotifications: PaginatedNotifications;
  myProgress: PaginatedStudentProgress;
  notifications: PaginatedNotifications;
  pendingGrading: PaginatedAssignmentSubmissions;
  progressAnalytics: Scalars['String']['output'];
  recentActivity: Scalars['String']['output'];
  studentAnalytics: Scalars['String']['output'];
  studentAttendance: Array<AttendanceRecord>;
  studentAttendanceStats: Scalars['String']['output'];
  studentEnrollments: Array<Enrollment>;
  studentProgress: PaginatedStudentProgress;
  students: Array<User>;
  systemOverview: Scalars['String']['output'];
  unreadNotificationCount: Scalars['Int']['output'];
  user: User;
  userStats: Scalars['String']['output'];
  users: PaginatedUsers;
  usersWithDeleted: PaginatedUsers;
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


export type QueryChaptersPaginatedArgs = {
  filter?: InputMaybe<ChapterFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
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


export type QueryFindUserWithDeletedArgs = {
  id: Scalars['ID']['input'];
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


export type QueryModulesPaginatedArgs = {
  filter?: InputMaybe<ModuleFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
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


export type QueryMyNotificationsArgs = {
  filter?: InputMaybe<NotificationFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryMyProgressArgs = {
  filter?: InputMaybe<StudentProgressFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryNotificationsArgs = {
  filter?: InputMaybe<NotificationFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
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


export type QueryStudentProgressArgs = {
  filter?: InputMaybe<StudentProgressFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUsersArgs = {
  filter?: InputMaybe<UserFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
};


export type QueryUsersWithDeletedArgs = {
  filter?: InputMaybe<UserFilterInput>;
  includeDeleted?: Scalars['Boolean']['input'];
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

export type RestoreOptionsInput = {
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type RestoreResponse = {
  __typename?: 'RestoreResponse';
  id: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
  restoredAt: Scalars['DateTime']['output'];
  restoredBy: Scalars['String']['output'];
};

export type SoftDeleteResponse = {
  __typename?: 'SoftDeleteResponse';
  deletedAt: Scalars['DateTime']['output'];
  deletedBy: Scalars['String']['output'];
  id: Scalars['String']['output'];
  message?: Maybe<Scalars['String']['output']>;
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

export type StudentProgressFilterInput = {
  createdBy?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['String']['input']>;
  enrollmentId?: InputMaybe<Scalars['String']['input']>;
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  isCompleted?: InputMaybe<Scalars['Boolean']['input']>;
  moduleId?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['String']['input']>;
  studentId?: InputMaybe<Scalars['String']['input']>;
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
  coverImage?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  thumbnail?: InputMaybe<Scalars['String']['input']>;
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
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
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

export type BulkRemoveAssignmentsMutationVariables = Exact<{
  bulkRemoveAssignmentsInput: BulkRemoveAssignmentsInput;
}>;


export type BulkRemoveAssignmentsMutation = { __typename?: 'Mutation', bulkRemoveAssignments: { __typename?: 'BulkRemoveAssignmentsResponse', success: boolean, deletedCount: number, deletedIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type SoftDeleteAssignmentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type SoftDeleteAssignmentMutation = { __typename?: 'Mutation', softDeleteAssignment: { __typename?: 'SoftDeleteResponse', deletedAt: any, deletedBy: string, id: string, message?: string | null } };

export type HardDeleteAssignmentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type HardDeleteAssignmentMutation = { __typename?: 'Mutation', hardDeleteAssignment: { __typename?: 'HardDeleteResponse', deleted: boolean, id: string, message?: string | null } };

export type RestoreAssignmentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RestoreAssignmentMutation = { __typename?: 'Mutation', restoreAssignment: { __typename?: 'RestoreResponse', restoredAt: any, restoredBy: string, id: string, message?: string | null } };

export type BulkSoftDeleteAssignmentsMutationVariables = Exact<{
  input: BulkDeleteInput;
}>;


export type BulkSoftDeleteAssignmentsMutation = { __typename?: 'Mutation', bulkSoftDeleteAssignments: { __typename?: 'BulkDeleteResponse', success: boolean, deletedCount: number, deletedIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type BulkHardDeleteAssignmentsMutationVariables = Exact<{
  input: BulkDeleteInput;
}>;


export type BulkHardDeleteAssignmentsMutation = { __typename?: 'Mutation', bulkHardDeleteAssignments: { __typename?: 'BulkDeleteResponse', success: boolean, deletedCount: number, deletedIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type BulkRestoreAssignmentsMutationVariables = Exact<{
  input: BulkRestoreInput;
}>;


export type BulkRestoreAssignmentsMutation = { __typename?: 'Mutation', bulkRestoreAssignments: { __typename?: 'BulkRestoreResponse', success: boolean, restoredCount: number, restoredIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

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

export type BulkRemoveAttendanceSessionsMutationVariables = Exact<{
  bulkRemoveAttendanceSessionsInput: BulkRemoveAttendanceSessionsInput;
}>;


export type BulkRemoveAttendanceSessionsMutation = { __typename?: 'Mutation', bulkRemoveAttendanceSessions: { __typename?: 'BulkRemoveAttendanceSessionsResponse', success: boolean, deletedCount: number, deletedIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type CreateBatchMutationVariables = Exact<{
  createBatchInput: CreateBatchInput;
}>;


export type CreateBatchMutation = { __typename?: 'Mutation', createBatch: { __typename?: 'Batch', courseId: string, createdAt: any, endDate?: any | null, id: string, isActive: boolean, name: string, startDate: any, updatedAt: any, course?: { __typename?: 'Course', id: string, title: string, description?: string | null, creator?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null } | null, enrollments?: Array<{ __typename?: 'Enrollment', id: string, enrollmentDate: any, status: string, studentId: string, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null }> | null } };

export type UpdateBatchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  updateBatchInput: UpdateBatchInput;
}>;


export type UpdateBatchMutation = { __typename?: 'Mutation', updateBatch: { __typename?: 'Batch', courseId: string, createdAt: any, endDate?: any | null, id: string, isActive: boolean, name: string, startDate: any, updatedAt: any, course?: { __typename?: 'Course', id: string, title: string, description?: string | null, creator?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null } | null, enrollments?: Array<{ __typename?: 'Enrollment', id: string, enrollmentDate: any, status: string, studentId: string, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null }> | null } };

export type RemoveBatchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveBatchMutation = { __typename?: 'Mutation', removeBatch: { __typename?: 'Batch', courseId: string, createdAt: any, endDate?: any | null, id: string, isActive: boolean, name: string, startDate: any, updatedAt: any, course?: { __typename?: 'Course', id: string, title: string, description?: string | null } | null } };

export type BulkRemoveBatchesMutationVariables = Exact<{
  bulkRemoveBatchesInput: BulkRemoveBatchesInput;
}>;


export type BulkRemoveBatchesMutation = { __typename?: 'Mutation', bulkRemoveBatches: { __typename?: 'BulkRemoveBatchesResponse', success: boolean, deletedCount: number, deletedIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type SoftDeleteBatchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type SoftDeleteBatchMutation = { __typename?: 'Mutation', softDeleteBatch: { __typename?: 'SoftDeleteResponse', deletedAt: any, deletedBy: string, id: string, message?: string | null } };

export type HardDeleteBatchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type HardDeleteBatchMutation = { __typename?: 'Mutation', hardDeleteBatch: { __typename?: 'HardDeleteResponse', deleted: boolean, id: string, message?: string | null } };

export type RestoreBatchMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RestoreBatchMutation = { __typename?: 'Mutation', restoreBatch: { __typename?: 'RestoreResponse', restoredAt: any, restoredBy: string, id: string, message?: string | null } };

export type BulkSoftDeleteBatchesMutationVariables = Exact<{
  input: BulkDeleteInput;
}>;


export type BulkSoftDeleteBatchesMutation = { __typename?: 'Mutation', bulkSoftDeleteBatches: { __typename?: 'BulkDeleteResponse', success: boolean, deletedCount: number, deletedIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type BulkHardDeleteBatchesMutationVariables = Exact<{
  input: BulkDeleteInput;
}>;


export type BulkHardDeleteBatchesMutation = { __typename?: 'Mutation', bulkHardDeleteBatches: { __typename?: 'BulkDeleteResponse', success: boolean, deletedCount: number, deletedIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type BulkRestoreBatchesMutationVariables = Exact<{
  input: BulkRestoreInput;
}>;


export type BulkRestoreBatchesMutation = { __typename?: 'Mutation', bulkRestoreBatches: { __typename?: 'BulkRestoreResponse', success: boolean, restoredCount: number, restoredIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type CreateChapterMutationVariables = Exact<{
  createChapterInput: CreateChapterInput;
}>;


export type CreateChapterMutation = { __typename?: 'Mutation', createChapter: { __typename?: 'Chapter', courseId: string, createdAt: any, id: string, orderIndex: number, title: string, updatedAt: any, course?: { __typename?: 'Course', id: string, title: string, description?: string | null, creator?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null } | null, modules?: Array<{ __typename?: 'Module', id: string, title: string, type: ModuleType, orderIndex: number, fileName?: string | null, fileUrl?: string | null, chapterId: string, createdAt: any, updatedAt: any, studentProgress?: Array<{ __typename?: 'StudentProgress', id: string, isCompleted: boolean, completedAt?: any | null, studentId: string, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null }> | null }> | null } };

export type UpdateChapterMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  updateChapterInput: UpdateChapterInput;
}>;


export type UpdateChapterMutation = { __typename?: 'Mutation', updateChapter: { __typename?: 'Chapter', courseId: string, createdAt: any, id: string, orderIndex: number, title: string, updatedAt: any, course?: { __typename?: 'Course', id: string, title: string, description?: string | null, creator?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null } | null, modules?: Array<{ __typename?: 'Module', id: string, title: string, type: ModuleType, orderIndex: number, fileName?: string | null, fileUrl?: string | null, chapterId: string, createdAt: any, updatedAt: any, studentProgress?: Array<{ __typename?: 'StudentProgress', id: string, isCompleted: boolean, completedAt?: any | null, studentId: string, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null }> | null }> | null } };

export type RemoveChapterMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveChapterMutation = { __typename?: 'Mutation', removeChapter: { __typename?: 'Chapter', courseId: string, createdAt: any, id: string, orderIndex: number, title: string, updatedAt: any, course?: { __typename?: 'Course', id: string, title: string, description?: string | null } | null } };

export type ReorderChaptersMutationVariables = Exact<{
  courseId: Scalars['ID']['input'];
  chapterIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type ReorderChaptersMutation = { __typename?: 'Mutation', reorderChapters: Array<{ __typename?: 'Chapter', courseId: string, createdAt: any, id: string, orderIndex: number, title: string, updatedAt: any }> };

export type BulkRemoveChaptersMutationVariables = Exact<{
  bulkRemoveChaptersInput: BulkRemoveChaptersInput;
}>;


export type BulkRemoveChaptersMutation = { __typename?: 'Mutation', bulkRemoveChapters: Array<{ __typename?: 'Chapter', courseId: string, createdAt: any, id: string, orderIndex: number, title: string, updatedAt: any, course?: { __typename?: 'Course', id: string, title: string, description?: string | null } | null }> };

export type SoftDeleteChapterMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type SoftDeleteChapterMutation = { __typename?: 'Mutation', softDeleteChapter: { __typename?: 'SoftDeleteResponse', deletedAt: any, id: string, message?: string | null } };

export type HardDeleteChapterMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type HardDeleteChapterMutation = { __typename?: 'Mutation', hardDeleteChapter: { __typename?: 'HardDeleteResponse', deleted: boolean, id: string, message?: string | null } };

export type RestoreChapterMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RestoreChapterMutation = { __typename?: 'Mutation', restoreChapter: { __typename?: 'RestoreResponse', restoredAt: any, id: string, message?: string | null } };

export type BulkSoftDeleteChaptersMutationVariables = Exact<{
  input: BulkDeleteInput;
}>;


export type BulkSoftDeleteChaptersMutation = { __typename?: 'Mutation', bulkSoftDeleteChapters: { __typename?: 'BulkDeleteResponse', success: boolean, deletedCount: number, deletedIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type BulkHardDeleteChaptersMutationVariables = Exact<{
  input: BulkDeleteInput;
}>;


export type BulkHardDeleteChaptersMutation = { __typename?: 'Mutation', bulkHardDeleteChapters: { __typename?: 'BulkDeleteResponse', success: boolean, deletedCount: number, deletedIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type BulkRestoreChaptersMutationVariables = Exact<{
  input: BulkRestoreInput;
}>;


export type BulkRestoreChaptersMutation = { __typename?: 'Mutation', bulkRestoreChapters: { __typename?: 'BulkRestoreResponse', success: boolean, restoredCount: number, restoredIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type CreateCourseMutationVariables = Exact<{
  createCourseInput: CreateCourseInput;
}>;


export type CreateCourseMutation = { __typename?: 'Mutation', createCourse: { __typename?: 'Course', createdAt: any, createdBy: string, description?: string | null, id: string, isActive: boolean, title: string, updatedAt: any, creator?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null, chapters?: Array<{ __typename?: 'Chapter', id: string, title: string, orderIndex: number, courseId: string, modules?: Array<{ __typename?: 'Module', id: string, title: string, type: ModuleType, orderIndex: number, fileName?: string | null, fileUrl?: string | null }> | null }> | null } };

export type UpdateCourseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  updateCourseInput: UpdateCourseInput;
}>;


export type UpdateCourseMutation = { __typename?: 'Mutation', updateCourse: { __typename?: 'Course', createdAt: any, createdBy: string, description?: string | null, id: string, isActive: boolean, title: string, updatedAt: any, creator?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null, chapters?: Array<{ __typename?: 'Chapter', id: string, title: string, orderIndex: number, courseId: string, modules?: Array<{ __typename?: 'Module', id: string, title: string, type: ModuleType, orderIndex: number, fileName?: string | null, fileUrl?: string | null }> | null }> | null } };

export type RemoveCourseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveCourseMutation = { __typename?: 'Mutation', removeCourse: { __typename?: 'Course', createdAt: any, createdBy: string, description?: string | null, id: string, isActive: boolean, title: string, updatedAt: any, creator?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null } };

export type BulkRemoveCoursesMutationVariables = Exact<{
  bulkRemoveCoursesInput: BulkRemoveCoursesInput;
}>;


export type BulkRemoveCoursesMutation = { __typename?: 'Mutation', bulkRemoveCourses: { __typename?: 'BulkRemoveCoursesResponse', success: boolean, deletedCount: number, deletedIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type SoftDeleteCourseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type SoftDeleteCourseMutation = { __typename?: 'Mutation', softDeleteCourse: { __typename?: 'SoftDeleteResponse', deletedAt: any, id: string, message?: string | null } };

export type HardDeleteCourseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type HardDeleteCourseMutation = { __typename?: 'Mutation', hardDeleteCourse: { __typename?: 'HardDeleteResponse', deleted: boolean, id: string, message?: string | null } };

export type RestoreCourseMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RestoreCourseMutation = { __typename?: 'Mutation', restoreCourse: { __typename?: 'RestoreResponse', restoredAt: any, id: string, message?: string | null } };

export type BulkSoftDeleteCoursesMutationVariables = Exact<{
  input: BulkDeleteInput;
}>;


export type BulkSoftDeleteCoursesMutation = { __typename?: 'Mutation', bulkSoftDeleteCourses: { __typename?: 'BulkDeleteResponse', success: boolean, deletedCount: number, deletedIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type BulkHardDeleteCoursesMutationVariables = Exact<{
  input: BulkDeleteInput;
}>;


export type BulkHardDeleteCoursesMutation = { __typename?: 'Mutation', bulkHardDeleteCourses: { __typename?: 'BulkDeleteResponse', success: boolean, deletedCount: number, deletedIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type BulkRestoreCoursesMutationVariables = Exact<{
  input: BulkRestoreInput;
}>;


export type BulkRestoreCoursesMutation = { __typename?: 'Mutation', bulkRestoreCourses: { __typename?: 'BulkRestoreResponse', success: boolean, restoredCount: number, restoredIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type EnrollStudentMutationVariables = Exact<{
  batchId: Scalars['ID']['input'];
  studentId: Scalars['ID']['input'];
}>;


export type EnrollStudentMutation = { __typename?: 'Mutation', enrollStudent: boolean };

export type UnenrollStudentMutationVariables = Exact<{
  batchId: Scalars['ID']['input'];
  studentId: Scalars['ID']['input'];
}>;


export type UnenrollStudentMutation = { __typename?: 'Mutation', unenrollStudent: boolean };

export type BulkEnrollStudentsMutationVariables = Exact<{
  bulkEnrollStudentsInput: BulkEnrollStudentsInput;
}>;


export type BulkEnrollStudentsMutation = { __typename?: 'Mutation', bulkEnrollStudents: boolean };

export type BulkRemoveEnrollmentsMutationVariables = Exact<{
  bulkRemoveEnrollmentsInput: BulkRemoveEnrollmentsInput;
}>;


export type BulkRemoveEnrollmentsMutation = { __typename?: 'Mutation', bulkRemoveEnrollments: { __typename?: 'BulkRemoveEnrollmentsResponse', success: boolean, deletedCount: number, deletedIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type CreateModuleMutationVariables = Exact<{
  createModuleInput: CreateModuleInput;
}>;


export type CreateModuleMutation = { __typename?: 'Mutation', createModule: { __typename?: 'Module', chapterId: string, createdAt: any, fileName?: string | null, fileUrl?: string | null, id: string, orderIndex: number, title: string, type: ModuleType, updatedAt: any, chapter?: { __typename?: 'Chapter', id: string, title: string, orderIndex: number, courseId: string, course?: { __typename?: 'Course', id: string, title: string } | null } | null, studentProgress?: Array<{ __typename?: 'StudentProgress', id: string, isCompleted: boolean, completedAt?: any | null, studentId: string, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null }> | null } };

export type UpdateModuleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  updateModuleInput: UpdateModuleInput;
}>;


export type UpdateModuleMutation = { __typename?: 'Mutation', updateModule: { __typename?: 'Module', chapterId: string, createdAt: any, fileName?: string | null, fileUrl?: string | null, id: string, orderIndex: number, title: string, type: ModuleType, updatedAt: any, chapter?: { __typename?: 'Chapter', id: string, title: string, orderIndex: number, courseId: string, course?: { __typename?: 'Course', id: string, title: string } | null } | null, studentProgress?: Array<{ __typename?: 'StudentProgress', id: string, isCompleted: boolean, completedAt?: any | null, studentId: string, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null }> | null } };

export type RemoveModuleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RemoveModuleMutation = { __typename?: 'Mutation', removeModule: { __typename?: 'Module', chapterId: string, createdAt: any, fileName?: string | null, fileUrl?: string | null, id: string, orderIndex: number, title: string, type: ModuleType, updatedAt: any, chapter?: { __typename?: 'Chapter', id: string, title: string, orderIndex: number } | null } };

export type ReorderModulesMutationVariables = Exact<{
  chapterId: Scalars['ID']['input'];
  moduleIds: Array<Scalars['ID']['input']> | Scalars['ID']['input'];
}>;


export type ReorderModulesMutation = { __typename?: 'Mutation', reorderModules: Array<{ __typename?: 'Module', chapterId: string, createdAt: any, fileName?: string | null, fileUrl?: string | null, id: string, orderIndex: number, title: string, type: ModuleType, updatedAt: any }> };

export type UpdateModuleProgressMutationVariables = Exact<{
  updateProgressInput: UpdateProgressInput;
}>;


export type UpdateModuleProgressMutation = { __typename?: 'Mutation', updateModuleProgress: { __typename?: 'StudentProgress', completedAt?: any | null, createdAt: any, id: string, isCompleted: boolean, moduleId: string, studentId: string, updatedAt: any, module?: { __typename?: 'Module', id: string, title: string, type: ModuleType, chapterId: string } | null, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null } };

export type GenerateSecureStreamUrlMutationVariables = Exact<{
  moduleId: Scalars['String']['input'];
}>;


export type GenerateSecureStreamUrlMutation = { __typename?: 'Mutation', generateSecureStreamUrl: string };

export type CreateOfflineCacheMutationVariables = Exact<{
  moduleId: Scalars['String']['input'];
  quality?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateOfflineCacheMutation = { __typename?: 'Mutation', createOfflineCache: string };

export type BulkRemoveModulesMutationVariables = Exact<{
  bulkRemoveModulesInput: BulkRemoveModulesInput;
}>;


export type BulkRemoveModulesMutation = { __typename?: 'Mutation', bulkRemoveModules: { __typename?: 'BulkRemoveModulesResponse', success: boolean, deletedCount: number, deletedIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type SoftDeleteModuleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type SoftDeleteModuleMutation = { __typename?: 'Mutation', softDeleteModule: { __typename?: 'SoftDeleteResponse', deletedAt: any, id: string, message?: string | null } };

export type HardDeleteModuleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type HardDeleteModuleMutation = { __typename?: 'Mutation', hardDeleteModule: { __typename?: 'HardDeleteResponse', deleted: boolean, id: string, message?: string | null } };

export type RestoreModuleMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RestoreModuleMutation = { __typename?: 'Mutation', restoreModule: { __typename?: 'RestoreResponse', restoredAt: any, id: string, message?: string | null } };

export type BulkSoftDeleteModulesMutationVariables = Exact<{
  input: BulkDeleteInput;
}>;


export type BulkSoftDeleteModulesMutation = { __typename?: 'Mutation', bulkSoftDeleteModules: { __typename?: 'BulkDeleteResponse', success: boolean, deletedCount: number, deletedIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type BulkHardDeleteModulesMutationVariables = Exact<{
  input: BulkDeleteInput;
}>;


export type BulkHardDeleteModulesMutation = { __typename?: 'Mutation', bulkHardDeleteModules: { __typename?: 'BulkDeleteResponse', success: boolean, deletedCount: number, deletedIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type BulkRestoreModulesMutationVariables = Exact<{
  input: BulkRestoreInput;
}>;


export type BulkRestoreModulesMutation = { __typename?: 'Mutation', bulkRestoreModules: { __typename?: 'BulkRestoreResponse', success: boolean, restoredCount: number, restoredIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type MarkNotificationAsReadMutationVariables = Exact<{
  notificationId: Scalars['ID']['input'];
}>;


export type MarkNotificationAsReadMutation = { __typename?: 'Mutation', markNotificationAsRead: boolean };

export type MarkAllNotificationsAsReadMutationVariables = Exact<{ [key: string]: never; }>;


export type MarkAllNotificationsAsReadMutation = { __typename?: 'Mutation', markAllNotificationsAsRead: boolean };

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

export type BulkCreateUsersMutationVariables = Exact<{
  bulkCreateUsersInput: BulkCreateUsersInput;
}>;


export type BulkCreateUsersMutation = { __typename?: 'Mutation', bulkCreateUsers: { __typename?: 'BulkCreateUsersResponse', successCount: number, failureCount: number, totalProcessed: number, failedUsers: Array<string>, createdUsers: Array<{ __typename?: 'User', createdAt: any, email: string, firstName: string, id: string, isActive: boolean, lastName: string, phone?: string | null, role: UserRole, updatedAt: any, username: string }> } };

export type BulkRemoveUsersMutationVariables = Exact<{
  bulkRemoveUsersInput: BulkRemoveUsersInput;
}>;


export type BulkRemoveUsersMutation = { __typename?: 'Mutation', bulkRemoveUsers: { __typename?: 'BulkRemoveUsersResponse', success: boolean, deletedCount: number, deletedIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type SoftDeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type SoftDeleteUserMutation = { __typename?: 'Mutation', softDeleteUser: { __typename?: 'SoftDeleteResponse', deletedAt: any, deletedBy: string, id: string, message?: string | null } };

export type HardDeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  force?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type HardDeleteUserMutation = { __typename?: 'Mutation', hardDeleteUser: { __typename?: 'HardDeleteResponse', deleted: boolean, id: string, message?: string | null } };

export type RestoreUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RestoreUserMutation = { __typename?: 'Mutation', restoreUser: { __typename?: 'RestoreResponse', restoredAt: any, restoredBy: string, id: string, message?: string | null } };

export type BulkSoftDeleteUsersMutationVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type BulkSoftDeleteUsersMutation = { __typename?: 'Mutation', bulkSoftDeleteUsers: { __typename?: 'BulkDeleteResponse', success: boolean, deletedCount: number, deletedIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type BulkHardDeleteUsersMutationVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
  force?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type BulkHardDeleteUsersMutation = { __typename?: 'Mutation', bulkHardDeleteUsers: { __typename?: 'BulkDeleteResponse', success: boolean, deletedCount: number, deletedIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type BulkRestoreUsersMutationVariables = Exact<{
  ids: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type BulkRestoreUsersMutation = { __typename?: 'Mutation', bulkRestoreUsers: { __typename?: 'BulkRestoreResponse', success: boolean, restoredCount: number, restoredIds: Array<string>, failedIds: Array<string>, errorMessages: Array<string> } };

export type MyAnalyticsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyAnalyticsQuery = { __typename?: 'Query', myAnalytics: string };

export type SystemOverviewQueryVariables = Exact<{ [key: string]: never; }>;


export type SystemOverviewQuery = { __typename?: 'Query', systemOverview: string };

export type RecentActivityQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type RecentActivityQuery = { __typename?: 'Query', recentActivity: string };

export type GlobalUserStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GlobalUserStatsQuery = { __typename?: 'Query', userStats: string };

export type StudentAnalyticsQueryVariables = Exact<{
  studentId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type StudentAnalyticsQuery = { __typename?: 'Query', studentAnalytics: string };

export type ProgressAnalyticsQueryVariables = Exact<{
  courseId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type ProgressAnalyticsQuery = { __typename?: 'Query', progressAnalytics: string };

export type AssignmentAnalyticsQueryVariables = Exact<{
  courseId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type AssignmentAnalyticsQuery = { __typename?: 'Query', assignmentAnalytics: string };

export type AssignmentStatsQueryVariables = Exact<{
  assignmentId: Scalars['ID']['input'];
}>;


export type AssignmentStatsQuery = { __typename?: 'Query', assignmentStats: string };

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

export type GetDeletedAssignmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDeletedAssignmentsQuery = { __typename?: 'Query', getDeletedAssignments: Array<{ __typename?: 'Assignment', id: string, title: string, description: string, batchId: string, dueDate?: any | null, isActive: boolean, createdAt: any, updatedAt: any, deletedAt?: any | null, deletedBy?: string | null, batch?: { __typename?: 'Batch', id: string, name: string } | null }> };

export type AttendanceSessionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AttendanceSessionQuery = { __typename?: 'Query', attendanceSession: { __typename?: 'AttendanceSession', batchId: string, createdAt: any, id: string, sessionDate: any, sessionTitle: string, updatedAt: any, batch?: { __typename?: 'Batch', id: string, name: string, course?: { __typename?: 'Course', id: string, title: string } | null } | null, attendanceRecords?: Array<{ __typename?: 'AttendanceRecord', createdAt: any, enrollmentId: string, id: string, isPresent: boolean, sessionId: string, studentId: string, updatedAt: any, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null, enrollment?: { __typename?: 'Enrollment', id: string, enrollmentDate: any, status: string } | null }> | null } };

export type AttendanceSessionsQueryVariables = Exact<{
  filter?: InputMaybe<AttendanceFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type AttendanceSessionsQuery = { __typename?: 'Query', attendanceSessions: { __typename?: 'PaginatedAttendanceSessions', data?: Array<{ __typename?: 'AttendanceSession', batchId: string, createdAt: any, id: string, sessionDate: any, sessionTitle: string, updatedAt: any, batch?: { __typename?: 'Batch', id: string, name: string, course?: { __typename?: 'Course', id: string, title: string } | null } | null } | null> | null, meta?: { __typename?: 'PaginationMeta', hasNext: boolean, hasPrev: boolean, limit: number, page: number, total: number, totalPages: number } | null } };

export type BatchAttendanceQueryVariables = Exact<{
  batchId: Scalars['ID']['input'];
}>;


export type BatchAttendanceQuery = { __typename?: 'Query', batchAttendance: Array<{ __typename?: 'AttendanceRecord', createdAt: any, enrollmentId: string, id: string, isPresent: boolean, sessionId: string, studentId: string, updatedAt: any, enrollment?: { __typename?: 'Enrollment', id: string, enrollmentDate: any, status: string, batch?: { __typename?: 'Batch', id: string, name: string } | null } | null, session?: { __typename?: 'AttendanceSession', id: string, sessionDate: any, sessionTitle: string, batchId: string } | null, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null }> };

export type BatchAttendanceSessionsQueryVariables = Exact<{
  batchId: Scalars['ID']['input'];
}>;


export type BatchAttendanceSessionsQuery = { __typename?: 'Query', batchAttendanceSessions: Array<{ __typename?: 'AttendanceSession', batchId: string, createdAt: any, id: string, sessionDate: any, sessionTitle: string, updatedAt: any, batch?: { __typename?: 'Batch', id: string, name: string } | null, attendanceRecords?: Array<{ __typename?: 'AttendanceRecord', id: string, isPresent: boolean, studentId: string, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null }> | null }> };

export type AttendanceAnalyticsQueryVariables = Exact<{
  batchId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type AttendanceAnalyticsQuery = { __typename?: 'Query', attendanceAnalytics: string };

export type AttendanceStatsQueryVariables = Exact<{
  batchId: Scalars['ID']['input'];
}>;


export type AttendanceStatsQuery = { __typename?: 'Query', attendanceStats: string };

export type BatchQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type BatchQuery = { __typename?: 'Query', batch: { __typename?: 'Batch', courseId: string, createdAt: any, endDate?: any | null, id: string, isActive: boolean, name: string, startDate: any, updatedAt: any, course?: { __typename?: 'Course', id: string, title: string, description?: string | null, isActive: boolean, creator?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null } | null, enrollments?: Array<{ __typename?: 'Enrollment', id: string, enrollmentDate: any, status: string, studentId: string, batchId: string, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string, phone?: string | null, role: UserRole } | null }> | null, attendanceSessions?: Array<{ __typename?: 'AttendanceSession', id: string, sessionDate: any, sessionTitle: string, batchId: string, attendanceRecords?: Array<{ __typename?: 'AttendanceRecord', id: string, isPresent: boolean, studentId: string, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null }> | null }> | null } };

export type BatchesQueryVariables = Exact<{
  filter?: InputMaybe<BatchFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type BatchesQuery = { __typename?: 'Query', batches: { __typename?: 'PaginatedBatches', data?: Array<{ __typename?: 'Batch', courseId: string, createdAt: any, endDate?: any | null, id: string, isActive: boolean, name: string, startDate: any, updatedAt: any, course?: { __typename?: 'Course', id: string, title: string, description?: string | null, creator?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null } | null } | null> | null, meta?: { __typename?: 'PaginationMeta', hasNext: boolean, hasPrev: boolean, limit: number, page: number, total: number, totalPages: number } | null } };

export type CourseBatchesQueryVariables = Exact<{
  courseId: Scalars['ID']['input'];
}>;


export type CourseBatchesQuery = { __typename?: 'Query', courseBatches: Array<{ __typename?: 'Batch', courseId: string, createdAt: any, endDate?: any | null, id: string, isActive: boolean, name: string, startDate: any, updatedAt: any, course?: { __typename?: 'Course', id: string, title: string, description?: string | null } | null, enrollments?: Array<{ __typename?: 'Enrollment', id: string, enrollmentDate: any, status: string, studentId: string, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null }> | null }> };

export type BatchEnrollmentsQueryVariables = Exact<{
  batchId: Scalars['ID']['input'];
}>;


export type BatchEnrollmentsQuery = { __typename?: 'Query', batchEnrollments: Array<{ __typename?: 'Enrollment', id: string, enrollmentDate: any, status: string, studentId: string, batchId: string, createdAt: any, updatedAt: any, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string, phone?: string | null, role: UserRole, isActive: boolean } | null, batch?: { __typename?: 'Batch', id: string, name: string, startDate: any, endDate?: any | null, course?: { __typename?: 'Course', id: string, title: string } | null } | null }> };

export type BatchStatsQueryVariables = Exact<{
  batchId: Scalars['ID']['input'];
}>;


export type BatchStatsQuery = { __typename?: 'Query', batchStats: string };

export type GetDeletedBatchesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDeletedBatchesQuery = { __typename?: 'Query', getDeletedBatches: Array<{ __typename?: 'Batch', id: string, name: string, courseId: string, startDate: any, endDate?: any | null, isActive: boolean, createdAt: any, updatedAt: any, deletedAt?: any | null, deletedBy?: string | null, course?: { __typename?: 'Course', id: string, title: string } | null }> };

export type ChapterQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ChapterQuery = { __typename?: 'Query', chapter: { __typename?: 'Chapter', courseId: string, createdAt: any, id: string, orderIndex: number, title: string, updatedAt: any, course?: { __typename?: 'Course', id: string, title: string, description?: string | null, isActive: boolean, createdBy: string, creator?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string, role: UserRole } | null } | null, modules?: Array<{ __typename?: 'Module', id: string, title: string, type: ModuleType, orderIndex: number, fileName?: string | null, fileUrl?: string | null, chapterId: string, createdAt: any, updatedAt: any, studentProgress?: Array<{ __typename?: 'StudentProgress', completedAt?: any | null, createdAt: any, id: string, isCompleted: boolean, moduleId: string, studentId: string, updatedAt: any, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null }> | null }> | null } };

export type ChaptersQueryVariables = Exact<{
  courseId: Scalars['ID']['input'];
}>;


export type ChaptersQuery = { __typename?: 'Query', chapters: Array<{ __typename?: 'Chapter', courseId: string, createdAt: any, id: string, orderIndex: number, title: string, updatedAt: any, course?: { __typename?: 'Course', id: string, title: string, description?: string | null, creator?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null } | null, modules?: Array<{ __typename?: 'Module', id: string, title: string, type: ModuleType, orderIndex: number, fileName?: string | null, fileUrl?: string | null, chapterId: string, createdAt: any, updatedAt: any, studentProgress?: Array<{ __typename?: 'StudentProgress', id: string, isCompleted: boolean, completedAt?: any | null, studentId: string, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null }> | null }> | null }> };

export type GetDeletedChaptersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDeletedChaptersQuery = { __typename?: 'Query', getDeletedChapters: Array<{ __typename?: 'Chapter', id: string, title: string, courseId: string, orderIndex: number, createdAt: any, updatedAt: any, deletedAt?: any | null, deletedBy?: string | null, course?: { __typename?: 'Course', id: string, title: string } | null }> };

export type ChaptersPaginatedQueryVariables = Exact<{
  filter?: InputMaybe<ChapterFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type ChaptersPaginatedQuery = { __typename?: 'Query', chaptersPaginated: { __typename?: 'PaginatedChapters', data?: Array<{ __typename?: 'Chapter', id: string, title: string, courseId: string, orderIndex: number, createdAt: any, updatedAt: any, course?: { __typename?: 'Course', id: string, title: string, description?: string | null, creator?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null } | null, modules?: Array<{ __typename?: 'Module', id: string, title: string, type: ModuleType, orderIndex: number, fileName?: string | null, fileUrl?: string | null }> | null } | null> | null, meta?: { __typename?: 'PaginationMeta', total: number, page: number, limit: number, totalPages: number, hasNext: boolean, hasPrev: boolean } | null } };

export type CourseQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type CourseQuery = { __typename?: 'Query', course: { __typename?: 'Course', createdAt: any, createdBy: string, description?: string | null, id: string, isActive: boolean, title: string, updatedAt: any, creator?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string, role: UserRole } | null, chapters?: Array<{ __typename?: 'Chapter', id: string, title: string, orderIndex: number, courseId: string, createdAt: any, updatedAt: any, modules?: Array<{ __typename?: 'Module', id: string, title: string, type: ModuleType, orderIndex: number, fileName?: string | null, fileUrl?: string | null, chapterId: string, createdAt: any, updatedAt: any, studentProgress?: Array<{ __typename?: 'StudentProgress', id: string, isCompleted: boolean, completedAt?: any | null, studentId: string, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null }> | null }> | null }> | null } };

export type CoursesQueryVariables = Exact<{
  filter?: InputMaybe<CourseFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type CoursesQuery = { __typename?: 'Query', courses: { __typename?: 'PaginatedCourses', data?: Array<{ __typename?: 'Course', createdAt: any, createdBy: string, description?: string | null, id: string, isActive: boolean, title: string, updatedAt: any, creator?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null, chapters?: Array<{ __typename?: 'Chapter', id: string, title: string, orderIndex: number }> | null } | null> | null, meta?: { __typename?: 'PaginationMeta', hasNext: boolean, hasPrev: boolean, limit: number, page: number, total: number, totalPages: number } | null } };

export type MyCoursesQueryVariables = Exact<{
  filter?: InputMaybe<CourseFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type MyCoursesQuery = { __typename?: 'Query', myCourses: { __typename?: 'PaginatedCourses', data?: Array<{ __typename?: 'Course', createdAt: any, createdBy: string, description?: string | null, id: string, isActive: boolean, title: string, updatedAt: any, creator?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null, chapters?: Array<{ __typename?: 'Chapter', id: string, title: string, orderIndex: number, modules?: Array<{ __typename?: 'Module', id: string, title: string, type: ModuleType, orderIndex: number }> | null }> | null } | null> | null, meta?: { __typename?: 'PaginationMeta', hasNext: boolean, hasPrev: boolean, limit: number, page: number, total: number, totalPages: number } | null } };

export type CourseProgressQueryVariables = Exact<{
  courseId: Scalars['ID']['input'];
}>;


export type CourseProgressQuery = { __typename?: 'Query', courseProgress: string };

export type CourseAnalyticsQueryVariables = Exact<{
  courseId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CourseAnalyticsQuery = { __typename?: 'Query', courseAnalytics: string };

export type CheckEnrollmentAccessQueryVariables = Exact<{
  courseId: Scalars['ID']['input'];
}>;


export type CheckEnrollmentAccessQuery = { __typename?: 'Query', checkEnrollmentAccess: boolean };

export type GetDeletedCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDeletedCoursesQuery = { __typename?: 'Query', getDeletedCourses: Array<{ __typename?: 'Course', id: string, title: string, description?: string | null, isActive: boolean, createdBy: string, createdAt: any, updatedAt: any, deletedAt?: any | null, deletedBy?: string | null, creator?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null }> };

export type EnrollmentQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type EnrollmentQuery = { __typename?: 'Query', enrollment: { __typename?: 'Enrollment', batchId: string, createdAt: any, enrollmentDate: any, id: string, status: string, studentId: string, updatedAt: any, batch?: { __typename?: 'Batch', id: string, name: string, startDate: any, endDate?: any | null, course?: { __typename?: 'Course', id: string, title: string, description?: string | null } | null } | null, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string, phone?: string | null, role: UserRole } | null } };

export type EnrollmentsQueryVariables = Exact<{
  filter?: InputMaybe<EnrollmentFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type EnrollmentsQuery = { __typename?: 'Query', enrollments: { __typename?: 'PaginatedEnrollments', data?: Array<{ __typename?: 'Enrollment', batchId: string, createdAt: any, enrollmentDate: any, id: string, status: string, studentId: string, updatedAt: any, batch?: { __typename?: 'Batch', id: string, name: string, startDate: any, endDate?: any | null, course?: { __typename?: 'Course', id: string, title: string } | null } | null, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null } | null> | null, meta?: { __typename?: 'PaginationMeta', hasNext: boolean, hasPrev: boolean, limit: number, page: number, total: number, totalPages: number } | null } };

export type MyEnrollmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyEnrollmentsQuery = { __typename?: 'Query', myEnrollments: Array<{ __typename?: 'Enrollment', batchId: string, createdAt: any, enrollmentDate: any, id: string, status: string, studentId: string, updatedAt: any, batch?: { __typename?: 'Batch', id: string, name: string, startDate: any, endDate?: any | null, course?: { __typename?: 'Course', id: string, title: string, description?: string | null, creator?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null } | null } | null }> };

export type StudentEnrollmentsQueryVariables = Exact<{
  studentId: Scalars['ID']['input'];
}>;


export type StudentEnrollmentsQuery = { __typename?: 'Query', studentEnrollments: Array<{ __typename?: 'Enrollment', batchId: string, createdAt: any, enrollmentDate: any, id: string, status: string, studentId: string, updatedAt: any, batch?: { __typename?: 'Batch', id: string, name: string, startDate: any, endDate?: any | null, course?: { __typename?: 'Course', id: string, title: string, description?: string | null } | null } | null, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null }> };

export type EnrollmentProgressQueryVariables = Exact<{
  enrollmentId: Scalars['ID']['input'];
}>;


export type EnrollmentProgressQuery = { __typename?: 'Query', enrollmentProgress: string };

export type ModuleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ModuleQuery = { __typename?: 'Query', module: { __typename?: 'Module', chapterId: string, createdAt: any, fileName?: string | null, fileUrl?: string | null, id: string, orderIndex: number, title: string, type: ModuleType, updatedAt: any, chapter?: { __typename?: 'Chapter', id: string, title: string, orderIndex: number, courseId: string, course?: { __typename?: 'Course', id: string, title: string, description?: string | null, creator?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null } | null } | null, studentProgress?: Array<{ __typename?: 'StudentProgress', completedAt?: any | null, createdAt: any, id: string, isCompleted: boolean, moduleId: string, studentId: string, updatedAt: any, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null }> | null } };

export type ModulesQueryVariables = Exact<{
  chapterId: Scalars['ID']['input'];
}>;


export type ModulesQuery = { __typename?: 'Query', modules: Array<{ __typename?: 'Module', chapterId: string, createdAt: any, fileName?: string | null, fileUrl?: string | null, id: string, orderIndex: number, title: string, type: ModuleType, updatedAt: any, chapter?: { __typename?: 'Chapter', id: string, title: string, orderIndex: number, courseId: string } | null, studentProgress?: Array<{ __typename?: 'StudentProgress', id: string, isCompleted: boolean, completedAt?: any | null, studentId: string, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null }> | null }> };

export type ModuleProgressQueryVariables = Exact<{
  moduleId: Scalars['ID']['input'];
}>;


export type ModuleProgressQuery = { __typename?: 'Query', moduleProgress?: { __typename?: 'StudentProgress', completedAt?: any | null, createdAt: any, id: string, isCompleted: boolean, moduleId: string, studentId: string, updatedAt: any, module?: { __typename?: 'Module', id: string, title: string, type: ModuleType, fileName?: string | null, fileUrl?: string | null, orderIndex: number, chapter?: { __typename?: 'Chapter', id: string, title: string, course?: { __typename?: 'Course', id: string, title: string } | null } | null } | null, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null } | null };

export type HasValidOfflineCacheQueryVariables = Exact<{
  moduleId: Scalars['String']['input'];
}>;


export type HasValidOfflineCacheQuery = { __typename?: 'Query', hasValidOfflineCache: boolean };

export type GetDeletedModulesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDeletedModulesQuery = { __typename?: 'Query', getDeletedModules: Array<{ __typename?: 'Module', id: string, title: string, type: ModuleType, chapterId: string, orderIndex: number, fileName?: string | null, fileUrl?: string | null, createdAt: any, updatedAt: any, deletedAt?: any | null, deletedBy?: string | null, chapter?: { __typename?: 'Chapter', id: string, title: string, courseId: string } | null }> };

export type ModulesPaginatedQueryVariables = Exact<{
  filter?: InputMaybe<ModuleFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type ModulesPaginatedQuery = { __typename?: 'Query', modulesPaginated: { __typename?: 'PaginatedModules', data?: Array<{ __typename?: 'Module', id: string, title: string, type: ModuleType, chapterId: string, orderIndex: number, fileName?: string | null, fileUrl?: string | null, createdAt: any, updatedAt: any, chapter?: { __typename?: 'Chapter', id: string, title: string, orderIndex: number, courseId: string, course?: { __typename?: 'Course', id: string, title: string } | null } | null, studentProgress?: Array<{ __typename?: 'StudentProgress', id: string, isCompleted: boolean, completedAt?: any | null, studentId: string, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null }> | null } | null> | null, meta?: { __typename?: 'PaginationMeta', total: number, page: number, limit: number, totalPages: number, hasNext: boolean, hasPrev: boolean } | null } };

export type NotificationsQueryVariables = Exact<{
  filter?: InputMaybe<NotificationFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type NotificationsQuery = { __typename?: 'Query', notifications: { __typename?: 'PaginatedNotifications', data?: Array<{ __typename?: 'Notification', id: string, title: string, message: string, type: NotificationType, isRead: boolean, relatedId?: string | null, userId: string, createdAt: any, updatedAt: any, user?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null } | null> | null, meta?: { __typename?: 'PaginationMeta', total: number, page: number, limit: number, totalPages: number, hasNext: boolean, hasPrev: boolean } | null } };

export type MyNotificationsQueryVariables = Exact<{
  filter?: InputMaybe<NotificationFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type MyNotificationsQuery = { __typename?: 'Query', myNotifications: { __typename?: 'PaginatedNotifications', data?: Array<{ __typename?: 'Notification', id: string, title: string, message: string, type: NotificationType, isRead: boolean, relatedId?: string | null, userId: string, createdAt: any, updatedAt: any, user?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null } | null> | null, meta?: { __typename?: 'PaginationMeta', total: number, page: number, limit: number, totalPages: number, hasNext: boolean, hasPrev: boolean } | null } };

export type UnreadNotificationCountQueryVariables = Exact<{ [key: string]: never; }>;


export type UnreadNotificationCountQuery = { __typename?: 'Query', unreadNotificationCount: number };

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

export type FindUserWithDeletedQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FindUserWithDeletedQuery = { __typename?: 'Query', findUserWithDeleted?: { __typename?: 'User', id: string, username: string, email: string, firstName: string, lastName: string, phone?: string | null, role: UserRole, isActive: boolean, createdAt: any, updatedAt: any } | null };

export type UsersWithDeletedQueryVariables = Exact<{
  filter?: InputMaybe<UserFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type UsersWithDeletedQuery = { __typename?: 'Query', usersWithDeleted: { __typename?: 'PaginatedUsers', data?: Array<{ __typename?: 'User', id: string, username: string, email: string, firstName: string, lastName: string, phone?: string | null, role: UserRole, isActive: boolean, createdAt: any, updatedAt: any } | null> | null, meta?: { __typename?: 'PaginationMeta', total: number, page: number, limit: number, totalPages: number, hasNext: boolean, hasPrev: boolean } | null } };

export type UserStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserStatsQuery = { __typename?: 'Query', userStats: string };

export type GetDeletedUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDeletedUsersQuery = { __typename?: 'Query', getDeletedUsers: Array<{ __typename?: 'User', id: string, username: string, email: string, firstName: string, lastName: string, phone?: string | null, role: UserRole, isActive: boolean, createdAt: any, updatedAt: any }> };

export type StudentAttendanceQueryVariables = Exact<{
  studentId: Scalars['ID']['input'];
}>;


export type StudentAttendanceQuery = { __typename?: 'Query', studentAttendance: Array<{ __typename?: 'AttendanceRecord', id: string, isPresent: boolean, sessionId: string, studentId: string, enrollmentId: string, createdAt: any, updatedAt: any, session?: { __typename?: 'AttendanceSession', id: string, sessionTitle: string, sessionDate: any, batch?: { __typename?: 'Batch', id: string, name: string, course?: { __typename?: 'Course', id: string, title: string } | null } | null } | null, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null, enrollment?: { __typename?: 'Enrollment', id: string, enrollmentDate: any, status: string } | null }> };

export type StudentAttendanceStatsQueryVariables = Exact<{
  studentId: Scalars['ID']['input'];
  batchId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type StudentAttendanceStatsQuery = { __typename?: 'Query', studentAttendanceStats: string };

export type StudentProgressQueryVariables = Exact<{
  filter?: InputMaybe<StudentProgressFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type StudentProgressQuery = { __typename?: 'Query', studentProgress: { __typename?: 'PaginatedStudentProgress', data?: Array<{ __typename?: 'StudentProgress', id: string, moduleId: string, studentId: string, isCompleted: boolean, completedAt?: any | null, createdAt: any, updatedAt: any, module?: { __typename?: 'Module', id: string, title: string, type: ModuleType, fileName?: string | null, fileUrl?: string | null, orderIndex: number, chapter?: { __typename?: 'Chapter', id: string, title: string, orderIndex: number, course?: { __typename?: 'Course', id: string, title: string } | null } | null } | null, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string, email: string } | null } | null> | null, meta?: { __typename?: 'PaginationMeta', total: number, page: number, limit: number, totalPages: number, hasNext: boolean, hasPrev: boolean } | null } };

export type MyAttendanceQueryVariables = Exact<{ [key: string]: never; }>;


export type MyAttendanceQuery = { __typename?: 'Query', myAttendance: Array<{ __typename?: 'AttendanceRecord', id: string, isPresent: boolean, sessionId: string, studentId: string, enrollmentId: string, createdAt: any, updatedAt: any, session?: { __typename?: 'AttendanceSession', id: string, sessionTitle: string, sessionDate: any, batch?: { __typename?: 'Batch', id: string, name: string, course?: { __typename?: 'Course', id: string, title: string } | null } | null } | null, enrollment?: { __typename?: 'Enrollment', id: string, enrollmentDate: any, status: string } | null }> };

export type MyProgressQueryVariables = Exact<{
  filter?: InputMaybe<StudentProgressFilterInput>;
  pagination?: InputMaybe<PaginationInput>;
  sort?: InputMaybe<SortInput>;
}>;


export type MyProgressQuery = { __typename?: 'Query', myProgress: { __typename?: 'PaginatedStudentProgress', data?: Array<{ __typename?: 'StudentProgress', id: string, moduleId: string, studentId: string, isCompleted: boolean, completedAt?: any | null, createdAt: any, updatedAt: any, module?: { __typename?: 'Module', id: string, title: string, type: ModuleType, fileName?: string | null, fileUrl?: string | null, orderIndex: number, chapter?: { __typename?: 'Chapter', id: string, title: string, orderIndex: number, course?: { __typename?: 'Course', id: string, title: string } | null } | null } | null, student?: { __typename?: 'User', id: string, firstName: string, lastName: string, username: string } | null } | null> | null, meta?: { __typename?: 'PaginationMeta', total: number, page: number, limit: number, totalPages: number, hasNext: boolean, hasPrev: boolean } | null } };


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
export const BulkRemoveAssignmentsDocument = gql`
    mutation BulkRemoveAssignments($bulkRemoveAssignmentsInput: BulkRemoveAssignmentsInput!) {
  bulkRemoveAssignments(bulkRemoveAssignmentsInput: $bulkRemoveAssignmentsInput) {
    success
    deletedCount
    deletedIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkRemoveAssignmentsMutationFn = Apollo.MutationFunction<BulkRemoveAssignmentsMutation, BulkRemoveAssignmentsMutationVariables>;

/**
 * __useBulkRemoveAssignmentsMutation__
 *
 * To run a mutation, you first call `useBulkRemoveAssignmentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkRemoveAssignmentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkRemoveAssignmentsMutation, { data, loading, error }] = useBulkRemoveAssignmentsMutation({
 *   variables: {
 *      bulkRemoveAssignmentsInput: // value for 'bulkRemoveAssignmentsInput'
 *   },
 * });
 */
export function useBulkRemoveAssignmentsMutation(baseOptions?: Apollo.MutationHookOptions<BulkRemoveAssignmentsMutation, BulkRemoveAssignmentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkRemoveAssignmentsMutation, BulkRemoveAssignmentsMutationVariables>(BulkRemoveAssignmentsDocument, options);
      }
export type BulkRemoveAssignmentsMutationHookResult = ReturnType<typeof useBulkRemoveAssignmentsMutation>;
export type BulkRemoveAssignmentsMutationResult = Apollo.MutationResult<BulkRemoveAssignmentsMutation>;
export type BulkRemoveAssignmentsMutationOptions = Apollo.BaseMutationOptions<BulkRemoveAssignmentsMutation, BulkRemoveAssignmentsMutationVariables>;
export const SoftDeleteAssignmentDocument = gql`
    mutation SoftDeleteAssignment($id: ID!) {
  softDeleteAssignment(id: $id) {
    deletedAt
    deletedBy
    id
    message
  }
}
    `;
export type SoftDeleteAssignmentMutationFn = Apollo.MutationFunction<SoftDeleteAssignmentMutation, SoftDeleteAssignmentMutationVariables>;

/**
 * __useSoftDeleteAssignmentMutation__
 *
 * To run a mutation, you first call `useSoftDeleteAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSoftDeleteAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [softDeleteAssignmentMutation, { data, loading, error }] = useSoftDeleteAssignmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSoftDeleteAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<SoftDeleteAssignmentMutation, SoftDeleteAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SoftDeleteAssignmentMutation, SoftDeleteAssignmentMutationVariables>(SoftDeleteAssignmentDocument, options);
      }
export type SoftDeleteAssignmentMutationHookResult = ReturnType<typeof useSoftDeleteAssignmentMutation>;
export type SoftDeleteAssignmentMutationResult = Apollo.MutationResult<SoftDeleteAssignmentMutation>;
export type SoftDeleteAssignmentMutationOptions = Apollo.BaseMutationOptions<SoftDeleteAssignmentMutation, SoftDeleteAssignmentMutationVariables>;
export const HardDeleteAssignmentDocument = gql`
    mutation HardDeleteAssignment($id: ID!) {
  hardDeleteAssignment(id: $id) {
    deleted
    id
    message
  }
}
    `;
export type HardDeleteAssignmentMutationFn = Apollo.MutationFunction<HardDeleteAssignmentMutation, HardDeleteAssignmentMutationVariables>;

/**
 * __useHardDeleteAssignmentMutation__
 *
 * To run a mutation, you first call `useHardDeleteAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHardDeleteAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hardDeleteAssignmentMutation, { data, loading, error }] = useHardDeleteAssignmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHardDeleteAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<HardDeleteAssignmentMutation, HardDeleteAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HardDeleteAssignmentMutation, HardDeleteAssignmentMutationVariables>(HardDeleteAssignmentDocument, options);
      }
export type HardDeleteAssignmentMutationHookResult = ReturnType<typeof useHardDeleteAssignmentMutation>;
export type HardDeleteAssignmentMutationResult = Apollo.MutationResult<HardDeleteAssignmentMutation>;
export type HardDeleteAssignmentMutationOptions = Apollo.BaseMutationOptions<HardDeleteAssignmentMutation, HardDeleteAssignmentMutationVariables>;
export const RestoreAssignmentDocument = gql`
    mutation RestoreAssignment($id: ID!) {
  restoreAssignment(id: $id) {
    restoredAt
    restoredBy
    id
    message
  }
}
    `;
export type RestoreAssignmentMutationFn = Apollo.MutationFunction<RestoreAssignmentMutation, RestoreAssignmentMutationVariables>;

/**
 * __useRestoreAssignmentMutation__
 *
 * To run a mutation, you first call `useRestoreAssignmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreAssignmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreAssignmentMutation, { data, loading, error }] = useRestoreAssignmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRestoreAssignmentMutation(baseOptions?: Apollo.MutationHookOptions<RestoreAssignmentMutation, RestoreAssignmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestoreAssignmentMutation, RestoreAssignmentMutationVariables>(RestoreAssignmentDocument, options);
      }
export type RestoreAssignmentMutationHookResult = ReturnType<typeof useRestoreAssignmentMutation>;
export type RestoreAssignmentMutationResult = Apollo.MutationResult<RestoreAssignmentMutation>;
export type RestoreAssignmentMutationOptions = Apollo.BaseMutationOptions<RestoreAssignmentMutation, RestoreAssignmentMutationVariables>;
export const BulkSoftDeleteAssignmentsDocument = gql`
    mutation BulkSoftDeleteAssignments($input: BulkDeleteInput!) {
  bulkSoftDeleteAssignments(input: $input) {
    success
    deletedCount
    deletedIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkSoftDeleteAssignmentsMutationFn = Apollo.MutationFunction<BulkSoftDeleteAssignmentsMutation, BulkSoftDeleteAssignmentsMutationVariables>;

/**
 * __useBulkSoftDeleteAssignmentsMutation__
 *
 * To run a mutation, you first call `useBulkSoftDeleteAssignmentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkSoftDeleteAssignmentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkSoftDeleteAssignmentsMutation, { data, loading, error }] = useBulkSoftDeleteAssignmentsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkSoftDeleteAssignmentsMutation(baseOptions?: Apollo.MutationHookOptions<BulkSoftDeleteAssignmentsMutation, BulkSoftDeleteAssignmentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkSoftDeleteAssignmentsMutation, BulkSoftDeleteAssignmentsMutationVariables>(BulkSoftDeleteAssignmentsDocument, options);
      }
export type BulkSoftDeleteAssignmentsMutationHookResult = ReturnType<typeof useBulkSoftDeleteAssignmentsMutation>;
export type BulkSoftDeleteAssignmentsMutationResult = Apollo.MutationResult<BulkSoftDeleteAssignmentsMutation>;
export type BulkSoftDeleteAssignmentsMutationOptions = Apollo.BaseMutationOptions<BulkSoftDeleteAssignmentsMutation, BulkSoftDeleteAssignmentsMutationVariables>;
export const BulkHardDeleteAssignmentsDocument = gql`
    mutation BulkHardDeleteAssignments($input: BulkDeleteInput!) {
  bulkHardDeleteAssignments(input: $input) {
    success
    deletedCount
    deletedIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkHardDeleteAssignmentsMutationFn = Apollo.MutationFunction<BulkHardDeleteAssignmentsMutation, BulkHardDeleteAssignmentsMutationVariables>;

/**
 * __useBulkHardDeleteAssignmentsMutation__
 *
 * To run a mutation, you first call `useBulkHardDeleteAssignmentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkHardDeleteAssignmentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkHardDeleteAssignmentsMutation, { data, loading, error }] = useBulkHardDeleteAssignmentsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkHardDeleteAssignmentsMutation(baseOptions?: Apollo.MutationHookOptions<BulkHardDeleteAssignmentsMutation, BulkHardDeleteAssignmentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkHardDeleteAssignmentsMutation, BulkHardDeleteAssignmentsMutationVariables>(BulkHardDeleteAssignmentsDocument, options);
      }
export type BulkHardDeleteAssignmentsMutationHookResult = ReturnType<typeof useBulkHardDeleteAssignmentsMutation>;
export type BulkHardDeleteAssignmentsMutationResult = Apollo.MutationResult<BulkHardDeleteAssignmentsMutation>;
export type BulkHardDeleteAssignmentsMutationOptions = Apollo.BaseMutationOptions<BulkHardDeleteAssignmentsMutation, BulkHardDeleteAssignmentsMutationVariables>;
export const BulkRestoreAssignmentsDocument = gql`
    mutation BulkRestoreAssignments($input: BulkRestoreInput!) {
  bulkRestoreAssignments(input: $input) {
    success
    restoredCount
    restoredIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkRestoreAssignmentsMutationFn = Apollo.MutationFunction<BulkRestoreAssignmentsMutation, BulkRestoreAssignmentsMutationVariables>;

/**
 * __useBulkRestoreAssignmentsMutation__
 *
 * To run a mutation, you first call `useBulkRestoreAssignmentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkRestoreAssignmentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkRestoreAssignmentsMutation, { data, loading, error }] = useBulkRestoreAssignmentsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkRestoreAssignmentsMutation(baseOptions?: Apollo.MutationHookOptions<BulkRestoreAssignmentsMutation, BulkRestoreAssignmentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkRestoreAssignmentsMutation, BulkRestoreAssignmentsMutationVariables>(BulkRestoreAssignmentsDocument, options);
      }
export type BulkRestoreAssignmentsMutationHookResult = ReturnType<typeof useBulkRestoreAssignmentsMutation>;
export type BulkRestoreAssignmentsMutationResult = Apollo.MutationResult<BulkRestoreAssignmentsMutation>;
export type BulkRestoreAssignmentsMutationOptions = Apollo.BaseMutationOptions<BulkRestoreAssignmentsMutation, BulkRestoreAssignmentsMutationVariables>;
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
export const BulkRemoveAttendanceSessionsDocument = gql`
    mutation BulkRemoveAttendanceSessions($bulkRemoveAttendanceSessionsInput: BulkRemoveAttendanceSessionsInput!) {
  bulkRemoveAttendanceSessions(
    bulkRemoveAttendanceSessionsInput: $bulkRemoveAttendanceSessionsInput
  ) {
    success
    deletedCount
    deletedIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkRemoveAttendanceSessionsMutationFn = Apollo.MutationFunction<BulkRemoveAttendanceSessionsMutation, BulkRemoveAttendanceSessionsMutationVariables>;

/**
 * __useBulkRemoveAttendanceSessionsMutation__
 *
 * To run a mutation, you first call `useBulkRemoveAttendanceSessionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkRemoveAttendanceSessionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkRemoveAttendanceSessionsMutation, { data, loading, error }] = useBulkRemoveAttendanceSessionsMutation({
 *   variables: {
 *      bulkRemoveAttendanceSessionsInput: // value for 'bulkRemoveAttendanceSessionsInput'
 *   },
 * });
 */
export function useBulkRemoveAttendanceSessionsMutation(baseOptions?: Apollo.MutationHookOptions<BulkRemoveAttendanceSessionsMutation, BulkRemoveAttendanceSessionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkRemoveAttendanceSessionsMutation, BulkRemoveAttendanceSessionsMutationVariables>(BulkRemoveAttendanceSessionsDocument, options);
      }
export type BulkRemoveAttendanceSessionsMutationHookResult = ReturnType<typeof useBulkRemoveAttendanceSessionsMutation>;
export type BulkRemoveAttendanceSessionsMutationResult = Apollo.MutationResult<BulkRemoveAttendanceSessionsMutation>;
export type BulkRemoveAttendanceSessionsMutationOptions = Apollo.BaseMutationOptions<BulkRemoveAttendanceSessionsMutation, BulkRemoveAttendanceSessionsMutationVariables>;
export const CreateBatchDocument = gql`
    mutation CreateBatch($createBatchInput: CreateBatchInput!) {
  createBatch(createBatchInput: $createBatchInput) {
    courseId
    createdAt
    endDate
    id
    isActive
    name
    startDate
    updatedAt
    course {
      id
      title
      description
      creator {
        id
        firstName
        lastName
        username
      }
    }
    enrollments {
      id
      enrollmentDate
      status
      studentId
      student {
        id
        firstName
        lastName
        username
        email
      }
    }
  }
}
    `;
export type CreateBatchMutationFn = Apollo.MutationFunction<CreateBatchMutation, CreateBatchMutationVariables>;

/**
 * __useCreateBatchMutation__
 *
 * To run a mutation, you first call `useCreateBatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBatchMutation, { data, loading, error }] = useCreateBatchMutation({
 *   variables: {
 *      createBatchInput: // value for 'createBatchInput'
 *   },
 * });
 */
export function useCreateBatchMutation(baseOptions?: Apollo.MutationHookOptions<CreateBatchMutation, CreateBatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBatchMutation, CreateBatchMutationVariables>(CreateBatchDocument, options);
      }
export type CreateBatchMutationHookResult = ReturnType<typeof useCreateBatchMutation>;
export type CreateBatchMutationResult = Apollo.MutationResult<CreateBatchMutation>;
export type CreateBatchMutationOptions = Apollo.BaseMutationOptions<CreateBatchMutation, CreateBatchMutationVariables>;
export const UpdateBatchDocument = gql`
    mutation UpdateBatch($id: ID!, $updateBatchInput: UpdateBatchInput!) {
  updateBatch(id: $id, updateBatchInput: $updateBatchInput) {
    courseId
    createdAt
    endDate
    id
    isActive
    name
    startDate
    updatedAt
    course {
      id
      title
      description
      creator {
        id
        firstName
        lastName
        username
      }
    }
    enrollments {
      id
      enrollmentDate
      status
      studentId
      student {
        id
        firstName
        lastName
        username
        email
      }
    }
  }
}
    `;
export type UpdateBatchMutationFn = Apollo.MutationFunction<UpdateBatchMutation, UpdateBatchMutationVariables>;

/**
 * __useUpdateBatchMutation__
 *
 * To run a mutation, you first call `useUpdateBatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBatchMutation, { data, loading, error }] = useUpdateBatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateBatchInput: // value for 'updateBatchInput'
 *   },
 * });
 */
export function useUpdateBatchMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBatchMutation, UpdateBatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBatchMutation, UpdateBatchMutationVariables>(UpdateBatchDocument, options);
      }
export type UpdateBatchMutationHookResult = ReturnType<typeof useUpdateBatchMutation>;
export type UpdateBatchMutationResult = Apollo.MutationResult<UpdateBatchMutation>;
export type UpdateBatchMutationOptions = Apollo.BaseMutationOptions<UpdateBatchMutation, UpdateBatchMutationVariables>;
export const RemoveBatchDocument = gql`
    mutation RemoveBatch($id: ID!) {
  removeBatch(id: $id) {
    courseId
    createdAt
    endDate
    id
    isActive
    name
    startDate
    updatedAt
    course {
      id
      title
      description
    }
  }
}
    `;
export type RemoveBatchMutationFn = Apollo.MutationFunction<RemoveBatchMutation, RemoveBatchMutationVariables>;

/**
 * __useRemoveBatchMutation__
 *
 * To run a mutation, you first call `useRemoveBatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBatchMutation, { data, loading, error }] = useRemoveBatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveBatchMutation(baseOptions?: Apollo.MutationHookOptions<RemoveBatchMutation, RemoveBatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveBatchMutation, RemoveBatchMutationVariables>(RemoveBatchDocument, options);
      }
export type RemoveBatchMutationHookResult = ReturnType<typeof useRemoveBatchMutation>;
export type RemoveBatchMutationResult = Apollo.MutationResult<RemoveBatchMutation>;
export type RemoveBatchMutationOptions = Apollo.BaseMutationOptions<RemoveBatchMutation, RemoveBatchMutationVariables>;
export const BulkRemoveBatchesDocument = gql`
    mutation BulkRemoveBatches($bulkRemoveBatchesInput: BulkRemoveBatchesInput!) {
  bulkRemoveBatches(bulkRemoveBatchesInput: $bulkRemoveBatchesInput) {
    success
    deletedCount
    deletedIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkRemoveBatchesMutationFn = Apollo.MutationFunction<BulkRemoveBatchesMutation, BulkRemoveBatchesMutationVariables>;

/**
 * __useBulkRemoveBatchesMutation__
 *
 * To run a mutation, you first call `useBulkRemoveBatchesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkRemoveBatchesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkRemoveBatchesMutation, { data, loading, error }] = useBulkRemoveBatchesMutation({
 *   variables: {
 *      bulkRemoveBatchesInput: // value for 'bulkRemoveBatchesInput'
 *   },
 * });
 */
export function useBulkRemoveBatchesMutation(baseOptions?: Apollo.MutationHookOptions<BulkRemoveBatchesMutation, BulkRemoveBatchesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkRemoveBatchesMutation, BulkRemoveBatchesMutationVariables>(BulkRemoveBatchesDocument, options);
      }
export type BulkRemoveBatchesMutationHookResult = ReturnType<typeof useBulkRemoveBatchesMutation>;
export type BulkRemoveBatchesMutationResult = Apollo.MutationResult<BulkRemoveBatchesMutation>;
export type BulkRemoveBatchesMutationOptions = Apollo.BaseMutationOptions<BulkRemoveBatchesMutation, BulkRemoveBatchesMutationVariables>;
export const SoftDeleteBatchDocument = gql`
    mutation SoftDeleteBatch($id: ID!) {
  softDeleteBatch(id: $id) {
    deletedAt
    deletedBy
    id
    message
  }
}
    `;
export type SoftDeleteBatchMutationFn = Apollo.MutationFunction<SoftDeleteBatchMutation, SoftDeleteBatchMutationVariables>;

/**
 * __useSoftDeleteBatchMutation__
 *
 * To run a mutation, you first call `useSoftDeleteBatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSoftDeleteBatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [softDeleteBatchMutation, { data, loading, error }] = useSoftDeleteBatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSoftDeleteBatchMutation(baseOptions?: Apollo.MutationHookOptions<SoftDeleteBatchMutation, SoftDeleteBatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SoftDeleteBatchMutation, SoftDeleteBatchMutationVariables>(SoftDeleteBatchDocument, options);
      }
export type SoftDeleteBatchMutationHookResult = ReturnType<typeof useSoftDeleteBatchMutation>;
export type SoftDeleteBatchMutationResult = Apollo.MutationResult<SoftDeleteBatchMutation>;
export type SoftDeleteBatchMutationOptions = Apollo.BaseMutationOptions<SoftDeleteBatchMutation, SoftDeleteBatchMutationVariables>;
export const HardDeleteBatchDocument = gql`
    mutation HardDeleteBatch($id: ID!) {
  hardDeleteBatch(id: $id) {
    deleted
    id
    message
  }
}
    `;
export type HardDeleteBatchMutationFn = Apollo.MutationFunction<HardDeleteBatchMutation, HardDeleteBatchMutationVariables>;

/**
 * __useHardDeleteBatchMutation__
 *
 * To run a mutation, you first call `useHardDeleteBatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHardDeleteBatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hardDeleteBatchMutation, { data, loading, error }] = useHardDeleteBatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHardDeleteBatchMutation(baseOptions?: Apollo.MutationHookOptions<HardDeleteBatchMutation, HardDeleteBatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HardDeleteBatchMutation, HardDeleteBatchMutationVariables>(HardDeleteBatchDocument, options);
      }
export type HardDeleteBatchMutationHookResult = ReturnType<typeof useHardDeleteBatchMutation>;
export type HardDeleteBatchMutationResult = Apollo.MutationResult<HardDeleteBatchMutation>;
export type HardDeleteBatchMutationOptions = Apollo.BaseMutationOptions<HardDeleteBatchMutation, HardDeleteBatchMutationVariables>;
export const RestoreBatchDocument = gql`
    mutation RestoreBatch($id: ID!) {
  restoreBatch(id: $id) {
    restoredAt
    restoredBy
    id
    message
  }
}
    `;
export type RestoreBatchMutationFn = Apollo.MutationFunction<RestoreBatchMutation, RestoreBatchMutationVariables>;

/**
 * __useRestoreBatchMutation__
 *
 * To run a mutation, you first call `useRestoreBatchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreBatchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreBatchMutation, { data, loading, error }] = useRestoreBatchMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRestoreBatchMutation(baseOptions?: Apollo.MutationHookOptions<RestoreBatchMutation, RestoreBatchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestoreBatchMutation, RestoreBatchMutationVariables>(RestoreBatchDocument, options);
      }
export type RestoreBatchMutationHookResult = ReturnType<typeof useRestoreBatchMutation>;
export type RestoreBatchMutationResult = Apollo.MutationResult<RestoreBatchMutation>;
export type RestoreBatchMutationOptions = Apollo.BaseMutationOptions<RestoreBatchMutation, RestoreBatchMutationVariables>;
export const BulkSoftDeleteBatchesDocument = gql`
    mutation BulkSoftDeleteBatches($input: BulkDeleteInput!) {
  bulkSoftDeleteBatches(input: $input) {
    success
    deletedCount
    deletedIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkSoftDeleteBatchesMutationFn = Apollo.MutationFunction<BulkSoftDeleteBatchesMutation, BulkSoftDeleteBatchesMutationVariables>;

/**
 * __useBulkSoftDeleteBatchesMutation__
 *
 * To run a mutation, you first call `useBulkSoftDeleteBatchesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkSoftDeleteBatchesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkSoftDeleteBatchesMutation, { data, loading, error }] = useBulkSoftDeleteBatchesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkSoftDeleteBatchesMutation(baseOptions?: Apollo.MutationHookOptions<BulkSoftDeleteBatchesMutation, BulkSoftDeleteBatchesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkSoftDeleteBatchesMutation, BulkSoftDeleteBatchesMutationVariables>(BulkSoftDeleteBatchesDocument, options);
      }
export type BulkSoftDeleteBatchesMutationHookResult = ReturnType<typeof useBulkSoftDeleteBatchesMutation>;
export type BulkSoftDeleteBatchesMutationResult = Apollo.MutationResult<BulkSoftDeleteBatchesMutation>;
export type BulkSoftDeleteBatchesMutationOptions = Apollo.BaseMutationOptions<BulkSoftDeleteBatchesMutation, BulkSoftDeleteBatchesMutationVariables>;
export const BulkHardDeleteBatchesDocument = gql`
    mutation BulkHardDeleteBatches($input: BulkDeleteInput!) {
  bulkHardDeleteBatches(input: $input) {
    success
    deletedCount
    deletedIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkHardDeleteBatchesMutationFn = Apollo.MutationFunction<BulkHardDeleteBatchesMutation, BulkHardDeleteBatchesMutationVariables>;

/**
 * __useBulkHardDeleteBatchesMutation__
 *
 * To run a mutation, you first call `useBulkHardDeleteBatchesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkHardDeleteBatchesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkHardDeleteBatchesMutation, { data, loading, error }] = useBulkHardDeleteBatchesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkHardDeleteBatchesMutation(baseOptions?: Apollo.MutationHookOptions<BulkHardDeleteBatchesMutation, BulkHardDeleteBatchesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkHardDeleteBatchesMutation, BulkHardDeleteBatchesMutationVariables>(BulkHardDeleteBatchesDocument, options);
      }
export type BulkHardDeleteBatchesMutationHookResult = ReturnType<typeof useBulkHardDeleteBatchesMutation>;
export type BulkHardDeleteBatchesMutationResult = Apollo.MutationResult<BulkHardDeleteBatchesMutation>;
export type BulkHardDeleteBatchesMutationOptions = Apollo.BaseMutationOptions<BulkHardDeleteBatchesMutation, BulkHardDeleteBatchesMutationVariables>;
export const BulkRestoreBatchesDocument = gql`
    mutation BulkRestoreBatches($input: BulkRestoreInput!) {
  bulkRestoreBatches(input: $input) {
    success
    restoredCount
    restoredIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkRestoreBatchesMutationFn = Apollo.MutationFunction<BulkRestoreBatchesMutation, BulkRestoreBatchesMutationVariables>;

/**
 * __useBulkRestoreBatchesMutation__
 *
 * To run a mutation, you first call `useBulkRestoreBatchesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkRestoreBatchesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkRestoreBatchesMutation, { data, loading, error }] = useBulkRestoreBatchesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkRestoreBatchesMutation(baseOptions?: Apollo.MutationHookOptions<BulkRestoreBatchesMutation, BulkRestoreBatchesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkRestoreBatchesMutation, BulkRestoreBatchesMutationVariables>(BulkRestoreBatchesDocument, options);
      }
export type BulkRestoreBatchesMutationHookResult = ReturnType<typeof useBulkRestoreBatchesMutation>;
export type BulkRestoreBatchesMutationResult = Apollo.MutationResult<BulkRestoreBatchesMutation>;
export type BulkRestoreBatchesMutationOptions = Apollo.BaseMutationOptions<BulkRestoreBatchesMutation, BulkRestoreBatchesMutationVariables>;
export const CreateChapterDocument = gql`
    mutation CreateChapter($createChapterInput: CreateChapterInput!) {
  createChapter(createChapterInput: $createChapterInput) {
    courseId
    createdAt
    id
    orderIndex
    title
    updatedAt
    course {
      id
      title
      description
      creator {
        id
        firstName
        lastName
        username
        email
      }
    }
    modules {
      id
      title
      type
      orderIndex
      fileName
      fileUrl
      chapterId
      createdAt
      updatedAt
      studentProgress {
        id
        isCompleted
        completedAt
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
}
    `;
export type CreateChapterMutationFn = Apollo.MutationFunction<CreateChapterMutation, CreateChapterMutationVariables>;

/**
 * __useCreateChapterMutation__
 *
 * To run a mutation, you first call `useCreateChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChapterMutation, { data, loading, error }] = useCreateChapterMutation({
 *   variables: {
 *      createChapterInput: // value for 'createChapterInput'
 *   },
 * });
 */
export function useCreateChapterMutation(baseOptions?: Apollo.MutationHookOptions<CreateChapterMutation, CreateChapterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChapterMutation, CreateChapterMutationVariables>(CreateChapterDocument, options);
      }
export type CreateChapterMutationHookResult = ReturnType<typeof useCreateChapterMutation>;
export type CreateChapterMutationResult = Apollo.MutationResult<CreateChapterMutation>;
export type CreateChapterMutationOptions = Apollo.BaseMutationOptions<CreateChapterMutation, CreateChapterMutationVariables>;
export const UpdateChapterDocument = gql`
    mutation UpdateChapter($id: ID!, $updateChapterInput: UpdateChapterInput!) {
  updateChapter(id: $id, updateChapterInput: $updateChapterInput) {
    courseId
    createdAt
    id
    orderIndex
    title
    updatedAt
    course {
      id
      title
      description
      creator {
        id
        firstName
        lastName
        username
        email
      }
    }
    modules {
      id
      title
      type
      orderIndex
      fileName
      fileUrl
      chapterId
      createdAt
      updatedAt
      studentProgress {
        id
        isCompleted
        completedAt
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
}
    `;
export type UpdateChapterMutationFn = Apollo.MutationFunction<UpdateChapterMutation, UpdateChapterMutationVariables>;

/**
 * __useUpdateChapterMutation__
 *
 * To run a mutation, you first call `useUpdateChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChapterMutation, { data, loading, error }] = useUpdateChapterMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateChapterInput: // value for 'updateChapterInput'
 *   },
 * });
 */
export function useUpdateChapterMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChapterMutation, UpdateChapterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChapterMutation, UpdateChapterMutationVariables>(UpdateChapterDocument, options);
      }
export type UpdateChapterMutationHookResult = ReturnType<typeof useUpdateChapterMutation>;
export type UpdateChapterMutationResult = Apollo.MutationResult<UpdateChapterMutation>;
export type UpdateChapterMutationOptions = Apollo.BaseMutationOptions<UpdateChapterMutation, UpdateChapterMutationVariables>;
export const RemoveChapterDocument = gql`
    mutation RemoveChapter($id: ID!) {
  removeChapter(id: $id) {
    courseId
    createdAt
    id
    orderIndex
    title
    updatedAt
    course {
      id
      title
      description
    }
  }
}
    `;
export type RemoveChapterMutationFn = Apollo.MutationFunction<RemoveChapterMutation, RemoveChapterMutationVariables>;

/**
 * __useRemoveChapterMutation__
 *
 * To run a mutation, you first call `useRemoveChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeChapterMutation, { data, loading, error }] = useRemoveChapterMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveChapterMutation(baseOptions?: Apollo.MutationHookOptions<RemoveChapterMutation, RemoveChapterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveChapterMutation, RemoveChapterMutationVariables>(RemoveChapterDocument, options);
      }
export type RemoveChapterMutationHookResult = ReturnType<typeof useRemoveChapterMutation>;
export type RemoveChapterMutationResult = Apollo.MutationResult<RemoveChapterMutation>;
export type RemoveChapterMutationOptions = Apollo.BaseMutationOptions<RemoveChapterMutation, RemoveChapterMutationVariables>;
export const ReorderChaptersDocument = gql`
    mutation ReorderChapters($courseId: ID!, $chapterIds: [ID!]!) {
  reorderChapters(courseId: $courseId, chapterIds: $chapterIds) {
    courseId
    createdAt
    id
    orderIndex
    title
    updatedAt
  }
}
    `;
export type ReorderChaptersMutationFn = Apollo.MutationFunction<ReorderChaptersMutation, ReorderChaptersMutationVariables>;

/**
 * __useReorderChaptersMutation__
 *
 * To run a mutation, you first call `useReorderChaptersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReorderChaptersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reorderChaptersMutation, { data, loading, error }] = useReorderChaptersMutation({
 *   variables: {
 *      courseId: // value for 'courseId'
 *      chapterIds: // value for 'chapterIds'
 *   },
 * });
 */
export function useReorderChaptersMutation(baseOptions?: Apollo.MutationHookOptions<ReorderChaptersMutation, ReorderChaptersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReorderChaptersMutation, ReorderChaptersMutationVariables>(ReorderChaptersDocument, options);
      }
export type ReorderChaptersMutationHookResult = ReturnType<typeof useReorderChaptersMutation>;
export type ReorderChaptersMutationResult = Apollo.MutationResult<ReorderChaptersMutation>;
export type ReorderChaptersMutationOptions = Apollo.BaseMutationOptions<ReorderChaptersMutation, ReorderChaptersMutationVariables>;
export const BulkRemoveChaptersDocument = gql`
    mutation BulkRemoveChapters($bulkRemoveChaptersInput: BulkRemoveChaptersInput!) {
  bulkRemoveChapters(bulkRemoveChaptersInput: $bulkRemoveChaptersInput) {
    courseId
    createdAt
    id
    orderIndex
    title
    updatedAt
    course {
      id
      title
      description
    }
  }
}
    `;
export type BulkRemoveChaptersMutationFn = Apollo.MutationFunction<BulkRemoveChaptersMutation, BulkRemoveChaptersMutationVariables>;

/**
 * __useBulkRemoveChaptersMutation__
 *
 * To run a mutation, you first call `useBulkRemoveChaptersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkRemoveChaptersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkRemoveChaptersMutation, { data, loading, error }] = useBulkRemoveChaptersMutation({
 *   variables: {
 *      bulkRemoveChaptersInput: // value for 'bulkRemoveChaptersInput'
 *   },
 * });
 */
export function useBulkRemoveChaptersMutation(baseOptions?: Apollo.MutationHookOptions<BulkRemoveChaptersMutation, BulkRemoveChaptersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkRemoveChaptersMutation, BulkRemoveChaptersMutationVariables>(BulkRemoveChaptersDocument, options);
      }
export type BulkRemoveChaptersMutationHookResult = ReturnType<typeof useBulkRemoveChaptersMutation>;
export type BulkRemoveChaptersMutationResult = Apollo.MutationResult<BulkRemoveChaptersMutation>;
export type BulkRemoveChaptersMutationOptions = Apollo.BaseMutationOptions<BulkRemoveChaptersMutation, BulkRemoveChaptersMutationVariables>;
export const SoftDeleteChapterDocument = gql`
    mutation SoftDeleteChapter($id: ID!) {
  softDeleteChapter(id: $id) {
    deletedAt
    id
    message
  }
}
    `;
export type SoftDeleteChapterMutationFn = Apollo.MutationFunction<SoftDeleteChapterMutation, SoftDeleteChapterMutationVariables>;

/**
 * __useSoftDeleteChapterMutation__
 *
 * To run a mutation, you first call `useSoftDeleteChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSoftDeleteChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [softDeleteChapterMutation, { data, loading, error }] = useSoftDeleteChapterMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSoftDeleteChapterMutation(baseOptions?: Apollo.MutationHookOptions<SoftDeleteChapterMutation, SoftDeleteChapterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SoftDeleteChapterMutation, SoftDeleteChapterMutationVariables>(SoftDeleteChapterDocument, options);
      }
export type SoftDeleteChapterMutationHookResult = ReturnType<typeof useSoftDeleteChapterMutation>;
export type SoftDeleteChapterMutationResult = Apollo.MutationResult<SoftDeleteChapterMutation>;
export type SoftDeleteChapterMutationOptions = Apollo.BaseMutationOptions<SoftDeleteChapterMutation, SoftDeleteChapterMutationVariables>;
export const HardDeleteChapterDocument = gql`
    mutation HardDeleteChapter($id: ID!) {
  hardDeleteChapter(id: $id) {
    deleted
    id
    message
  }
}
    `;
export type HardDeleteChapterMutationFn = Apollo.MutationFunction<HardDeleteChapterMutation, HardDeleteChapterMutationVariables>;

/**
 * __useHardDeleteChapterMutation__
 *
 * To run a mutation, you first call `useHardDeleteChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHardDeleteChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hardDeleteChapterMutation, { data, loading, error }] = useHardDeleteChapterMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHardDeleteChapterMutation(baseOptions?: Apollo.MutationHookOptions<HardDeleteChapterMutation, HardDeleteChapterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HardDeleteChapterMutation, HardDeleteChapterMutationVariables>(HardDeleteChapterDocument, options);
      }
export type HardDeleteChapterMutationHookResult = ReturnType<typeof useHardDeleteChapterMutation>;
export type HardDeleteChapterMutationResult = Apollo.MutationResult<HardDeleteChapterMutation>;
export type HardDeleteChapterMutationOptions = Apollo.BaseMutationOptions<HardDeleteChapterMutation, HardDeleteChapterMutationVariables>;
export const RestoreChapterDocument = gql`
    mutation RestoreChapter($id: ID!) {
  restoreChapter(id: $id) {
    restoredAt
    id
    message
  }
}
    `;
export type RestoreChapterMutationFn = Apollo.MutationFunction<RestoreChapterMutation, RestoreChapterMutationVariables>;

/**
 * __useRestoreChapterMutation__
 *
 * To run a mutation, you first call `useRestoreChapterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreChapterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreChapterMutation, { data, loading, error }] = useRestoreChapterMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRestoreChapterMutation(baseOptions?: Apollo.MutationHookOptions<RestoreChapterMutation, RestoreChapterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestoreChapterMutation, RestoreChapterMutationVariables>(RestoreChapterDocument, options);
      }
export type RestoreChapterMutationHookResult = ReturnType<typeof useRestoreChapterMutation>;
export type RestoreChapterMutationResult = Apollo.MutationResult<RestoreChapterMutation>;
export type RestoreChapterMutationOptions = Apollo.BaseMutationOptions<RestoreChapterMutation, RestoreChapterMutationVariables>;
export const BulkSoftDeleteChaptersDocument = gql`
    mutation BulkSoftDeleteChapters($input: BulkDeleteInput!) {
  bulkSoftDeleteChapters(input: $input) {
    success
    deletedCount
    deletedIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkSoftDeleteChaptersMutationFn = Apollo.MutationFunction<BulkSoftDeleteChaptersMutation, BulkSoftDeleteChaptersMutationVariables>;

/**
 * __useBulkSoftDeleteChaptersMutation__
 *
 * To run a mutation, you first call `useBulkSoftDeleteChaptersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkSoftDeleteChaptersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkSoftDeleteChaptersMutation, { data, loading, error }] = useBulkSoftDeleteChaptersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkSoftDeleteChaptersMutation(baseOptions?: Apollo.MutationHookOptions<BulkSoftDeleteChaptersMutation, BulkSoftDeleteChaptersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkSoftDeleteChaptersMutation, BulkSoftDeleteChaptersMutationVariables>(BulkSoftDeleteChaptersDocument, options);
      }
export type BulkSoftDeleteChaptersMutationHookResult = ReturnType<typeof useBulkSoftDeleteChaptersMutation>;
export type BulkSoftDeleteChaptersMutationResult = Apollo.MutationResult<BulkSoftDeleteChaptersMutation>;
export type BulkSoftDeleteChaptersMutationOptions = Apollo.BaseMutationOptions<BulkSoftDeleteChaptersMutation, BulkSoftDeleteChaptersMutationVariables>;
export const BulkHardDeleteChaptersDocument = gql`
    mutation BulkHardDeleteChapters($input: BulkDeleteInput!) {
  bulkHardDeleteChapters(input: $input) {
    success
    deletedCount
    deletedIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkHardDeleteChaptersMutationFn = Apollo.MutationFunction<BulkHardDeleteChaptersMutation, BulkHardDeleteChaptersMutationVariables>;

/**
 * __useBulkHardDeleteChaptersMutation__
 *
 * To run a mutation, you first call `useBulkHardDeleteChaptersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkHardDeleteChaptersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkHardDeleteChaptersMutation, { data, loading, error }] = useBulkHardDeleteChaptersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkHardDeleteChaptersMutation(baseOptions?: Apollo.MutationHookOptions<BulkHardDeleteChaptersMutation, BulkHardDeleteChaptersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkHardDeleteChaptersMutation, BulkHardDeleteChaptersMutationVariables>(BulkHardDeleteChaptersDocument, options);
      }
export type BulkHardDeleteChaptersMutationHookResult = ReturnType<typeof useBulkHardDeleteChaptersMutation>;
export type BulkHardDeleteChaptersMutationResult = Apollo.MutationResult<BulkHardDeleteChaptersMutation>;
export type BulkHardDeleteChaptersMutationOptions = Apollo.BaseMutationOptions<BulkHardDeleteChaptersMutation, BulkHardDeleteChaptersMutationVariables>;
export const BulkRestoreChaptersDocument = gql`
    mutation BulkRestoreChapters($input: BulkRestoreInput!) {
  bulkRestoreChapters(input: $input) {
    success
    restoredCount
    restoredIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkRestoreChaptersMutationFn = Apollo.MutationFunction<BulkRestoreChaptersMutation, BulkRestoreChaptersMutationVariables>;

/**
 * __useBulkRestoreChaptersMutation__
 *
 * To run a mutation, you first call `useBulkRestoreChaptersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkRestoreChaptersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkRestoreChaptersMutation, { data, loading, error }] = useBulkRestoreChaptersMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkRestoreChaptersMutation(baseOptions?: Apollo.MutationHookOptions<BulkRestoreChaptersMutation, BulkRestoreChaptersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkRestoreChaptersMutation, BulkRestoreChaptersMutationVariables>(BulkRestoreChaptersDocument, options);
      }
export type BulkRestoreChaptersMutationHookResult = ReturnType<typeof useBulkRestoreChaptersMutation>;
export type BulkRestoreChaptersMutationResult = Apollo.MutationResult<BulkRestoreChaptersMutation>;
export type BulkRestoreChaptersMutationOptions = Apollo.BaseMutationOptions<BulkRestoreChaptersMutation, BulkRestoreChaptersMutationVariables>;
export const CreateCourseDocument = gql`
    mutation CreateCourse($createCourseInput: CreateCourseInput!) {
  createCourse(createCourseInput: $createCourseInput) {
    createdAt
    createdBy
    description
    id
    isActive
    title
    updatedAt
    creator {
      id
      firstName
      lastName
      username
      email
    }
    chapters {
      id
      title
      orderIndex
      courseId
      modules {
        id
        title
        type
        orderIndex
        fileName
        fileUrl
      }
    }
  }
}
    `;
export type CreateCourseMutationFn = Apollo.MutationFunction<CreateCourseMutation, CreateCourseMutationVariables>;

/**
 * __useCreateCourseMutation__
 *
 * To run a mutation, you first call `useCreateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCourseMutation, { data, loading, error }] = useCreateCourseMutation({
 *   variables: {
 *      createCourseInput: // value for 'createCourseInput'
 *   },
 * });
 */
export function useCreateCourseMutation(baseOptions?: Apollo.MutationHookOptions<CreateCourseMutation, CreateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCourseMutation, CreateCourseMutationVariables>(CreateCourseDocument, options);
      }
export type CreateCourseMutationHookResult = ReturnType<typeof useCreateCourseMutation>;
export type CreateCourseMutationResult = Apollo.MutationResult<CreateCourseMutation>;
export type CreateCourseMutationOptions = Apollo.BaseMutationOptions<CreateCourseMutation, CreateCourseMutationVariables>;
export const UpdateCourseDocument = gql`
    mutation UpdateCourse($id: ID!, $updateCourseInput: UpdateCourseInput!) {
  updateCourse(id: $id, updateCourseInput: $updateCourseInput) {
    createdAt
    createdBy
    description
    id
    isActive
    title
    updatedAt
    creator {
      id
      firstName
      lastName
      username
      email
    }
    chapters {
      id
      title
      orderIndex
      courseId
      modules {
        id
        title
        type
        orderIndex
        fileName
        fileUrl
      }
    }
  }
}
    `;
export type UpdateCourseMutationFn = Apollo.MutationFunction<UpdateCourseMutation, UpdateCourseMutationVariables>;

/**
 * __useUpdateCourseMutation__
 *
 * To run a mutation, you first call `useUpdateCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseMutation, { data, loading, error }] = useUpdateCourseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateCourseInput: // value for 'updateCourseInput'
 *   },
 * });
 */
export function useUpdateCourseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseMutation, UpdateCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCourseMutation, UpdateCourseMutationVariables>(UpdateCourseDocument, options);
      }
export type UpdateCourseMutationHookResult = ReturnType<typeof useUpdateCourseMutation>;
export type UpdateCourseMutationResult = Apollo.MutationResult<UpdateCourseMutation>;
export type UpdateCourseMutationOptions = Apollo.BaseMutationOptions<UpdateCourseMutation, UpdateCourseMutationVariables>;
export const RemoveCourseDocument = gql`
    mutation RemoveCourse($id: ID!) {
  removeCourse(id: $id) {
    createdAt
    createdBy
    description
    id
    isActive
    title
    updatedAt
    creator {
      id
      firstName
      lastName
      username
      email
    }
  }
}
    `;
export type RemoveCourseMutationFn = Apollo.MutationFunction<RemoveCourseMutation, RemoveCourseMutationVariables>;

/**
 * __useRemoveCourseMutation__
 *
 * To run a mutation, you first call `useRemoveCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCourseMutation, { data, loading, error }] = useRemoveCourseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveCourseMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCourseMutation, RemoveCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCourseMutation, RemoveCourseMutationVariables>(RemoveCourseDocument, options);
      }
export type RemoveCourseMutationHookResult = ReturnType<typeof useRemoveCourseMutation>;
export type RemoveCourseMutationResult = Apollo.MutationResult<RemoveCourseMutation>;
export type RemoveCourseMutationOptions = Apollo.BaseMutationOptions<RemoveCourseMutation, RemoveCourseMutationVariables>;
export const BulkRemoveCoursesDocument = gql`
    mutation BulkRemoveCourses($bulkRemoveCoursesInput: BulkRemoveCoursesInput!) {
  bulkRemoveCourses(bulkRemoveCoursesInput: $bulkRemoveCoursesInput) {
    success
    deletedCount
    deletedIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkRemoveCoursesMutationFn = Apollo.MutationFunction<BulkRemoveCoursesMutation, BulkRemoveCoursesMutationVariables>;

/**
 * __useBulkRemoveCoursesMutation__
 *
 * To run a mutation, you first call `useBulkRemoveCoursesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkRemoveCoursesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkRemoveCoursesMutation, { data, loading, error }] = useBulkRemoveCoursesMutation({
 *   variables: {
 *      bulkRemoveCoursesInput: // value for 'bulkRemoveCoursesInput'
 *   },
 * });
 */
export function useBulkRemoveCoursesMutation(baseOptions?: Apollo.MutationHookOptions<BulkRemoveCoursesMutation, BulkRemoveCoursesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkRemoveCoursesMutation, BulkRemoveCoursesMutationVariables>(BulkRemoveCoursesDocument, options);
      }
export type BulkRemoveCoursesMutationHookResult = ReturnType<typeof useBulkRemoveCoursesMutation>;
export type BulkRemoveCoursesMutationResult = Apollo.MutationResult<BulkRemoveCoursesMutation>;
export type BulkRemoveCoursesMutationOptions = Apollo.BaseMutationOptions<BulkRemoveCoursesMutation, BulkRemoveCoursesMutationVariables>;
export const SoftDeleteCourseDocument = gql`
    mutation SoftDeleteCourse($id: ID!) {
  softDeleteCourse(id: $id) {
    deletedAt
    id
    message
  }
}
    `;
export type SoftDeleteCourseMutationFn = Apollo.MutationFunction<SoftDeleteCourseMutation, SoftDeleteCourseMutationVariables>;

/**
 * __useSoftDeleteCourseMutation__
 *
 * To run a mutation, you first call `useSoftDeleteCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSoftDeleteCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [softDeleteCourseMutation, { data, loading, error }] = useSoftDeleteCourseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSoftDeleteCourseMutation(baseOptions?: Apollo.MutationHookOptions<SoftDeleteCourseMutation, SoftDeleteCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SoftDeleteCourseMutation, SoftDeleteCourseMutationVariables>(SoftDeleteCourseDocument, options);
      }
export type SoftDeleteCourseMutationHookResult = ReturnType<typeof useSoftDeleteCourseMutation>;
export type SoftDeleteCourseMutationResult = Apollo.MutationResult<SoftDeleteCourseMutation>;
export type SoftDeleteCourseMutationOptions = Apollo.BaseMutationOptions<SoftDeleteCourseMutation, SoftDeleteCourseMutationVariables>;
export const HardDeleteCourseDocument = gql`
    mutation HardDeleteCourse($id: ID!) {
  hardDeleteCourse(id: $id) {
    deleted
    id
    message
  }
}
    `;
export type HardDeleteCourseMutationFn = Apollo.MutationFunction<HardDeleteCourseMutation, HardDeleteCourseMutationVariables>;

/**
 * __useHardDeleteCourseMutation__
 *
 * To run a mutation, you first call `useHardDeleteCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHardDeleteCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hardDeleteCourseMutation, { data, loading, error }] = useHardDeleteCourseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHardDeleteCourseMutation(baseOptions?: Apollo.MutationHookOptions<HardDeleteCourseMutation, HardDeleteCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HardDeleteCourseMutation, HardDeleteCourseMutationVariables>(HardDeleteCourseDocument, options);
      }
export type HardDeleteCourseMutationHookResult = ReturnType<typeof useHardDeleteCourseMutation>;
export type HardDeleteCourseMutationResult = Apollo.MutationResult<HardDeleteCourseMutation>;
export type HardDeleteCourseMutationOptions = Apollo.BaseMutationOptions<HardDeleteCourseMutation, HardDeleteCourseMutationVariables>;
export const RestoreCourseDocument = gql`
    mutation RestoreCourse($id: ID!) {
  restoreCourse(id: $id) {
    restoredAt
    id
    message
  }
}
    `;
export type RestoreCourseMutationFn = Apollo.MutationFunction<RestoreCourseMutation, RestoreCourseMutationVariables>;

/**
 * __useRestoreCourseMutation__
 *
 * To run a mutation, you first call `useRestoreCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreCourseMutation, { data, loading, error }] = useRestoreCourseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRestoreCourseMutation(baseOptions?: Apollo.MutationHookOptions<RestoreCourseMutation, RestoreCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestoreCourseMutation, RestoreCourseMutationVariables>(RestoreCourseDocument, options);
      }
export type RestoreCourseMutationHookResult = ReturnType<typeof useRestoreCourseMutation>;
export type RestoreCourseMutationResult = Apollo.MutationResult<RestoreCourseMutation>;
export type RestoreCourseMutationOptions = Apollo.BaseMutationOptions<RestoreCourseMutation, RestoreCourseMutationVariables>;
export const BulkSoftDeleteCoursesDocument = gql`
    mutation BulkSoftDeleteCourses($input: BulkDeleteInput!) {
  bulkSoftDeleteCourses(input: $input) {
    success
    deletedCount
    deletedIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkSoftDeleteCoursesMutationFn = Apollo.MutationFunction<BulkSoftDeleteCoursesMutation, BulkSoftDeleteCoursesMutationVariables>;

/**
 * __useBulkSoftDeleteCoursesMutation__
 *
 * To run a mutation, you first call `useBulkSoftDeleteCoursesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkSoftDeleteCoursesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkSoftDeleteCoursesMutation, { data, loading, error }] = useBulkSoftDeleteCoursesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkSoftDeleteCoursesMutation(baseOptions?: Apollo.MutationHookOptions<BulkSoftDeleteCoursesMutation, BulkSoftDeleteCoursesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkSoftDeleteCoursesMutation, BulkSoftDeleteCoursesMutationVariables>(BulkSoftDeleteCoursesDocument, options);
      }
export type BulkSoftDeleteCoursesMutationHookResult = ReturnType<typeof useBulkSoftDeleteCoursesMutation>;
export type BulkSoftDeleteCoursesMutationResult = Apollo.MutationResult<BulkSoftDeleteCoursesMutation>;
export type BulkSoftDeleteCoursesMutationOptions = Apollo.BaseMutationOptions<BulkSoftDeleteCoursesMutation, BulkSoftDeleteCoursesMutationVariables>;
export const BulkHardDeleteCoursesDocument = gql`
    mutation BulkHardDeleteCourses($input: BulkDeleteInput!) {
  bulkHardDeleteCourses(input: $input) {
    success
    deletedCount
    deletedIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkHardDeleteCoursesMutationFn = Apollo.MutationFunction<BulkHardDeleteCoursesMutation, BulkHardDeleteCoursesMutationVariables>;

/**
 * __useBulkHardDeleteCoursesMutation__
 *
 * To run a mutation, you first call `useBulkHardDeleteCoursesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkHardDeleteCoursesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkHardDeleteCoursesMutation, { data, loading, error }] = useBulkHardDeleteCoursesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkHardDeleteCoursesMutation(baseOptions?: Apollo.MutationHookOptions<BulkHardDeleteCoursesMutation, BulkHardDeleteCoursesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkHardDeleteCoursesMutation, BulkHardDeleteCoursesMutationVariables>(BulkHardDeleteCoursesDocument, options);
      }
export type BulkHardDeleteCoursesMutationHookResult = ReturnType<typeof useBulkHardDeleteCoursesMutation>;
export type BulkHardDeleteCoursesMutationResult = Apollo.MutationResult<BulkHardDeleteCoursesMutation>;
export type BulkHardDeleteCoursesMutationOptions = Apollo.BaseMutationOptions<BulkHardDeleteCoursesMutation, BulkHardDeleteCoursesMutationVariables>;
export const BulkRestoreCoursesDocument = gql`
    mutation BulkRestoreCourses($input: BulkRestoreInput!) {
  bulkRestoreCourses(input: $input) {
    success
    restoredCount
    restoredIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkRestoreCoursesMutationFn = Apollo.MutationFunction<BulkRestoreCoursesMutation, BulkRestoreCoursesMutationVariables>;

/**
 * __useBulkRestoreCoursesMutation__
 *
 * To run a mutation, you first call `useBulkRestoreCoursesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkRestoreCoursesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkRestoreCoursesMutation, { data, loading, error }] = useBulkRestoreCoursesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkRestoreCoursesMutation(baseOptions?: Apollo.MutationHookOptions<BulkRestoreCoursesMutation, BulkRestoreCoursesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkRestoreCoursesMutation, BulkRestoreCoursesMutationVariables>(BulkRestoreCoursesDocument, options);
      }
export type BulkRestoreCoursesMutationHookResult = ReturnType<typeof useBulkRestoreCoursesMutation>;
export type BulkRestoreCoursesMutationResult = Apollo.MutationResult<BulkRestoreCoursesMutation>;
export type BulkRestoreCoursesMutationOptions = Apollo.BaseMutationOptions<BulkRestoreCoursesMutation, BulkRestoreCoursesMutationVariables>;
export const EnrollStudentDocument = gql`
    mutation EnrollStudent($batchId: ID!, $studentId: ID!) {
  enrollStudent(batchId: $batchId, studentId: $studentId)
}
    `;
export type EnrollStudentMutationFn = Apollo.MutationFunction<EnrollStudentMutation, EnrollStudentMutationVariables>;

/**
 * __useEnrollStudentMutation__
 *
 * To run a mutation, you first call `useEnrollStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnrollStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enrollStudentMutation, { data, loading, error }] = useEnrollStudentMutation({
 *   variables: {
 *      batchId: // value for 'batchId'
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useEnrollStudentMutation(baseOptions?: Apollo.MutationHookOptions<EnrollStudentMutation, EnrollStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnrollStudentMutation, EnrollStudentMutationVariables>(EnrollStudentDocument, options);
      }
export type EnrollStudentMutationHookResult = ReturnType<typeof useEnrollStudentMutation>;
export type EnrollStudentMutationResult = Apollo.MutationResult<EnrollStudentMutation>;
export type EnrollStudentMutationOptions = Apollo.BaseMutationOptions<EnrollStudentMutation, EnrollStudentMutationVariables>;
export const UnenrollStudentDocument = gql`
    mutation UnenrollStudent($batchId: ID!, $studentId: ID!) {
  unenrollStudent(batchId: $batchId, studentId: $studentId)
}
    `;
export type UnenrollStudentMutationFn = Apollo.MutationFunction<UnenrollStudentMutation, UnenrollStudentMutationVariables>;

/**
 * __useUnenrollStudentMutation__
 *
 * To run a mutation, you first call `useUnenrollStudentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnenrollStudentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unenrollStudentMutation, { data, loading, error }] = useUnenrollStudentMutation({
 *   variables: {
 *      batchId: // value for 'batchId'
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useUnenrollStudentMutation(baseOptions?: Apollo.MutationHookOptions<UnenrollStudentMutation, UnenrollStudentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnenrollStudentMutation, UnenrollStudentMutationVariables>(UnenrollStudentDocument, options);
      }
export type UnenrollStudentMutationHookResult = ReturnType<typeof useUnenrollStudentMutation>;
export type UnenrollStudentMutationResult = Apollo.MutationResult<UnenrollStudentMutation>;
export type UnenrollStudentMutationOptions = Apollo.BaseMutationOptions<UnenrollStudentMutation, UnenrollStudentMutationVariables>;
export const BulkEnrollStudentsDocument = gql`
    mutation BulkEnrollStudents($bulkEnrollStudentsInput: BulkEnrollStudentsInput!) {
  bulkEnrollStudents(bulkEnrollStudentsInput: $bulkEnrollStudentsInput)
}
    `;
export type BulkEnrollStudentsMutationFn = Apollo.MutationFunction<BulkEnrollStudentsMutation, BulkEnrollStudentsMutationVariables>;

/**
 * __useBulkEnrollStudentsMutation__
 *
 * To run a mutation, you first call `useBulkEnrollStudentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkEnrollStudentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkEnrollStudentsMutation, { data, loading, error }] = useBulkEnrollStudentsMutation({
 *   variables: {
 *      bulkEnrollStudentsInput: // value for 'bulkEnrollStudentsInput'
 *   },
 * });
 */
export function useBulkEnrollStudentsMutation(baseOptions?: Apollo.MutationHookOptions<BulkEnrollStudentsMutation, BulkEnrollStudentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkEnrollStudentsMutation, BulkEnrollStudentsMutationVariables>(BulkEnrollStudentsDocument, options);
      }
export type BulkEnrollStudentsMutationHookResult = ReturnType<typeof useBulkEnrollStudentsMutation>;
export type BulkEnrollStudentsMutationResult = Apollo.MutationResult<BulkEnrollStudentsMutation>;
export type BulkEnrollStudentsMutationOptions = Apollo.BaseMutationOptions<BulkEnrollStudentsMutation, BulkEnrollStudentsMutationVariables>;
export const BulkRemoveEnrollmentsDocument = gql`
    mutation BulkRemoveEnrollments($bulkRemoveEnrollmentsInput: BulkRemoveEnrollmentsInput!) {
  bulkRemoveEnrollments(bulkRemoveEnrollmentsInput: $bulkRemoveEnrollmentsInput) {
    success
    deletedCount
    deletedIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkRemoveEnrollmentsMutationFn = Apollo.MutationFunction<BulkRemoveEnrollmentsMutation, BulkRemoveEnrollmentsMutationVariables>;

/**
 * __useBulkRemoveEnrollmentsMutation__
 *
 * To run a mutation, you first call `useBulkRemoveEnrollmentsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkRemoveEnrollmentsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkRemoveEnrollmentsMutation, { data, loading, error }] = useBulkRemoveEnrollmentsMutation({
 *   variables: {
 *      bulkRemoveEnrollmentsInput: // value for 'bulkRemoveEnrollmentsInput'
 *   },
 * });
 */
export function useBulkRemoveEnrollmentsMutation(baseOptions?: Apollo.MutationHookOptions<BulkRemoveEnrollmentsMutation, BulkRemoveEnrollmentsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkRemoveEnrollmentsMutation, BulkRemoveEnrollmentsMutationVariables>(BulkRemoveEnrollmentsDocument, options);
      }
export type BulkRemoveEnrollmentsMutationHookResult = ReturnType<typeof useBulkRemoveEnrollmentsMutation>;
export type BulkRemoveEnrollmentsMutationResult = Apollo.MutationResult<BulkRemoveEnrollmentsMutation>;
export type BulkRemoveEnrollmentsMutationOptions = Apollo.BaseMutationOptions<BulkRemoveEnrollmentsMutation, BulkRemoveEnrollmentsMutationVariables>;
export const CreateModuleDocument = gql`
    mutation CreateModule($createModuleInput: CreateModuleInput!) {
  createModule(createModuleInput: $createModuleInput) {
    chapterId
    createdAt
    fileName
    fileUrl
    id
    orderIndex
    title
    type
    updatedAt
    chapter {
      id
      title
      orderIndex
      courseId
      course {
        id
        title
      }
    }
    studentProgress {
      id
      isCompleted
      completedAt
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
export type CreateModuleMutationFn = Apollo.MutationFunction<CreateModuleMutation, CreateModuleMutationVariables>;

/**
 * __useCreateModuleMutation__
 *
 * To run a mutation, you first call `useCreateModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createModuleMutation, { data, loading, error }] = useCreateModuleMutation({
 *   variables: {
 *      createModuleInput: // value for 'createModuleInput'
 *   },
 * });
 */
export function useCreateModuleMutation(baseOptions?: Apollo.MutationHookOptions<CreateModuleMutation, CreateModuleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateModuleMutation, CreateModuleMutationVariables>(CreateModuleDocument, options);
      }
export type CreateModuleMutationHookResult = ReturnType<typeof useCreateModuleMutation>;
export type CreateModuleMutationResult = Apollo.MutationResult<CreateModuleMutation>;
export type CreateModuleMutationOptions = Apollo.BaseMutationOptions<CreateModuleMutation, CreateModuleMutationVariables>;
export const UpdateModuleDocument = gql`
    mutation UpdateModule($id: ID!, $updateModuleInput: UpdateModuleInput!) {
  updateModule(id: $id, updateModuleInput: $updateModuleInput) {
    chapterId
    createdAt
    fileName
    fileUrl
    id
    orderIndex
    title
    type
    updatedAt
    chapter {
      id
      title
      orderIndex
      courseId
      course {
        id
        title
      }
    }
    studentProgress {
      id
      isCompleted
      completedAt
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
export type UpdateModuleMutationFn = Apollo.MutationFunction<UpdateModuleMutation, UpdateModuleMutationVariables>;

/**
 * __useUpdateModuleMutation__
 *
 * To run a mutation, you first call `useUpdateModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateModuleMutation, { data, loading, error }] = useUpdateModuleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      updateModuleInput: // value for 'updateModuleInput'
 *   },
 * });
 */
export function useUpdateModuleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateModuleMutation, UpdateModuleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateModuleMutation, UpdateModuleMutationVariables>(UpdateModuleDocument, options);
      }
export type UpdateModuleMutationHookResult = ReturnType<typeof useUpdateModuleMutation>;
export type UpdateModuleMutationResult = Apollo.MutationResult<UpdateModuleMutation>;
export type UpdateModuleMutationOptions = Apollo.BaseMutationOptions<UpdateModuleMutation, UpdateModuleMutationVariables>;
export const RemoveModuleDocument = gql`
    mutation RemoveModule($id: ID!) {
  removeModule(id: $id) {
    chapterId
    createdAt
    fileName
    fileUrl
    id
    orderIndex
    title
    type
    updatedAt
    chapter {
      id
      title
      orderIndex
    }
  }
}
    `;
export type RemoveModuleMutationFn = Apollo.MutationFunction<RemoveModuleMutation, RemoveModuleMutationVariables>;

/**
 * __useRemoveModuleMutation__
 *
 * To run a mutation, you first call `useRemoveModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeModuleMutation, { data, loading, error }] = useRemoveModuleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveModuleMutation(baseOptions?: Apollo.MutationHookOptions<RemoveModuleMutation, RemoveModuleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveModuleMutation, RemoveModuleMutationVariables>(RemoveModuleDocument, options);
      }
export type RemoveModuleMutationHookResult = ReturnType<typeof useRemoveModuleMutation>;
export type RemoveModuleMutationResult = Apollo.MutationResult<RemoveModuleMutation>;
export type RemoveModuleMutationOptions = Apollo.BaseMutationOptions<RemoveModuleMutation, RemoveModuleMutationVariables>;
export const ReorderModulesDocument = gql`
    mutation ReorderModules($chapterId: ID!, $moduleIds: [ID!]!) {
  reorderModules(chapterId: $chapterId, moduleIds: $moduleIds) {
    chapterId
    createdAt
    fileName
    fileUrl
    id
    orderIndex
    title
    type
    updatedAt
  }
}
    `;
export type ReorderModulesMutationFn = Apollo.MutationFunction<ReorderModulesMutation, ReorderModulesMutationVariables>;

/**
 * __useReorderModulesMutation__
 *
 * To run a mutation, you first call `useReorderModulesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReorderModulesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reorderModulesMutation, { data, loading, error }] = useReorderModulesMutation({
 *   variables: {
 *      chapterId: // value for 'chapterId'
 *      moduleIds: // value for 'moduleIds'
 *   },
 * });
 */
export function useReorderModulesMutation(baseOptions?: Apollo.MutationHookOptions<ReorderModulesMutation, ReorderModulesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReorderModulesMutation, ReorderModulesMutationVariables>(ReorderModulesDocument, options);
      }
export type ReorderModulesMutationHookResult = ReturnType<typeof useReorderModulesMutation>;
export type ReorderModulesMutationResult = Apollo.MutationResult<ReorderModulesMutation>;
export type ReorderModulesMutationOptions = Apollo.BaseMutationOptions<ReorderModulesMutation, ReorderModulesMutationVariables>;
export const UpdateModuleProgressDocument = gql`
    mutation UpdateModuleProgress($updateProgressInput: UpdateProgressInput!) {
  updateModuleProgress(updateProgressInput: $updateProgressInput) {
    completedAt
    createdAt
    id
    isCompleted
    moduleId
    studentId
    updatedAt
    module {
      id
      title
      type
      chapterId
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
export type UpdateModuleProgressMutationFn = Apollo.MutationFunction<UpdateModuleProgressMutation, UpdateModuleProgressMutationVariables>;

/**
 * __useUpdateModuleProgressMutation__
 *
 * To run a mutation, you first call `useUpdateModuleProgressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateModuleProgressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateModuleProgressMutation, { data, loading, error }] = useUpdateModuleProgressMutation({
 *   variables: {
 *      updateProgressInput: // value for 'updateProgressInput'
 *   },
 * });
 */
export function useUpdateModuleProgressMutation(baseOptions?: Apollo.MutationHookOptions<UpdateModuleProgressMutation, UpdateModuleProgressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateModuleProgressMutation, UpdateModuleProgressMutationVariables>(UpdateModuleProgressDocument, options);
      }
export type UpdateModuleProgressMutationHookResult = ReturnType<typeof useUpdateModuleProgressMutation>;
export type UpdateModuleProgressMutationResult = Apollo.MutationResult<UpdateModuleProgressMutation>;
export type UpdateModuleProgressMutationOptions = Apollo.BaseMutationOptions<UpdateModuleProgressMutation, UpdateModuleProgressMutationVariables>;
export const GenerateSecureStreamUrlDocument = gql`
    mutation GenerateSecureStreamUrl($moduleId: String!) {
  generateSecureStreamUrl(moduleId: $moduleId)
}
    `;
export type GenerateSecureStreamUrlMutationFn = Apollo.MutationFunction<GenerateSecureStreamUrlMutation, GenerateSecureStreamUrlMutationVariables>;

/**
 * __useGenerateSecureStreamUrlMutation__
 *
 * To run a mutation, you first call `useGenerateSecureStreamUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateSecureStreamUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateSecureStreamUrlMutation, { data, loading, error }] = useGenerateSecureStreamUrlMutation({
 *   variables: {
 *      moduleId: // value for 'moduleId'
 *   },
 * });
 */
export function useGenerateSecureStreamUrlMutation(baseOptions?: Apollo.MutationHookOptions<GenerateSecureStreamUrlMutation, GenerateSecureStreamUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateSecureStreamUrlMutation, GenerateSecureStreamUrlMutationVariables>(GenerateSecureStreamUrlDocument, options);
      }
export type GenerateSecureStreamUrlMutationHookResult = ReturnType<typeof useGenerateSecureStreamUrlMutation>;
export type GenerateSecureStreamUrlMutationResult = Apollo.MutationResult<GenerateSecureStreamUrlMutation>;
export type GenerateSecureStreamUrlMutationOptions = Apollo.BaseMutationOptions<GenerateSecureStreamUrlMutation, GenerateSecureStreamUrlMutationVariables>;
export const CreateOfflineCacheDocument = gql`
    mutation CreateOfflineCache($moduleId: String!, $quality: String) {
  createOfflineCache(moduleId: $moduleId, quality: $quality)
}
    `;
export type CreateOfflineCacheMutationFn = Apollo.MutationFunction<CreateOfflineCacheMutation, CreateOfflineCacheMutationVariables>;

/**
 * __useCreateOfflineCacheMutation__
 *
 * To run a mutation, you first call `useCreateOfflineCacheMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOfflineCacheMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOfflineCacheMutation, { data, loading, error }] = useCreateOfflineCacheMutation({
 *   variables: {
 *      moduleId: // value for 'moduleId'
 *      quality: // value for 'quality'
 *   },
 * });
 */
export function useCreateOfflineCacheMutation(baseOptions?: Apollo.MutationHookOptions<CreateOfflineCacheMutation, CreateOfflineCacheMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOfflineCacheMutation, CreateOfflineCacheMutationVariables>(CreateOfflineCacheDocument, options);
      }
export type CreateOfflineCacheMutationHookResult = ReturnType<typeof useCreateOfflineCacheMutation>;
export type CreateOfflineCacheMutationResult = Apollo.MutationResult<CreateOfflineCacheMutation>;
export type CreateOfflineCacheMutationOptions = Apollo.BaseMutationOptions<CreateOfflineCacheMutation, CreateOfflineCacheMutationVariables>;
export const BulkRemoveModulesDocument = gql`
    mutation BulkRemoveModules($bulkRemoveModulesInput: BulkRemoveModulesInput!) {
  bulkRemoveModules(bulkRemoveModulesInput: $bulkRemoveModulesInput) {
    success
    deletedCount
    deletedIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkRemoveModulesMutationFn = Apollo.MutationFunction<BulkRemoveModulesMutation, BulkRemoveModulesMutationVariables>;

/**
 * __useBulkRemoveModulesMutation__
 *
 * To run a mutation, you first call `useBulkRemoveModulesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkRemoveModulesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkRemoveModulesMutation, { data, loading, error }] = useBulkRemoveModulesMutation({
 *   variables: {
 *      bulkRemoveModulesInput: // value for 'bulkRemoveModulesInput'
 *   },
 * });
 */
export function useBulkRemoveModulesMutation(baseOptions?: Apollo.MutationHookOptions<BulkRemoveModulesMutation, BulkRemoveModulesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkRemoveModulesMutation, BulkRemoveModulesMutationVariables>(BulkRemoveModulesDocument, options);
      }
export type BulkRemoveModulesMutationHookResult = ReturnType<typeof useBulkRemoveModulesMutation>;
export type BulkRemoveModulesMutationResult = Apollo.MutationResult<BulkRemoveModulesMutation>;
export type BulkRemoveModulesMutationOptions = Apollo.BaseMutationOptions<BulkRemoveModulesMutation, BulkRemoveModulesMutationVariables>;
export const SoftDeleteModuleDocument = gql`
    mutation SoftDeleteModule($id: ID!) {
  softDeleteModule(id: $id) {
    deletedAt
    id
    message
  }
}
    `;
export type SoftDeleteModuleMutationFn = Apollo.MutationFunction<SoftDeleteModuleMutation, SoftDeleteModuleMutationVariables>;

/**
 * __useSoftDeleteModuleMutation__
 *
 * To run a mutation, you first call `useSoftDeleteModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSoftDeleteModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [softDeleteModuleMutation, { data, loading, error }] = useSoftDeleteModuleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSoftDeleteModuleMutation(baseOptions?: Apollo.MutationHookOptions<SoftDeleteModuleMutation, SoftDeleteModuleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SoftDeleteModuleMutation, SoftDeleteModuleMutationVariables>(SoftDeleteModuleDocument, options);
      }
export type SoftDeleteModuleMutationHookResult = ReturnType<typeof useSoftDeleteModuleMutation>;
export type SoftDeleteModuleMutationResult = Apollo.MutationResult<SoftDeleteModuleMutation>;
export type SoftDeleteModuleMutationOptions = Apollo.BaseMutationOptions<SoftDeleteModuleMutation, SoftDeleteModuleMutationVariables>;
export const HardDeleteModuleDocument = gql`
    mutation HardDeleteModule($id: ID!) {
  hardDeleteModule(id: $id) {
    deleted
    id
    message
  }
}
    `;
export type HardDeleteModuleMutationFn = Apollo.MutationFunction<HardDeleteModuleMutation, HardDeleteModuleMutationVariables>;

/**
 * __useHardDeleteModuleMutation__
 *
 * To run a mutation, you first call `useHardDeleteModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHardDeleteModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hardDeleteModuleMutation, { data, loading, error }] = useHardDeleteModuleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHardDeleteModuleMutation(baseOptions?: Apollo.MutationHookOptions<HardDeleteModuleMutation, HardDeleteModuleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HardDeleteModuleMutation, HardDeleteModuleMutationVariables>(HardDeleteModuleDocument, options);
      }
export type HardDeleteModuleMutationHookResult = ReturnType<typeof useHardDeleteModuleMutation>;
export type HardDeleteModuleMutationResult = Apollo.MutationResult<HardDeleteModuleMutation>;
export type HardDeleteModuleMutationOptions = Apollo.BaseMutationOptions<HardDeleteModuleMutation, HardDeleteModuleMutationVariables>;
export const RestoreModuleDocument = gql`
    mutation RestoreModule($id: ID!) {
  restoreModule(id: $id) {
    restoredAt
    id
    message
  }
}
    `;
export type RestoreModuleMutationFn = Apollo.MutationFunction<RestoreModuleMutation, RestoreModuleMutationVariables>;

/**
 * __useRestoreModuleMutation__
 *
 * To run a mutation, you first call `useRestoreModuleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreModuleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreModuleMutation, { data, loading, error }] = useRestoreModuleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRestoreModuleMutation(baseOptions?: Apollo.MutationHookOptions<RestoreModuleMutation, RestoreModuleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestoreModuleMutation, RestoreModuleMutationVariables>(RestoreModuleDocument, options);
      }
export type RestoreModuleMutationHookResult = ReturnType<typeof useRestoreModuleMutation>;
export type RestoreModuleMutationResult = Apollo.MutationResult<RestoreModuleMutation>;
export type RestoreModuleMutationOptions = Apollo.BaseMutationOptions<RestoreModuleMutation, RestoreModuleMutationVariables>;
export const BulkSoftDeleteModulesDocument = gql`
    mutation BulkSoftDeleteModules($input: BulkDeleteInput!) {
  bulkSoftDeleteModules(input: $input) {
    success
    deletedCount
    deletedIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkSoftDeleteModulesMutationFn = Apollo.MutationFunction<BulkSoftDeleteModulesMutation, BulkSoftDeleteModulesMutationVariables>;

/**
 * __useBulkSoftDeleteModulesMutation__
 *
 * To run a mutation, you first call `useBulkSoftDeleteModulesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkSoftDeleteModulesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkSoftDeleteModulesMutation, { data, loading, error }] = useBulkSoftDeleteModulesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkSoftDeleteModulesMutation(baseOptions?: Apollo.MutationHookOptions<BulkSoftDeleteModulesMutation, BulkSoftDeleteModulesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkSoftDeleteModulesMutation, BulkSoftDeleteModulesMutationVariables>(BulkSoftDeleteModulesDocument, options);
      }
export type BulkSoftDeleteModulesMutationHookResult = ReturnType<typeof useBulkSoftDeleteModulesMutation>;
export type BulkSoftDeleteModulesMutationResult = Apollo.MutationResult<BulkSoftDeleteModulesMutation>;
export type BulkSoftDeleteModulesMutationOptions = Apollo.BaseMutationOptions<BulkSoftDeleteModulesMutation, BulkSoftDeleteModulesMutationVariables>;
export const BulkHardDeleteModulesDocument = gql`
    mutation BulkHardDeleteModules($input: BulkDeleteInput!) {
  bulkHardDeleteModules(input: $input) {
    success
    deletedCount
    deletedIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkHardDeleteModulesMutationFn = Apollo.MutationFunction<BulkHardDeleteModulesMutation, BulkHardDeleteModulesMutationVariables>;

/**
 * __useBulkHardDeleteModulesMutation__
 *
 * To run a mutation, you first call `useBulkHardDeleteModulesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkHardDeleteModulesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkHardDeleteModulesMutation, { data, loading, error }] = useBulkHardDeleteModulesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkHardDeleteModulesMutation(baseOptions?: Apollo.MutationHookOptions<BulkHardDeleteModulesMutation, BulkHardDeleteModulesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkHardDeleteModulesMutation, BulkHardDeleteModulesMutationVariables>(BulkHardDeleteModulesDocument, options);
      }
export type BulkHardDeleteModulesMutationHookResult = ReturnType<typeof useBulkHardDeleteModulesMutation>;
export type BulkHardDeleteModulesMutationResult = Apollo.MutationResult<BulkHardDeleteModulesMutation>;
export type BulkHardDeleteModulesMutationOptions = Apollo.BaseMutationOptions<BulkHardDeleteModulesMutation, BulkHardDeleteModulesMutationVariables>;
export const BulkRestoreModulesDocument = gql`
    mutation BulkRestoreModules($input: BulkRestoreInput!) {
  bulkRestoreModules(input: $input) {
    success
    restoredCount
    restoredIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkRestoreModulesMutationFn = Apollo.MutationFunction<BulkRestoreModulesMutation, BulkRestoreModulesMutationVariables>;

/**
 * __useBulkRestoreModulesMutation__
 *
 * To run a mutation, you first call `useBulkRestoreModulesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkRestoreModulesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkRestoreModulesMutation, { data, loading, error }] = useBulkRestoreModulesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBulkRestoreModulesMutation(baseOptions?: Apollo.MutationHookOptions<BulkRestoreModulesMutation, BulkRestoreModulesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkRestoreModulesMutation, BulkRestoreModulesMutationVariables>(BulkRestoreModulesDocument, options);
      }
export type BulkRestoreModulesMutationHookResult = ReturnType<typeof useBulkRestoreModulesMutation>;
export type BulkRestoreModulesMutationResult = Apollo.MutationResult<BulkRestoreModulesMutation>;
export type BulkRestoreModulesMutationOptions = Apollo.BaseMutationOptions<BulkRestoreModulesMutation, BulkRestoreModulesMutationVariables>;
export const MarkNotificationAsReadDocument = gql`
    mutation MarkNotificationAsRead($notificationId: ID!) {
  markNotificationAsRead(notificationId: $notificationId)
}
    `;
export type MarkNotificationAsReadMutationFn = Apollo.MutationFunction<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;

/**
 * __useMarkNotificationAsReadMutation__
 *
 * To run a mutation, you first call `useMarkNotificationAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNotificationAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNotificationAsReadMutation, { data, loading, error }] = useMarkNotificationAsReadMutation({
 *   variables: {
 *      notificationId: // value for 'notificationId'
 *   },
 * });
 */
export function useMarkNotificationAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>(MarkNotificationAsReadDocument, options);
      }
export type MarkNotificationAsReadMutationHookResult = ReturnType<typeof useMarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationResult = Apollo.MutationResult<MarkNotificationAsReadMutation>;
export type MarkNotificationAsReadMutationOptions = Apollo.BaseMutationOptions<MarkNotificationAsReadMutation, MarkNotificationAsReadMutationVariables>;
export const MarkAllNotificationsAsReadDocument = gql`
    mutation MarkAllNotificationsAsRead {
  markAllNotificationsAsRead
}
    `;
export type MarkAllNotificationsAsReadMutationFn = Apollo.MutationFunction<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>;

/**
 * __useMarkAllNotificationsAsReadMutation__
 *
 * To run a mutation, you first call `useMarkAllNotificationsAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAllNotificationsAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAllNotificationsAsReadMutation, { data, loading, error }] = useMarkAllNotificationsAsReadMutation({
 *   variables: {
 *   },
 * });
 */
export function useMarkAllNotificationsAsReadMutation(baseOptions?: Apollo.MutationHookOptions<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>(MarkAllNotificationsAsReadDocument, options);
      }
export type MarkAllNotificationsAsReadMutationHookResult = ReturnType<typeof useMarkAllNotificationsAsReadMutation>;
export type MarkAllNotificationsAsReadMutationResult = Apollo.MutationResult<MarkAllNotificationsAsReadMutation>;
export type MarkAllNotificationsAsReadMutationOptions = Apollo.BaseMutationOptions<MarkAllNotificationsAsReadMutation, MarkAllNotificationsAsReadMutationVariables>;
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
export const BulkCreateUsersDocument = gql`
    mutation BulkCreateUsers($bulkCreateUsersInput: BulkCreateUsersInput!) {
  bulkCreateUsers(bulkCreateUsersInput: $bulkCreateUsersInput) {
    successCount
    failureCount
    totalProcessed
    createdUsers {
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
    failedUsers
  }
}
    `;
export type BulkCreateUsersMutationFn = Apollo.MutationFunction<BulkCreateUsersMutation, BulkCreateUsersMutationVariables>;

/**
 * __useBulkCreateUsersMutation__
 *
 * To run a mutation, you first call `useBulkCreateUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkCreateUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkCreateUsersMutation, { data, loading, error }] = useBulkCreateUsersMutation({
 *   variables: {
 *      bulkCreateUsersInput: // value for 'bulkCreateUsersInput'
 *   },
 * });
 */
export function useBulkCreateUsersMutation(baseOptions?: Apollo.MutationHookOptions<BulkCreateUsersMutation, BulkCreateUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkCreateUsersMutation, BulkCreateUsersMutationVariables>(BulkCreateUsersDocument, options);
      }
export type BulkCreateUsersMutationHookResult = ReturnType<typeof useBulkCreateUsersMutation>;
export type BulkCreateUsersMutationResult = Apollo.MutationResult<BulkCreateUsersMutation>;
export type BulkCreateUsersMutationOptions = Apollo.BaseMutationOptions<BulkCreateUsersMutation, BulkCreateUsersMutationVariables>;
export const BulkRemoveUsersDocument = gql`
    mutation BulkRemoveUsers($bulkRemoveUsersInput: BulkRemoveUsersInput!) {
  bulkRemoveUsers(bulkRemoveUsersInput: $bulkRemoveUsersInput) {
    success
    deletedCount
    deletedIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkRemoveUsersMutationFn = Apollo.MutationFunction<BulkRemoveUsersMutation, BulkRemoveUsersMutationVariables>;

/**
 * __useBulkRemoveUsersMutation__
 *
 * To run a mutation, you first call `useBulkRemoveUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkRemoveUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkRemoveUsersMutation, { data, loading, error }] = useBulkRemoveUsersMutation({
 *   variables: {
 *      bulkRemoveUsersInput: // value for 'bulkRemoveUsersInput'
 *   },
 * });
 */
export function useBulkRemoveUsersMutation(baseOptions?: Apollo.MutationHookOptions<BulkRemoveUsersMutation, BulkRemoveUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkRemoveUsersMutation, BulkRemoveUsersMutationVariables>(BulkRemoveUsersDocument, options);
      }
export type BulkRemoveUsersMutationHookResult = ReturnType<typeof useBulkRemoveUsersMutation>;
export type BulkRemoveUsersMutationResult = Apollo.MutationResult<BulkRemoveUsersMutation>;
export type BulkRemoveUsersMutationOptions = Apollo.BaseMutationOptions<BulkRemoveUsersMutation, BulkRemoveUsersMutationVariables>;
export const SoftDeleteUserDocument = gql`
    mutation SoftDeleteUser($id: ID!) {
  softDeleteUser(id: $id) {
    deletedAt
    deletedBy
    id
    message
  }
}
    `;
export type SoftDeleteUserMutationFn = Apollo.MutationFunction<SoftDeleteUserMutation, SoftDeleteUserMutationVariables>;

/**
 * __useSoftDeleteUserMutation__
 *
 * To run a mutation, you first call `useSoftDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSoftDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [softDeleteUserMutation, { data, loading, error }] = useSoftDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSoftDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<SoftDeleteUserMutation, SoftDeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SoftDeleteUserMutation, SoftDeleteUserMutationVariables>(SoftDeleteUserDocument, options);
      }
export type SoftDeleteUserMutationHookResult = ReturnType<typeof useSoftDeleteUserMutation>;
export type SoftDeleteUserMutationResult = Apollo.MutationResult<SoftDeleteUserMutation>;
export type SoftDeleteUserMutationOptions = Apollo.BaseMutationOptions<SoftDeleteUserMutation, SoftDeleteUserMutationVariables>;
export const HardDeleteUserDocument = gql`
    mutation HardDeleteUser($id: ID!, $force: Boolean) {
  hardDeleteUser(id: $id, force: $force) {
    deleted
    id
    message
  }
}
    `;
export type HardDeleteUserMutationFn = Apollo.MutationFunction<HardDeleteUserMutation, HardDeleteUserMutationVariables>;

/**
 * __useHardDeleteUserMutation__
 *
 * To run a mutation, you first call `useHardDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHardDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [hardDeleteUserMutation, { data, loading, error }] = useHardDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      force: // value for 'force'
 *   },
 * });
 */
export function useHardDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<HardDeleteUserMutation, HardDeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HardDeleteUserMutation, HardDeleteUserMutationVariables>(HardDeleteUserDocument, options);
      }
export type HardDeleteUserMutationHookResult = ReturnType<typeof useHardDeleteUserMutation>;
export type HardDeleteUserMutationResult = Apollo.MutationResult<HardDeleteUserMutation>;
export type HardDeleteUserMutationOptions = Apollo.BaseMutationOptions<HardDeleteUserMutation, HardDeleteUserMutationVariables>;
export const RestoreUserDocument = gql`
    mutation RestoreUser($id: ID!) {
  restoreUser(id: $id) {
    restoredAt
    restoredBy
    id
    message
  }
}
    `;
export type RestoreUserMutationFn = Apollo.MutationFunction<RestoreUserMutation, RestoreUserMutationVariables>;

/**
 * __useRestoreUserMutation__
 *
 * To run a mutation, you first call `useRestoreUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreUserMutation, { data, loading, error }] = useRestoreUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRestoreUserMutation(baseOptions?: Apollo.MutationHookOptions<RestoreUserMutation, RestoreUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestoreUserMutation, RestoreUserMutationVariables>(RestoreUserDocument, options);
      }
export type RestoreUserMutationHookResult = ReturnType<typeof useRestoreUserMutation>;
export type RestoreUserMutationResult = Apollo.MutationResult<RestoreUserMutation>;
export type RestoreUserMutationOptions = Apollo.BaseMutationOptions<RestoreUserMutation, RestoreUserMutationVariables>;
export const BulkSoftDeleteUsersDocument = gql`
    mutation BulkSoftDeleteUsers($ids: [String!]!) {
  bulkSoftDeleteUsers(ids: $ids) {
    success
    deletedCount
    deletedIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkSoftDeleteUsersMutationFn = Apollo.MutationFunction<BulkSoftDeleteUsersMutation, BulkSoftDeleteUsersMutationVariables>;

/**
 * __useBulkSoftDeleteUsersMutation__
 *
 * To run a mutation, you first call `useBulkSoftDeleteUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkSoftDeleteUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkSoftDeleteUsersMutation, { data, loading, error }] = useBulkSoftDeleteUsersMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkSoftDeleteUsersMutation(baseOptions?: Apollo.MutationHookOptions<BulkSoftDeleteUsersMutation, BulkSoftDeleteUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkSoftDeleteUsersMutation, BulkSoftDeleteUsersMutationVariables>(BulkSoftDeleteUsersDocument, options);
      }
export type BulkSoftDeleteUsersMutationHookResult = ReturnType<typeof useBulkSoftDeleteUsersMutation>;
export type BulkSoftDeleteUsersMutationResult = Apollo.MutationResult<BulkSoftDeleteUsersMutation>;
export type BulkSoftDeleteUsersMutationOptions = Apollo.BaseMutationOptions<BulkSoftDeleteUsersMutation, BulkSoftDeleteUsersMutationVariables>;
export const BulkHardDeleteUsersDocument = gql`
    mutation BulkHardDeleteUsers($ids: [String!]!, $force: Boolean) {
  bulkHardDeleteUsers(ids: $ids, force: $force) {
    success
    deletedCount
    deletedIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkHardDeleteUsersMutationFn = Apollo.MutationFunction<BulkHardDeleteUsersMutation, BulkHardDeleteUsersMutationVariables>;

/**
 * __useBulkHardDeleteUsersMutation__
 *
 * To run a mutation, you first call `useBulkHardDeleteUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkHardDeleteUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkHardDeleteUsersMutation, { data, loading, error }] = useBulkHardDeleteUsersMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *      force: // value for 'force'
 *   },
 * });
 */
export function useBulkHardDeleteUsersMutation(baseOptions?: Apollo.MutationHookOptions<BulkHardDeleteUsersMutation, BulkHardDeleteUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkHardDeleteUsersMutation, BulkHardDeleteUsersMutationVariables>(BulkHardDeleteUsersDocument, options);
      }
export type BulkHardDeleteUsersMutationHookResult = ReturnType<typeof useBulkHardDeleteUsersMutation>;
export type BulkHardDeleteUsersMutationResult = Apollo.MutationResult<BulkHardDeleteUsersMutation>;
export type BulkHardDeleteUsersMutationOptions = Apollo.BaseMutationOptions<BulkHardDeleteUsersMutation, BulkHardDeleteUsersMutationVariables>;
export const BulkRestoreUsersDocument = gql`
    mutation BulkRestoreUsers($ids: [String!]!) {
  bulkRestoreUsers(ids: $ids) {
    success
    restoredCount
    restoredIds
    failedIds
    errorMessages
  }
}
    `;
export type BulkRestoreUsersMutationFn = Apollo.MutationFunction<BulkRestoreUsersMutation, BulkRestoreUsersMutationVariables>;

/**
 * __useBulkRestoreUsersMutation__
 *
 * To run a mutation, you first call `useBulkRestoreUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBulkRestoreUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bulkRestoreUsersMutation, { data, loading, error }] = useBulkRestoreUsersMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useBulkRestoreUsersMutation(baseOptions?: Apollo.MutationHookOptions<BulkRestoreUsersMutation, BulkRestoreUsersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BulkRestoreUsersMutation, BulkRestoreUsersMutationVariables>(BulkRestoreUsersDocument, options);
      }
export type BulkRestoreUsersMutationHookResult = ReturnType<typeof useBulkRestoreUsersMutation>;
export type BulkRestoreUsersMutationResult = Apollo.MutationResult<BulkRestoreUsersMutation>;
export type BulkRestoreUsersMutationOptions = Apollo.BaseMutationOptions<BulkRestoreUsersMutation, BulkRestoreUsersMutationVariables>;
export const MyAnalyticsDocument = gql`
    query MyAnalytics {
  myAnalytics
}
    `;

/**
 * __useMyAnalyticsQuery__
 *
 * To run a query within a React component, call `useMyAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyAnalyticsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyAnalyticsQuery(baseOptions?: Apollo.QueryHookOptions<MyAnalyticsQuery, MyAnalyticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyAnalyticsQuery, MyAnalyticsQueryVariables>(MyAnalyticsDocument, options);
      }
export function useMyAnalyticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyAnalyticsQuery, MyAnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyAnalyticsQuery, MyAnalyticsQueryVariables>(MyAnalyticsDocument, options);
        }
export function useMyAnalyticsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyAnalyticsQuery, MyAnalyticsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyAnalyticsQuery, MyAnalyticsQueryVariables>(MyAnalyticsDocument, options);
        }
export type MyAnalyticsQueryHookResult = ReturnType<typeof useMyAnalyticsQuery>;
export type MyAnalyticsLazyQueryHookResult = ReturnType<typeof useMyAnalyticsLazyQuery>;
export type MyAnalyticsSuspenseQueryHookResult = ReturnType<typeof useMyAnalyticsSuspenseQuery>;
export type MyAnalyticsQueryResult = Apollo.QueryResult<MyAnalyticsQuery, MyAnalyticsQueryVariables>;
export const SystemOverviewDocument = gql`
    query SystemOverview {
  systemOverview
}
    `;

/**
 * __useSystemOverviewQuery__
 *
 * To run a query within a React component, call `useSystemOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useSystemOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSystemOverviewQuery({
 *   variables: {
 *   },
 * });
 */
export function useSystemOverviewQuery(baseOptions?: Apollo.QueryHookOptions<SystemOverviewQuery, SystemOverviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SystemOverviewQuery, SystemOverviewQueryVariables>(SystemOverviewDocument, options);
      }
export function useSystemOverviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SystemOverviewQuery, SystemOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SystemOverviewQuery, SystemOverviewQueryVariables>(SystemOverviewDocument, options);
        }
export function useSystemOverviewSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SystemOverviewQuery, SystemOverviewQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SystemOverviewQuery, SystemOverviewQueryVariables>(SystemOverviewDocument, options);
        }
export type SystemOverviewQueryHookResult = ReturnType<typeof useSystemOverviewQuery>;
export type SystemOverviewLazyQueryHookResult = ReturnType<typeof useSystemOverviewLazyQuery>;
export type SystemOverviewSuspenseQueryHookResult = ReturnType<typeof useSystemOverviewSuspenseQuery>;
export type SystemOverviewQueryResult = Apollo.QueryResult<SystemOverviewQuery, SystemOverviewQueryVariables>;
export const RecentActivityDocument = gql`
    query RecentActivity($limit: Float) {
  recentActivity(limit: $limit)
}
    `;

/**
 * __useRecentActivityQuery__
 *
 * To run a query within a React component, call `useRecentActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentActivityQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useRecentActivityQuery(baseOptions?: Apollo.QueryHookOptions<RecentActivityQuery, RecentActivityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecentActivityQuery, RecentActivityQueryVariables>(RecentActivityDocument, options);
      }
export function useRecentActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecentActivityQuery, RecentActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecentActivityQuery, RecentActivityQueryVariables>(RecentActivityDocument, options);
        }
export function useRecentActivitySuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RecentActivityQuery, RecentActivityQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RecentActivityQuery, RecentActivityQueryVariables>(RecentActivityDocument, options);
        }
export type RecentActivityQueryHookResult = ReturnType<typeof useRecentActivityQuery>;
export type RecentActivityLazyQueryHookResult = ReturnType<typeof useRecentActivityLazyQuery>;
export type RecentActivitySuspenseQueryHookResult = ReturnType<typeof useRecentActivitySuspenseQuery>;
export type RecentActivityQueryResult = Apollo.QueryResult<RecentActivityQuery, RecentActivityQueryVariables>;
export const GlobalUserStatsDocument = gql`
    query GlobalUserStats {
  userStats
}
    `;

/**
 * __useGlobalUserStatsQuery__
 *
 * To run a query within a React component, call `useGlobalUserStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGlobalUserStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGlobalUserStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGlobalUserStatsQuery(baseOptions?: Apollo.QueryHookOptions<GlobalUserStatsQuery, GlobalUserStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GlobalUserStatsQuery, GlobalUserStatsQueryVariables>(GlobalUserStatsDocument, options);
      }
export function useGlobalUserStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GlobalUserStatsQuery, GlobalUserStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GlobalUserStatsQuery, GlobalUserStatsQueryVariables>(GlobalUserStatsDocument, options);
        }
export function useGlobalUserStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GlobalUserStatsQuery, GlobalUserStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GlobalUserStatsQuery, GlobalUserStatsQueryVariables>(GlobalUserStatsDocument, options);
        }
export type GlobalUserStatsQueryHookResult = ReturnType<typeof useGlobalUserStatsQuery>;
export type GlobalUserStatsLazyQueryHookResult = ReturnType<typeof useGlobalUserStatsLazyQuery>;
export type GlobalUserStatsSuspenseQueryHookResult = ReturnType<typeof useGlobalUserStatsSuspenseQuery>;
export type GlobalUserStatsQueryResult = Apollo.QueryResult<GlobalUserStatsQuery, GlobalUserStatsQueryVariables>;
export const StudentAnalyticsDocument = gql`
    query StudentAnalytics($studentId: ID) {
  studentAnalytics(studentId: $studentId)
}
    `;

/**
 * __useStudentAnalyticsQuery__
 *
 * To run a query within a React component, call `useStudentAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentAnalyticsQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useStudentAnalyticsQuery(baseOptions?: Apollo.QueryHookOptions<StudentAnalyticsQuery, StudentAnalyticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StudentAnalyticsQuery, StudentAnalyticsQueryVariables>(StudentAnalyticsDocument, options);
      }
export function useStudentAnalyticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentAnalyticsQuery, StudentAnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StudentAnalyticsQuery, StudentAnalyticsQueryVariables>(StudentAnalyticsDocument, options);
        }
export function useStudentAnalyticsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StudentAnalyticsQuery, StudentAnalyticsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StudentAnalyticsQuery, StudentAnalyticsQueryVariables>(StudentAnalyticsDocument, options);
        }
export type StudentAnalyticsQueryHookResult = ReturnType<typeof useStudentAnalyticsQuery>;
export type StudentAnalyticsLazyQueryHookResult = ReturnType<typeof useStudentAnalyticsLazyQuery>;
export type StudentAnalyticsSuspenseQueryHookResult = ReturnType<typeof useStudentAnalyticsSuspenseQuery>;
export type StudentAnalyticsQueryResult = Apollo.QueryResult<StudentAnalyticsQuery, StudentAnalyticsQueryVariables>;
export const ProgressAnalyticsDocument = gql`
    query ProgressAnalytics($courseId: ID) {
  progressAnalytics(courseId: $courseId)
}
    `;

/**
 * __useProgressAnalyticsQuery__
 *
 * To run a query within a React component, call `useProgressAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProgressAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProgressAnalyticsQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useProgressAnalyticsQuery(baseOptions?: Apollo.QueryHookOptions<ProgressAnalyticsQuery, ProgressAnalyticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProgressAnalyticsQuery, ProgressAnalyticsQueryVariables>(ProgressAnalyticsDocument, options);
      }
export function useProgressAnalyticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProgressAnalyticsQuery, ProgressAnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProgressAnalyticsQuery, ProgressAnalyticsQueryVariables>(ProgressAnalyticsDocument, options);
        }
export function useProgressAnalyticsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProgressAnalyticsQuery, ProgressAnalyticsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProgressAnalyticsQuery, ProgressAnalyticsQueryVariables>(ProgressAnalyticsDocument, options);
        }
export type ProgressAnalyticsQueryHookResult = ReturnType<typeof useProgressAnalyticsQuery>;
export type ProgressAnalyticsLazyQueryHookResult = ReturnType<typeof useProgressAnalyticsLazyQuery>;
export type ProgressAnalyticsSuspenseQueryHookResult = ReturnType<typeof useProgressAnalyticsSuspenseQuery>;
export type ProgressAnalyticsQueryResult = Apollo.QueryResult<ProgressAnalyticsQuery, ProgressAnalyticsQueryVariables>;
export const AssignmentAnalyticsDocument = gql`
    query AssignmentAnalytics($courseId: ID) {
  assignmentAnalytics(courseId: $courseId)
}
    `;

/**
 * __useAssignmentAnalyticsQuery__
 *
 * To run a query within a React component, call `useAssignmentAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssignmentAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssignmentAnalyticsQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useAssignmentAnalyticsQuery(baseOptions?: Apollo.QueryHookOptions<AssignmentAnalyticsQuery, AssignmentAnalyticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AssignmentAnalyticsQuery, AssignmentAnalyticsQueryVariables>(AssignmentAnalyticsDocument, options);
      }
export function useAssignmentAnalyticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AssignmentAnalyticsQuery, AssignmentAnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AssignmentAnalyticsQuery, AssignmentAnalyticsQueryVariables>(AssignmentAnalyticsDocument, options);
        }
export function useAssignmentAnalyticsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AssignmentAnalyticsQuery, AssignmentAnalyticsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AssignmentAnalyticsQuery, AssignmentAnalyticsQueryVariables>(AssignmentAnalyticsDocument, options);
        }
export type AssignmentAnalyticsQueryHookResult = ReturnType<typeof useAssignmentAnalyticsQuery>;
export type AssignmentAnalyticsLazyQueryHookResult = ReturnType<typeof useAssignmentAnalyticsLazyQuery>;
export type AssignmentAnalyticsSuspenseQueryHookResult = ReturnType<typeof useAssignmentAnalyticsSuspenseQuery>;
export type AssignmentAnalyticsQueryResult = Apollo.QueryResult<AssignmentAnalyticsQuery, AssignmentAnalyticsQueryVariables>;
export const AssignmentStatsDocument = gql`
    query AssignmentStats($assignmentId: ID!) {
  assignmentStats(assignmentId: $assignmentId)
}
    `;

/**
 * __useAssignmentStatsQuery__
 *
 * To run a query within a React component, call `useAssignmentStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssignmentStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssignmentStatsQuery({
 *   variables: {
 *      assignmentId: // value for 'assignmentId'
 *   },
 * });
 */
export function useAssignmentStatsQuery(baseOptions: Apollo.QueryHookOptions<AssignmentStatsQuery, AssignmentStatsQueryVariables> & ({ variables: AssignmentStatsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AssignmentStatsQuery, AssignmentStatsQueryVariables>(AssignmentStatsDocument, options);
      }
export function useAssignmentStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AssignmentStatsQuery, AssignmentStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AssignmentStatsQuery, AssignmentStatsQueryVariables>(AssignmentStatsDocument, options);
        }
export function useAssignmentStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AssignmentStatsQuery, AssignmentStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AssignmentStatsQuery, AssignmentStatsQueryVariables>(AssignmentStatsDocument, options);
        }
export type AssignmentStatsQueryHookResult = ReturnType<typeof useAssignmentStatsQuery>;
export type AssignmentStatsLazyQueryHookResult = ReturnType<typeof useAssignmentStatsLazyQuery>;
export type AssignmentStatsSuspenseQueryHookResult = ReturnType<typeof useAssignmentStatsSuspenseQuery>;
export type AssignmentStatsQueryResult = Apollo.QueryResult<AssignmentStatsQuery, AssignmentStatsQueryVariables>;
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
export const GetDeletedAssignmentsDocument = gql`
    query GetDeletedAssignments {
  getDeletedAssignments {
    id
    title
    description
    batchId
    dueDate
    isActive
    createdAt
    updatedAt
    deletedAt
    deletedBy
    batch {
      id
      name
    }
  }
}
    `;

/**
 * __useGetDeletedAssignmentsQuery__
 *
 * To run a query within a React component, call `useGetDeletedAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeletedAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeletedAssignmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDeletedAssignmentsQuery(baseOptions?: Apollo.QueryHookOptions<GetDeletedAssignmentsQuery, GetDeletedAssignmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeletedAssignmentsQuery, GetDeletedAssignmentsQueryVariables>(GetDeletedAssignmentsDocument, options);
      }
export function useGetDeletedAssignmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeletedAssignmentsQuery, GetDeletedAssignmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeletedAssignmentsQuery, GetDeletedAssignmentsQueryVariables>(GetDeletedAssignmentsDocument, options);
        }
export function useGetDeletedAssignmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDeletedAssignmentsQuery, GetDeletedAssignmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDeletedAssignmentsQuery, GetDeletedAssignmentsQueryVariables>(GetDeletedAssignmentsDocument, options);
        }
export type GetDeletedAssignmentsQueryHookResult = ReturnType<typeof useGetDeletedAssignmentsQuery>;
export type GetDeletedAssignmentsLazyQueryHookResult = ReturnType<typeof useGetDeletedAssignmentsLazyQuery>;
export type GetDeletedAssignmentsSuspenseQueryHookResult = ReturnType<typeof useGetDeletedAssignmentsSuspenseQuery>;
export type GetDeletedAssignmentsQueryResult = Apollo.QueryResult<GetDeletedAssignmentsQuery, GetDeletedAssignmentsQueryVariables>;
export const AttendanceSessionDocument = gql`
    query AttendanceSession($id: ID!) {
  attendanceSession(id: $id) {
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
      createdAt
      enrollmentId
      id
      isPresent
      sessionId
      studentId
      updatedAt
      student {
        id
        firstName
        lastName
        username
        email
      }
      enrollment {
        id
        enrollmentDate
        status
      }
    }
  }
}
    `;

/**
 * __useAttendanceSessionQuery__
 *
 * To run a query within a React component, call `useAttendanceSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttendanceSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttendanceSessionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAttendanceSessionQuery(baseOptions: Apollo.QueryHookOptions<AttendanceSessionQuery, AttendanceSessionQueryVariables> & ({ variables: AttendanceSessionQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AttendanceSessionQuery, AttendanceSessionQueryVariables>(AttendanceSessionDocument, options);
      }
export function useAttendanceSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AttendanceSessionQuery, AttendanceSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AttendanceSessionQuery, AttendanceSessionQueryVariables>(AttendanceSessionDocument, options);
        }
export function useAttendanceSessionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AttendanceSessionQuery, AttendanceSessionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AttendanceSessionQuery, AttendanceSessionQueryVariables>(AttendanceSessionDocument, options);
        }
export type AttendanceSessionQueryHookResult = ReturnType<typeof useAttendanceSessionQuery>;
export type AttendanceSessionLazyQueryHookResult = ReturnType<typeof useAttendanceSessionLazyQuery>;
export type AttendanceSessionSuspenseQueryHookResult = ReturnType<typeof useAttendanceSessionSuspenseQuery>;
export type AttendanceSessionQueryResult = Apollo.QueryResult<AttendanceSessionQuery, AttendanceSessionQueryVariables>;
export const AttendanceSessionsDocument = gql`
    query AttendanceSessions($filter: AttendanceFilterInput, $pagination: PaginationInput, $sort: SortInput) {
  attendanceSessions(filter: $filter, pagination: $pagination, sort: $sort) {
    data {
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
 * __useAttendanceSessionsQuery__
 *
 * To run a query within a React component, call `useAttendanceSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttendanceSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttendanceSessionsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useAttendanceSessionsQuery(baseOptions?: Apollo.QueryHookOptions<AttendanceSessionsQuery, AttendanceSessionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AttendanceSessionsQuery, AttendanceSessionsQueryVariables>(AttendanceSessionsDocument, options);
      }
export function useAttendanceSessionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AttendanceSessionsQuery, AttendanceSessionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AttendanceSessionsQuery, AttendanceSessionsQueryVariables>(AttendanceSessionsDocument, options);
        }
export function useAttendanceSessionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AttendanceSessionsQuery, AttendanceSessionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AttendanceSessionsQuery, AttendanceSessionsQueryVariables>(AttendanceSessionsDocument, options);
        }
export type AttendanceSessionsQueryHookResult = ReturnType<typeof useAttendanceSessionsQuery>;
export type AttendanceSessionsLazyQueryHookResult = ReturnType<typeof useAttendanceSessionsLazyQuery>;
export type AttendanceSessionsSuspenseQueryHookResult = ReturnType<typeof useAttendanceSessionsSuspenseQuery>;
export type AttendanceSessionsQueryResult = Apollo.QueryResult<AttendanceSessionsQuery, AttendanceSessionsQueryVariables>;
export const BatchAttendanceDocument = gql`
    query BatchAttendance($batchId: ID!) {
  batchAttendance(batchId: $batchId) {
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
      batch {
        id
        name
      }
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

/**
 * __useBatchAttendanceQuery__
 *
 * To run a query within a React component, call `useBatchAttendanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useBatchAttendanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBatchAttendanceQuery({
 *   variables: {
 *      batchId: // value for 'batchId'
 *   },
 * });
 */
export function useBatchAttendanceQuery(baseOptions: Apollo.QueryHookOptions<BatchAttendanceQuery, BatchAttendanceQueryVariables> & ({ variables: BatchAttendanceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BatchAttendanceQuery, BatchAttendanceQueryVariables>(BatchAttendanceDocument, options);
      }
export function useBatchAttendanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BatchAttendanceQuery, BatchAttendanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BatchAttendanceQuery, BatchAttendanceQueryVariables>(BatchAttendanceDocument, options);
        }
export function useBatchAttendanceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BatchAttendanceQuery, BatchAttendanceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BatchAttendanceQuery, BatchAttendanceQueryVariables>(BatchAttendanceDocument, options);
        }
export type BatchAttendanceQueryHookResult = ReturnType<typeof useBatchAttendanceQuery>;
export type BatchAttendanceLazyQueryHookResult = ReturnType<typeof useBatchAttendanceLazyQuery>;
export type BatchAttendanceSuspenseQueryHookResult = ReturnType<typeof useBatchAttendanceSuspenseQuery>;
export type BatchAttendanceQueryResult = Apollo.QueryResult<BatchAttendanceQuery, BatchAttendanceQueryVariables>;
export const BatchAttendanceSessionsDocument = gql`
    query BatchAttendanceSessions($batchId: ID!) {
  batchAttendanceSessions(batchId: $batchId) {
    batchId
    createdAt
    id
    sessionDate
    sessionTitle
    updatedAt
    batch {
      id
      name
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

/**
 * __useBatchAttendanceSessionsQuery__
 *
 * To run a query within a React component, call `useBatchAttendanceSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBatchAttendanceSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBatchAttendanceSessionsQuery({
 *   variables: {
 *      batchId: // value for 'batchId'
 *   },
 * });
 */
export function useBatchAttendanceSessionsQuery(baseOptions: Apollo.QueryHookOptions<BatchAttendanceSessionsQuery, BatchAttendanceSessionsQueryVariables> & ({ variables: BatchAttendanceSessionsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BatchAttendanceSessionsQuery, BatchAttendanceSessionsQueryVariables>(BatchAttendanceSessionsDocument, options);
      }
export function useBatchAttendanceSessionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BatchAttendanceSessionsQuery, BatchAttendanceSessionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BatchAttendanceSessionsQuery, BatchAttendanceSessionsQueryVariables>(BatchAttendanceSessionsDocument, options);
        }
export function useBatchAttendanceSessionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BatchAttendanceSessionsQuery, BatchAttendanceSessionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BatchAttendanceSessionsQuery, BatchAttendanceSessionsQueryVariables>(BatchAttendanceSessionsDocument, options);
        }
export type BatchAttendanceSessionsQueryHookResult = ReturnType<typeof useBatchAttendanceSessionsQuery>;
export type BatchAttendanceSessionsLazyQueryHookResult = ReturnType<typeof useBatchAttendanceSessionsLazyQuery>;
export type BatchAttendanceSessionsSuspenseQueryHookResult = ReturnType<typeof useBatchAttendanceSessionsSuspenseQuery>;
export type BatchAttendanceSessionsQueryResult = Apollo.QueryResult<BatchAttendanceSessionsQuery, BatchAttendanceSessionsQueryVariables>;
export const AttendanceAnalyticsDocument = gql`
    query AttendanceAnalytics($batchId: ID) {
  attendanceAnalytics(batchId: $batchId)
}
    `;

/**
 * __useAttendanceAnalyticsQuery__
 *
 * To run a query within a React component, call `useAttendanceAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttendanceAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttendanceAnalyticsQuery({
 *   variables: {
 *      batchId: // value for 'batchId'
 *   },
 * });
 */
export function useAttendanceAnalyticsQuery(baseOptions?: Apollo.QueryHookOptions<AttendanceAnalyticsQuery, AttendanceAnalyticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AttendanceAnalyticsQuery, AttendanceAnalyticsQueryVariables>(AttendanceAnalyticsDocument, options);
      }
export function useAttendanceAnalyticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AttendanceAnalyticsQuery, AttendanceAnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AttendanceAnalyticsQuery, AttendanceAnalyticsQueryVariables>(AttendanceAnalyticsDocument, options);
        }
export function useAttendanceAnalyticsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AttendanceAnalyticsQuery, AttendanceAnalyticsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AttendanceAnalyticsQuery, AttendanceAnalyticsQueryVariables>(AttendanceAnalyticsDocument, options);
        }
export type AttendanceAnalyticsQueryHookResult = ReturnType<typeof useAttendanceAnalyticsQuery>;
export type AttendanceAnalyticsLazyQueryHookResult = ReturnType<typeof useAttendanceAnalyticsLazyQuery>;
export type AttendanceAnalyticsSuspenseQueryHookResult = ReturnType<typeof useAttendanceAnalyticsSuspenseQuery>;
export type AttendanceAnalyticsQueryResult = Apollo.QueryResult<AttendanceAnalyticsQuery, AttendanceAnalyticsQueryVariables>;
export const AttendanceStatsDocument = gql`
    query AttendanceStats($batchId: ID!) {
  attendanceStats(batchId: $batchId)
}
    `;

/**
 * __useAttendanceStatsQuery__
 *
 * To run a query within a React component, call `useAttendanceStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAttendanceStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttendanceStatsQuery({
 *   variables: {
 *      batchId: // value for 'batchId'
 *   },
 * });
 */
export function useAttendanceStatsQuery(baseOptions: Apollo.QueryHookOptions<AttendanceStatsQuery, AttendanceStatsQueryVariables> & ({ variables: AttendanceStatsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AttendanceStatsQuery, AttendanceStatsQueryVariables>(AttendanceStatsDocument, options);
      }
export function useAttendanceStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AttendanceStatsQuery, AttendanceStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AttendanceStatsQuery, AttendanceStatsQueryVariables>(AttendanceStatsDocument, options);
        }
export function useAttendanceStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<AttendanceStatsQuery, AttendanceStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AttendanceStatsQuery, AttendanceStatsQueryVariables>(AttendanceStatsDocument, options);
        }
export type AttendanceStatsQueryHookResult = ReturnType<typeof useAttendanceStatsQuery>;
export type AttendanceStatsLazyQueryHookResult = ReturnType<typeof useAttendanceStatsLazyQuery>;
export type AttendanceStatsSuspenseQueryHookResult = ReturnType<typeof useAttendanceStatsSuspenseQuery>;
export type AttendanceStatsQueryResult = Apollo.QueryResult<AttendanceStatsQuery, AttendanceStatsQueryVariables>;
export const BatchDocument = gql`
    query Batch($id: ID!) {
  batch(id: $id) {
    courseId
    createdAt
    endDate
    id
    isActive
    name
    startDate
    updatedAt
    course {
      id
      title
      description
      isActive
      creator {
        id
        firstName
        lastName
        username
        email
      }
    }
    enrollments {
      id
      enrollmentDate
      status
      studentId
      batchId
      student {
        id
        firstName
        lastName
        username
        email
        phone
        role
      }
    }
    attendanceSessions {
      id
      sessionDate
      sessionTitle
      batchId
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
}
    `;

/**
 * __useBatchQuery__
 *
 * To run a query within a React component, call `useBatchQuery` and pass it any options that fit your needs.
 * When your component renders, `useBatchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBatchQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBatchQuery(baseOptions: Apollo.QueryHookOptions<BatchQuery, BatchQueryVariables> & ({ variables: BatchQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BatchQuery, BatchQueryVariables>(BatchDocument, options);
      }
export function useBatchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BatchQuery, BatchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BatchQuery, BatchQueryVariables>(BatchDocument, options);
        }
export function useBatchSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BatchQuery, BatchQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BatchQuery, BatchQueryVariables>(BatchDocument, options);
        }
export type BatchQueryHookResult = ReturnType<typeof useBatchQuery>;
export type BatchLazyQueryHookResult = ReturnType<typeof useBatchLazyQuery>;
export type BatchSuspenseQueryHookResult = ReturnType<typeof useBatchSuspenseQuery>;
export type BatchQueryResult = Apollo.QueryResult<BatchQuery, BatchQueryVariables>;
export const BatchesDocument = gql`
    query Batches($filter: BatchFilterInput, $pagination: PaginationInput, $sort: SortInput) {
  batches(filter: $filter, pagination: $pagination, sort: $sort) {
    data {
      courseId
      createdAt
      endDate
      id
      isActive
      name
      startDate
      updatedAt
      course {
        id
        title
        description
        creator {
          id
          firstName
          lastName
          username
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
 * __useBatchesQuery__
 *
 * To run a query within a React component, call `useBatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBatchesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useBatchesQuery(baseOptions?: Apollo.QueryHookOptions<BatchesQuery, BatchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BatchesQuery, BatchesQueryVariables>(BatchesDocument, options);
      }
export function useBatchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BatchesQuery, BatchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BatchesQuery, BatchesQueryVariables>(BatchesDocument, options);
        }
export function useBatchesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BatchesQuery, BatchesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BatchesQuery, BatchesQueryVariables>(BatchesDocument, options);
        }
export type BatchesQueryHookResult = ReturnType<typeof useBatchesQuery>;
export type BatchesLazyQueryHookResult = ReturnType<typeof useBatchesLazyQuery>;
export type BatchesSuspenseQueryHookResult = ReturnType<typeof useBatchesSuspenseQuery>;
export type BatchesQueryResult = Apollo.QueryResult<BatchesQuery, BatchesQueryVariables>;
export const CourseBatchesDocument = gql`
    query CourseBatches($courseId: ID!) {
  courseBatches(courseId: $courseId) {
    courseId
    createdAt
    endDate
    id
    isActive
    name
    startDate
    updatedAt
    course {
      id
      title
      description
    }
    enrollments {
      id
      enrollmentDate
      status
      studentId
      student {
        id
        firstName
        lastName
        username
        email
      }
    }
  }
}
    `;

/**
 * __useCourseBatchesQuery__
 *
 * To run a query within a React component, call `useCourseBatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseBatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseBatchesQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useCourseBatchesQuery(baseOptions: Apollo.QueryHookOptions<CourseBatchesQuery, CourseBatchesQueryVariables> & ({ variables: CourseBatchesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseBatchesQuery, CourseBatchesQueryVariables>(CourseBatchesDocument, options);
      }
export function useCourseBatchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseBatchesQuery, CourseBatchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseBatchesQuery, CourseBatchesQueryVariables>(CourseBatchesDocument, options);
        }
export function useCourseBatchesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CourseBatchesQuery, CourseBatchesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CourseBatchesQuery, CourseBatchesQueryVariables>(CourseBatchesDocument, options);
        }
export type CourseBatchesQueryHookResult = ReturnType<typeof useCourseBatchesQuery>;
export type CourseBatchesLazyQueryHookResult = ReturnType<typeof useCourseBatchesLazyQuery>;
export type CourseBatchesSuspenseQueryHookResult = ReturnType<typeof useCourseBatchesSuspenseQuery>;
export type CourseBatchesQueryResult = Apollo.QueryResult<CourseBatchesQuery, CourseBatchesQueryVariables>;
export const BatchEnrollmentsDocument = gql`
    query BatchEnrollments($batchId: ID!) {
  batchEnrollments(batchId: $batchId) {
    id
    enrollmentDate
    status
    studentId
    batchId
    createdAt
    updatedAt
    student {
      id
      firstName
      lastName
      username
      email
      phone
      role
      isActive
    }
    batch {
      id
      name
      startDate
      endDate
      course {
        id
        title
      }
    }
  }
}
    `;

/**
 * __useBatchEnrollmentsQuery__
 *
 * To run a query within a React component, call `useBatchEnrollmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBatchEnrollmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBatchEnrollmentsQuery({
 *   variables: {
 *      batchId: // value for 'batchId'
 *   },
 * });
 */
export function useBatchEnrollmentsQuery(baseOptions: Apollo.QueryHookOptions<BatchEnrollmentsQuery, BatchEnrollmentsQueryVariables> & ({ variables: BatchEnrollmentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BatchEnrollmentsQuery, BatchEnrollmentsQueryVariables>(BatchEnrollmentsDocument, options);
      }
export function useBatchEnrollmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BatchEnrollmentsQuery, BatchEnrollmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BatchEnrollmentsQuery, BatchEnrollmentsQueryVariables>(BatchEnrollmentsDocument, options);
        }
export function useBatchEnrollmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BatchEnrollmentsQuery, BatchEnrollmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BatchEnrollmentsQuery, BatchEnrollmentsQueryVariables>(BatchEnrollmentsDocument, options);
        }
export type BatchEnrollmentsQueryHookResult = ReturnType<typeof useBatchEnrollmentsQuery>;
export type BatchEnrollmentsLazyQueryHookResult = ReturnType<typeof useBatchEnrollmentsLazyQuery>;
export type BatchEnrollmentsSuspenseQueryHookResult = ReturnType<typeof useBatchEnrollmentsSuspenseQuery>;
export type BatchEnrollmentsQueryResult = Apollo.QueryResult<BatchEnrollmentsQuery, BatchEnrollmentsQueryVariables>;
export const BatchStatsDocument = gql`
    query BatchStats($batchId: ID!) {
  batchStats(batchId: $batchId)
}
    `;

/**
 * __useBatchStatsQuery__
 *
 * To run a query within a React component, call `useBatchStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBatchStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBatchStatsQuery({
 *   variables: {
 *      batchId: // value for 'batchId'
 *   },
 * });
 */
export function useBatchStatsQuery(baseOptions: Apollo.QueryHookOptions<BatchStatsQuery, BatchStatsQueryVariables> & ({ variables: BatchStatsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BatchStatsQuery, BatchStatsQueryVariables>(BatchStatsDocument, options);
      }
export function useBatchStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BatchStatsQuery, BatchStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BatchStatsQuery, BatchStatsQueryVariables>(BatchStatsDocument, options);
        }
export function useBatchStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<BatchStatsQuery, BatchStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<BatchStatsQuery, BatchStatsQueryVariables>(BatchStatsDocument, options);
        }
export type BatchStatsQueryHookResult = ReturnType<typeof useBatchStatsQuery>;
export type BatchStatsLazyQueryHookResult = ReturnType<typeof useBatchStatsLazyQuery>;
export type BatchStatsSuspenseQueryHookResult = ReturnType<typeof useBatchStatsSuspenseQuery>;
export type BatchStatsQueryResult = Apollo.QueryResult<BatchStatsQuery, BatchStatsQueryVariables>;
export const GetDeletedBatchesDocument = gql`
    query GetDeletedBatches {
  getDeletedBatches {
    id
    name
    courseId
    startDate
    endDate
    isActive
    createdAt
    updatedAt
    deletedAt
    deletedBy
    course {
      id
      title
    }
  }
}
    `;

/**
 * __useGetDeletedBatchesQuery__
 *
 * To run a query within a React component, call `useGetDeletedBatchesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeletedBatchesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeletedBatchesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDeletedBatchesQuery(baseOptions?: Apollo.QueryHookOptions<GetDeletedBatchesQuery, GetDeletedBatchesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeletedBatchesQuery, GetDeletedBatchesQueryVariables>(GetDeletedBatchesDocument, options);
      }
export function useGetDeletedBatchesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeletedBatchesQuery, GetDeletedBatchesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeletedBatchesQuery, GetDeletedBatchesQueryVariables>(GetDeletedBatchesDocument, options);
        }
export function useGetDeletedBatchesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDeletedBatchesQuery, GetDeletedBatchesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDeletedBatchesQuery, GetDeletedBatchesQueryVariables>(GetDeletedBatchesDocument, options);
        }
export type GetDeletedBatchesQueryHookResult = ReturnType<typeof useGetDeletedBatchesQuery>;
export type GetDeletedBatchesLazyQueryHookResult = ReturnType<typeof useGetDeletedBatchesLazyQuery>;
export type GetDeletedBatchesSuspenseQueryHookResult = ReturnType<typeof useGetDeletedBatchesSuspenseQuery>;
export type GetDeletedBatchesQueryResult = Apollo.QueryResult<GetDeletedBatchesQuery, GetDeletedBatchesQueryVariables>;
export const ChapterDocument = gql`
    query Chapter($id: ID!) {
  chapter(id: $id) {
    courseId
    createdAt
    id
    orderIndex
    title
    updatedAt
    course {
      id
      title
      description
      isActive
      createdBy
      creator {
        id
        firstName
        lastName
        username
        email
        role
      }
    }
    modules {
      id
      title
      type
      orderIndex
      fileName
      fileUrl
      chapterId
      createdAt
      updatedAt
      studentProgress {
        completedAt
        createdAt
        id
        isCompleted
        moduleId
        studentId
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
  }
}
    `;

/**
 * __useChapterQuery__
 *
 * To run a query within a React component, call `useChapterQuery` and pass it any options that fit your needs.
 * When your component renders, `useChapterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChapterQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useChapterQuery(baseOptions: Apollo.QueryHookOptions<ChapterQuery, ChapterQueryVariables> & ({ variables: ChapterQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChapterQuery, ChapterQueryVariables>(ChapterDocument, options);
      }
export function useChapterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChapterQuery, ChapterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChapterQuery, ChapterQueryVariables>(ChapterDocument, options);
        }
export function useChapterSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ChapterQuery, ChapterQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ChapterQuery, ChapterQueryVariables>(ChapterDocument, options);
        }
export type ChapterQueryHookResult = ReturnType<typeof useChapterQuery>;
export type ChapterLazyQueryHookResult = ReturnType<typeof useChapterLazyQuery>;
export type ChapterSuspenseQueryHookResult = ReturnType<typeof useChapterSuspenseQuery>;
export type ChapterQueryResult = Apollo.QueryResult<ChapterQuery, ChapterQueryVariables>;
export const ChaptersDocument = gql`
    query Chapters($courseId: ID!) {
  chapters(courseId: $courseId) {
    courseId
    createdAt
    id
    orderIndex
    title
    updatedAt
    course {
      id
      title
      description
      creator {
        id
        firstName
        lastName
        username
      }
    }
    modules {
      id
      title
      type
      orderIndex
      fileName
      fileUrl
      chapterId
      createdAt
      updatedAt
      studentProgress {
        id
        isCompleted
        completedAt
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
}
    `;

/**
 * __useChaptersQuery__
 *
 * To run a query within a React component, call `useChaptersQuery` and pass it any options that fit your needs.
 * When your component renders, `useChaptersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChaptersQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useChaptersQuery(baseOptions: Apollo.QueryHookOptions<ChaptersQuery, ChaptersQueryVariables> & ({ variables: ChaptersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChaptersQuery, ChaptersQueryVariables>(ChaptersDocument, options);
      }
export function useChaptersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChaptersQuery, ChaptersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChaptersQuery, ChaptersQueryVariables>(ChaptersDocument, options);
        }
export function useChaptersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ChaptersQuery, ChaptersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ChaptersQuery, ChaptersQueryVariables>(ChaptersDocument, options);
        }
export type ChaptersQueryHookResult = ReturnType<typeof useChaptersQuery>;
export type ChaptersLazyQueryHookResult = ReturnType<typeof useChaptersLazyQuery>;
export type ChaptersSuspenseQueryHookResult = ReturnType<typeof useChaptersSuspenseQuery>;
export type ChaptersQueryResult = Apollo.QueryResult<ChaptersQuery, ChaptersQueryVariables>;
export const GetDeletedChaptersDocument = gql`
    query GetDeletedChapters {
  getDeletedChapters {
    id
    title
    courseId
    orderIndex
    createdAt
    updatedAt
    deletedAt
    deletedBy
    course {
      id
      title
    }
  }
}
    `;

/**
 * __useGetDeletedChaptersQuery__
 *
 * To run a query within a React component, call `useGetDeletedChaptersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeletedChaptersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeletedChaptersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDeletedChaptersQuery(baseOptions?: Apollo.QueryHookOptions<GetDeletedChaptersQuery, GetDeletedChaptersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeletedChaptersQuery, GetDeletedChaptersQueryVariables>(GetDeletedChaptersDocument, options);
      }
export function useGetDeletedChaptersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeletedChaptersQuery, GetDeletedChaptersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeletedChaptersQuery, GetDeletedChaptersQueryVariables>(GetDeletedChaptersDocument, options);
        }
export function useGetDeletedChaptersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDeletedChaptersQuery, GetDeletedChaptersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDeletedChaptersQuery, GetDeletedChaptersQueryVariables>(GetDeletedChaptersDocument, options);
        }
export type GetDeletedChaptersQueryHookResult = ReturnType<typeof useGetDeletedChaptersQuery>;
export type GetDeletedChaptersLazyQueryHookResult = ReturnType<typeof useGetDeletedChaptersLazyQuery>;
export type GetDeletedChaptersSuspenseQueryHookResult = ReturnType<typeof useGetDeletedChaptersSuspenseQuery>;
export type GetDeletedChaptersQueryResult = Apollo.QueryResult<GetDeletedChaptersQuery, GetDeletedChaptersQueryVariables>;
export const ChaptersPaginatedDocument = gql`
    query ChaptersPaginated($filter: ChapterFilterInput, $pagination: PaginationInput, $sort: SortInput) {
  chaptersPaginated(filter: $filter, pagination: $pagination, sort: $sort) {
    data {
      id
      title
      courseId
      orderIndex
      createdAt
      updatedAt
      course {
        id
        title
        description
        creator {
          id
          firstName
          lastName
          username
        }
      }
      modules {
        id
        title
        type
        orderIndex
        fileName
        fileUrl
      }
    }
    meta {
      total
      page
      limit
      totalPages
      hasNext
      hasPrev
    }
  }
}
    `;

/**
 * __useChaptersPaginatedQuery__
 *
 * To run a query within a React component, call `useChaptersPaginatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useChaptersPaginatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChaptersPaginatedQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useChaptersPaginatedQuery(baseOptions?: Apollo.QueryHookOptions<ChaptersPaginatedQuery, ChaptersPaginatedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChaptersPaginatedQuery, ChaptersPaginatedQueryVariables>(ChaptersPaginatedDocument, options);
      }
export function useChaptersPaginatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChaptersPaginatedQuery, ChaptersPaginatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChaptersPaginatedQuery, ChaptersPaginatedQueryVariables>(ChaptersPaginatedDocument, options);
        }
export function useChaptersPaginatedSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ChaptersPaginatedQuery, ChaptersPaginatedQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ChaptersPaginatedQuery, ChaptersPaginatedQueryVariables>(ChaptersPaginatedDocument, options);
        }
export type ChaptersPaginatedQueryHookResult = ReturnType<typeof useChaptersPaginatedQuery>;
export type ChaptersPaginatedLazyQueryHookResult = ReturnType<typeof useChaptersPaginatedLazyQuery>;
export type ChaptersPaginatedSuspenseQueryHookResult = ReturnType<typeof useChaptersPaginatedSuspenseQuery>;
export type ChaptersPaginatedQueryResult = Apollo.QueryResult<ChaptersPaginatedQuery, ChaptersPaginatedQueryVariables>;
export const CourseDocument = gql`
    query Course($id: ID!) {
  course(id: $id) {
    createdAt
    createdBy
    description
    id
    isActive
    title
    updatedAt
    creator {
      id
      firstName
      lastName
      username
      email
      role
    }
    chapters {
      id
      title
      orderIndex
      courseId
      createdAt
      updatedAt
      modules {
        id
        title
        type
        orderIndex
        fileName
        fileUrl
        chapterId
        createdAt
        updatedAt
        studentProgress {
          id
          isCompleted
          completedAt
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
  }
}
    `;

/**
 * __useCourseQuery__
 *
 * To run a query within a React component, call `useCourseQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCourseQuery(baseOptions: Apollo.QueryHookOptions<CourseQuery, CourseQueryVariables> & ({ variables: CourseQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseQuery, CourseQueryVariables>(CourseDocument, options);
      }
export function useCourseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseQuery, CourseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseQuery, CourseQueryVariables>(CourseDocument, options);
        }
export function useCourseSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CourseQuery, CourseQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CourseQuery, CourseQueryVariables>(CourseDocument, options);
        }
export type CourseQueryHookResult = ReturnType<typeof useCourseQuery>;
export type CourseLazyQueryHookResult = ReturnType<typeof useCourseLazyQuery>;
export type CourseSuspenseQueryHookResult = ReturnType<typeof useCourseSuspenseQuery>;
export type CourseQueryResult = Apollo.QueryResult<CourseQuery, CourseQueryVariables>;
export const CoursesDocument = gql`
    query Courses($filter: CourseFilterInput, $pagination: PaginationInput, $sort: SortInput) {
  courses(filter: $filter, pagination: $pagination, sort: $sort) {
    data {
      createdAt
      createdBy
      description
      id
      isActive
      title
      updatedAt
      creator {
        id
        firstName
        lastName
        username
        email
      }
      chapters {
        id
        title
        orderIndex
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
 * __useCoursesQuery__
 *
 * To run a query within a React component, call `useCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoursesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useCoursesQuery(baseOptions?: Apollo.QueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, options);
      }
export function useCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, options);
        }
export function useCoursesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CoursesQuery, CoursesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CoursesQuery, CoursesQueryVariables>(CoursesDocument, options);
        }
export type CoursesQueryHookResult = ReturnType<typeof useCoursesQuery>;
export type CoursesLazyQueryHookResult = ReturnType<typeof useCoursesLazyQuery>;
export type CoursesSuspenseQueryHookResult = ReturnType<typeof useCoursesSuspenseQuery>;
export type CoursesQueryResult = Apollo.QueryResult<CoursesQuery, CoursesQueryVariables>;
export const MyCoursesDocument = gql`
    query MyCourses($filter: CourseFilterInput, $pagination: PaginationInput, $sort: SortInput) {
  myCourses(filter: $filter, pagination: $pagination, sort: $sort) {
    data {
      createdAt
      createdBy
      description
      id
      isActive
      title
      updatedAt
      creator {
        id
        firstName
        lastName
        username
        email
      }
      chapters {
        id
        title
        orderIndex
        modules {
          id
          title
          type
          orderIndex
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
 * __useMyCoursesQuery__
 *
 * To run a query within a React component, call `useMyCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyCoursesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useMyCoursesQuery(baseOptions?: Apollo.QueryHookOptions<MyCoursesQuery, MyCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyCoursesQuery, MyCoursesQueryVariables>(MyCoursesDocument, options);
      }
export function useMyCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyCoursesQuery, MyCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyCoursesQuery, MyCoursesQueryVariables>(MyCoursesDocument, options);
        }
export function useMyCoursesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyCoursesQuery, MyCoursesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyCoursesQuery, MyCoursesQueryVariables>(MyCoursesDocument, options);
        }
export type MyCoursesQueryHookResult = ReturnType<typeof useMyCoursesQuery>;
export type MyCoursesLazyQueryHookResult = ReturnType<typeof useMyCoursesLazyQuery>;
export type MyCoursesSuspenseQueryHookResult = ReturnType<typeof useMyCoursesSuspenseQuery>;
export type MyCoursesQueryResult = Apollo.QueryResult<MyCoursesQuery, MyCoursesQueryVariables>;
export const CourseProgressDocument = gql`
    query CourseProgress($courseId: ID!) {
  courseProgress(courseId: $courseId)
}
    `;

/**
 * __useCourseProgressQuery__
 *
 * To run a query within a React component, call `useCourseProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseProgressQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useCourseProgressQuery(baseOptions: Apollo.QueryHookOptions<CourseProgressQuery, CourseProgressQueryVariables> & ({ variables: CourseProgressQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseProgressQuery, CourseProgressQueryVariables>(CourseProgressDocument, options);
      }
export function useCourseProgressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseProgressQuery, CourseProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseProgressQuery, CourseProgressQueryVariables>(CourseProgressDocument, options);
        }
export function useCourseProgressSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CourseProgressQuery, CourseProgressQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CourseProgressQuery, CourseProgressQueryVariables>(CourseProgressDocument, options);
        }
export type CourseProgressQueryHookResult = ReturnType<typeof useCourseProgressQuery>;
export type CourseProgressLazyQueryHookResult = ReturnType<typeof useCourseProgressLazyQuery>;
export type CourseProgressSuspenseQueryHookResult = ReturnType<typeof useCourseProgressSuspenseQuery>;
export type CourseProgressQueryResult = Apollo.QueryResult<CourseProgressQuery, CourseProgressQueryVariables>;
export const CourseAnalyticsDocument = gql`
    query CourseAnalytics($courseId: ID) {
  courseAnalytics(courseId: $courseId)
}
    `;

/**
 * __useCourseAnalyticsQuery__
 *
 * To run a query within a React component, call `useCourseAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCourseAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCourseAnalyticsQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useCourseAnalyticsQuery(baseOptions?: Apollo.QueryHookOptions<CourseAnalyticsQuery, CourseAnalyticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CourseAnalyticsQuery, CourseAnalyticsQueryVariables>(CourseAnalyticsDocument, options);
      }
export function useCourseAnalyticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CourseAnalyticsQuery, CourseAnalyticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CourseAnalyticsQuery, CourseAnalyticsQueryVariables>(CourseAnalyticsDocument, options);
        }
export function useCourseAnalyticsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CourseAnalyticsQuery, CourseAnalyticsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CourseAnalyticsQuery, CourseAnalyticsQueryVariables>(CourseAnalyticsDocument, options);
        }
export type CourseAnalyticsQueryHookResult = ReturnType<typeof useCourseAnalyticsQuery>;
export type CourseAnalyticsLazyQueryHookResult = ReturnType<typeof useCourseAnalyticsLazyQuery>;
export type CourseAnalyticsSuspenseQueryHookResult = ReturnType<typeof useCourseAnalyticsSuspenseQuery>;
export type CourseAnalyticsQueryResult = Apollo.QueryResult<CourseAnalyticsQuery, CourseAnalyticsQueryVariables>;
export const CheckEnrollmentAccessDocument = gql`
    query CheckEnrollmentAccess($courseId: ID!) {
  checkEnrollmentAccess(courseId: $courseId)
}
    `;

/**
 * __useCheckEnrollmentAccessQuery__
 *
 * To run a query within a React component, call `useCheckEnrollmentAccessQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckEnrollmentAccessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckEnrollmentAccessQuery({
 *   variables: {
 *      courseId: // value for 'courseId'
 *   },
 * });
 */
export function useCheckEnrollmentAccessQuery(baseOptions: Apollo.QueryHookOptions<CheckEnrollmentAccessQuery, CheckEnrollmentAccessQueryVariables> & ({ variables: CheckEnrollmentAccessQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckEnrollmentAccessQuery, CheckEnrollmentAccessQueryVariables>(CheckEnrollmentAccessDocument, options);
      }
export function useCheckEnrollmentAccessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckEnrollmentAccessQuery, CheckEnrollmentAccessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckEnrollmentAccessQuery, CheckEnrollmentAccessQueryVariables>(CheckEnrollmentAccessDocument, options);
        }
export function useCheckEnrollmentAccessSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CheckEnrollmentAccessQuery, CheckEnrollmentAccessQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckEnrollmentAccessQuery, CheckEnrollmentAccessQueryVariables>(CheckEnrollmentAccessDocument, options);
        }
export type CheckEnrollmentAccessQueryHookResult = ReturnType<typeof useCheckEnrollmentAccessQuery>;
export type CheckEnrollmentAccessLazyQueryHookResult = ReturnType<typeof useCheckEnrollmentAccessLazyQuery>;
export type CheckEnrollmentAccessSuspenseQueryHookResult = ReturnType<typeof useCheckEnrollmentAccessSuspenseQuery>;
export type CheckEnrollmentAccessQueryResult = Apollo.QueryResult<CheckEnrollmentAccessQuery, CheckEnrollmentAccessQueryVariables>;
export const GetDeletedCoursesDocument = gql`
    query GetDeletedCourses {
  getDeletedCourses {
    id
    title
    description
    isActive
    createdBy
    createdAt
    updatedAt
    deletedAt
    deletedBy
    creator {
      id
      firstName
      lastName
      username
    }
  }
}
    `;

/**
 * __useGetDeletedCoursesQuery__
 *
 * To run a query within a React component, call `useGetDeletedCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeletedCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeletedCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDeletedCoursesQuery(baseOptions?: Apollo.QueryHookOptions<GetDeletedCoursesQuery, GetDeletedCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeletedCoursesQuery, GetDeletedCoursesQueryVariables>(GetDeletedCoursesDocument, options);
      }
export function useGetDeletedCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeletedCoursesQuery, GetDeletedCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeletedCoursesQuery, GetDeletedCoursesQueryVariables>(GetDeletedCoursesDocument, options);
        }
export function useGetDeletedCoursesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDeletedCoursesQuery, GetDeletedCoursesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDeletedCoursesQuery, GetDeletedCoursesQueryVariables>(GetDeletedCoursesDocument, options);
        }
export type GetDeletedCoursesQueryHookResult = ReturnType<typeof useGetDeletedCoursesQuery>;
export type GetDeletedCoursesLazyQueryHookResult = ReturnType<typeof useGetDeletedCoursesLazyQuery>;
export type GetDeletedCoursesSuspenseQueryHookResult = ReturnType<typeof useGetDeletedCoursesSuspenseQuery>;
export type GetDeletedCoursesQueryResult = Apollo.QueryResult<GetDeletedCoursesQuery, GetDeletedCoursesQueryVariables>;
export const EnrollmentDocument = gql`
    query Enrollment($id: ID!) {
  enrollment(id: $id) {
    batchId
    createdAt
    enrollmentDate
    id
    status
    studentId
    updatedAt
    batch {
      id
      name
      startDate
      endDate
      course {
        id
        title
        description
      }
    }
    student {
      id
      firstName
      lastName
      username
      email
      phone
      role
    }
  }
}
    `;

/**
 * __useEnrollmentQuery__
 *
 * To run a query within a React component, call `useEnrollmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useEnrollmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnrollmentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEnrollmentQuery(baseOptions: Apollo.QueryHookOptions<EnrollmentQuery, EnrollmentQueryVariables> & ({ variables: EnrollmentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EnrollmentQuery, EnrollmentQueryVariables>(EnrollmentDocument, options);
      }
export function useEnrollmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EnrollmentQuery, EnrollmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EnrollmentQuery, EnrollmentQueryVariables>(EnrollmentDocument, options);
        }
export function useEnrollmentSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EnrollmentQuery, EnrollmentQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EnrollmentQuery, EnrollmentQueryVariables>(EnrollmentDocument, options);
        }
export type EnrollmentQueryHookResult = ReturnType<typeof useEnrollmentQuery>;
export type EnrollmentLazyQueryHookResult = ReturnType<typeof useEnrollmentLazyQuery>;
export type EnrollmentSuspenseQueryHookResult = ReturnType<typeof useEnrollmentSuspenseQuery>;
export type EnrollmentQueryResult = Apollo.QueryResult<EnrollmentQuery, EnrollmentQueryVariables>;
export const EnrollmentsDocument = gql`
    query Enrollments($filter: EnrollmentFilterInput, $pagination: PaginationInput, $sort: SortInput) {
  enrollments(filter: $filter, pagination: $pagination, sort: $sort) {
    data {
      batchId
      createdAt
      enrollmentDate
      id
      status
      studentId
      updatedAt
      batch {
        id
        name
        startDate
        endDate
        course {
          id
          title
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
 * __useEnrollmentsQuery__
 *
 * To run a query within a React component, call `useEnrollmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEnrollmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnrollmentsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useEnrollmentsQuery(baseOptions?: Apollo.QueryHookOptions<EnrollmentsQuery, EnrollmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EnrollmentsQuery, EnrollmentsQueryVariables>(EnrollmentsDocument, options);
      }
export function useEnrollmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EnrollmentsQuery, EnrollmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EnrollmentsQuery, EnrollmentsQueryVariables>(EnrollmentsDocument, options);
        }
export function useEnrollmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EnrollmentsQuery, EnrollmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EnrollmentsQuery, EnrollmentsQueryVariables>(EnrollmentsDocument, options);
        }
export type EnrollmentsQueryHookResult = ReturnType<typeof useEnrollmentsQuery>;
export type EnrollmentsLazyQueryHookResult = ReturnType<typeof useEnrollmentsLazyQuery>;
export type EnrollmentsSuspenseQueryHookResult = ReturnType<typeof useEnrollmentsSuspenseQuery>;
export type EnrollmentsQueryResult = Apollo.QueryResult<EnrollmentsQuery, EnrollmentsQueryVariables>;
export const MyEnrollmentsDocument = gql`
    query MyEnrollments {
  myEnrollments {
    batchId
    createdAt
    enrollmentDate
    id
    status
    studentId
    updatedAt
    batch {
      id
      name
      startDate
      endDate
      course {
        id
        title
        description
        creator {
          id
          firstName
          lastName
          username
        }
      }
    }
  }
}
    `;

/**
 * __useMyEnrollmentsQuery__
 *
 * To run a query within a React component, call `useMyEnrollmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyEnrollmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyEnrollmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyEnrollmentsQuery(baseOptions?: Apollo.QueryHookOptions<MyEnrollmentsQuery, MyEnrollmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyEnrollmentsQuery, MyEnrollmentsQueryVariables>(MyEnrollmentsDocument, options);
      }
export function useMyEnrollmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyEnrollmentsQuery, MyEnrollmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyEnrollmentsQuery, MyEnrollmentsQueryVariables>(MyEnrollmentsDocument, options);
        }
export function useMyEnrollmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyEnrollmentsQuery, MyEnrollmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyEnrollmentsQuery, MyEnrollmentsQueryVariables>(MyEnrollmentsDocument, options);
        }
export type MyEnrollmentsQueryHookResult = ReturnType<typeof useMyEnrollmentsQuery>;
export type MyEnrollmentsLazyQueryHookResult = ReturnType<typeof useMyEnrollmentsLazyQuery>;
export type MyEnrollmentsSuspenseQueryHookResult = ReturnType<typeof useMyEnrollmentsSuspenseQuery>;
export type MyEnrollmentsQueryResult = Apollo.QueryResult<MyEnrollmentsQuery, MyEnrollmentsQueryVariables>;
export const StudentEnrollmentsDocument = gql`
    query StudentEnrollments($studentId: ID!) {
  studentEnrollments(studentId: $studentId) {
    batchId
    createdAt
    enrollmentDate
    id
    status
    studentId
    updatedAt
    batch {
      id
      name
      startDate
      endDate
      course {
        id
        title
        description
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
}
    `;

/**
 * __useStudentEnrollmentsQuery__
 *
 * To run a query within a React component, call `useStudentEnrollmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentEnrollmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentEnrollmentsQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useStudentEnrollmentsQuery(baseOptions: Apollo.QueryHookOptions<StudentEnrollmentsQuery, StudentEnrollmentsQueryVariables> & ({ variables: StudentEnrollmentsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StudentEnrollmentsQuery, StudentEnrollmentsQueryVariables>(StudentEnrollmentsDocument, options);
      }
export function useStudentEnrollmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentEnrollmentsQuery, StudentEnrollmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StudentEnrollmentsQuery, StudentEnrollmentsQueryVariables>(StudentEnrollmentsDocument, options);
        }
export function useStudentEnrollmentsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StudentEnrollmentsQuery, StudentEnrollmentsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StudentEnrollmentsQuery, StudentEnrollmentsQueryVariables>(StudentEnrollmentsDocument, options);
        }
export type StudentEnrollmentsQueryHookResult = ReturnType<typeof useStudentEnrollmentsQuery>;
export type StudentEnrollmentsLazyQueryHookResult = ReturnType<typeof useStudentEnrollmentsLazyQuery>;
export type StudentEnrollmentsSuspenseQueryHookResult = ReturnType<typeof useStudentEnrollmentsSuspenseQuery>;
export type StudentEnrollmentsQueryResult = Apollo.QueryResult<StudentEnrollmentsQuery, StudentEnrollmentsQueryVariables>;
export const EnrollmentProgressDocument = gql`
    query EnrollmentProgress($enrollmentId: ID!) {
  enrollmentProgress(enrollmentId: $enrollmentId)
}
    `;

/**
 * __useEnrollmentProgressQuery__
 *
 * To run a query within a React component, call `useEnrollmentProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useEnrollmentProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnrollmentProgressQuery({
 *   variables: {
 *      enrollmentId: // value for 'enrollmentId'
 *   },
 * });
 */
export function useEnrollmentProgressQuery(baseOptions: Apollo.QueryHookOptions<EnrollmentProgressQuery, EnrollmentProgressQueryVariables> & ({ variables: EnrollmentProgressQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EnrollmentProgressQuery, EnrollmentProgressQueryVariables>(EnrollmentProgressDocument, options);
      }
export function useEnrollmentProgressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EnrollmentProgressQuery, EnrollmentProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EnrollmentProgressQuery, EnrollmentProgressQueryVariables>(EnrollmentProgressDocument, options);
        }
export function useEnrollmentProgressSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<EnrollmentProgressQuery, EnrollmentProgressQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<EnrollmentProgressQuery, EnrollmentProgressQueryVariables>(EnrollmentProgressDocument, options);
        }
export type EnrollmentProgressQueryHookResult = ReturnType<typeof useEnrollmentProgressQuery>;
export type EnrollmentProgressLazyQueryHookResult = ReturnType<typeof useEnrollmentProgressLazyQuery>;
export type EnrollmentProgressSuspenseQueryHookResult = ReturnType<typeof useEnrollmentProgressSuspenseQuery>;
export type EnrollmentProgressQueryResult = Apollo.QueryResult<EnrollmentProgressQuery, EnrollmentProgressQueryVariables>;
export const ModuleDocument = gql`
    query Module($id: ID!) {
  module(id: $id) {
    chapterId
    createdAt
    fileName
    fileUrl
    id
    orderIndex
    title
    type
    updatedAt
    chapter {
      id
      title
      orderIndex
      courseId
      course {
        id
        title
        description
        creator {
          id
          firstName
          lastName
          username
        }
      }
    }
    studentProgress {
      completedAt
      createdAt
      id
      isCompleted
      moduleId
      studentId
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
}
    `;

/**
 * __useModuleQuery__
 *
 * To run a query within a React component, call `useModuleQuery` and pass it any options that fit your needs.
 * When your component renders, `useModuleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useModuleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useModuleQuery(baseOptions: Apollo.QueryHookOptions<ModuleQuery, ModuleQueryVariables> & ({ variables: ModuleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ModuleQuery, ModuleQueryVariables>(ModuleDocument, options);
      }
export function useModuleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ModuleQuery, ModuleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ModuleQuery, ModuleQueryVariables>(ModuleDocument, options);
        }
export function useModuleSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ModuleQuery, ModuleQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ModuleQuery, ModuleQueryVariables>(ModuleDocument, options);
        }
export type ModuleQueryHookResult = ReturnType<typeof useModuleQuery>;
export type ModuleLazyQueryHookResult = ReturnType<typeof useModuleLazyQuery>;
export type ModuleSuspenseQueryHookResult = ReturnType<typeof useModuleSuspenseQuery>;
export type ModuleQueryResult = Apollo.QueryResult<ModuleQuery, ModuleQueryVariables>;
export const ModulesDocument = gql`
    query Modules($chapterId: ID!) {
  modules(chapterId: $chapterId) {
    chapterId
    createdAt
    fileName
    fileUrl
    id
    orderIndex
    title
    type
    updatedAt
    chapter {
      id
      title
      orderIndex
      courseId
    }
    studentProgress {
      id
      isCompleted
      completedAt
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

/**
 * __useModulesQuery__
 *
 * To run a query within a React component, call `useModulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useModulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useModulesQuery({
 *   variables: {
 *      chapterId: // value for 'chapterId'
 *   },
 * });
 */
export function useModulesQuery(baseOptions: Apollo.QueryHookOptions<ModulesQuery, ModulesQueryVariables> & ({ variables: ModulesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ModulesQuery, ModulesQueryVariables>(ModulesDocument, options);
      }
export function useModulesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ModulesQuery, ModulesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ModulesQuery, ModulesQueryVariables>(ModulesDocument, options);
        }
export function useModulesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ModulesQuery, ModulesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ModulesQuery, ModulesQueryVariables>(ModulesDocument, options);
        }
export type ModulesQueryHookResult = ReturnType<typeof useModulesQuery>;
export type ModulesLazyQueryHookResult = ReturnType<typeof useModulesLazyQuery>;
export type ModulesSuspenseQueryHookResult = ReturnType<typeof useModulesSuspenseQuery>;
export type ModulesQueryResult = Apollo.QueryResult<ModulesQuery, ModulesQueryVariables>;
export const ModuleProgressDocument = gql`
    query ModuleProgress($moduleId: ID!) {
  moduleProgress(moduleId: $moduleId) {
    completedAt
    createdAt
    id
    isCompleted
    moduleId
    studentId
    updatedAt
    module {
      id
      title
      type
      fileName
      fileUrl
      orderIndex
      chapter {
        id
        title
        course {
          id
          title
        }
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
}
    `;

/**
 * __useModuleProgressQuery__
 *
 * To run a query within a React component, call `useModuleProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useModuleProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useModuleProgressQuery({
 *   variables: {
 *      moduleId: // value for 'moduleId'
 *   },
 * });
 */
export function useModuleProgressQuery(baseOptions: Apollo.QueryHookOptions<ModuleProgressQuery, ModuleProgressQueryVariables> & ({ variables: ModuleProgressQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ModuleProgressQuery, ModuleProgressQueryVariables>(ModuleProgressDocument, options);
      }
export function useModuleProgressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ModuleProgressQuery, ModuleProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ModuleProgressQuery, ModuleProgressQueryVariables>(ModuleProgressDocument, options);
        }
export function useModuleProgressSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ModuleProgressQuery, ModuleProgressQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ModuleProgressQuery, ModuleProgressQueryVariables>(ModuleProgressDocument, options);
        }
export type ModuleProgressQueryHookResult = ReturnType<typeof useModuleProgressQuery>;
export type ModuleProgressLazyQueryHookResult = ReturnType<typeof useModuleProgressLazyQuery>;
export type ModuleProgressSuspenseQueryHookResult = ReturnType<typeof useModuleProgressSuspenseQuery>;
export type ModuleProgressQueryResult = Apollo.QueryResult<ModuleProgressQuery, ModuleProgressQueryVariables>;
export const HasValidOfflineCacheDocument = gql`
    query HasValidOfflineCache($moduleId: String!) {
  hasValidOfflineCache(moduleId: $moduleId)
}
    `;

/**
 * __useHasValidOfflineCacheQuery__
 *
 * To run a query within a React component, call `useHasValidOfflineCacheQuery` and pass it any options that fit your needs.
 * When your component renders, `useHasValidOfflineCacheQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHasValidOfflineCacheQuery({
 *   variables: {
 *      moduleId: // value for 'moduleId'
 *   },
 * });
 */
export function useHasValidOfflineCacheQuery(baseOptions: Apollo.QueryHookOptions<HasValidOfflineCacheQuery, HasValidOfflineCacheQueryVariables> & ({ variables: HasValidOfflineCacheQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HasValidOfflineCacheQuery, HasValidOfflineCacheQueryVariables>(HasValidOfflineCacheDocument, options);
      }
export function useHasValidOfflineCacheLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HasValidOfflineCacheQuery, HasValidOfflineCacheQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HasValidOfflineCacheQuery, HasValidOfflineCacheQueryVariables>(HasValidOfflineCacheDocument, options);
        }
export function useHasValidOfflineCacheSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HasValidOfflineCacheQuery, HasValidOfflineCacheQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HasValidOfflineCacheQuery, HasValidOfflineCacheQueryVariables>(HasValidOfflineCacheDocument, options);
        }
export type HasValidOfflineCacheQueryHookResult = ReturnType<typeof useHasValidOfflineCacheQuery>;
export type HasValidOfflineCacheLazyQueryHookResult = ReturnType<typeof useHasValidOfflineCacheLazyQuery>;
export type HasValidOfflineCacheSuspenseQueryHookResult = ReturnType<typeof useHasValidOfflineCacheSuspenseQuery>;
export type HasValidOfflineCacheQueryResult = Apollo.QueryResult<HasValidOfflineCacheQuery, HasValidOfflineCacheQueryVariables>;
export const GetDeletedModulesDocument = gql`
    query GetDeletedModules {
  getDeletedModules {
    id
    title
    type
    chapterId
    orderIndex
    fileName
    fileUrl
    createdAt
    updatedAt
    deletedAt
    deletedBy
    chapter {
      id
      title
      courseId
    }
  }
}
    `;

/**
 * __useGetDeletedModulesQuery__
 *
 * To run a query within a React component, call `useGetDeletedModulesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeletedModulesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeletedModulesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDeletedModulesQuery(baseOptions?: Apollo.QueryHookOptions<GetDeletedModulesQuery, GetDeletedModulesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeletedModulesQuery, GetDeletedModulesQueryVariables>(GetDeletedModulesDocument, options);
      }
export function useGetDeletedModulesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeletedModulesQuery, GetDeletedModulesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeletedModulesQuery, GetDeletedModulesQueryVariables>(GetDeletedModulesDocument, options);
        }
export function useGetDeletedModulesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDeletedModulesQuery, GetDeletedModulesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDeletedModulesQuery, GetDeletedModulesQueryVariables>(GetDeletedModulesDocument, options);
        }
export type GetDeletedModulesQueryHookResult = ReturnType<typeof useGetDeletedModulesQuery>;
export type GetDeletedModulesLazyQueryHookResult = ReturnType<typeof useGetDeletedModulesLazyQuery>;
export type GetDeletedModulesSuspenseQueryHookResult = ReturnType<typeof useGetDeletedModulesSuspenseQuery>;
export type GetDeletedModulesQueryResult = Apollo.QueryResult<GetDeletedModulesQuery, GetDeletedModulesQueryVariables>;
export const ModulesPaginatedDocument = gql`
    query ModulesPaginated($filter: ModuleFilterInput, $pagination: PaginationInput, $sort: SortInput) {
  modulesPaginated(filter: $filter, pagination: $pagination, sort: $sort) {
    data {
      id
      title
      type
      chapterId
      orderIndex
      fileName
      fileUrl
      createdAt
      updatedAt
      chapter {
        id
        title
        orderIndex
        courseId
        course {
          id
          title
        }
      }
      studentProgress {
        id
        isCompleted
        completedAt
        studentId
        student {
          id
          firstName
          lastName
          username
        }
      }
    }
    meta {
      total
      page
      limit
      totalPages
      hasNext
      hasPrev
    }
  }
}
    `;

/**
 * __useModulesPaginatedQuery__
 *
 * To run a query within a React component, call `useModulesPaginatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useModulesPaginatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useModulesPaginatedQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useModulesPaginatedQuery(baseOptions?: Apollo.QueryHookOptions<ModulesPaginatedQuery, ModulesPaginatedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ModulesPaginatedQuery, ModulesPaginatedQueryVariables>(ModulesPaginatedDocument, options);
      }
export function useModulesPaginatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ModulesPaginatedQuery, ModulesPaginatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ModulesPaginatedQuery, ModulesPaginatedQueryVariables>(ModulesPaginatedDocument, options);
        }
export function useModulesPaginatedSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ModulesPaginatedQuery, ModulesPaginatedQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ModulesPaginatedQuery, ModulesPaginatedQueryVariables>(ModulesPaginatedDocument, options);
        }
export type ModulesPaginatedQueryHookResult = ReturnType<typeof useModulesPaginatedQuery>;
export type ModulesPaginatedLazyQueryHookResult = ReturnType<typeof useModulesPaginatedLazyQuery>;
export type ModulesPaginatedSuspenseQueryHookResult = ReturnType<typeof useModulesPaginatedSuspenseQuery>;
export type ModulesPaginatedQueryResult = Apollo.QueryResult<ModulesPaginatedQuery, ModulesPaginatedQueryVariables>;
export const NotificationsDocument = gql`
    query Notifications($filter: NotificationFilterInput, $pagination: PaginationInput, $sort: SortInput) {
  notifications(filter: $filter, pagination: $pagination, sort: $sort) {
    data {
      id
      title
      message
      type
      isRead
      relatedId
      userId
      createdAt
      updatedAt
      user {
        id
        firstName
        lastName
        username
      }
    }
    meta {
      total
      page
      limit
      totalPages
      hasNext
      hasPrev
    }
  }
}
    `;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export function useNotificationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsSuspenseQueryHookResult = ReturnType<typeof useNotificationsSuspenseQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const MyNotificationsDocument = gql`
    query MyNotifications($filter: NotificationFilterInput, $pagination: PaginationInput, $sort: SortInput) {
  myNotifications(filter: $filter, pagination: $pagination, sort: $sort) {
    data {
      id
      title
      message
      type
      isRead
      relatedId
      userId
      createdAt
      updatedAt
      user {
        id
        firstName
        lastName
        username
      }
    }
    meta {
      total
      page
      limit
      totalPages
      hasNext
      hasPrev
    }
  }
}
    `;

/**
 * __useMyNotificationsQuery__
 *
 * To run a query within a React component, call `useMyNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyNotificationsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useMyNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<MyNotificationsQuery, MyNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyNotificationsQuery, MyNotificationsQueryVariables>(MyNotificationsDocument, options);
      }
export function useMyNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyNotificationsQuery, MyNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyNotificationsQuery, MyNotificationsQueryVariables>(MyNotificationsDocument, options);
        }
export function useMyNotificationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyNotificationsQuery, MyNotificationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyNotificationsQuery, MyNotificationsQueryVariables>(MyNotificationsDocument, options);
        }
export type MyNotificationsQueryHookResult = ReturnType<typeof useMyNotificationsQuery>;
export type MyNotificationsLazyQueryHookResult = ReturnType<typeof useMyNotificationsLazyQuery>;
export type MyNotificationsSuspenseQueryHookResult = ReturnType<typeof useMyNotificationsSuspenseQuery>;
export type MyNotificationsQueryResult = Apollo.QueryResult<MyNotificationsQuery, MyNotificationsQueryVariables>;
export const UnreadNotificationCountDocument = gql`
    query UnreadNotificationCount {
  unreadNotificationCount
}
    `;

/**
 * __useUnreadNotificationCountQuery__
 *
 * To run a query within a React component, call `useUnreadNotificationCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnreadNotificationCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnreadNotificationCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useUnreadNotificationCountQuery(baseOptions?: Apollo.QueryHookOptions<UnreadNotificationCountQuery, UnreadNotificationCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UnreadNotificationCountQuery, UnreadNotificationCountQueryVariables>(UnreadNotificationCountDocument, options);
      }
export function useUnreadNotificationCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UnreadNotificationCountQuery, UnreadNotificationCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UnreadNotificationCountQuery, UnreadNotificationCountQueryVariables>(UnreadNotificationCountDocument, options);
        }
export function useUnreadNotificationCountSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UnreadNotificationCountQuery, UnreadNotificationCountQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UnreadNotificationCountQuery, UnreadNotificationCountQueryVariables>(UnreadNotificationCountDocument, options);
        }
export type UnreadNotificationCountQueryHookResult = ReturnType<typeof useUnreadNotificationCountQuery>;
export type UnreadNotificationCountLazyQueryHookResult = ReturnType<typeof useUnreadNotificationCountLazyQuery>;
export type UnreadNotificationCountSuspenseQueryHookResult = ReturnType<typeof useUnreadNotificationCountSuspenseQuery>;
export type UnreadNotificationCountQueryResult = Apollo.QueryResult<UnreadNotificationCountQuery, UnreadNotificationCountQueryVariables>;
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
export const FindUserWithDeletedDocument = gql`
    query FindUserWithDeleted($id: ID!) {
  findUserWithDeleted(id: $id) {
    id
    username
    email
    firstName
    lastName
    phone
    role
    isActive
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useFindUserWithDeletedQuery__
 *
 * To run a query within a React component, call `useFindUserWithDeletedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserWithDeletedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserWithDeletedQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindUserWithDeletedQuery(baseOptions: Apollo.QueryHookOptions<FindUserWithDeletedQuery, FindUserWithDeletedQueryVariables> & ({ variables: FindUserWithDeletedQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindUserWithDeletedQuery, FindUserWithDeletedQueryVariables>(FindUserWithDeletedDocument, options);
      }
export function useFindUserWithDeletedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserWithDeletedQuery, FindUserWithDeletedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindUserWithDeletedQuery, FindUserWithDeletedQueryVariables>(FindUserWithDeletedDocument, options);
        }
export function useFindUserWithDeletedSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindUserWithDeletedQuery, FindUserWithDeletedQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindUserWithDeletedQuery, FindUserWithDeletedQueryVariables>(FindUserWithDeletedDocument, options);
        }
export type FindUserWithDeletedQueryHookResult = ReturnType<typeof useFindUserWithDeletedQuery>;
export type FindUserWithDeletedLazyQueryHookResult = ReturnType<typeof useFindUserWithDeletedLazyQuery>;
export type FindUserWithDeletedSuspenseQueryHookResult = ReturnType<typeof useFindUserWithDeletedSuspenseQuery>;
export type FindUserWithDeletedQueryResult = Apollo.QueryResult<FindUserWithDeletedQuery, FindUserWithDeletedQueryVariables>;
export const UsersWithDeletedDocument = gql`
    query UsersWithDeleted($filter: UserFilterInput, $pagination: PaginationInput, $sort: SortInput) {
  usersWithDeleted(filter: $filter, pagination: $pagination, sort: $sort) {
    data {
      id
      username
      email
      firstName
      lastName
      phone
      role
      isActive
      createdAt
      updatedAt
    }
    meta {
      total
      page
      limit
      totalPages
      hasNext
      hasPrev
    }
  }
}
    `;

/**
 * __useUsersWithDeletedQuery__
 *
 * To run a query within a React component, call `useUsersWithDeletedQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersWithDeletedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersWithDeletedQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useUsersWithDeletedQuery(baseOptions?: Apollo.QueryHookOptions<UsersWithDeletedQuery, UsersWithDeletedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersWithDeletedQuery, UsersWithDeletedQueryVariables>(UsersWithDeletedDocument, options);
      }
export function useUsersWithDeletedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersWithDeletedQuery, UsersWithDeletedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersWithDeletedQuery, UsersWithDeletedQueryVariables>(UsersWithDeletedDocument, options);
        }
export function useUsersWithDeletedSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UsersWithDeletedQuery, UsersWithDeletedQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UsersWithDeletedQuery, UsersWithDeletedQueryVariables>(UsersWithDeletedDocument, options);
        }
export type UsersWithDeletedQueryHookResult = ReturnType<typeof useUsersWithDeletedQuery>;
export type UsersWithDeletedLazyQueryHookResult = ReturnType<typeof useUsersWithDeletedLazyQuery>;
export type UsersWithDeletedSuspenseQueryHookResult = ReturnType<typeof useUsersWithDeletedSuspenseQuery>;
export type UsersWithDeletedQueryResult = Apollo.QueryResult<UsersWithDeletedQuery, UsersWithDeletedQueryVariables>;
export const UserStatsDocument = gql`
    query UserStats {
  userStats
}
    `;

/**
 * __useUserStatsQuery__
 *
 * To run a query within a React component, call `useUserStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserStatsQuery(baseOptions?: Apollo.QueryHookOptions<UserStatsQuery, UserStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserStatsQuery, UserStatsQueryVariables>(UserStatsDocument, options);
      }
export function useUserStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserStatsQuery, UserStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserStatsQuery, UserStatsQueryVariables>(UserStatsDocument, options);
        }
export function useUserStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserStatsQuery, UserStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserStatsQuery, UserStatsQueryVariables>(UserStatsDocument, options);
        }
export type UserStatsQueryHookResult = ReturnType<typeof useUserStatsQuery>;
export type UserStatsLazyQueryHookResult = ReturnType<typeof useUserStatsLazyQuery>;
export type UserStatsSuspenseQueryHookResult = ReturnType<typeof useUserStatsSuspenseQuery>;
export type UserStatsQueryResult = Apollo.QueryResult<UserStatsQuery, UserStatsQueryVariables>;
export const GetDeletedUsersDocument = gql`
    query GetDeletedUsers {
  getDeletedUsers {
    id
    username
    email
    firstName
    lastName
    phone
    role
    isActive
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetDeletedUsersQuery__
 *
 * To run a query within a React component, call `useGetDeletedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDeletedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDeletedUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDeletedUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetDeletedUsersQuery, GetDeletedUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDeletedUsersQuery, GetDeletedUsersQueryVariables>(GetDeletedUsersDocument, options);
      }
export function useGetDeletedUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDeletedUsersQuery, GetDeletedUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDeletedUsersQuery, GetDeletedUsersQueryVariables>(GetDeletedUsersDocument, options);
        }
export function useGetDeletedUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetDeletedUsersQuery, GetDeletedUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDeletedUsersQuery, GetDeletedUsersQueryVariables>(GetDeletedUsersDocument, options);
        }
export type GetDeletedUsersQueryHookResult = ReturnType<typeof useGetDeletedUsersQuery>;
export type GetDeletedUsersLazyQueryHookResult = ReturnType<typeof useGetDeletedUsersLazyQuery>;
export type GetDeletedUsersSuspenseQueryHookResult = ReturnType<typeof useGetDeletedUsersSuspenseQuery>;
export type GetDeletedUsersQueryResult = Apollo.QueryResult<GetDeletedUsersQuery, GetDeletedUsersQueryVariables>;
export const StudentAttendanceDocument = gql`
    query StudentAttendance($studentId: ID!) {
  studentAttendance(studentId: $studentId) {
    id
    isPresent
    sessionId
    studentId
    enrollmentId
    createdAt
    updatedAt
    session {
      id
      sessionTitle
      sessionDate
      batch {
        id
        name
        course {
          id
          title
        }
      }
    }
    student {
      id
      firstName
      lastName
      username
      email
    }
    enrollment {
      id
      enrollmentDate
      status
    }
  }
}
    `;

/**
 * __useStudentAttendanceQuery__
 *
 * To run a query within a React component, call `useStudentAttendanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentAttendanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentAttendanceQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *   },
 * });
 */
export function useStudentAttendanceQuery(baseOptions: Apollo.QueryHookOptions<StudentAttendanceQuery, StudentAttendanceQueryVariables> & ({ variables: StudentAttendanceQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StudentAttendanceQuery, StudentAttendanceQueryVariables>(StudentAttendanceDocument, options);
      }
export function useStudentAttendanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentAttendanceQuery, StudentAttendanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StudentAttendanceQuery, StudentAttendanceQueryVariables>(StudentAttendanceDocument, options);
        }
export function useStudentAttendanceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StudentAttendanceQuery, StudentAttendanceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StudentAttendanceQuery, StudentAttendanceQueryVariables>(StudentAttendanceDocument, options);
        }
export type StudentAttendanceQueryHookResult = ReturnType<typeof useStudentAttendanceQuery>;
export type StudentAttendanceLazyQueryHookResult = ReturnType<typeof useStudentAttendanceLazyQuery>;
export type StudentAttendanceSuspenseQueryHookResult = ReturnType<typeof useStudentAttendanceSuspenseQuery>;
export type StudentAttendanceQueryResult = Apollo.QueryResult<StudentAttendanceQuery, StudentAttendanceQueryVariables>;
export const StudentAttendanceStatsDocument = gql`
    query StudentAttendanceStats($studentId: ID!, $batchId: ID) {
  studentAttendanceStats(studentId: $studentId, batchId: $batchId)
}
    `;

/**
 * __useStudentAttendanceStatsQuery__
 *
 * To run a query within a React component, call `useStudentAttendanceStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentAttendanceStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentAttendanceStatsQuery({
 *   variables: {
 *      studentId: // value for 'studentId'
 *      batchId: // value for 'batchId'
 *   },
 * });
 */
export function useStudentAttendanceStatsQuery(baseOptions: Apollo.QueryHookOptions<StudentAttendanceStatsQuery, StudentAttendanceStatsQueryVariables> & ({ variables: StudentAttendanceStatsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StudentAttendanceStatsQuery, StudentAttendanceStatsQueryVariables>(StudentAttendanceStatsDocument, options);
      }
export function useStudentAttendanceStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentAttendanceStatsQuery, StudentAttendanceStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StudentAttendanceStatsQuery, StudentAttendanceStatsQueryVariables>(StudentAttendanceStatsDocument, options);
        }
export function useStudentAttendanceStatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StudentAttendanceStatsQuery, StudentAttendanceStatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StudentAttendanceStatsQuery, StudentAttendanceStatsQueryVariables>(StudentAttendanceStatsDocument, options);
        }
export type StudentAttendanceStatsQueryHookResult = ReturnType<typeof useStudentAttendanceStatsQuery>;
export type StudentAttendanceStatsLazyQueryHookResult = ReturnType<typeof useStudentAttendanceStatsLazyQuery>;
export type StudentAttendanceStatsSuspenseQueryHookResult = ReturnType<typeof useStudentAttendanceStatsSuspenseQuery>;
export type StudentAttendanceStatsQueryResult = Apollo.QueryResult<StudentAttendanceStatsQuery, StudentAttendanceStatsQueryVariables>;
export const StudentProgressDocument = gql`
    query StudentProgress($filter: StudentProgressFilterInput, $pagination: PaginationInput, $sort: SortInput) {
  studentProgress(filter: $filter, pagination: $pagination, sort: $sort) {
    data {
      id
      moduleId
      studentId
      isCompleted
      completedAt
      createdAt
      updatedAt
      module {
        id
        title
        type
        fileName
        fileUrl
        orderIndex
        chapter {
          id
          title
          orderIndex
          course {
            id
            title
          }
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
      total
      page
      limit
      totalPages
      hasNext
      hasPrev
    }
  }
}
    `;

/**
 * __useStudentProgressQuery__
 *
 * To run a query within a React component, call `useStudentProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useStudentProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStudentProgressQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useStudentProgressQuery(baseOptions?: Apollo.QueryHookOptions<StudentProgressQuery, StudentProgressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StudentProgressQuery, StudentProgressQueryVariables>(StudentProgressDocument, options);
      }
export function useStudentProgressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StudentProgressQuery, StudentProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StudentProgressQuery, StudentProgressQueryVariables>(StudentProgressDocument, options);
        }
export function useStudentProgressSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<StudentProgressQuery, StudentProgressQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<StudentProgressQuery, StudentProgressQueryVariables>(StudentProgressDocument, options);
        }
export type StudentProgressQueryHookResult = ReturnType<typeof useStudentProgressQuery>;
export type StudentProgressLazyQueryHookResult = ReturnType<typeof useStudentProgressLazyQuery>;
export type StudentProgressSuspenseQueryHookResult = ReturnType<typeof useStudentProgressSuspenseQuery>;
export type StudentProgressQueryResult = Apollo.QueryResult<StudentProgressQuery, StudentProgressQueryVariables>;
export const MyAttendanceDocument = gql`
    query MyAttendance {
  myAttendance {
    id
    isPresent
    sessionId
    studentId
    enrollmentId
    createdAt
    updatedAt
    session {
      id
      sessionTitle
      sessionDate
      batch {
        id
        name
        course {
          id
          title
        }
      }
    }
    enrollment {
      id
      enrollmentDate
      status
    }
  }
}
    `;

/**
 * __useMyAttendanceQuery__
 *
 * To run a query within a React component, call `useMyAttendanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyAttendanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyAttendanceQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyAttendanceQuery(baseOptions?: Apollo.QueryHookOptions<MyAttendanceQuery, MyAttendanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyAttendanceQuery, MyAttendanceQueryVariables>(MyAttendanceDocument, options);
      }
export function useMyAttendanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyAttendanceQuery, MyAttendanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyAttendanceQuery, MyAttendanceQueryVariables>(MyAttendanceDocument, options);
        }
export function useMyAttendanceSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyAttendanceQuery, MyAttendanceQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyAttendanceQuery, MyAttendanceQueryVariables>(MyAttendanceDocument, options);
        }
export type MyAttendanceQueryHookResult = ReturnType<typeof useMyAttendanceQuery>;
export type MyAttendanceLazyQueryHookResult = ReturnType<typeof useMyAttendanceLazyQuery>;
export type MyAttendanceSuspenseQueryHookResult = ReturnType<typeof useMyAttendanceSuspenseQuery>;
export type MyAttendanceQueryResult = Apollo.QueryResult<MyAttendanceQuery, MyAttendanceQueryVariables>;
export const MyProgressDocument = gql`
    query MyProgress($filter: StudentProgressFilterInput, $pagination: PaginationInput, $sort: SortInput) {
  myProgress(filter: $filter, pagination: $pagination, sort: $sort) {
    data {
      id
      moduleId
      studentId
      isCompleted
      completedAt
      createdAt
      updatedAt
      module {
        id
        title
        type
        fileName
        fileUrl
        orderIndex
        chapter {
          id
          title
          orderIndex
          course {
            id
            title
          }
        }
      }
      student {
        id
        firstName
        lastName
        username
      }
    }
    meta {
      total
      page
      limit
      totalPages
      hasNext
      hasPrev
    }
  }
}
    `;

/**
 * __useMyProgressQuery__
 *
 * To run a query within a React component, call `useMyProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProgressQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useMyProgressQuery(baseOptions?: Apollo.QueryHookOptions<MyProgressQuery, MyProgressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyProgressQuery, MyProgressQueryVariables>(MyProgressDocument, options);
      }
export function useMyProgressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProgressQuery, MyProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyProgressQuery, MyProgressQueryVariables>(MyProgressDocument, options);
        }
export function useMyProgressSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyProgressQuery, MyProgressQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyProgressQuery, MyProgressQueryVariables>(MyProgressDocument, options);
        }
export type MyProgressQueryHookResult = ReturnType<typeof useMyProgressQuery>;
export type MyProgressLazyQueryHookResult = ReturnType<typeof useMyProgressLazyQuery>;
export type MyProgressSuspenseQueryHookResult = ReturnType<typeof useMyProgressSuspenseQuery>;
export type MyProgressQueryResult = Apollo.QueryResult<MyProgressQuery, MyProgressQueryVariables>;