export const ACCOUNT = {
  USER: 'USER',
  ADMIN: 'ADMIN'
}

export const TYPETITLE = {
  SLUG: 'SLUG',
  TITLEUNSIGNED: 'TITLEUNSIGNED'
}

export const PERMISSION = {
  FULL: 'FULL',

  // Role
  CREATE_ROLE: 'CREATE_ROLE',
  READ_ROLE: 'READ_ROLE',
  UPDATE_ROLE: 'UPDATE_ROLE',
  DELETE_ROLE: 'DELETE_ROLE',

  // User
  CREATE_USER: 'CREATE_USER',
  READ_USER: 'READ_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  IMPORT_USER: 'IMPORT_USER',
  PLUS_MINUS_POINT_USER: 'PLUS_MINUS_POINT_USER',

  // Event
  CREATE_EVENT: 'CREATE_EVENT',
  UPDATE_EVENT: 'UPDATE_EVENT',
  READ_EVENT: 'READ_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
  IMPORT_EVENT: 'IMPORT_EVENT',
  EXPORT_EVENT: 'EXPORT_EVENT',
  RESTORE_EVENT: 'RESTORE_EVENT',

  // Session
  CREATE_SESSION: 'CREATE_SESSION',
  UPDATE_SESSION: 'UPDATE_SESSION',
  READ_SESSION: 'READ_SESSION',
  DELETE_SESSION: 'DELETE_SESSION',
  IMPORT_SESSION: 'IMPORT_SESSION',
  EXPORT_SESSION: 'EXPORT_SESSION',

  // Noti
  READ_NOTI: 'READ_NOTI',
  CREATE_NOTI: 'CREATE_NOTI',
  DELETE_NOTI: 'DELETE_NOTI',

  // Article
  CREATE_ARTICLE: 'CREATE_ARTICLE',
  READ_ARTICLE: 'READ_ARTICLE',
  UPDATE_ARTICLE: 'UPDATE_ARTICLE',
  DELETE_ARTICLE: 'DELETE_ARTICLE',

  // Attendee
  CREATE_ATTENDEE: 'CREATE_ATTENDEE',
  READ_ATTENDEE: 'READ_ATTENDEE',
  UPDATE_ATTENDEE: 'UPDATE_ATTENDEE',
  DELETE_ATTENDEE: 'DELETE_ATTENDEE',
  IMPORT_ATTENDEE: 'IMPORT_ATTENDEE',

  // Booth
  CREATE_BOOTH: 'CREATE_BOOTH',
  READ_BOOTH: 'READ_BOOTH',
  UPDATE_BOOTH: 'UPDATE_BOOTH',
  DELETE_BOOTH: 'DELETE_BOOTH',
  IMPORT_BOOTH: 'IMPORT_BOOTH',
  EXPORT_BOOTH: 'EXPORT_BOOTH',

  // Speaker
  CREATE_SPEAKER: 'CREATE_SPEAKER',
  READ_SPEAKER: 'READ_SPEAKER',
  UPDATE_SPEAKER: 'UPDATE_SPEAKER',
  DELETE_SPEAKER: 'DELETE_SPEAKER',

  // Type Session
  CREATE_TYPE_SESSION: 'CREATE_TYPE_SESSION',
  READ_TYPE_SESSION: 'READ_TYPE_SESSION',
  UPDATE_TYPE_SESSION: 'UPDATE_TYPE_SESSION',
  DELETE_TYPE_SESSION: 'DELETE_TYPE_SESSION',
  IMPORT_TYPE_SESSION: 'IMPORT_TYPE_SESSION',
  EXPORT_TYPE_SESSION: 'EXPORT_TYPE_SESSION',

  // Staff
  CREATE_STAFF: 'CREATE_STAFF',
  READ_STAFF: 'READ_STAFF',
  UPDATE_STAFF: 'UPDATE_STAFF',
  DELETE_STAFF: 'DELETE_STAFF',

  // STAFF LOG MANAGEMENT
  READ_LOG_STAFF: 'READ_LOG_STAFF',

  // Attendee challenge
  CREATE_ATTENDEE_ACTIVITY: 'CREATE_ATTENDEE_ACTIVITY',
  READ_ATTENDEE_CHALLENGE: 'READ_ATTENDEE_CHALLENGE',
  // Attendee challenge
  CREATE_ATTENDEE_CHALLENGE: 'CREATE_ATTENDEE_CHALLENGE',
  UPDATE_ATTENDEE_CHALLENGE: 'UPDATE_ATTENDEE_CHALLENGE',
  DELETE_ATTENDEE_CHALLENGE: 'DELETE_ATTENDEE_CHALLENGE',
  IMPORT_ATTENDEE_CHALLENGE: 'IMPORT_ATTENDEE_CHALLENGE',
  READ_ATTENDEE_ACTIVITY: 'READ_ATTENDEE_ACTIVITY',
  UPDATE_ATTENDEE_ACTIVITY: 'UPDATE_ATTENDEE_ACTIVITY',
  DELETE_ATTENDEE_ACTIVITY: 'DELETE_ATTENDEE_ACTIVITY',
  IMPORT_ATTENDEE_ACTIVITY: 'IMPORT_ATTENDEE_ACTIVITY',

  // Task
  CREATE_TASK: 'CREATE_TASK',
  UPDATE_TASK: 'UPDATE_TASK',
  READ_TASK: 'READ_TASK',
  DELETE_TASK: 'DELETE_TASK',

  // Proof
  UPDATE_PROOF: 'UPDATE_PROOF',
  READ_PROOF: 'READ_PROOF',
  EXPORT_PROOF: 'EXPORT_PROOF',
  IMPORT_PROOF: 'IMPORT_PROOF',

  // Program
  CREATE_PROGRAM: 'CREATE_PROGRAM',
  DELETE_PROGRAM: 'DELETE_PROGRAM',
  READ_PROGRAM: 'READ_PROGRAM',
  UPDATE_PROGRAM: 'UPDATE_PROGRAM',

  // Mentor
  CREATE_MENTOR: 'CREATE_MENTOR',
  DELETE_MENTOR: 'DELETE_MENTOR',
  READ_MENTOR: 'READ_MENTOR',
  UPDATE_MENTOR: 'UPDATE_MENTOR',
  IMPORT_MENTOR: 'IMPORT_MENTOR',
  ADD_MENTEE: 'ADD_MENTEE',
  DELETE_MENTEE: 'DELETE_MENTEE',

  // Group
  CREATE_GROUP: 'CREATE_GROUP',
  READ_GROUP: 'READ_GROUP',
  UPDATE_GROUP: 'UPDATE_GROUP',
  DELETE_GROUP: 'DELETE_GROUP',

  // Activity
  CREATE_ACTIVITY: 'CREATE_ACTIVITY',
  READ_ACTIVITY: 'READ_ACTIVITY',
  UPDATE_ACTIVITY: 'UPDATE_ACTIVITY',
  DELETE_ACTIVITY: 'DELETE_ACTIVITY',
  RESTORE_ACTIVITY: 'RESTORE_ACTIVITY',
  // Activity-group
  CREATE_ACTIVITY_GROUP: 'CREATE_ACTIVITY_GROUP',
  READ_ACTIVITY_GROUP: 'READ_ACTIVITY_GROUP',
  DELETE_ACTIVITY_GROUP: 'DELETE_ACTIVITY_GROUP',
  UPDATE_ACTIVITY_GROUP: 'UPDATE_ACTIVITY_GROUP',

  // Banner
  CREATE_BANNER: 'CREATE_BANNER',
  READ_BANNER: 'READ_BANNER',
  UPDATE_BANNER: 'UPDATE_BANNER',
  DELETE_BANNER: 'DELETE_BANNER',

  // Category
  CREATE_CATEGORY: 'CREATE_CATEGORY',
  READ_CATEGORY: 'READ_CATEGORY',
  UPDATE_CATEGORY: 'UPDATE_CATEGORY',
  DELETE_CATEGORY: 'DELETE_CATEGORY',

  // Comment
  APPROVE_COMMENT: 'APPROVE_COMMENT',
  READ_COMMENT: 'READ_COMMENT',

  // CommentFeed
  READ_COMMENT_FEED: 'READ_COMMENT_FEED',
  DELETE_COMMENT_FEED: 'DELETE_COMMENT_FEED',

  // Course
  CREATE_COURSE: 'CREATE_COURSE',
  READ_COURSE: 'READ_COURSE',
  UPDATE_COURSE: 'UPDATE_COURSE',
  DELETE_COURSE: 'DELETE_COURSE',

  // Education News
  CREATE_EDUCATION_NEWS: 'CREATE_EDUCATION_NEWS',
  READ_EDUCATION_NEWS: 'READ_EDUCATION_NEWS',
  UPDATE_EDUCATION_NEWS: 'UPDATE_EDUCATION_NEWS',
  DELETE_EDUCATION_NEWS: 'DELETE_EDUCATION_NEWS',

  // Home Course
  CREATE_HOME_COURSE: 'CREATE_HOME_COURSE',
  READ_HOME_COURSE: 'READ_HOME_COURSE',
  UPDATE_HOME_COURSE: 'UPDATE_HOME_COURSE',
  DELETE_HOME_COURSE: 'DELETE_HOME_COURSE',

  // Hot News
  CREATE_HOT_NEWS: 'CREATE_HOT_NEWS',
  READ_HOT_NEWS: 'READ_HOT_NEWS',
  UPDATE_HOT_NEWS: 'UPDATE_HOT_NEWS',
  DELETE_HOT_NEWS: 'DELETE_HOT_NEWS',

  // News
  CREATE_NEWS: 'CREATE_NEWS',
  READ_NEWS: 'READ_NEWS',
  UPDATE_NEWS: 'UPDATE_NEWS',
  DELETE_NEWS: 'DELETE_NEWS',

  // Post
  READ_POST: 'READ_POST',
  DELETE_POST: 'DELETE_POST',
  CREATE_POST: 'CREATE_POST',
  UPDATE_POST: 'UPDATE_POST',

  // Setting
  CREATE_SETTING: 'CREATE_SETTING',
  READ_SETTING: 'READ_SETTING',
  UPDATE_SETTING: 'UPDATE_SETTING',
  DELETE_SETTING: 'DELETE_SETTING',

  // Topic
  CREATE_TOPIC: 'CREATE_TOPIC',
  READ_TOPIC: 'READ_TOPIC',
  UPDATE_TOPIC: 'UPDATE_TOPIC',
  DELETE_TOPIC: 'DELETE_TOPIC',

  // Type
  CREATE_TYPE: 'CREATE_TYPE',
  READ_TYPE: 'READ_TYPE',
  UPDATE_TYPE: 'UPDATE_TYPE',
  DELETE_TYPE: 'DELETE_TYPE',

  // Course Noti
  CREATE_COURSE_NOTI: 'CREATE_COURSE_NOTI',
  READ_COURSE_NOTI: 'READ_COURSE_NOTI',
  DELETE_COURSE_NOTI: 'DELETE_COURSE_NOTI',

  // STAFF_NOTI
  READ_STAFF_NOTI: 'READ_STAFF_NOTI',

  // Skill
  CREATE_SKILL: 'CREATE_SKILL',
  READ_SKILL: 'READ_SKILL',
  UPDATE_SKILL: 'UPDATE_SKILL',
  DELETE_SKILL: 'DELETE_SKILL',

  // Tag
  CREATE_TAG: 'CREATE_TAG',
  READ_TAG: 'READ_TAG',
  UPDATE_TAG: 'UPDATE_TAG',
  DELETE_TAG: 'DELETE_TAG',

  // Challenge Self Task
  READ_CHALLENGE_SELF_TASK: 'READ_CHALLENGE_SELF_TASK',

  // Proof Self Task
  READ_PROOF_SELF_TASK: 'READ_PROOF_SELF_TASK',

  READ_TOGETHER_TASK: 'READ_TOGETHER_TASK',

  // Supporter
  CREATE_SUPPORTER: 'CREATE_SUPPORTER',
  READ_SUPPORTER: 'READ_SUPPORTER',
  UPDATE_SUPPORTER: 'UPDATE_SUPPORTER',
  DELETE_SUPPORTER: 'DELETE_SUPPORTER',
  IMPORT_SUPPORTER: 'IMPORT_SUPPORTER',

  // MANAGER
  CREATE_MANAGER: 'CREATE_MANAGER',
  READ_MANAGER: 'READ_MANAGER',
  UPDATE_MANAGER: 'UPDATE_MANAGER',
  DELETE_MANAGER: 'DELETE_MANAGER',
  IMPORT_MANAGER: 'IMPORT_MANAGER',

  // RANK USER
  READ_RANK: 'READ_RANK',
  UPDATE_RANK: 'UPDATE_RANK',
  // Proof LEVEL
  READ_PROOF_LEVEL: 'READ_PROOF_LEVEL',
  APPROVE_PROOF_LEVEL: 'APPROVE_PROOF_LEVEL',
   // cms reward
   REWARD_MANAGEMENT: 'REWARD_MANAGEMENT',
   DELETE_REWARD: 'DELETE_REWARD',
   READ_REWARD: 'READ_REWARD',
   UPDATE_REWARD: 'UPDATE_REWARD',
   CREATE_REWARD: 'CREATE_REWARD',
}

