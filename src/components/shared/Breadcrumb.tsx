import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ChevronRight, Home, Loader2 } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { cn } from '@/lib/utils';
import { COURSE } from '@/graphql/query/course';
import { CHAPTER } from '@/graphql/query/chapter';
import { BATCH } from '@/graphql/query/batch';
import { ASSIGNMENT } from '@/graphql/query/assignment';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
  isLoading?: boolean;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className }) => {
  const location = useLocation();
  const params = useParams();

  // Fetch course data if courseId is present
  const { data: courseData, loading: courseLoading } = useQuery(COURSE, {
    variables: { id: params.courseId! },
    skip: !params.courseId,
  });

  // Fetch chapter data if chapterId is present
  const { data: chapterData, loading: chapterLoading } = useQuery(CHAPTER, {
    variables: { id: params.chapterId! },
    skip: !params.chapterId,
  });

  // Fetch batch data if batchId is present
  const { data: batchData, loading: batchLoading } = useQuery(BATCH, {
    variables: { id: params.batchId! },
    skip: !params.batchId,
  });

  // Fetch assignment data if assignmentId is present
  const { data: assignmentData, loading: assignmentLoading } = useQuery(ASSIGNMENT, {
    variables: { id: params.assignmentId! },
    skip: !params.assignmentId,
  });

  // Generate breadcrumb items based on current route if not provided
  const generateBreadcrumbItems = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbItems: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];

    // Handle specific route patterns with better URL construction
    const currentPath = location.pathname;

    // Pattern: /courses/:courseId/chapters/:chapterId/modules
    if (currentPath.match(/^\/courses\/[^\/]+\/chapters\/[^\/]+\/modules$/)) {
      const courseId = params.courseId;

      // Add Courses
      breadcrumbItems.push({
        label: 'Courses',
        href: '/courses',
        isActive: false
      });

      // Add Course Name
      if (courseData?.course) {
        breadcrumbItems.push({
          label: courseData.course.title,
          href: `/courses/${courseId}/chapters`,
          isActive: false
        });
      } else if (courseLoading) {
        breadcrumbItems.push({
          label: 'Loading...',
          isLoading: true,
          isActive: false
        });
      }

      // Add Chapters
      breadcrumbItems.push({
        label: 'Chapters',
        href: `/courses/${courseId}/chapters`,
        isActive: false
      });

      // Add Chapter Name
      if (chapterData?.chapter) {
        breadcrumbItems.push({
          label: chapterData.chapter.title,
          href: `/courses/${courseId}/chapters`,
          isActive: false
        });
      } else if (chapterLoading) {
        breadcrumbItems.push({
          label: 'Loading...',
          isLoading: true,
          isActive: false
        });
      }

      // Add Modules (active)
      breadcrumbItems.push({
        label: 'Modules',
        isActive: true
      });

      return breadcrumbItems;
    }

    // Pattern: /courses/:courseId/chapters
    if (currentPath.match(/^\/courses\/[^\/]+\/chapters$/)) {
      const courseId = params.courseId;

      // Add Courses
      breadcrumbItems.push({
        label: 'Courses',
        href: '/courses',
        isActive: false
      });

      // Add Course Name
      if (courseData?.course) {
        breadcrumbItems.push({
          label: courseData.course.title,
          href: `/courses/${courseId}/chapters`,
          isActive: false
        });
      } else if (courseLoading) {
        breadcrumbItems.push({
          label: 'Loading...',
          isLoading: true,
          isActive: false
        });
      }

      // Add Chapters (active)
      breadcrumbItems.push({
        label: 'Chapters',
        isActive: true
      });

      return breadcrumbItems;
    }

    // Pattern: /batches/:batchId/assignments
    if (currentPath.match(/^\/batches\/[^\/]+\/assignments$/)) {
      // Add Batches
      breadcrumbItems.push({
        label: 'Batches',
        href: '/batches',
        isActive: false
      });

      // Add Batch Name
      if (batchData?.batch) {
        breadcrumbItems.push({
          label: batchData.batch.name,
          href: '/batches',
          isActive: false
        });
      } else if (batchLoading) {
        breadcrumbItems.push({
          label: 'Loading...',
          isLoading: true,
          isActive: false
        });
      }

      // Add Assignments (active)
      breadcrumbItems.push({
        label: 'Assignments',
        isActive: true
      });

      return breadcrumbItems;
    }

    // Pattern: /assignments/:assignmentId/assignment-submissions
    if (currentPath.match(/^\/assignments\/[^\/]+\/assignment-submissions$/)) {
      // Add Batches
      breadcrumbItems.push({
        label: 'Batches',
        href: '/batches',
        isActive: false
      });

      // Add Batch Name if available
      if (assignmentData?.assignment?.batch) {
        breadcrumbItems.push({
          label: assignmentData.assignment.batch.name,
          href: '/batches',
          isActive: false
        });
      } else if (assignmentLoading) {
        breadcrumbItems.push({
          label: 'Loading...',
          isLoading: true,
          isActive: false
        });
      }

      // Add Assignments
      if (assignmentData?.assignment?.batchId) {
        breadcrumbItems.push({
          label: 'Assignments',
          href: `/batches/${assignmentData.assignment.batchId}/assignments`,
          isActive: false
        });
      } else {
        breadcrumbItems.push({
          label: 'Assignments',
          href: '#',
          isActive: false
        });
      }

      // Add Assignment Name
      if (assignmentData?.assignment) {
        breadcrumbItems.push({
          label: assignmentData.assignment.title,
          href: assignmentData.assignment.batchId ? `/batches/${assignmentData.assignment.batchId}/assignments` : '#',
          isActive: false
        });
      } else if (assignmentLoading) {
        breadcrumbItems.push({
          label: 'Loading...',
          isLoading: true,
          isActive: false
        });
      }

      // Add Assignment Submissions (active)
      breadcrumbItems.push({
        label: 'Assignment Submissions',
        isActive: true
      });

      return breadcrumbItems;
    }

    // Pattern: /batches/:batchId/enrollments
    if (currentPath.match(/^\/batches\/[^\/]+\/enrollments$/)) {
      // Add Batches
      breadcrumbItems.push({
        label: 'Batches',
        href: '/batches',
        isActive: false
      });

      // Add Batch Name
      if (batchData?.batch) {
        breadcrumbItems.push({
          label: batchData.batch.name,
          href: '/batches',
          isActive: false
        });
      } else if (batchLoading) {
        breadcrumbItems.push({
          label: 'Loading...',
          isLoading: true,
          isActive: false
        });
      }

      // Add Enrollments (active)
      breadcrumbItems.push({
        label: 'Enrollments',
        isActive: true
      });

      return breadcrumbItems;
    }

    // Pattern: /batches/:batchId/attendance-sessions
    if (currentPath.match(/^\/batches\/[^\/]+\/attendance-sessions$/)) {
      // Add Batches
      breadcrumbItems.push({
        label: 'Batches',
        href: '/batches',
        isActive: false
      });

      // Add Batch Name
      if (batchData?.batch) {
        breadcrumbItems.push({
          label: batchData.batch.name,
          href: '/batches',
          isActive: false
        });
      } else if (batchLoading) {
        breadcrumbItems.push({
          label: 'Loading...',
          isLoading: true,
          isActive: false
        });
      }

      // Add Attendance Sessions (active)
      breadcrumbItems.push({
        label: 'Attendance Sessions',
        isActive: true
      });

      return breadcrumbItems;
    }

    // Fallback for simple routes
    const routeLabels: Record<string, string> = {
      'courses': 'Courses',
      'batches': 'Batches',
      'students': 'Students',
      'admins': 'Admins',
      'enrollments': 'Enrollments',
    };

    if (pathSegments.length === 1 && routeLabels[pathSegments[0]]) {
      breadcrumbItems.push({
        label: routeLabels[pathSegments[0]],
        isActive: true
      });
    }

    return breadcrumbItems;
  };

  const breadcrumbItems = items || generateBreadcrumbItems();

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn(
        "flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 py-3 px-4 bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700",
        className
      )}
    >
      <ol className="flex items-center space-x-1">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            )}
            
            {item.isLoading ? (
              <span className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{item.label}</span>
              </span>
            ) : item.href && !item.isActive ? (
              <Link
                to={item.href}
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors duration-200 hover:underline"
              >
                {index === 0 && <Home className="h-4 w-4" />}
                <span className="truncate max-w-48">{item.label}</span>
              </Link>
            ) : (
              <span 
                className={cn(
                  "flex items-center space-x-1",
                  item.isActive 
                    ? "text-gray-900 dark:text-gray-100 font-medium" 
                    : "text-gray-600 dark:text-gray-400"
                )}
              >
                {index === 0 && <Home className="h-4 w-4" />}
                <span className="truncate max-w-48">{item.label}</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
