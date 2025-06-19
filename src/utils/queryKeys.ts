
// مفاتيح React Query موحدة لضمان التزامن بين جميع المكونات
export const QUERY_KEYS = {
  // Projects
  PROJECTS: ['projects'] as const,
  PROJECTS_MANAGEMENT: ['projects-management'] as const,
  ADMIN_PROJECTS: ['admin-projects'] as const,
  
  // Web Applications
  WEB_APPLICATIONS: ['web-applications'] as const,
  WEB_APPLICATIONS_MANAGEMENT: ['web-applications-management'] as const,
  ADMIN_WEB_APPLICATIONS: ['admin-web-applications'] as const,
  
  // Website Projects
  WEBSITE_PROJECTS: ['website-projects'] as const,
  WEBSITE_PROJECTS_MANAGEMENT: ['website-projects-management'] as const,
  ADMIN_WEBSITE_PROJECTS: ['admin-website-projects'] as const,
} as const;

// دالة مشتركة لإبطال جميع الاستعلامات ذات الصلة
export const invalidateAllQueries = (queryClient: any, type: 'projects' | 'web-applications' | 'website-projects') => {
  switch (type) {
    case 'projects':
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECTS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECTS_MANAGEMENT });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_PROJECTS });
      break;
    case 'web-applications':
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WEB_APPLICATIONS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WEB_APPLICATIONS_MANAGEMENT });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_WEB_APPLICATIONS });
      break;
    case 'website-projects':
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WEBSITE_PROJECTS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.WEBSITE_PROJECTS_MANAGEMENT });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ADMIN_WEBSITE_PROJECTS });
      break;
  }
  
  // إبطال جميع الاستعلامات كإجراء احتياطي
  queryClient.invalidateQueries();
};

// إعدادات React Query موحدة
export const DEFAULT_QUERY_OPTIONS = {
  staleTime: 0, // البيانات قديمة فوراً
  gcTime: 1000 * 60 * 5, // الاحتفاظ بالبيانات في cache لمدة 5 دقائق
  refetchOnWindowFocus: true, // إعادة جلب عند التركيز على النافذة
  refetchOnMount: true, // إعادة جلب عند تركيب المكون
  refetchOnReconnect: true, // إعادة جلب عند إعادة الاتصال
  retry: 1, // محاولة واحدة فقط في حالة الفشل
} as const;