export const ASPECTRATIO = [
  {
    name: 'ONE_ONE',
    OP1: 1,
    OP2: 1
  },
  {
    name: 'TWO_ONE',
    OP1: 2,
    OP2: 1
  },
  {
    name: 'TWO_THREE',
    OP1: 2,
    OP2: 3
  },
  {
    name: 'THREE_TWO',
    OP1: 3,
    OP2: 2
  }
]

export const FULL_ROLE = [
  {
    title: 'Quản lý quyền',
    permissions: [
      {
        title: 'Xem danh sách quyền',
        key: PERMISSION.READ_ROLE
      },
      {
        title: 'Tạo quyền',
        key: PERMISSION.CREATE_ROLE
      },
      {
        title: 'Chỉnh sửa quyền',
        key: PERMISSION.UPDATE_ROLE
      },
      {
        title: 'Xoá quyền',
        key: PERMISSION.DELETE_ROLE
      }
    ]
  },
  {
    title: 'Quản lý nhân viên',
    permissions: [
      {
        title: 'Xem danh sách nhân viên',
        key: PERMISSION.READ_STAFF
      },
      {
        title: 'Tạo nhân viên',
        key: PERMISSION.CREATE_STAFF
      },
      {
        title: 'Chỉnh sửa nhân viên',
        key: PERMISSION.UPDATE_STAFF
      },
      {
        title: 'Xoá nhân viên',
        key: PERMISSION.DELETE_STAFF
      }
    ]
  },
  {
    title: 'Quản lý người dùng',
    permissions: [
      {
        title: 'Xem danh sách người dùng',
        key: PERMISSION.READ_USER
      },
      {
        title: 'Tạo người dùng',
        key: PERMISSION.CREATE_USER
      },
      {
        title: 'Chỉnh sửa người dùng',
        key: PERMISSION.UPDATE_USER
      },
      {
        title: 'Xoá người dùng',
        key: PERMISSION.DELETE_USER
      },
      {
        title: 'Nhập người dùng',
        key: PERMISSION.IMPORT_USER
      }
    ]
  },
  {
    title: 'Quản lý sự kiện',
    permissions: [
      {
        title: 'Xem danh sách sự kiện',
        key: PERMISSION.READ_EVENT
      },
      {
        title: 'Tạo sự kiện',
        key: PERMISSION.CREATE_EVENT
      },
      {
        title: 'Chỉnh sửa sự kiện',
        key: PERMISSION.UPDATE_EVENT
      },
      {
        title: 'Xoá sự kiện',
        key: PERMISSION.DELETE_EVENT
      },
      {
        title: 'Khôi phục sự kiện',
        key: PERMISSION.RESTORE_EVENT
      },
      {
        title: 'Nhập sự kiện',
        key: PERMISSION.IMPORT_EVENT
      },
      {
        title: 'Xuất sự kiện',
        key: PERMISSION.EXPORT_EVENT
      }
    ]
  },
  {
    title: 'Quản lý loại session',
    permissions: [
      {
        title: 'Xem danh sách loại session',
        key: PERMISSION.READ_TYPE_SESSION
      },
      {
        title: 'Tạo loại session',
        key: PERMISSION.CREATE_TYPE_SESSION
      },
      {
        title: 'Chỉnh sửa loại session',
        key: PERMISSION.UPDATE_TYPE_SESSION
      },
      {
        title: 'Xoá loại session',
        key: PERMISSION.DELETE_TYPE_SESSION
      },
      {
        title: 'Nhập loại session',
        key: PERMISSION.IMPORT_TYPE_SESSION
      },
      {
        title: 'Xuất loại session',
        key: PERMISSION.EXPORT_TYPE_SESSION
      }
    ]
  },
  {
    title: 'Quản lý session',
    permissions: [
      {
        title: 'Xem danh sách session',
        key: PERMISSION.READ_SESSION
      },
      {
        title: 'Tạo session',
        key: PERMISSION.CREATE_SESSION
      },
      {
        title: 'Chỉnh sửa session',
        key: PERMISSION.UPDATE_SESSION
      },
      {
        title: 'Xoá session',
        key: PERMISSION.DELETE_SESSION
      },
      {
        title: 'Nhập session',
        key: PERMISSION.IMPORT_SESSION
      },
      {
        title: 'Xuất session',
        key: PERMISSION.EXPORT_SESSION
      }
    ]
  },
  {
    title: 'Quản lý thông báo',
    permissions: [
      {
        title: 'Xem danh sách thông báo',
        key: PERMISSION.READ_NOTI
      },
      {
        title: 'Tạo thông báo',
        key: PERMISSION.CREATE_NOTI
      },
      {
        title: 'Xoá thông báo',
        key: PERMISSION.DELETE_NOTI
      }
    ]
  },
  {
    title: 'Quản lý tin tức',
    permissions: [
      {
        title: 'Xem danh sách tin tức',
        key: PERMISSION.READ_ARTICLE
      },
      {
        title: 'Tạo tin tức',
        key: PERMISSION.CREATE_ARTICLE
      },
      {
        title: 'Cập nhật tin tức',
        key: PERMISSION.UPDATE_ARTICLE
      },
      {
        title: 'Xoá tin tức',
        key: PERMISSION.DELETE_ARTICLE
      }
    ]
  },
  {
    title: 'Quản lý khách mời',
    permissions: [
      {
        title: 'Xem danh sách khách mời',
        key: PERMISSION.READ_ATTENDEE
      },
      {
        title: 'Tạo khách mời',
        key: PERMISSION.CREATE_ATTENDEE
      },
      {
        title: 'Cập nhật khách mời',
        key: PERMISSION.UPDATE_ATTENDEE
      },
      {
        title: 'Xoá khách mời',
        key: PERMISSION.DELETE_ATTENDEE
      }
    ]
  }
  // {
  //     title: "Quản lý diễn giả",
  //     permissions: [
  //         {
  //             title: "Xem danh sách diễn giả",
  //             key: PERMISSION.READ_SPEAKER
  //         },
  //         {
  //             title: "Tạo diễn giả",
  //             key: PERMISSION.CREATE_SPEAKER
  //         },
  //         {
  //             title: "Cập nhật diễn giả",
  //             key: PERMISSION.UPDATE_SPEAKER
  //         },
  //         {
  //             title: "Xoá diễn giả",
  //             key: PERMISSION.DELETE_SPEAKER
  //         }
  //     ]
  // }
]

