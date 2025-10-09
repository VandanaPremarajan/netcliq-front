import { Card, Button, Tag } from "antd";
import penguinImg from '../../assets/penguin.jpg'
// Sample user data

const userString = localStorage.getItem('user');
const user = JSON.parse(userString);

const ProfilePage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <Card
            cover={
              <img
                alt="Profile"
                src={user.profilePic ? user.profilePic : penguinImg}
                className="mx-auto d-block mt-3 rounded-circle"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            }
            style={{ textAlign: "center", paddingBottom: "20px" }}
          >
            <h3>{user.firstName + " " + user.lastName}</h3>
            <p>{user.email}</p>
            {/* <p>{user.phone}</p> */}
            <Tag color={user.subscriptionPlan === "Premium" ? "red" : "blue"}>
              {user.subscriptionPlan}
            </Tag>
            <p className="mt-2">Max Devices: {user.maxDevices}</p>
            <Button type="primary" style={{ marginTop: "10px" }}>
              Edit Profile
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
