import type { Meta, StoryObj } from "@storybook/react";
import * as Icons from "./index";

const meta = {
  title: "Components/Icon",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const iconNames = Object.keys(Icons).sort();

export const AllIcons: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="mb-6 text-2xl font-bold">Icon Library</h2>
      <div className="gap-6 grid grid-cols-6">
        {iconNames.map((iconName) => {
          const IconComponent = Icons[iconName as keyof typeof Icons];
          return (
            <div
              key={iconName}
              className="gap-2 p-4 hover:shadow-md flex flex-col items-center rounded-lg border border-gray-200 transition-all hover:border-blue-500"
            >
              <IconComponent className="h-8 w-8" color="#3D4151" />
              <span className="text-xs text-center text-gray-600">
                {iconName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  ),
};

export const NavigationIcons: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="mb-6 text-2xl font-bold">Navigation Icons</h2>
      <div className="gap-6 grid grid-cols-4">
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.ArrowLeftIcon />
          <span className="text-xs">ArrowLeft</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.ArrowRightIcon />
          <span className="text-xs">ArrowRight</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.ArrowUpIcon />
          <span className="text-xs">ArrowUp</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.ArrowDownIcon />
          <span className="text-xs">ArrowDown</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.CaretLeftIcon />
          <span className="text-xs">CaretLeft</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.CaretRightIcon />
          <span className="text-xs">CaretRight</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.CaretUpIcon />
          <span className="text-xs">CaretUp</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.CaretDownIcon />
          <span className="text-xs">CaretDown</span>
        </div>
      </div>
    </div>
  ),
};

export const ActionIcons: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="mb-6 text-2xl font-bold">Action Icons</h2>
      <div className="gap-6 grid grid-cols-4">
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.AddCircleIcon color="#10B981" />
          <span className="text-xs">AddCircle</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.RemoveCircleIcon color="#EF4444" />
          <span className="text-xs">RemoveCircle</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.MoreCircleIcon />
          <span className="text-xs">MoreCircle</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.TickCircleIcon color="#10B981" />
          <span className="text-xs">TickCircle</span>
        </div>
      </div>
    </div>
  ),
};

export const FormControlIcons: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="mb-6 text-2xl font-bold">Form Control Icons</h2>
      <div className="gap-6 grid grid-cols-3">
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.CheckboxIcon checked={false} />
          <span className="text-xs">Checkbox (unchecked)</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.CheckboxIcon checked={true} color="#3B82F6" />
          <span className="text-xs">Checkbox (checked)</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.RadioButtonInactiveIcon />
          <span className="text-xs">RadioButton (inactive)</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.RadioButtonActiveIcon color="#3B82F6" />
          <span className="text-xs">RadioButton (active)</span>
        </div>
      </div>
    </div>
  ),
};

export const AcademicIcons: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="mb-6 text-2xl font-bold">Academic Domain Icons</h2>
      <div className="gap-6 grid grid-cols-4">
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.DashboardIcon color="#3B82F6" />
          <span className="text-xs">Dashboard</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.GradeIcon color="#10B981" />
          <span className="text-xs">Grade</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.AttendanceIcon color="#8B5CF6" />
          <span className="text-xs">Attendance</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.ScheduleIcon color="#F59E0B" />
          <span className="text-xs">Schedule</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.RegistrationIcon color="#EC4899" />
          <span className="text-xs">Registration</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.AdvisingIcon color="#06B6D4" />
          <span className="text-xs">Advising</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.CurriculumIcon />
          <span className="text-xs">Curriculum</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.CourseIcon />
          <span className="text-xs">Course</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.InternshipIcon />
          <span className="text-xs">Internship</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.CommunityServiceIcon />
          <span className="text-xs">CommunityService</span>
        </div>
      </div>
    </div>
  ),
};