export const FULL_ROLE_LMS = [
  {
    title: 'Quản lý quyền',
    permissions: [
      {
        title: 'Xem danh sách quyền',
        key: PERMISSION.READ_ROLE
      },
      {
        title: 'Tạo quyền',
        key: PERMISSION.CREATE_ROLE
      },
      {
        title: 'Chỉnh sửa quyền',
        key: PERMISSION.UPDATE_ROLE
      },
      {
        title: 'Xoá quyền',
        key: PERMISSION.DELETE_ROLE
      }
    ]
  },
  {
    title: 'Quản lý nhân viên',
    permissions: [
      {
        title: 'Xem danh sách nhân viên',
        key: PERMISSION.READ_STAFF
      },
      {
        title: 'Tạo nhân viên',
        key: PERMISSION.CREATE_STAFF
      },
      {
        title: 'Chỉnh sửa nhân viên',
        key: PERMISSION.UPDATE_STAFF
      },
      {
        title: 'Xoá nhân viên',
        key: PERMISSION.DELETE_STAFF
      }
    ]
  },
  {
    title: 'Quản lý banner',
    permissions: [
      {
        title: 'Xem danh sách banner',
        key: PERMISSION.READ_BANNER
      },
      {
        title: 'Tạo banner',
        key: PERMISSION.CREATE_BANNER
      },
      {
        title: 'Chỉnh sửa banner',
        key: PERMISSION.UPDATE_BANNER
      },
      {
        title: 'Xoá banner',
        key: PERMISSION.DELETE_BANNER
      }
    ]
  },
  {
    title: 'Quản lý loại danh mục bài viết',
    permissions: [
      {
        title: 'Xem danh sách danh mục bài viết',
        key: PERMISSION.READ_CATEGORY
      },
      {
        title: 'Tạo danh mục bài viết',
        key: PERMISSION.CREATE_CATEGORY
      },
      {
        title: 'Chỉnh sửa danh mục bài viết',
        key: PERMISSION.UPDATE_CATEGORY
      },
      {
        title: 'Xoá danh mục bài viết',
        key: PERMISSION.DELETE_CATEGORY
      }
    ]
  },
  {
    title: 'Quản lý đánh giá khóa học',
    permissions: [
      {
        title: 'Xem danh sách đánh giá khóa học',
        key: PERMISSION.READ_COMMENT
      },
      {
        title: 'Duyệt giá khóa học',
        key: PERMISSION.APPROVE_COMMENT
      }
    ]
  },
  {
    title: 'Quản lý bình luận',
    permissions: [
      {
        title: 'Xem danh sách bình luận',
        key: PERMISSION.READ_COMMENT_FEED
      },
      {
        title: 'Xoá bình luận',
        key: PERMISSION.DELETE_COMMENT_FEED
      }
    ]
  },
  {
    title: 'Quản lý tin tức',
    permissions: [
      {
        title: 'Xem danh sách tin tức',
        key: PERMISSION.READ_NEWS
      },
      {
        title: 'Tạo tin tức',
        key: PERMISSION.CREATE_NEWS
      },
      {
        title: 'Cập nhật tin tức',
        key: PERMISSION.UPDATE_NEWS
      },
      {
        title: 'Xoá tin tức',
        key: PERMISSION.DELETE_NEWS
      }
    ]
  },
  {
    title: 'Quản lý người tham gia',
    permissions: [
      {
        title: 'Xem danh sách người tham gia',
        key: PERMISSION.READ_ATTENDEE
      },
      {
        title: 'Tạo người tham gia',
        key: PERMISSION.CREATE_ATTENDEE
      },
      {
        title: 'Xoá người tham gia',
        key: PERMISSION.DELETE_ATTENDEE
      },
      {
        title: 'Import danh sách người tham gia',
        key: PERMISSION.IMPORT_ATTENDEE
      }
    ]
  },
  {
    title: 'Quản lý khóa học',
    permissions: [
      {
        title: 'Xem danh sách khóa học',
        key: PERMISSION.READ_COURSE
      },
      {
        title: 'Tạo khóa học',
        key: PERMISSION.CREATE_COURSE
      },
      {
        title: 'Cập nhật khóa học',
        key: PERMISSION.UPDATE_COURSE
      },
      {
        title: 'Xoá khóa học',
        key: PERMISSION.DELETE_COURSE
      }
    ]
  },
  {
    title: 'Quản lý bảng tin học tập',
    permissions: [
      {
        title: 'Xem danh sácý bảng tin học tập',
        key: PERMISSION.READ_EDUCATION_NEWS
      },
      {
        title: 'Tạý bảng tin học tập',
        key: PERMISSION.CREATE_EDUCATION_NEWS
      },
      {
        title: 'Cập nhậý bảng tin học tập',
        key: PERMISSION.UPDATE_EDUCATION_NEWS
      },
      {
        title: 'Xoý bảng tin học tập',
        key: PERMISSION.DELETE_EDUCATION_NEWS
      }
    ]
  },
  {
    title: 'Quản lý khóa học nổi bật',
    permissions: [
      {
        title: 'Xem danh sách khóa học nổi bật',
        key: PERMISSION.READ_HOME_COURSE
      },
      {
        title: 'Tạo khóa học nổi bật',
        key: PERMISSION.CREATE_HOME_COURSE
      },
      {
        title: 'Cập nhật khóa học nổi bật',
        key: PERMISSION.UPDATE_HOME_COURSE
      },
      {
        title: 'Xoá khóa học nổi bật',
        key: PERMISSION.DELETE_HOME_COURSE
      }
    ]
  },
  {
    title: 'Quản lý tin học tập',
    permissions: [
      {
        title: 'Xem danh sách tin học tập',
        key: PERMISSION.READ_HOT_NEWS
      },
      {
        title: 'Tạo tin học tập',
        key: PERMISSION.CREATE_HOT_NEWS
      },
      {
        title: 'Cập nhật tin học tập',
        key: PERMISSION.UPDATE_HOT_NEWS
      },
      {
        title: 'Xoá tin học tập',
        key: PERMISSION.DELETE_HOT_NEWS
      }
    ]
  },
  {
    title: 'Quản lý người hướng dẫn',
    permissions: [
      {
        title: 'Xem danh sách người hướng dẫn',
        key: PERMISSION.READ_MENTOR
      },
      {
        title: 'Tạo người hướng dẫn',
        key: PERMISSION.CREATE_MENTOR
      },
      {
        title: 'Cập nhật người hướng dẫn',
        key: PERMISSION.UPDATE_MENTOR
      },
      {
        title: 'Xoá người hướng dẫn',
        key: PERMISSION.DELETE_MENTOR
      }
    ]
  },
  {
    title: 'Quản lý bài viết',
    permissions: [
      {
        title: 'Xem danh sách bài viết',
        key: PERMISSION.READ_POST
      },
      {
        title: 'Xoá bài viết',
        key: PERMISSION.DELETE_POST
      }
    ]
  },
  {
    title: 'Quản lý thông tin website',
    permissions: [
      {
        title: 'Xem danh sách thông tin website',
        key: PERMISSION.READ_SETTING
      },
      {
        title: 'Tạo thông tin website',
        key: PERMISSION.CREATE_SETTING
      },
      {
        title: 'Cập nhật thông tin website',
        key: PERMISSION.UPDATE_SETTING
      },
      {
        title: 'Xoá thông tin website',
        key: PERMISSION.DELETE_SETTING
      }
    ]
  },
  {
    title: 'Quản lý nội dung khóa học',
    permissions: [
      {
        title: 'Xem danh sách nội dung khóa học',
        key: PERMISSION.READ_TOPIC
      },
      {
        title: 'Tạo nội dung khóa học',
        key: PERMISSION.CREATE_TOPIC
      },
      {
        title: 'Cập nhật nội dung khóa học',
        key: PERMISSION.UPDATE_TOPIC
      },
      {
        title: 'Xoá nội dung khóa học',
        key: PERMISSION.DELETE_TOPIC
      }
    ]
  },
  {
    title: 'Quản lý thông báo khóa học',
    permissions: [
      {
        title: 'Xem danh sách thông báo khóa học',
        key: PERMISSION.READ_COURSE_NOTI
      },
      {
        title: 'Tạo thông báo khóa học',
        key: PERMISSION.CREATE_COURSE_NOTI
      },
      {
        title: 'Xoá thông báo khóa học',
        key: PERMISSION.DELETE_COURSE_NOTI
      }
    ]
  },
  {
    title: 'Quản lý danh mục khóa học',
    permissions: [
      {
        title: 'Xem danh sách danh mục khóa học',
        key: PERMISSION.READ_TYPE
      },
      {
        title: 'Tạo danh mục khóa học',
        key: PERMISSION.CREATE_TYPE
      },
      {
        title: 'Cập nhật danh mục khóa học',
        key: PERMISSION.UPDATE_TYPE
      },
      {
        title: 'Xoá danh mục khóa học',
        key: PERMISSION.DELETE_TYPE
      }
    ]
  },
  {
    title: 'Quản lý thông báo trang cms',
    permissions: [
      {
        title: 'Xem danh sách thông báo trang cms',
        key: PERMISSION.READ_STAFF_NOTI
      }
    ]
  },
  {
    title: 'Quản lý kỹ năng',
    permissions: [
      {
        title: 'Xem danh sách kỹ năng',
        key: PERMISSION.READ_SKILL
      },
      {
        title: 'Tạo kỹ năng',
        key: PERMISSION.CREATE_SKILL
      },
      {
        title: 'Cập nhật kỹ năng',
        key: PERMISSION.UPDATE_SKILL
      },
      {
        title: 'Xóa kỹ năng',
        key: PERMISSION.DELETE_SKILL
      }
    ]
  },
  {
    title: 'Quản lý tag',
    permissions: [
      {
        title: 'Xem danh sách tag',
        key: PERMISSION.READ_TAG
      },
      {
        title: 'Tạo tag',
        key: PERMISSION.CREATE_TAG
      },
      {
        title: 'Cập nhật tag',
        key: PERMISSION.UPDATE_TAG
      },
      {
        title: 'Xóa tag',
        key: PERMISSION.DELETE_TAG
      }
    ]
  },
  {
    title: 'Quản lý hoạt động',
    permissions: [
      {
        title: 'Tạo hoạt động',
        key: PERMISSION.CREATE_ACTIVITY
      },
      {
        title: 'Cập nhật hoạt động',
        key: PERMISSION.UPDATE_ACTIVITY
      },
      {
        title: 'Xem danh sách hoạt động',
        key: PERMISSION.READ_ACTIVITY
      }
    ]
  },
  {
    title: 'Quản lý hoạt động nhóm',
    permissions: [
      {
        title: 'Tạo hoạt động nhóm',
        key: PERMISSION.CREATE_ACTIVITY_GROUP
      },
      {
        title: 'Cập nhật nhóm hoạt động',
        key: PERMISSION.UPDATE_ACTIVITY_GROUP
      },
      {
        title: 'Xem danh sách hoạt động nhóm',
        key: PERMISSION.READ_ACTIVITY_GROUP
      },
      {
        title: 'Xoá hoạt động nhóm',
        key: PERMISSION.DELETE_ACTIVITY_GROUP
      }
    ]
  }
]

