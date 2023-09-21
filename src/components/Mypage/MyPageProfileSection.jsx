import DisplayModeProfile from './DisplayModeProfile';
import EditModeProfile from './EditModeProfile';

function MyPageProfileSection({
  isEditMode,
  updatedUser,
  avatarUrl,
  isLoading,
  handleProfileChange,
  handleAvatarChange,
  handleSaveProfile,
  setIsEditMode,
  handleSignOut,
  handleCancelMembership,
}) {
  return (
    <section className="p-8 bg-white rounded-[20px] shadow-lg w-[50%] min-w-[300px]">
      {isEditMode ? (
        <EditModeProfile
          avatarUrl={avatarUrl}
          updatedUser={updatedUser}
          handleAvatarChange={handleAvatarChange}
          handleProfileChange={handleProfileChange}
          handleSaveProfile={handleSaveProfile}
          setIsEditMode={setIsEditMode}
        />
      ) : (
        <DisplayModeProfile
          avatarUrl={avatarUrl}
          updatedUser={updatedUser}
          isLoading={isLoading}
          setIsEditMode={setIsEditMode}
          handleSignOut={handleSignOut}
          handleCancelMembership={handleCancelMembership}
        />
      )}
    </section>
  );
}
export default MyPageProfileSection;
