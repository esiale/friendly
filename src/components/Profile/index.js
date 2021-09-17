import { useParams, Link } from 'react-router-dom';

const Profile = (match) => {
  const userId = useParams();

  return (
    <div>
      <Link
        to={{
          pathname: '/messages',
          targetUser: userId,
        }}
      >
        Send message
      </Link>
    </div>
  );
};

export default Profile;