export const UtilityIcons: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="mb-6 text-2xl font-bold">Utility Icons</h2>
      <div className="gap-6 grid grid-cols-5">
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.DownloadIcon />
          <span className="text-xs">Download</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.HomeIcon />
          <span className="text-xs">Home</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.LogoutIcon />
          <span className="text-xs">Logout</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.HideIcon />
          <span className="text-xs">Hide</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.OpenIcon />
          <span className="text-xs">Open</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.SyncIcon />
          <span className="text-xs">Sync</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.TimerIcon />
          <span className="text-xs">Timer</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.TagCalendarIcon />
          <span className="text-xs">TagCalendar</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.ReplyIcon />
          <span className="text-xs">Reply</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.BurgerMenuIcon />
          <span className="text-xs">BurgerMenu</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.FlagIcon />
          <span className="text-xs">Flag</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.CautionIcon color="#F59E0B" />
          <span className="text-xs">Caution</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.IdeaIcon color="#FCD34D" />
          <span className="text-xs">Idea</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.RocketIcon color="#8B5CF6" />
          <span className="text-xs">Rocket</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.PdfIcon color="#EF4444" />
          <span className="text-xs">Pdf</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.BoxIcon />
          <span className="text-xs">Box</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.NoteIcon />
          <span className="text-xs">Note</span>
        </div>
      </div>
    </div>
  ),
};

export const IconSizes: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="mb-6 text-2xl font-bold">Icon Sizes</h2>
      <div className="gap-8 flex items-end">
        <div className="gap-2 flex flex-col items-center">
          <Icons.HomeIcon className="h-4 w-4" />
          <span className="text-xs">16px</span>
        </div>
        <div className="gap-2 flex flex-col items-center">
          <Icons.HomeIcon className="h-6 w-6" />
          <span className="text-xs">24px</span>
        </div>
        <div className="gap-2 flex flex-col items-center">
          <Icons.HomeIcon className="h-8 w-8" />
          <span className="text-xs">32px (default)</span>
        </div>
        <div className="gap-2 flex flex-col items-center">
          <Icons.HomeIcon className="h-12 w-12" />
          <span className="text-xs">48px</span>
        </div>
        <div className="gap-2 flex flex-col items-center">
          <Icons.HomeIcon className="h-16 w-16" />
          <span className="text-xs">64px</span>
        </div>
      </div>
    </div>
  ),
};

export const IconColors: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="mb-6 text-2xl font-bold">Icon Colors</h2>
      <div className="gap-8 flex">
        <div className="gap-2 flex flex-col items-center">
          <Icons.StarIcon color="#3B82F6" />
          <span className="text-xs">Blue</span>
        </div>
        <div className="gap-2 flex flex-col items-center">
          <Icons.StarIcon color="#10B981" />
          <span className="text-xs">Green</span>
        </div>
        <div className="gap-2 flex flex-col items-center">
          <Icons.StarIcon color="#EF4444" />
          <span className="text-xs">Red</span>
        </div>
        <div className="gap-2 flex flex-col items-center">
          <Icons.StarIcon color="#F59E0B" />
          <span className="text-xs">Orange</span>
        </div>
        <div className="gap-2 flex flex-col items-center">
          <Icons.StarIcon color="#8B5CF6" />
          <span className="text-xs">Purple</span>
        </div>
        <div className="gap-2 flex flex-col items-center">
          <Icons.StarIcon className="text-gray-600" />
          <span className="text-xs">Gray (default)</span>
        </div>
      </div>
    </div>
  ),
};

export const AcademicServicesIcons: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="mb-6 text-2xl font-bold">Academic Services Icons</h2>
      <div className="gap-6 grid grid-cols-4">
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.BuildingIcon color="#3B82F6" />
          <span className="text-xs">Building</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.CounselingIcon color="#10B981" />
          <span className="text-xs">Counseling</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.GladiIcon color="#8B5CF6" />
          <span className="text-xs">Gladi</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.DispensationIcon color="#F59E0B" />
          <span className="text-xs">Dispensation</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.StudentScheduleIcon color="#EC4899" />
          <span className="text-xs">StudentSchedule</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.GuardianshipIcon color="#06B6D4" />
          <span className="text-xs">Guardianship</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.PaymentIcon color="#EF4444" />
          <span className="text-xs">Payment</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.LanguageCenterIcon color="#14B8A6" />
          <span className="text-xs">LanguageCenter</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.MedalIcon color="#F59E0B" />
          <span className="text-xs">Medal</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.DocumentBookIcon color="#3B82F6" />
          <span className="text-xs">DocumentBook</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.GraduationIcon color="#8B5CF6" />
          <span className="text-xs">Graduation</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.EquivalenceIcon color="#10B981" />
          <span className="text-xs">Equivalence</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.ThesisIcon color="#6366F1" />
          <span className="text-xs">Thesis</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.TraceStudyIcon color="#EC4899" />
          <span className="text-xs">TraceStudy</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.ServiceDeskIcon color="#06B6D4" />
          <span className="text-xs">ServiceDesk</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.SurveyIcon color="#10B981" />
          <span className="text-xs">Survey</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.FeedbackIcon color="#F59E0B" />
          <span className="text-xs">Feedback</span>
        </div>
      </div>
    </div>
  ),
};