export const FULL_ROLE_TALENT = [
  {
    title: 'Quản lý phân quyền',
    permissions: [
      {
        title: 'Xem danh sách phân quyền',
        key: PERMISSION.READ_ROLE
      },
      {
        title: 'Tạo phân quyền',
        key: PERMISSION.CREATE_ROLE
      },
      {
        title: 'Chỉnh sửa phân quyền',
        key: PERMISSION.UPDATE_ROLE
      },
      {
        title: 'Xoá phân quyền',
        key: PERMISSION.DELETE_ROLE
      }
    ]
  },
  {
    title: 'Quản lý nhân viên',
    permissions: [
      {
        title: 'Xem danh sách nhân viên',
        key: PERMISSION.READ_STAFF
      },
      {
        title: 'Tạo nhân viên',
        key: PERMISSION.CREATE_STAFF
      },
      {
        title: 'Chỉnh sửa nhân viên',
        key: PERMISSION.UPDATE_STAFF
      },
      {
        title: 'Xoá nhân viên',
        key: PERMISSION.DELETE_STAFF
      }
    ]
  },
  {
    title: 'Quản lý người dùng',
    permissions: [
      {
        title: 'Xem danh sách người dùng',
        key: PERMISSION.READ_USER
      },
      {
        title: 'Tạo người dùng',
        key: PERMISSION.CREATE_USER
      },
      {
        title: 'Chỉnh sửa người dùng',
        key: PERMISSION.UPDATE_USER
      },
      {
        title: 'Xoá người dùng',
        key: PERMISSION.DELETE_USER
      },
      {
        title: 'Nhập người dùng',
        key: PERMISSION.IMPORT_USER
      }
    ]
  },
  {
    title: 'Quản lý người tham gia',
    permissions: [
      {
        title: 'Xem danh sách người tham gia',
        key: PERMISSION.READ_ATTENDEE
      },
      {
        title: 'Tạo người tham gia',
        key: PERMISSION.CREATE_ATTENDEE
      },
      {
        title: 'Cập nhật người tham gia',
        key: PERMISSION.UPDATE_ATTENDEE
      },
      {
        title: 'Xoá người tham gia',
        key: PERMISSION.DELETE_ATTENDEE
      },
      {
        title: 'Import danh sách người tham gia',
        key: PERMISSION.IMPORT_ATTENDEE
      }
    ]
  },
  {
    title: 'Quản lý thử thách',
    permissions: [
      {
        title: 'Xem danh thử thách',
        key: PERMISSION.READ_ACTIVITY
      },
      {
        title: 'Tạo thử thách',
        key: PERMISSION.CREATE_ACTIVITY
      },
      {
        title: 'Cập nhật thử thách',
        key: PERMISSION.UPDATE_ACTIVITY
      },
      {
        title: 'Xoá thử thách',
        key: PERMISSION.DELETE_ACTIVITY
      },
      {
        title: 'Khôi phục thử thách',
        key: PERMISSION.RESTORE_ACTIVITY
      },
      {
        title: 'Xem danh sách khách mời',
        key: PERMISSION.READ_ATTENDEE_ACTIVITY
      },
      {
        title: 'import danh sách khách mời',
        key: PERMISSION.IMPORT_ATTENDEE_ACTIVITY
      },
      {
        title: 'Tạo khách mời',
        key: PERMISSION.CREATE_ATTENDEE_ACTIVITY
      },
      {
        title: 'Cập nhật khách mời',
        key: PERMISSION.UPDATE_ATTENDEE_ACTIVITY
      },
      {
        title: 'Xoá khách mời',
        key: PERMISSION.DELETE_ATTENDEE_ACTIVITY
      }
    ]
  },
  {
    title: 'Quản lý nhiệm vụ',
    permissions: [
      {
        title: 'Xem nhiệm vụ',
        key: PERMISSION.READ_TASK
      },
      {
        title: 'Tạo nhiệm vụ',
        key: PERMISSION.CREATE_TASK
      },
      {
        title: 'Cập nhật nhiệm vụ',
        key: PERMISSION.UPDATE_TASK
      },
      {
        title: 'Xoá nhiệm vụ',
        key: PERMISSION.DELETE_TASK
      }
    ]
  },
  {
    title: 'Quản lý chương trình',
    permissions: [
      {
        title: 'Tạo chương trình',
        key: PERMISSION.CREATE_PROGRAM
      },
      {
        title: 'Cập nhật Chương trình',
        key: PERMISSION.UPDATE_PROGRAM
      },
      {
        title: 'Xoá chương trình',
        key: PERMISSION.DELETE_PROGRAM
      },
      {
        title: 'Xem chương trình',
        key: PERMISSION.READ_PROGRAM
      }
    ]
  },
  {
    title: 'Quản lý người hướng dẫn',
    permissions: [
      {
        title: 'Tạo người hướng dẫn',
        key: PERMISSION.CREATE_MENTOR
      },
      {
        title: 'Xoá người hướng dẫn',
        key: PERMISSION.DELETE_MENTOR
      },
      {
        title: 'Cập nhật thông tin người hướng dẫn',
        key: PERMISSION.UPDATE_MENTOR
      },
      {
        title: 'Xem người hướng dẫn',
        key: PERMISSION.READ_MENTOR
      },
      {
        title: 'Import danh sách người hướng dẫn',
        key: PERMISSION.IMPORT_MENTOR
      },
      {
        title: 'Thêm người được hướng dẫn',
        key: PERMISSION.ADD_MENTEE
      },
      {
        title: 'Xoá người được hướng dẫn',
        key: PERMISSION.DELETE_MENTEE
      }
    ]
  },
  {
    title: 'Quản lý người quản lý',
    permissions: [
      {
        title: 'Tạo người quản lý',
        key: PERMISSION.CREATE_MANAGER
      },
      {
        title: 'Xoá người quản lý',
        key: PERMISSION.DELETE_MANAGER
      },
      {
        title: 'Cập nhật thông tin người quản lý',
        key: PERMISSION.UPDATE_MANAGER
      },
      {
        title: 'Xem người quản lý',
        key: PERMISSION.READ_MANAGER
      },
      {
        title: 'Import danh sách người quản lý',
        key: PERMISSION.IMPORT_MANAGER
      }
    ]
  },
  {
    title: 'Quản lý người hỗ trợ',
    permissions: [
      {
        title: 'Tạo người hỗ trợ',
        key: PERMISSION.CREATE_SUPPORTER
      },
      {
        title: 'Xoá người hỗ trợ',
        key: PERMISSION.DELETE_SUPPORTER
      },
      {
        title: 'Cập nhật thông tin người hỗ trợ',
        key: PERMISSION.UPDATE_SUPPORTER
      },
      {
        title: 'Xem người hỗ trợ',
        key: PERMISSION.READ_SUPPORTER
      },
      {
        title: 'Import danh sách người hỗ trợ',
        key: PERMISSION.IMPORT_SUPPORTER
      }
    ]
  },
  {
    title: 'hỗ trợ nhóm chương trình',
    permissions: [
      {
        title: 'Tạo nhóm chương trình',
        key: PERMISSION.CREATE_GROUP
      },
      {
        title: 'Cập nhật nhóm chương trình',
        key: PERMISSION.UPDATE_GROUP
      },
      {
        title: 'Xem nhóm chương trình',
        key: PERMISSION.READ_GROUP
      },
      {
        title: 'Xóa nhóm chương trình',
        key: PERMISSION.DELETE_GROUP
      }
    ]
  },
  {
    title: 'Quản lý hoạt động',
    permissions: [
      {
        title: 'Tạo hoạt động',
        key: PERMISSION.CREATE_ACTIVITY
      },
      {
        title: 'Cập nhật hoạt động',
        key: PERMISSION.UPDATE_ACTIVITY
      },
      {
        title: 'Xem danh sách hoạt động',
        key: PERMISSION.READ_ACTIVITY
      },
      {
        title: 'xem nhiệm vụ SELF',
        key: PERMISSION.READ_CHALLENGE_SELF_TASK
      },
      {
        title: 'xem bài nộp SELF',
        key: PERMISSION.READ_PROOF_SELF_TASK
      },
      {
        title: 'xem nhiệm vụ TOGETHER',
        key: PERMISSION.READ_TOGETHER_TASK
      },
      {
        title: 'xem danh sách bài nộp',
        key: PERMISSION.READ_PROOF_LEVEL
      },
      {
        title: 'Duyệt bài nộp',
        key: PERMISSION.APPROVE_PROOF_LEVEL
      },
      {
        title: 'Xem bài nộp',
        key: PERMISSION.READ_PROOF
      },
      {
        title: 'Cập nhật bài nộp',
        key: PERMISSION.UPDATE_PROOF
      },
      {
        title: 'Export bài nộp',
        key: PERMISSION.EXPORT_PROOF
      },
      {
        title: 'Import bài nộp',
        key: PERMISSION.IMPORT_PROOF
      },
      {
        title: 'Xem danh sách khách mời',
        key: PERMISSION.READ_ATTENDEE_CHALLENGE
      },
      {
        title: 'import danh sách khách mời',
        key: PERMISSION.IMPORT_ATTENDEE_CHALLENGE
      },
      {
        title: 'Tạo khách mời',
        key: PERMISSION.CREATE_ATTENDEE_CHALLENGE
      },
      {
        title: 'Cập nhật khách mời',
        key: PERMISSION.UPDATE_ATTENDEE_CHALLENGE
      },
      {
        title: 'Xoá khách mời',
        key: PERMISSION.DELETE_ATTENDEE_CHALLENGE
      }
    ]
  },
  {
    title: 'Quản lý nhóm hoạt động',
    permissions: [
      {
        title: 'Tạo nhóm hoạt động',
        key: PERMISSION.CREATE_ACTIVITY_GROUP
      },
      {
        title: 'Cập nhật nhóm hoạt động',
        key: PERMISSION.UPDATE_ACTIVITY_GROUP
      },
      {
        title: 'Xem danh sách nhóm hoạt động',
        key: PERMISSION.READ_ACTIVITY_GROUP
      },
      {
        title: 'Xoá nhóm hoạt động',
        key: PERMISSION.DELETE_ACTIVITY_GROUP
      }
    ]
  },
  {
    title: 'Quản lý Xếp hạng',
    permissions: [
      {
        title: 'Xem bảng xếp hạng',
        key: PERMISSION.READ_RANK
      },
      {
        title: 'Cập nhật bảng xếp hạng',
        key: PERMISSION.UPDATE_RANK
      }
    ]
  },
  {
    title: 'Quản lý bài viết',
    permissions: [
      {
        title: 'Xem danh sách bài viết',
        key: PERMISSION.READ_POST
      },
      {
        title: 'Tạo bài viết',
        key: PERMISSION.CREATE_POST
      },
      {
        title: 'Cập nhật bài viết',
        key: PERMISSION.UPDATE_POST
      },
      {
        title: 'Xoá bài viết',
        key: PERMISSION.DELETE_POST
      }
    ]
  },
  {
    title: 'Quản lý thông báo trang cms',
    permissions: [
      {
        title: 'Xem danh sách thông báo trang cms',
        key: PERMISSION.READ_STAFF_NOTI
      }
    ]
  },
  {
    title: 'Quản lý quà tặng',
    permissions: [
      {
        title: 'Xem danh sách quà tặng',
        key: PERMISSION.READ_REWARD
      },
      {
        title: 'Tạo quà tặng',
        key: PERMISSION.CREATE_REWARD
      },
      {
        title: 'Cập nhật quà tặng',
        key: PERMISSION.UPDATE_REWARD
      },
      {
        title: 'Xoá quà tặng',
        key: PERMISSION.DELETE_REWARD
      }
    ]
  },
]

export const FULL_ROLE_EVENT = [
  {
    title: 'Quản lý quyền',
    permissions: [
      {
        title: 'Xem danh sách quyền',
        key: PERMISSION.READ_ROLE
      },
      {
        title: 'Tạo quyền',
        key: PERMISSION.CREATE_ROLE
      },
      {
        title: 'Chỉnh sửa quyền',
        key: PERMISSION.UPDATE_ROLE
      },
      {
        title: 'Xoá quyền',
        key: PERMISSION.DELETE_ROLE
      }
    ]
  },
  {
    title: 'Quản lý nhân viên',
    permissions: [
      {
        title: 'Xem danh sách nhân viên',
        key: PERMISSION.READ_STAFF
      },
      {
        title: 'Tạo nhân viên',
        key: PERMISSION.CREATE_STAFF
      },
      {
        title: 'Chỉnh sửa nhân viên',
        key: PERMISSION.UPDATE_STAFF
      },
      {
        title: 'Xoá nhân viên',
        key: PERMISSION.DELETE_STAFF
      }
    ]
  },
  {
    title: 'Quản lý người dùng',
    permissions: [
      {
        title: 'Xem danh sách người dùng',
        key: PERMISSION.READ_USER
      },
      {
        title: 'Tạo người dùng',
        key: PERMISSION.CREATE_USER
      },
      {
        title: 'Chỉnh sửa người dùng',
        key: PERMISSION.UPDATE_USER
      },
      {
        title: 'Xoá người dùng',
        key: PERMISSION.DELETE_USER
      },
      {
        title: 'Nhập người dùng',
        key: PERMISSION.IMPORT_USER
      }
    ]
  },
  {
    title: 'Quản lý sự kiện',
    permissions: [
      {
        title: 'Xem danh sách sự kiện',
        key: PERMISSION.READ_EVENT
      },
      {
        title: 'Tạo sự kiện',
        key: PERMISSION.CREATE_EVENT
      },
      {
        title: 'Chỉnh sửa sự kiện',
        key: PERMISSION.UPDATE_EVENT
      },
      {
        title: 'Xoá sự kiện',
        key: PERMISSION.DELETE_EVENT
      },
      {
        title: 'Khôi phục sự kiện',
        key: PERMISSION.RESTORE_EVENT
      },
      {
        title: 'Nhập sự kiện',
        key: PERMISSION.IMPORT_EVENT
      },
      {
        title: 'Xuất sự kiện',
        key: PERMISSION.EXPORT_EVENT
      },
      {
        title: 'Cộng điểm người tham gia',
        key: PERMISSION.PLUS_MINUS_POINT_USER
      }
    ]
  },
  {
    title: 'Quản lý loại session',
    permissions: [
      {
        title: 'Xem danh sách loại session',
        key: PERMISSION.READ_TYPE_SESSION
      },
      {
        title: 'Tạo loại session',
        key: PERMISSION.CREATE_TYPE_SESSION
      },
      {
        title: 'Chỉnh sửa loại session',
        key: PERMISSION.UPDATE_TYPE_SESSION
      },
      {
        title: 'Xoá loại session',
        key: PERMISSION.DELETE_TYPE_SESSION
      },
      {
        title: 'Nhập loại session',
        key: PERMISSION.IMPORT_TYPE_SESSION
      },
      {
        title: 'Xuất loại session',
        key: PERMISSION.EXPORT_TYPE_SESSION
      }
    ]
  },
  {
    title: 'Quản lý session',
    permissions: [
      {
        title: 'Xem danh sách session',
        key: PERMISSION.READ_SESSION
      },
      {
        title: 'Tạo session',
        key: PERMISSION.CREATE_SESSION
      },
      {
        title: 'Chỉnh sửa session',
        key: PERMISSION.UPDATE_SESSION
      },
      {
        title: 'Xoá session',
        key: PERMISSION.DELETE_SESSION
      },
      {
        title: 'Nhập session',
        key: PERMISSION.IMPORT_SESSION
      },
      {
        title: 'Xuất session',
        key: PERMISSION.EXPORT_SESSION
      }
    ]
  },
  {
    title: 'Quản lý thông báo',
    permissions: [
      {
        title: 'Xem danh sách thông báo',
        key: PERMISSION.READ_NOTI
      },
      {
        title: 'Tạo thông báo',
        key: PERMISSION.CREATE_NOTI
      },
      {
        title: 'Xoá thông báo',
        key: PERMISSION.DELETE_NOTI
      }
    ]
  },
  {
    title: 'Quản lý tin tức',
    permissions: [
      {
        title: 'Xem danh sách tin tức',
        key: PERMISSION.READ_ARTICLE
      },
      {
        title: 'Tạo tin tức',
        key: PERMISSION.CREATE_ARTICLE
      },
      {
        title: 'Cập nhật tin tức',
        key: PERMISSION.UPDATE_ARTICLE
      },
      {
        title: 'Xoá tin tức',
        key: PERMISSION.DELETE_ARTICLE
      }
    ]
  },
  {
    title: 'Quản lý khách mời',
    permissions: [
      {
        title: 'Xem danh sách khách mời',
        key: PERMISSION.READ_ATTENDEE
      },
      {
        title: 'Tạo khách mời',
        key: PERMISSION.CREATE_ATTENDEE
      },
      {
        title: 'Cập nhật khách mời',
        key: PERMISSION.UPDATE_ATTENDEE
      },
      {
        title: 'Xoá khách mời',
        key: PERMISSION.DELETE_ATTENDEE
      }
    ]
  },
  {
    title: 'Quản lý thử thách',
    permissions: [
      {
        title: 'Xem danh thử thách',
        key: PERMISSION.READ_ACTIVITY
      },
      {
        title: 'Tạo thử thách',
        key: PERMISSION.CREATE_ACTIVITY
      },
      {
        title: 'Cập nhật thử thách',
        key: PERMISSION.UPDATE_ACTIVITY
      },
      {
        title: 'Xoá thử thách',
        key: PERMISSION.DELETE_ACTIVITY
      },
      {
        title: 'Khôi phục thử thách',
        key: PERMISSION.RESTORE_ACTIVITY
      },
      {
        title: 'Xem danh sách khách mời',
        key: PERMISSION.READ_ATTENDEE_ACTIVITY
      },
      {
        title: 'import danh sách khách mời',
        key: PERMISSION.IMPORT_ATTENDEE_ACTIVITY
      },
      {
        title: 'Tạo khách mời',
        key: PERMISSION.CREATE_ATTENDEE_ACTIVITY
      },
      {
        title: 'Cập nhật khách mời',
        key: PERMISSION.UPDATE_ATTENDEE_ACTIVITY
      },
      {
        title: 'Xoá khách mời',
        key: PERMISSION.DELETE_ATTENDEE_ACTIVITY
      }
    ]
  },
  {
    title: 'Quản lý nhiệm vụ',
    permissions: [
      {
        title: 'Xem nhiệm vụ',
        key: PERMISSION.READ_TASK
      },
      {
        title: 'Tạo nhiệm vụ',
        key: PERMISSION.CREATE_TASK
      },
      {
        title: 'Cập nhật nhiệm vụ',
        key: PERMISSION.UPDATE_TASK
      },
      {
        title: 'Xoá nhiệm vụ',
        key: PERMISSION.DELETE_TASK
      }
    ]
  },
  {
    title: 'Quản lý bài nộp',
    permissions: [
      {
        title: 'Xem bài nộp',
        key: PERMISSION.READ_PROOF
      },
      {
        title: 'Cập nhật bài nộp',
        key: PERMISSION.UPDATE_PROOF
      },
      {
        title: 'Export bài nộp',
        key: PERMISSION.EXPORT_PROOF
      },
      {
        title: 'Import bài nộp',
        key: PERMISSION.IMPORT_PROOF
      }
    ]
  },
  {
    title: 'Quản lý cài đặt',
    permissions: [
      {
        title: 'Xem cài đặt',
        key: PERMISSION.READ_SETTING
      },
      {
        title: 'Cập nhật cài đặt',
        key: PERMISSION.UPDATE_SETTING
      }
    ]
  },
  {
    title: 'Quản lý lịch sử thao tác',
    permissions: [
      {
        title: 'Xem lịch sử thao tác',
        key: PERMISSION.READ_LOG_STAFF
      }
    ]
  }

]