export const UIControlIcons: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="mb-6 text-2xl font-bold">UI Control Icons</h2>
      <div className="gap-6 grid grid-cols-4">
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.AssignIcon color="#3B82F6" />
          <span className="text-xs">Assign</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.CircleChevronUpIcon className="text-gray-600" />
          <span className="text-xs">CircleChevronUp</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.CircleChevronDownIcon className="text-gray-600" />
          <span className="text-xs">CircleChevronDown</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.CircleChevronLeftIcon className="text-gray-600" />
          <span className="text-xs">CircleChevronLeft</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.CircleChevronRightIcon className="text-gray-600" />
          <span className="text-xs">CircleChevronRight</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.UnlockIcon color="#10B981" />
          <span className="text-xs">Unlock</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.LockIcon color="#EF4444" />
          <span className="text-xs">Lock</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.StudentProfileIcon color="#8B5CF6" />
          <span className="text-xs">StudentProfile</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.LessThanIcon className="text-gray-600" />
          <span className="text-xs">LessThan</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.GreaterThanIcon className="text-gray-600" />
          <span className="text-xs">GreaterThan</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.CloseCancelIcon color="#EF4444" />
          <span className="text-xs">CloseCancel</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.CloseAddIcon color="#10B981" />
          <span className="text-xs">CloseAdd</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.CloseMinusIcon className="text-gray-600" />
          <span className="text-xs">CloseMinus</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.TickIcon color="#10B981" />
          <span className="text-xs">Tick</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.AnnouncementIcon color="#F59E0B" />
          <span className="text-xs">Announcement</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.NotificationActiveIcon
            dotColor="#EF4444"
            className="text-gray-600"
          />
          <span className="text-xs">NotificationActive</span>
        </div>
        <div className="gap-2 p-4 flex flex-col items-center rounded-lg border border-gray-200">
          <Icons.SubIcon color="#3B82F6" />
          <span className="text-xs">Sub</span>
        </div>
      </div>
    </div>
  ),
};

export const InteractiveExample: Story = {
  render: () => (
    <div className="p-8">
      <h2 className="mb-6 text-2xl font-bold">Interactive Example</h2>
      <div className="gap-4 flex flex-col">
        <div className="gap-3 p-4 flex items-center rounded-lg border border-gray-200 transition-colors hover:bg-gray-50">
          <Icons.HomeIcon color="#3B82F6" />
          <span className="text-sm font-medium">Dashboard</span>
        </div>
        <div className="gap-3 p-4 flex items-center rounded-lg border border-gray-200 transition-colors hover:bg-gray-50">
          <Icons.GradeIcon color="#10B981" />
          <span className="text-sm font-medium">Grades</span>
        </div>
        <div className="gap-3 p-4 flex items-center rounded-lg border border-gray-200 transition-colors hover:bg-gray-50">
          <Icons.AttendanceIcon color="#8B5CF6" />
          <span className="text-sm font-medium">Attendance</span>
        </div>
        <div className="gap-3 p-4 flex items-center rounded-lg border border-gray-200 transition-colors hover:bg-gray-50">
          <Icons.ScheduleIcon color="#F59E0B" />
          <span className="text-sm font-medium">Schedule</span>
        </div>
      </div>
    </div>
  ),
};