export const ATTENDEE_STATUS = {
  PENDING: 'PENDING',
  CHECK_IN: 'CHECK_IN',
  CHECK_OUT: 'CHECK_OUT'
}

export const NOTIFICATION_USER_TYPE = {
  NOTI_USER_IN_EVENT: 'NOTI_USER_IN_EVENT',
  NOTI_USER_GLOBAL: 'NOTI_USER_GLOBAL',
  NOTI_USER_SESSION: 'NOTI_USER_SESSION',
  CHECK_IN_SESSION: 'CHECK_IN_SESSION', // + cộng điểm khi check in session
  INFORM_UPCOMING_LIVESTREAM: 'INFORM_UPCOMING_LIVESTREAM', // thông báo sự kiện sắp diễn ra
  MINUS_CHECK_IN_EVENT: 'MINUS_CHECK_IN_EVENT', // trừ điểm checkin sự kiện
  MINUS_CHECK_OUT_EVENT_NOT_ENOUGH_POINT: 'MINUS_CHECK_OUT_EVENT_NOT_ENOUGH_POINT', // trừ điểm checkout sự kiện do ko đạt đủ điểm
  MINUS_CHECK_OUT_EVENT_NOT_COMPLETE_ENOUGHT_MISSION: 'MINUS_CHECK_OUT_EVENT_NOT_COMPLETE_ENOUGHT_MISSION', // trừ điểm checkout sự kiện do ko hoàn thành nhiệm vụ
  CRON_30_MIN_LATER_NOT_CHECK_OUT: 'CRON_30_MIN_LATER_NOT_CHECK_OUT', // trừ điểm nếu sau sự kiện 30p ko checkout
  CRON_30_MIN_LATER_NOT_SURVEY: 'CRON_30_MIN_LATER_NOT_SURVEY', // trừ điểm nếu sau sự kiện 30p ko làm survey
  CHECK_IN_EVENT: 'CHECK_IN_EVENT', // noti check in thành công
  CHECK_OUT_EVENT: 'CHECK_OUT_EVENT', // noti check out thành công
  IMPORT_MINUS_POINT: 'IMPORT_MINUS_POINT', // trừ điểm khi import file
  MINUS_POINT_USER: 'MINUS_POINT_USER', // trừ điểm khi import file
  PLUS_POINT_USER: 'PLUS_POINT_USER'
}

export const SOCKET = {
  INIT_CONNECTION: 'INIT_CONNECTION',
  RESPONSE_CONNECTION: 'RESPONSE_CONNECTION',
  NOTIFICATION: 'NOTIFICATION',
  JOIN_EVENT: 'JOIN_EVENT',
  LEAVE_EVENT: 'LEAVE_EVENT',
  INFORM_UPCOMING_LIVESTREAM: 'INFORM_UPCOMING_LIVESTREAM'
}

export const HISTORY_POINT = {
  CHECK_IN_SESSION: 'CHECK_IN_SESSION', // + cộng điểm
  MINUS_CHECK_IN_EVENT: 'MINUS_CHECK_IN_EVENT', // - điểm checkin sự kiện
  MINUS_CHECK_OUT_EVENT_NOT_ENOUGH_POINT: 'MINUS_CHECK_OUT_EVENT_NOT_ENOUGH_POINT', // trừ điểm checkout sự kiện do ko đạt đủ điểm
  MINUS_CHECK_OUT_EVENT_NOT_COMPLETE_ENOUGHT_MISSION: 'MINUS_CHECK_OUT_EVENT_NOT_COMPLETE_ENOUGHT_MISSION', // trừ điểm checkout sự kiện do ko hoàn thành nhiệm vụ
  CRON_30_MIN_LATER_NOT_CHECK_OUT: 'CRON_30_MIN_LATER_NOT_CHECK_OUT', // trừ điểm nếu sau sự kiện 30p ko checkout
  CRON_30_MIN_LATER_NOT_SURVEY: 'CRON_30_MIN_LATER_NOT_SURVEY', // trừ điểm nếu sau sự kiện 30p ko làm survey
  IMPORT_IN_OUT: 'IMPORT_IN_OUT', // set điểm khi import checkin checkout
  IMPORT_MINUS_POINT: 'IMPORT_MINUS_POINT', // - trừ điểm khi import file
  IMPORT_POINT: 'IMPORT_POINT', // - import cập nhật điểm của user
  PLUS_POINT_USER: 'PLUS_POINT_USER', // - cộng điểm user
  MINUS_POINT_USER: 'MINUS_POINT_USER' // - import cập nhật điểm của user
}

export const POINT_GIVING = {
  POINT_GIVING_SESSION: 'POINT_GIVING_SESSION'
}

export const CATEGORY_TYPE = {
  DEFAULT: 'DEFAULT',
  OPTION: 'OPTION',
  LINK: 'LINK'
}

export const CACHE_MODULE = {
  USER: 'user'
}
